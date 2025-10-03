import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonials = () => {
  return (
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonials'>
      <motion.h1 
      initial={{opacity:0, x:-100}}
      transition={{duration: 1.4}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
      className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer <span className='
      underline underline-offset-4 decoration-1 under font-light'>Testimonials</span></motion.h1>
      <motion.p 
      initial={{opacity:0, x:100}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
      className='text-center text-gray-500 mb-12 max-w-80
      mx-auto'>Real Stories from Those who Found Home With Us.</motion.p>

      <div className='flex flex-wrap justify-center gap-5 '>
        {testimonialsData.map((testimonial, index)=>(
            <motion.div
      initial={{opacity:0, y:100}}
      transition={{duration: 1.6}}
      whileInView={{opacity: 1, y:0}}
      viewport={{once: true}}
            key={index} className='max-w-[310px]  shadow-2xl  rounded px-8 py-12
            text-center'>
                 <img className='w-20 h-20 rounded-full mx-auto mb-4' src={testimonial.image} alt={testimonial.alt} />
                 <h2 className='text-xl text-gray-700  font-medium'>{testimonial.name}</h2>
                 <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>
                 <div className='flex justify-center gap-1 text-red-500 mb-4'>
                    {Array.from({length: testimonial.rating}, (item, index)=>(
                       <img key={index} src={assets.star_icon}/>
                    ))}
                 </div>
                 <p className='text-gray-600'>{testimonial.text}</p>
            </motion.div>
        ))}
      </div>

    </div>
  )
}

export default Testimonials
