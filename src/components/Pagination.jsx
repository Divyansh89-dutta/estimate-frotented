const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={prevDisabled}
          className="px-4 py-1.5 text-sm rounded-full border
            border-slate-300 dark:border-slate-700
            bg-white dark:bg-slate-800
            text-slate-700 dark:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-700
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        <div className="px-4 py-1.5 rounded-full text-sm font-medium
          bg-indigo-100 text-indigo-700
          dark:bg-indigo-900/40 dark:text-indigo-300">
          {page}
        </div>

        <button
          onClick={() => onChange(page + 1)}
          disabled={nextDisabled}
          className="px-4 py-1.5 text-sm rounded-full border
            border-slate-300 dark:border-slate-700
            bg-white dark:bg-slate-800
            text-slate-700 dark:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-700
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
