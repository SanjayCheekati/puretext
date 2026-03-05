import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Lock, ArrowLeft, ArrowRight, Clock, Calendar, User, Tag, BookOpen, ChevronRight } from 'lucide-react';
import blogPosts from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category or shared tags, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug)
    .map(p => ({
      ...p,
      relevance: (p.category === post.category ? 3 : 0) +
        p.tags.filter(t => post.tags.includes(t)).length
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.sanjaycheekati.dev/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PureText",
      "url": "https://www.puretext.me",
      "logo": { "@type": "ImageObject", "url": "https://www.puretext.me/favicon.svg" }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.puretext.me/blog/${post.slug}`
    },
    "keywords": post.tags.join(', '),
    "articleSection": post.category,
    "wordCount": post.content.reduce((count, block) => {
      if (block.type === 'paragraph') return count + block.text.split(' ').length;
      if (block.type === 'list') return count + block.items.join(' ').split(' ').length;
      return count;
    }, 0),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.puretext.me/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.puretext.me/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.puretext.me/blog/${post.slug}` },
    ]
  };

  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        if (block.level === 2) {
          return <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>;
        }
        return <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;

      case 'paragraph':
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
            {block.text}
          </p>
        );

      case 'list':
        if (block.ordered) {
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground ml-4">
              {block.items.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground ml-4">
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto mb-6 rounded-xl border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/30 last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'cta':
        return (
          <div key={index} className="my-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <Link
              to={block.link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {block.text} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={`https://www.puretext.me/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://www.puretext.me/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
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

      {/* Breadcrumb */}
      <nav className="max-w-3xl mx-auto px-6 pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-foreground truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {post.category}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 mb-8 pb-8 border-b border-border/50">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">Founder, PureText</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {post.content.map((block, index) => renderBlock(block, index))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedPosts.map(related => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <span className="text-xs text-primary font-medium">{related.category}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1 mb-2 line-clamp-2">
                  {related.title}
                </h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {related.readTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog + CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-16 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Try PureText Free <ArrowRight className="w-4 h-4" />
        </Link>
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

export default BlogPost;
