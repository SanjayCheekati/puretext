import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from './components/ui/use-toast.jsx';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const NoteEditor = lazy(() => import('./components/NoteEditor'));

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
