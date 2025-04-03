import React from "react";
import PropTypes from 'prop-types';

function Appointments({ appointmentDetails }) {
  // Destructuring appointment details
  const { Appointment, Diagnosis, treatment, prescription, vetId } = appointmentDetails;

  // Log appointment details for debugging
  console.log("Appointment Details:", appointmentDetails);

  return (
    <div>
      <h3>Appointment Details</h3>
      
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Appointment</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Prescription</th>
            <th>Vet ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Appointment}</td>
            <td>{Diagnosis}</td>
            <td>{treatment}</td>
            <td>{prescription}</td>
            <td>{vetId}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
}

// Prop validation
Appointments.propTypes = {
  appointmentDetails: PropTypes.shape({
    Appointment: PropTypes.string.isRequired,
    Diagnosis: PropTypes.string.isRequired,
    treatment: PropTypes.string.isRequired,
    prescription: PropTypes.string.isRequired,
    vetId: PropTypes.string.isRequired
  }).isRequired
};

export default Appointments;
