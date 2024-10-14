import { Skeleton } from "@/components/ui/skeleton";

interface LibrarySkeletonProps {
  width: number;
}

export function LibrarySkeleton({ width }: LibrarySkeletonProps) {
  return (
    <div className="grid gap-3">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 ${width < 280 && "m-auto"}`}
        >
          <Skeleton className="h-10 w-10 rounded-sm bg-[#353535]" />
          {width >= 280 && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px] bg-[#353535]" />
              <Skeleton className="h-4 w-[160px] bg-[#353535]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
