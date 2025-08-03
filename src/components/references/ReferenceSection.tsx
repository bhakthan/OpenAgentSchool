import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { references, ReferenceItem } from '@/lib/data/references';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookmarkSimple, ArrowSquareOut, Plus } from '@phosphor-icons/react';
import { useKV } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';

interface ReferenceSectionProps {
  type: 'concept' | 'pattern' | 'azureService' | 'communityGithub';
  itemId: string;
}

const ReferenceSection: React.FC<ReferenceSectionProps> = ({ type, itemId }) => {
  // Get references for this type & id
  let referenceData;
  
  if (type === 'concept') {
    referenceData = references.concepts[itemId];
  } else if (type === 'pattern') {
    referenceData = references.patterns[itemId];
  } else if (type === 'azureService') {
    referenceData = references.azureServices[itemId];
  }
  
  // Store custom user references
  const storageKey = `${type}-${itemId}-references`;
  const [customReferences, setCustomReferences] = useKV<ReferenceItem[]>(storageKey, []);

  // Form state for adding new reference
  const [newReference, setNewReference] = React.useState<{
    title: string;
    url: string;
    description: string;
  }>({
    title: '',
    url: '',
    description: '',
  });
  const [isAddingReference, setIsAddingReference] = React.useState(false);

  // Ensure customReferences is initialized correctly
  React.useEffect(() => {
    if (!customReferences) {
      setCustomReferences([]);
    }
  }, [customReferences]);

  // Add a new reference
  const handleAddReference = () => {
    if (!newReference.title || !newReference.url) return;
    
    setCustomReferences([
      ...customReferences,
      {
        title: newReference.title,
        url: newReference.url,
        description: newReference.description,
      }
    ]);
    
    // Reset form
    setNewReference({
      title: '',
      url: '',
      description: '',
    });
    setIsAddingReference(false);
  };

  // Remove a reference
  const handleRemoveReference = (index: number) => {
    setCustomReferences(customReferences.filter((_, i) => i !== index));
  };

  // Navigation to Community GitHub Resources
  const [showCommunityGithub, setShowCommunityGithub] = React.useState(type === 'communityGithub');

  console.log('itemId:', itemId);
  console.log('referenceData:', referenceData);
  console.log('customReferences:', customReferences);

  // Defensive normalization for referenceData
  let normalizedReferences = [];
  if (Array.isArray(referenceData)) {
    normalizedReferences = referenceData;
  } else if (referenceData && typeof referenceData === 'object') {
    normalizedReferences = [referenceData];
  }

  // Don't render anything if there are no references and no custom references
  if (!showCommunityGithub && normalizedReferences.length === 0 && (!customReferences || customReferences.length === 0)) {
    return null;
  }

  if (!showCommunityGithub) {
    return (
      <Card className="mb-6 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookmarkSimple size={24} className="text-primary" />
            References
          </CardTitle>
          <CardDescription>
            Helpful resources related to this {type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render grouped references if present */}
          {normalizedReferences.length > 0 ? (
            <div className="space-y-8">
              {normalizedReferences.map((group, groupIdx) => (
                <div key={group.id || groupIdx}>
                  {group.name && (
                    <h3 className="font-semibold text-lg mb-2 text-primary">{group.name}</h3>
                  )}
                  <div className="space-y-4">
                    {Array.isArray(group.references) && group.references.length > 0 ? (
                      group.references.map((reference, index) => (
                        <div
                          key={`${reference.title}-${index}`}
                          className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-accent/5 transition-colors"
                        >
                          <ArrowSquareOut size={20} className="text-primary mt-1" />
                          <div className="flex-1">
                            <a
                              href={reference.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:underline text-primary"
                            >
                              {reference.title}
                            </a>
                            {reference.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {reference.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1 truncate">{reference.url}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No references in this group.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No references available for this category.</p>
          )}

          {customReferences && customReferences.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">User Added References</h4>
              <div className="space-y-4">
                {customReferences.map((reference, index) => (
                  <div
                    key={`${reference.title}-${index}`}
                    className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-accent/5 transition-colors"
                  >
                    <ArrowSquareOut size={20} className="text-primary mt-1" />
                    <div className="flex-1">
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline text-primary"
                      >
                        {reference.title}
                      </a>
                      {reference.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {reference.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1 truncate">{reference.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fix the button's onClick functionality */}
          <Button 
            onClick={() => setIsAddingReference((prev) => !prev)} 
            variant="outline" 
            className="flex items-center gap-2 mt-4"
          >
            <Plus size={16} />
            {isAddingReference ? 'Cancel Adding Reference' : 'Add Reference'}
          </Button>

          {isAddingReference && (
            <div className="mt-4 space-y-4 border rounded-md p-4">
              <h4 className="font-medium">Add New Reference</h4>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={newReference.title}
                  onChange={(e) => setNewReference({...newReference, title: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Documentation Title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  URL <span className="text-destructive">*</span>
                </label>
                <input
                  type="url"
                  value={newReference.url}
                  onChange={(e) => setNewReference({...newReference, url: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <input
                  type="text"
                  value={newReference.description}
                  onChange={(e) => setNewReference({...newReference, description: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Brief description of the resource"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddingReference(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReference}>
                  Add Reference
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
};

export default ReferenceSection;