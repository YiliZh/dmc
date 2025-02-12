import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Root from "./components/Root";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import data from "./db/data.json";


function App() {
    const { meetings } = data; 
    return (
        <Router>
            <Container>
                <Root />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar data={meetings}/>} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
