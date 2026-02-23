import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("q");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    if (query) {
      searchVideos(query).then(setVideos);
    }
  }, [query]);

  return (
    <div className="searchContainer">
      <h1 className="searchHeading">
        Search results for: {query}
      </h1>

      <div className="searchResults">
  {videos
    ? videos.map((video) => (
        <VideoCard
          key={video.id.videoId || video.id}
          video={video}
        />
      ))
    : Array(6)
        .fill(0)
        .map((_, i) => <ShimmerCard key={i} />)}
</div>
    </div>
  );
}

export default Search;
