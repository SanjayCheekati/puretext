import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Edit3, Shield, Zap, ArrowRight, CheckCircle2, Clipboard, Eraser } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const ScratchPadOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Online Scratch Pad",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "3957", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is an online scratch pad?", "acceptedAnswer": { "@type": "Answer", "text": "An online scratch pad is a simple web-based text area where you can quickly type, paste, and edit text without creating an account. PureText is a free scratch pad with the added benefit of AES-256 encryption." } },
      { "@type": "Question", "name": "Is the scratch pad free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, PureText is 100% free. No premium plans, no ads, no hidden costs. Use it as much as you want." } },
      { "@type": "Question", "name": "Can I save what I write in the scratch pad?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Unlike basic scratch pads, PureText auto-saves your content to the cloud. Name your note and access it anytime from any device." } },
      { "@type": "Question", "name": "Is the scratch pad private?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Set a password and your scratch pad content is encrypted with AES-256. No one — not even us — can read it." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Scratch Pad Online | Free Online Scratchpad | PureText 2025</title>
        <meta name="description" content="Free online scratch pad — write, paste, and edit text instantly. No signup, no downloads. Auto-saving encrypted scratchpad that works on any device. Start typing now." />
        <meta name="keywords" content="scratch pad online, online scratchpad, free scratch pad, web scratch pad, digital scratch pad, online text scratch pad, quick scratch pad, browser scratchpad" />
        <link rel="canonical" href="https://www.puretext.me/scratch-pad-online" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/scratch-pad-online" />
        <meta property="og:title" content="Free Scratch Pad Online | Instant Scratchpad | PureText" />
        <meta property="og:description" content="Free online scratch pad. Write and paste text instantly — encrypted, no signup." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scratch Pad Online | PureText" />
        <meta name="twitter:description" content="Instant online scratch pad. Free, encrypted, no signup required." />
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
            <Button onClick={() => navigate('/')} size="sm">Open Scratch Pad</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-6">
              <Edit3 className="w-4 h-4" />
              Quick • Clean • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Scratch Pad Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your <strong>online scratch pad</strong> — instantly ready. Paste text, jot down thoughts, edit content. No signup, no downloads, no clutter. Just a clean writing space.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Scratch Pad <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Your Digital Scratch Pad</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Clipboard, title: "Paste & Clean", desc: "Paste text from anywhere and strip formatting. PureText gives you clean, plain text every time." },
                { icon: Zap, title: "Zero Friction", desc: "No accounts, no logins, no app installs. Just a URL and a clean text area — ready in seconds." },
                { icon: Shield, title: "Optionally Secure", desc: "Set a password for AES-256 encryption, or leave it open. Your scratch pad, your rules." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Use an Online Scratch Pad?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Every developer, writer, student, and professional needs a <strong>scratch pad</strong> — a quick, no-nonsense place to dump text. Here's why PureText is the best one:</p>
              <ul>
                <li><strong>Clipboard bridge</strong> — Paste formatted text and get clean, plain text. Perfect for moving content between apps.</li>
                <li><strong>Idea dump</strong> — Your brain moves faster than your filing system. Dump thoughts now, organize later.</li>
                <li><strong>Cross-device clipboard</strong> — Copy text on your computer, paste on your phone. Use PureText as a bridge between devices.</li>
                <li><strong>Draft workspace</strong> — Write emails, messages, or posts before sending. No distractions, no formatting headaches.</li>
                <li><strong>Code testing</strong> — Quickly paste code snippets, review them, edit them, share them. PureText supports monospace rendering.</li>
              </ul>
              <p>Unlike sticky notes or desktop Notepad, PureText's scratch pad is always accessible from any device and optionally encrypted. It's the modern scratch pad for a connected world.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">What People Use the Scratch Pad For</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Pasting and cleaning formatted text",
                "Quick idea capture and brainstorming",
                "Transferring text between devices",
                "Drafting emails and messages",
                "Temporary code snippet storage",
                "Meeting notes and action items",
                "URL and link collection",
                "Quick calculations and planning"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Need a Quick Scratch Pad?</h2>
            <p className="text-muted-foreground mb-6">Open PureText and start typing. Free, encrypted, no strings attached.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Scratch Pad →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/scratch-pad-online" />
      </div>
    </>
  );
};

export default ScratchPadOnline;
