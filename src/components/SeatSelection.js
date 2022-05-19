import { useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';

let cpf = ""
export default function SeatSelection () {

    const { sectionId } = useParams();
    const [seatsInf, setSeatsInf] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [cpf, setCpf] = useState("")
    const [name, setName] = useState("")

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionId}/seats`);
        promisse.then(response => {
            setSeatsInf({...response.data});
        })
    }, [])

    function selectSeat (id) {
        if (selectedSeats.includes(id)) {
            selectedSeats.splice(selectedSeats.indexOf(id), 1)
        } else {
            selectedSeats.push(id)
        }
        setSelectedSeats([...selectedSeats])
    }

    function defineClass (status, id) {

        if (status) {
            if (selectedSeats.includes(id)) {
                return 'seat selected'
            } else {
                return 'seat'
            }
        }
        return 'seat unavailable'
    }

    function reserveSeats () {
        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
            ids: selectedSeats,
            name: name,
            cpf: cpf
        })
    }

    return (
        <>
            <main className="main">
                <h2>Selecione o(s) assento(s)</h2>
                <div className='seats'>
                    { seatsInf.id ? seatsInf.seats.map( (seat, index) => <div className={ defineClass(seat.isAvailable, seat.id) } onClick={ seat.isAvailable ? () => selectSeat (seat.id) : null } key={index} >{ (index < 9) ? '0' + (index + 1) : index +1 }</div>) : null }
                </div>
                <div className='status'>
                    <div>
                        <div className='seat selected'></div>
                        <span>Selecionado</span>
                    </div>
                    <div>
                        <div className='seat available'></div>
                        <span>Disponível</span>
                    </div>
                    <div>
                        <div className='seat unavailable'></div>
                        <span>Indisponível</span>
                    </div>
                </div>
                <div className='input-container'>
                    <h3>Nome do comprador:</h3>
                    <input placeholder='Digite seu nome...' onChange={ (e) => setName(e.target.value)}></input>
                    <h3>CPF do comprador:</h3>
                    <input placeholder='Digite seu CPF...' onChange={ (e) => setCpf(e.target.value)}></input>
                </div>
                <div className='btn-reserve' onClick={ reserveSeats }>Reservar assento(s)</div>
            </main>
            <footer className="footer">
                <div className='poster'>
                    {seatsInf.id ? <img src={seatsInf.movie.posterURL} alt=''></img> : null} 
                </div>
                <div>
                    {seatsInf.id ? <h3>{seatsInf.movie.title}</h3> : null}
                    {seatsInf.id ? <h3>{seatsInf.day.weekday} - {seatsInf.name}</h3>: null}
                </div>              
            </footer>
        </>
    )
}