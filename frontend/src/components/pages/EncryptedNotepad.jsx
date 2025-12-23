import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Key, Zap, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const EncryptedNotepad = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Free Encrypted Notepad Online | AES-256 Secure Notes | PureText</title>
        <meta name="description" content="Free encrypted notepad with AES-256 encryption. Create password-protected notes online. Zero-knowledge security - we can never read your notes. No signup required." />
        <meta name="keywords" content="encrypted notepad, secure notepad online, password protected notes, AES-256 notepad, encrypted notes app, secure note taking, private notepad, encrypted text editor, zero knowledge notes" />
        <link rel="canonical" href="https://www.puretext.me/encrypted-notepad" />
        <meta property="og:title" content="Free Encrypted Notepad Online | AES-256 Secure Notes" />
        <meta property="og:description" content="Create password-protected notes with military-grade AES-256 encryption. Free, no signup, zero-knowledge security." />
        <meta property="og:url" content="https://www.puretext.me/encrypted-notepad" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PureText Encrypted Notepad",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2847" }
          }
        `}</script>
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
            <Button onClick={() => navigate('/')} size="sm">Try Free</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Military-Grade Encryption
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Free Encrypted Notepad Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Create secure, password-protected notes with <strong>AES-256 encryption</strong>. 
              Your data is encrypted in your browser - we can <em>never</em> read your notes.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8 py-6">
              <Key className="w-5 h-5 mr-2" />
              Create Encrypted Note Free
            </Button>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Choose Our Encrypted Notepad?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "AES-256 Encryption", desc: "Same encryption used by banks and military. Unbreakable with current technology." },
                { icon: Eye, title: "Zero-Knowledge", desc: "We never see your password or data. Everything encrypts in your browser." },
                { icon: Zap, title: "No Signup Required", desc: "Start using instantly. No email, no registration, no personal data collected." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">How Our Encrypted Notepad Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>PureText's <strong>encrypted notepad</strong> uses client-side encryption, meaning all encryption and decryption happens directly in your web browser. Here's the process:</p>
              <ol>
                <li><strong>You create a note</strong> - Choose any URL name (like puretext.me/my-secret-notes)</li>
                <li><strong>Set a password</strong> - Your password generates a unique encryption key using PBKDF2</li>
                <li><strong>Browser encrypts data</strong> - AES-256-GCM encryption happens locally before any data leaves your device</li>
                <li><strong>Encrypted data stored</strong> - Only scrambled, unreadable ciphertext reaches our servers</li>
                <li><strong>Access anywhere</strong> - Visit your URL, enter password, data decrypts in your browser</li>
              </ol>
              <p>This <strong>zero-knowledge architecture</strong> means even if our servers were hacked, attackers would only find encrypted gibberish. Without your password, the data is permanently unreadable.</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Encrypted Notepad Use Cases</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Store passwords and credentials securely",
                "Keep private journal entries",
                "Save sensitive business information",
                "Store cryptocurrency seed phrases",
                "Keep medical records private",
                "Secure personal financial data",
                "Private to-do lists and reminders",
                "Confidential meeting notes"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start Using Encrypted Notepad Now</h2>
            <p className="text-muted-foreground mb-6">No signup. No credit card. 100% free forever.</p>
            <Button size="lg" onClick={() => navigate('/')}>Create Secure Note →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText. Free encrypted notepad with zero-knowledge security.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="/protectedtext-alternative" className="hover:text-foreground">ProtectedText Alternative</a>
              <a href="/plain-text-online-editor" className="hover:text-foreground">Plain Text Editor</a>
              <a href="/secure-notes-app" className="hover:text-foreground">Secure Notes App</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EncryptedNotepad;
