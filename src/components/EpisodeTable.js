import React from "react";

import Episode from "./EpisodeRow";

function EpisodeTable({ episodeList }) {
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
          <th>
            <button>Add all</button>
          </th>
        </tr>
      </thead>
      <tbody>{renderEpisodes}</tbody>
    </table>
  );
}

export default EpisodeTable;
