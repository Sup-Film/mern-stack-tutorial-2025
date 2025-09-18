const NoteCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200/60">
      <div className="card-body gap-4">
        <div className="space-y-3">
          <div className="skeleton h-5 w-3/4"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-5/6"></div>
          <div className="skeleton h-4 w-4/6"></div>
        </div>
        <div className="card-actions justify-between items-center pt-3">
          <div className="skeleton h-4 w-24"></div>
          <div className="flex items-center gap-2">
            <div className="skeleton size-9 rounded-full"></div>
            <div className="skeleton size-9 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;
