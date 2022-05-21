import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';
import Footer from './Footer';


export default function SectionSelection () {

    const { movieId } = useParams();
    const [informations, setInformations] = useState({});

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promisse.then(response => setInformations( {...response.data} ));
    }, [])

    function Day ( { weekday, date, showtimes} ) {
        return (
            <div className='day'>
                <h3>{weekday} - {date}</h3>
                <div className='hours-container'>
                    {showtimes.map((showtime, index) =>
                    <Link to={`assentos/${showtime.id}`} key={index}>
                        <div>{showtime.name}</div>
                    </Link> )}
                </div>
            </div>
        )
    }

    return (
        <>
            <main className="main section-selection">
                <h2>Selecione o horário</h2>
                <div className='main-content'>
                    {informations.days ? informations.days.map( (day, index) =>
                        <Day
                            weekday={day.weekday}
                            date={day.date}
                            showtimes={day.showtimes}
                            key={index}
                        />) : null}
                </div>
            </main>
            {informations.posterURL ? <Footer posterURL={informations.posterURL} title={informations.title}/> : null}
        </>
        
    )
}