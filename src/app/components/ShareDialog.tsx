'use client';
import { Button } from '@/app/components/ui/button'; // Adjust imports to match your button component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'; // Adjust imports to match your structure
import { Facebook, Share2, Twitter } from 'lucide-react'; // Adjust imports to match your icon setup
import React, { useState } from 'react';

interface ShareDialogProps {
  jobId: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ jobId }) => {
  const [open, setOpen] = useState(false);

  const handleShare = (platform: string) => {
    const jobLink = `https://yukilanlari.net/show/${jobId}`;
    let shareUrl = '';

    if (platform === 'Twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        jobLink
      )}`;
    } else if (platform === 'Facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        jobLink
      )}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='m-1 inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 hover:bg-green-100 transition-colors duration-300'>
          <Share2 className='size-3' />
          Paylaş
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-xl'>
        <DialogHeader>
          <DialogTitle>Sosyal Medya`da Paylaş</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Button
            variant='outline'
            className='flex items-center justify-start gap-2'
            onClick={() => handleShare('Twitter')}
          >
            <Twitter className='h-4 w-4' />
            Twitter`da Paylaş
          </Button>
          <Button
            variant='outline'
            className='flex items-center justify-start gap-2'
            onClick={() => handleShare('Facebook')}
          >
            <Facebook className='h-4 w-4' />
            Facebook`ta Paylaş
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
