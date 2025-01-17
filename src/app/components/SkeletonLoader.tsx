'use client';
import { useEffect, useState } from 'react';
import Skeleton from './Skeleton';

const SkeletonLoader = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the delay as per your need

    return () => clearTimeout(timer);
  }, []);

  return <div>{isLoading ? <Skeleton className={className} /> : children}</div>;
};

export default SkeletonLoader;
