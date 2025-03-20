import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-15 py-4">
      <div className="container p-5 mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "} 
          Developed by{" "}
          <a
            href="https://synchronage.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Synchronage
          </a>{" "}
          
           All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;
