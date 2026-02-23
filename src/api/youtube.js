const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchVideos = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&maxResults=24&q=${query}&type=video&key=${API_KEY}`
  );

  const data = await res.json();
  return data.items || [];
};

export const getHomeVideos = async (pageToken = "") => {
  const queries = [
    "music",
    "gaming",
    "technology",
    "news",
    "sports",
    "movies",
    "india",
    "trending",
  ];

  // pick random query
  const randomQuery =
    queries[Math.floor(Math.random() * queries.length)];

  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${randomQuery}&regionCode=IN&pageToken=${pageToken}&key=${API_KEY}`
  );

  const data = await res.json();

  return {
    videos: data.items || [],
    nextPageToken: data.nextPageToken || null,
  };
};



export const getTrendingVideos = async (
  pageToken = "",
  region = "US",
  category = ""
) => {
  let url = `${BASE_URL}/videos?part=snippet&chart=mostPopular&regionCode=${region}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`;

  if (category) {
    url += `&videoCategoryId=${category}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return {
    videos: data.items || [],
    nextPageToken: data.nextPageToken || null,
  };
};

export const getVideoDetails = async (videoId) => {
  const res = await fetch(
    `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
  );

  const data = await res.json();
  return data.items?.[0] || null;
};

export async function getRelatedVideos(videoId, pageToken = "") {
  if (!videoId) return { videos: [], nextPageToken: null };

  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`
    );

    const data = await res.json();
    console.log("Related API response:", data);

    if (data.items && data.items.length > 0) {
      return {
        videos: data.items,
        nextPageToken: data.nextPageToken || null,
      };
    }

    const videoRes = await fetch(
      `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );

    const videoData = await videoRes.json();

    if (!videoData.items || !videoData.items.length) {
      return { videos: [], nextPageToken: null };
    }

    const title = videoData.items[0].snippet.title;
    const query = title.split(" ").slice(0, 3).join(" ");

    const searchRes = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    );

    const searchData = await searchRes.json();

    return {
      videos:
        searchData.items?.filter(
          (item) => item.id.videoId !== videoId
        ) || [],
      nextPageToken: null,
    };
  } catch (err) {
    console.error("Recommendation fetch failed:", err);
    return { videos: [], nextPageToken: null };
  }
}