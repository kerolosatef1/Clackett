'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
            كلاكيت
          </Link>

          <div className="flex gap-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${pathname === '/'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }`}
            >
              الرئيسية
            </Link>
            <Link
              href="/search"
              className={`px-4 py-2 rounded-lg transition-colors ${pathname === '/search'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }`}
            >
              بحث
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
