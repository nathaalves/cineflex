import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import MovieSelection from "./MovieSelection";
import SectionSelection from "./SectionSelection";
import SeatSelection from "./SeatSelection";
import Success from "./Success"


export default function App () {

    const [information, setInformation] = useState({});
    const [seatsName, setSeatsName] = useState([]);
    const [cpf, setCpf] = useState("")
    const [name, setName] = useState("")

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MovieSelection />} />
                    <Route path="/sessoes/:movieId" element={<SectionSelection />} />
                    <Route path="/sessoes/:movieId/assentos/:sectionId" 
                        element={ <SeatSelection
                            information={information}
                            setInformation={setInformation}
                            seatsName={seatsName}
                            setSeatsName={setSeatsName}
                            cpf={cpf}
                            setCpf={setCpf}
                            name={name}
                            setName={setName}
                        />}
                     />
                    <Route path="/sucesso" 
                        element={ <Success
                            information={information}
                            seatsName={seatsName}
                            cpf={cpf}
                            name={name}
                         />}
                     />
                </Routes>
            </BrowserRouter>
        </>
    )
}