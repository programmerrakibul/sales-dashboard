type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="dashboard-state" role="alert">
    <h3>Couldn't load sales data</h3>
    <p>{message}</p>
    <button onClick={onRetry}>Try again</button>
  </div>
);

export default ErrorState;
