import { useEffect, useState, useCallback } from "react";
import { getHomeVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import "../index.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (token = "") => {
    setLoading(true);

    const data = await getHomeVideos(token);

    setVideos((prev) =>
      token ? [...prev, ...data.videos] : data.videos
    );

    setNextToken(data.nextPageToken);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchMore = useCallback(() => {
    if (nextToken && !loading) {
      fetchVideos(nextToken);
    }
  }, [nextToken, loading]);

  const loaderRef = useInfiniteScroll(
    fetchMore,
    !!nextToken,
    loading
  );

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

      <div ref={loaderRef} style={{ height: "40px" }} />

      {loading && videos.length > 0 && (
        <div className="videoGrid" style={{ marginTop: "20px" }}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <ShimmerCard key={i} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;