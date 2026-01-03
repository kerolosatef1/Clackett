import Link from 'next/link';
interface ServerPaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}
export default function Pagination({
    currentPage,
    totalPages,
    basePath = '/'
}: ServerPaginationProps) {
    const maxPagesToShow = 1;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        } else {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    }

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const buildUrl = (page: number) => {
        if (basePath === '/') {
            return page === 1 ? '/' : `/?page=${page}`;
        }
        return `${basePath}?page=${page}`;
    };

    return (
        <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Pagination">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                    السابق
                </Link>
            ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
                    السابق
                </span>
            )}


            {startPage > 1 && (
                <>
                    <Link
                        href={buildUrl(1)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                        1
                    </Link>
                    {startPage > 2 && (
                        <span className="px-2 text-gray-500">.</span>
                    )}
                </>
            )}
            {pages.map((page) => (
                page === currentPage ? (
                    <span
                        key={page}
                        className="px-3 py-2 bg-red-600 text-white rounded font-bold"
                        aria-current="page"
                    >
                        {page}
                    </span>
                ) : (
                    <Link
                        key={page}
                        href={buildUrl(page)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                        {page}
                    </Link>
                )
            ))}


            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}
                    <Link
                        href={buildUrl(totalPages)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                        {totalPages}
                    </Link>
                </>
            )}


            {currentPage < totalPages ? (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                    التالي 
                </Link>
            ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
                    التالي 
                </span>
            )}
        </nav>
    );
}