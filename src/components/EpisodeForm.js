import React from "react";

import EpisodeTable from "./EpisodeTable";

function EpisodeForm({ episodeList, updateEpisode }) {
  return (
    <div>
      <EpisodeTable episodeList={episodeList} updateEpisode={updateEpisode} />
      <button>Generate Graph</button>
    </div>
  );
}

export default EpisodeForm;
