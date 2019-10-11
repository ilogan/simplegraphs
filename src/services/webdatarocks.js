//
const importDownloadsData = (episodeDownloadList, episodeList) => {
  let data = [];
  episodeDownloadList.forEach(episodeDownloads => {
    // match the ids to get an episode containing a title
    const episode = episodeList.find(ep => ep.id === episodeDownloads.id);
    episodeDownloads.by_interval.forEach(day => {
      const dayData = { ...day };
      dayData["title"] = episode.title;
      data.push(dayData);
    });
  });
  return data;
};

export default importDownloadsData;
