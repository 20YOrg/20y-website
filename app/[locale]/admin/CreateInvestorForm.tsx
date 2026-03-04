'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 12,
  color: '#7a7a7a',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

const inputStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 15,
  color: '#1a1a1a',
  border: '1px solid #e5e5e5',
  padding: '10px 12px',
  outline: 'none',
  width: '100%',
}

function formatAmountDisplay(raw: string): string {
  if (!raw) return ''
  const [integer, decimal] = raw.split('.')
  const formatted = Number(integer).toLocaleString('en-US')
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted
}

export default function CreateInvestorForm() {
  const [form, setForm] = useState({
    investor_name: '',
    email: '',
    investment_amount: '',
    currency: 'USDT',
    investment_date: '',
    wallet_address: '',
    status: 'active',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [lastEmail, setLastEmail] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const stripped = e.target.value.replace(/,/g, '')
    if (stripped === '' || /^\d*\.?\d{0,2}$/.test(stripped)) {
      setForm(prev => ({ ...prev, investment_amount: stripped }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/admin/create-investor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setLastEmail(form.email)
        setForm({ investor_name: '', email: '', investment_amount: '', currency: 'USDT', investment_date: '', wallet_address: '', status: 'active' })
        setSubmitStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(
          data.error === 'missing' ? 'Please fill in all required fields.' :
          data.error === 'user_failed' ? 'Failed to create user account. The email may already be registered.' :
          data.error === 'investor_failed' ? `Member save failed: ${JSON.stringify(data.details)}` :
          'Something went wrong. Please try again.'
        )
        setSubmitStatus('error')
      }
    } catch {
      setErrorMsg('Connection error. Please try again.')
      setSubmitStatus('error')
    }
  }

  return (
    <div className="mx-auto px-5 md:px-8 py-14 md:py-24" style={{ maxWidth: 520 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#1a1a1a', marginBottom: 8 }}>
        Add Member
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#7a7a7a', marginBottom: 40, lineHeight: 1.6 }}>
        Creates the member account, saves their data, and sends a setup email — all at once.
      </p>

      {submitStatus === 'success' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a1a1a', border: '1px solid #e5e5e5', padding: '10px 14px', marginBottom: 32 }}>
          Done. Setup email sent to {lastEmail}.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="investor_name" style={labelStyle}>Full Name *</label>
          <input id="investor_name" name="investor_name" type="text" value={form.investor_name} onChange={handleChange} required style={inputStyle} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" style={labelStyle}>Email Address *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>

        <div className="flex flex-col gap-2">
          <label style={labelStyle}>Deposit Amount *</label>
          <div className="flex gap-2">
            <input
              id="investment_amount"
              name="investment_amount"
              type="text"
              inputMode="decimal"
              value={formatAmountDisplay(form.investment_amount)}
              onChange={handleAmountChange}
              required
              style={{ ...inputStyle, flex: 1 }}
              placeholder="0"
            />
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              style={{
                ...inputStyle,
                width: 'auto',
                minWidth: 90,
                flex: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="investment_date" style={labelStyle}>Deposit Date *</label>
          <input id="investment_date" name="investment_date" type="date" value={form.investment_date} onChange={handleChange} required style={inputStyle} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="wallet_address" style={labelStyle}>Wallet Address</label>
          <input id="wallet_address" name="wallet_address" type="text" value={form.wallet_address} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" style={labelStyle}>Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange} style={inputStyle}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {submitStatus === 'error' && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#b00' }}>{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: submitStatus === 'loading' ? '#7a7a7a' : '#1a1a1a',
            border: '1px solid #1a1a1a',
            padding: '10px 24px',
            background: 'none',
            cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer',
            marginTop: 8,
            alignSelf: 'flex-start',
          }}
          className="hover:bg-black hover:text-white transition-colors"
        >
          {submitStatus === 'loading' ? '…' : 'Create & Send Invite'}
        </button>
      </form>
    </div>
  )
}
