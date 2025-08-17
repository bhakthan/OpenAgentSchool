import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { X, Save, Plus, Trash2, Edit3 } from 'lucide-react';
import { SCLEffect, SCLNode } from './SCLGraph';

interface NodeEditorProps {
  node: SCLNode | null;
  onSave: (nodeId: string, updatedEffect: SCLEffect) => void;
  onClose: () => void;
  onDelete?: (nodeId: string) => void;
  className?: string;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({
  node,
  onSave,
  onClose,
  onDelete,
  className = '',
}) => {
  const [editedEffect, setEditedEffect] = useState<SCLEffect | null>(
    node ? { ...node.data.effect } : null
  );
  const [newConstraint, setNewConstraint] = useState('');
  const [newSource, setNewSource] = useState('');

  React.useEffect(() => {
    if (node) {
      setEditedEffect({ ...node.data.effect });
    }
  }, [node]);

  if (!node || !editedEffect) {
    return null;
  }

  const handleSave = () => {
    if (editedEffect) {
      onSave(node.id, editedEffect);
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(node.id);
      onClose();
    }
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setEditedEffect({
        ...editedEffect,
        constraints: [...(editedEffect.constraints || []), newConstraint.trim()],
      });
      setNewConstraint('');
    }
  };

  const removeConstraint = (index: number) => {
    setEditedEffect({
      ...editedEffect,
      constraints: editedEffect.constraints?.filter((_, i) => i !== index) || [],
    });
  };

  const addSource = () => {
    if (newSource.trim()) {
      setEditedEffect({
        ...editedEffect,
        sources: [...(editedEffect.sources || []), newSource.trim()],
      });
      setNewSource('');
    }
  };

  const removeSource = (index: number) => {
    setEditedEffect({
      ...editedEffect,
      sources: editedEffect.sources?.filter((_, i) => i !== index) || [],
    });
  };

  const getTypeColor = (type: SCLEffect['type']) => {
    switch (type) {
      case 'first-order': return 'bg-primary/10 text-primary border-primary/20';
      case 'higher-order': return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'synthesis': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'constraint': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className={`w-full max-w-lg ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2">
          <Edit3 className="w-5 h-5" />
          Edit Effect
        </CardTitle>
        <Button onClick={onClose} size="sm" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Effect Type and ID */}
        <div className="flex items-center gap-2 mb-4">
          <Badge className={getTypeColor(editedEffect.type)}>
            {editedEffect.type}
          </Badge>
          <span className="text-sm text-gray-500">ID: {editedEffect.id}</span>
        </div>

        {/* Effect Text */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Effect Description</label>
          <Textarea
            value={editedEffect.text}
            onChange={(e) => setEditedEffect({ ...editedEffect, text: e.target.value })}
            placeholder="Describe the effect..."
            rows={3}
          />
        </div>

        {/* Effect Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Effect Type</label>
          <Select
            value={editedEffect.type}
            onValueChange={(value: SCLEffect['type']) =>
              setEditedEffect({ ...editedEffect, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-order">First-Order</SelectItem>
              <SelectItem value="higher-order">Higher-Order</SelectItem>
              <SelectItem value="synthesis">Synthesis</SelectItem>
              <SelectItem value="constraint">Constraint</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Confidence */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Confidence</label>
            <span className="text-sm text-gray-500">
              {(editedEffect.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            value={[editedEffect.confidence]}
            onValueChange={([value]) =>
              setEditedEffect({ ...editedEffect, confidence: value })
            }
            max={1}
            min={0}
            step={0.05}
            className="w-full"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category (Optional)</label>
          <Input
            value={editedEffect.category || ''}
            onChange={(e) => setEditedEffect({ ...editedEffect, category: e.target.value })}
            placeholder="e.g., Economic, Social, Environmental"
          />
        </div>

        {/* Sources */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sources</label>
          <div className="space-y-2">
            {editedEffect.sources?.map((source, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={source} readOnly className="flex-1" />
                <Button
                  onClick={() => removeSource(index)}
                  size="sm"
                  variant="outline"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="Add source..."
                onKeyDown={(e) => e.key === 'Enter' && addSource()}
              />
              <Button onClick={addSource} size="sm" variant="outline">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Constraints</label>
          <div className="space-y-2">
            {editedEffect.constraints?.map((constraint, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={constraint} readOnly className="flex-1" />
                <Button
                  onClick={() => removeConstraint(index)}
                  size="sm"
                  variant="outline"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newConstraint}
                onChange={(e) => setNewConstraint(e.target.value)}
                placeholder="Add constraint..."
                onKeyDown={(e) => e.key === 'Enter' && addConstraint()}
              />
              <Button onClick={addConstraint} size="sm" variant="outline">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button onClick={handleDelete} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" size="sm">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeEditor;
