import React from 'react';
import { vehicles } from '../data/vehicles';
import { Car as CarIcon, Star } from 'lucide-react';

function Cars() {
  const cars = vehicles.filter(vehicle => vehicle.type === 'car');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <CarIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {car.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded-full">
                  <Star className="h-5 w-5" fill="currentColor" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {car.make} {car.model}
              </h2>
              <p className="text-gray-600">{car.year}</p>
              <div className="mt-2">
                <span className="text-2xl font-bold text-blue-600">${car.price}</span>
                <span className="text-gray-600">/day</span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {car.fuelType}
                </span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
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