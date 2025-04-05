import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Truck, User, LogIn, LogOut, Sticker , } from 'lucide-react';
import { useAuth } from '../context/Authcontext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const getInitial = (name: string) => name?.charAt(0).toUpperCase();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">RentWheels</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cars" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Car className="h-5 w-5" />
                  <span>Cars</span>
                </Link>
                <Link to="/trucks" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Truck className="h-5 w-5" />
                  <span>Trucks</span>
                </Link>
                <Link to="/rentedcars" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Car className="h-5 w-5" />
                  <span>Rented Cars</span>
                </Link>

                {/* User profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold focus:outline-none"
                  >
                    {user?.name ? getInitial(user.name) : <User className="h-5 w-5" />}
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium flex items-center gap-2 cursor-pointer">
                        <Sticker width={15} height={15} />
                        {user?.name}
                      </div>
                      <hr />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  <User className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
