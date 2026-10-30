import { useEffect } from "react";
import { fetchMetrics } from "../services/get-metrics";

const Dashboard = () => {
  useEffect(() => {
    let active = false;
    
    if (!active) {
      fetchMetrics();
    }

    return () => {
      active = true;
    };
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
};

export default Dashboard;
