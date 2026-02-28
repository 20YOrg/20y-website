interface PrincipleCardProps {
  heading: string
  body: string
  isLast?: boolean
}

export default function PrincipleCard({ heading, body, isLast }: PrincipleCardProps) {
  return (
    <div>
      <div
        style={{
          borderLeft: '4px solid #1a1a1a',
          paddingLeft: 24,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 24,
            fontWeight: 500,
            color: '#1a1a1a',
            marginBottom: 12,
            lineHeight: 1.25,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: '#4a4a4a',
            lineHeight: 1.75,
          }}
        >
          {body}
        </p>
      </div>
      {!isLast && (
        <div
          style={{
            borderBottom: '1px solid #e5e5e5',
            marginTop: 32,
            marginBottom: 32,
          }}
        />
      )}
    </div>
  )
}
