interface LoadingScreenProps {
    progress?: number
  }
  
  export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            {/* Optional: Add a small version of your logo here */}
            <span>K&P</span>
          </div>
          <div className="loading-progress-container">
            <div
              className="loading-progress-bar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            ></div>
          </div>
          <p className="loading-text">Loading your experience...</p>
        </div>
      </div>
    )
  }
  