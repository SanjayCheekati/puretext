import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load non-critical UI
const Toaster = lazy(() => import('./components/ui/use-toast.jsx').then(m => ({ default: m.Toaster })));

// Lazy load analytics - not needed for initial render
const Analytics = lazy(() => import('@vercel/analytics/react').then(m => ({ default: m.Analytics })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const NoteEditor = lazy(() => import('./components/NoteEditor'));
const ViewOnly = lazy(() => import('./components/ViewOnly'));

// Lazy load SEO landing pages
const ProtectedTextAlternative = lazy(() => import('./components/pages/ProtectedTextAlternative'));
const BestProtectedTextAlternatives = lazy(() => import('./components/pages/BestProtectedTextAlternatives'));
const PureTextVsProtectedText = lazy(() => import('./components/pages/PureTextVsProtectedText'));
const PlainTextOnlineEditor = lazy(() => import('./components/pages/PlainTextOnlineEditor'));
const RemoveFormattingOnline = lazy(() => import('./components/pages/RemoveFormattingOnline'));
const PasteAsPlainTextTool = lazy(() => import('./components/pages/PasteAsPlainTextTool'));
const PureTextVsNotionGoogleKeep = lazy(() => import('./components/pages/PureTextVsNotionGoogleKeep'));
const EncryptedNotepad = lazy(() => import('./components/pages/EncryptedNotepad'));
const SecureNotesApp = lazy(() => import('./components/pages/SecureNotesApp'));
const PrivateNotepad = lazy(() => import('./components/pages/PrivateNotepad'));
const OnlineNotepadNoSignup = lazy(() => import('./components/pages/OnlineNotepadNoSignup'));
const PasswordProtectedNotes = lazy(() => import('./components/pages/PasswordProtectedNotes'));
const SelfDestructingNotes = lazy(() => import('./components/pages/SelfDestructingNotes'));
const FreeOnlineNotepad = lazy(() => import('./components/pages/FreeOnlineNotepad'));
const NotepadWithTabs = lazy(() => import('./components/pages/NotepadWithTabs'));
const SecretDiaryOnline = lazy(() => import('./components/pages/SecretDiaryOnline'));
const AutosaveNotepad = lazy(() => import('./components/pages/AutosaveNotepad'));
const AnonymousNotepad = lazy(() => import('./components/pages/AnonymousNotepad'));
const SecureNotepadForWork = lazy(() => import('./components/pages/SecureNotepadForWork'));
const NotepadForStudents = lazy(() => import('./components/pages/NotepadForStudents'));
const CodeSnippetManager = lazy(() => import('./components/pages/CodeSnippetManager'));
const CloudNotepadSync = lazy(() => import('./components/pages/CloudNotepadSync'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
// New high-traffic SEO pages (Feb 2026)
const OnlineTextEditor = lazy(() => import('./components/pages/OnlineTextEditor'));
const WriteNotesOnline = lazy(() => import('./components/pages/WriteNotesOnline'));
const TemporaryNotepad = lazy(() => import('./components/pages/TemporaryNotepad'));
const QuickNotesOnline = lazy(() => import('./components/pages/QuickNotesOnline'));
const ScratchPadOnline = lazy(() => import('./components/pages/ScratchPadOnline'));
const DigitalNotepad = lazy(() => import('./components/pages/DigitalNotepad'));
const MarkdownEditorOnline = lazy(() => import('./components/pages/MarkdownEditorOnline'));
const PrivateJournalOnline = lazy(() => import('./components/pages/PrivateJournalOnline'));
// AI Workflow SEO pages (Mar 2026)
const StoreChatGPTPromptsSecurely = lazy(() => import('./components/pages/StoreChatGPTPromptsSecurely'));
const ClaudeSecurePromptNotebook = lazy(() => import('./components/pages/ClaudeSecurePromptNotebook'));
const GrokEncryptedOutputStorage = lazy(() => import('./components/pages/GrokEncryptedOutputStorage'));
const PrivateAIPromptVault = lazy(() => import('./components/pages/PrivateAIPromptVault'));
const AIPromptManagerEncrypted = lazy(() => import('./components/pages/AIPromptManagerEncrypted'));

// Loading fallback - minimal, matches critical CSS bg
const LoadingFallback = () => {
  const isDark = typeof window !== 'undefined' && localStorage.getItem('theme') !== 'light';
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0a0a0b' : '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, margin: '0 auto 16px', border: '4px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: isDark ? '#888' : '#666', fontSize: 14 }}>Loading...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* SEO Landing Pages */}
          <Route path="/protectedtext-alternative" element={<ProtectedTextAlternative />} />
          <Route path="/best-protectedtext-alternatives" element={<BestProtectedTextAlternatives />} />
          <Route path="/puretext-vs-protectedtext" element={<PureTextVsProtectedText />} />
          <Route path="/plain-text-online-editor" element={<PlainTextOnlineEditor />} />
          <Route path="/remove-formatting-online" element={<RemoveFormattingOnline />} />
          <Route path="/paste-as-plain-text-tool" element={<PasteAsPlainTextTool />} />
          <Route path="/puretext-vs-notion-google-keep" element={<PureTextVsNotionGoogleKeep />} />
          <Route path="/encrypted-notepad" element={<EncryptedNotepad />} />
          <Route path="/secure-notes-app" element={<SecureNotesApp />} />
          <Route path="/private-notepad" element={<PrivateNotepad />} />
          <Route path="/online-notepad-no-signup" element={<OnlineNotepadNoSignup />} />
          <Route path="/password-protected-notes" element={<PasswordProtectedNotes />} />
          <Route path="/self-destructing-notes" element={<SelfDestructingNotes />} />
          <Route path="/free-online-notepad" element={<FreeOnlineNotepad />} />
          <Route path="/notepad-with-tabs" element={<NotepadWithTabs />} />
          <Route path="/secret-diary-online" element={<SecretDiaryOnline />} />
          <Route path="/autosave-notepad" element={<AutosaveNotepad />} />
          <Route path="/anonymous-notepad" element={<AnonymousNotepad />} />
          <Route path="/secure-notepad-for-work" element={<SecureNotepadForWork />} />
          <Route path="/notepad-for-students" element={<NotepadForStudents />} />
          <Route path="/code-snippet-manager" element={<CodeSnippetManager />} />
          <Route path="/cloud-notepad-sync" element={<CloudNotepadSync />} />
          {/* New SEO pages (Feb 2026) */}
          <Route path="/online-text-editor" element={<OnlineTextEditor />} />
          <Route path="/write-notes-online" element={<WriteNotesOnline />} />
          <Route path="/temporary-notepad" element={<TemporaryNotepad />} />
          <Route path="/quick-notes-online" element={<QuickNotesOnline />} />
          <Route path="/scratch-pad-online" element={<ScratchPadOnline />} />
          <Route path="/digital-notepad" element={<DigitalNotepad />} />
          <Route path="/markdown-editor-online" element={<MarkdownEditorOnline />} />
          <Route path="/private-journal-online" element={<PrivateJournalOnline />} />
          {/* AI Workflow SEO pages (Mar 2026) */}
          <Route path="/store-chatgpt-prompts-securely" element={<StoreChatGPTPromptsSecurely />} />
          <Route path="/claude-secure-prompt-notebook" element={<ClaudeSecurePromptNotebook />} />
          <Route path="/grok-encrypted-output-storage" element={<GrokEncryptedOutputStorage />} />
          <Route path="/private-ai-prompt-vault" element={<PrivateAIPromptVault />} />
          <Route path="/ai-prompt-manager-encrypted" element={<AIPromptManagerEncrypted />} />
          {/* Admin Panel */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          {/* View Only pages for shared links */}
          <Route path="/view" element={<ViewOnly />} />
          <Route path="/view/:shareName" element={<ViewOnly />} />
          {/* Note Editor - must be last to avoid conflicts */}
          <Route path="/:noteName" element={<NoteEditor />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>404</h1>
              <p style={{ color: '#888' }}>Page not found</p>
              <a href="/" style={{ color: '#7c3aed', textDecoration: 'underline' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
