import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Lock, ArrowLeft, Copy, Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from './ui/button';
import { toast } from './ui/use-toast.jsx';

const ViewOnly = () => {
  const [searchParams] = useSearchParams();
  const { shareName } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    try {
      const encodedTitle = searchParams.get('t');
      const encodedContent = searchParams.get('c');
      
      if (encodedTitle && encodedContent) {
        setTitle(decodeURIComponent(atob(encodedTitle)));
        setContent(decodeURIComponent(atob(encodedContent)));
      }
    } catch (error) {
      console.error('Failed to decode shared content:', error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!", description: "Content copied to clipboard" });
  };

  if (!content) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Invalid Link</h2>
          <p className="text-sm text-muted-foreground mb-6">This shared link is invalid or has expired.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground hidden sm:block">PureText</span>
            </a>
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
              Read-Only
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              title="Create Your Own Note"
              className="rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-xl"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy Content"
              className="rounded-xl"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Title */}
          <div className="px-6 py-4 border-b border-border/50">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>

          {/* Content */}
          <div className="p-6 prose prose-sm dark:prose-invert max-w-none [&_p]:whitespace-pre-wrap [&_li]:whitespace-pre-wrap">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({children}) => <p className="whitespace-pre-wrap mb-4">{children}</p>,
                li: ({children}) => <li className="whitespace-pre-wrap">{children}</li>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">Want to create your own encrypted notes?</p>
          <Button onClick={() => navigate('/')} size="lg" className="rounded-xl">
            Create Free Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewOnly;
