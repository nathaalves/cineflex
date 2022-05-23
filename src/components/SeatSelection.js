import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect} from "react";
import Footer from './Footer';
import Button from './Button';

export default function SeatSelection ( { 
    information,
    setInformation, 
    selectedSeatsID,
    setSelectedSeatsID,
    seatsName, 
    setSeatsName, 
    buyers,
    setBuyers,
    }) {

    const { sectionId } = useParams();

    useEffect( () => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionId}/seats`);
        promisse.then( response => setInformation( {...response.data} ));
    }, [])

    function selectSeat (seatId, seatName, isAvailable) {

        if (isAvailable) {
            
            if (selectedSeatsID.includes(seatId)) {

                const index = buyers.findIndex( obj => obj.idAssento === seatId);

                let isOK = true
                if (buyers[index].nome !== "" || buyers[index].cpf !== "") {
                    isOK = window.confirm("Você gostaria realmente de remover o assento e apagar os dados?");
                }

                if (isOK) {
                    selectedSeatsID.splice(selectedSeatsID.indexOf(seatId), 1);
                    seatsName.splice(seatsName.indexOf(seatName), 1);
                    buyers.splice(index, 1);
                }
            } else {

                selectedSeatsID.push(seatId);
                seatsName.push(seatName);
                buyers.push({
                    idAssento: seatId,
                    nome: "",
                    cpf: ""
                })
            }
            
            selectedSeatsID.sort( (a, b) => a - b )
            seatsName.sort( (a, b) => a - b )
            buyers.sort( (a, b) => a.idAssento - b.idAssento )

            setSelectedSeatsID([...selectedSeatsID]);
            setSeatsName([...seatsName]);
            setBuyers([...buyers])
        } else {
            alert("Esse assento não está disponível!");
        }
    }

    function defineClass (status, id) {

        if (status) {
            if (selectedSeatsID.includes(id)) {
                return 'seat selected';
            } else {
                return 'seat';
            }
        }
        return 'seat unavailable';
    }

    function reserveSeats () {
        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
            ids: selectedSeatsID,
            compradores: buyers
        })
    }

    function inputText (e, seatId, type) {
        e.stopPropagation();
        let text = e.target.value

        if (type === "name") {
            buyers[buyers.findIndex( obj => obj.idAssento === seatId)].nome = text
        }
        if (type === "cpf") {
            buyers[buyers.findIndex( obj => obj.idAssento === seatId)].cpf = text
        }
        setBuyers([...buyers])
    }

    function Input ( {seatId} ) {
        return (
            <InputBox>
                <h3>Nome do comprador:</h3>
                <input 
                    placeholder='Digite seu nome...' 
                    onChange={ (e) => inputText(e, seatId, "name") } 
                    value={buyers[buyers.findIndex( buyer => buyer.idAssento === seatId)].nome}
                ></input>
                <h3>CPF do comprador:</h3>
                <input 
                    placeholder='Digite seu CPF...' 
                    onChange={ (e) => inputText(e, seatId, "cpf") } 
                    value={buyers[buyers.findIndex( buyer => buyer.idAssento === seatId)].cpf}
                ></input>
            </InputBox>
        )
    }

    return (
        <>
            <Container>
                <h2>Selecione o(s) assento(s)</h2>
                <SeatsContainer>
                    { information.seats ? 
                        information.seats.map( (seat, index) => 
                            <div 
                                className={ defineClass(seat.isAvailable, seat.id) } 
                                onClick={ () => selectSeat (seat.id, seat.name, seat.isAvailable) } 
                                key={index} 
                            >
                                { (index < 9) ? '0' + (index + 1) : index + 1 }
                            </div>
                        )
                    : null }
                </SeatsContainer>
                <Subtitle>
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
                </Subtitle>
                <BookingInformations>
                    {selectedSeatsID.map( (seatId, index) =>  <Input key={index} seatId={seatId}/>)}
                </BookingInformations>
                <Link to={ "/sucesso" } >
                    <Button onClick={ reserveSeats }>Reservar assento(s)</Button>
                </Link>
            </Container>
            { information.movie ? 
                <Footer 
                    posterURL={information.movie.posterURL} 
                    title={information.movie.title} 
                    weekday={information.day.weekday} 
                    name={information.name} 
                /> 
            : null}
        </>
    )
}

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 186px);
    overflow-y: scroll;

    & > h2 {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;
        color: #293845;

        margin: 40px 0;
    }

    .seat {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 26px;
        height: 26px;
        background-color: #C3CFD9;
        border: 1px solid #808F9D;
        border-radius: 50%;

        font-family: 'Roboto';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.04em;
        color: #000000;
        cursor: pointer;
    }

    .selected {
        background-color: #8DD7CF;
        border: 1px solid #1AAE9E;
    }

    .unavailable {
        background-color: #FBE192;
        border: 1px solid #F7C52B;
        cursor: default;
    }
`

const SeatsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 323px;
    height: 200px;
    gap: 7px;
`

const Subtitle = styled.div`
    display: flex;
    justify-content: space-between;

    width: 280px;
    margin-top: 15px;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: -0.013em;
    color: #4E5A65;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    span {
        margin-top: 5px;
    }

    .seat {
        cursor: default;
    }
`

const InputBox = styled.div`

    margin-top: 40px;

    h3 {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: #293845;
        margin-bottom: 3px;
    }

    input{
        width: 328px;
        height: 50px;
        padding-left: 10px;
        margin-bottom: 10px;

        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: #293845;
    }

    input::placeholder{
        font-style: italic;
        color: #AFAFAF;
    }
`
const BookingInformations = styled.div`
    /* overflow-y: hidden; */
`