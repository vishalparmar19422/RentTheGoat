import  { useEffect } from 'react';
import { Car as CarIcon } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import axios from 'axios';





function Cars() {
  const { cars, fetchCars, } = useAuth();

  useEffect(() => {
    fetchCars();
  }, []);

  const handleRentCar = async (carId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/cars/rent/${carId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCars();
    } catch (error: any) {
      console.error('Rent car error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-10">
        <CarIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars
          .filter((car) => car.available)
          .map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-52">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h2>
                <p className="text-gray-600 mb-1">Brand: {car.brand}</p>
                <p className="text-gray-600 mb-3">Model: {car.model}</p>

                <div className="text-blue-600 text-xl font-semibold mb-4">
                  ${car.rentPerDay} <span className="text-sm text-gray-600">/day</span>
                </div>

                <button
                  onClick={() => handleRentCar(car._id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cars;
