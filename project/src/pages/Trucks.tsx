import React from 'react';
import { vehicles } from '../data/vehicles';
import { Truck as TruckIcon, Star } from 'lucide-react';

function Trucks() {
  const trucks = vehicles.filter(vehicle => vehicle.type === 'truck');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <TruckIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Available Trucks</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trucks.map((truck) => (
          <div key={truck.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={truck.image}
                alt={`${truck.make} ${truck.model}`}
                className="w-full h-full object-cover"
              />
              {truck.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded-full">
                  <Star className="h-5 w-5" fill="currentColor" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {truck.make} {truck.model}
              </h2>
              <p className="text-gray-600">{truck.year}</p>
              <div className="mt-2">
                <span className="text-2xl font-bold text-blue-600">${truck.price}</span>
                <span className="text-gray-600">/day</span>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="font-semibold text-gray-900">Capacity:</span>
                  <span className="ml-2 text-gray-600">{truck.capacity}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Dimensions:</span>
                  <span className="ml-2 text-gray-600">{truck.dimensions}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {truck.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {truck.fuelType}
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

export default Trucks;