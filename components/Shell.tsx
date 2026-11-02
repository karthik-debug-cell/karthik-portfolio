'use client'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { profile } from '@/data/profile'
import Preloader from '@/components/Preloader'

gsap.registerPlugin(ScrollTrigger, useGSAP)
const Ctx = createContext<{ go: (h: string) => void }>({ go: () => {} })
export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Internal link that plays the page-transition overlay before navigating. */
export function TLink({ href, children, onClick, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { go } = useContext(Ctx)
  return (
    <Link href={href} {...p} onClick={(e) => {
      onClick?.(e)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault(); go(href)
    }}>{children}</Link>
  )
}

const links = [['Work', '/work'], ['About', '/about'], ['Contact', '/contact']]

function Nav({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    const m = menu.current!
    document.documentElement.classList.toggle('menu-open', open)
    const tl = gsap.timeline()
    if (open) {
      tl.set(m, { visibility: 'visible' })
        .to(m, { clipPath: 'inset(0% 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
        .fromTo(m.querySelectorAll('.i'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.08 }, '-=0.3')
    } else tl.to(m, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' }).set(m, { visibility: 'hidden' })
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { tl.kill(); window.removeEventListener('keydown', esc) }
  }, [open])
  return (
    <>
      <header className="nav">
        <TLink href="/" className="logo" aria-label="Karthik, home">Karthik</TLink>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([l, h]) => <TLink key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{l}</TLink>)}
        </nav>
        <span className="avail"><i /> Available</span>
        <button className={`burger${open ? ' on' : ''}`} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span /><span /></button>
      </header>
      <div id="menu" ref={menu} className="menu" aria-hidden={!open}>
        {[['Home', '/'], ...links].map(([l, h]) => (
          <div className="m" key={h}><TLink href={h} className="i disp" tabIndex={open ? 0 : -1}>{l}</TLink></div>
        ))}
        <p className="meta">{profile.email}</p>
      </div>
    </>
  )
}

function Cursor() {
  const el = useRef<HTMLDivElement>(null), lab = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const c = el.current!
    const xs = gsap.quickTo(c, 'x', { duration: 0.45, ease: 'power3' }), ys = gsap.quickTo(c, 'y', { duration: 0.45, ease: 'power3' })
    const mv = (e: MouseEvent) => { c.style.opacity = '1'; xs(e.clientX); ys(e.clientY) }
    const ov = (e: MouseEvent) => {
      const t = e.target as HTMLElement, d = t.closest<HTMLElement>('[data-cursor]')
      lab.current!.textContent = d?.dataset.cursor || ''
      c.classList.toggle('lg', !!d); c.classList.toggle('md', !d && !!t.closest('a,button'))
    }
    window.addEventListener('mousemove', mv, { passive: true }); document.addEventListener('mouseover', ov)
    document.documentElement.classList.add('custom-cursor')
    return () => { window.removeEventListener('mousemove', mv); document.removeEventListener('mouseover', ov); document.documentElement.classList.remove('custom-cursor') }
  }, [])
  return <div ref={el} className="cursor" aria-hidden="true"><span ref={lab} /></div>
}

