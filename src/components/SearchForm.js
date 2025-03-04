import {Button} from "@/components/ui/button";

export default function SearchForm({ query, setQuery, handleSearch, loading }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-12 mb-8 flex justify-center gap-9 items-center w-full h-30">
            <form onSubmit={handleSearch} className="flex flex-row md:flex-row p-4 items-center w-2 h-3 max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a movie title"
                    className="px-12 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <Button variant='ghost'
                    type="submit"
                    className="
                    w-5 h-5 hover:text-darkColor
                    hoverEffect
                    px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </form>
        </div>
    );
}


