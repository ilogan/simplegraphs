import React, { useState, useEffect } from "react";

import podcastService from "../services/podcast";

function Episode({ episode, id }) {
  // //* an object containing data about an episodes downloads
  // //  keys: href, total, interval, id, by_interval
  // const [downloads, setDownloads] = useState("");

  // //* an array of objects with donwload info for each day
  // // keys: interval, downloads_total, downloads_percent
  // const [days, setDays] = useState([]);

  // //? make api request for downloads
  // useEffect(() => {
  //   const getDownloads = async id => {
  //     const episodeDownloads = await podcastService.getEpisodeDownloads(id);
  //     setDownloads(episodeDownloads);
  //   };
  //   getDownloads(id);
  // }, [id]);

  // useEffect(() => {
  //   console.log(downloads.by_interval);
  //   setDays(downloads.by_interval);
  // }, [downloads]);

  // const renderDays = () => {
  //   if (days) {
  //     return days.map((day, i) => (
  //       <div key={i}>{`Day ${i + 1}: ${day.downloads_total} downloads`}</div>
  //     ));
  //   }
  // };

  const publishDate = new Date(episode.published_at);
  return (
    <tr>
      <td>{episode.title}</td>
      <td>{episode.number}</td>
      <td>{publishDate.toDateString()}</td>
    </tr>
  );
}

export default Episode;
