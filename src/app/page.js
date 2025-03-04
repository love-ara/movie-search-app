'use client';
import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import MovieGrid from '../components/MovieGrid';
import { fetchTrendingMovies, searchMovies } from '@/lib/api';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTrendingMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const data = await searchMovies(query);
      if (!data) {
        setError('No movies found with that title');
      } else {
        setMovies(data);
      }
    } catch (err) {
      setError('An error occurred while fetching the movie data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-row w-full min-h-screen overflow-auto">
        <div className="w-full  px-4">

          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-center">Movie Search</h1>

            <SearchForm
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                loading={loading}
            />

          </div>


          {loading && (
              <div className="flex justify-center mb-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
              </div>
          )}

          {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {movies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                <MovieGrid movies={movies} />
              </div>
          )}

          {trendingMovies.length > 0 && movies.length === 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>
                <MovieGrid movies={trendingMovies} />
              </div>
          )}
        </div>
      </div>
  );
}
