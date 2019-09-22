import React from "react";

import Episode from "./Episode";

function EpisodeList({ episodeList }) {
  console.log(episodeList);
  const renderEpisodes = episodeList.map(episode => (
    <Episode key={episode.id} episode={episode} />
  ));

  return <div>{renderEpisodes}</div>;
}

export default EpisodeList;
