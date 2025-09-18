const NoteUpdateSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100">
            <div className="card-body space-y-6">
              <div className="skeleton h-8 w-56"></div>

              <div className="space-y-3">
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-12 w-full rounded-md"></div>
              </div>

              <div className="space-y-3">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-32 w-full rounded-md"></div>
              </div>

              <div className="card-actions justify-end">
                <div className="skeleton h-12 w-32 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteUpdateSkeleton;
