# Grant OS v2 — DEPRECATED

> **This repository has been unified into [grant-platform](https://github.com/sillinous/grant-platform).**
> All traffic is permanently redirected (301) to the canonical Grant Platform.
> No new development will occur here.

## Successor: UNLESS Grant Lifecycle Platform

The production grant platform lives at **[sillinous/grant-platform](https://github.com/sillinous/grant-platform)** with:

- 39 modules across 8 functional groups
- 23+ live API integrations (Grants.gov, USASpending, Census, SAM, and more)
- 16 AI endpoints with OpenRouter + Anthropic dual-provider support
- Multi-turn chat with conversation history
- Subscription tiers via Stripe (Pro $9/mo, Team $49/mo)
- React 19 + Vite 7 single-file architecture (4,555 lines)

## What Was Absorbed

Grant OS's unique assets were ported to grant-platform:
- 14 AI endpoints (now expanded to 16 with richer schemas)
- Direct Anthropic API path (preserved as fallback)
- Grant discovery with match scoring and tier classification
- Multi-turn chat assistant with message history
- Alternative pricing tiers preserved for A/B testing

## Current State

This repo is a redirect shell:
- `netlify.toml` — 301 redirect all paths to grant-platform
- `index.html` — meta-refresh redirect fallback
- `_redirects` — additional redirect rule

## History

Originally **EnhancedGrantSystem** (Express/Gemini), refactored to **Grant OS v2** (Netlify/Claude), now unified into **UNLESS Grant Platform** (Feb 2026).
