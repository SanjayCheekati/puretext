import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, BookOpen, Heart, Shield, ArrowRight, CheckCircle2, Key, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const PrivateJournalOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Private Journal Online",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "5471", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is my online journal truly private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText encrypts your journal entries with AES-256 in your browser before they leave your device. No one — not even us — can read your journal. It's mathematically impossible without your password." } },
      { "@type": "Question", "name": "Do I need to create an account for the journal?", "acceptedAnswer": { "@type": "Answer", "text": "No. PureText requires no signup, no email, no personal information. Pick a secret journal name, set a password, and start writing. Complete anonymity." } },
      { "@type": "Question", "name": "Can I journal from my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText works on any device with a browser. Write in your journal from your phone in bed, from your laptop at a café, or from your tablet on the couch." } },
      { "@type": "Question", "name": "What if I forget my journal password?", "acceptedAnswer": { "@type": "Answer", "text": "Due to our zero-knowledge encryption, we cannot recover your password or journal entries. This is the trade-off for genuine privacy. Choose a memorable password and keep it safe." } },
      { "@type": "Question", "name": "How is this different from a diary app?", "acceptedAnswer": { "@type": "Answer", "text": "Most diary apps require accounts (linking your identity) and store data unencrypted. PureText is completely anonymous — no account, no tracking — and your entries are encrypted end-to-end." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Private Journal Online | Encrypted Diary No Signup | PureText 2025</title>
        <meta name="description" content="Keep a private journal online with AES-256 encryption. No signup, no tracking, no ads. Write your most personal thoughts with military-grade security. Free forever." />
        <meta name="keywords" content="private journal online, online journal, private journal, encrypted journal, personal journal online, secret journal, online diary private, digital journal encrypted, anonymous journal" />
        <link rel="canonical" href="https://www.puretext.me/private-journal-online" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/private-journal-online" />
        <meta property="og:title" content="Private Journal Online | Encrypted, Anonymous | PureText" />
        <meta property="og:description" content="Keep an encrypted private journal online. No signup, no tracking, free forever." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Journal Online | PureText" />
        <meta name="twitter:description" content="Encrypted private journal — write your thoughts freely. No signup, no tracking." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
            <Button onClick={() => navigate('/')} size="sm">Start Journal</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Private • Encrypted • Anonymous
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Private Journal Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your <strong>private journal</strong> — encrypted with military-grade AES-256. Write your most personal thoughts without fear. No account, no tracking, no one can read it but you.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Your Journal <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Journal on PureText?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Key, title: "True Zero-Knowledge", desc: "Your journal is encrypted in your browser. Even if our servers were seized, no one could read a single word." },
                { icon: Eye, title: "Complete Anonymity", desc: "No signup = no name, no email, no identity attached to your journal. Write without any digital trail." },
                { icon: Heart, title: "Write Freely", desc: "When you know nobody can read it, you write honestly. Process emotions, track growth, dream big." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Start Your Private Journal</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Starting a <strong>private journal online</strong> takes less than 30 seconds:</p>
              <ol>
                <li><strong>Choose a secret name</strong> — Pick a URL only you would know (like "my-secret-diary-2025" or something more creative). Don't use your real name.</li>
                <li><strong>Set a strong password</strong> — This encrypts your journal with AES-256. Use something memorable but unguessable.</li>
                <li><strong>Start writing</strong> — Pour out your thoughts. Everything auto-saves and encrypts in real-time.</li>
                <li><strong>Come back anytime</strong> — Visit puretext.me/your-secret-name, enter your password, and continue journaling.</li>
              </ol>
              <p>Unlike diary apps that ask for your email, phone number, and permission to access your contacts, PureText knows nothing about you. Your journal is as private as a physical diary locked in a safe — but accessible from anywhere in the world.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Benefits of Private Journaling</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Process emotions and reduce stress",
                "Track personal growth over time",
                "Improve self-awareness and clarity",
                "Document important life moments",
                "Work through difficult decisions",
                "Practice gratitude daily",
                "Set and review personal goals",
                "Develop your writing skills",
                "Create a private historical record",
                "Mental health and therapy support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border" open={i === 0}>
                  <summary className="font-semibold text-foreground cursor-pointer">{faq.name}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start Your Private Journal Today</h2>
            <p className="text-muted-foreground mb-6">No signup. No tracking. Just you and your encrypted thoughts.</p>
            <Button size="lg" onClick={() => navigate('/')}>Begin Journaling →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/private-journal-online" />
      </div>
    </>
  );
};

export default PrivateJournalOnline;
