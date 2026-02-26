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
  faq: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is PureText.me the same as the Windows PureText tool?","acceptedAnswer":{"@type":"Answer","text":"No. PureText.me is a modern web-based editor, not the legacy clipboard utility."}},{"@type":"Question","name":"Is PureText.me a ProtectedText alternative?","acceptedAnswer":{"@type":"Answer","text":"Yes. PureText.me offers private text editing in the browser without tracking."}},{"@type":"Question","name":"How secure is PureText?","acceptedAnswer":{"@type":"Answer","text":"PureText uses AES-256-GCM encryption with zero-knowledge architecture. All encryption happens in your browser."}},{"@type":"Question","name":"Is PureText free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes, completely free. No registration, no subscription, no hidden costs."}},{"@type":"Question","name":"What happens if I forget my password?","acceptedAnswer":{"@type":"Answer","text":"Your notes cannot be recovered without the password. This is the trade-off for true security."}}]},
  org: {"@context":"https://schema.org","@type":"Organization","name":"PureText","url":"https://www.puretext.me","logo":"https://www.puretext.me/favicon.svg","founder":{"@type":"Person","name":"Cheekati Sanjay Goud","url":"https://www.sanjaycheekati.dev/"}},
  person: {"@context":"https://schema.org","@type":"Person","name":"Cheekati Sanjay Goud","alternateName":["sanjaycheekati","SanjayCheekati","Cheekati Sanjay"],"url":"https://www.sanjaycheekati.dev/","jobTitle":"Software Developer","knowsAbout":["Web Development","JavaScript","React","Node.js","Encryption"]},
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
              <a href="/puretext-vs-notion-google-keep" className="hover:text-foreground transition-colors">Compare</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 pb-24">
          <div className="max-w-xl w-full text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Shield className="w-3.5 h-3.5" />
              End-to-end encrypted
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
              Your notes,
              <span className="text-primary"> encrypted.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              Simple, secure note-taking. No sign-up required. 
              Your data never leaves your browser unencrypted.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-6">
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
