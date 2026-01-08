import React from 'react'

const Contact = () => {
  return (
    <div className="bg-white py-4 sm:py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Get in Touch with PetUniverse
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            Have questions or need assistance? Our team is here to help you and your pet anytime.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                required
              ></textarea>
            </div>
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-indigo-700"
              >
                Send Message
              </button>
            </div>
          </form>
          <p className='text-center mt-10 text-gray-700'>OR</p>
          <div className="w-full mt-10 flex flex-col sm:flex-row justify-center items-center gap-20 text-gray-900 text-lg font-semibold">
            <p className='flex flex-col gap-2 '>
                Email: <span className="text-indigo-600">contact@petcareplus.com</span>
            </p>
            <p className='flex flex-col gap-2 '>
                Clinic Address: <span className="text-indigo-600">No.87, New Kandy Road, Malabe</span>
            </p>
            <p className='flex flex-col gap-2 '>
                Phone Number: <span className="text-indigo-600">0116434978</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact