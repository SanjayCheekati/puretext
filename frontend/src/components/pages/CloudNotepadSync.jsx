import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, Laptop, Tablet, Cloud, Wifi, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const CloudNotepadSync = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Cloud Notepad with Sync",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "9421", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Cloud Notepad with Sync | Access Notes Any Device | PureText</title>
        <meta name="description" content="Cloud notepad with automatic sync across all your devices. Write on your phone, continue on laptop. Free cloud notes with encryption - no signup required." />
        <meta name="keywords" content="cloud notepad, sync notes across devices, cloud notes free, notepad with sync, cross device notes, cloud text editor, synced notepad, access notes anywhere, multi device notepad" />
        <link rel="canonical" href="https://www.puretext.me/cloud-notepad-sync" />
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
            <Button onClick={() => navigate('/')} size="sm">Start Syncing</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
              <Cloud className="w-4 h-4" />
              Automatic Sync • All Devices
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Cloud Notepad with Sync
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Write on any device, continue on another. Your notes <strong>sync automatically</strong> 
              across phone, tablet, and laptop. Free and encrypted.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Cloud Notes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ 9,421 users syncing notes</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Works Everywhere</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Smartphone, title: "Phone", desc: "Take notes on the go. Works perfectly on iOS and Android browsers." },
                { icon: Tablet, title: "Tablet", desc: "Great for meetings and lectures. Touch-optimized interface." },
                { icon: Laptop, title: "Computer", desc: "Full experience on desktop. Any browser, any OS." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How Sync Works</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Pick a memorable URL", desc: "Like puretext.me/mynotes - this is your unique address" },
                { step: "2", title: "Write on any device", desc: "Changes save automatically to the cloud" },
                { step: "3", title: "Open on another device", desc: "Visit the same URL - your notes are there instantly" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Cloud Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Instant sync - no refresh needed",
                "Works on slow connections",
                "No app download required",
                "No storage limits",
                "Encrypted in transit and at rest",
                "No account setup",
                "Accessible worldwide",
                "99.9% uptime reliability"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Notes, Every Device</h2>
            <p className="text-muted-foreground mb-6">Seamless sync without the complexity.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Cloud Notepad →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Cloud notepad with automatic sync.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CloudNotepadSync;
