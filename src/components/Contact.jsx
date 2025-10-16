import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// ❌ REMOVED: import { FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [state, handleSubmitFormspree, resetFormspree] = useForm("mldpnlgb");
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonText, setButtonText] = useState('Send Message');

  // --- useEffect for Success Handling ---
  useEffect(() => {
    let timer;
    let buttonTimer;

    if (state.succeeded) {
        setShowSuccess(true);
        setButtonText('Sent!');
        
        timer = setTimeout(() => {
            setShowSuccess(false);
            setButtonText('Send Message'); 
            resetFormspree(); 
        }, 3000); 

    } else if (state.submitting) {
        setButtonText('Submitting...');
    } else if (state.errors) {
        setButtonText('Send Message');
    } else if (!state.submitting && !state.succeeded) {
        setButtonText('Send Message');
    }

    // Cleanup function
    return () => {
        clearTimeout(timer);
        clearTimeout(buttonTimer);
    };
  }, [state.succeeded, state.submitting, state.errors, resetFormspree]); 

  // Handler for all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      // Using toLowerCase() to handle potential name='Name' or name='name'
      [name.toLowerCase()]: value, 
    }));
  };

  // Custom handler to submit to Formspree and clear the form
  const handleCombinedSubmit = async (e) => {
    e.preventDefault();
    
    // Submit to Formspree
    const result = await handleSubmitFormspree(e); 
    
    // Clear local state/form fields immediately after successful submission
    if (result && result.succeeded) {
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    }
  };
    
  // Conditional Success Message Component 
  const SuccessMessage = () => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }} 
        className="flex items-center p-4 mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-lg"
    >
        {/* ✅ Replacement: Using a simple text checkmark for the icon */}
        <span className="text-green-500 mr-3 text-xl font-bold flex-shrink-0">✓</span> 
        <p className="font-semibold">Message sent successfully! Thank you.</p>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{opacity:0, y:100}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1, y:0}}
      viewport={{once: true}}
      className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='Contact'>
      
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Contact <span className='
        underline underline-offset-4 decoration-1 under font-light'>With Us</span></h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Ready to make a move? Let's Build Your Future Together.
      </p>

      <form
        onSubmit={handleCombinedSubmit}
        className='max-w-2xl mx-auto text-gray-600 pt-8'>
        
        {showSuccess && <SuccessMessage />}
        
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 text-left'>Your Name
            <input 
              className='w-full border border-gray-300 rounded py-3 px-4 mt-2' 
              type="text" 
              name='name' 
              placeholder='Your Name' 
              required
              value={formData.name} 
              onChange={handleChange}
            />
          </div>
          <div className='w-full md:w-1/2 text-left md:pl-4'>Your Email
            <input 
              className='w-full border border-gray-300 rounded py-3 px-4 mt-2' 
              type="email" 
              name='email' 
              placeholder='Your Email' 
              required
              value={formData.email} 
              onChange={handleChange}
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
          </div>
        </div>
        
        <div className='my-6 text-left'>
          Message
          <textarea 
            className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none'
            name="message" 
            placeholder='Message' 
            required
            value={formData.message} 
            onChange={handleChange}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={state.submitting || buttonText === 'Sent!'}
          className='bg-blue-600 text-white py-2 px-12 mb-10 rounded disabled:opacity-50 transition duration-150'>
          {buttonText}
        </button>
      </form>

    </motion.div>
  )
}

export default Contact;