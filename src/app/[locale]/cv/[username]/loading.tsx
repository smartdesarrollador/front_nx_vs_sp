export default function CVLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Nav skeleton */}
      <div className="fixed top-0 w-full z-50 h-16 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/60 dark:border-gray-700/60" />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-10 animate-pulse">
        {/* Print button placeholder */}
        <div className="flex justify-end mb-4">
          <div className="h-9 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* CV skeleton: sidebar + content */}
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-col gap-6">
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-8 flex flex-col gap-8">
            <div className="space-y-3">
              <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
