import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "@/pages/Login.jsx";
import {Header} from "@/components/Header.jsx";
import {Signup} from "@/pages/Signup.jsx";
import {PrivateRoutes, PublicRoutes} from "@/lib/router.jsx";
import {Patients} from "@/pages/Patients.jsx";
import {Patient} from "@/pages/Patient.jsx";

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<main className="container">Home</main>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/patients" element={<Patients />} />
                <Route path="/patient/:id" element={<Patient />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
