// components/OrganizationIcon.tsx
'use client';

import { Building2, Truck } from 'lucide-react';

type OrganizationIconProps = {
  orgType: 'company' | 'chauffeur';
};

const OrganizationIcon = ({ orgType }: OrganizationIconProps) => {
  return (
    <div>
      {orgType === 'company' ? (
        <Building2 className='mr-2 h-5 w-5' />
      ) : (
        <Truck className='mr-2 h-5 w-5' />
      )}
    </div>
  );
};

export default OrganizationIcon;
