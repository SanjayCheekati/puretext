import React, { useState, useEffect, startTransition, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Lazy load below-fold sections to speed up FCP/LCP
const BelowFoldSections = lazy(() => import('./HomeSections'));

// SEO structured data injected after initial render (not blocking HTML parse)
const SEO_STRUCTURED_DATA = {
  faq: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is PureText.me the same as the Windows PureText tool?","acceptedAnswer":{"@type":"Answer","text":"No. PureText.me is a modern web-based encrypted notepad, not the legacy clipboard utility. It offers AES-256 encryption, password protection, tabs, self-destructing notes, and rich text editing — all in your browser."}},{"@type":"Question","name":"Is PureText.me a ProtectedText alternative?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText.me is the best ProtectedText alternative in 2026, offering stronger AES-256-GCM encryption, rich text formatting, tabs, self-destructing notes, QR code sharing, and a modern mobile-friendly interface."}},{"@type":"Question","name":"How secure is PureText?","acceptedAnswer":{"@type":"Answer","text":"PureText uses AES-256-GCM encryption with zero-knowledge architecture. All encryption and decryption happens in your browser — the server never sees your data in plain text."}},{"@type":"Question","name":"Is PureText free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes, completely free. No registration, no subscription, no hidden costs. Unlimited notes with full encryption."}},{"@type":"Question","name":"What happens if I forget my password?","acceptedAnswer":{"@type":"Answer","text":"Your notes cannot be recovered without the password. This is by design — PureText uses zero-knowledge encryption where only you hold the keys."}},{"@type":"Question","name":"Can I share my notes with others?","acceptedAnswer":{"@type":"Answer","text":"Yes! You can generate a read-only link that lets others view your note without editing access. You can also share an editable link or a QR code."}},{"@type":"Question","name":"Do my notes self-destruct?","acceptedAnswer":{"@type":"Answer","text":"You can set a self-destruct timer on any note — choose from 1 hour, 24 hours, 7 days, 30 days, or a custom duration. The note is permanently deleted from the server when the timer expires."}},{"@type":"Question","name":"Does PureText work on mobile?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText is a responsive web app that works on any device — phone, tablet, or desktop. No app download required."}}]},
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
        const sanitizedName = noteName.trim().toLowerCase().replace(/\s+/g, '-');
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
