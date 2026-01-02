// app/not-found.tsx
import Image from "next/image";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-5">
      <h1 className="text-6xl font-extrabold mb-4 text-red-600 animate-pulse">404</h1>
      <h2 className="text-3xl font-bold mb-6">الصفحة غير موجودة</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        عذراً، الصفحة التي تبحث عنها غير متوفرة أو ربما تم نقلها. جرب العودة للصفحة الرئيسية.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-semibold"
      >
        العودة للصفحة الرئيسية
      </Link>
      <div className="mt-10">
       
        <Image
          src="/not-found.png"
          alt="Not Found Illustration"
          className="opacity-70"
          width={256}
          height={256}
        />
      </div>
    </div>
  );
}
