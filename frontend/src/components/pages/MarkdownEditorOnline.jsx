import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Code, Eye, Shield, ArrowRight, CheckCircle2, FileText, Hash } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const MarkdownEditorOnline = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Markdown Editor Online",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "4218", "bestRating": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Does PureText support Markdown?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PureText has a built-in markdown editor with live preview. Write in markdown syntax and toggle preview to see the rendered output instantly." } },
      { "@type": "Question", "name": "What markdown features are supported?", "acceptedAnswer": { "@type": "Answer", "text": "PureText supports headings, bold, italic, strikethrough, links, images, code blocks, inline code, lists (ordered/unordered), blockquotes, tables, and task lists via GitHub Flavored Markdown (GFM)." } },
      { "@type": "Question", "name": "Is the markdown editor free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free. No signup, no premium plans. Write and preview markdown as much as you want." } },
      { "@type": "Question", "name": "Can I share markdown documents?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Share your note URL with others. They can view the rendered markdown via the read-only share link, or you can generate a QR code." } },
      { "@type": "Question", "name": "Is my markdown content encrypted?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Like all PureText notes, markdown documents are encrypted with AES-256 when you set a password. Your content is private by default." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Markdown Editor Online | Free, Encrypted, Live Preview | PureText 2025</title>
        <meta name="description" content="Free online markdown editor with live preview and AES-256 encryption. Write markdown, preview instantly, save securely. No signup needed. Supports GFM, code blocks, tables." />
        <meta name="keywords" content="markdown editor online, online markdown editor, free markdown editor, markdown editor, markdown preview online, markdown writer, GFM editor, markdown to html, write markdown online" />
        <link rel="canonical" href="https://www.puretext.me/markdown-editor-online" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.puretext.me/markdown-editor-online" />
        <meta property="og:title" content="Free Markdown Editor Online | Live Preview, Encrypted | PureText" />
        <meta property="og:description" content="Write and preview markdown online for free. Encrypted, no signup, GFM support." />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Markdown Editor Online | PureText" />
        <meta name="twitter:description" content="Write markdown with live preview. Free, encrypted, no signup required." />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
              <Hash className="w-4 h-4" />
              Markdown • Live Preview • Encrypted
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Markdown Editor Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A <strong>free markdown editor</strong> with live preview and AES-256 encryption. Write GitHub-flavored markdown, preview instantly, and keep everything private. No signup.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Open Markdown Editor <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Markdown Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Eye, title: "Live Preview", desc: "Toggle between editor and preview with one click. See your rendered markdown instantly as you write." },
                { icon: Code, title: "GitHub Flavored", desc: "Full GFM support: tables, task lists, strikethrough, code blocks with syntax highlighting." },
                { icon: Shield, title: "Encrypted Storage", desc: "Your markdown documents are encrypted with AES-256. Set a password for full privacy." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Supported Markdown Syntax</h2>
            <div className="p-6 rounded-xl bg-card border border-border font-mono text-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 font-sans">Basic Formatting</h3>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`# Heading 1
## Heading 2
### Heading 3
**Bold text**
*Italic text*
~~Strikethrough~~
[Link text](url)
![Image alt](url)`}</pre>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 font-sans">Advanced</h3>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`- Unordered list
1. Ordered list
- [ ] Task list
- [x] Done task
> Blockquote
\`inline code\`
| Table | Header |
| ----- | ------ |`}</pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Use PureText for Markdown?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Most <strong>online markdown editors</strong> require accounts, show ads, or don't save your work. PureText is different:</p>
              <ul>
                <li><strong>No signup required</strong> — Start writing markdown immediately. No email verification, no profile setup.</li>
                <li><strong>Encrypted by default</strong> — Your markdown docs are as private as your passwords. AES-256 encryption in the browser.</li>
                <li><strong>Cloud sync</strong> — Write on your laptop, preview on your phone. Same URL, same content, always in sync.</li>
                <li><strong>GFM out of the box</strong> — Full GitHub Flavored Markdown support including tables, task lists, and code blocks.</li>
                <li><strong>Shareable</strong> — Share your rendered markdown via a read-only link or QR code.</li>
              </ul>
              <p>PureText is ideal for README drafting, technical documentation, blog post writing, and any markdown task that needs privacy.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Use Cases for Markdown Editor</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Draft GitHub README files",
                "Write technical documentation",
                "Format blog posts",
                "Create task lists and to-dos",
                "Write meeting notes with structure",
                "Draft academic papers",
                "Create formatted emails",
                "Store code documentation"
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Write Markdown — Encrypted & Free</h2>
            <p className="text-muted-foreground mb-6">The most private markdown editor on the web. No signup, no tracking.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open Markdown Editor →</Button>
          </section>
        </main>

        <RelatedPages currentPath="/markdown-editor-online" />
      </div>
    </>
  );
};

export default MarkdownEditorOnline;
