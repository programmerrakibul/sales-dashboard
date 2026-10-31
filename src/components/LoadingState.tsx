const LoadingState = () => (
  <div className="dashboard-state" role="status" aria-live="polite">
    <span className="loading-indicator" aria-hidden="true" />
    <p>Loading sales data...</p>
  </div>
);

export default LoadingState;
