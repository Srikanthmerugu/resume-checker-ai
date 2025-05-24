import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewNavbar from "../navbar/NewNavbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, guestLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        // toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed. Please try again.");
        toast.error(result.message || "Login Failed!", { position: "top-right", autoClose: 3000 });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setGuestLoading(true);
    try {
      const result = await guestLogin();
      if (result.success) {
        toast.success("Guest login successful!", { position: "top-right", autoClose: 3000 });
        navigate("/dashboard");
      } else {
        setError(result.message || "Guest login failed. Please try again.");
        toast.error(result.message || "Guest Login Failed!", { position: "top-right", autoClose: 3000 });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred", { position: "top-right", autoClose: 3000 });
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    // <div className="bg-gray-900 z-10 relative  min-h-screen">
    <div className=" bg-black">
      <NewNavbar />

      <div className="flex  relative items-center justify-center py-12 px-4  overflow-hidden sm:px-6 lg:px-8">
        {/* Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
          }}
        />
        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
        />
        
        <div className="relative bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
            {error && (
              <div className="mb-4 p-2 bg-red-900 text-red-200 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded" 
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            {/* <button
              type="button"
              onClick={handleGuestLogin}
              disabled={guestLoading}
              className={`w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${guestLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {guestLoading ? 'Entering as Guest...' : 'Continue as Guest'}
            </button> */}
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;