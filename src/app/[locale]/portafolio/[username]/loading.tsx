export default function PortfolioLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Nav skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-700 w-full" />
      {/* Profile hero skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-lg" />
      </div>
      {/* Tag filter skeleton */}
      <div className="flex gap-2 px-4 py-4 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        ))}
      </div>
      {/* Cards grid skeleton */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
