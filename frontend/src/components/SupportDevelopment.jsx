import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Lock, Mail, Sparkles } from 'lucide-react';
import { submitFeedback } from '../api/feedback';

const roadmapItems = [
  'Priority indexing and content refreshes for high-intent privacy pages',
  'Advanced secure-sharing controls and one-time access handoff presets',
  'Extended developer-focused vault templates for API and token workflows',
  'Deeper private knowledge workflows with structured templates and search',
];

const SupportDevelopment = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    setError('');

    try {
      await submitFeedback({
        name: 'Privacy Tips Subscriber',
        email: email.trim(),
        type: 'newsletter',
        message: 'Please subscribe this address to privacy tips updates.',
      });
      setStatus('sent');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to submit signup request.');
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I support PureText development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can support development by sharing PureText, submitting roadmap ideas, and opting in to privacy tips updates to stay involved in new launches.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does privacy tips signup require creating an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account is required. You can submit only an email address to receive occasional privacy-focused product updates.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Support Development | Privacy Tips Signup and Roadmap | PureText</title>
        <meta
          name="description"
          content="Support PureText development, review planned pro-level privacy improvements, and sign up for privacy tips updates with a privacy-first flow."
        />
        <meta name="keywords" content="support puretext, pro features roadmap, privacy tips signup, encrypted notepad updates" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.puretext.me/support-development" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Support Development | PureText" />
        <meta property="og:description" content="Join the roadmap, share feedback, and sign up for privacy tips updates." />
        <meta property="og:url" content="https://www.puretext.me/support-development" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support Development | PureText" />
        <meta name="twitter:description" content="Support PureText and get privacy tips updates with a lightweight signup flow." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <header className="w-full py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">PureText</span>
          </Link>
          <Link to="/privacy-vault" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Privacy Vault <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            <HeartHandshake className="w-4 h-4" />
            Support Development
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Help Build the Best Private Notes Platform</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PureText stays free and privacy-first. This page centralizes roadmap visibility and a low-friction way to follow new privacy tips and releases.
          </p>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground mb-3 inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Pro Features Roadmap (Planned)
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            These are roadmap directions for deeper privacy and retention workflows while keeping the core product free.
          </p>
          <ul className="space-y-2 text-sm text-foreground">
            {roadmapItems.map((item) => (
              <li key={item} className="rounded-lg border border-border/60 bg-background px-4 py-3">{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground mb-3 inline-flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Privacy Tips Email Signup
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Get occasional updates on new secure-note workflows, privacy guides, and major feature releases.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="privacy-email" className="text-sm font-medium text-foreground block">Email address</label>
            <input
              id="privacy-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />

            {status === 'error' && <p className="text-sm text-red-500">{error}</p>}
            {status === 'sent' && <p className="text-sm text-green-500">Signup request submitted. Thanks for supporting PureText.</p>}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
            >
              {status === 'sending' ? 'Submitting...' : 'Subscribe to Privacy Tips'}
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            Signup is processed through the same feedback backend; no account creation required.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold text-foreground mb-3">Where to Explore Next</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link to="/privacy-vault" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Open Privacy Vault Hub</Link>
            <Link to="/privacy-tools" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Browse Privacy Tools</Link>
            <Link to="/use-cases?category=developer-tools" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Developer Tools Use Cases</Link>
            <Link to="/use-cases?category=personal-data" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Personal Data Vault Use Cases</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportDevelopment;
