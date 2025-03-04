'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchMovieDetails } from '@/lib/api';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setDetails(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovieDetails();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
          <Button
              onClick={handleGoBack}
              className="mt-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Button>
        </div>
    );
  }

  if (!details) {
    return null;
  }

  return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
            onClick={handleGoBack}
            variant="outline"
            className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              {details.Poster && details.Poster !== 'N/A' ? (
                  <Image
                      src={details.Poster}
                      width={500}
                      height={750}
                      alt={`${details.Title} poster`}
                      className="w-full h-auto"
                  />
              ) : (
                  <div className="w-full h-full min-h-64 bg-muted flex items-center justify-center">
                    <p>No poster available</p>
                  </div>
              )}
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-2">{details.Title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <p className="text-gray-600">{details.Year}</p>
                <span className="text-gray-600">•</span>
                <p className="text-gray-600">{details.Runtime}</p>
                <span className="text-gray-600">•</span>
                <p className="text-gray-600">{details.Rated}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {details.Genre.split(', ').map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                ))}
              </div>

              <div className="mb-4">
                <p className="font-semibold text-lg mb-1">Rating</p>
                <p className="mb-3">{details.imdbRating}/10 IMDb</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-lg mb-1">Plot</p>
                <p className="text-gray-700">{details.Plot}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-semibold mb-1">Director</p>
                  <p className="text-gray-700">{details.Director}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Writer</p>
                  <p className="text-gray-700">{details.Writer}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Actors</p>
                  <p className="text-gray-700">{details.Actors}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Released</p>
                  <p className="text-gray-700">{details.Released}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}