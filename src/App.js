import React, { useState } from "react";

import simplecast from "./api/simplecast";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [podcastId, setPodcastId] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await simplecast.get("/podcasts");
      console.log(res.data.collection);
      const podcast = res.data.collection.find(p => p.title === inputValue);
      if (!podcast) {
        return console.log("couldn't find podcast");
      }
      setPodcastId(podcast.id);
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
      <div>{podcastId}</div>
    </div>
  );
}

export default App;
