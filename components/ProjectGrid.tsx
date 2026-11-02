'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { reduced } from './Shell'
import type { Project } from '@/data/projects'

gsap.registerPlugin(Flip)
const cats = ['All', 'Computer Vision', 'Deep Learning', 'Machine Learning']

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [f, setF] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const st = useRef<Flip.FlipState | null>(null)
  const vis = projects.filter((p) => f === 'All' || p.cats.includes(f)).map((p) => p.slug)

  const pick = (c: string) => {
    if (c === f) return
    if (ref.current && !reduced()) st.current = Flip.getState(ref.current.children)
    setF(c)
  }

  useLayoutEffect(() => {
    if (!st.current) return
    const s = st.current
    st.current = null
    Flip.from(s, {
      duration: 0.8,
      ease: 'power3.inOut',
      absolute: true,
      onEnter: (e) =>
        gsap.fromTo(
          e,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, clearProps: 'opacity,transform' }
        ),
      onLeave: (e) => gsap.to(e, { opacity: 0, scale: 0.92, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [f])

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {cats.map((c) => (
          <button
            key={c}
            className={c === f ? 'on' : ''}
            aria-pressed={c === f}
            onClick={() => pick(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="meta" aria-live="polite">
        Showing {vis.length} {vis.length === 1 ? 'project' : 'projects'}
      </p>
      <div className="pgrid" ref={ref}>
        {projects.map((p, i) => {
          const n = vis.indexOf(p.slug)
          const cls = n < 0 ? 'hide' : 'wide'
          return <ProjectCard key={p.slug} p={p} i={i} cls={cls} sizes="100vw" />
        })}
      </div>
    </>
  )
}
