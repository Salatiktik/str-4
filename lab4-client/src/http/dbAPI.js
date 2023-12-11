import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getMovies = async () => {
    const {data} = await $authHost.get('api/movie')
    return data
}

export const getGenres = async () => {
    const {data} = await $authHost.get('api/movie/genres')
    return data
}

export const getFilteredMovies = async (genres, rfrom, rto) => {
    if(genres[0]){
        const {data} = await $authHost.get(`api/movie?genres=[${genres}]&rfrom=${rfrom}&rto=${rto}`)
        return data
    }
    else{
        const {data} = await $authHost.get(`api/movie?rfrom=${rfrom}&rto=${rto}`)
        return data
    }
}

export const getAdminData = async(mode) => {
    const {data} = await $authHost.get(`api/admin/${mode}`)
    console.log(`api/admin/${mode}`)

    return data
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete(`api/admin/users/${id}`)
    return data
}

export const deleteMovie = async (id) => {
    const {data} = await $authHost.delete(`api/admin/movies/${id}`)
    return data
}

export const deleteReview = async (id) => {
    const {data} = await $authHost.delete(`api/admin/reviews/${id}`)
    return data
}

export const deleteGenre = async (id) => {
    const {data} = await $authHost.delete(`api/admin/genres/${id}`)
    return data
}

export const updateGenre = async (id, name) => {
    const {data} = await $authHost.post(`api/admin/genres/${id}?name=${name}`)
    return data
}

export const createGenre = async (name) => {
    const {data} = await $authHost.post(`api/admin/genres?name=${name}`)
    return data
}

export const updateUser = async (id, email, password,role) => {
    const {data} = await $authHost.post(`api/admin/users/${id}?email=${email}&password=${password}&role=${role}`)
    return data
}

export const createUser = async (email, password,role) => {
    const {data} = await $authHost.post(`api/admin/users?email=${email}&password=${password}&role=${role}`)
    return data
}

export const updateReview = async (id, text, rate, userId, movieId, date) => {
    console.log(`api/admin/reviews/${id}?text=${text}&rate=${rate}&userId=${userId}&movieId=${movieId}&date=${date}`)
    const {data} = await $authHost.post(`api/admin/reviews/${id}?text=${text}&rate=${rate}&userId=${userId}&movieId=${movieId}&date=${date}`)
    return data
}

export const createReview = async (text, rate, userId, movieId, date) => {
    
    const {data} = await $authHost.post(`api/admin/reviews?text=${text}&rate=${rate}&userId=${userId}&movieId=${movieId}&date=${date}`)
    return data
}

export const updateMovie = async (id, name, country, duration, poster, rating, genres) => {
    const formData = new FormData();
    formData.append('file', poster);
    console.log(`api/admin/movies/${id}?name=${name}&country=${country}&duration=${duration}&rating=${rating}&genres=[${genres}]&posterUrl=${poster.name}`)
    const {data} = await $authHost.post(`api/admin/movies/${id}?name=${name}&country=${country}&duration=${duration}&rating=${rating}&genres=[${genres}]&posterUrl=${poster.name}`, formData)
    //return data
}

export const createMovie = async (name, country, duration, poster, rating, genres) => {
    const formData = new FormData();
    formData.append('file', poster);
    //console.log(`api/admin/movies/${id}?name=${name}&country=${country}&duration=${duration}&rate=${rate}&genres=[${genres}]&posterUrl=${poster.name}`)
    const {data} = await $authHost.post(`api/admin/movies?name=${name}&country=${country}&duration=${duration}&rating=${rating}&genres=[${genres}]&posterUrl=${poster.name}`, formData)
    return data
}

export const getMovie = async (id) => {
    const {data} = await $authHost.get(`api/movie/${id}`)
    return data
}

export const getMovieGenres = async (id) => {
    const {data} = await $authHost.get(`api/movie/${id}/genres`)
    return data
}

export const getMovieReviews = async (id) => {
    const {data} = await $authHost.get(`api/movie/${id}/reviews`)
    return data
}

export const getPoster = async (posterUrl) => {

    const imageResponse = await $authHost.get(`api/movie/p/${posterUrl}`);
    console.log(imageResponse)
    const base64Image = imageResponse.data.data;

    return `data:image/jpeg;base64, ${base64Image}`;
  };

export const getUser = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}`)
    return data
}

export const sendReview = async(userId, movieId, rate, text) => {
    const {data} = await $authHost.post(`api/movie?userId=${userId}&movieId=${movieId}&rate=${rate}&text=${text}`)
    return data
}