import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "./Button";

export default function Success ( { information, setSelectedSeatsID, seatsName, setSeatsName, buyers} ) {

    function reset () {
        setSelectedSeatsID([]);
        setSeatsName([]);
    }

    function formatCpf ( cpf) {
        let formatedCpf = "";
        let index = 0;
        for (let i = 0; i < 14; i++) {

            if (i === 3 || i === 7) {
                formatedCpf += ".";
            } else if (i === 11) {
                formatedCpf += "-";
            } else {
                formatedCpf += cpf[index];
                index++
            }
        }
        return formatedCpf;
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
                    {buyers.map( (buyer, index) => 
                        <Buyer key={index}>
                            <SubText>Assento {seatsName[index]}</SubText>
                            <SubText>Nome: {buyer.nome}</SubText>
                            <SubText>CPF: {formatCpf(buyer.cpf)}</SubText>
                        </Buyer>
                    )}
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

const Buyer = styled.div`
    margin-top: 20px;
`