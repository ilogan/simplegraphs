// takes list of downloads data from  /analytics/downloads?episode={episodeId}
// converts into format consumable by webdatarocks
const importDownloadsData = (episodeDownloadList, episodeList) => {
  let data = [];
  episodeDownloadList.forEach(episodeDownloads => {
    // match the ids to get an episode containing a title
    const episode = episodeList.find(ep => ep.id === episodeDownloads.id);
    episodeDownloads.by_interval.forEach((day, i) => {
      const dayData = { ...day };
      dayData["Title"] = episode.title;

      dayData["Downloads"] = day.downloads_total;
      delete dayData.downloads_total;

      dayData["Download Percentage"] = day.downloads_percent;
      delete dayData.downloads_percent;

      dayData["Days Since Release"] = i + 1;
      data.push(dayData);
    });
  });
  return data;
};

export default importDownloadsData;
