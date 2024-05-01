import './Spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <svg className="spinner" viewBox="0 0 100 100">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" />
      </svg>
    </div>
  );
};
