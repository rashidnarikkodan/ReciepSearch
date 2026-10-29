export function RecipeCardSkeleton() {
  return (
    <div className="bg-[#FFFFFF] border border-[#E6E8E3] rounded-lg flex flex-col h-full animate-pulse overflow-hidden">
      <div className="aspect-4/3 w-full bg-[#F0F2ED]" />

      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1.5">
          <div className="h-2.5 sm:h-3 bg-[#E5E8E2] rounded w-1/3" />
          <div className="h-3.5 sm:h-4 bg-[#E5E8E2] rounded w-5/6" />
        </div>

        <div className="pt-2 sm:pt-3 flex items-center justify-between border-t border-[#F0F2ED]">
          <div className="h-2.5 sm:h-3 bg-[#E5E8E2] rounded w-14" />
          <div className="h-2.5 sm:h-3 bg-[#F0F2ED] rounded w-8" />
        </div>
      </div>
    </div>
  );
}
