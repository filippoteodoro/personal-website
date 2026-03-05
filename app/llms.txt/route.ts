import { content } from '@/lib/content'

export const dynamic = 'force-static'

function buildLlmsText(): string {
  const links = content.social.map(socialLink => `- ${socialLink.label}: ${socialLink.url}`).join('\n')

  return `# ${content.name}

> ${content.description}

## About

${content.bio.join('\n\n')}

## Current role

${content.currentRole}

## Interests

${content.interests.join(', ')}

## Links

${links}
- Website: ${content.url}

## Contact

Use the contact form at ${content.url}
`
}

export function GET(): Response {
  return new Response(buildLlmsText(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
