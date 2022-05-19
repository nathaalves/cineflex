import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Success ( { information, seatsName, cpf, name} ) {
    return (
        <main >
            <Title>
                <Text color='#247A6B'>Pedido feito</Text>
                <Text color='#247A6B'>com sucesso!</Text>
            </Title>
            <BookingContainer>
                <Information>
                    <Text>Filme e sessão</Text>
                    <SubText>{information.movie.title}</SubText>
                    <SubText>{information.day.date} {information.name}</SubText>
                </Information>
                <Information>
                    <Text>Ingressos</Text>
                    {seatsName.sort( (a, b) => a - b ).map(name => <SubText>Assento {name}</SubText>)}
                </Information>
                <Information>
                    <Text>Comprador</Text>
                    <SubText>Nome: {name}</SubText>
                    <SubText>CPF: {cpf}</SubText>
                </Information>
            </BookingContainer>
            <Link to="/">
                <Button>Voltar para Home</Button>
            </Link>
        </main>
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
`

const Information = styled.div`
    margin-bottom: 30px;
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 226px;
    height: 42px;
    border-radius: 3px;
    background-color: #E8833A;
    margin-top: 50px;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.04em;
    color: #FFFFFF;

    cursor: pointer;
`