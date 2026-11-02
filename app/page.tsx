import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { TLink } from '@/components/Shell'
import L from '@/components/Mask'
import { projects } from '@/data/projects'
import { profile, skills } from '@/data/profile'

const statement = 'I study information technology and spend my time turning messy data into models, and models into software people can use.'

export default function Home() {
  const f = projects[0]
  return (
    <>
      <section className="hero wrap">
        <div className="hero-top meta" data-fade>
          <span>Information Technology Student</span>
          <span className="avail"><i /> Available for internships and collaborations</span>
        </div>
        <h1 className="disp hero-h">
          <L className="kick">Hello, I’m Karthik.</L>
          <L>I build digital</L><L>experiences through</L><L>code, data &amp; AI.</L>
        </h1>
        <div className="hero-bot">
          <div data-fade>
            <p className="lead">Data Analytics, Artificial Intelligence and Software Development, studied at Ramco Institute of Technology.</p>
            <span className="scroll meta"><b /> Scroll</span>
          </div>
          <TLink href={`/work/${f.slug}`} className="feat" data-fade data-cursor="View project">
            <div className="pimg"><Image src={f.images[0]} alt={f.alt} fill sizes="(max-width: 820px) 100vw, 28vw" priority /></div>
            <span className="meta">Featured: {f.title} <ArrowUpRight size={14} /></span>
          </TLink>
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-head">
          <h2 className="disp h-l" data-reveal>Featured work</h2>
          <TLink href="/work" className="ulink" data-reveal>All projects <ArrowUpRight size={18} /></TLink>
        </div>
        <div className="pgrid">
          {projects.map((p, i) => (
            <article key={p.slug} className={`pcard half${i === 1 ? ' off' : ''}`}>
              <TLink href={`/work/${p.slug}`} data-cursor="View project" aria-label={`View project: ${p.title}`}>
                <div className="pimg" data-clip>
                  <Image src={p.images[0]} alt={p.alt} fill sizes="(max-width: 820px) 100vw, 50vw" priority={i === 0} />
                </div>
                <div className="pmeta">
                  <span className="meta">{p.projectNumber} · {p.category}</span>
                  <span className="meta">{p.duration}</span>
                </div>
                <div className="ptitle">
                  <h3 className="disp h-m" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.8rem)', lineHeight: 0.95 }}>
                    {p.displayTitle}
                  </h3>
                  <ArrowUpRight className="parrow" size={40} aria-hidden="true" />
                </div>
                <p className="meta" style={{ color: 'var(--tx2)', margin: '6px 0 10px' }}>
                  {p.subtitle}
                </p>
                <p className="lead" style={{ fontSize: '1.05rem', margin: '8px 0 16px', maxWidth: '38em' }}>
                  {p.summary}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center', marginTop: '12px' }}>
                  <p className="meta">{p.tech.slice(0, 5).join(', ')}</p>
                  <span className="ulink" style={{ marginLeft: 'auto', fontSize: '0.86rem' }}>
                    View project <ArrowUpRight size={14} />
                  </span>
                </div>
              </TLink>
            </article>
          ))}
        </div>
      </section>

      <section className="sec wrap about-p">
        <p className="meta" data-reveal>About</p>
        <p className="disp h-m statement" data-scrub aria-label={statement}>
          {statement.split(' ').map((w, i) => <span key={i} aria-hidden="true">{w} </span>)}
        </p>
        <TLink href="/about" className="ulink" data-reveal>More about me <ArrowUpRight size={18} /></TLink>
      </section>

      <section className="sec wrap skills">
        <div className="sticky"><h2 className="disp h-l" data-reveal>Technical expertise</h2></div>
        <div data-stagger>
          {skills.map((s) => (
            <div className="srow" key={s.group}><h3 className="disp h-m">{s.group}</h3><p>{s.items.join(', ')}</p></div>
          ))}
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap">
          <h2 className="disp h-l" data-reveal>Achievements</h2>
          <ul className="ach" data-stagger>
            {profile.achievements.map((a) => <li key={a.title}><span className="disp h-m">{a.title}</span><span className="meta">{a.note}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="sec wrap cta">
        <p className="meta" data-reveal>Open to opportunities</p>
        <a href={`mailto:${profile.email}`} className="disp h-xl cta-link" data-reveal data-cursor="Say hello">Let’s build something.</a>
        <TLink href="/contact" className="ulink" data-reveal>Get in touch <ArrowUpRight size={18} /></TLink>
      </section>
    </>
  )
}
