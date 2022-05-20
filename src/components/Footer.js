import styled from 'styled-components';

export default function Footer ( { posterURL, title, weekday, name } ) {
    return (
        <Container>
            <div>
                <img src={posterURL} alt=''></img>
            </div>
            <div>
                <h3>{title}</h3>
                {weekday ? <h3>{weekday} - {name}</h3> : null}
            </div>              
        </Container>
    )
}

const Container = styled.footer`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 118px;
    padding: 14px;
    border: 1px solid #9EADBA;
    background-color: #DFE6ED;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    color: #293845;

    img {
        width: 48px;
        height: 74px;
    }

    & div:first-child {
        width: 64px;
        height: 90px;
        padding: 8px;
        background-color: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-right: 15px;
    }
`