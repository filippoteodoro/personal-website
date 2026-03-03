import { content } from '@/lib/content'

export const dynamic = 'force-static'

export function GET() {
  const text = `# ${content.name}

> ${content.description}

## About

${content.bio.join('\n\n')}

## Current role

${content.currentRole}

## Interests

${content.interests.join(', ')}

## Links

${content.social.map(s => `- ${s.label}: ${s.url}`).join('\n')}
- Website: ${content.url}

## Contact

Use the contact form at ${content.url}
`

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
