import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Login from "./pages/Login"
import Order from "./pages/Order"
import { RecoilRoot } from "recoil"


function App() {
  
  return (
    <RecoilRoot>
    <BrowserRouter>
          
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/orders' element={<Order />}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
