import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';
//
// export async function fetchTrendingMovies() {
//     try {
//         const popularTitles = ['Avengers', 'Batman', 'Spider', 'Star Wars', 'Jurassic'];
//         const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)];
//
//         const response = await axios.get(`${BASE_URL}?s=${randomTitle}&apikey=${API_KEY}`);
//
//         if (response.data.Response === 'True') {
//             return response.data.Search.slice(0, 6);
//         }
//         return [];
//     } catch (error) {
//         console.error('Error fetching trending movies:', error);
//         return [];
//     }
// }
//
// export async function searchMovies(query) {
//     try {
//         const response = await axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
//
//         if (response.data.Response === 'True') {
//             return response.data.Search;
//         }
//         return null;
//     } catch (error) {
//         console.error('Error searching movies:', error);
//         throw error;
//     }
// }
//
// export async function fetchMovieDetails(imdbID) {
//     try {
//         const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
//
//         if (response.data.Response === 'True') {
//             return response.data;
//         }
//         return null;
//     } catch (error) {
//         console.error('Error fetching movie details:', error);
//         throw error;
//     }
// }

// File: lib/api.js

export async function searchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data.Search;
        }
        return null;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

export async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

export async function fetchTrendingMovies() {
    // This is a simulated function since OMDB doesn't have a trending endpoint
    // You could replace this with actual trending movies from another API
    const popularTitles = ['Inception', 'The Matrix', 'Interstellar', 'The Dark Knight', 'Pulp Fiction'];
    const results = [];

    for (const title of popularTitles) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                results.push(data);
            }
        } catch (error) {
            console.error(`Error fetching ${title}:`, error);
        }
    }

    return results;
}