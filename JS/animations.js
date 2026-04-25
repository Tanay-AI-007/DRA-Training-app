/* ============================================
   DRA Training — Shared Animation Utilities
   Pure vanilla JS, no libraries.
   ============================================ */

/* ── Offline / Online Overlay ── */
export function initOfflineOverlay() {
  // Create overlay element
  const overlay = document.createElement('div')
  overlay.className = 'offline-overlay'
  overlay.innerHTML = `
    <div class="offline-icon">📡</div>
    <h2>No Internet Connection</h2>
    <p>Please check your network and try again.</p>
  `
  document.body.appendChild(overlay)

  window.addEventListener('offline', () => overlay.classList.add('visible'))
  window.addEventListener('online', () => overlay.classList.remove('visible'))
  // If already offline on load
  if (!navigator.onLine) overlay.classList.add('visible')
}

/* ── Line Waves SVG Background ── */
export function injectLineWaves(light = false) {
  const container = document.createElement('div')
  container.className = 'line-waves-bg' + (light ? ' line-waves-bg-light' : '')
  container.innerHTML = `
    <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
      <g class="wave-group-1">
        <path d="M0,400 C150,350 350,500 600,400 C850,300 1050,450 1200,400"/>
        <path d="M0,450 C200,400 400,550 600,450 C800,350 1000,500 1200,450"/>
        <path d="M0,500 C180,460 380,580 600,500 C820,420 1020,540 1200,500"/>
      </g>
      <g class="wave-group-2">
        <path d="M0,300 C120,260 320,380 600,300 C880,220 1080,340 1200,300"/>
        <path d="M0,350 C200,310 400,430 600,350 C800,270 1000,390 1200,350"/>
      </g>
      <g class="wave-group-3">
        <path d="M0,550 C160,510 360,630 600,550 C840,470 1040,590 1200,550"/>
        <path d="M0,600 C140,570 340,670 600,600 C860,530 1060,630 1200,600"/>
        <path d="M0,650 C180,620 380,720 600,650 C820,580 1020,680 1200,650"/>
      </g>
    </svg>
  `
  document.body.prepend(container)
}

/* ── Split Text Animation ── */
export function splitTextAnimate(selector, staggerMs = 50) {
  const el = document.querySelector(selector)
  if (!el) return 0
  const text = el.textContent
  el.textContent = ''
  el.style.visibility = 'visible'
  const letters = text.split('')
  letters.forEach((char, i) => {
    const span = document.createElement('span')
    span.className = 'split-letter'
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.animationDelay = `${i * staggerMs}ms`
    el.appendChild(span)
  })
  return letters.length * staggerMs + 500 // total duration
}

/* ── Typewriter Effect ── */
export function typewriter(selector, text, speed = 60, startDelay = 0) {
  const el = document.querySelector(selector)
  if (!el) return
  el.textContent = ''
  el.style.visibility = 'visible'
  const cursor = document.createElement('span')
  cursor.className = 'typewriter-cursor'
  el.appendChild(cursor)
  let i = 0
  setTimeout(() => {
    const interval = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor)
        i++
      } else {
        clearInterval(interval)
        // Remove cursor after 2s
        setTimeout(() => cursor.remove(), 2000)
      }
    }, speed)
  }, startDelay)
}

/* ── Count Up Number Animation ── */
export function countUp(el, target, duration = 1500, prefix = '', suffix = '') {
  const start = performance.now()
  const numTarget = parseFloat(target)
  if (isNaN(numTarget)) return

  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = Math.round(numTarget * ease)
    el.textContent = prefix + current.toLocaleString() + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

/* ── Tilt Card Effect ── */
export function initTiltCards(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.classList.add('tilt-card')
    // Add shine overlay
    const shine = document.createElement('div')
    shine.className = 'tilt-shine'
    card.appendChild(shine)

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      shine.style.opacity = '1'
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 60%)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0)'
      shine.style.opacity = '0'
    })
  })
}

/* ── Spotlight Effect for Buttons ── */
export function initSpotlightButtons(selector) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.classList.add('spotlight-btn')
    const glow = document.createElement('div')
    glow.className = 'spotlight-glow'
    btn.appendChild(glow)

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 60%)`
    })
  })
}

/* ── Glare Card ── */
export function initGlareCard(selector) {
  const card = document.querySelector(selector)
  if (!card) return
  card.classList.add('glare-card')
  const overlay = document.createElement('div')
  overlay.className = 'glare-overlay'
  card.appendChild(overlay)

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    overlay.style.opacity = '1'
    overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 50%)`
  })

  card.addEventListener('mouseleave', () => {
    overlay.style.opacity = '0'
  })
}

/* ── Confetti ── */
export function launchConfetti(duration = 3000) {
  const container = document.createElement('div')
  container.className = 'confetti-container'
  document.body.appendChild(container)

  const colors = ['#1a56db', '#3b82f6', '#93c5fd', '#ffffff', '#dbeafe']
  const count = 60

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div')
    piece.className = 'confetti-piece'
    piece.style.left = Math.random() * 100 + '%'
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    piece.style.width = (Math.random() * 8 + 6) + 'px'
    piece.style.height = (Math.random() * 8 + 6) + 'px'
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's'
    piece.style.animationDelay = (Math.random() * 1.5) + 's'
    container.appendChild(piece)
  }

  setTimeout(() => container.remove(), duration + 2000)
}

/* ── Stagger Fade-In Utility ── */
export function staggerFadeIn(selector, staggerMs = 100) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('anim-stagger')
    el.style.animationDelay = `${i * staggerMs}ms`
  })
}
