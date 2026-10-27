export function RecipeCardSkeleton() {
  return (
    <div className="bg-[#FFFFFF] border border-[#E6E8E3] rounded-lg flex flex-col h-full animate-pulse overflow-hidden">
      <div className="aspect-4/3 sm:aspect-16/10 w-full bg-[#F0F2ED]" />

      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1.5">
          <div className="h-3 bg-[#E5E8E2] rounded w-1/3" />
          <div className="h-4 bg-[#E5E8E2] rounded w-5/6" />
          <div className="h-3 bg-[#F0F2ED] rounded w-full mt-2" />
          <div className="h-3 bg-[#F0F2ED] rounded w-4/5" />
        </div>

        <div className="pt-3 flex items-center justify-between">
          <div className="h-3 bg-[#E5E8E2] rounded w-16" />
          <div className="h-3 bg-[#F0F2ED] rounded w-8" />
        </div>
      </div>
    </div>
  );
}
