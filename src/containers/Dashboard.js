import React, { useState } from "react";

import EpisodeForm from "../components/EpisodeForm";
import Graph from "../components/Graph";

import podcastService from "../services/podcast";
import { customizeEpisodes } from "../services/customizeEpisodes";

function Dashboard() {
  const [inputValue, setInputValue] = useState(
    "Really Awesome Really Real Show"
  );
  const [podcastId, setPodcastId] = useState("");
  // episode info taken from api
  const [episodeList, setEpisodeList] = useState([]);
  // download info taken from api
  const [episodeDownloadList, setEpisodeDownloadList] = useState([]);

  // useEffect(() => {
  //   if (localStorage.podcastId && localStorage.episodeList) {
  //     setPodcastId(localStorage.podcastId);
  //     setEpisodeList(JSON.parse(localStorage.episodeList));
  //   }
  // }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const podcasts = await podcastService.getPodcast();
      const podcast = podcasts.collection.find(p => p.title === inputValue);
      if (!podcast) {
        return console.log("couldn't find podcast");
      }
      setPodcastId(podcast.id);
      //localStorage.setItem("podcastId", podcast.id);

      const episodes = await podcastService.getPodcastEpisodes(podcast.id);
      const customizedEpisodes = customizeEpisodes(episodes.collection);
      setEpisodeList(customizedEpisodes);
      //localStorage.setItem("episodeList", JSON.stringify(customizedEpisodes));
    } catch (e) {
      console.log("an error occurred", e.message);
    }
  };

  const updateEpisode = (id, key, updatedValue) => {
    const updatedEpisodeList = episodeList.map(ep => {
      if (ep.id === id) {
        ep[key] = updatedValue;
        return ep;
      }
      return ep;
    });
    setEpisodeList(updatedEpisodeList);
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
      {podcastId ? (
        <EpisodeForm
          episodeList={episodeList}
          updateEpisode={updateEpisode}
          setEpisodeDownloadList={setEpisodeDownloadList}
        />
      ) : null}
      {episodeDownloadList.length > 0 ? (
        <Graph
          episodeDownloadList={episodeDownloadList}
          episodeList={episodeList}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
