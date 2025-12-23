import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from './components/ui/use-toast.jsx';

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

// Loading fallback with spinner
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">🔒 PureText</h1>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  </div>
);

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
          {/* View Only pages for shared links */}
          <Route path="/view" element={<ViewOnly />} />
          <Route path="/view/:shareName" element={<ViewOnly />} />
          {/* Note Editor - must be last to avoid conflicts */}
          <Route path="/:noteName" element={<NoteEditor />} />
        </Routes>
      </Suspense>
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
