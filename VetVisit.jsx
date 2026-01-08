import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

function VetVisit() {
  const [vets, setVets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ComponentsRef = useRef();

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/adm/vets");
        setVets(response.data.vets || []);
      } catch (error) {
        console.error("Error fetching vet data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVets();
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: 'Vet Visit Records',
    contentRef: ComponentsRef,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div ref={ComponentsRef} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Dashboard - Vet Records
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-700 font-semibold">
                  Appointment
                </th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-700 font-semibold">
                  Diagnosis
                </th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-700 font-semibold">
                  Treatment
                </th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-700 font-semibold">
                  Prescription
                </th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-700 font-semibold">
                  Vet ID
                </th>
              </tr>
            </thead>
            <tbody>
              {vets.length > 0 ? (
                vets.map((vet, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {vet.Appointment || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {vet.Diagnosis || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {vet.treatment || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {vet.prescription || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {vet.vetId || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan="5" 
                    className="py-4 text-center text-gray-500"
                  >
                    No vet records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download Report
      </button>
    </div>
  );
}

export default VetVisit;