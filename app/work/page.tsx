import type { Metadata } from 'next'
import L from '@/components/Mask'
import ProjectGrid from '@/components/ProjectGrid'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected computer vision and deep learning projects: Forest Fire Detection and Tomato Disease Classification.',
}

export default function Work() {
  return (
    <section className="wrap page-top">
      <h1 className="disp h-xl"><L>Work</L></h1>
      <p className="lead" data-fade>
        Two featured projects in machine learning, deep learning and computer vision: satellite imagery fire detection and transfer-learning tomato leaf disease classification.
      </p>
      <ProjectGrid projects={projects} />
    </section>
  )
}
