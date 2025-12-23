import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, UserX, Eye, EyeOff, Shield, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../ui/button';

const AnonymousNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Anonymous Notepad",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "6234", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Anonymous Notepad Online | No Tracking No Logs | PureText</title>
        <meta name="description" content="Anonymous notepad with zero tracking. No IP logging, no cookies, no fingerprinting. Write notes completely anonymously online. Perfect for whistleblowers, journalists, and privacy advocates." />
        <meta name="keywords" content="anonymous notepad, no tracking notepad, anonymous notes online, untraceable notes, no logs notepad, privacy notepad, anonymous text editor, incognito notepad, tor friendly notepad" />
        <link rel="canonical" href="https://www.puretext.me/anonymous-notepad" />
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

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Anonymous notepad with zero tracking.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AnonymousNotepad;
