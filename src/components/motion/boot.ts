/**
 * Inline, render-blocking: enables hidden reveal states only when JS runs and
 * motion is allowed, and falls back to fully visible content if the
 * controller hasn't booted within 3s.
 */
export const revealBootScript = `(function(h){try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;h.classList.add('reveal-on');setTimeout(function(){if(!h.classList.contains('reveal-ready'))h.classList.remove('reveal-on')},3000)}catch(e){}})(document.documentElement)`;
