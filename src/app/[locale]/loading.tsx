export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-line" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-deep border-t-transparent" />
        </div>
        <p className="eyebrow text-muted animate-pulse">Loading</p>
      </div>
    </div>
  );
}
