import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import ProductList from './ProductList'

function ViewProduct() {
    const navigate = useNavigate()
  return (
    <div>
            <AdminHeader/>
          <div className="text-center text-[2rem] p-5 font-extrabold text-black border-b-2  mb-10">
        Control Panel
      </div>
      <div className="">
      
        <button onClick={()=>navigate(-1)} className='bg-red-500 text-white p-2 rounded-md m-2'>Back</button>
     
        <Link to="/upload/admin">
        <button className='bg-purple-900 text-white p-2 rounded-md m-2'>Create New Product</button>
        </Link>
      </div>
      <ProductList/>
    </div>
  )
}

export default ViewProduct