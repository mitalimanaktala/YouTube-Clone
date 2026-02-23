import { useEffect, useState, useCallback } from "react";
import VideoCard from "../components/VideoCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function History() {
  const [allHistory, setAllHistory] = useState([]);
  const [visibleHistory, setVisibleHistory] = useState([]);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("watchHistory")) || [];

    setAllHistory(stored);
    setVisibleHistory(stored.slice(0, ITEMS_PER_PAGE));
  }, []);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const end = nextPage * ITEMS_PER_PAGE;

    setVisibleHistory(allHistory.slice(0, end));
    setPage(nextPage);
  }, [page, allHistory]);

  const loaderRef = useInfiniteScroll(
    loadMore,
    visibleHistory.length < allHistory.length,
    false
  );

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1 style={{ marginBottom: "20px" }}>Watch History</h1>

      <div className="videoGrid">
        {visibleHistory.length > 0 ? (
          visibleHistory.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))
        ) : (
          <p>No watch history yet.</p>
        )}
      </div>

      <div ref={loaderRef} style={{ height: "40px" }} />
    </div>
  );
}

export default History;