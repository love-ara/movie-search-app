'use client'
import Link from 'next/link';
import Image from "next/image";

export default function MovieCard({ movie }) {
    return (
            <div className="flex justify-evenly">
                <Link href={`/movie/${movie.imdbID}`} passHref style={{
                    textDecoration: 'none',
                    color: 'Black',
                }}>

                {movie.Poster && movie.Poster !== 'N/A' ? (
                    <Image
                        src={movie.Poster}
                        width={500}
                        height={400}
                        alt={`${movie.Title} poster`}
                        className='rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
                    />
                ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
                        <p>No poster available</p>
                    </div>
                )}

                <div className="py-3 px-4 bg-zinc-50 border border-t-0 rounded-b-lg">
                    <h2 className="font-semibold line-clamp-1">{movie.Title}</h2>
                    <p className="text-gray-600">{movie.Year}</p>
                </div>
                </Link>

            </div>
    );
}