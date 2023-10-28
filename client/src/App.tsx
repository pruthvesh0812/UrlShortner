import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home"
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Account from "./pages/Account/Account";
import { RecoilRoot } from "recoil";

export default function App(){
    return (
        <BrowserRouter>
            <RecoilRoot >
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    )
    
}