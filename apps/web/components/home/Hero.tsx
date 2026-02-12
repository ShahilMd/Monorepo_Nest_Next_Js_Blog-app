import React from 'react'
import { Titan_One } from 'next/font/google'

const titanOne = Titan_One({
  weight: '400',
  subsets: ['latin'],
})

function Hero() {
  return (
    <div>
        <h1 className={`flex items-center justify-center text-4xl md:text-6xl ${titanOne.className}`}>
            BLOGS <span className='bg-transparent outline-text mx-3'>THAT</span> INSPIRE
        </h1>
    </div>
  )
}

export default Hero