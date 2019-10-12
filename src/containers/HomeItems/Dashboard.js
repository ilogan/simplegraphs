import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

// class for creating axios instance with access to simplecast api
import SimplecastAPI from "../../api/SimplecastAPI";
import { customizeEpisodes } from "../../services/customizeEpisodes";

import EpisodeForm from "../../components/EpisodeForm/EpisodeForm";
import WebDataRocksTable from "../../components/WebDataRocksTable";

function Dashboard() {
  const [inputValue, setInputValue] = useState(
    "Really Awesome Really Real Show"
  );
  const [podcastId, setPodcastId] = useState("");

  // episode info taken from api endpoint: /podcasts/{podcastId}/episodes
  const [episodeList, setEpisodeList] = useState([]);

  // episode download info taken from api endpoint: /analytics/downloads?episode={episodeId}
  // eslint-disable-next-line
  const [episodeDownloadList, setEpisodeDownloadList] = useState([]);

  // axios access to api
  const [api, setApi] = useState("");

  // report to insert into WebDataRocksTable
  const [report, setReport] = useState("");

  // creates an axios instance to interact with simplecast api
  // using an authenticated user's provisioned token
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

  // generates a list of episodes associated with a podcast
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // make request to /podcasts to receive list of user podcasts
      const podcasts = await api.getPodcast();
      // if user entered title matches a title from endpoint, retrieve its id
      const podcast = podcasts.collection.find(p => p.title === inputValue);
      if (!podcast) {
        return alert("Sorry, podcast not found!");
      }

      // remove old report from screen if possible
      if (report) {
        setReport("");
      }

      setPodcastId(podcast.id);

      // make request to /podcast/{episodeId}/episodes to retrieve list of episodes
      const episodes = await api.getPodcastEpisodes(podcast.id);
      // append a new property for toggling whether or not an episode should be shown on graph then set the list
      const customizedEpisodes = customizeEpisodes(episodes.collection);
      setEpisodeList(customizedEpisodes);
    } catch (e) {
      console.log("an error occurred", e.message);
    }
  };

  // lookup podcast by id and update a value at some key
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

  const renderAfterSubmit = () => {
    if (podcastId) {
      // podcast exists and has episodes
      if (episodeList.length > 0) {
        return (
          <EpisodeForm
            episodeList={episodeList}
            updateEpisode={updateEpisode}
            setEpisodeDownloadList={setEpisodeDownloadList}
            api={api}
            setReport={setReport}
          />
        );
      }
      // podcast exists but has no episodes
      return (
        <div className="text-xs text-red-400">
          could not find any existing episodes for this podcast
        </div>
      );
      // podcast doesn't exist
    } else {
      return null;
    }
  };

  return (
    <div className="mx-auto px-8 max-w-3xl my-20">
      <div className="flex flex-col items-center">
        <div className="text-sm bg-gray-200 rounded p-4">
          <h3>Congratulations, you've signed in!</h3>
          <p className="mt-4">
            Since Simplegraphs is currently a work in progress, I created this
            account to demonstrate some of the data Simplecast podcast users
            have access to. This account has the authorization found on the{" "}
            <a
              className="link"
              target="_blank"
              href="https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api"
            >
              Simplecast 2.0
            </a>{" "}
            page. As such, this user has access to a couple of Simplecast
            provided mock podcasts:
          </p>
          <ul className="mt-4">
            <li>Really Awesome Really Real Show</li>
            <li>Another Really Real Show About Exciting, Real Things</li>
          </ul>
          <p className="mt-4">
            Yes, those are their names. Try submitting one!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-24 w-full max-w-sm">
          <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter Podcast Name"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-sm md:text-base"
            />
            <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
              Submit
            </button>
          </div>
        </form>
        {renderAfterSubmit()}
        {report ? <WebDataRocksTable report={report} /> : null}
      </div>
    </div>
  );
}

export default Dashboard;
