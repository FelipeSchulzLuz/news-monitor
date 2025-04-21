import {Route, Routes} from 'react-router-dom';
import {NavBar} from '@/components/NavBar';
import {AboutPage} from '@/screens/About';
import {ResultsPage} from "./screens/Results";
import {HomePage} from "./screens/Home";

export default function App() {
    return (
        <>
            <NavBar />
            <div style={{ paddingTop: 64 }}>
                <Routes>
                    <Route path="/"       element={<HomePage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/about"  element={<AboutPage />} />
                </Routes>
            </div>
        </>
    );
}
