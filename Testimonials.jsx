import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Sarah Johnson',
    pet: 'Owner of Max (Golden Retriever)',
    rating: 5,
    comment: 'The team saved Max during an emergency. Their care and expertise are unmatched!',
  },
  {
    name: 'Michael Chen',
    pet: 'Owner of Whiskers (Persian Cat)',
    rating: 5,
    comment: 'Regular checkups have kept Whiskers healthy for 8 years. Very professional staff.',
  },
  {
    name: 'Emma Rodriguez',
    pet: 'Owner of Tweety (Parakeet)',
    rating: 4,
    comment: 'Great avian specialists who understood my bird\'s unique needs perfectly.',
  },
]

const Testimonials = () => {
  return (
    <div className="py-12 bg-primary/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Pet Owners Say
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">"{testimonial.comment}"</p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials