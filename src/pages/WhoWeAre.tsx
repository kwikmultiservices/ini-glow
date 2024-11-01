import WhoWeAreBanner from '../comp/WhoWeAreBanner'
import Navbar from '../comp/Navbar'
import Footer from '../comp/Footer'
import CryptoNews from '../comp/CryptoNews';
import OurService from '../comp/OurServiceSection';
function WhoWeAre() {
  return (
    <div>
        <Navbar/>
        <WhoWeAreBanner/>
        <OurService/>
        <CryptoNews/>
        <Footer/>
    </div>
  )
}

export default WhoWeAre