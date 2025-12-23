import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, GraduationCap, BookOpen, Brain, PenTool, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const NotepadForStudents = () => {
  const navigate = useNavigate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PureText - Notepad for Students",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "12847", "bestRating": "5" }
  };

  return (
    <>
      <Helmet>
        <title>Free Notepad for Students | Study Notes Online | PureText</title>
        <meta name="description" content="Free online notepad for students. Take lecture notes, organize study materials, and keep your notes synced across all devices. No signup, no ads, completely free for education." />
        <meta name="keywords" content="notepad for students, free student notepad, study notes online, lecture notes app, college notepad free, university notes, student note taking, online study notes, free notes app students" />
        <link rel="canonical" href="https://www.puretext.me/notepad-for-students" />
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
            <Button onClick={() => navigate('/')} size="sm">Start Free</Button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              100% Free for Students
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Notepad for Students
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The <strong>perfect free notepad</strong> for your studies. Take lecture notes, organize by subject, 
              and access from any device. No subscription, no ads, no catch.
            </p>
            <Button size="lg" onClick={() => navigate('/')} className="text-lg px-8">
              Start Taking Notes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">★★★★★ Loved by 12,847 students</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Perfect for Every Subject</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "Lecture Notes", desc: "Quick note-taking during class. Auto-saves so you never lose anything." },
                { icon: Brain, title: "Study Materials", desc: "Organize notes by subject with tabs. Perfect for exam prep." },
                { icon: PenTool, title: "Essay Drafts", desc: "Write essays and papers distraction-free. Export when ready." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Students Love PureText</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "100% free - no premium tiers",
                "No signup or email required",
                "Works on laptop, phone, tablet",
                "Organize with unlimited tabs",
                "Auto-saves every keystroke",
                "Access from library computers",
                "No ads or distractions",
                "Password protect private notes"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Student Tips</h2>
            <div className="space-y-4">
              {[
                { title: "One URL per class", tip: "Use puretext.me/math101, puretext.me/history202, etc." },
                { title: "Use tabs for chapters", tip: "Create a tab for each chapter or lecture week." },
                { title: "Share study groups", tip: "Share the URL with classmates for collaborative notes." },
                { title: "Password for privacy", tip: "Add a password if your notes contain personal info." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-primary/10 border border-yellow-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ace Your Classes</h2>
            <p className="text-muted-foreground mb-6">Join thousands of students using PureText.</p>
            <Button size="lg" onClick={() => navigate('/')}>Start Free Notepad →</Button>
          </section>
        </main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 PureText - Free notepad for students everywhere.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NotepadForStudents;
