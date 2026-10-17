export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FBFBFA]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#ECEAE5]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#C51E28] border-t-transparent" />
        </div>
        <p className="text-[11px] font-semibold tracking-wider text-[#C51E28] uppercase animate-pulse">Loading</p>
      </div>
    </div>
  );
}
