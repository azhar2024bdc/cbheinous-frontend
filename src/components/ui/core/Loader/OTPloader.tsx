import { Loader } from 'lucide-react'
import React from 'react'

const OTPloader = () => {
  return (
    <div  className='fixed top-0 left-0 w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-screen z-[9999] overflow-hidden disabled:pointer-events-none cursor-not-allowed'>
        <Loader className='animate-spin text-primary' size={40} />
    </div>
  )
}

export default OTPloader