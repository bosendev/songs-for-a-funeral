# Songs for a Funeral - Portfolio Site

A photography portfolio built with Craft CMS, featuring custom SCSS architecture and modern build tooling.

---

## Tech Stack

- **CMS:** Craft CMS 5.x
- **Build Tool:** Vite 7.x
- **CSS:** SCSS + Tailwind CSS v3
- **Local Development:** DDEV
- **Node.js:** v22.x
- **PHP:** 8.3
- **Database:** MySQL 8.0

---

## Prerequisites

Before you begin, ensure you have installed:

- [DDEV](https://ddev.readthedocs.io/en/stable/) (local development environment)
- [Node.js](https://nodejs.org/) v22+ (for build tools)
- [Composer](https://getcomposer.org/) (PHP dependency manager)

---

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd songs-for-a-funeral
```

### 2. Start DDEV
```bash
ddev start
```

### 3. Install dependencies
```bash
# PHP dependencies (Craft CMS)
ddev composer install

# Node dependencies (Vite, Tailwind, etc.)
npm install
```

### 4. Import the database (if available)
```bash
ddev import-db --file=path/to/database.sql.gz
```

### 5. Copy environment file
```bash
cp .env.example .env
```

Update `.env` with your local settings if needed.

### 6. Access the site

- **Frontend:** https://songs-for-a-funeral.ddev.site
- **Admin Panel:** https://songs-for-a-funeral.ddev.site/admin

---

## Development Workflow

### Starting Development

You need **two terminal windows** running simultaneously:

**Terminal 1 - DDEV (Craft CMS):**
```bash
ddev start
```

**Terminal 2 - Vite (Asset compilation):**
```bash
npm run dev
```

Vite will run at `http://localhost:3000` (or a network IP like `http://192.168.x.x:3000`).

> **Note:** If you see connection issues with `localhost:3000`, check the Troubleshooting section below.

### Building for Production
```bash
npm run build
```

This creates optimized assets in `web/dist/`.

---

## CSS Architecture

### Hybrid Reset Strategy

This project uses a **custom hybrid CSS reset** combining the best practices from:
- **Andy Bell's Modern CSS Reset** - Accessibility-first baseline
- **Tailwind CSS Preflight** - Utility-friendly defaults

**Why hybrid?**
- Preserves important accessibility features (like `prefers-reduced-motion`)
- Includes Tailwind's border resets for easy `.border` utility usage
- Maintains semantic HTML defaults while enabling utility-first styling

### Tailwind Preflight Disabled

Tailwind's built-in Preflight reset is **disabled** in `tailwind.config.js`:
```javascript
corePlugins: {
  preflight: false,  // Using our custom hybrid reset instead
}
```

**Why?** To avoid CSS conflicts and maintain control over the reset layer.

### Load Order

The CSS compilation follows this specific order (defined in `src/css/main.scss`):
```scss
// 1. SCSS modules compile first
@use 'abstracts/variables' as *;
@use 'abstracts/mixins' as *;
@use 'base/reset';          // ← Our hybrid reset
@use 'base/globals';
@use 'base/typography';
@use 'layout/site-header';
@use 'layout/site-footer';
@use 'components/card-art-work';

// 2. Tailwind directives inject after
@tailwind base;
@tailwind components;
@tailwind utilities;        // ← Highest specificity
```

**Why this order matters:**
1. SCSS compiles first (variables, mixins, custom styles)
2. Custom reset loads before Tailwind
3. Tailwind utilities load last = highest specificity = can override custom styles

### Key Features Preserved

Our hybrid reset includes:

- ✅ **Accessibility:** Full `prefers-reduced-motion` support
- ✅ **Border resets:** Easy Tailwind `.border` utility usage
- ✅ **Form normalization:** Consistent input/button styling
- ✅ **Responsive media:** Images, videos scale properly
- ✅ **Semantic HTML:** Maintains useful browser defaults

### Using Tailwind in SCSS

You can use Tailwind utilities in your SCSS with `@apply`:
```scss
.my-component {
  @apply flex items-center gap-4 p-4;
}
```

**Reference:**
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Andy Bell's Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)

---

## Handy DDEV Commands

### Essential Commands

| Command | Description |
|---------|-------------|
| `ddev start` | Start the project |
| `ddev stop` | Stop the project |
| `ddev restart` | Restart all services |
| `ddev launch` | Open site in browser |
| `ddev launch admin` | Open Craft admin panel |

### Development Commands

| Command | Description |
|---------|-------------|
| `ddev npm install` | Install Node dependencies |
| `ddev npm run dev` | Start Vite dev server |
| `ddev npm run build` | Build for production |
| `ddev composer install` | Install PHP dependencies |
| `ddev craft` | Run Craft console commands |

### Database Commands

| Command | Description |
|---------|-------------|
| `ddev export-db` | Export database to `.sql.gz` |
| `ddev import-db --file=<path>` | Import database from file |
| `ddev mysql` | Open MySQL CLI |
| `ddev craft backup/db` | Create Craft database backup |

### Useful Commands

| Command | Description |
|---------|-------------|
| `ddev describe` | Show project configuration |
| `ddev logs` | View container logs |
| `ddev ssh` | SSH into web container |
| `ddev exec <command>` | Run command inside container |

---

## Troubleshooting

### Vite Connection Issues

**Problem:** Styles not loading, browser shows `ERR_CONNECTION_REFUSED` for `localhost:3000`

**Solution 1 - Install mkcert (recommended):**
```bash
# Install mkcert for trusted local HTTPS
brew install mkcert nss
mkcert -install

# Restart DDEV
ddev restart

# Start Vite
npm run dev
```

**Solution 2 - Use network IP:**

If `localhost:3000` doesn't work, check what IP Vite shows when starting:
```bash
npm run dev
# Look for: ➜  Network: http://192.168.x.x:3000/
```

Update `templates/_macros/vite.twig` to use that IP instead of `localhost:3000`.

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port in vite.config.js
```

### DDEV Won't Start

**Problem:** `ddev start` fails or containers won't start

**Solution:**
```bash
# Stop all DDEV projects
ddev poweroff

# Restart Docker Desktop

# Start again
ddev start
```

### Styles Not Compiling

**Problem:** Changes to SCSS files aren't reflected in browser

**Solution:**

1. Make sure Vite is running (`npm run dev`)
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Check terminal for SCSS syntax errors
4. Restart Vite if needed

### Database Connection Error

**Problem:** Craft can't connect to database

**Solution:**
```bash
# Check .env file has correct credentials
# Default DDEV credentials:
DB_DRIVER="mysql"
DB_SERVER="db"
DB_PORT="3306"
DB_DATABASE="db"
DB_USER="db"
DB_PASSWORD="db"
```

---

## Project Structure
```
songs-for-a-funeral/
├── config/              # Craft configuration
├── src/
│   ├── css/
│   │   ├── abstracts/   # Variables, mixins
│   │   ├── base/        # Reset, globals, typography
│   │   ├── layout/      # Header, footer
│   │   ├── components/  # Reusable components
│   │   └── main.scss    # Main entry point
│   └── js/
│       └── main.js      # JavaScript entry point
├── templates/
│   ├── _layouts/        # Base layouts
│   ├── _macros/         # Reusable Twig macros
│   ├── _partials/       # Header, footer partials
│   └── work/            # Work section templates
├── web/                 # Public web root
│   ├── dist/            # Compiled assets (gitignored)
│   └── uploads/         # User uploads
├── .ddev/               # DDEV configuration
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Node dependencies
```

---

## Additional Resources

- [Craft CMS Documentation](https://craftcms.com/docs/5.x/)
- [DDEV Documentation](https://ddev.readthedocs.io/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

