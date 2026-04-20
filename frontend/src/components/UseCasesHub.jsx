import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, Search, Sparkles } from 'lucide-react';
import { useCasePages } from '../data/useCasePages';

const CATEGORY_ORDER = [
  'Privacy & Secrets',
  'Developer Tools',
  'Personal Data',
  'Secure Sharing',
  'Advanced OpSec',
  'Comparisons',
  'Password Security',
  'General Use Cases',
];

const CATEGORY_QUERY_MAP = {
  'privacy-secrets': 'Privacy & Secrets',
  'developer-tools': 'Developer Tools',
  'personal-data': 'Personal Data',
  'secure-sharing': 'Secure Sharing',
  'advanced-opsec': 'Advanced OpSec',
  'comparisons': 'Comparisons',
};

const hasAny = (text, values) => values.some((value) => text.includes(value));

const inferCategory = (page) => {
  if (page.category) return page.category;

  const text = `${page.slug} ${page.label} ${page.focus}`.toLowerCase();

  if (hasAny(text, ['air-gapped', 'no-trace', 'burner', 'opsec', 'maximum-privacy'])) return 'Advanced OpSec';
  if (hasAny(text, ['api', 'token', 'ssh', 'developer', 'git', 'env', 'credentials', 'code snippet', 'prompt'])) return 'Developer Tools';
  if (hasAny(text, ['medical', 'insurance', 'tax', 'bank', 'legal', 'digital will', 'health'])) return 'Personal Data';
  if (hasAny(text, ['share', 'sharing', 'one-time', 'temporary', 'self-destruct'])) return 'Secure Sharing';
  if (page.slug.startsWith('puretext-vs-') || hasAny(text, ['comparison', 'alternative'])) return 'Comparisons';
  if (hasAny(text, ['password', 'vault', 'seed phrase'])) return 'Password Security';
  if (hasAny(text, ['private', 'secret', 'privacy', 'anonymous', 'zero-knowledge', 'confidential'])) return 'Privacy & Secrets';

  return 'General Use Cases';
};

const categoryOrderIndex = (category) => {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
};

const UseCasesHub = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('q') || '');
    const categoryParam = params.get('category');
    setActiveCategory(CATEGORY_QUERY_MAP[categoryParam] || 'all');
  }, [location.search]);

  const enrichedPages = useMemo(
    () => useCasePages.map((page) => ({ ...page, resolvedCategory: inferCategory(page) })),
    []
  );

  const availableCategories = useMemo(() => {
    const categorySet = new Set(enrichedPages.map((page) => page.resolvedCategory));
    return Array.from(categorySet).sort((a, b) => categoryOrderIndex(a) - categoryOrderIndex(b) || a.localeCompare(b));
  }, [enrichedPages]);

  const filteredPages = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return enrichedPages
      .filter((page) => {
        const categoryMatches = activeCategory === 'all' || page.resolvedCategory === activeCategory;
        if (!categoryMatches) return false;

        if (!normalizedSearch) return true;

        const haystack = `${page.slug} ${page.label} ${page.focus} ${page.keywords}`.toLowerCase();
        return haystack.includes(normalizedSearch);
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [enrichedPages, activeCategory, searchTerm]);

  const grouped = useMemo(
    () =>
      filteredPages.reduce((acc, page) => {
        const category = page.resolvedCategory;
        if (!acc[category]) acc[category] = [];
        acc[category].push(page);
        return acc;
      }, {}),
    [filteredPages]
  );

  const sortedCategories = useMemo(
    () => Object.keys(grouped).sort((a, b) => categoryOrderIndex(a) - categoryOrderIndex(b) || a.localeCompare(b)),
    [grouped]
  );

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PureText Use Case Pages',
    itemListElement: useCasePages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.label,
      url: `https://www.puretext.me/${page.slug}`,
    })),
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Secure Note Use Cases 2026 | Privacy, Developer, and Personal Data Vaults | PureText</title>
        <meta
          name="description"
          content="Explore high-intent encrypted use cases by category: Privacy & Secrets, Developer Tools, Personal Data, Secure Sharing, and Advanced OpSec."
        />
        <meta name="keywords" content="encrypted note templates, privacy vault pages, developer secrets manager, private medical vault, secure sharing notes, puretext use cases" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.puretext.me/use-cases" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Secure Note Use Cases 2026 | Privacy, Developer, and Personal Data Vaults" />
        <meta property="og:description" content="Find private vault pages fast with category filters and search across developer secrets, personal data, sharing, and privacy workflows." />
        <meta property="og:url" content="https://www.puretext.me/use-cases" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secure Note Use Cases 2026 | PureText" />
        <meta name="twitter:description" content="Search and browse encrypted use cases across privacy, developer secrets, and personal data vault workflows." />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Encrypted Use Cases for PureText</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse high-intent landing pages for password storage, developer secrets, private medical records, secure sharing, and advanced privacy workflows.
          </p>
          <p className="text-sm text-muted-foreground mt-3">{useCasePages.length} landing pages available</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/privacy-vault" className="rounded-xl border border-primary/20 bg-primary/5 p-4 hover:border-primary/40 transition-colors">
            <p className="text-sm font-semibold text-foreground mb-1">Central Privacy Hub</p>
            <p className="text-sm text-muted-foreground">Open the mother page for private vault, API, and secret-note clusters.</p>
          </Link>
          <Link to="/privacy-tools" className="rounded-xl border border-border/60 bg-card p-4 hover:border-primary/30 transition-colors">
            <p className="text-sm font-semibold text-foreground mb-1">Privacy Tools</p>
            <p className="text-sm text-muted-foreground">Recommended VPN, browser, and password tool stack for stronger privacy.</p>
          </Link>
          <Link to="/support-development" className="rounded-xl border border-border/60 bg-card p-4 hover:border-primary/30 transition-colors">
            <p className="text-sm font-semibold text-foreground mb-1">Support Development</p>
            <p className="text-sm text-muted-foreground">Roadmap, privacy-first email tips signup, and support options.</p>
          </Link>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5 mb-8">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search vault pages (e.g. secure api key manager, tax document notes, one-time notes)"
              className="w-full h-11 rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              All Categories
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Showing {filteredPages.length} result{filteredPages.length === 1 ? '' : 's'}
          </div>
        </div>

        {sortedCategories.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-border/60 bg-card">
            <h2 className="text-2xl font-semibold text-foreground mb-2">No matching vault pages</h2>
            <p className="text-muted-foreground mb-6">Try a different keyword or switch back to all categories.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((category) => (
              <section key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[category].map((page) => (
                    <Link
                      key={page.slug}
                      to={`/${page.slug}`}
                      className="group rounded-xl bg-card border border-border/50 p-5 hover:border-primary/40 transition-colors"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{page.label}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{page.focus}</p>
                      <span className="text-xs text-primary inline-flex items-center gap-1">
                        Open page <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UseCasesHub;
