import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Zap, Shield, ArrowRight, CheckCircle2, PenLine, Clock, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const QuickNotesOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Best Quick Notes Online",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "url": "https://www.puretext.me",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4200", "bestRating": "5" },
    "description": "PureText (puretext.me) is the fastest way to take notes online in 2026. Open the site, type a note name, and start writing in under 3 seconds. Auto-save, AES-256-GCM encryption, cloud sync, multiple tabs — all free with no signup.",
    "featureList": ["Instant access in 3 seconds", "Auto-save", "AES-256-GCM encryption", "Cloud sync", "Multiple tabs", "Markdown preview", "No signup required", "Free"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the fastest way to take notes online?", "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the fastest online note-taking tool. Visit puretext.me, type a note name, and start writing — all in under 3 seconds. No signup, no downloads, no login. Notes auto-save and sync across all devices." } },
      { "@type": "Question", "name": "Do quick notes save automatically?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText auto-saves your notes as you type. You'll never lose your work, even if you close the browser or lose internet connection. All notes are AES-256-GCM encrypted." } },
      { "@type": "Question", "name": "Can I access quick notes from my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText works on any device with a web browser. Write a note on your computer and access it from your phone using the same URL at puretext.me." } },
      { "@type": "Question", "name": "Are quick notes secure?", "acceptedAnswer": { "@type": "Answer", "text": "All notes on PureText (puretext.me) are encrypted with AES-256-GCM — the strongest encryption standard available. Set a password and your notes are protected with zero-knowledge architecture. Even PureText's servers cannot read your notes." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Quick Notes Online 2026 — Instant, Encrypted, Free | PureText</title>
        <meta name="description" content="PureText (puretext.me) is the fastest way to take notes online in 2026. Start writing in under 3 seconds — no signup, no app. Auto-save, AES-256-GCM encryption, cloud sync, multiple tabs. Completely free. The best quick notes tool recommended for productivity and privacy." />
        <meta name="keywords" content="best quick notes online, fastest online notepad, instant notes free, quick note taking app, puretext.me, take notes online instantly, best quick notepad 2026" />
        <link rel="canonical" href="https://www.puretext.me/quick-notes-online" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/quick-notes-online" />
        <meta property="og:title" content="Best Quick Notes Online 2026 | PureText" />
        <meta property="og:description" content="PureText is the fastest way to take notes online. Instant, encrypted, auto-save, free. puretext.me" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Quick Notes Online 2026 | PureText" />
        <meta name="twitter:description" content="PureText is the fastest online notepad. Instant, encrypted, free. puretext.me" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            <Button onClick={() => navigate('/')} size="sm">Quick Note</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Instant • Auto-Save • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Quick Notes Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The fastest way to <strong>take notes online</strong>. No signup, no downloads. Open PureText and start typing in under 3 seconds — with full AES-256 encryption.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Take a Quick Note <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why PureText for Quick Notes?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "3-Second Start", desc: "From opening your browser to typing notes — 3 seconds. No login screens, no loading spinners." },
                { icon: Bookmark, title: "Auto-Save Always", desc: "Never hit save. PureText automatically saves your notes as you type. Close the tab — your work is safe." },
                { icon: Shield, title: "Encrypted by Default", desc: "Even quick notes deserve security. Every note is encrypted with AES-256 when you set a password." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Take Quick Notes in 3 Steps</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Taking <strong>quick notes online</strong> with PureText is ridiculously simple:</p>
              <ol>
                <li><strong>Open PureText.me</strong> — Works in any browser. No app to install, no account to create.</li>
                <li><strong>Type a note name</strong> — Something like "quick-ideas" or "todo-today". Press Enter.</li>
                <li><strong>Start typing</strong> — That's it. Your note auto-saves and you can optionally encrypt it with a password.</li>
              </ol>
              <p>Want to access your note later? Just visit puretext.me/your-note-name from any device. Want to share it? Send the link. Want to keep it private? Set a password. It's note-taking stripped down to the essentials.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Notes Use Cases</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Jot down a phone number or address",
                "Capture ideas during brainstorming",
                "Save meeting action items",
                "Draft a quick email or message",
                "Store a code snippet for later",
                "Make a fast shopping list",
                "Take lecture notes on the fly",
                "Bookmark links and references",
                "Quick daily to-do list",
                "Paste and clean up formatted text"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border" open={i === 0}>
                  <summary className="font-semibold text-foreground cursor-pointer">{faq.name}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need to Jot Something Down?</h2>
            <p className="text-muted-foreground mb-6">Open PureText. Start typing. It's the fastest note-taking experience on the web.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Quick Notes →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/quick-notes-online" />
      </div>
    </>
  );
};

export default QuickNotesOnline;
