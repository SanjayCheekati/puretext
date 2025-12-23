import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Users, Zap, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const PrivateNotepad = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Private Notepad Online | Anonymous Notes No Login | PureText</title>
        <meta name="description" content="Private notepad online - take anonymous notes without login or signup. No tracking, no cookies, no data collection. The most private way to write notes on the internet." />
        <meta name="keywords" content="private notepad, anonymous notes, notepad no login, private notes online, anonymous notepad, no signup notepad, private text editor, untraceable notes, incognito notepad" />
        <link rel="canonical" href="https://www.puretext.me/private-notepad" />
        <meta property="og:title" content="Private Notepad Online | Anonymous Notes No Login" />
        <meta property="og:description" content="Take anonymous notes without login. No tracking, no cookies. The most private notepad online." />
        <meta property="og:url" content="https://www.puretext.me/private-notepad" />
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
            <Button onClick={() => navigate('/')} size="sm">Use Now</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Zero Tracking • Zero Cookies
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Private Notepad Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The most <strong>private notepad</strong> on the internet. No login, no signup, no tracking. 
              Just you and your notes. Completely anonymous.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8 py-6">
              Open Private Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What Makes It Private?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "No Account Needed", desc: "Zero personal information required. No email, no phone, no name. True anonymity." },
                { icon: Eye, title: "No Tracking", desc: "We don't use Google Analytics, Facebook Pixel, or any tracking scripts. Your visit is invisible." },
                { icon: Shield, title: "No Cookies", desc: "No tracking cookies. Only a theme preference stored locally on your device." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Comparison</h2>
            <div className="space-y-4">
              {[
                { name: "Google Keep", issues: ["Requires Google account", "Data mined for ads", "Full activity tracking"] },
                { name: "Notion", issues: ["Email required", "Tracks page views", "Data stored unencrypted"] },
                { name: "Evernote", issues: ["Account mandatory", "Employees can read notes", "Heavy tracking"] },
                { name: "PureText", good: ["No account", "Zero tracking", "End-to-end encrypted", "No cookies"] },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Who Needs a Private Notepad?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Journalists protecting sources",
                "Whistleblowers documenting evidence",
                "Privacy-conscious individuals",
                "People in restrictive countries",
                "Anyone avoiding corporate surveillance",
                "Writers wanting true privacy",
                "Students keeping personal journals",
                "Professionals with confidential info"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Matters</h2>
            <p className="text-muted-foreground mb-6">Start using the internet's most private notepad. No compromises.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Private Notepad →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Private notepad with zero tracking.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivateNotepad;
