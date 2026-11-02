import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { TLink } from './Shell'
import type { Project } from '@/data/projects'

export default function ProjectCard({
  p,
  i,
  cls = '',
  sizes = '(max-width: 820px) 100vw, 50vw',
}: {
  p: Project
  i: number
  cls?: string
  sizes?: string
}) {
  return (
    <article className={`pcard ${cls}`}>
      <TLink href={`/work/${p.slug}`} data-cursor="View case study" aria-label={`View case study: ${p.title}`}>
        <div className="pimg" data-clip>
          <Image src={p.images[0]} alt={p.alt} fill sizes={sizes} priority={i === 0} />
        </div>
        <div className="pmeta">
          <span className="meta">{String(i + 1).padStart(2, '0')} / {p.category}</span>
          <span className="meta">{p.duration || p.year}</span>
        </div>
        <div className="ptitle">
          <h3 className="disp h-m">{p.fullTitle || p.title}</h3>
          <ArrowUpRight className="parrow" size={36} aria-hidden="true" />
        </div>
        {p.subtitle && (
          <p className="meta" style={{ color: 'var(--tx2)', marginTop: '4px', marginBottom: '8px' }}>
            {p.subtitle}
          </p>
        )}
        <p className="lead" style={{ fontSize: '1.05rem', margin: '8px 0 14px', maxWidth: '38em' }}>
          {p.summary}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center', marginTop: '12px' }}>
          <p className="meta">{p.tech.join(', ')}</p>
          <span className="ulink" style={{ marginLeft: 'auto', fontSize: '0.84rem' }}>
            View case study <ArrowUpRight size={14} />
          </span>
        </div>
      </TLink>
    </article>
  )
}
