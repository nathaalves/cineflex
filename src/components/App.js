import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MovieSelection from "./MovieSelection";
import SectionSelection from "./SectionSelection";


export default function App () {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MovieSelection />} />
                    <Route path="/sessoes/:movieId" element={<SectionSelection />} />
                </Routes>
            </BrowserRouter>
            
        </>
    )
}