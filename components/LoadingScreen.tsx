export default function LoadingScreen() {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
  
        <style jsx>{`
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(38, 38, 38);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }
  
  