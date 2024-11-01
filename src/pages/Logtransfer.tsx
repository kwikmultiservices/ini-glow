import React from 'react'
import Navbar from '../comp/Navbar'
import Banner from '../comp/Banner';
import StoreBanner from '../comp/StoreBanner';
import ProductPage from '../comp/ProductStore';
import Footer from '../comp/Footer';

function Logtransfer() {
  return (
    <div>
       <Navbar  />
       <StoreBanner/>
       <ProductPage/>
       <Footer/>
    </div>
  )
}

export default Logtransfer