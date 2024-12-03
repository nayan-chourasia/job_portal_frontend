import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Company Name */}
          <h1 className="text-lg font-bold text-gray-400">Get<span className='text-green-500'>Applied</span></h1>

          {/* Navigation Links */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">Home</a>
            <a href="#" className="text-gray-400 hover:text-white">Jobs</a>
            <a href="#" className="text-gray-400 hover:text-white">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm mt-2 md:mt-0">
            &copy; 2024 Dream Job. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer