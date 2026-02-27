import { useState, useEffect } from 'react';
import { castVote, getVotes, getUserVote, getRemainingVotes, type VoteDirection } from '@/lib/votingSystem';
import { Button } from '@/components/ui/button';
import { CaretUp, CaretDown } from '@phosphor-icons/react';

interface VoteButtonProps {
  postId: string;
}

export default function VoteButton({ postId }: VoteButtonProps) {
  const [votes, setVotes] = useState(getVotes(postId));
  const [userVote, setUserVote] = useState<VoteDirection | null>(getUserVote(postId));
  const [remaining, setRemaining] = useState(getRemainingVotes());

  useEffect(() => {
    setVotes(getVotes(postId));
    setUserVote(getUserVote(postId));
    setRemaining(getRemainingVotes());
  }, [postId]);

  const handleVote = (direction: VoteDirection) => {
    const result = castVote(postId, direction);
    if (result.success) {
      setVotes(getVotes(postId));
      setUserVote(getUserVote(postId));
      setRemaining(getRemainingVotes());
    }
  };

  const limited = remaining <= 0;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <Button
        variant="ghost"
        size="sm"
        className={`h-7 w-7 p-0 ${userVote === 'up' ? 'text-blue-500' : 'text-muted-foreground'}`}
        onClick={() => handleVote('up')}
        disabled={limited && userVote !== 'up'}
        aria-label="Upvote"
      >
        <CaretUp size={18} weight={userVote === 'up' ? 'fill' : 'bold'} />
      </Button>
      <span className={`text-sm font-semibold tabular-nums ${votes.net > 0 ? 'text-blue-500' : votes.net < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
        {votes.net}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={`h-7 w-7 p-0 ${userVote === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}
        onClick={() => handleVote('down')}
        disabled={limited && userVote !== 'down'}
        aria-label="Downvote"
      >
        <CaretDown size={18} weight={userVote === 'down' ? 'fill' : 'bold'} />
      </Button>
      {limited && (
        <span className="text-[10px] text-muted-foreground">limit</span>
      )}
    </div>
  );
}
