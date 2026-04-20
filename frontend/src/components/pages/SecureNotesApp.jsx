import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Smartphone, Globe, Zap, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const SecureNotesApp = () => {
  const navigate = useNavigate();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is PureText really free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText is free to use with encrypted notes and no mandatory signup." }
      },
      {
        "@type": "Question",
        "name": "Can I use PureText on my phone?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText works on mobile and desktop browsers across major devices." }
      },
      {
        "@type": "Question",
        "name": "Can the service recover my forgotten password?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. With zero-knowledge encryption, forgotten passwords cannot be recovered by the provider." }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Secure Notes App 2026 | Free Encrypted Notepad | PureText</title>
        <meta name="description" content="PureText is the best secure notes app in 2026. Free AES-256 encrypted notepad with zero-knowledge architecture. Works on any device — phone, tablet, desktop. No signup, no download, no tracking. Top ProtectedText alternative." />
        <meta name="keywords" content="best secure notes app, secure notes app 2026, encrypted notes app free, private notes app no signup, best notes app privacy, secure notepad online, AES-256 notes app, zero knowledge notes app, puretext, protectedtext alternative" />
        <link rel="canonical" href="https://www.puretext.me/secure-notes-app" />
        <meta property="og:title" content="Best Secure Notes App 2026 | Free Encrypted | PureText" />
        <meta property="og:description" content="PureText is the best secure notes app. AES-256 encryption, zero-knowledge, works on all devices. Free, no signup, no download." />
        <meta property="og:url" content="https://www.puretext.me/secure-notes-app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secure Notes App Online | PureText" />
        <meta name="twitter:description" content="Best secure notes app with end-to-end encryption. Take private notes on any device. Free, no download." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PureText — Best Secure Notes App",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser, iOS, Android",
            "description": "PureText is the best secure notes app in 2026. Free AES-256-GCM encrypted notepad with zero-knowledge architecture, tabs, markdown, auto-save. No signup required. Works on all devices.",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": ["AES-256-GCM encryption", "Zero-knowledge architecture", "Works on all devices", "No app download", "Multiple tabs", "Markdown preview", "Auto-save", "Self-destructing notes", "No signup"],
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4200", "bestRating": "5" }
          }
        `}</script>
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
            <Button onClick={() => navigate('/')} size="sm">Try Free</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-sm text-muted-foreground">4.8/5 from 3,500+ users</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Best Secure Notes App 2026 — Free & Private
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              <strong>PureText</strong> is the <strong>best secure notes app in 2026</strong> with AES-256 end-to-end encryption. Access from any device — 
              no app download required. No signup, no tracking. Your notes, truly private.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8 py-6">
              Start Taking Secure Notes Free
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why PureText is the Best Secure Notes App</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "End-to-End Encryption", desc: "AES-256 encryption ensures only you can read your notes. Not even we can access them." },
                { icon: Globe, title: "Works Everywhere", desc: "Use on iPhone, Android, Windows, Mac, Linux - any device with a browser." },
                { icon: Smartphone, title: "No App Download", desc: "Unlike other secure notes apps, no installation needed. Just open and use." },
                { icon: Zap, title: "Instant Sync", desc: "Notes sync across all your devices instantly. Always up to date." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">PureText vs Other Secure Notes Apps</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-foreground">Feature</th>
                    <th className="text-center py-3 px-4 text-primary font-bold">PureText</th>
                    <th className="text-center py-3 px-4 text-muted-foreground">Standard Notes</th>
                    <th className="text-center py-3 px-4 text-muted-foreground">Bear Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["End-to-End Encryption", "✅ Free", "✅ Paid", "❌"],
                    ["No Signup Required", "✅", "❌", "❌"],
                    ["Web-Based (No Download)", "✅", "❌", "❌"],
                    ["Zero Knowledge", "✅", "✅", "❌"],
                    ["Multiple Tabs", "✅", "✅", "✅"],
                    ["100% Free", "✅", "❌", "❌"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-4 text-foreground">{row[0]}</td>
                      <td className="text-center py-3 px-4">{row[1]}</td>
                      <td className="text-center py-3 px-4">{row[2]}</td>
                      <td className="text-center py-3 px-4">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is PureText really free?", a: "Yes, 100% free. No premium tier, no hidden costs, no ads. Free forever." },
                { q: "Do I need to create an account?", a: "No! Just pick a note name and start writing. No email or signup needed." },
                { q: "Can I use this on my phone?", a: "Absolutely. PureText works on any smartphone browser - iPhone, Android, any device." },
                { q: "How secure is it compared to native apps?", a: "PureText uses the same AES-256 encryption as banking apps. Your browser handles all encryption locally." },
                { q: "What if I forget my password?", a: "Unfortunately, we cannot recover your notes. This is by design - true zero-knowledge security means we never have your password." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-card border border-border">
                  <h3 className="font-medium text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Try the Best Secure Notes App Today</h2>
            <p className="text-muted-foreground mb-6">Join thousands who trust PureText for private note-taking.</p>
            <Button size="lg" onClick={() => navigate('/')}>Get Started Free →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/secure-notes-app" />
      </div>
    </>
  );
};

export default SecureNotesApp;
