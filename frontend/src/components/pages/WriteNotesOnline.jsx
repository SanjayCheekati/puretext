import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, PenLine, Cloud, Shield, Zap, ArrowRight, CheckCircle2, Smartphone, Laptop } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const WriteNotesOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Write Notes Online",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "6104", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Where can I write notes online for free?", "acceptedAnswer": { "@type": "Answer", "text": "PureText.me lets you write notes online for free with no signup. Just visit the site, pick a note name, and start writing. Your notes are encrypted and accessible from any device." } },
      { "@type": "Question", "name": "Are my online notes private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText encrypts every note with AES-256 encryption in your browser. Even the server operators cannot read your notes. No account means no personal data is stored." } },
      { "@type": "Question", "name": "Can I write notes on my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. PureText works on any device with a browser — iPhone, Android, iPad, laptop, or desktop. Your notes sync automatically across all devices." } },
      { "@type": "Question", "name": "Will I lose my notes if I close the browser?", "acceptedAnswer": { "@type": "Answer", "text": "No. PureText auto-saves your notes to the cloud. Close your browser, turn off your device — your notes are safe and waiting when you come back." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Write Notes Online Free | No Signup, Encrypted | PureText 2025</title>
        <meta name="description" content="Write notes online for free — no signup, no app download. Encrypted cloud notes accessible from any device. Auto-save, markdown support, and AES-256 security." />
        <meta name="keywords" content="write notes online, online notes, free notes online, write notes free, online note taking, take notes online, notes app online, cloud notes free, write notes in browser" />
        <link rel="canonical" href="https://www.puretext.me/write-notes-online" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/write-notes-online" />
        <meta property="og:title" content="Write Notes Online Free — Encrypted & No Signup | PureText" />
        <meta property="og:description" content="Free online note-taking with encryption. No signup, auto-save, works on any device." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Write Notes Online Free | PureText" />
        <meta name="twitter:description" content="Take notes online instantly. Free, encrypted, no signup required." />
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
            <Button onClick={() => navigate('/')} size="sm">Start Writing</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <PenLine className="w-4 h-4" />
              Free • Instant • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Write Notes Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The fastest way to <strong>write notes online</strong>. No signup, no app installation. Open your browser and start taking notes in seconds — fully encrypted.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Writing Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Write Notes on PureText?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Instant Start", desc: "No registration, no email verification. Pick a name, create a note, start writing in under 3 seconds." },
                { icon: Shield, title: "Zero-Knowledge Encryption", desc: "Every word is encrypted with AES-256 before it leaves your browser. We literally cannot read your notes." },
                { icon: Cloud, title: "Cloud Sync", desc: "Your notes live in the cloud. Write on your laptop, continue on your phone. Always in sync, always encrypted." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Write Notes Online with PureText</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Writing notes online has never been easier. PureText eliminates every barrier between you and your thoughts:</p>
              <ol>
                <li><strong>Visit PureText.me</strong> — No downloads, no installation. Works in Chrome, Firefox, Safari, Edge, and any modern browser.</li>
                <li><strong>Name your note</strong> — Type something like "meeting-notes" or "my-diary" into the text box and hit Enter.</li>
                <li><strong>Write freely</strong> — A clean, distraction-free editor opens. Just type. Your notes auto-save as you write.</li>
                <li><strong>Secure with a password</strong> — Set a password to encrypt your note with AES-256 military-grade encryption.</li>
                <li><strong>Access from anywhere</strong> — Visit puretext.me/your-note-name from any device to access your encrypted notes.</li>
              </ol>
              <p>PureText is ideal for quick notes, meeting minutes, journal entries, to-do lists, code snippets, or any text you want to keep private. There's no word limit and no storage cap.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">What People Use PureText For</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Meeting notes and action items",
                "Personal journal entries",
                "Quick to-do lists",
                "Study notes and research",
                "Code snippets and documentation",
                "Travel plans and itineraries",
                "Recipes and shopping lists",
                "Brainstorming and idea capture",
                "Shared team notes",
                "Confidential work documents"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Write Notes Online?</h2>
            <p className="text-muted-foreground mb-6">Join thousands who use PureText daily. Free forever, no strings attached.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Writing Free →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/write-notes-online" />
      </div>
    </>
  );
};

export default WriteNotesOnline;
