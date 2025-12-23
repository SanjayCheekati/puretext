import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Trash2, Clock, Flame, Skull, ArrowRight, CheckCircle2, Timer } from 'lucide-react';
import { Button } from '../ui/button';

const SelfDestructingNotes = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Self-Destructing Notes",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "1876", "bestRating": "5" },
    "description": "Self-destructing notes that automatically delete after a set time. Perfect for sensitive information."
  };

  return (
    <>
      <Helmet>
        <title>Self-Destructing Notes | Auto-Delete Notes Online | PureText</title>
        <meta name="description" content="Create self-destructing notes that automatically delete after a set time. Perfect for sharing sensitive information that shouldn't persist. Free, encrypted, untraceable." />
        <meta name="keywords" content="self destructing notes, auto delete notes, temporary notes, burn after reading, ephemeral notes, disappearing notes, time-limited notes, secure temporary messages" />
        <link rel="canonical" href="https://www.puretext.me/self-destructing-notes" />
        <meta property="og:title" content="Self-Destructing Notes | Auto-Delete After Reading" />
        <meta property="og:description" content="Notes that vanish automatically. Share sensitive info without leaving traces." />
        <meta property="og:url" content="https://www.puretext.me/self-destructing-notes" />
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
            <Button onClick={() => navigate('/')} size="sm">Create Notes</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              Auto-Delete • Leave No Trace
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Self-Destructing Notes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Like Snapchat for text. Create notes that <strong>automatically vanish</strong> after 
              a set time. Perfect for sensitive information that shouldn't persist.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Create Self-Destructing Note <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <Timer className="w-6 h-6 text-orange-500" />
              How Self-Destruct Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "Set Timer", desc: "Choose when your note expires: 1 hour, 24 hours, 7 days, or custom" },
                { icon: Flame, title: "Share Link", desc: "Send the encrypted link to anyone who needs to see the note" },
                { icon: Trash2, title: "Auto-Delete", desc: "When time's up, the note is permanently erased from our servers" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4">
                  <item.icon className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Use Cases</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Sharing Passwords", desc: "Send login credentials that disappear after use" },
                { title: "Sensitive Business Info", desc: "Share confidential data with automatic cleanup" },
                { title: "Private Messages", desc: "Have conversations that leave no record" },
                { title: "One-Time Instructions", desc: "Send directions or codes that self-destruct" },
                { title: "Temporary Access Info", desc: "Share WiFi passwords or entry codes" },
                { title: "Confidential Feedback", desc: "Give honest feedback that won't persist" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Expiration Options</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { time: "1 Hour", desc: "Quick shares" },
                { time: "24 Hours", desc: "Day-long access" },
                { time: "7 Days", desc: "Week-long projects" },
                { time: "30 Days", desc: "Extended needs" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{item.time}</div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Self-Destructing Notes?</h2>
            <div className="space-y-4">
              {[
                { title: "Minimize Risk", desc: "The less data exists, the less can be stolen or leaked. Self-destructing notes minimize your digital footprint." },
                { title: "GDPR Compliance", desc: "Automatic deletion helps with data minimization requirements under privacy regulations." },
                { title: "Peace of Mind", desc: "Know that sensitive information won't be sitting on servers indefinitely." },
                { title: "Clean Digital Hygiene", desc: "Not everything needs to be permanent. Temporary notes for temporary needs." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-6 rounded-xl bg-destructive/10 border border-destructive/30">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Skull className="w-5 h-5 text-destructive" />
              Warning: Deletion is Permanent
            </h3>
            <p className="text-muted-foreground text-sm">
              Once a self-destructing note expires, it's gone forever. We have no backups, no recovery option, 
              no way to retrieve it. This is by design - true privacy means true deletion.
            </p>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Send Notes That Vanish</h2>
            <p className="text-muted-foreground mb-6">Share sensitive information with confidence.</p>
            <Button size="lg" onClick={() => navigate('/')}>Create Self-Destructing Note →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Self-destructing notes that leave no trace.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SelfDestructingNotes;
