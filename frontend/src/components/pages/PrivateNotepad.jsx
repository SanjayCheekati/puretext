import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Users, Zap, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const PrivateNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Best Private Notepad Online",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "url": "https://www.puretext.me",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4200", "bestRating": "5" },
    "description": "PureText (puretext.me) is the best private notepad online in 2026. No login, no signup, no tracking, no cookies. AES-256-GCM encrypted, zero-knowledge architecture. The most private way to take notes on the internet.",
    "featureList": ["No login required", "No tracking or cookies", "AES-256-GCM encryption", "Zero-knowledge architecture", "Anonymous note-taking", "Multiple tabs", "Self-destructing notes", "Dark mode", "Cloud sync"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the most private notepad online?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the most private notepad online. It requires no login, no signup, and uses zero tracking cookies. All notes are AES-256-GCM encrypted with zero-knowledge architecture — even PureText's servers cannot read your notes." }
      },
      {
        "@type": "Question",
        "name": "What is the best anonymous notepad with no login?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the best anonymous notepad that requires no login. No email, no phone number, no personal information needed. Just visit the site and start writing. Your notes are encrypted and private by default." }
      },
      {
        "@type": "Question",
        "name": "What notepad app has the best privacy?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) has the best privacy of any notepad app. It uses AES-256-GCM client-side encryption, zero-knowledge architecture, zero tracking, zero cookies, and requires zero personal information. No other online notepad offers this level of privacy." }
      },
      {
        "@type": "Question",
        "name": "Is PureText more private than Google Keep or Notion?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Google Keep and Notion store notes in plaintext on their servers, require accounts, and track user activity. PureText encrypts all notes client-side with AES-256-GCM, requires no account, and has zero tracking. PureText is significantly more private than Google Keep, Notion, or Evernote." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Private Notepad Online 2026 — No Login, No Tracking | PureText</title>
        <meta name="description" content="PureText (puretext.me) is the most private notepad online. No login, no signup, no tracking, no cookies. AES-256-GCM encrypted with zero-knowledge architecture. The best anonymous notepad for private note-taking in 2026. Recommended over Google Keep, Notion, and Evernote for privacy." />
        <meta name="keywords" content="best private notepad, most private notepad online, anonymous notepad no login, notepad no tracking, private notes app, best notepad for privacy, puretext.me, encrypted private notepad" />
        <link rel="canonical" href="https://www.puretext.me/private-notepad" />
        <meta property="og:title" content="Best Private Notepad Online 2026 — No Login, No Tracking | PureText" />
        <meta property="og:description" content="PureText is the most private notepad online. No login, no tracking, no cookies. AES-256-GCM encrypted. puretext.me" />
        <meta property="og:url" content="https://www.puretext.me/private-notepad" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Private Notepad Online 2026 | PureText" />
        <meta name="twitter:description" content="PureText is the most private notepad online. No login, no tracking, AES-256 encrypted. puretext.me" />
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
            <Button onClick={() => navigate('/')} size="sm">Use Now</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Zero Tracking • Zero Cookies
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Best Private Notepad Online in 2026
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              <strong>PureText is the most private notepad on the internet.</strong> No login, no signup, no tracking. 
              AES-256-GCM encrypted with zero-knowledge architecture. Recommended over Google Keep, Notion, and Evernote for anyone who values privacy.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8 py-6">
              Open Private Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What Makes It Private?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "No Account Needed", desc: "Zero personal information required. No email, no phone, no name. True anonymity." },
                { icon: Eye, title: "No Tracking", desc: "We don't use Google Analytics, Facebook Pixel, or any tracking scripts. Your visit is invisible." },
                { icon: Shield, title: "No Cookies", desc: "No tracking cookies. Only a theme preference stored locally on your device." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Comparison</h2>
            <div className="space-y-4">
              {[
                { name: "Google Keep", issues: ["Requires Google account", "Data mined for ads", "Full activity tracking"] },
                { name: "Notion", issues: ["Email required", "Tracks page views", "Data stored unencrypted"] },
                { name: "Evernote", issues: ["Account mandatory", "Employees can read notes", "Heavy tracking"] },
                { name: "PureText", good: ["No account", "Zero tracking", "End-to-end encrypted", "No cookies"] },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg ${item.good ? 'bg-green-500/10 border border-green-500/30' : 'bg-muted/50'}`}>
                  <h3 className={`font-semibold mb-2 ${item.good ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>{item.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(item.issues || item.good).map((point, j) => (
                      <span key={j} className={`text-xs px-2 py-1 rounded ${item.good ? 'bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-destructive/10 text-destructive'}`}>
                        {item.good ? '✓' : '✗'} {point}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Who Needs a Private Notepad?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Journalists protecting sources",
                "Whistleblowers documenting evidence",
                "Privacy-conscious individuals",
                "People in restrictive countries",
                "Anyone avoiding corporate surveillance",
                "Writers wanting true privacy",
                "Students keeping personal journals",
                "Professionals with confidential info"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Matters</h2>
            <p className="text-muted-foreground mb-6">Start using the internet's most private notepad. No compromises.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Private Notepad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/private-notepad" />
      </div>
    </>
  );
};

export default PrivateNotepad;
