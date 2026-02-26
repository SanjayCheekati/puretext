import React, { useState, useEffect, useCallback, memo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3,
  Link as LinkIcon, List, ListOrdered, Code, Quote, CheckSquare, Minus,
  Undo2, Redo2, Strikethrough
} from 'lucide-react';
import { Button } from './ui/button';

// Convert legacy plain text content to HTML
function migrateContent(content) {
  if (!content) return '';
  // Already HTML
  if (content.trim().startsWith('<')) return content;
  // Plain text / markdown — convert line breaks to paragraphs
  return content
    .split('\n')
    .map(line => `<p>${line || '<br>'}</p>`)
    .join('');
}

// Toolbar button component
const ToolbarButton = memo(({ icon: Icon, label, isActive, onClick, disabled }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    title={label}
    aria-label={label}
    disabled={disabled}
    className={`h-7 w-7 rounded-lg flex-shrink-0 transition-colors ${
      isActive
        ? 'bg-primary/15 text-primary hover:bg-primary/20'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
  </Button>
));
ToolbarButton.displayName = 'ToolbarButton';

const Toolbar = ({ editor }) => {
  // Force re-render on every editor transaction so isActive() stays current
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const handler = () => forceUpdate(n => n + 1);
    editor.on('transaction', handler);
    return () => editor.off('transaction', handler);
  }, [editor]);

  if (!editor) return null;

  const handleLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-border/50 overflow-x-auto scrollbar-hide flex-wrap">
      <ToolbarButton
        icon={Bold}
        label="Bold (Ctrl+B)"
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic (Ctrl+I)"
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={UnderlineIcon}
        label="Underline (Ctrl+U)"
        isActive={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        icon={Strikethrough}
        label="Strikethrough"
        isActive={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <div className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />

      <ToolbarButton
        icon={Heading1}
        label="Heading 1"
        isActive={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <ToolbarButton
        icon={Heading2}
        label="Heading 2"
        isActive={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        icon={Heading3}
        label="Heading 3"
        isActive={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <div className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />

      <ToolbarButton
        icon={List}
        label="Bullet List"
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={ListOrdered}
        label="Numbered List"
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        icon={CheckSquare}
        label="Task List"
        isActive={editor.isActive('taskList')}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      />

      <div className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />

      <ToolbarButton
        icon={Quote}
        label="Blockquote"
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        icon={Code}
        label="Code"
        isActive={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <ToolbarButton
        icon={LinkIcon}
        label="Link"
        isActive={editor.isActive('link')}
        onClick={handleLink}
      />
      <ToolbarButton
        icon={Minus}
        label="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <div className="w-px h-5 bg-border/50 mx-1 flex-shrink-0" />

      <ToolbarButton
        icon={Undo2}
        label="Undo (Ctrl+Z)"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />
      <ToolbarButton
        icon={Redo2}
        label="Redo (Ctrl+Y)"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />
    </div>
  );
};

const RichTextEditor = ({ content, onContentChange, disabled, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline cursor-pointer' },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder: 'Start typing your notes...',
      }),
    ],
    content: migrateContent(content),
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[500px] sm:min-h-[600px] p-6 prose prose-sm dark:prose-invert max-w-none focus:outline-none ' +
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
          '[&_ul[data-type="taskList"]]:list-none [&_ul[data-type="taskList"]]:pl-0 ' +
          '[&_ul[data-type="taskList"]_li]:flex [&_ul[data-type="taskList"]_li]:items-start [&_ul[data-type="taskList"]_li]:gap-2 ' +
          '[&_ul[data-type="taskList"]_li_label]:mt-0.5 ' +
          '[&_ul[data-type="taskList"]_li_input]:mt-1 [&_ul[data-type="taskList"]_li_input]:accent-primary ',
      },
    },
  });

  // Update editor content when tab changes (different content from parent)
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentHTML = editor.getHTML();
      const newHTML = migrateContent(content);
      // Only reset if content actually changed (e.g. tab switch)
      if (currentHTML !== newHTML) {
        editor.commands.setContent(newHTML, false);
      }
    }
  }, [content, editor]);

  // Update editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  if (!editor) return null;

  return (
    <div className={className}>
      {!disabled && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

// Export helper to extract plain text from HTML (for download/copy)
export function htmlToPlainText(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export default RichTextEditor;
