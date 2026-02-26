import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Timer, Trash2, Shield, Zap, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const TemporaryNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Temporary Notepad Online",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "4391", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is a temporary notepad?", "acceptedAnswer": { "@type": "Answer", "text": "A temporary notepad is an online text area where you can quickly write, paste, and edit text without creating an account. Notes can be accessed via a unique URL and optionally set to auto-delete." } },
      { "@type": "Question", "name": "Is the temporary notepad really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, PureText's temporary notepad is completely free with no limits, no ads, and no premium plans." } },
      { "@type": "Question", "name": "Are temporary notes encrypted?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Even temporary notes on PureText are encrypted with AES-256 when you set a password. Your data is always secure." } },
      { "@type": "Question", "name": "Can I share a temporary note with someone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each note has a unique URL you can share. You can also generate a QR code for easy mobile sharing." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Temporary Notepad Online | Free Disposable Notes | PureText 2025</title>
        <meta name="description" content="Free temporary notepad online. Write quick disposable notes — no signup, no installation. Perfect for one-time text sharing, temp notes, and scratch pad use. Encrypted." />
        <meta name="keywords" content="temporary notepad, temp notepad online, disposable notepad, temporary notes, scratch notepad, quick notepad online, throwaway notes, temp text editor, disposable notes online" />
        <link rel="canonical" href="https://www.puretext.me/temporary-notepad" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/temporary-notepad" />
        <meta property="og:title" content="Free Temporary Notepad Online | Disposable Notes | PureText" />
        <meta property="og:description" content="Quick temporary notepad for disposable notes. No signup, encrypted, free." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Temporary Notepad Online | PureText" />
        <meta name="twitter:description" content="Free disposable notepad. Write temp notes, share via link, auto-encrypted." />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
              <Timer className="w-4 h-4" />
              Quick • Disposable • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Temporary Notepad Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Need a <strong>temporary notepad</strong>? Write, paste, edit, and share text instantly. No signup, no installation — just a clean scratch pad when you need it.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Temp Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Perfect for Quick Tasks</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "Instant Access", desc: "Open a temporary notepad in under 2 seconds. No loading screens, no login forms." },
                { icon: Trash2, title: "Use & Dispose", desc: "Write your temporary text, copy it where you need it, and move on. Simple as that." },
                { icon: Shield, title: "Still Encrypted", desc: "Even temporary notes get AES-256 encryption. Your quick texts still deserve security." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Use a Temporary Notepad?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Sometimes you don't need a full note-taking app. You just need a quick place to:</p>
              <ul>
                <li><strong>Paste text for formatting</strong> — Strip formatting from copied text by pasting it into PureText</li>
                <li><strong>Share a snippet</strong> — Need to send someone a quick piece of text? Create a temporary note and share the link</li>
                <li><strong>Jot down a thought</strong> — Capture an idea before it escapes. No app to open, no account to log into</li>
                <li><strong>Transfer text between devices</strong> — Write on your computer, access on your phone via the same URL</li>
                <li><strong>Draft a message</strong> — Compose emails, texts, or posts in a distraction-free environment</li>
              </ul>
              <p>PureText's temporary notepad eliminates the friction of traditional note apps. No accounts, no syncing setup, no storage management. It's the digital equivalent of a sticky note — but encrypted.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Temporary Notepad Use Cases</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Quick clipboard between devices",
                "Sharing text links with coworkers",
                "Drafting social media posts",
                "Storing temporary passwords",
                "Pasting code snippets for review",
                "Quick meeting notes",
                "Shopping lists on the go",
                "Brainstorm dump before organizing"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Need a Quick Notepad Right Now?</h2>
            <p className="text-muted-foreground mb-6">Open PureText and start typing. It's that simple.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Temporary Notepad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/temporary-notepad" />
      </div>
    </>
  );
};

export default TemporaryNotepad;
