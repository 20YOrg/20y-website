'use client'

import { useState } from 'react'
import { normalizeEmail } from '@/lib/email'

interface Props {
  placeholder: string
  button: string
  successMsg: string
  duplicateMsg: string
  errorMsg: string
  invalidMsg: string
}

export default function HomeSubscribeForm({ placeholder, button, successMsg, duplicateMsg, errorMsg, invalidMsg }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error' | 'invalid'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const normalizedEmail = normalizeEmail(email)
    if (!normalizedEmail) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus(data.error === 'duplicate' ? 'duplicate' : data.error === 'invalid_email' ? 'invalid' : 'error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#1a1a1a' }}>{successMsg}</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            placeholder={placeholder}
            required
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#1a1a1a',
              border: '1px solid #e5e5e5',
              borderRight: 'none',
              padding: '8px 12px',
              outline: 'none',
              flex: 1,
              minWidth: 0,
              backgroundColor: '#ffffff',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#1C4A60',
              border: '1px solid #1C4A60',
              padding: '8px 14px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {status === 'loading' ? '…' : button}
          </button>
        </div>
      </form>
      {(status === 'duplicate' || status === 'error' || status === 'invalid') && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#b00', marginTop: 6 }}>
          {status === 'duplicate' ? duplicateMsg : status === 'invalid' ? invalidMsg : errorMsg}
        </p>
      )}
    </>
  )
}
