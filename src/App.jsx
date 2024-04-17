import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "@/pages/Login.jsx";
import {Header} from "@/components/Header.jsx";
import {Signup} from "@/pages/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
          <Route path="/" element={<>Landing</>} />
            <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
