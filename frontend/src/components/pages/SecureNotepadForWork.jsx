import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Briefcase, Building, Shield, Users, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const SecureNotepadForWork = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Secure Notepad for Work",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "3891", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Secure Notepad for Work | Business Notes Encrypted | PureText</title>
        <meta name="description" content="Secure notepad for work and business. Keep confidential meeting notes, project plans, and sensitive information encrypted. GDPR compliant, no data retention, enterprise-grade security." />
        <meta name="keywords" content="secure notepad for work, business notepad encrypted, confidential notes app, work notes secure, enterprise notepad, GDPR compliant notes, business meeting notes, secure work notes" />
        <link rel="canonical" href="https://www.puretext.me/secure-notepad-for-work" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
            <Button onClick={() => navigate('/')} size="sm">Get Started</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              Enterprise-Grade • GDPR Ready
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Secure Notepad for Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Keep your <strong>confidential work notes</strong> secure with military-grade encryption. 
              Perfect for meetings, projects, and sensitive business information.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Secure Notes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Business Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Meeting Notes", desc: "Confidential discussions stay confidential. Perfect for HR, legal, and executive meetings." },
                { icon: FileText, title: "Project Plans", desc: "Keep strategic plans and roadmaps secure from competitors and unauthorized access." },
                { icon: Building, title: "Client Info", desc: "Store sensitive client data with encryption that exceeds compliance requirements." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Compliance & Security</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "GDPR compliant - data minimization",
                "AES-256 encryption standard",
                "Zero-knowledge architecture",
                "No data retention policy",
                "No employee access to notes",
                "End-to-end encrypted",
                "No third-party data sharing",
                "Audit-friendly design"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-primary/10 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Secure Your Business Notes</h2>
            <p className="text-muted-foreground mb-6">Enterprise-grade security, zero enterprise pricing.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Free →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Secure notepad for business professionals.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SecureNotepadForWork;
