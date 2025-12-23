import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Book, Heart, Pen, Shield, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';

const SecretDiaryOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Secret Diary Online",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4521", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Secret Diary Online | Private Journal with Password | PureText</title>
        <meta name="description" content="Keep a secret diary online with password protection and encryption. Your private journal that no one can read - not even us. Free, anonymous, and completely secure." />
        <meta name="keywords" content="secret diary online, private journal, encrypted diary, password protected diary, online diary with lock, secure journal, private diary app, anonymous diary, hidden diary online" />
        <link rel="canonical" href="https://www.puretext.me/secret-diary-online" />
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
            <Button onClick={() => navigate('/')} size="sm">Start Writing</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Your Thoughts • Completely Private
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Secret Diary Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A <strong>truly private diary</strong> that only you can read. Password-protected with 
              military-grade encryption. Your secrets stay secret.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Your Diary <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ Trusted by 4,521 diary keepers</p>
          </div>

          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-pink-500" />
              Why Your Diary is Safe
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Lock, title: "Password Protected", desc: "Set a password only you know. Without it, your diary is unreadable." },
                { icon: EyeOff, title: "We Can't Read It", desc: "Zero-knowledge encryption means even we cannot access your entries." },
                { icon: Eye, title: "No Tracking", desc: "We don't track what you write, when you write, or how often." },
                { icon: Shield, title: "AES-256 Encryption", desc: "Same security used by governments and banks worldwide." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <item.icon className="w-6 h-6 text-pink-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Daily journal entries",
                "Private thoughts & feelings",
                "Dreams and aspirations",
                "Personal reflections",
                "Gratitude journaling",
                "Therapy notes",
                "Creative writing",
                "Travel memories",
                "Relationship thoughts",
                "Secret goals & plans"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Pen className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">vs Diary Apps</h2>
            <div className="space-y-4">
              {[
                { name: "Day One", issues: ["Subscription required", "Account needed", "Data on their servers"] },
                { name: "Journey", issues: ["Premium features locked", "Email required", "Cloud dependency"] },
                { name: "Penzu", issues: ["Free version limited", "Account mandatory", "Ads in free tier"] },
                { name: "PureText", good: ["100% free", "No account", "True encryption", "Zero knowledge"] },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Start Your Secret Diary</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Choose Your URL", desc: "Pick something memorable like puretext.me/my-secret-diary" },
                { step: "2", title: "Set a Password", desc: "Create a strong password. This encrypts everything you write." },
                { step: "3", title: "Start Writing", desc: "Pour your heart out. Everything auto-saves and stays encrypted." },
                { step: "4", title: "Access Anywhere", desc: "Come back anytime, from any device. Just remember your URL and password." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center flex-shrink-0">
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

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Secrets Deserve Privacy</h2>
            <p className="text-muted-foreground mb-6">Start your encrypted secret diary today. Free forever.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Your Secret Diary →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Your secret diary, truly private.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SecretDiaryOnline;
