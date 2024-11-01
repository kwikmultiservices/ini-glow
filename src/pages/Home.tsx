import { useEffect} from 'react';
import Navbar from '../comp/Navbar';
import Footer from '../comp/Footer';

import Banner from '../comp/Banner';

import OurService from '../comp/OurServiceSection';

import CryptoNews from '../comp/CryptoNews';
import HairShowcase from '../comp/HairShowcase';
import ShowOnlyCategory from '../comp/ShowOnlyCategory';



function Home() {


  useEffect(() => {
   
  }, []);

  return (
    <div>
      <Navbar  />
      <Banner/>
      <ShowOnlyCategory/>
      {/* <ServiceSection/> */}
      <OurService/>

      {/* <TestimonialsSection/> */}
      <CryptoNews/>
      <HairShowcase/>
      <Footer/>
    </div>  );
}

export default Home;
