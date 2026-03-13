export default function LandingLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-16 bg-gray-200 dark:bg-gray-700 w-full" />
      <div className="h-72 bg-gray-300 dark:bg-gray-600 w-full" />
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
