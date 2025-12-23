import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, FileText, Layers, Plus, Trash2, ArrowRight, CheckCircle2, PenTool } from 'lucide-react';
import { Button } from '../ui/button';

const NotepadWithTabs = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Notepad with Tabs",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2156", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Notepad with Tabs Online | Multi-Tab Text Editor Free | PureText</title>
        <meta name="description" content="Free online notepad with tabs - organize multiple notes in one place. Create, rename, and manage unlimited tabs. Like browser tabs but for your notes. No signup required." />
        <meta name="keywords" content="notepad with tabs, multi-tab notepad, tabbed text editor, organize notes tabs, multiple notes online, tabbed notepad free, notepad tabs online, text editor with tabs" />
        <link rel="canonical" href="https://www.puretext.me/notepad-with-tabs" />
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
            <Button onClick={() => navigate('/')} size="sm">Try Now</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Unlimited Tabs • Free Forever
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Notepad with Tabs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Like browser tabs, but for your notes. Create <strong>unlimited tabs</strong> to organize 
              different topics, projects, or ideas - all in one secure notepad.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Tabbed Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Tab Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Plus, title: "Unlimited Tabs", desc: "Create as many tabs as you need. No limits, no premium tiers." },
                { icon: PenTool, title: "Custom Names", desc: "Rename tabs to anything you want. Organize your way." },
                { icon: Trash2, title: "Easy Management", desc: "Delete, reorder, or duplicate tabs with simple controls." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Use Tabbed Notes?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Keep meeting notes by project",
                "Separate work and personal notes",
                "Organize by topic or category",
                "Track multiple to-do lists",
                "Store code snippets by language",
                "Keep research organized",
                "Manage multiple shopping lists",
                "Journal entries by date"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">vs Other Solutions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-foreground">Feature</th>
                    <th className="py-3 px-4 text-foreground">PureText</th>
                    <th className="py-3 px-4 text-foreground">Windows Notepad</th>
                    <th className="py-3 px-4 text-foreground">Notepad++</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Tabs</td>
                    <td className="py-3 px-4 text-green-500">✓ Unlimited</td>
                    <td className="py-3 px-4 text-destructive">✗ None</td>
                    <td className="py-3 px-4 text-green-500">✓ Yes</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Cloud Sync</td>
                    <td className="py-3 px-4 text-green-500">✓ Automatic</td>
                    <td className="py-3 px-4 text-destructive">✗ No</td>
                    <td className="py-3 px-4 text-destructive">✗ No</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">No Install</td>
                    <td className="py-3 px-4 text-green-500">✓ Browser</td>
                    <td className="py-3 px-4 text-amber-500">Windows only</td>
                    <td className="py-3 px-4 text-destructive">✗ Install needed</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Encryption</td>
                    <td className="py-3 px-4 text-green-500">✓ AES-256</td>
                    <td className="py-3 px-4 text-destructive">✗ None</td>
                    <td className="py-3 px-4 text-destructive">✗ None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-primary/10 border border-indigo-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Organize Your Notes</h2>
            <p className="text-muted-foreground mb-6">Unlimited tabs. Zero friction. Start now.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Tabbed Notepad →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Free online notepad with unlimited tabs.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NotepadWithTabs;
