import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Copy, Moon, Sun, AlertTriangle } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Button } from './ui/button';
import { toast } from './ui/use-toast.jsx';
import { htmlToPlainText } from './RichTextEditor';

const ViewOnly = () => {
  const [searchParams] = useSearchParams();
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
    const plainText = htmlToPlainText(content);
    navigator.clipboard.writeText(plainText);
    toast({ title: "Copied!", description: "Content copied to clipboard" });
  };

  // Check if content is HTML and sanitize it
  const isHTML = content && content.trim().startsWith('<');
  const sanitizedHTML = useMemo(() => {
    if (!isHTML) return '';
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'hr', 'span', 'div', 'label', 'input'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'data-type', 'data-checked', 'type', 'checked', 'disabled'],
    });
  }, [content, isHTML]);

  // Invalid/no content state
  if (!content) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Invalid Link</h2>
          <p className="text-sm text-muted-foreground mb-6">This shared link is invalid or has been removed.</p>
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
              aria-label="Create Your Own Note"
              className="rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-xl"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy Content"
              aria-label="Copy Content"
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
          <div className="p-6 prose prose-sm dark:prose-invert max-w-none">
            {isHTML ? (
              <div 
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                className={
                  '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4 ' +
                  '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3 ' +
                  '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 ' +
                  '[&_p]:mb-1 [&_p]:leading-relaxed ' +
                  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2 ' +
                  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2 ' +
                  '[&_li]:mb-0.5 ' +
                  '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-2 ' +
                  '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono ' +
                  '[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:my-2 [&_pre]:overflow-x-auto ' +
                  '[&_hr]:border-border [&_hr]:my-4 ' +
                  '[&_a]:text-primary [&_a]:underline ' +
                  '[&_strong]:font-bold [&_em]:italic [&_u]:underline [&_s]:line-through'
                }
              />
            ) : (
              <div className="whitespace-pre-wrap">{content}</div>
            )}
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
