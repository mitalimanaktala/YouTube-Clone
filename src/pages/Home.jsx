import { useEffect, useState } from "react";
import { getHomeVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import "../index.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVideos = async (token = "") => {
    setLoading(true);
    const data = await getHomeVideos(token);

    if (token) {
      setVideos((prev) => [...prev, ...data.videos]);
    } else {
      setVideos(data.videos);
    }

    setNextToken(data.nextPageToken);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="heading">Recommended Videos</h1>

      <div className="videoGrid">
        {videos.length > 0
          ? videos.map((video) => (
              <VideoCard
                key={video.id.videoId || video.id}
                video={video}
              />
            ))
          : Array(8)
              .fill(0)
              .map((_, i) => <ShimmerCard key={i} />)}
      </div>

      {nextToken && (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <button
            onClick={() => fetchVideos(nextToken)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#8e2de2",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
