import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto"; // Modified import
import { useReactToPrint } from 'react-to-print';
import Nav from '../../components/Components/Nav';
import { Link } from 'react-router-dom';

const Records = () => {
  const ComponentsRef = useRef();

  useEffect(() => {
    const initCharts = () => {
      const ctx1 = document.getElementById("appointmentsChart").getContext("2d");
      const ctx2 = document.getElementById("healthChart").getContext("2d");

      // Destroy previous chart instances
      Chart.getChart("appointmentsChart")?.destroy();
      Chart.getChart("healthChart")?.destroy();

      // Create Appointment Statistics chart
      new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Appointments",
              data: [30, 50, 45, 60, 80],
              backgroundColor: "rgba(0, 123, 255, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create Health Trends chart (Pie chart)
      new Chart(ctx2, {
        type: "pie",
        data: {
          labels: ["Healthy", "Sick", "Critical"],
          datasets: [
            {
              data: [70, 20, 10],
              backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    };

    const timer = setTimeout(initCharts, 100);
    return () => {
      clearTimeout(timer);
      Chart.getChart("appointmentsChart")?.destroy();
      Chart.getChart("healthChart")?.destroy();
    };
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: 'Reports Dashboard',
    contentRef: ComponentsRef,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Nav />
      
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Users", value: 150 },
          { title: "Appointments", value: 320 },
          { title: "Registered Vets", value: 25 },
          { title: "Rescue Centers", value: 10 }
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" ref={ComponentsRef}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Appointment Statistics</h3>
          <div className="h-80">
            <canvas id="appointmentsChart"></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Pet Health Trends</h3>
          <div className="h-80">
            <canvas id="healthChart"></canvas>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link 
          to="/VetVisit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Vet Visits
        </Link>
        <button 
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Records;