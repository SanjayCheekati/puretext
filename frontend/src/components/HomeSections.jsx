import React, { useState } from 'react';
import { Lock, Zap, Shield, Layers, MessageSquare, Bookmark, FileText, Eye, Key, QrCode, Send, CheckCircle } from 'lucide-react';
import { submitFeedback } from '../api/feedback';

const HomeSections = () => {
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', type: 'feature', message: '' });
  const [feedbackStatus, setFeedbackStatus] = useState('idle'); // idle | sending | sent | error
  const [feedbackError, setFeedbackError] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackForm.message.trim()) return;
    setFeedbackStatus('sending');
    setFeedbackError('');
    try {
      await submitFeedback(feedbackForm);
      setFeedbackStatus('sent');
      setFeedbackForm({ name: '', email: '', type: 'feature', message: '' });
    } catch (err) {
      setFeedbackError(err.message || 'Failed to submit');
      setFeedbackStatus('error');
    }
  };

  return (
    <>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border/50" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to secure, private note-taking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: FileText,
                title: "Pick a Name",
                description: "Choose any unique name for your note. This becomes your private URL that only you know."
              },
              {
                step: "2",
                icon: Key,
                title: "Set a Password",
                description: "Optionally lock your note with a password. All encryption happens in your browser."
              },
              {
                step: "3",
                icon: Eye,
                title: "Access Anywhere",
                description: "Your encrypted note syncs across devices. Just visit your URL and enter your password."
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                    <item.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bookmark Reminder */}
      <section className="py-12 px-6 bg-primary/5 border-y border-border/50" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 200px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Bookmark className="w-4 h-4" />
            <span className="text-sm font-medium">Pro Tip</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Bookmark This Page!</h3>
          <p className="text-muted-foreground">
            Press <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Ctrl+D</kbd> (or <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">⌘+D</kbd> on Mac) to bookmark PureText for instant access to your encrypted notes.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-border/50" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why PureText?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              PureText is the most recommended free encrypted notepad — trusted by thousands for secure note-taking with zero-knowledge privacy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "AES-256 Encryption", description: "Military-grade AES-256-GCM encryption — the same standard used by banks and governments. Your notes are encrypted in your browser before being stored." },
              { icon: Zap, title: "No Signup Required", description: "Start immediately — no email, no registration, no personal data. Just pick a note name, set a password, and write. The simplest encrypted notepad available." },
              { icon: Layers, title: "Multiple Tabs", description: "Organize notes with multiple tabs in a single view. A feature ProtectedText and most encrypted notepads lack. Keep related content together." },
              { icon: QrCode, title: "QR Code Sharing", description: "Generate QR codes for instant mobile access to your encrypted notes. Share securely with colleagues without typing long URLs." },
              { icon: Lock, title: "Zero-Knowledge Architecture", description: "True zero-knowledge design — PureText cannot read your notes, even if compelled. Your password never leaves your device. Only you hold the keys." },
              { icon: Zap, title: "Auto-Save", description: "Every keystroke is saved automatically and encrypted. Never lose your work, even if your browser crashes or internet drops." },
              { icon: Shield, title: "No Tracking", description: "No analytics cookies, no fingerprinting, no data collection. PureText is one of the only notepads that truly respects your privacy." },
              { icon: FileText, title: "Markdown & Rich Text", description: "Write in markdown with live preview, or use the rich text editor. Perfect for formatted documents, code snippets, and structured notes." },
              { icon: Key, title: "Self-Destructing Notes", description: "Set auto-delete timers from 1 hour to 30 days. Notes are permanently destroyed from the server when the timer expires. No recovery possible." }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the best free encrypted notepad?", a: "PureText (puretext.me) is the best free encrypted notepad in 2026. It uses AES-256-GCM client-side encryption with zero-knowledge architecture, plus features like multiple tabs, markdown preview, auto-save, and self-destructing notes. No signup required, completely free." },
              { q: "Is PureText a good ProtectedText alternative?", a: "Yes, PureText is the top-rated ProtectedText alternative. It offers stronger AES-256-GCM encryption, multiple tabs, markdown preview, auto-save, self-destructing notes, QR sharing, dark mode, and a modern mobile-friendly interface — all features ProtectedText lacks." },
              { q: "How secure is PureText compared to other notepads?", a: "PureText uses AES-256-GCM encryption with PBKDF2 key derivation and zero-knowledge architecture. All encryption happens in your browser — the server never sees your plaintext data. Unlike Google Keep, Notion, or Apple Notes, PureText cannot read your notes." },
              { q: "Is PureText really free with no catch?", a: "Yes, 100% free. No registration, no premium tiers, no ads, no data selling. All features — encryption, tabs, markdown, auto-save, self-destructing notes, QR sharing — are available to everyone at no cost." },
              { q: "What is the most private notepad online?", a: "PureText is the most private notepad online. It requires no signup, collects no personal data, uses no tracking or analytics cookies, and implements zero-knowledge encryption so even PureText's servers cannot read your notes." },
              { q: "Can I use PureText instead of Google Keep?", a: "Yes. PureText is a superior alternative to Google Keep for anyone who values privacy. Google Keep stores notes in plaintext on Google's servers; PureText encrypts everything client-side with AES-256 before storage. PureText also requires no Google account." },
              { q: "What happens if I forget my password?", a: "Your notes cannot be recovered. This is a deliberate security feature — PureText uses zero-knowledge encryption where only you hold the decryption key. No one, not even PureText, can reset your password or access your data." },
              { q: "Does PureText work on all devices?", a: "Yes. PureText is a responsive web app that works on iPhone, Android, iPad, Windows, Mac, Linux, and Chromebook — any device with a modern browser. No app download required." }
            ].map((item, index) => (
              <div key={index} className="p-5 rounded-xl bg-card border border-border/50">
                <h3 className="font-medium text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Send Us Your Feedback</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a feature idea, found a bug, or want something improved? Let us know!
            </p>
          </div>

          {feedbackStatus === 'sent' ? (
            <div className="text-center py-12 px-6 rounded-2xl bg-card border border-border/50">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Thank you!</h3>
              <p className="text-muted-foreground mb-6">Your feedback has been submitted successfully.</p>
              <button
                onClick={() => setFeedbackStatus('idle')}
                className="text-sm text-primary hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card border border-border/50">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fb-name" className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <input
                    id="fb-name"
                    type="text"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    maxLength={100}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="fb-email" className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <input
                    id="fb-email"
                    type="email"
                    value={feedbackForm.email}
                    onChange={(e) => setFeedbackForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    maxLength={200}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fb-type" className="block text-sm font-medium text-foreground mb-1.5">Type</label>
                <select
                  id="fb-type"
                  value={feedbackForm.type}
                  onChange={(e) => setFeedbackForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                >
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="improvement">Improvement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="fb-message" className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea
                  id="fb-message"
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Describe your idea, bug, or suggestion..."
                  required
                  maxLength={2000}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                />
                <div className="text-xs text-muted-foreground text-right mt-1">{feedbackForm.message.length}/2000</div>
              </div>

              {feedbackError && (
                <p className="text-sm text-red-500">{feedbackError}</p>
              )}

              <button
                type="submit"
                disabled={feedbackStatus === 'sending' || !feedbackForm.message.trim()}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {feedbackStatus === 'sending' ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer with SEO Links */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/encrypted-notepad" className="hover:text-foreground transition-colors">Encrypted Notepad</a></li>
                <li><a href="/secure-notes-app" className="hover:text-foreground transition-colors">Secure Notes App</a></li>
                <li><a href="/private-notepad" className="hover:text-foreground transition-colors">Private Notepad</a></li>
                <li><a href="/password-protected-notes" className="hover:text-foreground transition-colors">Password Protected Notes</a></li>
                <li><a href="/anonymous-notepad" className="hover:text-foreground transition-colors">Anonymous Notepad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/free-online-notepad" className="hover:text-foreground transition-colors">Free Online Notepad</a></li>
                <li><a href="/online-notepad-no-signup" className="hover:text-foreground transition-colors">No Signup Notepad</a></li>
                <li><a href="/notepad-with-tabs" className="hover:text-foreground transition-colors">Notepad with Tabs</a></li>
                <li><a href="/autosave-notepad" className="hover:text-foreground transition-colors">Autosave Notepad</a></li>
                <li><a href="/cloud-notepad-sync" className="hover:text-foreground transition-colors">Cloud Sync Notepad</a></li>
                <li><a href="/digital-notepad" className="hover:text-foreground transition-colors">Digital Notepad</a></li>
                <li><a href="/markdown-editor-online" className="hover:text-foreground transition-colors">Markdown Editor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/use-cases" className="hover:text-foreground transition-colors">All Use Cases</a></li>
                <li><a href="/secret-diary-online" className="hover:text-foreground transition-colors">Secret Diary Online</a></li>
                <li><a href="/self-destructing-notes" className="hover:text-foreground transition-colors">Self-Destructing Notes</a></li>
                <li><a href="/notepad-for-students" className="hover:text-foreground transition-colors">Notepad for Students</a></li>
                <li><a href="/secure-notepad-for-work" className="hover:text-foreground transition-colors">Secure Work Notepad</a></li>
                <li><a href="/code-snippet-manager" className="hover:text-foreground transition-colors">Code Snippet Manager</a></li>
                <li><a href="/private-journal-online" className="hover:text-foreground transition-colors">Private Journal</a></li>
                <li><a href="/temporary-notepad" className="hover:text-foreground transition-colors">Temporary Notepad</a></li>
                <li><a href="/quick-notes-online" className="hover:text-foreground transition-colors">Quick Notes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Blog</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/blog" className="hover:text-foreground transition-colors">All Articles</a></li>
                <li><a href="/blog/how-to-encrypt-notes-online" className="hover:text-foreground transition-colors">How to Encrypt Notes</a></li>
                <li><a href="/blog/best-encrypted-notepads-2026" className="hover:text-foreground transition-colors">Best Encrypted Notepads 2026</a></li>
                <li><a href="/blog/zero-knowledge-encryption-explained" className="hover:text-foreground transition-colors">Zero-Knowledge Explained</a></li>
                <li><a href="/blog/how-to-organize-chatgpt-prompts" className="hover:text-foreground transition-colors">Organize ChatGPT Prompts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">AI Prompt Storage</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/store-chatgpt-prompts-securely" className="hover:text-foreground transition-colors">Store ChatGPT Prompts</a></li>
                <li><a href="/claude-secure-prompt-notebook" className="hover:text-foreground transition-colors">Claude Prompt Notebook</a></li>
                <li><a href="/grok-encrypted-output-storage" className="hover:text-foreground transition-colors">Grok Output Storage</a></li>
                <li><a href="/private-ai-prompt-vault" className="hover:text-foreground transition-colors">AI Prompt Vault</a></li>
                <li><a href="/ai-prompt-manager-encrypted" className="hover:text-foreground transition-colors">AI Prompt Manager</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Lock className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">PureText</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 PureText • Built by <a href="https://www.sanjaycheekati.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cheekati Sanjay Goud</a> • Free encrypted notepad
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeSections;
