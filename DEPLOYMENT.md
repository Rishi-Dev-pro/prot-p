# Vercel Production Deployment Guide
## Project: Rishi Kumar Shaw — Developer Portfolio

This guide outlines the step-by-step procedure for deploying this portfolio directly from GitHub to Vercel.

---

### 1. Prerequisites

1. A [GitHub](https://github.com) account with push access to this repository (`prot-p`).
2. A [Vercel](https://vercel.com) account (sign in with your GitHub account for seamless synchronization).

---

### 2. Project Architecture & Production Settings

The portfolio is a client-side Single Page Application (SPA) built with:
- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Graphics & Animation**: Three.js (Atmospheric spatial depth) + GSAP 3 (Six-Agent Construction & Choreography)
- **External API Requirements**: **None** (Zero third-party runtime APIs required).

#### Exact Vercel Build Configuration:
| Setting | Recommended Value | Notes |
| :--- | :--- | :--- |
| **Framework Preset** | `Vite` | Vercel detects this automatically |
| **Root Directory** | `./` | Root of repository |
| **Build Command** | `npm run build` | Runs `tsc && vite build` |
| **Output Directory** | `dist` | Generated bundle folder |
| **Install Command** | `npm install` | Automatic via package-lock.json |
| **Node.js Version** | `20.x` or `22.x` | Standard LTS supported |

---

### 3. Step-by-Step Deployment Instructions

#### Step 1: Push Code to GitHub
Ensure all changes are committed and pushed to the main branch:
```bash
git push origin main
```

#### Step 2: Connect Vercel to GitHub
1. Log in to [vercel.com](https://vercel.com).
2. From the Vercel Dashboard, click the **"Add New..."** button and select **"Project"**.
3. Under **"Import Git Repository"**, locate and select `prot-p` (or `Rishi-Dev-pro/prot-p`).

#### Step 3: Configure Project Settings
1. **Project Name**: `rishi-kumar-shaw-portfolio` (or keep default `prot-p`).
2. **Framework Preset**: Confirm it shows **Vite**.
3. **Root Directory**: Leave as `./`.
4. **Build and Output Settings**:
   - Build Command: `npm run build` (default).
   - Output Directory: `dist` (default).
5. **Environment Variables**:
   - Leave empty. The portfolio requires zero secret keys or server credentials to run.

#### Step 4: Deploy
1. Click **"Deploy"**.
2. Vercel will clone the repository, install dependencies, run the TypeScript compiler, and build the optimized production bundle in ~30–45 seconds.
3. Upon completion, Vercel will provide your live URL (e.g., `https://prot-p.vercel.app`).

---

### 4. Post-Deployment Verification Checklist

Once the production deployment is live, verify the following:
- [ ] **Initial Canvas & Telemetry**: Page displays the deep dark background `#06070A` immediately without flash.
- [ ] **Six-Agent Entrance**: Six cursors enter and coordinate their symmetrical circular formation.
- [ ] **Parallel Loading**: Web fonts (Inter, Space Grotesk, JetBrains Mono) and Three.js canvas load cleanly.
- [ ] **Physical Construction**: All 59 targets construct sequentially in wave order across all sections.
- [ ] **UNEXPECTED Typography**: Character-by-character reveals smoothly without horizontal overflow.
- [ ] **Responsive Navigation**: Mobile hamburger drawer works on small screens; desktop chips work on wide screens.
- [ ] **Interactive Modals**: Command Palette (`Ctrl+K` / `Cmd+K`) and Developer Terminal (`` ` ``) open smoothly.
- [ ] **Section Transitions & Farewell Finale**: Completes section 7, smoothly scrolls back to Hero, executes the 6-cursor orbital dance, and locks into perimeter sentinel posts.

---

### 5. Automatic Continuous Deployment (CI/CD)

Whenever you push commits to GitHub:
```bash
git add .
git commit -m "feat: your new enhancement"
git push origin main
```
Vercel automatically triggers a fresh production build and deploys the new version within seconds.

---

### 6. Troubleshooting Common Issues

1. **Route Refresh (404 Error)**:
   - Handled automatically by `vercel.json` rewrite:
     ```json
     {
       "source": "/(.*)",
       "destination": "/index.html"
     }
     ```
2. **Asset Caching**:
   - Hashed assets (`/assets/*.js`, `/assets/*.css`) are cached immutably for 1 year.
   - `index.html` is configured with `max-age=0, must-revalidate` so visitors always get the latest deployment.
3. **Three.js WebGL Warnings**:
   - If a client device has hardware acceleration disabled, `Construction3DCanvas.tsx` automatically falls back without crashing the site.
