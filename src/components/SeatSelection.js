import { useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function SeatSelection () {
    const { sectionId } = useParams();
    console.log(sectionId)
    const [seatsInf, setSeatsInf] = useState({})

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionId}/seats`);
        promisse.then(response => {
            console.log("ok")
            console.log(response.data)
            setSeatsInf({...response.data})
        })
        promisse.catch(() => {
            console.log("ok")
        })
    }, [])

    return (
        <>
            <main className="main">
                <h2>Selecione o(s) assento(s)</h2>
                <div className='main-content'>

                </div>
            </main>
            <footer className="footer">
                <div>
                    <img src={seatsInf.movie.posterURL} alt=''></img>
                </div>
                <h3>{seatsInf.movie.title}</h3>
                <h3>{seatsInf.day.weekday} - {seatsInf.name}</h3>
            </footer>
        </>
    )
}