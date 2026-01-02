export default function MovieDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-black p-5 animate-pulse">
            <div className="h-10 w-1/2 bg-gray-700 mb-6 rounded" />
            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-600px h-600px bg-gray-700 rounded" />
                <div className="space-y-4">
                    <div className="h-6 bg-gray-700 rounded" />
                    <div className="h-6 bg-gray-700 rounded" />
                    <div className="h-6 bg-gray-700 rounded" />
                    <div className="h-6 bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    );
}
