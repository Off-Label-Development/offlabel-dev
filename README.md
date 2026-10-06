# offlabel.dev

Off-Label Development website — Practical AI for Small Business.

## Stack

- **Framework**: Astro v5 (static output)
- **Deployment**: Cloudflare Pages (legacy build framework)
- **Styling**: CSS Custom Properties (no Tailwind runtime)
- **Forms**: Formspree (honeypot + email notifications)
- **Analytics**: Cloudflare Web Analytics (privacy-first, no cookies)
- **Fonts**: Inter Variable + Lora (via @fontsource)

## Development

```bash
# Install dependencies
npm install

# Local development server
npm run dev

# Build for production
npm run build

# Preview production build locally (simulates Cloudflare Pages)
npm run preview

# Preview over Tailscale/VPN
npm run preview:tailscale
```

## Project Structure

```
src/
├── components/       # Header, Footer (Astro components)
├── config/           # site.ts - env-driven configuration
├── layouts/          # Layout.astro - base HTML + slots
├── pages/            # 7 routes: index, about, services, contact, privacy, terms, 404
├── styles/           # global.css - complete design system
public/
├── favicon.svg
├── robots.txt
├── llms.txt
├── site.webmanifest
astro.config.mjs      # Astro + Cloudflare adapter + sitemap
wrangler.toml         # Pages dev config (no [build] section)
```

## Deployment

**Cloudflare Pages (legacy build framework):**

1. Connect GitHub repo `Off-Label-Development/offlabel-dev`
2. Build: `npm run build` → Output: `dist`
3. Environment variables (Production & Preview):
   - `FORMSPREE_ID` — Formspree form ID
   - `PUBLIC_CF_ANALYTICS=true`
4. Custom domain: `offlabel.dev` (apex managed by Pages)
5. WWW redirect: Custom filter rule → `http.host == "www.offlabel.dev"` → **Dynamic** → `concat("https://offlabel.dev", http.request.uri.path)`
6. SSL/TLS: Full (strict) + Always Use HTTPS + Automatic HTTPS Rewrites

**Auto-deploys on push to `main`.**

## Email

Uses Google Workspace. `contact@offlabel.dev` configured as alias/group in Google Workspace Admin Console — no Cloudflare Email Routing (MX conflict).

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Static output, Cloudflare adapter, sitemap |
| `wrangler.toml` | Pages dev config — no `[build]` section |
| `src/styles/global.css` | Complete design system (colors, type, spacing, components, dark mode) |
| `src/config/site.ts` | Central config: Formspree ID, analytics, site metadata |
| `src/pages/*.astro` | 7 routes |

## Migration Notes

Converted from Next.js 15 (Vercel) → Astro 5 (Cloudflare Pages) in Oct 2026. See `RUNBOOK.md` for full deployment runbook.

## Future Work / TODOs

### Analytics & Performance
- [ ] **Enable Cloudflare Web Analytics** for `offlabel.dev` (Dashboard → Analytics → Web Analytics → Add site) — required for `PUBLIC_CF_ANALYTICS` to function
- [ ] **Cache Rule** for `/_astro/*` → `Cache-Control: public, max-age=31536000, immutable`
- [ ] **Image optimization**: add `imageService: "compile"` to `@astrojs/cloudflare` config for sharp-based build-time optimization

### Security & Hardening
- [ ] **Security headers** via Transform Rules: CSP, HSTS, X-Frame-Options, Referrer-Policy
- [ ] **CAA record check**: `dig CAA offlabel.dev` — ensure no CAA blocks Let's Encrypt
- [ ] **Turnstile** on contact form (widget + secret verification in Pages Function)

### Observability
- [ ] **Custom 404 analytics** event tracking in `404.astro`
- [ ] **Sitemap pinging** GitHub Action (ping Google/Bing on sitemap change)

### Developer Experience
- [ ] **Staging preview**: separate `PREVIEW_FORMSPREE_ID` env var for preview deployments
- [ ] **Uptime monitoring**: Cloudflare Health Checks or UptimeRobot