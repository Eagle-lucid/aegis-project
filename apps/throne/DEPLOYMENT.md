# 🚀 Throne Deployment Guide

> **Launch your sovereign command center to the world.**

This guide covers deploying Throne to production on Vercel with Supabase.

---

## 📋 Pre-Deployment Checklist

**Before deploying, ensure:**

- [ ] All features work locally
- [ ] No console errors in browser
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] Git repository pushed to GitHub/GitLab

---

## 🗄️ Supabase Setup (Production)

### Step 1: Create Production Project

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**

2. **Create new project**
   - Organization: Your org
   - Name: `aegis-throne-prod`
   - Database Password: **Generate strong password (save it!)**
   - Region: Choose closest to your users
   - Pricing: Free tier (sufficient for MVP)

3. **Wait for provisioning** (~2 minutes)

---

### Step 2: Set Up Database Schema

1. **Go to SQL Editor** in Supabase dashboard

2. **Run this SQL:**

```sql
-- Create treasury table
CREATE TABLE treasury (
  id INTEGER PRIMARY KEY,
  total DECIMAL NOT NULL,
  marketing DECIMAL NOT NULL,
  rd DECIMAL NOT NULL,
  infrastructure DECIMAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial data
INSERT INTO treasury (id, total, marketing, rd, infrastructure)
VALUES (1, 84250, 37913, 21063, 25275);

-- Enable real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE treasury;
```

3. **Verify the table**

```sql
SELECT * FROM treasury;
-- Should return 1 row with id=1
```

---

### Step 3: Get API Credentials

1. **Go to Settings → API** in Supabase dashboard

2. **Copy these values:**
   - Project URL: `https://xxxxx.supabase.co`
   - `anon` `public` key: `eyJhbGciOi...` (long string)

