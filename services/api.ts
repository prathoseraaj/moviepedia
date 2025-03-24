export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API}`,
    }

}

export const fetchMovies = async ({query} : {query:string}) => {
    const endpoint = query ?
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response){
        //@ts-ignore
        throw new Error(`failed to fetch movies`, response.statustext);
        
    }

    const data = await response.json();
    return data.results; 

}

export const fetchMoiveDetails = async (movieId: string): Promise<MovieDetails> =>{
    try{
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key${TMDB_CONFIG.API_KEY}`, {
            method:'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response.ok){
            throw new Error('Failed to fetch the movie details');
        }
        const data = response.json()

        return data;
    }
    catch(error){
        console.log(error)
        throw error 
    }
}