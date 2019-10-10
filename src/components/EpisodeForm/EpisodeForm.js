import React from "react";

import EpisodeTable from "./EpisodeTable";

function EpisodeForm({
  episodeList,
  updateEpisode,
  setEpisodeDownloadList,
  api
}) {
  // store list of download info from api as state
  const handleClick = async () => {
    const downloadList = await Promise.all(
      episodeList
        .map(ep => {
          if (ep.showOnGraph) {
            return api.getEpisodeDownloads(ep.id);
          }
          return null;
        })
        .filter(ep => ep)
    );
    setEpisodeDownloadList(downloadList);
  };

  return (
    <div>
      <EpisodeTable episodeList={episodeList} updateEpisode={updateEpisode} />
      <button
        className="mt-4 btn btn-blue text-sm font-bold"
        onClick={handleClick}
      >
        Generate Graph
      </button>
    </div>
  );
}

export default EpisodeForm;
