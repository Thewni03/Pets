import React from 'react'
import { assets } from '../assets/assets'

const pets = [
  { 
    name: 'Dogs', 
    description: 'Comprehensive care for all dog breeds',
    image: assets.dogImage
  },
  { 
    name: 'Cats', 
    description: 'Specialized feline healthcare services',
    image: assets.catImage
  },
  { 
    name: 'Birds', 
    description: 'Avian experts for your feathered friends',
    image: assets.birdImage
  },
  { 
    name: 'Small Animals', 
    description: 'Care for rabbits, guinea pigs, and more',
    image: assets.smallAnimalsImage
  },
]

const PetTypes = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Pets We Treat
        </h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pets.map((pet) => (
            <div key={pet.name} className="overflow-hidden rounded-xl bg-white shadow-md">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={pet.image} 
                  alt={`${pet.name} illustration`} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                <p className="mt-2 text-gray-600">{pet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetTypes