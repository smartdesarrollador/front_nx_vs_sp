export default function TarjetaLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm animate-pulse">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Bio */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>

        {/* Location */}
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

        {/* Contact buttons */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Social links grid */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
