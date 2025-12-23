import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Code, Terminal, Braces, FileCode, ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '../ui/button';

const CodeSnippetManager = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Code Snippet Manager",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "7632", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Code Snippet Manager Online | Store Code Snippets Free | PureText</title>
        <meta name="description" content="Free online code snippet manager. Store, organize, and access your code snippets from anywhere. Perfect for developers - organize by language with tabs, encrypted storage, no signup." />
        <meta name="keywords" content="code snippet manager, store code snippets online, code notes, developer notepad, programming snippets, code storage online, snippet organizer, code library online, developer notes" />
        <link rel="canonical" href="https://www.puretext.me/code-snippet-manager" />
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
            <Button onClick={() => navigate('/')} size="sm">Start Storing</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
              <Code className="w-4 h-4" />
              Developer Friendly • Zero Config
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Code Snippet Manager
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Stop losing your code snippets. Store, organize, and access them from <strong>anywhere</strong>. 
              Free, encrypted, and no signup required.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Storing Snippets <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ Used by 7,632 developers</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Organize by Language</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["JavaScript", "Python", "React", "SQL", "Bash", "CSS", "TypeScript", "Go"].map((lang, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                  <FileCode className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground">{lang}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Create a tab for each language or project
            </p>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Developers Use PureText</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Plain text - no syntax highlighting bloat",
                "Organize with unlimited tabs",
                "Access from any machine",
                "No account or sync setup",
                "Works behind corporate firewalls",
                "Paste and go workflow",
                "Password protect sensitive code",
                "Share via QR code"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Use Cases</h2>
            <div className="space-y-4">
              {[
                { title: "Config Snippets", desc: "Store .bashrc, .vimrc, nginx configs you always need" },
                { title: "Interview Prep", desc: "Keep algorithm solutions organized by topic" },
                { title: "Project Templates", desc: "Boilerplate code you copy-paste into new projects" },
                { title: "Quick References", desc: "Regex patterns, SQL queries, CLI commands" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50 flex gap-4">
                  <Terminal className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-primary/10 border border-emerald-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Snippets, Anywhere</h2>
            <p className="text-muted-foreground mb-6">No more "where did I save that code?"</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Snippet Library →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Code snippet manager for developers.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CodeSnippetManager;
