import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Cloud, Wifi, Battery, Zap, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../ui/button';

const OnlineNotepadNoSignup = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PureText - Online Notepad No Signup",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2341",
      "bestRating": "5"
    },
    "featureList": ["No signup required", "No login needed", "Free forever", "Instant access", "Password protection", "Multiple tabs"]
  };

  return (
    <>
      <Helmet>
        <title>Online Notepad No Signup | Free Instant Notepad | PureText</title>
        <meta name="description" content="Online notepad no signup required. Start writing instantly without creating an account. Free, fast, and accessible from any device. No email, no registration, just notes." />
        <meta name="keywords" content="online notepad no signup, notepad without registration, free notepad no account, instant notepad, no login notepad, anonymous notepad online, quick notepad, simple online notepad" />
        <link rel="canonical" href="https://www.puretext.me/online-notepad-no-signup" />
        <meta property="og:title" content="Online Notepad No Signup | Start Writing Instantly" />
        <meta property="og:description" content="Free online notepad - no signup, no login, no hassle. Just open and start writing." />
        <meta property="og:url" content="https://www.puretext.me/online-notepad-no-signup" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Instant Access • Zero Friction
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Online Notepad<br />No Signup Required
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Why waste time creating accounts? Start writing <strong>instantly</strong>. 
              No email verification, no password setup, no waiting. Just notes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
                Open Notepad Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/mynotebook')}>
                Try Demo: /mynotebook
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ 4.8/5 from 2,341 users</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Pick a URL", desc: "Choose any name like puretext.me/mynotes - it becomes your private notepad" },
                { step: "2", title: "Start Writing", desc: "Instantly start typing. No signup forms, no email verification, no waiting" },
                { step: "3", title: "Done!", desc: "Your notes auto-save and are encrypted. Add a password for extra security" },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Signup-Free is Better</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "Instant Access", desc: "Start in 2 seconds, not 2 minutes. No forms to fill, no emails to confirm." },
                { icon: Lock, title: "More Private", desc: "No account means no profile, no data collection, no identity linked to notes." },
                { icon: Globe, title: "Works Anywhere", desc: "Public computer? Phone? Tablet? Access from any device without logging in." },
                { icon: Battery, title: "No Password Fatigue", desc: "One less password to remember. One less account to manage. One less data breach risk." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Popular No-Signup Use Cases</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Quick meeting notes",
                "Shopping lists",
                "Temporary to-do lists",
                "Code snippets",
                "Travel itineraries",
                "Recipe storage",
                "Book notes",
                "Password-protected journals",
                "Collaborative brainstorming"
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
                { q: "Is it really free with no signup?", a: "Yes! 100% free, no account needed. Just pick a URL and start writing." },
                { q: "How do I save my notes?", a: "Notes auto-save as you type. Just remember your URL (e.g., puretext.me/mynotes)." },
                { q: "Can others access my notes?", a: "Only if they know your exact URL. Add a password for complete privacy." },
                { q: "What if I forget my URL?", a: "Bookmark it! Or use a memorable name like puretext.me/yourname-notes." }
              ].map((item, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border group">
                  <summary className="font-semibold text-foreground cursor-pointer">{item.q}</summary>
                  <p className="text-muted-foreground mt-2 pl-4">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Write?</h2>
            <p className="text-muted-foreground mb-6">No signup. No login. No friction. Just your thoughts.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Notepad Now →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - The internet's best signup-free notepad.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default OnlineNotepadNoSignup;
