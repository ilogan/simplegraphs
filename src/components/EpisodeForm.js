import React from "react";

import EpisodeTable from "./EpisodeTable";

function EpisodeForm({ episodeList }) {
  return (
    <div>
      <EpisodeTable episodeList={episodeList} />
      <button>Generate Graph</button>
    </div>
  );
}

export default EpisodeForm;
