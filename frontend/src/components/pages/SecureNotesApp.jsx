import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Smartphone, Globe, Zap, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../ui/button';

const SecureNotesApp = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Secure Notes App Online | Private Note Taking | PureText 2025</title>
        <meta name="description" content="Best secure notes app for 2025. Take private notes online with end-to-end encryption. Works on any device - phone, tablet, desktop. Free, no app download needed." />
        <meta name="keywords" content="secure notes app, private notes app, encrypted notes app, secure note taking app, best notes app privacy, private notepad app, secure notes online, end to end encrypted notes" />
        <link rel="canonical" href="https://www.puretext.me/secure-notes-app" />
        <meta property="og:title" content="Secure Notes App Online | Private Note Taking | PureText" />
        <meta property="og:description" content="Best secure notes app with end-to-end encryption. Take private notes on any device. Free, no download." />
        <meta property="og:url" content="https://www.puretext.me/secure-notes-app" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PureText Secure Notes",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser, iOS, Android",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "3521" }
          }
        `}</script>
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
              Best Secure Notes App for 2025
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Take <strong>private notes</strong> with end-to-end encryption. Access from any device - 
              no app download required. Your notes, truly private.
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

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Best secure notes app with zero-knowledge encryption.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SecureNotesApp;
