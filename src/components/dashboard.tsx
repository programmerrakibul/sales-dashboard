import { useEffect, useState } from "react";
import { fetchMetrics } from "../services/get-metrics";
import SalesChart from "./SalesChart";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

type Metrics = Awaited<ReturnType<typeof fetchMetrics>>;

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMetrics(controller.signal);
        if (!controller.signal.aborted) {
          setMetrics(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error loading metrics:", error);
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>

        <div style={{ flex: 1 }}>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() => setRetryCount((count) => count + 1)}
            />
          ) : metrics.length === 0 ? (
            <EmptyState />
          ) : (
            <SalesChart metrics={metrics} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
