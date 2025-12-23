import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Check, X, Lock, Zap, Shield, Layers, ArrowRight } from 'lucide-react';

const PureTextVsNotionGoogleKeep = () => {
  const features = [
    { feature: "End-to-End Encryption", puretext: true, notion: false, googlekeep: false },
    { feature: "No Account Required", puretext: true, notion: false, googlekeep: false },
    { feature: "Zero-Knowledge Architecture", puretext: true, notion: false, googlekeep: false },
    { feature: "Markdown Support", puretext: true, notion: true, googlekeep: false },
    { feature: "Multiple Tabs/Notes", puretext: true, notion: true, googlekeep: true },
    { feature: "Auto-Save", puretext: true, notion: true, googlekeep: true },
    { feature: "Share Read-Only Links", puretext: true, notion: true, googlekeep: true },
    { feature: "Free Forever", puretext: true, notion: false, googlekeep: true },
    { feature: "No Data Collection", puretext: true, notion: false, googlekeep: false },
    { feature: "Works Offline", puretext: false, notion: false, googlekeep: true },
    { feature: "Mobile Apps", puretext: false, notion: true, googlekeep: true },
    { feature: "Team Collaboration", puretext: false, notion: true, googlekeep: true },
  ];

  return (
    <>
      <Helmet>
        <title>PureText vs Notion vs Google Keep - Best Private Notes App Comparison 2025</title>
        <meta name="description" content="Compare PureText, Notion, and Google Keep. Find the best note-taking app for privacy, security, and simplicity. Detailed feature comparison for encrypted notes." />
        <link rel="canonical" href="https://puretext.me/puretext-vs-notion-google-keep" />
        <meta property="og:title" content="PureText vs Notion vs Google Keep - Best Private Notes App Comparison 2025" />
        <meta property="og:description" content="Compare PureText, Notion, and Google Keep. Find the best note-taking app for privacy, security, and simplicity." />
        <meta property="og:url" content="https://puretext.me/puretext-vs-notion-google-keep" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="puretext vs notion, puretext vs google keep, encrypted notes app, private notes, secure notepad, notion alternative, google keep alternative" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </Link>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <article className="max-w-5xl mx-auto px-6 py-16">
          {/* Hero */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-3.5 h-3.5" />
              2025 Comparison Guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">
              PureText vs Notion vs Google Keep
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Which note-taking app is best for privacy, security, and simplicity? 
              Here's an honest comparison.
            </p>
          </header>

          {/* Quick Summary */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Summary</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "PureText",
                  tagline: "Privacy-First Encrypted Notes",
                  best: "Best for: Privacy-conscious users who want simplicity",
                  color: "primary"
                },
                {
                  name: "Notion",
                  tagline: "All-in-One Workspace",
                  best: "Best for: Teams who need collaboration & databases",
                  color: "muted"
                },
                {
                  name: "Google Keep",
                  tagline: "Simple Quick Notes",
                  best: "Best for: Google ecosystem users, quick notes",
                  color: "muted"
                }
              ].map((app, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border ${index === 0 ? 'bg-primary/5 border-primary/30' : 'bg-card border-border/50'}`}
                >
                  <h3 className={`font-bold text-lg mb-1 ${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {app.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{app.tagline}</p>
                  <p className="text-xs text-muted-foreground">{app.best}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">PureText</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Notion</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Google Keep</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.puretext ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.notion ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.googlekeep ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Comparison */}
          <section className="mb-16 space-y-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Comparison</h2>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">🔒 Privacy & Security</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">PureText</strong> uses AES-256-GCM encryption—the same standard used by governments and banks. 
                  All encryption happens in your browser before data is sent to our servers. We literally cannot read your notes 
                  even if we wanted to. No account required means no personal data collection.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Notion</strong> stores your data on their servers in an unencrypted format. 
                  While they use TLS for transmission, Notion employees can technically access your content. 
                  Their business model includes analyzing usage patterns for product improvements.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Google Keep</strong> is owned by Google, one of the world's largest data collectors. 
                  Your notes are stored in Google's cloud and can be used to inform advertising and AI training. 
                  Google requires an account, linking your notes to your identity.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">⚡ Simplicity & Speed</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">PureText</strong> loads in under 500ms. No sign-up, no onboarding, no learning curve. 
                  Just pick a name and start writing. Perfect for users who want a focused, distraction-free experience.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Notion</strong> has a steeper learning curve due to its powerful features. 
                  It can feel overwhelming for simple note-taking. Load times are slower due to its complexity.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Google Keep</strong> is relatively simple but still requires a Google account. 
                  It's designed for quick notes and reminders rather than long-form writing.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">💰 Pricing</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">PureText</strong>: Completely free. No premium tiers, no "upgrade to unlock" features. 
                  Everything is available to everyone.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Notion</strong>: Free tier with limitations. Personal Pro is $10/month. 
                  Team plans start at $10/user/month.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Google Keep</strong>: Free, but you pay with your data. 
                  Your notes contribute to Google's data ecosystem.
                </p>
              </div>
            </div>
          </section>

          {/* When to Use Each */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">When to Use Each</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/30">
                <h3 className="font-bold text-primary mb-2">Choose PureText if you...</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Value privacy and don't want companies reading your notes</li>
                  <li>• Want instant access without creating accounts</li>
                  <li>• Need a simple, fast, distraction-free writing experience</li>
                  <li>• Store sensitive information (passwords, personal thoughts, private notes)</li>
                  <li>• Are looking for a ProtectedText alternative</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-bold text-foreground mb-2">Choose Notion if you...</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Need team collaboration and sharing features</li>
                  <li>• Want databases, kanban boards, and wikis</li>
                  <li>• Are building a company knowledge base</li>
                  <li>• Don't mind trading privacy for features</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-bold text-foreground mb-2">Choose Google Keep if you...</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Already use Google Workspace extensively</li>
                  <li>• Need reminders and location-based notes</li>
                  <li>• Want to quickly capture ideas on mobile</li>
                  <li>• Don't have privacy concerns about Google</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-16 px-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Try Privacy-First Notes?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              PureText is free, instant, and truly private. No sign-up required.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Start Writing Now <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Related Pages */}
          <section className="mt-16 pt-16 border-t border-border/50">
            <h2 className="text-lg font-semibold text-foreground mb-6">Related Comparisons</h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/puretext-vs-protectedtext" className="text-sm text-primary hover:underline">
                PureText vs ProtectedText →
              </Link>
              <Link to="/protectedtext-alternative" className="text-sm text-primary hover:underline">
                Best ProtectedText Alternative →
              </Link>
              <Link to="/plain-text-online-editor" className="text-sm text-primary hover:underline">
                Plain Text Online Editor →
              </Link>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border/50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Lock className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">PureText</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by <span className="text-foreground">Sanjay</span> • Your data stays yours
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default PureTextVsNotionGoogleKeep;
