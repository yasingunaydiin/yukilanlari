const Skeleton = ({ className = '' }) => {
  return (
    <div className={`h-4 w-60 bg-gray-300 rounded-sm flex ${className}`}></div>
  );
};

export default Skeleton;
