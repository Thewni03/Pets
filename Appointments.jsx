import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";

const Appointments = ({ appointmentDetails }) => {
  const { _id, Appointment, Diagnosis, treatment, prescription, vetId } = appointmentDetails || {};
  const navigate = useNavigate();
  const ComponentsRef = useRef();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/vet/${_id}`);
      alert("Appointment deleted successfully.");
      navigate('/vets');
      window.location.reload();
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  const handlePrint = useReactToPrint({
    documentTitle: 'Title',
    contentRef: ComponentsRef,
 });
  
  return (
    <div className="p-4">
       <div ref={ComponentsRef} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 shadow-sm">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Appointment</th>
                <th className="px-4 py-2 border">Diagnosis</th>
                <th className="px-4 py-2 border">Treatment</th>
                <th className="px-4 py-2 border">Prescription</th>
                <th className="px-4 py-2 border">Vet ID</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 border">{Appointment}</td>
                <td className="px-4 py-2 border">{Diagnosis}</td>
                <td className="px-4 py-2 border">{treatment}</td>
                <td className="px-4 py-2 border">{prescription}</td>
                <td className="px-4 py-2 border">{vetId}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link to={`/UpdateVetForm/${_id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-300"
      >
        Download Report
      </button>
    </div>
  );
};

export default Appointments;
