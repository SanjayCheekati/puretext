import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from './components/ui/use-toast.jsx';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const NoteEditor = lazy(() => import('./components/NoteEditor'));

// Lazy load SEO landing pages
const ProtectedTextAlternative = lazy(() => import('./components/pages/ProtectedTextAlternative'));
const BestProtectedTextAlternatives = lazy(() => import('./components/pages/BestProtectedTextAlternatives'));
const PureTextVsProtectedText = lazy(() => import('./components/pages/PureTextVsProtectedText'));
const PlainTextOnlineEditor = lazy(() => import('./components/pages/PlainTextOnlineEditor'));
const RemoveFormattingOnline = lazy(() => import('./components/pages/RemoveFormattingOnline'));
const PasteAsPlainTextTool = lazy(() => import('./components/pages/PasteAsPlainTextTool'));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <p className="text-sm text-gray-600">Loading...</p>
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
