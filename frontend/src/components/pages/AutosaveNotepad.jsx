import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Save, Cloud, Wifi, WifiOff, ArrowRight, CheckCircle2, Zap, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const AutosaveNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Autosave Notepad",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3245", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Autosave Notepad Online | Never Lose Your Work | PureText</title>
        <meta name="description" content="Online notepad with automatic saving - never lose your work again. Your notes save instantly as you type. Cloud sync, offline support, and zero data loss. Free." />
        <meta name="keywords" content="autosave notepad, auto save notes, notepad with auto save, never lose notes, cloud save notepad, automatic saving notepad, notes auto backup, instant save notepad" />
        <link rel="canonical" href="https://www.puretext.me/autosave-notepad" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen gradient-bg">
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </a>
            <Button onClick={() => navigate('/')} size="sm">Try Now</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
              <Save className="w-4 h-4" />
              Auto-Save • Never Lose Work
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Autosave Notepad
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Every keystroke is <strong>automatically saved</strong>. Browser crash? Power outage? 
              Accidental close? Your notes are always safe.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Writing Worry-Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How Auto-Save Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Instant Save", desc: "Every character you type is saved within milliseconds" },
                { icon: Cloud, title: "Cloud Sync", desc: "Changes sync to our secure servers automatically" },
                { icon: RefreshCw, title: "Auto-Recovery", desc: "Come back anytime and find exactly where you left off" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4">
                  <item.icon className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Never Lose Your Work To:</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Browser crashes",
                "Computer restarts",
                "Accidental tab closes",
                "Power outages",
                "System updates",
                "Forgetting to save",
                "Browser back button",
                "Session timeouts"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10">
                  <span className="text-destructive font-bold text-lg">✗</span>
                  <span className="text-foreground line-through opacity-70">{item}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-4">
              All these scenarios? Your notes are still safe with PureText.
            </p>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">The Technical Details</h2>
            <div className="space-y-4">
              {[
                { title: "Debounced Saves", desc: "Saves trigger 500ms after you stop typing to avoid server overload while ensuring nothing is lost." },
                { title: "Local Backup", desc: "Notes are also cached in your browser's local storage as an extra safety net." },
                { title: "Conflict Resolution", desc: "If you edit from multiple devices, we intelligently merge changes." },
                { title: "Encrypted Saves", desc: "Every save is encrypted before leaving your browser. Security and reliability." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">FAQ</h2>
            <div className="space-y-4">
              {[
                { q: "How often does it save?", a: "Every time you pause typing for 500ms. Effectively, constantly." },
                { q: "What if I'm offline?", a: "Notes save locally and sync when you're back online." },
                { q: "Can I manually save?", a: "You can, but you don't need to. It's automatic." },
                { q: "Is there version history?", a: "Currently no, but your latest version is always preserved." }
              ].map((item, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border">
                  <summary className="font-semibold text-foreground cursor-pointer">{item.q}</summary>
                  <p className="text-muted-foreground mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Write Without Worrying</h2>
            <p className="text-muted-foreground mb-6">Auto-save has your back. Focus on writing.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Writing →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Autosave notepad that never loses your work.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AutosaveNotepad;
