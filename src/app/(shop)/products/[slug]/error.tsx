"use client";

export default function ProductError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Unable to load this product
        </h1>
        <p className="mt-2 text-gray-600">
          Something went wrong while fetching the product.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-gray-950 px-5 py-2 font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
