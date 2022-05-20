import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "./Button";

export default function Success ( { information, setSelectedSeatsID, seatsName, setSeatsName, cpf, name} ) {

    function reset () {
        setSelectedSeatsID([]);
        setSeatsName([]);
    }

    return (
        < >
            <Title>
                <Text color='#247A6B'>Pedido feito</Text>
                <Text color='#247A6B'>com sucesso!</Text>
            </Title>
            <BookingContainer>
                <div>
                    <Text>Filme e sessão</Text>
                    <SubText>{information.movie.title}</SubText>
                    <SubText>{information.day.date} {information.name}</SubText>
                </div>
                <div>
                    <Text>Ingressos</Text>
                    {seatsName.sort( (a, b) => a - b ).map( (name, index) => <SubText key={index}>Assento {name}</SubText>)}
                </div>
                <div>
                    <Text>Comprador</Text>
                    <SubText>Nome: {name}</SubText>
                    <SubText>CPF: {cpf}</SubText>
                </div>
            </BookingContainer>
            <Link to="/">
                <Button onClick={ reset } >Voltar para Home</Button>
            </Link>
        </>
    )
}

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
`

const Text = styled.h2`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: ${props => props.color ? props => props.color : '#293845'};
    margin-bottom: 6px;
`

const SubText = styled.h3`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.04em;
    color: #293845;
`
const BookingContainer = styled.div`
    width: 100vw;
    padding: 0 30px;

    & > div {
        margin-bottom: 30px;
    }
`