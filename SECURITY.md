# Security

## Dependency Audit (2026-08-26)

### Current Status

**Last Audit**: 2026-08-26  
**pnpm audit --production**: 5 vulnerabilities (3 HIGH, 2 MODERATE)

### Known Vulnerabilities

#### 1. PostCSS (via Next.js 16.2.12)
- **Severity**: HIGH + MODERATE
- **Vulnerable Version**: postcss@8.4.31
- **Fixed Version**: >=8.5.23
- **CVEs**: 
  - GHSA-6g55-p6wh-862q (Path traversal in sourceMappingURL)
  - GHSA-r28c-9q8g-f849 (Path traversal in previous source map)
  - GHSA-fxqj-rqcc-2cmp (Incomplete fix for GHSA-6g55-p6wh-862q)
  - GHSA-qx2v-qp2m-jg93 (XSS via unescaped </style>)
- **Status**: ⏳ **Waiting for Next.js upgrade**
- **Mitigation**: PostCSS is a transitive dependency of Next.js. Not exploitable in production unless attacker controls CSS source files.
- **Action Required**: Monitor Next.js releases for postcss upgrade

#### 2. Sharp (via Next.js 16.2.12)
- **Severity**: HIGH
- **Vulnerable Version**: sharp@0.34.5
- **Fixed Version**: >=0.35.0
- **CVEs**: CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591
- **Advisory**: https://github.com/advisories/GHSA-f88m-g3jw-g9cj
- **Status**: ⏳ **Waiting for Next.js upgrade**
- **Mitigation**: Sharp is used for Next.js Image Optimization. Vulnerability in libvips (image processing library).
- **Action Required**: Monitor Next.js releases for sharp upgrade

### Remediation Timeline

- **Short-term**: No action required - vulnerabilities not exploitable in current use case
- **Medium-term**: Upgrade Next.js when v16.3+ is released (estimated ~Q3 2026)
- **Monitoring**: Weekly check for Next.js security releases

### Security Best Practices

1. **Dependency Updates**: Run `pnpm audit` before each deployment
2. **Next.js Updates**: Follow Next.js security announcements
3. **Environment Variables**: Never commit `.env` files
4. **Supabase RLS**: All database access protected by Row Level Security
5. **Input Validation**: All user inputs validated with Zod schemas

## Reporting a Vulnerability

If you discover a security vulnerability in this project (not related to dependencies), please email security@example.com or open a GitHub Security Advisory.

**DO NOT** open public issues for security vulnerabilities.
