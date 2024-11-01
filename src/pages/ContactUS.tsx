import React, { useEffect, useState } from 'react'
import Navbar from '../comp/Navbar'
import Footer from '../comp/Footer'
import ContactUsBanner from '../comp/ContactUsBanner'
import ContactUs from '../comp/ContactUsMain'
import HairShowcase from '../comp/HairShowcase'
import ContactInfo from '../comp/ContactInfo'
import { Applicationdata } from '../Services/interface'
import { getApplication } from '../Services/GetUser.service'
import MapComponent from '../comp/GoogleMap'

function ContactUS() {
  const [Application, setapplication] = useState<Applicationdata>();

  useEffect(() => {
    getApplication(null, (postData: any) => {
      setapplication(postData);
    });
  }, []);
  return (
    <div>
        <Navbar/>
        <ContactUsBanner/>
        <ContactInfo/>
        <ContactUs/>
        <MapComponent address={Application?.address as string}/>
        <Footer/>
    </div>
  )
}

export default ContactUS