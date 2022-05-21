import { Link } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function MovieSelection () {

    const [movies, setMovies] = useState([]);

    useEffect( () => {
        const promisse = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');
        promisse.then(response => setMovies( [...response.data] ));
    }, [])

    function Movie ({ source, id }) {
        return (
            <Link to={`/sessoes/${id}`}>
                <div className="movie">
                    <img src={source} alt=""></img>
                </div>
            </Link>
        )
    }

    return (
        <main className="main movie-selection">
            <h2>Selecione o filme</h2>
            <div className="movies-list">
                {movies.map((movie, index) => <Movie source={movie.posterURL} id={movie.id} key={index} />)}
            </div>
        </main>
    )
}