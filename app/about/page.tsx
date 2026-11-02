import type { Metadata } from 'next'
import L from '@/components/Mask'
import { profile, skills } from '@/data/profile'

export const metadata: Metadata = { title: 'About', description: 'Education, interests, certifications and achievements of Karthik, B.Tech Information Technology student.' }

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="row"><h2 className="meta" data-reveal>{label}</h2><div className="rc" data-reveal>{children}</div></section>
)

export default function About() {
  return (
    <div className="wrap page-top">
      <h1 className="disp h-xl"><L>About</L></h1>
      <p className="disp h-m intro" data-fade>I’m Karthik, an information technology student who likes finding the signal in data and shipping it as software.</p>
      <Row label="Education"><p className="big">{profile.education.degree}</p><p>{profile.education.school}</p></Row>
      <Row label="Technical interests"><ul className="list">{profile.interests.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="tags">{skills.flatMap((s) => s.items).map((t) => <span key={t}>{t}</span>)}</p></Row>
      <Row label="Professional goals"><p className="big">{profile.goals}</p></Row>
      <Row label="Experience">{profile.experience.map((e) => <div key={e.role}><p className="big">{e.role}</p><p>{e.note}</p></div>)}</Row>
      <Row label="Certifications"><ul className="list">{profile.certifications.map((c) => <li key={c}>{c}</li>)}</ul></Row>
      <Row label="Achievements"><ul className="list">{profile.achievements.map((a) => <li key={a.title}>{a.title}, {a.note.toLowerCase()}</li>)}</ul></Row>
    </div>
  )
}
