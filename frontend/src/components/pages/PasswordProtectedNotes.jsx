import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Key, Fingerprint, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

const PasswordProtectedNotes = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Password Protected Notes",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3102", "bestRating": "5" },
    "description": "Free password protected notes with military-grade AES-256 encryption"
  };

  return (
    <>
      <Helmet>
        <title>Password Protected Notes Online | AES-256 Encrypted | PureText</title>
        <meta name="description" content="Password protect your notes with military-grade AES-256 encryption. Free online password protected notepad - your notes are unreadable without your password, even to us." />
        <meta name="keywords" content="password protected notes, encrypted notes, secure notepad with password, locked notes online, AES-256 notes, password notepad, secure text storage, private notes password" />
        <link rel="canonical" href="https://www.puretext.me/password-protected-notes" />
        <meta property="og:title" content="Password Protected Notes | Military-Grade Encryption" />
        <meta property="og:description" content="Lock your notes with AES-256 encryption. Even we can't read them." />
        <meta property="og:url" content="https://www.puretext.me/password-protected-notes" />
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
            <Button onClick={() => navigate('/')} size="sm">Protect Your Notes</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-6">
              <Key className="w-4 h-4" />
              AES-256 Encryption • Zero Knowledge
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Password Protected Notes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your password is the key. Without it, your notes are <strong>mathematically impossible</strong> to read - 
              even by us, even by hackers, even by governments.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Create Protected Notes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ Trusted by 3,102 users</p>
          </div>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How Password Protection Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-foreground">You set a password</h3>
                  <p className="text-muted-foreground">Choose any password you want. We never see it, store it, or transmit it.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-foreground">Your browser encrypts locally</h3>
                  <p className="text-muted-foreground">Using AES-256 encryption (same as banks), your notes are scrambled into unreadable gibberish before leaving your device.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-foreground">We store only encrypted data</h3>
                  <p className="text-muted-foreground">Our servers only see random characters. Without your password, decryption would take longer than the age of the universe.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> What's Protected
              </h3>
              <ul className="space-y-2">
                {[
                  "All note content",
                  "All tab names",
                  "All tab contents",
                  "Your formatting",
                  "Everything you type"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Important
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• We cannot recover forgotten passwords</li>
                <li>• No password = no access (even for us)</li>
                <li>• Choose a memorable password</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why AES-256?</h2>
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-muted-foreground mb-4">
                AES-256 (Advanced Encryption Standard with 256-bit key) is the same encryption used by:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["US Government", "Banks Worldwide", "Military Systems", "Top Tech Companies"].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 text-center">
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                To crack AES-256 by brute force would require more computational power than exists on Earth, 
                running for longer than the universe has existed.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Personal journals & diaries",
                "Financial information",
                "Medical records",
                "Business secrets",
                "Legal documents",
                "Research notes",
                "Creative writing",
                "Sensitive communications"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-red-500/10 to-primary/10 border border-red-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Secrets Deserve Real Protection</h2>
            <p className="text-muted-foreground mb-6">Not just promises - mathematical guarantees.</p>
            <Button size="lg" onClick={() => navigate('/')}>Create Protected Notes →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Military-grade password protected notes.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PasswordProtectedNotes;
