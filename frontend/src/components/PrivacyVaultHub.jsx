import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useCasePages } from '../data/useCasePages';

const pickByTerms = (pages, terms) =>
  pages
    .filter((page) => {
      const text = `${page.slug} ${page.label} ${page.focus}`.toLowerCase();
      return terms.some((term) => text.includes(term));
    })
    .sort((a, b) => a.label.localeCompare(b.label));

const PrivacyVaultHub = () => {
  const developerPages = useMemo(
    () => pickByTerms(useCasePages, ['api', 'token', 'ssh', 'developer', 'git', 'env', 'credential']),
    []
  );
  const personalDataPages = useMemo(
    () => pickByTerms(useCasePages, ['medical', 'legal', 'tax', 'bank', 'insurance', 'digital will', 'document']),
    []
  );
  const sharingPages = useMemo(
    () => pickByTerms(useCasePages, ['sharing', 'share', 'one-time', 'temporary', 'self-destruct', 'family secure']),
    []
  );
  const opsecPages = useMemo(
    () => pickByTerms(useCasePages, ['air-gapped', 'no-trace', 'anonymous', 'burner', 'maximum-privacy', 'confidential']),
    []
  );
  const comparisonPages = useMemo(
    () => useCasePages.filter((page) => page.slug.startsWith('puretext-vs-')).sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const allLinks = [
    ...developerPages,
    ...personalDataPages,
    ...sharingPages,
    ...opsecPages,
    ...comparisonPages,
  ].filter((page, index, array) => array.findIndex((entry) => entry.slug === page.slug) === index);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PureText Privacy Vault Hub',
    itemListElement: allLinks.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.label,
      url: `https://www.puretext.me/${page.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.puretext.me/' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Vault', item: 'https://www.puretext.me/privacy-vault' },
    ],
  };

  const renderSection = (title, description, pages) => (
    <section className="rounded-2xl border border-border/60 bg-card p-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>
      <div className="grid md:grid-cols-2 gap-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            to={`/${page.slug}`}
            className="group rounded-xl border border-border/60 bg-background p-4 hover:border-primary/40 transition-colors"
          >
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{page.label}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{page.focus}</p>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Privacy Vault Hub 2026 | Zero-Knowledge Data Storage Pages | PureText</title>
        <meta
          name="description"
          content="Central Privacy Vault hub for encrypted private notes, developer secrets manager pages, personal data vaults, secure sharing, and no-trace privacy workflows."
        />
        <meta
          name="keywords"
          content="privacy vault, all secure private notes, zero knowledge data storage, best private notes 2026, developer secrets manager"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.puretext.me/privacy-vault" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Vault Hub 2026 | PureText" />
        <meta property="og:description" content="Explore the central PureText privacy vault hub with secure pages for secrets, personal data, sharing, and opsec workflows." />
        <meta property="og:url" content="https://www.puretext.me/privacy-vault" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Vault Hub 2026 | PureText" />
        <meta name="twitter:description" content="Mother page linking to developer secrets, personal data vaults, secure sharing pages, and advanced privacy use cases." />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <header className="w-full py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">PureText</span>
          </Link>
          <Link to="/" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Open Notepad <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            <ShieldCheck className="w-4 h-4" />
            Central Privacy Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">All Secure Private Notes, in One Place</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            This privacy-vault mother page clusters developer secrets, personal data protection, secure sharing, and advanced opsec pages
            so users and crawlers can discover the full PureText privacy stack.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/use-cases?category=privacy-secrets" className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm hover:border-primary/40">Privacy & Secrets</Link>
            <Link to="/use-cases?category=developer-tools" className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm hover:border-primary/40">Developer Tools</Link>
            <Link to="/use-cases?category=personal-data" className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm hover:border-primary/40">Personal Data</Link>
            <Link to="/use-cases?category=secure-sharing" className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm hover:border-primary/40">Secure Sharing</Link>
          </div>
        </section>

        {renderSection(
          'Developer Secrets and API Security',
          'Pages for secure API key manager workflows, encrypted environment variables, private SSH key records, and token vault operations.',
          developerPages
        )}

        {renderSection(
          'Personal Data Protection Vaults',
          'High-intent pages for encrypted digital will notes, private medical records vaults, legal document storage, and tax data notes.',
          personalDataPages
        )}

        {renderSection(
          'Secure Sharing and Family Collaboration',
          'Use encrypted one-time notes, temporary secure sharing pages, and family data-sharing vault templates.',
          sharingPages
        )}

        {renderSection(
          'Advanced Privacy and OpSec',
          'No-trace, anonymous, and maximum-privacy note workflows for high-sensitivity scenarios.',
          opsecPages
        )}

        {comparisonPages.length > 0 && renderSection(
          'Comparison Pages',
          'Dedicated competitor pages that help users compare private notes workflows against password managers and encrypted note apps.',
          comparisonPages
        )}

        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Need the Full Catalog?</h2>
          <p className="text-muted-foreground mb-5">Browse every encrypted landing page, filter by category, and search by exact privacy need.</p>
          <Link to="/use-cases" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Open Full Use Cases Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default PrivacyVaultHub;
