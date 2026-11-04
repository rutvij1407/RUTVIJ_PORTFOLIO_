/**
 * Agent-swarm "page builder" engine.
 *
 * Walks the real DOM of the portfolio, hides every visible piece (a "layer"),
 * then lets a swarm of coloured cursors fly around, draw wireframes and
 * "build" each piece back in while the camera auto-scrolls to the footer.
 * Everything visual (cursors, boxes, rulers…) is drawn on ONE fixed canvas.
 */

export interface HudState {
  phase: 'scan' | 'build' | 'done'
  agents: number
  layers: number
  total: number
  seconds: number
  speed: number
  paused: boolean
  colors: string[]
}

export interface Controller {
  skip(): void
  setSpeed(n: number): void
  togglePause(): void
  destroy(): void
}

/** One colour for the whole swarm. */
const COLORS = ['#000000']
/** Outline / accent used so the black cursors stay readable on the dark page. */
const EDGE = '#ffffff'
/** Selection palette matches the site's burgundy / rose theme. */
const BLUE = '#d9959f'
const CYAN = '#8a0f2e'
const CREAM = '#f4ece9'
const MIN_AGENTS = 10
const MAX_AGENTS = 10
/** Global pace multiplier for per-element work time (higher = slower build). */
const PACE = 0.35
/** Global time scale for the whole sequence (1 = natural). */
const TIME = 2.5
const TIME_NARROW = 3.2

type Kind = 'text' | 'image' | 'block' | 'card'

interface Target {
  el: HTMLElement
  kind: Kind
  label: string
  absTop: number
  absBottom: number
  stage: 0 | 1 | 2 | 3 // pending, assigned, working, done
  agent: Agent | null
  t: number
  popT: number
  cd: number // content duration
  lines: number
  revealed: boolean
  r: { left: number; top: number; width: number; height: number }
  c: number // content progress 0..1
  fade: number // 0..1 how far the wireframe has faded
  lineH: number
}

interface Agent {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  target: Target | null
  ax: number
  ay: number
  phase: number
  curv: number
  flyT: number
  working: boolean
  trail: { x: number; y: number }[]
  homeX: number
  homeY: number
  idleT: number
  idleTarget: Target | null
  ix: number
  iy: number
  offX: number
  offY: number
}

const INLINE = new Set([
  'SPAN', 'STRONG', 'EM', 'B', 'I', 'BR', 'CODE', 'SMALL', 'SUB', 'SUP', 'A', 'MARK', 'U', 'S', 'ABBR', 'LABEL', 'IMG',
  'SVG', 'PATH', 'CIRCLE', 'RECT', 'G', 'LINE', 'POLYLINE', 'POLYGON', 'ELLIPSE', 'DEFS', 'LINEARGRADIENT',
  'RADIALGRADIENT', 'STOP', 'CLIPPATH', 'MASK', 'USE', 'TEXT', 'TSPAN', 'TITLE', 'FILTER',
])

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3)
const easeInOut = (t: number) => {
  t = clamp(t)
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
const rnd = (a: number, b: number) => a + Math.random() * (b - a)

function alphaOf(color: string): number {
  if (!color || color === 'transparent') return 0
  const m = color.match(/rgba?\(([^)]+)\)/)
  if (!m) return 1
  const p = m[1].split(/[ ,/]+/).filter(Boolean)
  return p.length >= 4 ? parseFloat(p[3]) : 1
}

function isVisual(cs: CSSStyleDeclaration): boolean {
  if (alphaOf(cs.backgroundColor) > 0.03) return true
  if (cs.backgroundImage && cs.backgroundImage !== 'none') return true
  const bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
  if (bw > 0 && alphaOf(cs.borderTopColor) > 0.03) return true
  return false
}

function inlineOnly(el: Element): boolean {
  const all = el.querySelectorAll('*')
  for (let i = 0; i < all.length; i++) if (!INLINE.has(all[i].tagName.toUpperCase())) return false
  return true
}

