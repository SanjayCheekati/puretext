import React, { memo } from 'react';
import { Bold, Italic, Heading1, Heading2, Heading3, Link, List, ListOrdered, Code, Quote, CheckSquare, Minus } from 'lucide-react';
import { Button } from './ui/button';

const ACTIONS = [
  { icon: Bold, label: 'Bold', key: 'bold', wrap: ['**', '**'], placeholder: 'bold text' },
  { icon: Italic, label: 'Italic', key: 'italic', wrap: ['*', '*'], placeholder: 'italic text' },
  { icon: Heading1, label: 'H1', key: 'h1', prefix: '# ', placeholder: 'Heading 1' },
  { icon: Heading2, label: 'H2', key: 'h2', prefix: '## ', placeholder: 'Heading 2' },
  { icon: Heading3, label: 'H3', key: 'h3', prefix: '### ', placeholder: 'Heading 3' },
  { type: 'sep' },
  { icon: Link, label: 'Link', key: 'link', template: (sel) => `[${sel || 'link text'}](url)` },
  { icon: Code, label: 'Inline Code', key: 'code', wrap: ['`', '`'], placeholder: 'code' },
  { icon: Quote, label: 'Blockquote', key: 'quote', prefix: '> ', placeholder: 'quote' },
  { icon: Minus, label: 'Horizontal Rule', key: 'hr', insert: '\n---\n' },
  { type: 'sep' },
  { icon: List, label: 'Bullet List', key: 'ul', prefix: '- ', placeholder: 'list item' },
  { icon: ListOrdered, label: 'Numbered List', key: 'ol', prefix: '1. ', placeholder: 'list item' },
  { icon: CheckSquare, label: 'Checkbox', key: 'check', prefix: '- [ ] ', placeholder: 'todo item' },
];

/**
 * Applies a markdown formatting action to the textarea.
 * @param {HTMLTextAreaElement} textarea
 * @param {object} action
 * @param {function} onChange - callback with full new value
 */
export function applyMarkdownAction(textarea, action, onChange) {
  if (!textarea) return;

  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.substring(selectionStart, selectionEnd);
  let newText = '';
  let cursorPos = selectionStart;

  if (action.wrap) {
    const [before, after] = action.wrap;
    const inner = selected || action.placeholder;
    newText = value.substring(0, selectionStart) + before + inner + after + value.substring(selectionEnd);
    if (selected) {
      cursorPos = selectionStart + before.length + inner.length + after.length;
    } else {
      // Select the placeholder
      cursorPos = selectionStart + before.length;
    }
  } else if (action.prefix) {
    // Line prefix (heading, list, etc.)
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const inner = selected || action.placeholder;
    newText = value.substring(0, lineStart) + action.prefix + value.substring(lineStart, selectionStart) + inner + value.substring(selectionEnd);
    cursorPos = lineStart + action.prefix.length + (selectionStart - lineStart) + inner.length;
  } else if (action.template) {
    const result = action.template(selected);
    newText = value.substring(0, selectionStart) + result + value.substring(selectionEnd);
    cursorPos = selectionStart + result.length;
  } else if (action.insert) {
    newText = value.substring(0, selectionStart) + action.insert + value.substring(selectionEnd);
    cursorPos = selectionStart + action.insert.length;
  }

  onChange(newText);

  // Restore focus and cursor position after React re-render
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(cursorPos, cursorPos);
  });
}

const MarkdownToolbar = memo(({ textareaRef, onContentChange, disabled }) => {
  const handleAction = (action) => {
    const textarea = textareaRef?.current;
    if (!textarea || disabled) return;
    applyMarkdownAction(textarea, action, onContentChange);
  };

  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
      {ACTIONS.map((action, i) => {
        if (action.type === 'sep') {
          return <div key={`sep-${i}`} className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />;
        }
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
