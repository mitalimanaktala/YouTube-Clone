import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("watchHistory")) || [];
    setHistory(stored);
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1 style={{ marginBottom: "20px" }}>Watch History</h1>

      <div className="videoGrid">
        {history.length > 0 ? (
          history.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))
        ) : (
          <p>No watch history yet.</p>
        )}
      </div>
    </div>
  );
}

export default History;
