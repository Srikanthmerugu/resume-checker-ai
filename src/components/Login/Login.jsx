import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LoginAnimy } from "../../assets/Assets";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
    const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();



    setError(""); 
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      // toast.success("Login Successful!", { position: "top-right", autoClose: 3000 });
      navigate("/");
    } 
    else{
    toast.error(result.message || "Login Failed!", { position: "top-right", autoClose: 3000 });
    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  }

    
    
  }

  

  return (
    // sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3
    <div className="w-[90vw] sm:px-10   mx-auto md:px-10  pb-30 py-20 md:h-screen flex justify-between items-center ">
      <div className="w-[50%] hidden md:block w-1/2 bg-cover bg-center">
        <img src={LoginAnimy} />
      </div>

      <div className="w-[100%] lg:w-[50%] xl:w-[40%] xl:p-10    md:w-[40%] md:p-3  p-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-5 font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className=" ">
          <div class="relative">
            <input
              id="default_outlined"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  dark:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="email"
              placeholder=""
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              for="default_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              User Name
            </label>
          </div>

          <div class="relative mt-5">
            <input
              id="default_outlined"
              className="block text-black px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  dark:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
             
            />
            <label
              for="default_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Passwords
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-5   cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 flex items-center justify-center"
            // disabled={loading}

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
                Login...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
