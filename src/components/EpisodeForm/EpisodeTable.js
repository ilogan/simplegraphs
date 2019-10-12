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

  const toggleGraphShowAll = () => {
    // button should toggle all graphs to show if one false is found
    episodeList.find(ep => ep.showOnGraph === false)
      ? episodeList.forEach(ep => {
          updateEpisode(ep.id, "showOnGraph", true);
        })
      : episodeList.forEach(ep => {
          updateEpisode(ep.id, "showOnGraph", false);
        });
  };

  return (
    <table className="mt-8 text-xs md:text-sm">
      <thead>
        <tr>
          <th>Title</th>
          <th>Episode #</th>
          <th>Publish date</th>
          <th>
            <button
              className="btn btn-blue font-bold px-2 py-1 text-xs md:text-sm"
              onClick={toggleGraphShowAll}
            >
              Toggle All
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{renderEpisodes}</tbody>
    </table>
  );
}

export default EpisodeTable;