3. **Save them securely** (you'll need them for Vercel)

---

### Step 4: Configure Real-time (Important!)

1. **Go to Database → Replication**

2. **Enable real-time for treasury table:**
   - Find `treasury` in table list
   - Toggle "Real-time" to ON
   - Click "Save"

3. **Verify real-time is enabled:**

```sql
-- Should show treasury table
SELECT * FROM pg_publication_tables
WHERE pubname = 'supabase_realtime';
```

---

## 🌐 Vercel Deployment

### Step 1: Connect Repository

1. **Go to [Vercel Dashboard](https://vercel.com)**

2. **Click "Add New Project"**

3. **Import your Git repository**
   - Connect GitHub/GitLab account
   - Select your `aegis` repository
   - Click "Import"

---

### Step 2: Configure Build Settings

**Vercel auto-detects Next.js, but verify:**

```yaml
Framework Preset: Next.js
Root Directory: apps/throne # Important for monorepo!
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**For Turborepo monorepo:**

```yaml
Root Directory: ./
Build Command: cd apps/throne && npm run build
Install Command: npm install
```

---

### Step 3: Set Environment Variables

**In Vercel project settings → Environment Variables:**

Add these variables:

| Key                             | Value                     | Environment |
| ------------------------------- | ------------------------- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL | Production  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key    | Production  |

**How to add:**

1. Go to Settings → Environment Variables
2. Click "Add New"
3. Enter key and value
4. Select "Production" environment
5. Click "Save"

**Repeat for both variables.**

---

### Step 4: Deploy

1. **Click "Deploy"**
   - Vercel will build and deploy
   - Takes ~2-3 minutes

2. **Monitor build logs**
   - Watch for errors
   - Ensure build completes successfully

3. **Wait for deployment**
   - You'll see a success message
   - Vercel provides a URL: `https://your-project.vercel.app`

---

### Step 5: Test Production Deployment

1. **Open the Vercel URL**

2. **Test checklist:**
   - [ ] All 4 panels render correctly
   - [ ] Treasury shows correct initial values
   - [ ] Click "Execute Strategic Decree"
   - [ ] Treasury updates in real-time
   - [ ] Chronicle logs the event
   - [ ] Button shows executed state
   - [ ] Mobile view works (test on phone)
   - [ ] No console errors (F12 → Console)

3. **If issues occur:**
   - Check Vercel build logs
   - Check browser console for errors
   - Verify environment variables are set
   - Check Supabase real-time is enabled

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**To use your own domain:**

1. **In Vercel project → Settings → Domains**

2. **Add domain:**
   - Enter: `throne.yourdomain.com`
   - Click "Add"

3. **Configure DNS:**
   - Go to your domain registrar
   - Add CNAME record:
     - Name: `throne`
     - Value: `cname.vercel-dns.com`
     - TTL: 3600

4. **Wait for DNS propagation** (~5-60 minutes)

5. **Verify SSL certificate** (Vercel auto-provisions)

---

### Performance Monitoring

**Vercel Analytics (Free):**

1. **Go to project → Analytics tab**

2. **Enable Web Analytics:**
   - Click "Enable"
   - Vercel automatically tracks:
     - Page views
     - Real User Monitoring (RUM)
     - Core Web Vitals

**View metrics:**

- Performance scores
- Loading times
- User traffic
- Geographic distribution

---

### Error Monitoring (Optional)

**Add Sentry for error tracking:**

1. **Install Sentry**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

2. **Add to Vercel environment variables:**

```
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

3. **Errors auto-reported to Sentry dashboard**

---

## 🔐 Security Hardening (Production)

### Enable Row Level Security (Recommended)

**Once you add authentication:**

1. **Enable RLS on treasury table:**

```sql
ALTER TABLE treasury ENABLE ROW LEVEL SECURITY;
```

2. **Create policy (after adding user_id column):**

```sql
-- Users can only see their own treasury
CREATE POLICY "Users see own treasury"
ON treasury FOR SELECT
USING (auth.uid() = user_id);

-- Users can only update their own treasury
CREATE POLICY "Users update own treasury"
ON treasury FOR UPDATE
USING (auth.uid() = user_id);
```

---

### API Rate Limiting

**Supabase has built-in rate limiting:**

- Free tier: 500 requests/second
- Sufficient for MVP

**Monitor usage:**

- Supabase Dashboard → Reports
- Check API usage metrics

---

### Environment Variable Security

**Never commit:**

```bash
# Add to .gitignore
.env
.env.local
.env.production
.env*.local
```

**Rotate keys if exposed:**

1. Supabase: Settings → API → "Reset API keys"
2. Update Vercel environment variables
3. Redeploy

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel auto-deploys on:**

- Push to `main` branch → Production
- Push to other branches → Preview deployments

**How it works:**

1. You push code to GitHub
2. Vercel detects the push
3. Vercel builds and deploys automatically
4. You get a notification (success/failure)

---

### Preview Deployments

**Every branch gets a unique URL:**

```
main branch    → https://throne.vercel.app (production)
dev branch     → https://throne-git-dev.vercel.app (preview)
feature branch → https://throne-git-feature.vercel.app (preview)
```

**Use preview deployments to:**

- Test features before production
- Share with beta testers
- Get feedback safely

---

### Manual Deployment

**To deploy manually:**

1. **Via Vercel CLI:**

```bash
npm install -g vercel
vercel login
vercel --prod
```

2. **Via Vercel Dashboard:**
   - Go to Deployments tab
   - Click "Redeploy" on any previous deployment

---

## 📊 Monitoring & Debugging

### Check Deployment Status

**Vercel Dashboard:**

- Go to Deployments tab
- See all builds (success/failed)
- Click deployment → View logs

**Vercel CLI:**

```bash
vercel logs  # View real-time logs
vercel inspect <deployment-url>  # Inspect deployment
```

---

### Debug Production Issues

**1. Check browser console**

- Open DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed requests

**2. Check Vercel logs**

- Go to Vercel Dashboard → Deployments
- Click failing deployment
- Read build logs for errors

**3. Check Supabase logs**

- Go to Supabase Dashboard → Logs
- Check API logs for failed queries
- Verify real-time connections

**4. Verify environment variables**

- Vercel → Settings → Environment Variables
- Ensure all required vars are set
- Check for typos in values

**5. Test Supabase connection**

```bash
# In browser console on production site
console.log(window.location.origin)
# Should show Vercel URL, not localhost
```

---

### Common Production Issues

**Issue: "Network error" on Supabase calls**

- **Cause:** Incorrect Supabase URL or key
- **Fix:** Verify environment variables in Vercel

**Issue: Real-time updates not working**

- **Cause:** Real-time not enabled on table
- **Fix:** Run `ALTER PUBLICATION supabase_realtime ADD TABLE treasury;`

**Issue: 404 on Vercel URL**

- **Cause:** Root directory not set correctly
- **Fix:** Set Root Directory to `apps/throne` in Vercel settings

**Issue: Build fails with TypeScript errors**

- **Cause:** Code has type errors
- **Fix:** Run `npm run build` locally first, fix errors

**Issue: White screen / blank page**

- **Cause:** JavaScript error on load
- **Fix:** Check browser console for errors

---

## 🔧 Rollback Procedure

**If deployment breaks production:**

1. **Instant rollback via Vercel:**
   - Go to Deployments tab
   - Find last working deployment
   - Click "..." menu → "Promote to Production"
   - Takes ~30 seconds

2. **Via Git:**

```bash
git revert HEAD
git push origin main
# Vercel auto-deploys the reverted version
```

---

## 📈 Scaling Considerations

### When to Upgrade Supabase

**Free tier limits:**

- 500 MB database
- 2 GB bandwidth
- 50,000 monthly active users

**Upgrade to Pro ($25/month) when:**

- Database exceeds 400 MB
- More than 30,000 users
- Need daily backups
- Need point-in-time recovery

---

### When to Upgrade Vercel

**Hobby tier (free) limits:**

- 100 GB bandwidth
- 6,000 build minutes
- 100 deployments/day

**Upgrade to Pro ($20/month) when:**

- Exceed bandwidth limits
- Need team collaboration
- Need advanced analytics
- Need password protection

---

## 🎯 Production Best Practices

### 1. Use Environment-Specific Configs

```typescript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // ... other config
};
```

### 2. Enable Error Boundaries

```typescript
// components/ErrorBoundary.tsx (future addition)
"use client";

export class ErrorBoundary extends Component {
  // Catch and display errors gracefully
}
```

### 3. Add Health Check Endpoint

```typescript
// app/api/health/route.ts (future addition)
export async function GET() {
  return Response.json({ status: "ok", timestamp: new Date() });
}
```

### 4. Monitor Core Web Vitals

**Track these metrics:**

- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

---

## 📚 Deployment Checklist

**Before going live:**

- [ ] All features tested locally
- [ ] Environment variables set in Vercel
- [ ] Database schema deployed to Supabase
- [ ] Real-time enabled on treasury table
- [ ] Production deployment successful
- [ ] All panels render correctly
- [ ] Decree execution works
- [ ] Real-time updates working
- [ ] Mobile view tested
- [ ] No console errors
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up (optional)
- [ ] Backup plan in place (rollback procedure)

---

## 🆘 Support & Troubleshooting

### Vercel Support

- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Support: support@vercel.com (Pro plans)

### Supabase Support

- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
- Discord: https://discord.supabase.com

---

**Your throne is now live. Rule with sovereignty.** 🦅👑

Remember: Deployment is not the end—it's the beginning of your reign.
