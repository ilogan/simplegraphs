import React, { useState, useEffect } from "react";

import podcastService from "../services/podcast";

function Episode({ episode }) {
  const [downloads, setDownloads] = useState("");

  useEffect(() => {
    const getDownloads = async id => {
      const episodeDownloads = await podcastService.getEpisodeDownloads(id);
      setDownloads(episodeDownloads.total);
    };
    getDownloads(episode.id);
  }, []);

  return (
    <div>
      <h2>{episode.title}</h2>
      <div>{downloads} downloads</div>
    </div>
  );
}

export default Episode;
