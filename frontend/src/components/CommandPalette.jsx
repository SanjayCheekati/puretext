import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { 
  Save, Plus, Lock, Key, Trash2, Copy, Download, Home, Moon, Sun, 
  Eye, Edit3, QrCode, Share2, Search, Clock, Command, Timer
} from 'lucide-react';

const CommandPalette = memo(({ 
  isOpen, 
  onClose, 
  commands 
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Filter commands based on query
  const filtered = query.trim()
    ? commands.filter(cmd => {
        if (cmd.type === 'sep') return false;
        const q = query.toLowerCase();
        return cmd.label.toLowerCase().includes(q) || 
               (cmd.keywords && cmd.keywords.some(k => k.includes(q)));
      })
    : commands.filter(cmd => cmd.type !== 'sep' || true);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Focus input after dialog renders
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Keep selected index in bounds
  useEffect(() => {
    const actionItems = filtered.filter(c => c.type !== 'sep');
    if (selectedIndex >= actionItems.length) {
      setSelectedIndex(Math.max(0, actionItems.length - 1));
    }
  }, [filtered, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector('[data-selected="true"]');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback((e) => {
    const actionItems = filtered.filter(c => c.type !== 'sep');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % actionItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + actionItems.length) % actionItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (actionItems[selectedIndex]) {
        actionItems[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  // Render items with separators
  let actionIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
        onClick={onClose}
      />
      
      {/* Palette */}
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101] px-4">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/60"
              autoComplete="off"
              spellCheck="false"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-mono border border-border/50">
              ESC
            </kbd>
          </div>

          {/* Command List */}
          <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2">
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No commands found
              </div>
            )}
            {filtered.map((cmd, i) => {
              if (cmd.type === 'sep') {
                // Don't render separators in search results
                if (query.trim()) return null;
                return (
                  <div key={`sep-${i}`} className="my-1 mx-3">
                    {cmd.label && (
                      <div className="px-1 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                        {cmd.label}
                      </div>
                    )}
                    <div className="h-px bg-border/30" />
                  </div>
                );
              }

              actionIndex++;
              const isSelected = actionIndex === selectedIndex;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  data-selected={isSelected}
                  onClick={() => { cmd.action(); onClose(); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isSelected 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground hover:bg-muted/50'
                  } ${cmd.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={cmd.disabled}
                >
                  {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                  <span className="flex-1 text-left">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/60 font-mono">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-border/30 flex items-center gap-4 text-[10px] text-muted-foreground/50">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-muted border border-border/30 font-mono">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-muted border border-border/30 font-mono">↵</kbd> select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-muted border border-border/30 font-mono">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </>
  );
});

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
