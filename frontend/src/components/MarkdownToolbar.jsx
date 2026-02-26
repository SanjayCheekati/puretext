import React, { memo } from 'react';
import { Bold, Italic, Heading1, Heading2, Heading3, Link, List, ListOrdered, Code, Quote, CheckSquare, Minus } from 'lucide-react';
import { Button } from './ui/button';

const ACTIONS = [
  { icon: Bold, label: 'Bold', key: 'bold', wrap: ['**', '**'] },
  { icon: Italic, label: 'Italic', key: 'italic', wrap: ['*', '*'] },
  { icon: Heading1, label: 'H1', key: 'h1', prefix: '# ' },
  { icon: Heading2, label: 'H2', key: 'h2', prefix: '## ' },
  { icon: Heading3, label: 'H3', key: 'h3', prefix: '### ' },
  { type: 'sep' },
  { icon: Link, label: 'Link', key: 'link', type: 'link' },
  { icon: Code, label: 'Inline Code', key: 'code', wrap: ['`', '`'] },
  { icon: Quote, label: 'Blockquote', key: 'quote', prefix: '> ' },
  { icon: Minus, label: 'Horizontal Rule', key: 'hr', insert: '\n---\n' },
  { type: 'sep' },
  { icon: List, label: 'Bullet List', key: 'ul', prefix: '- ' },
  { icon: ListOrdered, label: 'Numbered List', key: 'ol', prefix: '1. ' },
  { icon: CheckSquare, label: 'Checkbox', key: 'check', prefix: '- [ ] ' },
];

// Regex to detect existing markdown line prefixes
const PREFIX_PATTERN = /^(#{1,6}\s|>\s|- \[[ x]\]\s|- |\* |\d+\.\s)/;

/**
 * Applies a markdown formatting action to the textarea.
 * - Wrap actions: wraps selected text or inserts empty markers (e.g. ****) with cursor inside
 * - Prefix actions: prepends prefix to current line / toggles / replaces
 * - No placeholder text is ever inserted
 */
export function applyMarkdownAction(textarea, action) {
  if (!textarea) return null;

  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.substring(selectionStart, selectionEnd);
  let newText = '';
  let cursorStart = selectionStart;
  let cursorEnd = selectionStart;

  if (action.wrap) {
    const [before, after] = action.wrap;
    if (selected) {
      // Check if already wrapped — toggle off
      const beforeText = value.substring(selectionStart - before.length, selectionStart);
      const afterText = value.substring(selectionEnd, selectionEnd + after.length);
      if (beforeText === before && afterText === after) {
        // Unwrap
        newText = value.substring(0, selectionStart - before.length) + selected + value.substring(selectionEnd + after.length);
        cursorStart = selectionStart - before.length;
        cursorEnd = cursorStart + selected.length;
      } else {
        // Wrap selected text
        newText = value.substring(0, selectionStart) + before + selected + after + value.substring(selectionEnd);
        cursorStart = selectionStart + before.length;
        cursorEnd = cursorStart + selected.length;
      }
    } else {
      // No selection — insert empty markers, place cursor between them
      newText = value.substring(0, selectionStart) + before + after + value.substring(selectionEnd);
      cursorStart = selectionStart + before.length;
      cursorEnd = cursorStart; // cursor between markers, ready to type
    }
  } else if (action.prefix) {
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const lineEnd = value.indexOf('\n', selectionStart);
    const lineEndPos = lineEnd === -1 ? value.length : lineEnd;
    const currentLine = value.substring(lineStart, lineEndPos);
    const existingPrefix = currentLine.match(PREFIX_PATTERN);

    if (existingPrefix && existingPrefix[0] === action.prefix) {
      // Same prefix — toggle off (remove it)
      newText = value.substring(0, lineStart) + currentLine.substring(action.prefix.length) + value.substring(lineEndPos);
      cursorStart = cursorEnd = Math.max(lineStart, selectionStart - action.prefix.length);
    } else if (existingPrefix) {
      // Different prefix — replace it
      const stripped = currentLine.substring(existingPrefix[0].length);
      newText = value.substring(0, lineStart) + action.prefix + stripped + value.substring(lineEndPos);
      const offset = action.prefix.length - existingPrefix[0].length;
      cursorStart = cursorEnd = selectionStart + offset;
    } else {
      // No existing prefix — just prepend prefix, cursor after prefix
      newText = value.substring(0, lineStart) + action.prefix + value.substring(lineStart);
      cursorStart = cursorEnd = selectionStart + action.prefix.length;
    }
  } else if (action.type === 'link') {
    if (selected) {
      // Use selection as link text, place cursor inside (url)
      const result = `[${selected}](url)`;
      newText = value.substring(0, selectionStart) + result + value.substring(selectionEnd);
      // Select "url" so user can type the actual URL
      cursorStart = selectionStart + selected.length + 3; // after ](
      cursorEnd = cursorStart + 3; // select "url"
    } else {
      // Insert empty link structure, cursor in text part
      newText = value.substring(0, selectionStart) + '[](url)' + value.substring(selectionEnd);
      cursorStart = selectionStart + 1; // cursor inside []
      cursorEnd = cursorStart;
    }
  } else if (action.insert) {
    newText = value.substring(0, selectionStart) + action.insert + value.substring(selectionEnd);
    cursorStart = cursorEnd = selectionStart + action.insert.length;
  }

  return { newText, cursorStart, cursorEnd };
}

const MarkdownToolbar = memo(({ textareaRef, onToolbarAction, disabled }) => {
  const handleAction = (action) => {
    const textarea = textareaRef?.current;
    if (!textarea || disabled) return;
    const result = applyMarkdownAction(textarea, action);
    if (result) {
      onToolbarAction(result.newText, result.cursorStart, result.cursorEnd);
    }
  };

  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
      {ACTIONS.map((action, i) => {
        if (action.type === 'sep' && !action.icon) {
          return <div key={`sep-${i}`} className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />;
        }
        if (!action.icon) return null;
        const Icon = action.icon;
        return (
          <Button
            key={action.key}
            variant="ghost"
            size="icon"
            onClick={() => handleAction(action)}
            title={action.label}
            aria-label={action.label}
            disabled={disabled}
            className="h-7 w-7 rounded-lg flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          >
            <Icon className="h-3.5 w-3.5" />
          </Button>
        );
      })}
    </div>
  );
});

MarkdownToolbar.displayName = 'MarkdownToolbar';

export default MarkdownToolbar;
