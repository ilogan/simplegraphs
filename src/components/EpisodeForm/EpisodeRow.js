import React from "react";

function EpisodeRow({ episode, id, updateEpisode, renderShowAllText }) {
  const toggleGraphShow = () => {
    updateEpisode(id, "showOnGraph", !episode.showOnGraph);
  };
  const publishDate = new Date(episode.published_at);
  return (
    <tr className={episode.showOnGraph ? "" : "text-gray-500"}>
      <td>{episode.title}</td>
      <td className="text-center">{episode.number}</td>
      <td>{publishDate.toDateString()}</td>
      <td className="text-center">
        {episode.showOnGraph ? (
          <button
            className="btn btn-red px-1 py-1 md:text-sm"
            onClick={toggleGraphShow}
          >
            Remove
          </button>
        ) : (
          <button
            className="btn border border-blue-400 text-blue-400 px-1 py-1 md:text-sm"
            onClick={toggleGraphShow}
          >
            Add
          </button>
        )}
      </td>
    </tr>
  );
}

export default EpisodeRow;
