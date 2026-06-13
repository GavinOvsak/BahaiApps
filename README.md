# 🌟 Bahai Apps

A community directory of Bahai apps and digital resources — prayers, songs, children's classes, writings, and more.

**[→ Visit the site](https://gavinovsak.github.io/BahaiApps/)**

---

## What is this?

This is an open directory where anyone can discover — and contribute — Bahai digital tools and resources. It works like a searchable catalogue: you can filter by tag (prayers, songs, children, etc.), see whether something is open or closed source, and jump straight to the app or its source code on GitHub.

The full list of apps lives in one file: **[`public/data/apps.json`](public/data/apps.json)**

---

## How to add your app

You don't need to understand the website code at all. Adding an app is just adding a few lines to that JSON file. Here's what an entry looks like:

```json
{
  "name": "My Prayer Timer",
  "url": "https://my-prayer-timer.netlify.app",
  "tags": ["prayers", "devotional"],
  "access": "open",
  "github": "yourusername/my-prayer-timer",
  "description": "A simple countdown timer for the obligatory prayers.",
  "dateAdded": "2026-06-13"
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Display name of the app or resource |
| `url` | ✅ | Link to the live app or website |
| `tags` | ✅ | Array of tags — see existing tags or make your own |
| `access` | ✅ | `"open"` if source code is public, `"closed"` if not |
| `github` | optional | `"username/repo"` — adds a source code button |
| `description` | optional | One sentence explaining what it does |
| `dateAdded` | optional | Today's date in `YYYY-MM-DD` format |
| `resource` | optional | Set to `true` for websites/resources rather than apps |

To submit, [open an issue](https://github.com/GavinOvsak/BahaiApps/issues/new?title=Add+App&body=Name:%0AURL:%0ATags:%0ADescription:) or submit a pull request editing `public/data/apps.json` directly.

---

## New to coding? Build your own Bahai app

You don't need years of experience to make something useful. Here are three paths:

### 1. Vibe-code something from scratch

Describe what you want in plain English to an AI coding assistant and let it write the code for you. This works surprisingly well for simple apps — a prayer display, a children's class activity picker, a song lyrics viewer.

Tools to try:
- **[Claude](https://claude.ai)** — describe your idea, paste in some Bahai text, ask it to build a webpage
- **[Cursor](https://cursor.sh)** — an AI-powered code editor, good if you want to refine things
- **[Bolt](https://bolt.new)** or **[v0](https://v0.dev)** — build in the browser, no setup needed

A good starting prompt might be:
> *"Build me a simple web app that displays a random Bahai prayer each day. It should look clean and work on mobile. Use plain HTML, CSS, and JavaScript with no frameworks."*

### 2. Fork an existing app

Any app in this directory with a `</>` button has its source code publicly available on GitHub. You can copy it or link to it in a message to a coding AI and make your own version:

1. Click the `</>` button on any card to go to its GitHub page
2. Click **Fork** (top right on GitHub) — this copies it to your account
3. Open your fork in Cursor or Claude and ask it to make changes
4. You now have your own version to customize

### 3. Deploy it for free

Once your app is built, hosting it publicly is free:

- **[GitHub Pages](https://pages.github.com)** — great for static sites, directly from your GitHub repo
- **[Netlify](https://netlify.com)** — drag and drop your project folder to deploy instantly
- **[Vercel](https://vercel.com)** — similar to Netlify, very easy

Once it's live, add it to this directory!

---

## How the site is built (for the curious)

The site is a React app built with [Vite](https://vitejs.dev) and styled with [Tailwind CSS](https://tailwindcss.com). It's deployed automatically to GitHub Pages whenever changes are merged to `main`.

The only file you need to edit to add apps is [`public/data/apps.json`](public/data/apps.json) — the site reads it at load time and builds the cards dynamically.

**Running it locally:**
```bash
npm install
npm run dev
```

**Building for production:**
```bash
npm run build
```

---

## Contributing

Pull requests are welcome! Whether it's a new app, a bug fix, or an improvement to the site itself — open a PR and it'll be reviewed.

If you're not sure how to make a PR, [open an issue](https://github.com/GavinOvsak/BahaiApps/issues) instead and describe what you'd like to add.
