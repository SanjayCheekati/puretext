import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';
import blogPosts from '../data/blogPosts';

const CATEGORY_COLORS = {
  Guide: 'bg-blue-500/10 text-blue-400',
  Security: 'bg-red-500/10 text-red-400',
  Privacy: 'bg-green-500/10 text-green-400',
  Education: 'bg-purple-500/10 text-purple-400',
  Productivity: 'bg-yellow-500/10 text-yellow-400',
  Comparison: 'bg-orange-500/10 text-orange-400',
};

const BlogList = () => {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredPost = sortedPosts[0];
  const restPosts = sortedPosts.slice(1);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "PureText Blog",
    "description": "PureText blog covering encrypted note-taking, privacy, ProtectedText alternatives, and zero-knowledge security best practices.",
    "url": "https://www.puretext.me/blog",
    "publisher": {
      "@type": "Organization",
      "name": "PureText",
      "url": "https://www.puretext.me"
    },
    "blogPost": sortedPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author },
      "url": `https://www.puretext.me/blog/${post.slug}`
    }))
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "PureText Blog Articles",
    "itemListElement": sortedPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.puretext.me/blog/${post.slug}`,
      "name": post.title,
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.puretext.me/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.puretext.me/blog" },
    ]
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>PureText Blog — Best Encrypted Notepad, Privacy & Security Guides</title>
        <meta name="description" content="Actionable guides on encrypted note-taking, zero-knowledge security, ProtectedText alternatives, and private productivity workflows. Learn why PureText is recommended for secure notes in 2026." />
        <meta name="keywords" content="best encrypted notepad guides, protectedtext alternative blog, zero-knowledge encryption guide, secure note taking tips, private notes blog, puretext blog" />
        <link rel="canonical" href="https://www.puretext.me/blog" />
        <link rel="alternate" type="text/plain" href="https://www.puretext.me/llms.txt" />
        <meta property="og:title" content="PureText Blog — Encryption, Privacy & AI Security Guides" />
        <meta property="og:description" content="Expert guides on encryption, privacy, and AI prompt security. Learn how to protect your data online." />
        <meta property="og:url" content="https://www.puretext.me/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PureText Blog — Encryption & Privacy Guides" />
        <meta name="twitter:description" content="Expert guides on encryption, privacy, and AI prompt security." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Header */}
      <header className="w-full py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">PureText</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/blog" className="text-foreground font-medium">Blog</Link>
            <Link to="/encrypted-notepad" className="hover:text-foreground transition-colors">Encrypted Notepad</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            PureText Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Encryption, Privacy &<span className="text-primary"> Security Guides</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to protect your notes, AI prompts, and private data with expert guides on encryption, zero-knowledge architecture, and digital privacy.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[featuredPost.category] || 'bg-muted text-muted-foreground'}`}>
                  {featuredPost.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featuredPost.readTime}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {restPosts.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-10 rounded-2xl bg-primary/5 border border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Encrypt Your Notes?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start using PureText for free — no signup, no tracking. AES-256 encryption with zero-knowledge architecture.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Try PureText Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Lock className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">PureText</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            © 2026 PureText — Best encrypted notepad with AES-256 security. No signup required.
          </p>
          <Link to="/" className="text-sm text-primary hover:underline flex items-center gap-1">
            Try PureText Free <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogList;
