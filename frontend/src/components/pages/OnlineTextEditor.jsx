import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Type, Zap, Shield, Globe, ArrowRight, CheckCircle2, FileText, Edit3 } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const OnlineTextEditor = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Free Online Text Editor",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "7821", "bestRating": "5" },
    "description": "Free online text editor with encryption. Write, edit, and save text online with AES-256 security."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this online text editor completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, PureText is 100% free with no premium tiers, hidden costs, or ads. All features including encryption are available at no charge." } },
      { "@type": "Question", "name": "Do I need to create an account to use the text editor?", "acceptedAnswer": { "@type": "Answer", "text": "No account or signup is required. Simply visit puretext.me, type a note name, and start editing immediately." } },
      { "@type": "Question", "name": "Can I access my text from different devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your text is saved in the cloud. Access it from any device by visiting the same URL and entering your password." } },
      { "@type": "Question", "name": "Is my text stored securely?", "acceptedAnswer": { "@type": "Answer", "text": "All text is encrypted with AES-256 in your browser before being stored. Even our servers can never read your content." } },
      { "@type": "Question", "name": "What makes PureText different from Google Docs or Notepad?", "acceptedAnswer": { "@type": "Answer", "text": "Unlike Google Docs, PureText doesn't require an account, doesn't track you, and encrypts everything. Unlike desktop Notepad, it syncs across devices." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Online Text Editor Free | No Signup, Encrypted | PureText 2025</title>
        <meta name="description" content="Free online text editor with AES-256 encryption. No signup, no downloads. Write, edit, and save text securely from any browser. Works on desktop, mobile, and tablet." />
        <meta name="keywords" content="online text editor, free text editor, text editor online, web text editor, browser text editor, online text editor no signup, encrypted text editor, simple online editor" />
        <link rel="canonical" href="https://www.puretext.me/online-text-editor" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/online-text-editor" />
        <meta property="og:title" content="Free Online Text Editor — No Signup, Encrypted | PureText" />
        <meta property="og:description" content="Write and edit text online for free. AES-256 encryption, no signup, works on any device." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Text Editor — Encrypted | PureText" />
        <meta name="twitter:description" content="Encrypted online text editor. No signup, no tracking. Start writing instantly." />
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
            <Button onClick={() => navigate('/')} size="sm">Open Editor</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Type className="w-4 h-4" />
              Free • No Signup • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Online Text Editor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A <strong>free online text editor</strong> that keeps your work secure with military-grade encryption. No downloads, no accounts — just open and start typing.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Editing Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Choose PureText as Your Online Text Editor?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Instant Access", desc: "No signup or downloads. Open PureText in any browser and start editing in under 2 seconds." },
                { icon: Shield, title: "AES-256 Encryption", desc: "Every character you type is encrypted with military-grade security before leaving your browser." },
                { icon: Globe, title: "Access Anywhere", desc: "Your text syncs to the cloud. Edit from desktop, phone, or tablet — your work follows you." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">How the Online Text Editor Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>PureText is the simplest <strong>online text editor</strong> you'll ever use. There's no registration process, no email verification, and no personal information collected. Here's how it works:</p>
              <ol>
                <li><strong>Choose a name</strong> — Type any name (like "my-project-notes") on the homepage</li>
                <li><strong>Start editing</strong> — A clean, distraction-free text editor opens immediately</li>
                <li><strong>Set a password</strong> — Your content is encrypted with AES-256 using your chosen password</li>
                <li><strong>Access anywhere</strong> — Visit the same URL from any device, enter your password, and continue editing</li>
              </ol>
              <p>Unlike Google Docs or Microsoft Word Online, PureText doesn't require an account and never tracks your activity. Your text is encrypted end-to-end — even our servers can't read what you write. This makes PureText the most private <strong>text editor online</strong> available today.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Online Text Editor Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Clean, distraction-free interface",
                "AES-256 end-to-end encryption",
                "Markdown support with preview",
                "Auto-save — never lose your work",
                "Dark mode for comfortable editing",
                "Works offline after first load",
                "QR code sharing for notes",
                "No file size limits",
                "Cross-device cloud sync",
                "Zero tracking, zero cookies"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">PureText vs Other Online Text Editors</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-primary">PureText</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Google Docs</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Notepad++</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["No signup required", "✅", "❌", "✅"],
                    ["End-to-end encryption", "✅", "❌", "❌"],
                    ["Works in browser", "✅", "✅", "❌"],
                    ["Cloud sync", "✅", "✅", "❌"],
                    ["Zero tracking", "✅", "❌", "✅"],
                    ["100% free", "✅", "✅", "✅"],
                    ["Mobile friendly", "✅", "✅", "❌"],
                  ].map(([feature, ...vals], i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-4 text-foreground">{feature}</td>
                      {vals.map((v, j) => <td key={j} className="text-center p-4">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="p-4 rounded-lg bg-card border border-border group" open={i === 0}>
                  <summary className="font-semibold text-foreground cursor-pointer">{faq.name}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start Editing Text Online — Free</h2>
            <p className="text-muted-foreground mb-6">No signup. No downloads. Just a clean, secure text editor.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Text Editor →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/online-text-editor" />
      </div>
    </>
  );
};

export default OnlineTextEditor;
