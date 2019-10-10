import React from "react";

function EpisodeRow({ episode, id, updateEpisode, renderShowAllText }) {
  const toggleGraphShow = () => {
    updateEpisode(id, "showOnGraph", !episode.showOnGraph);
  };

  const publishDate = new Date(episode.published_at);
  return (
    <tr>
      <td className="">{episode.title}</td>
      <td>{episode.number}</td>
      <td>{publishDate.toDateString()}</td>
      <td className="text-center">
        {episode.showOnGraph ? (
          <button
            className="btn btn-red px-1 py-1 text-sm"
            onClick={toggleGraphShow}
          >
            Remove
          </button>
        ) : (
          <button
            className="btn btn-green px-1 py-1 text-sm"
            onClick={toggleGraphShow}
          >
            Add
          </button>
        )}
      </td>
      {episode.showOnGraph ? (
        <td className="pl-4 text-green-600">O</td>
      ) : (
        <td className="pl-4 text-red-500">X</td>
      )}
    </tr>
  );
}

export default EpisodeRow;
