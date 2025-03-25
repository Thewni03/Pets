import React, { useEffect,useRef} from "react";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ArcElement, PieController } from "chart.js"; // Add PieController and ArcElement
import { useReactToPrint } from 'react-to-print';
import "./Records.css";
import Nav from '../Nav/Nav';

// Register the necessary components from Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ArcElement, // Required for pie charts
  PieController // Register PieController for pie charts
);

const Records = () => {
  useEffect(() => {
    const ctx1 = document.getElementById("appointmentsChart").getContext("2d");
    const ctx2 = document.getElementById("healthChart").getContext("2d");

    // Destroy previous chart instances to avoid Canvas already in use error
    if (Chart.getChart("appointmentsChart")) {
      Chart.getChart("appointmentsChart").destroy();
    }
    if (Chart.getChart("healthChart")) {
      Chart.getChart("healthChart").destroy();
    }

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
        scales: {
          y: {
            type: 'linear', 
            beginAtZero: true,
          },
        },
      },
    });

    // Create Health Trends chart (Pie chart)
    new Chart(ctx2, {
      type: "pie", // Use 'pie' chart type
      data: {
        labels: ["Healthy", "Sick", "Critical"],
        datasets: [
          {
            data: [70, 20, 10],
            backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
          },
        ],
      },
    });

    return () => {
      Chart.getChart("appointmentsChart")?.destroy();
      Chart.getChart("healthChart")?.destroy();
    };
  }, []);

 

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: 'Title',
    contentRef: ComponentsRef,
 })

  return (
    <div>
      <Nav />

      {/* Dashboard Summary Cards */}
      <div className="dashboard">
        <div className="card">
          <h3>Total Users</h3>
          <p>150</p>
        </div>
        <div className="card">
          <h3>Appointments</h3>
          <p>320</p>
        </div>
        <div className="card">
          <h3>Registered Vets</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Rescue Centers</h3>
          <p>10</p>
        </div>
      </div>


      {/* Charts Section */}
      <div className="charts">
        <div className="chart-card">
          <h3>Appointment Statistics</h3>
          <canvas id="appointmentsChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Pet Health Trends</h3>
          <canvas id="healthChart"></canvas>
        </div>
      </div>


      <div ref={ComponentsRef}>
  
    <h2>Reports Table</h2>
    <table>
        <tr>
            <th>Report ID</th>
            <th>Report Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Income</td>
            <td>2025-01-01</td>
            <td>2025-01-31</td>
            <td>This is an income report for January.</td>
            <td>2025-03-18 10:00:00</td>
            <td>2025-03-18 10:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Expense</td>
            <td>2025-01-01</td>
            <td>2025-01-31</td>
            <td>This is an expense report for January.</td>
            <td>2025-03-18 11:00:00</td>
            <td>2025-03-18 11:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Sales</td>
            <td>2025-02-01</td>
            <td>2025-02-28</td>
            <td>Sales report for February.</td>
            <td>2025-03-18 12:00:00</td>
            <td>2025-03-18 12:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Performance</td>
            <td>2025-02-01</td>
            <td>2025-02-28</td>
            <td>Performance analysis for February.</td>
            <td>2025-03-18 13:00:00</td>
            <td>2025-03-18 13:00:00</td>
            <td>Deleted</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Revenue</td>
            <td>2025-03-01</td>
            <td>2025-03-31</td>
            <td>Revenue report for March.</td>
            <td>2025-03-18 14:00:00</td>
            <td>2025-03-18 14:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Customer</td>
            <td>2025-03-01</td>
            <td>2025-03-31</td>
            <td>Customer engagement report.</td>
            <td>2025-03-18 15:00:00</td>
            <td>2025-03-18 15:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Growth</td>
            <td>2025-04-01</td>
            <td>2025-04-30</td>
            <td>Growth statistics for April.</td>
            <td>2025-03-18 16:00:00</td>
            <td>2025-03-18 16:00:00</td>
            <td>Deleted</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Profit</td>
            <td>2025-04-01</td>
            <td>2025-04-30</td>
            <td>Profit margin analysis for April.</td>
            <td>2025-03-18 17:00:00</td>
            <td>2025-03-18 17:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Marketing</td>
            <td>2025-05-01</td>
            <td>2025-05-31</td>
            <td>Marketing campaign review.</td>
            <td>2025-03-18 18:00:00</td>
            <td>2025-03-18 18:00:00</td>
            <td>Active</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Budget</td>
            <td>2025-05-01</td>
            <td>2025-05-31</td>
            <td>Budget allocation report.</td>
            <td>2025-03-18 19:00:00</td>
            <td>2025-03-18 19:00:00</td>
            <td>Deleted</td>
        </tr>
    </table>
   </div>

      {/* Export Buttons */}
      <div className="export-buttons">
        <button onClick={handlePrint}>Download PDF</button>
  
       
      </div>
    </div>
  );
};

export default Records;
