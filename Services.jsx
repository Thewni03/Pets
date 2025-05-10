import React from 'react'
import { CalendarIcon, HeartIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Regular Checkups',
    description: 'Comprehensive health examinations to keep your pet in optimal condition.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Emergency Care',
    description: '24/7 emergency services for urgent pet healthcare needs.',
    icon: HeartIcon,
  },
  {
    name: 'Vaccinations',
    description: 'Complete vaccination programs for all life stages of your pet.',
    icon: CalendarIcon,
  },
  {
    name: 'Teleconsultation',
    description: 'Virtual consultations with our expert veterinarians.',
    icon: PhoneIcon,
  },
]

const Services = () => {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Comprehensive care for your furry family members
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.name} className="rounded-xl bg-gray-50 p-8 text-center">
              <service.icon className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
              <h3 className="mt-6 text-lg font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services