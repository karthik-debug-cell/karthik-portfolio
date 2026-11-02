import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Karthik M — Open to opportunities in Data, AI and Software.',
}

export default function Contact() {
  return <ContactContent />
}
