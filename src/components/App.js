import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import MovieSelection from "./MovieSelection";
import SectionSelection from "./SectionSelection";
import SeatSelection from "./SeatSelection";
import Success from "./Success";


export default function App () {

    const [information, setInformation] = useState({});
    const [selectedSeatsID, setSelectedSeatsID] = useState([]);
    const [seatsName, setSeatsName] = useState([]);
    const [buyers, setBuyers] = useState([]);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MovieSelection />} />
                    <Route path="/sessoes/:movieId" element={<SectionSelection />} />
                    <Route 
                        path="/sessoes/:movieId/assentos/:sectionId" 
                        element={ 
                            <SeatSelection
                                information={information}
                                setInformation={setInformation}
                                selectedSeatsID={selectedSeatsID}
                                setSelectedSeatsID={setSelectedSeatsID}
                                seatsName={seatsName}
                                setSeatsName={setSeatsName}
                                buyers={buyers}
                                setBuyers={setBuyers}
                            />
                        }
                    />
                    <Route 
                        path="/sucesso" 
                        element={ 
                            <Success
                                information={information}
                                setSelectedSeatsID={setSelectedSeatsID}
                                seatsName={seatsName}
                                setSeatsName={setSeatsName}
                                buyers={buyers}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}