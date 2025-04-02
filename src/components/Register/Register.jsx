import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginAnimy } from "../../assets/Assets";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    password: "",
    company_name: "",
    location: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch(
        "https://demo.needrecruiter.com/need-recruiter/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        setToken(data.token);
        toast.success("Register Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (data.error?.email) {
        toast.error(data.error.email[0], {
          position: "top-right",
          autoClose: 3000,
        });

        if (error?.mobile?.includes("The mobile has already been taken.")) {
          toast.error("This mobile number is already registered!", {
              position: "top-right",
              autoClose: 3000,
          });
      }
      } else {
        toast.error(data.message || "Registration Failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="w-[90vw]  sm:px-10   mx-auto md:px-10  pb-30 py-20 md:h-[100%] flex justify-between items-center">
      <div className="w-[50%] hidden md:block bg-cover bg-center">
        <img src={LoginAnimy} alt="Login Animation" />
      </div>
      <div className="w-[100%] lg:w-[50%] xl:w-[40%] xl:p-10    md:w-[40%] md:p-3  p-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="relative mt-5">
            <input
              id="name"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="name"
              placeholder=""
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              First Name
            </label>
          </div>

          {/* Last Name */}
          <div className="relative mt-5">
            <input
              id="lname"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="lname"
              placeholder=""
              value={formData.lname}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="lname"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              Last Name
            </label>
          </div>

          {/* Email */}
          <div className="relative mt-5">
            <input
              id="email"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              Email
            </label>
          </div>

          

          {/* Company Name */}
          <div className="relative mt-5">
            <input
              id="company_name"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="company_name"
              placeholder=""
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="company_name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              Company Name
            </label>
          </div>

          {/* Location */}
          <div className="relative mt-5">
            <input
              id="location"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="location"
              placeholder=""
              value={formData.location}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="location"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              Location
            </label>
          </div>

          {/* Mobile */}
          <div className="relative mt-5">
  {/* +91 Country Code */}
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 bg-white-900 px-2 py-1 rounded-md text-sm">
    +91
  </span>

  {/* Input Field */}
  <input
    id="mobile"
    className="block text-black pl-14 pr-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    type="tel"
    name="mobile"
    placeholder=""
    value={formData.mobile}
    onChange={handleChange}
    required
    pattern="[0-9]{10}"
  />

  {/* Floating Label */}
  <label
    htmlFor="mobile"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2  peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
  >
    Mobile Number
  </label>
</div>



          {/* Password */}
          <div className="relative mt-5 mb-30 md:mb-30">
            <input
              id="password"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
              title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."


            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
            >
              Password  
            </label>
            <span className="border rounded-2xl bg-gray-200 text-black   p-2 absolute text-center  text-gray-500 text-sm text top-15">
  Note:               Password must be
  1 uppercase, 1 number, 1 special character (@$!%*?&), at least 6 characters.
</span>

          </div>
         

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;