import React from "react";

import Episode from "./Episode";

function EpisodeList({ episodeList }) {
  const renderEpisodes = episodeList.map(episode => (
    <Episode key={episode.id} episode={episode} id={episode.id} />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Episode #</th>
          <th>Publish date</th>
        </tr>
      </thead>
      <tbody>{renderEpisodes}</tbody>
    </table>
  );
}

export default EpisodeList;
