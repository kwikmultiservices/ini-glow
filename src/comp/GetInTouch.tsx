import { FaRegArrowAltCircleRight } from "react-icons/fa";
const GetInTouch = () => {
  return (
    <div className="bg-white py-8">
        <br />
      <div className="mx-5">
        {/* Newsletter Section */}
        <div className="mb-[3rem] md:mb-0 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold">Our Newsletter.</h3>
            <p className="text-gray-600 mt-2">Get instant news by subscribing to our daily newsletter</p>
          </div>
          <div className="flex mt-4 md:mt-0 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="border border-gray-300 p-2 rounded-l-lg w-full md:w-72 focus:outline-none focus:border-black"
            />
            <button className=" text-[1.4rem] bg-black text-white p-2 rounded-r-lg">
              <span className="material-icons"><FaRegArrowAltCircleRight/> </span>
            </button>
          </div>
        </div>

<br />
<br/>
        {/* Other Sections */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Our Locations Section */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold">Our Locations</h3>
            <p className="text-gray-600 mt-2">USA</p>
            <p className="text-gray-600">26 Palmer Street</p>
            <p className="text-gray-600">Houston, Texas.</p>
            <p className="text-gray-600">101233</p>
          </div>
          {/* WhatsApp Section */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold">WhatsApp</h3>
            <p className="text-gray-600 mt-2 flex items-center">
              <span className="material-icons text-green-500">whatsapp</span>
              <span className="ml-2">+44 7587 857715</span>
            </p>
          </div>
          {/* Scam_Doctor Section */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold">Scam_Doctor</h3>
            <div className="flex items-center mt-2 space-x-4">
              <a href="#" className="text-blue-700 hover:text-blue-900"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-black hover:text-gray-700"><i className="fas fa-times"></i></a>
              <a href="#" className="text-pink-600 hover:text-pink-800"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-blue-500 hover:text-blue-700"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
