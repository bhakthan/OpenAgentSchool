import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, SignIn, Clock } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { EnhancedTutorialButton, pagesSynopsis } from '../tutorial/EnhancedTutorialButton';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const CommunitySharing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [patternName, setPatternName] = useState("");
  const [description, setDescription] = useState("");
  const [implementation, setImplementation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleShare = () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms before submitting.");
      return;
    }
    // In a real implementation, this would save to a database
    toast.success("Pattern submitted for review!", {
      description: "An admin will review your submission before it goes live."
    });
    
    // Reset form and show pending state
    setPatternName("");
    setDescription("");
    setImplementation("");
    setTermsAccepted(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Community Sharing</h1>
        <EnhancedTutorialButton
          tooltip="Learn about Community"
          pageSynopsis={pagesSynopsis['community']}
          showDetailedView={true}
        />
      </div>
      <p className="text-muted-foreground mb-8">
        Learn from and contribute to the Azure AI agent community. Share your implementations, 
        best practices, and unique agent patterns.
      </p>
      
      <Tabs defaultValue="contribute" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="contribute">Contribute</TabsTrigger>
          <TabsTrigger value="browse">Browse Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contribute">
          {!isAuthenticated ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <SignIn size={48} className="text-muted-foreground" weight="duotone" />
                <h3 className="text-lg font-semibold">Sign in to Contribute</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  You need to be logged in to share agent patterns with the community. 
                  Sign in to start contributing!
                </p>
                <Button onClick={() => navigate('/login')}>
                  <SignIn size={18} className="mr-2" />
                  Sign In
                </Button>
              </CardContent>
            </Card>
          ) : submitted ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <Clock size={48} className="text-amber-500" weight="duotone" />
                <h3 className="text-lg font-semibold">Submission Under Review</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Your pattern has been submitted and is pending admin approval. 
                  You'll see it in the community once it's been reviewed.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit Another Pattern
                </Button>
              </CardContent>
            </Card>
          ) : (
          <div className="grid gap-6">
            <Alert className="bg-muted [&>div:last-child]:col-start-2 [&>div:last-child]:w-full">
              <Info size={20} className="h-5 w-5" />
              <AlertTitle>Sharing Guidelines</AlertTitle>
              <AlertDescription className="whitespace-normal break-words text-wrap leading-relaxed w-full overflow-hidden">
                Share your agent pattern implementations, experiences, and best practices to help others. 
                All submissions are reviewed by an admin before being published.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle>Share Your Agent Pattern</CardTitle>
                <CardDescription>
                  Contribute your implementation of an agent pattern to help others learn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pattern-name">Pattern Name</Label>
                    <Input 
                      id="pattern-name"
                      placeholder="E.g., Improved ReAct with Memory" 
                      value={patternName}
                      onChange={(e) => setPatternName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe your agent pattern, its purpose, and when to use it..."
                      className="min-h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="implementation">Implementation Details</Label>
                    <Textarea 
                      id="implementation"
                      placeholder="Share code snippets, implementation steps, or technical details..."
                      className="min-h-64 font-mono"
                      value={implementation}
                      onChange={(e) => setImplementation(e.target.value)}
                    />
                  </div>
                  
                  <div className="rounded-md border border-border bg-muted/40 p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms-acceptance"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="terms-acceptance" className="text-sm leading-relaxed cursor-pointer select-none">
                        I confirm that my submission does not contain proprietary, confidential, or trade-secret
                        material belonging to any third party. I have the right to share this content and agree
                        that it may be published under the platform's{' '}
                        <a href="/terms" className="underline text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">Terms of Use</a>.
                        I understand that submissions are reviewed before publication and may be edited or removed
                        at the discretion of the administrators.
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7">
                      By submitting, you also agree not to post content that is unlawful, defamatory, or infringes
                      on intellectual property rights. You retain ownership of your original work.
                    </p>
                  </div>

                  <Button type="button" onClick={handleShare} disabled={!termsAccepted}>
                    Share with Community
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          )}
        </TabsContent>
        
        <TabsContent value="browse">
          <div className="grid gap-6">
            <Alert className="bg-muted [&>div:last-child]:col-start-2 [&>div:last-child]:w-full">
              <Info size={20} className="h-5 w-5" />
              <AlertTitle>Community Contributions</AlertTitle>
              <AlertDescription className="whitespace-normal break-words text-wrap leading-relaxed w-full overflow-hidden">
                Browse agent pattern implementations shared by the community. These are user-contributed and not officially verified.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Memory-Enhanced ReAct Pattern</CardTitle>
                  <CardDescription>Shared by user123 on June 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    An implementation of the ReAct pattern with added memory capabilities to maintain
                    context across multiple agent interactions.
                  </p>
                  <Button variant="outline">View Details</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Hybrid Plan-and-Execute with Azure Services</CardTitle>
                  <CardDescription>Shared by azure_expert on June 10, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    A pattern that combines planning and execution phases, integrated with 
                    Azure AI Services for enhanced performance.
                  </p>
                  <Button variant="outline">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunitySharing;