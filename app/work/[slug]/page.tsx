import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { TLink } from '@/components/Shell'
import L from '@/components/Mask'
import { getProject, projects } from '@/data/projects'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug)
  return p
    ? {
        title: p.fullTitle,
        description: p.summary,
        openGraph: {
          title: p.fullTitle,
          description: p.summary,
          images: [p.images[0]],
        },
      }
    : {}
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="row wrap">
    <h2 className="meta" data-reveal>{label}</h2>
    <div className="rc" data-reveal>{children}</div>
  </section>
)

export default async function Project({ params }: Props) {
  const p = getProject((await params).slug)
  if (!p) notFound()

  const i = projects.indexOf(p)
  const prev = projects[(i + projects.length - 1) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <article>
      {/* 13. Back to Work link (Header) */}
      <header className="wrap page-top">
        <TLink href="/work" className="ulink back" data-fade>
          <ArrowLeft size={16} /> Back to work
        </TLink>

        {/* 2. Project title */}
        <h1 className="disp h-xl dh">
          {p.fullTitle.split(' ').map((w, k) => (
            <L key={k} className="in">{w}&nbsp;</L>
          ))}
        </h1>

        <div className="facts" data-fade>
          <div>
            <span className="meta">Category</span>
            <p>{p.category}</p>
          </div>
          <div>
            <span className="meta">Duration</span>
            <p>{p.duration}</p>
          </div>
          <div>
            <span className="meta">Role</span>
            <p>{p.role}</p>
          </div>
          <div>
            <span className="meta">Domain</span>
            <p>{p.subtitle}</p>
          </div>
        </div>
        <p className="lead" data-fade>{p.summary}</p>
      </header>

      {/* 1. Full-width hero image */}
      <div className="wrap">
        <div className="pimg dhero" data-clip>
          <div className="px" data-parallax>
            <Image src={p.images[0]} alt={p.alt} fill priority sizes="100vw" />
          </div>
        </div>
      </div>

      {/* 3. Project overview */}
      <Row label="Project overview">
        <p className="big">{p.overview}</p>
      </Row>

      {/* 4. Problem statement */}
      <Row label="Problem statement">
        <p className="big">{p.problem}</p>
      </Row>

      {/* 5. Project objectives */}
      <Row label="Project objectives">
        <ul className="list">
          {p.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Row>

      {/* 6. My role */}
      <Row label="My role">
        <p className="big">{p.role}</p>
        <p style={{ color: 'var(--tx2)', marginTop: '8px' }}>{p.roleDetails}</p>
      </Row>

      {/* 7. Technical approach */}
      <Row label="Technical approach">
        <p className="big">{p.approach}</p>
      </Row>

      {/* 8. Model development */}
      <Row label="Model development">
        <ul className="list">
          {p.modelDevelopment.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Row>

      {/* 9. Technologies used */}
      <Row label="Technologies used">
        <p className="tags">
          {p.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      </Row>

      {/* 10. Results and evaluation, where verified */}
      <Row label="Evaluation & results">
        {p.metrics && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {p.metrics.map((m) => (
              <div key={m.label} style={{ border: '1px solid var(--bd)', padding: '20px', borderRadius: '4px' }}>
                <span className="meta" style={{ display: 'block', marginBottom: '6px' }}>{m.label}</span>
                <span className="disp h-m" style={{ color: 'var(--tx)' }}>{m.val}</span>
              </div>
            ))}
          </div>
        )}
        <p className="big">{p.results}</p>
      </Row>

      {/* 11. Key contributions */}
      <Row label="Key contributions">
        <ul className="list">
          {p.contributions.map((c, idx) => (
            <li key={idx}>
              <strong>0{idx + 1}.</strong> {c}
            </li>
          ))}
        </ul>
      </Row>

      {/* Visuals Gallery */}
      <section className="wrap gallery" aria-label="Project visual analysis gallery">
        {p.images.slice(1).map((src, k) => (
          <div key={src} className="pimg" data-clip>
            <Image
              src={src}
              alt={`${p.title} analysis visual ${k + 2}`}
              fill
              sizes="(max-width: 820px) 100vw, 50vw"
            />
          </div>
        ))}
      </section>

      {/* 13. Back to Work link (Bottom section) */}
      <div className="wrap" style={{ paddingBlock: 'clamp(28px, 4vw, 48px)' }}>
        <TLink href="/work" className="ulink">
          <ArrowLeft size={16} /> Back to all work
        </TLink>
      </div>

      {/* 12. Previous / Next project navigation */}
      <nav className="pn dark" aria-label="Project navigation">
        <TLink href={`/work/${prev.slug}`} data-cursor="Previous project">
          <span className="meta">Previous project</span>
          <span className="disp h-m">
            <ArrowLeft size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            {prev.title}
          </span>
        </TLink>
        <TLink href={`/work/${next.slug}`} data-cursor="Next project">
          <span className="meta">Next project</span>
          <span className="disp h-m">
            {next.title} <ArrowUpRight size={28} />
          </span>
        </TLink>
      </nav>
    </article>
  )
}
