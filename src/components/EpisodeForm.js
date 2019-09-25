import React from "react";
import podcastService from "../services/podcast";

import EpisodeTable from "./EpisodeTable";

function EpisodeForm({ episodeList, updateEpisode, setEpisodeDownloadList }) {
  // store list of download info from api as state
  const handleClick = async () => {
    const downloadList = await Promise.all(
      episodeList
        .map(ep => {
          if (ep.showOnGraph) {
            return podcastService.getEpisodeDownloads(ep.id);
          }
        })
        .filter(ep => ep)
    );
    setEpisodeDownloadList(downloadList);
  };

  return (
    <div>
      <EpisodeTable episodeList={episodeList} updateEpisode={updateEpisode} />
      <button onClick={handleClick}>Generate Graph</button>
    </div>
  );
}

export default EpisodeForm;
