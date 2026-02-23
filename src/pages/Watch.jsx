import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoDetails, getRelatedVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import styles from "./Watch.module.css";

function Watch() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getVideoDetails(id);
        setVideoDetails(details);

        const related = await getRelatedVideos(id);
        setRecommended(related.videos);

        const stored =
          JSON.parse(localStorage.getItem("watchHistory")) || [];

        const updated = [
          details,
          ...stored.filter((v) => v.id !== details.id),
        ].slice(0, 20);

        localStorage.setItem(
          "watchHistory",
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error("Watch page error:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!videoDetails) {
    return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;
  }

  const { snippet, statistics } = videoDetails;

  return (
    <div className={styles.container}>
      <div className={styles.videoSection}>
        <div className={styles.playerWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <h2 className={styles.title}>{snippet.title}</h2>
        <p className={styles.channel}>{snippet.channelTitle}</p>
        <p className={styles.meta}>
          {statistics?.viewCount} views
        </p>
        <p className={styles.description}>
          <b>Description:</b> {snippet.description}
        </p>
      </div>

      <div className={styles.sidebar}>
        {recommended.length > 0 ? (
          recommended.map((video) => (
            <VideoCard
              key={video.id.videoId}
              video={video}
              variant="sidebar"
            />
          ))
        ) : (
          <div className={styles.noRec}>
            No recommendations available
          </div>
        )}
      </div>
    </div>
  );
}

export default Watch;