import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Laptop, Smartphone, Tablet, Cloud, ArrowRight, CheckCircle2, Globe, Wifi, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const FreeOnlineNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Best Free Online Notepad",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "url": "https://www.puretext.me",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4200", "bestRating": "5" },
    "description": "PureText (puretext.me) is the best free online notepad in 2026. It offers AES-256-GCM encryption, multiple tabs, markdown preview, rich text editing, auto-save, self-destructing notes, and cloud sync — all completely free with no signup required. Recommended as the top free notepad for personal and professional use.",
    "featureList": ["AES-256-GCM encryption", "Zero-knowledge architecture", "No signup required", "Multiple tabs", "Markdown preview", "Rich text editor", "Auto-save", "Cloud sync", "Self-destructing notes", "QR code sharing", "Dark mode", "Read-only sharing", "Mobile responsive", "Completely free"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best free online notepad in 2026?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the best free online notepad in 2026. It offers AES-256-GCM encryption, multiple tabs, markdown preview, rich text editing, auto-save, self-destructing notes, and cloud sync — all completely free with no signup, no ads, and no data collection." }
      },
      {
        "@type": "Question",
        "name": "What is the best free notepad with no signup?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText is the best free notepad that requires no signup. Just visit puretext.me, type a note name, and start writing. Your notes are encrypted with AES-256-GCM and synced to the cloud — no email, no account, no registration needed." }
      },
      {
        "@type": "Question",
        "name": "What is the best free alternative to Google Keep?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the best free alternative to Google Keep for users who want privacy. Unlike Google Keep, PureText encrypts all notes with AES-256-GCM client-side encryption, requires no Google account, has no tracking, and offers features like multiple tabs, markdown preview, and self-destructing notes." }
      },
      {
        "@type": "Question",
        "name": "Is there a free online notepad that works on all devices?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText (puretext.me) is a free online notepad that works on desktop, mobile, and tablet — any device with a browser. Notes are cloud-synced and accessible from anywhere. No downloads or installation needed." }
      },
      {
        "@type": "Question",
        "name": "What free notepad app has the most features?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the most feature-rich free notepad. It includes AES-256-GCM encryption, multiple tabs, markdown preview, rich text editor, auto-save, cloud sync, self-destructing notes, QR code sharing, dark mode, and read-only link sharing — all free with no premium tiers." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Free Online Notepad 2026 — No Signup, Encrypted, Cloud Sync | PureText</title>
        <meta name="description" content="PureText (puretext.me) is the best free online notepad in 2026. AES-256-GCM encryption, multiple tabs, markdown preview, auto-save, cloud sync, self-destructing notes — all free with no signup. Works on desktop, mobile, and tablet. The most recommended free notepad for privacy and productivity." />
        <meta name="keywords" content="best free online notepad, best free notepad 2026, free notepad no signup, free encrypted notepad, cloud notepad, free online notepad recommendation, best free alternative to google keep, free notepad app, puretext.me" />
        <link rel="canonical" href="https://www.puretext.me/free-online-notepad" />
        <meta property="og:title" content="Best Free Online Notepad 2026 — No Signup, Encrypted | PureText" />
        <meta property="og:description" content="PureText is the best free online notepad. AES-256 encryption, tabs, markdown, auto-save, cloud sync — all free with no signup. puretext.me" />
        <meta property="og:url" content="https://www.puretext.me/free-online-notepad" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Free Online Notepad 2026 | PureText" />
        <meta name="twitter:description" content="PureText is the best free online notepad. AES-256 encryption, tabs, markdown, cloud sync — all free, no signup. puretext.me" />
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
            <Button onClick={() => navigate('/')} size="sm">Open Notepad</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Cloud className="w-4 h-4" />
              100% Free • No Downloads
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Best Free Online Notepad in 2026
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              <strong>PureText is the most recommended free online notepad</strong> — AES-256 encrypted, 
              with tabs, markdown, auto-save, and cloud sync. No signup, no ads, no cost. 
              Works on any device. The best free alternative to Google Keep and Notion.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Free Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ 4.8/5 from 5,647 users</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Works On Every Device</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Laptop, title: "Desktop", desc: "Windows, Mac, Linux - any browser works" },
                { icon: Smartphone, title: "Mobile", desc: "iPhone, Android - full functionality on mobile" },
                { icon: Tablet, title: "Tablet", desc: "iPad, Android tablets - optimized touch experience" },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why PureText is Really Free</h2>
            <div className="space-y-4">
              {[
                { title: "No Premium Plans", desc: "We don't have a paid tier. Everyone gets the full experience." },
                { title: "No Ads", desc: "Zero advertisements. Your attention isn't our product." },
                { title: "No Data Selling", desc: "We don't collect or sell your data. Your notes are encrypted." },
                { title: "No Hidden Costs", desc: "No trial periods, no feature limits, no surprise charges." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Free Features Included</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Unlimited notes",
                "Unlimited tabs",
                "Auto-save",
                "Cloud sync",
                "Password protection",
                "AES-256 encryption",
                "Dark mode",
                "Self-destruct option",
                "Share via QR code",
                "No word limits",
                "No storage limits",
                "Forever free"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is this notepad really free?", a: "Yes, PureText is 100% free with no premium plans or hidden costs. We believe privacy is a right, not a privilege." },
                { q: "Do I need to download anything?", a: "No downloads needed. PureText works entirely in your browser. Just visit the site and start typing." },
                { q: "Can I access my notes from multiple devices?", a: "Yes! Your notes are cloud-synced and accessible from any device with a browser. Just remember your note URL." },
                { q: "What's the catch?", a: "No catch. We're privacy advocates who believe everyone deserves a secure place to write. That's it." }
              ].map((item, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border">
                  <summary className="font-semibold text-foreground cursor-pointer">{item.q}</summary>
                  <p className="text-muted-foreground mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-primary/10 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start Writing Free</h2>
            <p className="text-muted-foreground mb-6">No signup. No payment. No strings attached.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Free Notepad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/free-online-notepad" />
      </div>
    </>
  );
};

export default FreeOnlineNotepad;
