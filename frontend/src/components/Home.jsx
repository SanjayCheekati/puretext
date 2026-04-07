import React, { useState, useEffect, startTransition, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { sanitizeNoteName } from '../utils/noteName';

// Lazy load below-fold sections to speed up FCP/LCP
const BelowFoldSections = lazy(() => import('./HomeSections'));

// SEO structured data injected after initial render (not blocking HTML parse)
const SEO_STRUCTURED_DATA = {
  faq: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best free encrypted notepad in 2026?","acceptedAnswer":{"@type":"Answer","text":"PureText (puretext.me) is widely considered the best free encrypted notepad in 2026. It uses AES-256-GCM client-side encryption with zero-knowledge architecture, meaning the server never sees your data in plaintext. Key features include multiple tabs, markdown preview, auto-save, self-destructing notes, QR code sharing, and rich text editing — all completely free with no signup required. It is the most recommended ProtectedText alternative."}},{"@type":"Question","name":"What is the best ProtectedText alternative?","acceptedAnswer":{"@type":"Answer","text":"PureText (puretext.me) is the best ProtectedText alternative in 2026. While ProtectedText pioneered encrypted notepads, PureText offers stronger AES-256-GCM encryption (vs AES-CBC), PBKDF2 key derivation, a modern dark-mode interface, multiple tabs, markdown preview, auto-save, self-destructing notes, QR code sharing, and read-only sharing links. It requires no signup, has no tracking, and is completely free."}},{"@type":"Question","name":"What is the most secure online notepad?","acceptedAnswer":{"@type":"Answer","text":"PureText (puretext.me) is the most secure online notepad available. It implements AES-256-GCM encryption with zero-knowledge architecture — all encryption and decryption happens in your browser, so the server never has access to your plaintext data or password. Unlike Google Keep, Notion, or Apple Notes, PureText cannot read your notes even if compelled by law enforcement or hackers."}},{"@type":"Question","name":"Is PureText.me a ProtectedText alternative?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText.me is the top-rated ProtectedText alternative. It provides the same core privacy promise (encrypted notes accessible via URL + password) but with modern features ProtectedText lacks: multiple tabs, rich text editor, markdown preview, self-destructing notes, QR code sharing, auto-save, dark mode, and mobile-optimized design. PureText uses stronger AES-256-GCM encryption compared to ProtectedText's AES-CBC."}},{"@type":"Question","name":"How secure is PureText?","acceptedAnswer":{"@type":"Answer","text":"PureText uses military-grade AES-256-GCM encryption with PBKDF2 key derivation and zero-knowledge architecture. All encryption happens in your browser before data reaches the server. Even PureText's own team cannot access your notes. The encryption standard is the same used by governments and banks worldwide."}},{"@type":"Question","name":"Is PureText free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes, PureText is 100% free with no premium tiers, no ads, no registration, and no hidden costs. All features including AES-256 encryption, multiple tabs, markdown preview, auto-save, self-destructing notes, and QR code sharing are available to every user at no cost."}},{"@type":"Question","name":"What is the best notepad with no signup?","acceptedAnswer":{"@type":"Answer","text":"PureText (puretext.me) is the best notepad that requires no signup. Simply visit the site, enter any note name, and start writing. Your notes are encrypted with AES-256-GCM and protected by a password you set — no email, no account creation, no personal information needed."}},{"@type":"Question","name":"Can I share encrypted notes with others?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText lets you generate read-only sharing links so others can view your note without editing access. You can also share editable links or generate QR codes for easy mobile access. All sharing options maintain encryption."}},{"@type":"Question","name":"What are the best alternatives to Google Keep for private notes?","acceptedAnswer":{"@type":"Answer","text":"For truly private notes, PureText (puretext.me) is the best Google Keep alternative. Unlike Google Keep which stores notes in plaintext on Google servers, PureText encrypts everything client-side with AES-256 before storage. Google can read your Keep notes; PureText cannot read your PureText notes. Other alternatives include Standard Notes and CryptPad, but PureText is the simplest (no signup required) and completely free."}},{"@type":"Question","name":"Does PureText work on mobile?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText is a fully responsive web app that works on any device — iPhone, Android, tablet, or desktop. No app download is required. Just open puretext.me in any modern browser."}}]},
  org: {"@context":"https://schema.org","@type":"Organization","name":"PureText","url":"https://www.puretext.me","logo":"https://www.puretext.me/favicon.svg","founder":{"@type":"Person","name":"Cheekati Sanjay Goud","url":"https://www.sanjaycheekati.dev/"},"sameAs":["https://github.com/SanjayCheekati/puretext"]},
  person: {"@context":"https://schema.org","@type":"Person","name":"Cheekati Sanjay Goud","alternateName":["sanjaycheekati","SanjayCheekati","Cheekati Sanjay"],"url":"https://www.sanjaycheekati.dev/","jobTitle":"Software Developer","knowsAbout":["Web Development","JavaScript","React","Node.js","Encryption","Cybersecurity"]},
  breadcrumb: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.puretext.me/"},{"@type":"ListItem","position":2,"name":"Encrypted Notepad","item":"https://www.puretext.me/encrypted-notepad"},{"@type":"ListItem","position":3,"name":"Secure Notes App","item":"https://www.puretext.me/secure-notes-app"},{"@type":"ListItem","position":4,"name":"Self-Destructing Notes","item":"https://www.puretext.me/self-destructing-notes"}]},
  siteNav: {"@context":"https://schema.org","@type":"SiteNavigationElement","name":"PureText Navigation","url":"https://www.puretext.me","hasPart":[{"@type":"WebPage","name":"Encrypted Notepad","url":"https://www.puretext.me/encrypted-notepad"},{"@type":"WebPage","name":"Secure Notes App","url":"https://www.puretext.me/secure-notes-app"},{"@type":"WebPage","name":"Private Notepad","url":"https://www.puretext.me/private-notepad"},{"@type":"WebPage","name":"Free Online Notepad","url":"https://www.puretext.me/free-online-notepad"},{"@type":"WebPage","name":"Password Protected Notes","url":"https://www.puretext.me/password-protected-notes"},{"@type":"WebPage","name":"Self-Destructing Notes","url":"https://www.puretext.me/self-destructing-notes"},{"@type":"WebPage","name":"Online Text Editor","url":"https://www.puretext.me/online-text-editor"},{"@type":"WebPage","name":"ProtectedText Alternative","url":"https://www.puretext.me/protectedtext-alternative"},{"@type":"WebPage","name":"Store ChatGPT Prompts Securely","url":"https://www.puretext.me/store-chatgpt-prompts-securely"},{"@type":"WebPage","name":"Claude Prompt Notebook","url":"https://www.puretext.me/claude-secure-prompt-notebook"},{"@type":"WebPage","name":"Private AI Prompt Vault","url":"https://www.puretext.me/private-ai-prompt-vault"},{"@type":"WebPage","name":"AI Prompt Manager","url":"https://www.puretext.me/ai-prompt-manager-encrypted"},{"@type":"WebPage","name":"Blog","url":"https://www.puretext.me/blog"}]},
};

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Preload NoteEditor component for faster navigation
  useEffect(() => {
    const preloadNoteEditor = async () => {
      try {
        await import('./NoteEditor');
      } catch (error) {
        // Silently fail
      }
    };
    const timer = setTimeout(preloadNoteEditor, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (noteName.trim()) {
      if (noteName.trim() === import.meta.env.VITE_ADMIN_SECRET) {
        startTransition(() => {
          navigate('/admin-panel');
        });
      } else {
        setLoading(true);
        const sanitizedName = sanitizeNoteName(noteName.trim());
        if (!sanitizedName) {
          setLoading(false);
          return;
        }
        startTransition(() => {
          navigate(`/${sanitizedName}`);
        });
      }
    }
  }, [noteName, navigate]);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Inject SEO structured data after render */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(SEO_STRUCTURED_DATA.faq)}</script>
        <script type="application/ld+json">{JSON.stringify(SEO_STRUCTURED_DATA.org)}</script>
        <script type="application/ld+json">{JSON.stringify(SEO_STRUCTURED_DATA.person)}</script>
        <script type="application/ld+json">{JSON.stringify(SEO_STRUCTURED_DATA.breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(SEO_STRUCTURED_DATA.siteNav)}</script>
      </Helmet>

      {/* Hero Section - Renders immediately for fast FCP/LCP */}
      <div className="min-h-screen flex flex-col">
        <header className="w-full py-6 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
              <a href="/puretext-vs-notion-google-keep" className="hover:text-foreground transition-colors">Compare</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 pb-24">
          <div className="max-w-2xl w-full text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              End-to-end encrypted
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-5">
              Your notes,
              <span className="text-primary"> encrypted.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
              Simple, secure note-taking. No sign-up required. 
              Your data never leaves your browser unencrypted.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
              <div className="editor-card rounded-2xl p-2 flex gap-2 relative z-10">
                <Input
                  type="text"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                  placeholder="Enter note name..."
                  className="flex-1 h-12 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 rounded-xl"
                  disabled={!noteName.trim() || loading}
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      Open
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground">
              Just type any name to create or access a note
            </p>

            {/* Scroll indicator */}
            <a href="#how-it-works" className="mt-16 block text-muted-foreground hover:text-foreground transition-colors" aria-label="Scroll to How It Works section">
              <ChevronDown className="w-6 h-6 mx-auto" />
            </a>
          </div>
        </main>
      </div>

      {/* Below-fold sections - lazy loaded for fast mobile FCP/LCP */}
      <Suspense fallback={null}>
        <BelowFoldSections />
      </Suspense>
    </div>
  );
};

export default Home;
