import React from "react";

function EpisodeRow({ episode, id, updateEpisode, renderShowAllText }) {
  const toggleGraphShow = () => {
    updateEpisode(id, "showOnGraph", !episode.showOnGraph);
  };

  const publishDate = new Date(episode.published_at);
  return (
    <tr>
      <td>{episode.title}</td>
      <td>{episode.number}</td>
      <td>{publishDate.toDateString()}</td>
      <td>
        <button onClick={toggleGraphShow}>
          {episode.showOnGraph ? "Remove" : "Add"}
        </button>
      </td>
      <td>{episode.showOnGraph ? "O" : "X"}</td>
    </tr>
  );
}

export default EpisodeRow;
