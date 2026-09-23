export default function Loading() {
  return (
    <main className="mx-auto grid max-w-7xl animate-pulse gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="aspect-square rounded-2xl bg-gray-200" />
      <div className="flex flex-col justify-center gap-5">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-12 w-3/4 rounded bg-gray-200" />
        <div className="h-20 w-full rounded bg-gray-200" />
        <div className="h-12 w-full rounded bg-gray-200" />
      </div>
    </main>
  );
}
