import React, { useState, useEffect } from "react";

import podcastService from "../services/podcast";

function Episode({ episode, id }) {
  const [downloads, setDownloads] = useState("");

  useEffect(() => {
    const getDownloads = async id => {
      const episodeDownloads = await podcastService.getEpisodeDownloads(id);
      setDownloads(episodeDownloads);
    };
    getDownloads(id);
  }, [id]);

  return (
    <div>
      <h2>{episode.title}</h2>
      <div>{downloads.total} downloads</div>
    </div>
  );
}

export default Episode;
