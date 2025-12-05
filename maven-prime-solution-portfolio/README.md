    - Minimal dependencies (Alpine.js + Tailwind CDN).
    - No build step required.

## Project Structure

```
maven-prime-solution/
├── assets/             # Images and icons
├── css/
│   └── styles.css      # Custom styles and animations
├── js/
│   └── app.js          # Application logic (Alpine.js)
├── index.html          # Main entry point
├── .github/workflows/  # GitHub Actions for Pages
├── robots.txt          # SEO configuration
├── sitemap.xml         # SEO configuration
└── README.md           # This file
```

## Setup & Deployment

### Local Development
1. Clone the repository or download the ZIP.
2. Open `index.html` in your browser.
3. For the best experience, use a local server (e.g., Live Server in VS Code).

### GitHub Pages Deployment
1. Push the code to a GitHub repository.
2. Go to **Settings > Secrets and variables > Actions**.
3. Create a new repository secret named `GEMINI_API_KEY` with your Google Gemini API key.
4. The included GitHub Action (`.github/workflows/deploy.yml`) will automatically build and deploy the site to GitHub Pages on every push to `main`.
5. **Note**: You will need to sign up for [Formspree](https://formspree.io/) and replace `YOUR_FORMSPREE_ID` in `index.html` to make the contact form work.

## AI Agent Configuration

The AI Agent is located in `js/app.js`.

- **Production Mode**: The GitHub Action automatically injects your `GEMINI_API_KEY` secret into the code during deployment.
- **Local Development**: You can manually replace `YOUR_GEMINI_API_KEY` in `js/app.js` for testing, but **do not commit it**.

## Credits

- **Design & Code**: Built by Antigravity (Google DeepMind).
- **Images**: Unsplash (Placeholders).
- **Icons**: Heroicons (SVG).