export function startAgentBuild(
  canvas: HTMLCanvasElement,
  onHud: (h: HudState) => void,
  onEnd: (reason: 'skip') => void,
): Controller {
  const ctx = canvas.getContext('2d')!
  const root = document.documentElement
  const prevScrollBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  let vw = window.innerWidth
  let vh = window.innerHeight
  let dpr = 1

  const resize = () => {
    vw = window.innerWidth
    vh = window.innerHeight
    dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(vw * dpr)
    canvas.height = Math.round(vh * dpr)
    canvas.style.width = vw + 'px'
    canvas.style.height = vh + 'px'
  }
  resize()
  window.addEventListener('resize', resize)

  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

  /* ---------------- collect targets ---------------- */
  const targets: Target[] = []

  const walk = (el: Element, sectionRoot: Element, out: Target[]) => {
    if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return
    const r = el.getBoundingClientRect()
    const tag = el.tagName.toUpperCase()
    if (r.width < 6 || r.height < 6) return
    if (r.right < 0 || r.left > vw) return
    const push = (kind: Kind, node: HTMLElement | SVGElement) => {
      const rr = node.getBoundingClientRect()
      const sy = window.scrollY
      out.push({
        el: node as HTMLElement,
        kind,
        label: '',
        absTop: rr.top + sy,
        absBottom: rr.bottom + sy,
        stage: 0,
        agent: null,
        t: 0,
        popT: 0,
        cd: 0.6,
        lines: 1,
        revealed: false,
        r: { left: rr.left, top: rr.top, width: rr.width, height: rr.height },
        c: 0,
        fade: 0,
        lineH: 20,
      })
    }
    if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE', 'IFRAME', 'SVG'].includes(tag)) {
      if (tag === 'SVG' && el.closest('button, a')) return
      push('image', el as HTMLElement)
      return
    }
    if (!(el instanceof HTMLElement)) return
    const hasText = (el.textContent || '').trim().length > 0
    if (hasText && el !== sectionRoot && inlineOnly(el)) {
      const inlineDisplay = cs.display.startsWith('inline') && cs.display !== 'inline-block' && cs.display !== 'inline-flex'
      push(isVisual(cs) || inlineDisplay ? 'block' : 'text', el)
      return
    }
    const start = out.length
    for (const child of Array.from(el.children)) walk(child, sectionRoot, out)
    if (el === sectionRoot) return
    if (isVisual(cs) && r.width >= 80 && r.height >= 40 && out.length > start) {
      const holder: Target[] = []
      push('card', el)
      holder.push(out.pop() as Target)
      out.splice(start, 0, holder[0])
    } else if (out.length === start && isVisual(cs) && r.width >= 24 && r.height >= 12) {
      push('block', el)
    }
  }

  const sections = Array.from(document.querySelectorAll('main > section, main > footer')) as HTMLElement[]
  for (const s of sections) {
    const local: Target[] = []
    walk(s, s, local)
    for (const t of local) targets.push(t)
  }

  // finalise measurements + hide everything
  const names: Record<Kind, string[]> = {
    text: ['heading', 'paragraph', 'text', 'label'],
    image: ['image', 'media', 'chart', 'figure'],
    block: ['button', 'chip', 'badge', 'link'],
    card: ['card', 'container', 'panel', 'frame'],
  }
  for (const t of targets) {
    const cs = getComputedStyle(t.el)
    const fs = parseFloat(cs.fontSize) || 16
    t.lineH = parseFloat(cs.lineHeight) || fs * 1.25
    const rect = t.el.getBoundingClientRect()
    t.lines = Math.max(1, Math.round(rect.height / t.lineH))
    const chars = (t.el.textContent || '').length
    t.cd = (t.kind === 'text' ? clamp(0.35 + chars * 0.011, 0.45, 1.5) : t.kind === 'image' ? 0.7 : 0.45) * PACE
    t.label =
      Math.random() < 0.55
        ? `${Math.round(rect.width)} × ${Math.round(rect.height)}`
        : names[t.kind][Math.floor(Math.random() * names[t.kind].length)]
    if (t.kind === 'card') t.el.classList.add('ab-hidebg')
    else t.el.classList.add('ab-hide')
  }
  const total = targets.length

  // fixed site chrome (background art, top bar, dock…): hidden so we start from pure black
  const chromeBg: HTMLElement[] = []
  const chromeUi: HTMLElement[] = []
  const mainEl = document.querySelector('main')
  if (mainEl) {
    for (const el of Array.from(mainEl.children)) {
      if (!(el instanceof HTMLElement) || el.tagName === 'CANVAS' || el.hasAttribute('data-ab')) continue
      if (getComputedStyle(el).position !== 'fixed') continue
      const z = parseInt(getComputedStyle(el).zIndex, 10)
      el.setAttribute('data-ab-fx', '')
      el.setAttribute('data-ab-off', '')
      ;(Number.isFinite(z) && z > 5 ? chromeUi : chromeBg).push(el)
    }
  }
  const showChrome = (list: HTMLElement[]) => list.forEach((el) => el.removeAttribute('data-ab-off'))
  targets.sort((a, b) => a.absTop - b.absTop)

  /* ---------------- state ---------------- */
  let sim = 0
  let speed = 1
  let paused = false
  let done = 0
  let phase: 'scan' | 'build' | 'done' = 'scan'
  let doneAt = 0
  let exitT = 0
  let ended = false
  let raf = 0
  let last = performance.now()
  let sy = 0
  let camTarget = 0
  let camCool = 0
  let stillT = 0
  let lastSy = -1
  let rulerA = 0
  let rulerUntil = 1.6
  let redLine = false
  let band = -1
  const fired = new Set<string>()
  const ripples: { x: number; y: number; t0: number }[] = []
  const ripple = (x: number, y: number) => {
    ripples.push({ x, y, t0: sim })
  }
  let hudT = 0

  const agents: Agent[] = []
  let peak = 0
  const spawn = (initial: boolean, i: number) => {
    const cluster = i % 2 === 0
    const hx = cluster ? vw * 0.4 : vw * 0.68
    const hy = cluster ? vh * 0.62 : vh * 0.4
    let x: number, y: number, vx: number, vy: number
    if (initial) {
      x = hx + rnd(-90, 90) + (cluster ? -vw * 0.35 : vw * 0.3)
      y = hy + rnd(-70, 70)
      vx = cluster ? 160 : -160
      vy = rnd(-40, 40)
    } else {
      const e = Math.floor(Math.random() * 4)
      x = e === 0 ? -30 : e === 1 ? vw + 30 : rnd(0, vw)
      y = e === 2 ? -30 : e === 3 ? vh + 30 : rnd(0, vh)
      vx = (vw / 2 - x) * 0.6
      vy = (vh / 2 - y) * 0.6
    }
    agents.push({
      x, y, vx, vy,
      color: COLORS[agents.length % COLORS.length],
      target: null,
      ax: rnd(0.2, 0.8),
      ay: rnd(0.25, 0.75),
      phase: rnd(0, 6.28),
      curv: rnd(0.2, 0.55) * (Math.random() < 0.5 ? -1 : 1),
      flyT: 0,
      working: false,
      trail: [],
      homeX: hx,
      homeY: hy,
      idleT: 0,
      idleTarget: null,
      ix: rnd(0.1, 0.9),
      iy: rnd(0.1, 0.9),
      offX: rnd(-40, 40),
      offY: rnd(-40, 40),
    })
  }
  for (let i = 0; i < MIN_AGENTS; i++) spawn(true, i)

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - vh)

  const pushHud = (force = false) => {
    if (!force && hudT < 0.1) return
    hudT = 0
    onHud({
      phase,
      agents: phase === 'done' ? peak : agents.length,
      layers: done,
      total,
      seconds: (phase === 'done' ? doneAt : sim) / (vw < 640 ? TIME_NARROW : TIME),
      speed,
      paused,
      colors: agents.slice(0, 6).map((a) => a.color),
    })
  }

  /* ---------------- build helpers ---------------- */
  const reveal = (t: Target) => {
    t.revealed = true
    if (t.kind === 'card') {
      t.el.classList.remove('ab-hidebg')
    } else {
      t.el.classList.remove('ab-hide')
      t.el.classList.add('ab-in')
    }
  }
  const cleanup = (t: Target) => {
    t.el.classList.remove('ab-hide', 'ab-hidebg', 'ab-in')
    t.el.style.clipPath = ''
  }
  const applyContent = (t: Target) => {
    const c = t.c
    if (t.kind === 'text') {
      const L = t.lines
      const p = c * L
      const full = Math.min(L, Math.floor(p))
      const frac = p - full
      if (c >= 1) {
        t.el.style.clipPath = ''
        return
      }
      const yt = (full / L) * 100
      const yb = ((full + 1) / L) * 100
      const steps = Math.max(8, Math.round(t.r.width / 11))
      const x = (Math.floor(frac * steps) / steps) * 100
      t.el.style.clipPath = `polygon(0 0, 100% 0, 100% ${yt}%, ${x}% ${yt}%, ${x}% ${yb}%, 0 ${yb}%)`
    } else if (t.kind === 'image') {
      t.el.style.clipPath = c >= 1 ? '' : `inset(0 0 ${(1 - easeOut(c)) * 100}% 0)`
    }
  }

  const liveRect = (t: Target) => {
    const r = t.el.getBoundingClientRect()
    t.r.left = r.left
    t.r.top = r.top
    t.r.width = r.width
    t.r.height = r.height
  }

  const assignable = (t: Target) => inView(t) || t.absBottom - sy <= 50 || (sy >= maxScroll() - 2 && t.absTop - sy >= vh * 0.96)
  const inView = (t: Target) => t.absTop - sy < vh * 0.96 && t.absBottom - sy > 50

  /* ---------------- update ---------------- */
  const update = (dt: number) => {
    sy = window.scrollY
    hudT += dt

    // phases
    if (phase === 'scan' && sim > 1.7) {
      phase = 'build'
      pushHud(true)
    }
    if (sim > 0.45 && sim < 1 && rulerUntil < 3) rulerA = rulerA // no-op, rulers handled below

    // rulers fade
    const wantRuler = sim < rulerUntil && sim > 0.3 ? 1 : 0
    rulerA += (wantRuler - rulerA) * Math.min(1, dt * 5)
    if (band >= 0) band += dt

    // progress milestones
    const prog = total ? done / total : 1
    if (phase === 'build') {
      if (prog > 0.1 && !fired.has('bg')) {
        fired.add('bg')
        showChrome(chromeBg)
      }
      if (prog > 0.55 && !fired.has('ui')) {
        fired.add('ui')
        showChrome(chromeUi)
      }
      if (prog > 0.33 && !fired.has('r1')) {
        fired.add('r1')
        rulerUntil = sim + 1.2
        redLine = false
      }
      if (prog > 0.68 && !fired.has('r2')) {
        fired.add('r2')
        rulerUntil = sim + 1.8
        redLine = true
        band = 0
      }
    }

    // agent count grows with progress
    const want = phase === 'scan' ? MIN_AGENTS : Math.min(MAX_AGENTS, Math.round(MIN_AGENTS + (MAX_AGENTS - MIN_AGENTS) * clamp(prog * 1.15)))
    if (phase !== 'done') while (agents.length < want) spawn(false, agents.length)

    if (phase === 'build') {
      // assign idle agents
      const idle = agents.filter((a) => !a.target)
      if (idle.length) {
        const cands: Target[] = []
        for (let i = 0; i < targets.length && cands.length < 6; i++) {
          const t = targets[i]
          if (t.stage === 0 && assignable(t)) cands.push(t)
        }
        for (const a of idle) {
          if (!cands.length) break
          const pick = cands.splice(Math.floor(Math.random() * Math.min(3, cands.length)), 1)[0]
          pick.stage = 1
          pick.agent = a
          pick.popT = 0
          a.target = pick
          a.flyT = 0
          a.working = false
          a.ax = rnd(0.15, 0.85)
          a.ay = rnd(0.3, 0.8)
          liveRect(pick)
          // refill candidates
          for (let i = 0; i < targets.length && cands.length < 6; i++) {
            const t = targets[i]
            if (t.stage === 0 && assignable(t) && !cands.includes(t)) cands.push(t)
          }
        }
      }

      // progress active targets
      let activeCount = 0
      for (const t of targets) {
        if (t.stage === 1 || t.stage === 2) {
          activeCount++
          liveRect(t)
          const a = t.agent!
          if (t.stage === 1) {
            t.popT += dt
            a.flyT += dt
            const ax = t.r.left + 4
            const ay = t.r.top + 4
            const d = Math.hypot(ax - a.x, ay - a.y)
            if ((d < 60 && Math.hypot(a.vx, a.vy) < 900) || a.flyT > 1.0) {
              t.stage = 2
              t.t = 0
              a.working = true
              ripple(a.x, a.y)
            }
          } else {
            t.t += dt
            const tc = 0.4 * PACE
            if (t.t >= tc && !t.revealed) {
              reveal(t)
              if (t.kind !== 'text') ripple(a.x, a.y)
            }
            t.c = clamp((t.t - tc) / t.cd)
            applyContent(t)
            if (t.c >= 1 && t.agent) {
              a.target = null
              a.working = false
              t.agent = null
            }
            const tf = tc + t.cd
            t.fade = clamp((t.t - tf) / (0.45 * PACE))
            if (t.fade >= 1) {
              cleanup(t)
              t.stage = 3
              done++
              pushHud(true)
            }
          }
        }
      }

      // camera
      camCool -= dt
      let pendingView = 0
      let unfinishedView = 0
      let totalView = 0
      let firstPending: Target | null = null
      for (const t of targets) {
        if (t.stage === 0 && !firstPending) firstPending = t
        if (t.stage === 0 && assignable(t) && !inView(t)) pendingView++
        if (inView(t)) {
          totalView++
          if (t.stage === 0) pendingView++
          if (t.stage !== 3) unfinishedView++
        }
      }
      if (camCool <= 0 && pendingView === 0 && unfinishedView <= Math.max(2, totalView * 0.2)) {
        const ms = maxScroll()
        if (firstPending) {
          const next = clamp(firstPending.absTop - 110, sy + 140, Math.min(ms, sy + vh * 0.85))
          camTarget = Math.min(ms, Math.max(camTarget, next))
          camCool = 0.3
        } else if (sy < ms - 4 && stillT < 0.8) {
          camTarget = ms
          camCool = 0.3
        } else if (activeCount === 0) {
          phase = 'done'
          doneAt = sim
          exitT = 0
          for (const t of targets) cleanup(t)
          showChrome(chromeBg)
          showChrome(chromeUi)
          pushHud(true)
        }
      }
      // detect a camera that cannot scroll any further (browser max is a few px short of scrollHeight)
      stillT = Math.abs(sy - lastSy) < 0.3 && camTarget >= maxScroll() - 1 ? stillT + dt : 0
      lastSy = sy
      // scroll
      const ms = maxScroll()
      const ty = Math.min(camTarget, ms)
      const ny = sy + (ty - sy) * (1 - Math.exp(-dt * 4.2))
      if (Math.abs(ty - sy) > 0.5) window.scrollTo({ top: Math.abs(ty - ny) < 1 ? ty : ny, behavior: 'instant' as ScrollBehavior })
    }

    // finished: glide back to the top so the visitor lands on the hero
    if (phase === 'done' && sy > 1) {
      const ny = sy * Math.exp(-dt * 5)
      window.scrollTo({ top: ny < 2 ? 0 : ny, behavior: 'instant' as ScrollBehavior })
    }

    // refresh cached positions occasionally (layout can shift)
    if (Math.floor(sim * 2) !== Math.floor((sim - dt) * 2)) {
      for (const t of targets) {
        if (t.stage === 0) {
          const r = t.el.getBoundingClientRect()
          t.absTop = r.top + sy
          t.absBottom = r.bottom + sy
        }
      }
    }

    peak = Math.max(peak, agents.length)
    if (phase === 'done') exitT += dt
    stepAgents(dt)
    pushHud()
  }

  /* ---------------- agents ---------------- */
  let leader = { x: 0, y: 0 }
  let leaderInit = false
  const stepAgents = (dt: number) => {
    const n = agents.length
    let cx = 0
    let cy = 0
    for (const a of agents) {
      cx += a.x
      cy += a.y
    }
    cx /= n || 1
    cy /= n || 1

    // exit flock leader
    if (phase === 'done') {
      if (!leaderInit) {
        leader = { x: cx, y: cy }
        leaderInit = true
      }
      const T = exitT
      if (T < 0.5) {
        // gather
      } else {
        const p = clamp((T - 0.5) / 1.7)
        const e = easeInOut(p)
        const sx = cx
        // loop around the lower right then out the top right
        const ang = e * Math.PI * 2.2
        const bx = sx + (vw * 0.88 - sx) * e
        const by = vh * 0.55 + (-60 - vh * 0.55) * e
        leader = { x: bx + Math.sin(ang) * 90 * (1 - e), y: by - Math.cos(ang) * 90 * (1 - e) }
      }
    }

    for (const a of agents) {
      let px: number, py: number
      let k = 52
      let jitter = 0
      if (phase === 'done') {
        px = leader.x + a.offX * 0.7
        py = leader.y + a.offY * 0.7
        k = exitT < 0.5 ? 30 : 40
        if (exitT < 0.5) {
          px = cx + a.offX * 0.5
          py = cy + a.offY * 0.5
        }
      } else if (a.target) {
        const t = a.target
        if (a.working && t.kind === 'text' && t.revealed && t.c < 1) {
          const p = t.c * t.lines
          const full = Math.min(t.lines - 1, Math.floor(p))
          px = t.r.left + t.r.width * clamp(p - full) + 6
          py = t.r.top + (full + 0.5) * (t.r.height / t.lines) + 8
        } else if (t.stage === 1) {
          px = t.r.left + 4
          py = t.r.top + 4
        } else if (a.working && !t.revealed) {
          // drag from the top-left corner to the bottom-right while the box is drawn
          const e = easeInOut(t.t / (0.4 * PACE))
          px = t.r.left + 4 + (t.r.width - 8) * e
          py = t.r.top + 4 + (t.r.height - 8) * e
        } else {
          px = t.r.left + t.r.width * (0.3 + 0.4 * a.ax)
          py = t.r.top + t.r.height * (0.35 + 0.3 * a.ay)
        }
        px = clamp(px, 12, vw - 12)
        py = clamp(py, 12, vh - 12)
        if (a.working) {
          k = 90
          jitter = a.target.kind === 'text' ? 0 : 1.5
        }
      } else if (phase === 'scan') {
        const ci = agents.indexOf(a)
        if (sim > 0.9) {
          // visit blueprint anchors
          const anchors = blueprint()
          if (anchors.length) {
            const an = anchors[ci % anchors.length]
            px = an.x + 10
            py = an.y + 10
          } else {
            px = a.homeX
            py = a.homeY
          }
        } else {
          px = a.homeX + Math.sin(sim * 0.7 + a.phase) * 60
          py = a.homeY + Math.cos(sim * 0.6 + a.phase) * 40
        }
      } else {
        // idle in build phase: hover around some active element
        a.idleT -= dt
        if (a.idleT <= 0) {
          a.idleT = rnd(1.2, 2.8)
          const act = targets.filter((t) => t.stage === 2 || t.stage === 1)
          a.idleTarget = act.length ? act[Math.floor(Math.random() * act.length)] : null
          a.ix = rnd(0.05, 0.95)
          a.iy = rnd(0.05, 0.95)
        }
        if (a.idleTarget && a.idleTarget.stage !== 3) {
          const t = a.idleTarget
          px = clamp(t.r.left + t.r.width * a.ix, 12, vw - 12)
          py = clamp(t.r.top + t.r.height * a.iy, 12, vh - 12)
          k = 10
        } else {
          px = cx + a.offX * 3
          py = cy + a.offY * 3
          k = 5
        }
      }
      if (jitter) {
        px += Math.sin(sim * 8 + a.phase) * jitter
        py += Math.cos(sim * 6.5 + a.phase * 1.3) * jitter
      }
      const dx = px - a.x
      const dy = py - a.y
      const dist = Math.hypot(dx, dy)
      const c = 2 * Math.sqrt(k) * 0.82
      let ax = dx * k - a.vx * c
      let ay = dy * k - a.vy * c
      // curved flight
      const curve = a.curv * Math.min(1, dist / 260) * (a.working ? 0 : 1)
      ax += -a.vy * curve
      ay += a.vx * curve
      // wobble
      ax += Math.sin(sim * 2.1 + a.phase) * 6
      ay += Math.cos(sim * 1.7 + a.phase * 1.7) * 6
      // separation + loose cohesion
      for (const o of agents) {
        if (o === a) continue
        const ox = a.x - o.x
        const oy = a.y - o.y
        const d = Math.hypot(ox, oy) || 1
        if (d < 46) {
          const f = (1 - d / 46) * 900
          ax += (ox / d) * f
          ay += (oy / d) * f
        }
      }
      if (!a.target && phase !== 'done') {
        ax += (cx - a.x) * 0.5
        ay += (cy - a.y) * 0.5
      }
      a.vx += ax * dt
      a.vy += ay * dt
      const sp = Math.hypot(a.vx, a.vy)
      const maxSp = 1600
      if (sp > maxSp) {
        a.vx *= maxSp / sp
        a.vy *= maxSp / sp
      }
      a.x += a.vx * dt
      a.y += a.vy * dt
      a.trail.push({ x: a.x, y: a.y })
      if (a.trail.length > 9) a.trail.shift()
    }

    if (phase === 'done' && exitT > 2.5 && !ended) {
      agents.length = 0
      ended = true
      pushHud(true)
    }
  }

  /* ---------------- blueprint anchors ---------------- */
  let bpCache: { x: number; y: number }[] = []
  let bpBuilt = false
  const blueprint = () => {
    if (bpBuilt) return bpCache
    const list: { x: number; y: number }[] = []
    for (const t of targets) {
      if (inView(t) && list.length < 26) {
        const r = t.el.getBoundingClientRect()
        list.push({ x: r.left, y: r.top })
        if (list.length < 26 && r.width > 220) list.push({ x: r.right, y: r.bottom })
      }
    }
    bpCache = list
    bpBuilt = true
    return list
  }

  /* ---------------- draw ---------------- */
  const drawCross = (x: number, y: number, s: number, alpha: number, color = '#ffffff') => {
    if (alpha <= 0.01) return
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.strokeStyle = color
    ctx.lineWidth = 1.6
    const h = 6 * s
    ctx.beginPath()
    ctx.moveTo(x - h, y)
    ctx.lineTo(x + h, y)
    ctx.moveTo(x, y - h)
    ctx.lineTo(x, y + h)
    ctx.stroke()
    ctx.restore()
  }

  const drawRulers = (a: number) => {
    if (a < 0.02) return
    const S = 18
    ctx.save()
    ctx.globalAlpha = a
    ctx.fillStyle = 'rgba(22,3,9,0.9)'
    ctx.fillRect(0, 0, vw, S)
    ctx.fillRect(0, 0, S, vh)
    ctx.strokeStyle = 'rgba(217,149,159,0.8)'
    ctx.fillStyle = 'rgba(217,149,159,0.9)'
    ctx.font = '8px ui-monospace, monospace'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x < vw; x += 10) {
      const major = x % 100 === 0
      const mid = x % 50 === 0
      ctx.moveTo(x + 0.5, S)
      ctx.lineTo(x + 0.5, S - (major ? 12 : mid ? 8 : 4))
    }
    const off = sy % 10
    for (let y = -off; y < vh; y += 10) {
      const abs = Math.round(y + sy)
      const major = abs % 100 === 0
      const mid = abs % 50 === 0
      ctx.moveTo(S, y + 0.5)
      ctx.lineTo(S - (major ? 12 : mid ? 8 : 4), y + 0.5)
    }
    ctx.stroke()
    for (let x = 100; x < vw; x += 100) ctx.fillText(String(x), x + 3, 9)
    for (let y = 0; y < vh; y += 10) {
      const abs = Math.round(y + sy)
      if (abs % 100 === 0 && y > 20) {
        ctx.save()
        ctx.translate(9, y + 3)
        ctx.rotate(-Math.PI / 2)
        ctx.fillText(String(abs), 0, 0)
        ctx.restore()
      }
    }
    if (redLine) {
      const gx = vw * 0.17
      ctx.strokeStyle = '#b5485d'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(gx, 0)
      ctx.lineTo(gx, vh)
      ctx.stroke()
      ctx.fillStyle = '#b5485d'
      ctx.fillRect(gx - 1, 0, 3, S)
    }
    ctx.restore()
  }

  const drawBlueprint = () => {
    const alpha = clamp((sim - 0.9) / 0.3) * (1 - clamp((sim - 1.5) / 0.3))
    if (alpha <= 0.01) return
    const pts = blueprint()
    pts.forEach((p, i) => {
      const s = clamp((sim - 0.9 - i * 0.02) / 0.2)
      if (s <= 0) return
      const e = easeOut(s)
      ctx.save()
      ctx.globalAlpha = alpha
      if (i % 3 === 0) {
        ctx.strokeStyle = 'rgba(217,149,159,0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x + 0.5, 0)
        ctx.lineTo(p.x + 0.5, p.y * e)
        ctx.stroke()
      } else if (i % 3 === 1) {
        ctx.strokeStyle = 'rgba(217,149,159,0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, p.y + 0.5)
        ctx.lineTo(p.x * e, p.y + 0.5)
        ctx.stroke()
      }
      ctx.restore()
      drawCross(p.x, p.y, 0.4 + 0.6 * e, alpha * e, i % 5 === 0 ? CREAM : '#ffffff')
    })
  }

  const drawTarget = (t: Target) => {
    const { left, top, width, height } = t.r
    const out = 1 - t.fade
    if (t.stage === 1) {
      const s = easeOut(t.popT / 0.25)
      drawCross(left, top, s, s)
      return
    }
    const boxP = clamp(t.t / (0.4 * PACE))
    // crosshair fades as the box draws
    drawCross(left, top, 1, 1 - boxP)
    ctx.save()
    ctx.globalAlpha = out
    // placeholder fill
    if (t.kind !== 'text') {
      const f = t.kind === 'image' ? 0.16 : 0.1
      ctx.fillStyle = `rgba(217,149,159,${f * (t.revealed ? 1 - t.c : 1)})`
      ctx.fillRect(left, top, width * easeInOut(boxP), height * easeInOut(boxP))
    }
    ctx.strokeStyle = BLUE
    ctx.lineWidth = 1.5
    const be = easeInOut(boxP)
    ctx.strokeRect(left + 0.5, top + 0.5, width * be, height * be)
    if (boxP >= 1) {
      ctx.fillStyle = '#ffffff'
      ctx.lineWidth = 1
      const xs = [left, left + width / 2, left + width]
      const ys = [top, top + height / 2, top + height]
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          if (i === 1 && j === 1) continue
          ctx.fillRect(xs[i] - 2.5, ys[j] - 2.5, 5, 5)
          ctx.strokeRect(xs[i] - 2.5, ys[j] - 2.5, 5, 5)
        }
    }
    // label tag
    if (boxP > 0.5) {
      ctx.font = '600 9px ui-monospace, monospace'
      const tw = ctx.measureText(t.label).width + 10
      const ly = top > 30 ? top - 17 : top + height + 5
      ctx.fillStyle = CYAN
      ctx.fillRect(left, ly, tw, 13)
      ctx.fillStyle = CREAM
      ctx.fillText(t.label, left + 5, ly + 9.5)
    }
    // typing caret
    if (t.kind === 'text' && t.revealed && t.c < 1 && t.agent) {
      const p = t.c * t.lines
      const full = Math.min(t.lines - 1, Math.floor(p))
      const cx = left + width * clamp(p - full)
      const lh = Math.min(t.lineH, height / t.lines)
      const cy = top + full * (height / t.lines)
      ctx.strokeStyle = EDGE
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy + 2)
      ctx.lineTo(cx, cy + lh - 2)
      ctx.moveTo(cx - 3, cy + 2)
      ctx.lineTo(cx + 3, cy + 2)
      ctx.moveTo(cx - 3, cy + lh - 2)
      ctx.lineTo(cx + 3, cy + lh - 2)
      ctx.stroke()
    }
    ctx.restore()
  }

  const drawBand = () => {
    if (band < 0) return
    const p = band - 0.4
    if (p < 0 || p > 2) return
    const w = vw * easeInOut(clamp(p / 1.3))
    const a = 1 - clamp((p - 1.5) / 0.5)
    const y = vh * 0.5
    const h = 74
    ctx.save()
    ctx.globalAlpha = a
    ctx.fillStyle = 'rgba(217,149,159,0.12)'
    ctx.fillRect(0, y, w, h)
    ctx.strokeStyle = BLUE
    ctx.lineWidth = 1.4
    ctx.strokeRect(0.5, y + 0.5, w, h)
    ctx.fillStyle = '#fff'
    for (const hx of [0, w / 2, w]) for (const hy of [y, y + h / 2, y + h]) ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5)
    ctx.restore()
  }

  const drawAgent = (a: Agent) => {
    const sp = Math.hypot(a.vx, a.vy)
    if (sp > 420 && a.trail.length > 2) {
      ctx.save()
      ctx.lineCap = 'round'
      for (let i = 1; i < a.trail.length; i++) {
        ctx.globalAlpha = (i / a.trail.length) * clamp((sp - 420) / 900) * 0.5
        ctx.strokeStyle = EDGE
        ctx.lineWidth = 1 + (i / a.trail.length) * 2.5
        ctx.beginPath()
        ctx.moveTo(a.trail[i - 1].x + 2, a.trail[i - 1].y + 3)
        ctx.lineTo(a.trail[i].x + 2, a.trail[i].y + 3)
        ctx.stroke()
      }
      ctx.restore()
    }
    ctx.save()
    ctx.translate(a.x, a.y)
    ctx.shadowColor = 'rgba(255,255,255,0.55)'
    ctx.shadowBlur = 7
    ctx.fillStyle = a.color
    ctx.strokeStyle = EDGE
    ctx.lineWidth = 1.5
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 16)
    ctx.lineTo(4.2, 12.4)
    ctx.lineTo(7.2, 19)
    ctx.lineTo(10, 17.8)
    ctx.lineTo(7.1, 11.4)
    ctx.lineTo(12.5, 11.4)
    ctx.closePath()
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.stroke()
    ctx.restore()
  }

  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, vw, vh)
    if (ended) return
    drawBlueprint()
    drawRulers(rulerA)
    drawBand()
    for (const t of targets) if (t.stage === 1 || t.stage === 2) drawTarget(t)
    for (const r of ripples) {
      const p = (sim - r.t0) / 0.4
      if (p < 0 || p > 1) continue
      ctx.save()
      ctx.globalAlpha = (1 - p) * 0.8
      ctx.strokeStyle = EDGE
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(r.x, r.y, 4 + p * 16, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
    while (ripples.length && sim - ripples[0].t0 > 0.45) ripples.shift()
    for (const a of agents) drawAgent(a)
  }

  /* ---------------- loop ---------------- */
  const frame = (now: number) => {
    if (destroyed) return
    raf = requestAnimationFrame(frame)
    const rdt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (!paused && !(phase === 'done' && ended)) {
      const dt = rdt * speed * (vw < 640 ? TIME_NARROW : TIME)
      const n = Math.max(1, Math.ceil(dt / 0.02))
      for (let i = 0; i < n; i++) {
        sim += dt / n
        update(dt / n)
      }
    }
    draw()
    if (phase === 'done' && ended) {
      // nothing left to animate
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  let destroyed = false
  const restore = () => {
    for (const t of targets) cleanup(t)
    for (const el of [...chromeBg, ...chromeUi]) {
      el.removeAttribute('data-ab-fx')
      el.removeAttribute('data-ab-off')
    }
    if (phase === 'done') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    root.style.scrollBehavior = prevScrollBehavior
  }
  const userScroll = () => {
    if (phase !== 'done') ctl.skip()
  }
  const onKey = (e: KeyboardEvent) => {
    if (phase !== 'done' && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'End', 'Home'].includes(e.key)) ctl.skip()
  }
  window.addEventListener('wheel', userScroll, { passive: true })
  window.addEventListener('touchmove', userScroll, { passive: true })
  window.addEventListener('keydown', onKey)

  const ctl: Controller = {
    skip() {
      if (destroyed) return
      restore()
      onEnd('skip')
    },
    setSpeed(n) {
      speed = n
      pushHud(true)
    },
    togglePause() {
      paused = !paused
      pushHud(true)
    },
    destroy() {
      destroyed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('wheel', userScroll)
      window.removeEventListener('touchmove', userScroll)
      window.removeEventListener('keydown', onKey)
      restore()
    },
  }

  pushHud(true)
  raf = requestAnimationFrame(frame)
  return ctl
}
