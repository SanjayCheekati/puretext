import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

const ALL_PAGES = [
  // Security & Encryption
  { href: '/encrypted-notepad', title: 'Encrypted Notepad', desc: 'AES-256 encrypted notes', category: 'security' },
  { href: '/secure-notes-app', title: 'Secure Notes App', desc: 'Private note-taking app', category: 'security' },
  { href: '/private-notepad', title: 'Private Notepad', desc: 'Anonymous notes no login', category: 'security' },
  { href: '/password-protected-notes', title: 'Password Protected Notes', desc: 'Lock notes with a password', category: 'security' },
  { href: '/anonymous-notepad', title: 'Anonymous Notepad', desc: 'No tracking, no logs', category: 'security' },
  { href: '/secure-notepad-for-work', title: 'Secure Notepad for Work', desc: 'Business-grade encrypted notes', category: 'security' },
  { href: '/secret-diary-online', title: 'Secret Diary Online', desc: 'Private journal with password', category: 'security' },
  { href: '/self-destructing-notes', title: 'Self-Destructing Notes', desc: 'Auto-delete after reading', category: 'security' },
  // Productivity
  { href: '/free-online-notepad', title: 'Free Online Notepad', desc: 'Cloud notepad any device', category: 'productivity' },
  { href: '/online-notepad-no-signup', title: 'Online Notepad No Signup', desc: 'Start writing instantly', category: 'productivity' },
  { href: '/notepad-with-tabs', title: 'Notepad with Tabs', desc: 'Multi-tab text editor', category: 'productivity' },
  { href: '/autosave-notepad', title: 'Autosave Notepad', desc: 'Never lose your work', category: 'productivity' },
  { href: '/cloud-notepad-sync', title: 'Cloud Notepad Sync', desc: 'Access notes any device', category: 'productivity' },
  { href: '/notepad-for-students', title: 'Notepad for Students', desc: 'Study notes online free', category: 'productivity' },
  { href: '/code-snippet-manager', title: 'Code Snippet Manager', desc: 'Store code snippets free', category: 'productivity' },
  // Tools
  { href: '/plain-text-online-editor', title: 'Plain Text Editor', desc: 'Fast, encrypted editor', category: 'tools' },
  { href: '/paste-as-plain-text-tool', title: 'Paste as Plain Text', desc: 'Remove formatting instantly', category: 'tools' },
  { href: '/remove-formatting-online', title: 'Remove Formatting', desc: 'Strip text formatting', category: 'tools' },
  { href: '/markdown-editor-online', title: 'Markdown Editor', desc: 'Write markdown online', category: 'tools' },
  { href: '/digital-notepad', title: 'Digital Notepad', desc: 'Your notepad in the cloud', category: 'tools' },
  // Comparisons
  { href: '/protectedtext-alternative', title: 'ProtectedText Alternative', desc: 'Better than ProtectedText', category: 'compare' },
  { href: '/best-protectedtext-alternatives', title: 'Best Alternatives 2025', desc: 'Top ProtectedText replacements', category: 'compare' },
  { href: '/puretext-vs-protectedtext', title: 'PureText vs ProtectedText', desc: 'Side-by-side comparison', category: 'compare' },
  { href: '/puretext-vs-notion-google-keep', title: 'PureText vs Notion vs Keep', desc: 'Privacy comparison', category: 'compare' },
  // New pages
  { href: '/online-text-editor', title: 'Online Text Editor', desc: 'Free text editor in browser', category: 'tools' },
  { href: '/write-notes-online', title: 'Write Notes Online', desc: 'Quick online note-taking', category: 'productivity' },
  { href: '/temporary-notepad', title: 'Temporary Notepad', desc: 'Disposable notes online', category: 'productivity' },
  { href: '/quick-notes-online', title: 'Quick Notes', desc: 'Fast note-taking tool', category: 'productivity' },
  { href: '/scratch-pad-online', title: 'Scratch Pad Online', desc: 'Quick scratch pad tool', category: 'tools' },
  { href: '/private-journal-online', title: 'Private Journal', desc: 'Encrypted personal journal', category: 'security' },
  // AI Workflow pages (Mar 2026)
  { href: '/store-chatgpt-prompts-securely', title: 'Store ChatGPT Prompts', desc: 'Encrypted ChatGPT prompt vault', category: 'ai' },
  { href: '/claude-secure-prompt-notebook', title: 'Claude Prompt Notebook', desc: 'Secure Claude AI notebook', category: 'ai' },
  { href: '/grok-encrypted-output-storage', title: 'Grok Output Storage', desc: 'Encrypted Grok archive', category: 'ai' },
  { href: '/private-ai-prompt-vault', title: 'AI Prompt Vault', desc: 'Private encrypted prompt vault', category: 'ai' },
  { href: '/ai-prompt-manager-encrypted', title: 'AI Prompt Manager', desc: 'Encrypted prompt manager', category: 'ai' },
  // Blog (Mar 2026)
  { href: '/blog', title: 'PureText Blog', desc: 'Encryption & privacy guides', category: 'blog' },
  { href: '/blog/how-to-encrypt-notes-online', title: 'How to Encrypt Notes', desc: 'Complete encryption guide', category: 'blog' },
  { href: '/blog/best-encrypted-notepads-2026', title: 'Best Encrypted Notepads 2026', desc: 'Top 5 encrypted notepads compared', category: 'blog' },
  { href: '/blog/zero-knowledge-encryption-explained', title: 'Zero-Knowledge Explained', desc: 'What is zero-knowledge?', category: 'blog' },
  { href: '/blog/how-to-organize-chatgpt-prompts', title: 'Organize ChatGPT Prompts', desc: 'Prompt library system', category: 'blog' },
  { href: '/blog/protectedtext-alternatives-security-comparison', title: 'ProtectedText Alternatives', desc: 'Security comparison 2026', category: 'blog' },
];

const CATEGORIES = {
  security: { label: 'Security & Privacy', color: 'text-green-500' },
  ai: { label: 'AI Prompt Storage', color: 'text-cyan-500' },
  blog: { label: 'Blog', color: 'text-pink-500' },
  productivity: { label: 'Productivity', color: 'text-blue-500' },
  tools: { label: 'Text Tools', color: 'text-purple-500' },
  compare: { label: 'Comparisons', color: 'text-orange-500' },
};

const RelatedPages = ({ currentPath }) => {
  const grouped = {};
  for (const cat of Object.keys(CATEGORIES)) {
    grouped[cat] = ALL_PAGES.filter(p => p.category === cat && p.href !== currentPath);
  }

  return (
    <section className="border-t border-border/50 mt-16 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Explore PureText</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(CATEGORIES).map(([cat, { label, color }]) => (
            <div key={cat}>
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${color} mb-4`}>{label}</h3>
              <ul className="space-y-2">
                {grouped[cat]?.map(page => (
                  <li key={page.href}>
                    <a href={page.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1">
                      {page.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Lock className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">PureText</span>
          </a>
          <p className="text-xs text-muted-foreground">© 2026 PureText — Best encrypted notepad with AES-256 security & secure AI prompt storage. No signup required.</p>
          <a href="/" className="text-sm text-primary hover:underline flex items-center gap-1">
            Try PureText Free <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RelatedPages;
