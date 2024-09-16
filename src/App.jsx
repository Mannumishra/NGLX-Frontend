import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import ShopAll from './Components/ShopAll/ShopAll'
import Contact from './Components/Contact/Contact'
import Cart from './Components/Cart/Cart'
import SingleProductPage from './Components/SingleProductPage/SingleProductPage'
import SinglePage from './Components/SinglePage/SinglePage'
import { Toaster } from 'react-hot-toast'
import Privacy from './Components/Privacy'
import Term from './Components/Term/Term'
import About from './Components/About/About'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Profile from './Components/Profile/Profile'
import EmailVerification from './Components/Auth/EmailVerification'
import ForgetPassword from './Components/Auth/ForgetPassword'
import FinalCart from './Components/Cart/FinalCart'
import MyChangePassword from './Components/ChangePassword/MyChangePassword'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop-All' element={<ShopAll />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/term' element={<Term />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register/email-verificaton/:email' element={<EmailVerification />} />
          <Route path='/email-verificaton' element={<EmailVerification />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/cart/finalcart' element={<FinalCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Shop-All/singleProductPage' element={<SingleProductPage />} />
          <Route path='/Shop-All/getProductsByCategory/:category' element={<SingleProductPage />} />
          <Route path='/Shop-All/getProductsByCategory/:category/single-page/:_id' element={<SinglePage />} />
          <Route path='/singleProductPage/single-page' element={<SinglePage />} />
          <Route path='/single-page/:_id' element={<SinglePage />} />
          <Route path='/change-password' element={<MyChangePassword />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
