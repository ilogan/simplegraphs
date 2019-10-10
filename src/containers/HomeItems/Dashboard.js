import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

// class for creating axios instance with access to simplecast api
import SimplecastAPI from "../../api/SimplecastAPI";
import { customizeEpisodes } from "../../services/customizeEpisodes";

import EpisodeForm from "../../components/EpisodeForm/EpisodeForm";
import Graph from "../../components/Graph";

function Dashboard() {
  const [inputValue, setInputValue] = useState(
    "Really Awesome Really Real Show"
  );
  const [podcastId, setPodcastId] = useState("");
  // episode info taken from api
  const [episodeList, setEpisodeList] = useState([]);
  // download info taken from api
  const [episodeDownloadList, setEpisodeDownloadList] = useState([]);
  // axios access to api
  const [api, setApi] = useState("");

  useEffect(() => {
    const createApiWithBearer = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.idToken.jwtToken;
        const simplecast = new SimplecastAPI(token);
        setApi(simplecast);
      } catch (e) {
        console.error("Can't create api");
        console.log(e.message);
      }
    };
    createApiWithBearer();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const podcasts = await api.getPodcast();
      const podcast = podcasts.collection.find(p => p.title === inputValue);
      if (!podcast) {
        return console.log("couldn't find podcast");
      }
      setPodcastId(podcast.id);

      const episodes = await api.getPodcastEpisodes(podcast.id);
      const customizedEpisodes = customizeEpisodes(episodes.collection);
      setEpisodeList(customizedEpisodes);
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
          api={api}
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
