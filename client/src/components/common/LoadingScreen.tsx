interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
      <div className="inline-flex items-center gap-2.5 text-xs text-[#737873] bg-[#FFFFFF] border border-[#E3E6E0] rounded-lg px-4 py-2.5">
        <span className="w-3.5 h-3.5 border-2 border-[#365B45] border-t-transparent rounded-full animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
}
