import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cars from './pages/Cars';
import AdminUpload from './pages/AdminUpload';
import { useAuth } from './context/Authcontext.tsx';
import NotFound from './pages/NotFound.tsx';
import RentedCars from './pages/RentedCars.tsx';


function App() {
  const { isAuthenticated, user } = useAuth();
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAuthenticated && (
            <>
              <Route path="/cars" element={<Cars />} />
              <Route path="/rentedcars" element={<RentedCars />} />

            </>

          )}

          {isAuthenticated && user?.role === "admin" && (
            <Route path="/admin/upload" element={<AdminUpload />} />

          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;