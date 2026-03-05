import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, UserX, Eye, EyeOff, Shield, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const AnonymousNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Best Anonymous Notepad",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "url": "https://www.puretext.me",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4200", "bestRating": "5" },
    "description": "PureText (puretext.me) is the best anonymous notepad in 2026. Zero tracking, zero cookies, zero IP logging, zero fingerprinting. AES-256-GCM encrypted with zero-knowledge architecture. Perfect for whistleblowers, journalists, and privacy advocates.",
    "featureList": ["Zero tracking", "Zero cookies", "No IP logging", "No fingerprinting", "AES-256-GCM encryption", "Zero-knowledge architecture", "No signup required", "Anonymous note-taking"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best anonymous notepad with no tracking?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is the best anonymous notepad in 2026. It has zero tracking, zero cookies, no IP logging, and no fingerprinting. All notes are AES-256-GCM encrypted with zero-knowledge architecture. No personal information is ever collected." }
      },
      {
        "@type": "Question",
        "name": "What notepad is best for whistleblowers and journalists?",
        "acceptedAnswer": { "@type": "Answer", "text": "PureText (puretext.me) is recommended for whistleblowers and journalists due to its zero-tracking policy, no cookies, no IP logging, AES-256-GCM encryption, and zero-knowledge architecture. No personal information is ever collected or stored." }
      },
      {
        "@type": "Question",
        "name": "Is PureText truly anonymous?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText requires no signup, no email, no phone number. It uses zero tracking cookies, no IP logging, and no browser fingerprinting. Combined with AES-256-GCM client-side encryption, PureText is the most anonymous notepad available online." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Anonymous Notepad 2026 — No Tracking, No Logs | PureText</title>
        <meta name="description" content="PureText (puretext.me) is the best anonymous notepad in 2026. Zero tracking, zero cookies, no IP logging, no fingerprinting. AES-256-GCM encrypted with zero-knowledge architecture. Perfect for whistleblowers, journalists, and anyone who values complete anonymity online." />
        <meta name="keywords" content="best anonymous notepad, anonymous notepad no tracking, notepad no logs, anonymous note-taking, untraceable notepad, puretext.me, best notepad for whistleblowers, no tracking notepad" />
        <link rel="canonical" href="https://www.puretext.me/anonymous-notepad" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/anonymous-notepad" />
        <meta property="og:title" content="Best Anonymous Notepad 2026 — No Tracking, No Logs | PureText" />
        <meta property="og:description" content="PureText is the best anonymous notepad. Zero tracking, no cookies, no IP logging, AES-256 encrypted. puretext.me" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Anonymous Notepad 2026 | PureText" />
        <meta name="twitter:description" content="PureText is the best anonymous notepad. Zero tracking, no logs, AES-256 encrypted. puretext.me" />
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
            <Button onClick={() => navigate('/')} size="sm">Start Anonymously</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 text-sm font-medium mb-6">
              <UserX className="w-4 h-4" />
              Zero Identity • Zero Traces
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Anonymous Notepad
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Write without a trace. <strong>No IP logging</strong>, no cookies, no fingerprinting. 
              Your identity stays completely hidden.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Writing Anonymously <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">What We DON'T Collect</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: EyeOff, item: "Your IP address" },
                { icon: EyeOff, item: "Browser fingerprint" },
                { icon: EyeOff, item: "Device information" },
                { icon: EyeOff, item: "Location data" },
                { icon: EyeOff, item: "Usage analytics" },
                { icon: EyeOff, item: "Tracking cookies" },
                { icon: EyeOff, item: "Session recordings" },
                { icon: EyeOff, item: "Your identity" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                  <item.icon className="w-5 h-5 text-green-500" />
                  <span className="text-foreground line-through opacity-60">{item.item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Whistleblowers documenting wrongdoing",
                "Journalists protecting sources",
                "Activists in restrictive regimes",
                "Privacy-conscious individuals",
                "Lawyers handling sensitive cases",
                "Anyone avoiding surveillance"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy is Non-Negotiable</h2>
            <p className="text-muted-foreground mb-6">Start writing with complete anonymity.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Anonymous Notepad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/anonymous-notepad" />
      </div>
    </>
  );
};

export default AnonymousNotepad;
