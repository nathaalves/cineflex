import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function SectionSelection () {

    const { movieId } = useParams();
    const [informations, setInformations] = useState({})

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promisse.then(response => {
            setInformations({...response.data})
        })
    }, [])

    function Day ( { id, weekday, date, showtimes } ) {
        return (
            <div className='day'>
                <h3>{weekday} - {date}</h3>
                <div className='hours-container'>
                    {showtimes.map(showtime =>
                    <Link to={`assentos/${showtime.id}`}>
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
                <div className='section-list'>
                    {informations.days ? informations.days.map( (day, index) =>
                        <Day
                            id={day.id}
                            weekday={day.weekday}
                            date={day.date}
                            showtimes={day.showtimes}
                            key={index}
                        />) : <></>}
                </div>
            </main>
            <footer className="footer">
                <div>
                    <img src={informations.posterURL} alt=''></img>
                </div>
                <h3>{informations.title}</h3>
            </footer>
        </>
        
    )
}