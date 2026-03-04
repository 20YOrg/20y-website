'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function AdminInviteForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [lastEmail, setLastEmail] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/admin/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setLastEmail(email)
        setEmail('')
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="mx-auto px-5 md:px-8 py-14 md:py-24"
      style={{ maxWidth: 480 }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: 8,
        }}
      >
        Invite Member
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#7a7a7a',
          marginBottom: 40,
          lineHeight: 1.6,
        }}
      >
        First create the member's account in Directus, then send them a setup email here.
      </p>

      {status === 'success' && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: '#1a1a1a',
            border: '1px solid #e5e5e5',
            padding: '10px 14px',
            marginBottom: 32,
          }}
        >
          Setup email sent to {lastEmail}.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: '#7a7a7a',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Member Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="member@example.com"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#1a1a1a',
              border: '1px solid #e5e5e5',
              padding: '10px 12px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>

        {status === 'error' && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#b00' }}>
            Failed to send email. Make sure the member account exists in Directus first.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: status === 'loading' ? '#7a7a7a' : '#1a1a1a',
            border: '1px solid #1a1a1a',
            padding: '10px 24px',
            background: 'none',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            marginTop: 8,
            alignSelf: 'flex-start',
          }}
          className="hover:bg-black hover:text-white transition-colors"
        >
          {status === 'loading' ? '…' : 'Send Setup Email'}
        </button>
      </form>
    </div>
  )
}
