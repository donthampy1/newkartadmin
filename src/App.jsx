
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home';
import Footer from './components/Footer';
import AdminPanel from './assets/pages/AdminPanel';
import Users from './assets/pages/Users';
import Sellers from './assets/pages/Sellers';
import Orders from './assets/pages/Orders';


function App() {

  return (
    <>
  <div className='px-4 sm:px-[5vw]   md:px-[4vw] lg:px-[3vw]'>
    <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/adminpanel' element={<AdminPanel/>} />
      <Route path='/users' element={<Users/>} />
      <Route path='/sellers' element={<Sellers/>} />
      <Route path='/orders' element={<Orders/>} />


    </Routes>
    <Footer/>

    </Router>
    </div>     
      
    </>
  )
}

export default App
