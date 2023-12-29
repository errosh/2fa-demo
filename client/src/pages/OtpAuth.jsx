import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HttpRequest } from '../utils/axios';

function OtpAuth() {
  const[qrcode,setQrcode] = useState("")
  const[otp,setOtp] = useState("")
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(()=>{
    const getQR = async()=>{
        const response = await HttpRequest('/authenticate','POST',{token:token})
        setQrcode(response)
    }
     getQR()
  },[])

  const handleChange = (e) => {
    setOtp(e.target.value)
  }

  const VerifyOTP = async() => {
    const response = await HttpRequest('/verify','POST',{token,otp})
    if(response.verify){
      localStorage.setItem('2fa_verify', response.verify)
      navigate('/dashboard')
    }else{
      alert('Invalid OTP')
    }
  }

  return (
    <div className='mx-auto justify-center flex items-center mt-10'>
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
 
  <div className='flex justify-center items-center' dangerouslySetInnerHTML={{__html:qrcode}}></div>
  <div className='mb-2'>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123456"
                  onChange={handleChange}
                  value={otp}
                />
              </div>
  <button
    type="button"
    onClick={VerifyOTP}
    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    Verify
  </button>
</div>
</div>

  )
}

export default OtpAuth