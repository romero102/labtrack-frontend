import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login"
import Users from "./pages/Users"
import UserForm from './pages/UserForm';
import Computers from "./pages/Computers"
import ComputerForm from './pages/ComputerForm';
import Laboratories from "./pages/Laboratories"
import LaboratoryForm from './pages/LaboratoryForm';
import Maintenance from "./pages/Maintenance"
import MaintenanceForm from './pages/MaintenanceForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path='/' element = {<h1>Home page</h1>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/users' element = {<Users/>}></Route>
          <Route path='/userform' element = {<UserForm/>}></Route>
          <Route path='/laboratories' element = {<Laboratories/>}></Route>
          <Route path='/laboratoryform' element = {<LaboratoryForm/>}></Route>
          <Route path='/computers' element = {<Computers />}></Route>
          <Route path='/computerform' element = {<ComputerForm />}></Route>
          <Route path='/maintenance' element = {<Maintenance/>}></Route>
          <Route path='/maintenanceform' element = {<MaintenanceForm/>}></Route>
          <Route path='/' element = {<h1>Home page</h1>}></Route>
          <Route path='/' element = {<h1>Home page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
