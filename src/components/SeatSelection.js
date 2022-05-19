import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from 'axios';

let cpf = ""
export default function SeatSelection ( { 
    information,
    setInformation, 
    seatsName, 
    setSeatsName, 
    cpf, 
    setCpf, 
    name, 
    setName }) {

    const { sectionId } = useParams();
    //const [information, setInformation] = useState({});
    const [selectedSeatsID, setSelectedSeatsID] = useState([]);
    //const [cpf, setCpf] = useState("")
    //const [name, setName] = useState("")

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionId}/seats`);
        promisse.then(response => {
            setInformation({...response.data});
        })
    }, [])

    function selectSeat (id, name) {
        if (selectedSeatsID.includes(id)) {
            selectedSeatsID.splice(selectedSeatsID.indexOf(id), 1)
            seatsName.splice(seatsName.indexOf(name), 1)
        } else {
            selectedSeatsID.push(id)
            seatsName.push(name)
        }
        setSelectedSeatsID([...selectedSeatsID])
        setSeatsName([...seatsName])
    }

    function defineClass (status, id) {

        if (status) {
            if (selectedSeatsID.includes(id)) {
                return 'seat selected'
            } else {
                return 'seat'
            }
        }
        return 'seat unavailable'
    }

    function reserveSeats () {
        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
            ids: selectedSeatsID,
            name: name,
            cpf: cpf
        })
    }

    return (
        <>
            <main className="main">
                <h2>Selecione o(s) assento(s)</h2>
                <div className='seats'>
                    { information.id ? information.seats.map( (seat, index) => <div className={ defineClass(seat.isAvailable, seat.id) } onClick={ seat.isAvailable ? () => selectSeat (seat.id, seat.name) : null } key={index} >{ (index < 9) ? '0' + (index + 1) : index +1 }</div>) : null }
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
                <Link to={"/sucesso"}>
                    <div className='btn-reserve' onClick={ reserveSeats }>Reservar assento(s)</div>
                </Link>
            </main>
            <footer className="footer">
                <div className='poster'>
                    {information.id ? <img src={information.movie.posterURL} alt=''></img> : null} 
                </div>
                <div>
                    {information.id ? <h3>{information.movie.title}</h3> : null}
                    {information.id ? <h3>{information.day.weekday} - {information.name}</h3>: null}
                </div>              
            </footer>
        </>
    )
}