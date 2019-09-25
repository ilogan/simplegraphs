import React from "react";

import EpisodeRow from "./EpisodeRow";

function EpisodeTable({ episodeList, updateEpisode }) {
  const renderEpisodes = episodeList.map(episode => (
    <EpisodeRow
      key={episode.id}
      episode={episode}
      id={episode.id}
      updateEpisode={updateEpisode}
    />
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
