import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { logo } from "../../assets/Assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" ><img src={logo} alt="Menu-Logo"/></a>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:text-black-300 border p-2 rounded-full">AI Resume Checker</Link></li>


        {/* <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li><a href="#" className="hover:text-gray-300">Services</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li> */}
        </ul>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center bg-gray-700 p-4 rounded-lg">
          <li><Link to="#" className="block py-2">AI Resume Checker</Link></li>
          {/* <li><a href="#" className="block py-2">About</a></li>
          <li><a href="#" className="block py-2">Services</a></li>
          <li><a href="#" className="block py-2">Contact</a></li> */}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
