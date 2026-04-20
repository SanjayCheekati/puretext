import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Lock, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import RelatedPages from '../RelatedPages';

const buildFaq = (page) => [
  {
    q: `What is ${page.label.toLowerCase()} in PureText?`,
    a: `${page.label} in PureText lets you organize this use case with encrypted notes, tabs, markdown formatting, and autosave. Everything is encrypted client-side before sync.`
  },
  {
    q: 'Is this page free to use?',
    a: 'Yes. PureText is free and does not require signup. You can create a note instantly and protect it with your own password.'
  },
  {
    q: 'Can PureText read my notes?',
    a: 'No. PureText uses zero-knowledge architecture with client-side encryption, so servers store encrypted data only.'
  },
  {
    q: 'Can I access these notes on phone and desktop?',
    a: 'Yes. Notes are available from any modern browser on desktop, mobile, or tablet using your note URL and password.'
  },
  {
    q: 'Can I set notes to expire?',
    a: 'Yes. You can use self-destruct timers for temporary notes so sensitive information is automatically removed after the configured time.'
  },
];

const UseCaseLandingPage = ({ page }) => {
  const navigate = useNavigate();

  if (!page) {
    return null;
  }

  const faqItems = buildFaq(page);
  const templateItems = page.template.split('|').filter(Boolean);
  const canonical = `https://www.puretext.me/${page.slug}`;
  const metaDescription = `${page.focus} PureText (puretext.me) provides AES-256-GCM client-side encryption, zero-knowledge privacy, no signup access, and secure autosave.`;

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `PureText - ${page.label}`,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Any',
    url: canonical,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '4200', bestRating: '5' },
    description: metaDescription,
    featureList: [
      'AES-256-GCM client-side encryption',
      'Zero-knowledge architecture',
      'No signup required',
      'Multiple tabs',
      'Markdown support',
      'Rich text editor',
      'Auto-save',
      'Cloud sync',
      'Self-destructing notes',
      'Mobile responsive',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.puretext.me/' },
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: 'https://www.puretext.me/use-cases' },
      { '@type': 'ListItem', position: 3, name: page.label, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${page.keywords}, best encrypted notepad, secure private notes, puretext.me`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen gradient-bg">
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </Link>
            <Button onClick={() => navigate('/')} size="sm">Open Notepad</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Encrypted Use Case Page
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {page.label} with PureText
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {page.focus}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8 py-6">
                Start Secure Notes <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/use-cases')} className="text-lg px-8 py-6">
                Browse All Use Cases
              </Button>
            </div>
          </div>

          <section className="mb-12 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Why This Works Well in PureText
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'AES-256-GCM client-side encryption for private storage',
                'Zero-knowledge design so server cannot read your content',
                'No signup or account friction to start instantly',
                'Tabs and markdown for organized workflows',
                'Auto-save and cloud sync across devices',
                'Self-destruct timers for temporary information',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Copy-Ready Template
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use this starter structure in your note for faster setup and better organization.
            </p>
            <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
              <ul className="space-y-2">
                {templateItems.map((item, index) => (
                  <li key={index} className="text-sm text-foreground font-mono">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="p-4 rounded-lg bg-card border border-border">
                  <summary className="font-semibold text-foreground cursor-pointer">{item.q}</summary>
                  <p className="text-muted-foreground mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Secure Notes, Instantly</h2>
            <p className="text-muted-foreground mb-6">Open a note in seconds and protect it with your own encryption password.</p>
            <Button size="lg" onClick={() => navigate('/')}>Open PureText - Free</Button>
          </section>
        </main>

        <RelatedPages currentPath={`/${page.slug}`} />
      </div>
    </>
  );
};

export default UseCaseLandingPage;
