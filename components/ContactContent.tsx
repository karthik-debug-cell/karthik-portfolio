'use client'
import React, { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import L from '@/components/Mask'
import { profile } from '@/data/profile'

export default function ContactContent() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(profile.email)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = profile.email
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const channels = [
    {
      label: 'LinkedIn',
      code: '01',
      display: profile.linkedin.replace('https://', ''),
      href: profile.linkedin,
      external: true,
    },
    {
      label: 'GitHub',
      code: '02',
      display: profile.github.replace('https://', ''),
      href: profile.github,
      external: true,
    },
    {
      label: 'Phone',
      code: '03',
      display: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
      external: false,
    },
  ]

  return (
    <div className="wrap contact-hero-wrap">
      {/* 3. Availability Indicator and Location Metadata */}
      <div className="contact-top-bar meta" data-fade>
        <span className="avail">
          <i /> OPEN TO OPPORTUNITIES
        </span>
        <span className="contact-geo-meta">
          TAMIL NADU, INDIA · IST (UTC+5:30)
        </span>
      </div>

      {/* Hero Heading: LET'S TALK. */}
      <h1 className="disp contact-hero-h">
        <L>LET&apos;S</L>
        <br />
        <L>TALK.</L>
      </h1>

      {/* Supporting text */}
      <p className="lead contact-lead" data-fade>
        Have an idea, opportunity or interesting project? I&apos;d love to connect and explore what we can build together.
      </p>

      {/* 4. Featured Email Section (Main interactive centerpiece) */}
      <section className="contact-email-section" data-reveal aria-label="Direct email contact">
        <div className="contact-email-header meta">
          <span>PRIMARY CHANNEL // DIRECT EMAIL</span>
          <span>QUICK RESPONSE TIME</span>
        </div>

        <div className="contact-email-box">
          <a
            href={`mailto:${profile.email}`}
            className="contact-email-link"
            data-cursor="Send email"
            aria-label={`Send email to ${profile.email}`}
          >
            <span className="contact-email-text">{profile.email}</span>
            <span className="contact-arrow-wrap" aria-hidden="true">
              <ArrowUpRight className="parrow" size={44} />
            </span>
          </a>

          <div className="contact-email-footer">
            <button
              type="button"
              onClick={handleCopy}
              className={`contact-copy-btn${copied ? ' copied' : ''}`}
              aria-label={copied ? 'Email address copied to clipboard' : 'Copy email address'}
              data-cursor="Copy"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
            </button>
            <span className="meta contact-quick-note">Click email to launch mail client</span>
          </div>
        </div>
      </section>

      {/* 5. Contact Information Channels */}
      <section className="contact-channels-section" aria-label="Contact channels">
        <div className="contact-channels-header meta" data-reveal>
          <span>CHANNELS // CONNECT DIRECTLY</span>
        </div>

        <div className="clinks" data-stagger>
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              className="clink"
              {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              data-cursor={ch.external ? 'Visit' : 'Call'}
              aria-label={`${ch.label}: ${ch.display}`}
            >
              <span className="meta">
                {ch.code} / {ch.label}
              </span>
              <span className="disp h-m contact-channel-value">{ch.display}</span>
              <ArrowUpRight size={32} className="parrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

