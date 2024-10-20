// components/OrgButton.tsx
'use client';

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
    <button
      onClick={handleOrgClick}
      className='text-3xl font-bold hover:underline'
    >
      {title} hakkında tüm bilgileri ve ilanları görmek için tıklayınız
    </button>
  );
}
