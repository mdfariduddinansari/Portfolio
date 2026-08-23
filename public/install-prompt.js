// Lightweight "Add to Home Screen" banner for the portfolio PWA.
// Shows only when the browser fires beforeinstallprompt, waits a couple of
// seconds so it never interrupts the hero animation, and is dismissible.
(function () {
  var DISMISS_KEY = 'fa-portfolio-install-dismissed'
  var deferredPrompt = null

  function alreadyDismissed() {
    try {
      return window.localStorage.getItem(DISMISS_KEY) === '1'
    } catch (error) {
      return false
    }
  }

  function markDismissed() {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1')
    } catch (error) {
      // Storage may be unavailable (private browsing); fail silently.
    }
  }

  function showBanner() {
    if (document.getElementById('pwa-install-banner')) return

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    var banner = document.createElement('div')
    banner.id = 'pwa-install-banner'
    banner.setAttribute('role', 'dialog')
    banner.setAttribute('aria-label', 'Install this portfolio as an app')
    banner.style.cssText = [
      'position:fixed', 'z-index:100', 'left:16px', 'right:16px', 'bottom:16px',
      'display:flex', 'align-items:center', 'gap:12px', 'max-width:420px', 'margin:0 auto',
      'padding:14px 16px', 'border-radius:12px', 'border:1px solid rgba(190,205,230,0.18)',
      'background:rgba(15,18,26,0.92)', 'backdrop-filter:blur(12px)',
      'box-shadow:0 20px 45px rgba(0,0,0,0.35)', 'color:#f1f5fb',
      'font-family:inherit', 'font-size:13px',
      reducedMotion ? 'opacity:1' : 'opacity:0;transform:translateY(12px);transition:opacity .35s ease,transform .35s ease',
    ].join(';')

    banner.innerHTML =
      '<span style="flex:1;line-height:1.4;">Install this portfolio for quick, offline access.</span>' +
      '<button type="button" id="pwa-install-accept" style="padding:8px 12px;border:0;border-radius:8px;background:#73ddff;color:#061018;font-weight:700;font-size:12px;cursor:pointer;">Install</button>' +
      '<button type="button" id="pwa-install-dismiss" aria-label="Dismiss install prompt" style="padding:8px;border:0;border-radius:8px;background:transparent;color:#a8b1c1;font-size:12px;cursor:pointer;">Not now</button>'

    document.body.appendChild(banner)

    if (!reducedMotion) {
      requestAnimationFrame(function () {
        banner.style.opacity = '1'
        banner.style.transform = 'translateY(0)'
      })
    }

    function removeBanner() {
      banner.remove()
    }

    document.getElementById('pwa-install-accept').addEventListener('click', function () {
      removeBanner()
      if (!deferredPrompt) return
      deferredPrompt.prompt()
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null
      })
    })

    document.getElementById('pwa-install-dismiss').addEventListener('click', function () {
      markDismissed()
      removeBanner()
    })
  }

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault()
    if (alreadyDismissed()) return
    deferredPrompt = event
    window.setTimeout(showBanner, 2000)
  })

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null
    var banner = document.getElementById('pwa-install-banner')
    if (banner) banner.remove()
  })
})()
