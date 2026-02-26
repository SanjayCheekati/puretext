import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, Monitor, Shield, ArrowRight, CheckCircle2, Cloud, Wifi } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const DigitalNotepad = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Digital Notepad",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "6842", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is a digital notepad?", "acceptedAnswer": { "@type": "Answer", "text": "A digital notepad is a web-based text editor that replaces physical notepads. PureText is a free digital notepad that stores your notes in the cloud with AES-256 encryption — accessible from any device." } },
      { "@type": "Question", "name": "Is PureText free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, PureText is completely free with no premium plans, no ads, and no hidden charges. All features including encryption are available at no cost." } },
      { "@type": "Question", "name": "Can I use PureText on my phone and computer?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. PureText works on any device with a web browser — phones, tablets, laptops, and desktops. Your notes sync automatically across all devices." } },
      { "@type": "Question", "name": "How is a digital notepad different from a paper notepad?", "acceptedAnswer": { "@type": "Answer", "text": "A digital notepad offers searchability, unlimited space, cloud sync across devices, auto-save, encryption for privacy, and you'll never run out of pages or lose your notes." } },
      { "@type": "Question", "name": "Do I need to install an app?", "acceptedAnswer": { "@type": "Answer", "text": "No. PureText runs entirely in your web browser. No downloads, no installations — just visit puretext.me and start writing." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Digital Notepad Online | Free Cloud Notepad | PureText 2025</title>
        <meta name="description" content="Free digital notepad that replaces paper. Write notes online from any device — encrypted, auto-saving, no signup. PureText is your digital notepad in the cloud." />
        <meta name="keywords" content="digital notepad, digital notepad online, online digital notepad, free digital notepad, cloud notepad, digital notes, electronic notepad, web notepad, digital note taking" />
        <link rel="canonical" href="https://www.puretext.me/digital-notepad" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/digital-notepad" />
        <meta property="og:title" content="Free Digital Notepad | Cloud Notes Any Device | PureText" />
        <meta property="og:description" content="Replace paper with a free encrypted digital notepad. Works on any device, no signup." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Notepad Online | PureText" />
        <meta name="twitter:description" content="Free digital notepad — encrypted notes in the cloud. No signup, any device." />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6">
              <Monitor className="w-4 h-4" />
              Digital • Cloud-Synced • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Digital Notepad
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your <strong>digital notepad</strong> in the cloud. Replace paper with a free, encrypted, always-accessible notepad that works on every device. No signup required.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Your Notepad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Go Digital?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Cloud, title: "Always Accessible", desc: "Your notes live in the cloud. Access them from your phone, tablet, or computer — anywhere, anytime." },
                { icon: Shield, title: "Private & Secure", desc: "AES-256 encryption keeps your notes private. Password-protect any note for military-grade security." },
                { icon: Wifi, title: "Auto-Sync & Save", desc: "Notes save automatically as you type. Never lose a thought, even if your device dies or battery runs out." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Digital Notepad vs Paper Notepad</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-primary">PureText (Digital)</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Paper Notepad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Unlimited pages", "✅", "❌"],
                    ["Searchable content", "✅", "❌"],
                    ["Access from any device", "✅", "❌"],
                    ["Auto-save", "✅", "❌"],
                    ["Encrypted & private", "✅", "❌"],
                    ["Share via link", "✅", "❌"],
                    ["Never runs out", "✅", "❌"],
                    ["Environmental impact", "✅ None", "❌ Paper waste"],
                  ].map(([feature, digital, paper], i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-4 text-foreground">{feature}</td>
                      <td className="text-center p-4">{digital}</td>
                      <td className="text-center p-4">{paper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">How PureText's Digital Notepad Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>PureText is the simplest <strong>digital notepad</strong> you'll ever use. There are no accounts to create, no apps to download, and no subscriptions to manage. Here's how it works:</p>
              <ol>
                <li><strong>Choose a note name</strong> — Type any name (like "grocery-list" or "work-ideas") and press Enter.</li>
                <li><strong>Write your notes</strong> — A clean editor opens. Type, paste, or use markdown. Content auto-saves.</li>
                <li><strong>Set a password (optional)</strong> — Encrypt your notes with AES-256. Only you can read them.</li>
                <li><strong>Access from anywhere</strong> — Visit puretext.me/your-note-name from any device. Your notepad travels with you.</li>
              </ol>
              <p>PureText replaces the paper notepad on your desk with a cloud-synced, encrypted, infinitely reusable digital alternative. It's better for your productivity, your privacy, and the environment.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Digital Notepad Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Clean, distraction-free writing",
                "Markdown formatting support",
                "AES-256 password encryption",
                "Auto-save as you type",
                "Dark mode for night writing",
                "Works on phone, tablet, desktop",
                "QR code sharing",
                "No account or signup needed",
                "Unlimited notes and length",
                "100% free, no premium tier"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Go Digital Today</h2>
            <p className="text-muted-foreground mb-6">Replace paper forever. Free, encrypted, always accessible.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Digital Notepad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/digital-notepad" />
      </div>
    </>
  );
};

export default DigitalNotepad;
