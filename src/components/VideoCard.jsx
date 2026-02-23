import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";

export default function VideoCard({ video, variant = "grid" }) {
  const { id, snippet } = video;
  const videoId = id.videoId || id;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;

  const formatPublishedTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <Link
      to={`/watch/${videoId}`}
      className={`${styles.card} ${
        variant === "sidebar" ? styles.sidebarCard : ""
      }`}
    >
      <div
        className={
          variant === "sidebar"
            ? styles.sidebarThumbnailWrapper
            : styles.thumbnailWrapper
        }
      >
        <img
          src={thumbnails.medium.url}
          alt={title}
          className={styles.thumbnail}
        />
        
      </div>

      <div className={styles.info}>
        {variant !== "sidebar" && (
          <div className={styles.avatar}>
            {channelTitle.charAt(0).toUpperCase()}
          </div>
        )}

        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.channel}>{channelTitle}</p>
          <p className={styles.meta}>
            801K views • {formatPublishedTime(publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
