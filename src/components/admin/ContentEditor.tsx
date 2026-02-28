/**
 * ContentEditor — basic admin form for creating / editing DB-driven content.
 *
 * Visible only to users with `content.create` permission (via PermissionGate).
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PermissionGate } from '@/lib/auth/permissions';
import {
  createContent,
  updateContent,
  publishContent,
  type ContentBlock,
  type ContentItem,
  type ContentItemCreate,
} from '@/lib/api/content';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContentEditorProps {
  /** Pass an existing item to enter edit mode. */
  existingItem?: ContentItem;
  /** Called after a successful save. */
  onSaved?: (item: ContentItem) => void;
}

const CONTENT_TYPES = ['concept', 'pattern', 'skill', 'quiz-bank', 'tutorial'] as const;
const BLOCK_TYPES = ['markdown', 'code', 'tabs'] as const;

/* ------------------------------------------------------------------ */
/*  Slug helper                                                        */
/* ------------------------------------------------------------------ */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ------------------------------------------------------------------ */
/*  Block editor row                                                   */
/* ------------------------------------------------------------------ */

function BlockRow({
  block,
  index,
  onChange,
  onRemove,
}: {
  block: ContentBlock;
  index: number;
  onChange: (index: number, updated: ContentBlock) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">
            Block {index + 1}
          </span>
          <select
            value={block.type}
            onChange={(e) =>
              onChange(index, { ...block, type: e.target.value })
            }
            className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
            {BLOCK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {block.type === 'code' && (
            <input
              type="text"
              placeholder="language"
              value={block.language ?? ''}
              onChange={(e) =>
                onChange(index, { ...block, language: e.target.value })
              }
              className="w-28 rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      {block.type === 'tabs' ? (
        <textarea
          rows={4}
          placeholder='JSON tab array: [{"label":"Tab1","content":"..."}]'
          value={
            block.tabs ? JSON.stringify(block.tabs, null, 2) : ''
          }
          onChange={(e) => {
            try {
              const tabs = JSON.parse(e.target.value);
              onChange(index, { ...block, tabs });
            } catch {
              // Allow typing freely; parse when valid
              onChange(index, { ...block, tabs: block.tabs });
            }
          }}
          className="w-full rounded border border-slate-300 p-2 text-sm font-mono dark:border-slate-600 dark:bg-slate-800"
        />
      ) : (
        <textarea
          rows={6}
          placeholder="Block content…"
          value={block.content ?? ''}
          onChange={(e) =>
            onChange(index, { ...block, content: e.target.value })
          }
          className="w-full rounded border border-slate-300 p-2 text-sm font-mono dark:border-slate-600 dark:bg-slate-800"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main editor form                                                   */
/* ------------------------------------------------------------------ */

function EditorForm({ existingItem, onSaved }: ContentEditorProps) {
  const isEdit = !!existingItem;

  const [type, setType] = useState(existingItem?.type ?? 'concept');
  const [title, setTitle] = useState(existingItem?.title ?? '');
  const [slug, setSlug] = useState(existingItem?.slug ?? '');
  const [description, setDescription] = useState(existingItem?.description ?? '');
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    existingItem?.body ?? [{ type: 'markdown', content: '' }],
  );
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Auto-generate slug from title (only for new items)
  useEffect(() => {
    if (!isEdit) setSlug(slugify(title));
  }, [title, isEdit]);

  const handleBlockChange = useCallback(
    (index: number, updated: ContentBlock) => {
      setBlocks((prev) => prev.map((b, i) => (i === index ? updated : b)));
    },
    [],
  );

  const handleBlockRemove = useCallback((index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addBlock = () => {
    setBlocks((prev) => [...prev, { type: 'markdown', content: '' }]);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload: ContentItemCreate = {
        type,
        slug,
        title,
        description: description || undefined,
        body: blocks,
        status: 'draft',
      };

      let result: ContentItem;
      if (isEdit && existingItem) {
        result = await updateContent(existingItem.id, payload);
      } else {
        result = await createContent(payload);
      }
      setMessage('Saved successfully');
      onSaved?.(result);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Save failed';
      setMessage(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!existingItem) return;
    setPublishing(true);
    setMessage(null);
    try {
      const result = await publishContent(existingItem.id);
      setMessage('Published!');
      onSaved?.(result);
    } catch {
      setMessage('Publish failed');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Content' : 'Create Content'}</CardTitle>
        <CardDescription>
          {isEdit
            ? `Editing "${existingItem?.title}"`
            : 'Add a new piece of educational content'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Type + Slug row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Agent Architecture"
            className="w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary (≤ 140 chars recommended)"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          />
        </div>

        {/* Content blocks */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Content Blocks
          </h3>
          {blocks.map((block, idx) => (
            <BlockRow
              key={idx}
              block={block}
              index={idx}
              onChange={handleBlockChange}
              onRemove={handleBlockRemove}
            />
          ))}
          <button
            type="button"
            onClick={addBlock}
            className="rounded bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            + Add Block
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !title || !slug}
            className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          )}

          {message && (
            <span
              className={`text-sm ${
                message.startsWith('Error') ? 'text-red-500' : 'text-emerald-600'
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper — gated by permission                             */
/* ------------------------------------------------------------------ */

export default function ContentEditor(props: ContentEditorProps) {
  return (
    <PermissionGate
      permission="content.create"
      fallback={
        <div className="py-16 text-center text-slate-500">
          You don&apos;t have permission to manage content.
        </div>
      }
    >
      <EditorForm {...props} />
    </PermissionGate>
  );
}
