import React, { useState, useEffect } from "react";

import EpisodeTable from "./components/EpisodeTable";

import podcastService from "./services/podcast";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [podcastId, setPodcastId] = useState("");
  const [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    if (localStorage.podcastId && localStorage.episodeList) {
      setPodcastId(localStorage.podcastId);
      setEpisodeList(JSON.parse(localStorage.episodeList));
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const podcasts = await podcastService.getPodcast();
      const podcast = podcasts.collection.find(p => p.title === inputValue);
      if (!podcast) {
        return console.log("couldn't find podcast");
      }
      setPodcastId(podcast.id);
      localStorage.setItem("podcastId", podcast.id);

      const episodes = await podcastService.getPodcastEpisodes(podcast.id);
      setEpisodeList(episodes.collection);
      localStorage.setItem("episodeList", JSON.stringify(episodes.collection));
    } catch (e) {
      console.log("an error occurred", e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter Podcast"
        />
        <button>Submit</button>
      </form>
      <EpisodeTable episodeList={episodeList} />
    </div>
  );
}

export default App;