function Footer() {
  return (
    <footer className="foot" role="contentinfo" aria-label="Site footer">
      <div className="wrap foot-wrap">
        <p className="meta foot-copy">© 2026 KARTHIK&nbsp; M</p>
      </div>
    </footer>
  )
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname(), router = useRouter()
  const root = useRef<HTMLDivElement>(null), ov = useRef<HTMLDivElement>(null)
  const pre = useRef<HTMLDivElement>(null)
  const lenis = useRef<Lenis | null>(null), busy = useRef(false), done = useRef(false)
  const [loaded, setLoaded] = useState(false)

  // Lenis smooth scroll synced with ScrollTrigger
  useEffect(() => {
    if (reduced()) return
    const l = new Lenis({ lerp: 0.1 }); lenis.current = l
    l.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null }
  }, [])

  const go = useCallback((href: string) => {
    const target = href.split('#')[0] || '/'
    if (busy.current) return
    if (target === path) { lenis.current ? lenis.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (reduced()) { router.push(href); return }
    busy.current = true
    gsap.fromTo(ov.current, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power4.inOut', onComplete: () => router.push(href) })
  }, [path, router])

  useGSAP(() => {
    const first = !done.current, viaGo = busy.current
    window.scrollTo(0, 0); lenis.current?.scrollTo(0, { immediate: true })

    if (reduced()) {
      done.current = true
      busy.current = false
      setLoaded(true)
      lenis.current?.start()
      document.documentElement.style.overflow = ''
      gsap.set('[data-intro]', { yPercent: 0 })
      gsap.set('[data-fade]', { opacity: 1, y: 0 })
      return
    }

    gsap.set('[data-intro]', { yPercent: 110 })
    gsap.set('[data-fade]', { opacity: 0, y: 24 })

    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false
      }
    })

    if (first && pre.current) {
      // Lock scroll while preloader runs
      lenis.current?.stop()
      document.documentElement.style.overflow = 'hidden'

      // Readiness gatekeeper setup (Fonts, Document, Priority Images)
      let isReady = false
      const readyPromise = new Promise<void>((resolve) => {
        if (typeof window === 'undefined') return resolve()
        let finished = false
        const complete = () => {
          if (!finished) {
            finished = true
            isReady = true
            resolve()
          }
        }
        // Fallback safety timeout (max 2.4s to prevent hanging)
        const timer = setTimeout(complete, 2400)

        const checkFonts = document.fonts ? document.fonts.ready : Promise.resolve()
        const checkDoc = document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }))

        const checkImages = new Promise<void>((r) => {
          const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[priority], .feat img'))
          if (imgs.length === 0) return r()
          let pending = imgs.length
          imgs.forEach((img) => {
            if (img.complete) {
              pending--
              if (pending === 0) r()
            } else {
              img.addEventListener('load', () => { pending--; if (pending === 0) r() }, { once: true })
              img.addEventListener('error', () => { pending--; if (pending === 0) r() }, { once: true })
            }
          })
        })

        Promise.all([checkFonts, checkDoc, checkImages]).then(() => {
          clearTimeout(timer)
          complete()
        })
      })

      // Stage 1: Clean white screen initialization
      gsap.set('.frame-line-h-top', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.frame-line-v-left-outer', { scaleY: 0, transformOrigin: 'top center' })
      gsap.set('.frame-line-v-left-inner', { scaleY: 0, transformOrigin: 'top center' })
      gsap.set('.frame-line-v-right-inner', { scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set('.frame-line-v-right-outer', { scaleY: 0, transformOrigin: 'top center' })
      gsap.set('.frame-line-h-bottom', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.frame-wordmark', { opacity: 0, y: 10 })

      // Stage 2: Architectural frame construction (Progressive line drawing)
      const easeDraw = 'power3.inOut'

      tl.to('.frame-line-h-top', {
        scaleX: 1,
        duration: 0.65,
        ease: easeDraw,
      }, 0.12)
        .to('.frame-line-v-left-outer', {
          scaleY: 1,
          duration: 0.65,
          ease: easeDraw,
        }, 0.26)
        .to('.frame-line-v-left-inner', {
          scaleY: 1,
          duration: 0.65,
          ease: easeDraw,
        }, 0.4)
        .to('.frame-line-v-right-inner', {
          scaleY: 1,
          duration: 0.65,
          ease: easeDraw,
        }, 0.48)
        .to('.frame-line-v-right-outer', {
          scaleY: 1,
          duration: 0.65,
          ease: easeDraw,
        }, 0.56)
        .to('.frame-line-h-bottom', {
          scaleX: 1,
          duration: 0.65,
          ease: easeDraw,
        }, 0.7)

      // Stage 3: Central typography reveal
      tl.to('.frame-wordmark', {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
      }, 0.65)

      // Hold frame briefly & verify page readiness
      tl.add(() => {
        if (!isReady) {
          tl.pause()
          readyPromise.then(() => {
            isReady = true
            tl.resume()
          })
        }
      }, '+=0.35')

      // Stage 4: Cinematic Exit (Subtle typography drift & curtain wipe)
      tl.to('.frame-wordmark', {
        opacity: 0,
        y: -6,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2')
        .to('.frame-line', {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        }, '<')
        .to(pre.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            done.current = true
            setLoaded(true)
            lenis.current?.start()
            document.documentElement.style.overflow = ''
          }
        }, '-=0.15')
    } else if (viaGo) {
      tl.fromTo(ov.current, { clipPath: 'inset(0% 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power4.inOut' }, 0.1)
        .set(ov.current, { clipPath: 'inset(100% 0 0 0)' })
    }

    const at = first || viaGo ? '-=0.55' : 0
    tl.to('[data-intro]', { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.07 }, at)
      .to('[data-fade]', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, '<0.25')

    const st = { start: 'top 90%' }
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, ...st } }))
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => gsap.from(el.children, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%' } }))
    gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
      const trig = { trigger: el, start: 'top 92%' }, img = el.querySelector('img')
      gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut', scrollTrigger: trig })
      if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'power3.out', scrollTrigger: trig })
    })
    gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((el) =>
      gsap.fromTo(el.querySelectorAll('span'), { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true } }))
    const mm = gsap.matchMedia()
    mm.add('(min-width: 821px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) =>
        gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }))
    })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, { scope: root, dependencies: [path], revertOnUpdate: true })

  return (
    <Ctx.Provider value={{ go }}>
      <div ref={root}>
        {!loaded && <Preloader ref={pre} />}
        <div ref={ov} className="ovl" aria-hidden="true" />
        <a className="skip" href="#main">Skip to content</a>
        <Nav path={path} />
        <Cursor />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </Ctx.Provider>
  )
}
