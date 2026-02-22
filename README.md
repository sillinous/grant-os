# Grant OS v2

AI-powered grant discovery and management platform for nonprofits and organizations.

**Refactored from [EnhancedGrantSystem](https://github.com/sillinous/EnhancedGrantSystem)** — converted from Express/Gemini backend to Netlify Functions + Claude API with localStorage persistence.

## What's New in v2
- ✅ Fully deployable to Netlify (no Express server needed)
- ✅ Claude API replaces Gemini (key set as `ANTHROPIC_API_KEY` in Netlify env)
- ✅ localStorage replaces database (no backend, no auth server)
- ✅ All 14 AI endpoints preserved as a single Netlify Function
- ✅ Original components untouched — only services layer changed

## AI Capabilities
- Grant Discovery (profile-based search)
- Eligibility Analysis
- Application Section Drafting (6 sections)
- Application Review (constructive + red-team)
- Funder Persona Analysis
- Success Pattern Analysis
- Differentiation Strategy
- Cohesion Analysis
- Budget Justification
- Impact Story Generation
- Progress Report Drafting
- Compliance Task Extraction
- Grant Chat Assistant

## Deploy
1. Fork this repo
2. Connect to Netlify
3. Set env var: `ANTHROPIC_API_KEY=your-key`
4. Deploy — done

## Local Dev
```bash
npm install
npm run dev
```
