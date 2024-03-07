import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { DashBoard } from './Pages/DashBoard'
import {SendMoney} from './Pages/SendMoney'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<DashBoard/>}></Route>
      <Route path='/send' element={<SendMoney/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
