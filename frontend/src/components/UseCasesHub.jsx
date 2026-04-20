import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { useCasePages } from '../data/useCasePages';

const getCategory = (slug) => {
  if (slug.startsWith('encrypted-')) return 'Encrypted Use Cases';
  if (slug.startsWith('secure-')) return 'Secure Use Cases';
  if (slug.startsWith('private-')) return 'Private Use Cases';
  if (slug.includes('password')) return 'Password Use Cases';
  return 'Specialized Use Cases';
};

const UseCasesHub = () => {
  const grouped = useCasePages.reduce((acc, page) => {
    const category = getCategory(page.slug);
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

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
        <title>Secure Note Use Cases 2026 | 100+ Encrypted Templates | PureText</title>
        <meta
          name="description"
          content="Explore 100+ high-value encrypted note use cases for passwords, journals, study plans, work notes, API secrets, and private data storage on PureText."
        />
        <meta name="keywords" content="encrypted note templates, secure note use cases, password vault notes, private journal templates, puretext use cases" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.puretext.me/use-cases" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Secure Note Use Cases 2026 | 100+ Encrypted Templates | PureText" />
        <meta property="og:description" content="Discover 100+ SEO use-case pages for secure passwords, private journals, study notes, and encrypted data storage with PureText." />
        <meta property="og:url" content="https://www.puretext.me/use-cases" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secure Note Use Cases 2026 | PureText" />
        <meta name="twitter:description" content="100+ encrypted note use cases for passwords, journals, students, work, and private data." />
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
            Browse high-intent landing pages for password storage, private journaling, secure study notes, API key storage, and more.
          </p>
          <p className="text-sm text-muted-foreground mt-3">{useCasePages.length} landing pages available</p>
        </div>

        <div className="space-y-10">
          {sortedCategories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[category]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((page) => (
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
      </main>
    </div>
  );
};

export default UseCasesHub;
