'use client';

import { Button } from '@/app/components/ui/button';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type OrgButtonProps = {
  orgId: string;
  title: string;
};

export default function OrgButton({ orgId, title }: OrgButtonProps) {
  const handleOrgClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/jobs/${orgId}`;
  };

  return (
    <div className='relative group'>
      <Button
        onClick={handleOrgClick}
        variant='ghost'
        className='w-full justify-between text-left hover:bg-gray-100 p-4 group'
      >
        <span className='text-xl font-semibold group-hover:underline'>
          {title}
        </span>
        <span className='flex items-center text-sm text-gray-500 group-hover:text-gray-700'>
          Tüm ilanları göster
          <ChevronRight className='ml-1 h-4 w-4' />
        </span>
      </Button>
    </div>
  );
}
