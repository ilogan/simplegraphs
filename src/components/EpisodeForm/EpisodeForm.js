import React from "react";

import wdrService from "../../services/webdatarocks";

import EpisodeTable from "./EpisodeTable";

// a form for users to toggle which episodes they want to request download data for
function EpisodeForm({
  episodeList,
  updateEpisode,
  setEpisodeDownloadList,
  api,
  setReport
}) {
  // generates list of episode download data
  const handleClick = async () => {
    const downloadList = await Promise.all(
      episodeList
        .map(ep => {
          // make request to /analytics/donwloads?episode={episodeId}
          // only if episode is to be shown on graph
          if (ep.showOnGraph) {
            return api.getEpisodeDownloads(ep.id);
          }
          return null;
        })
        .filter(ep => ep) // filters out falsy values (null in this case)
    );
    // creates list of data points for WebDataRocksTable component
    const wdrData = wdrService.importDownloadsData(downloadList, episodeList);
    //setWdrData(wdrData);
    const wdrSlice = wdrService.thirtyDayDownloadsSlice;
    const report = wdrService.generateReport(wdrData, wdrSlice);
    setReport(report);

    setEpisodeDownloadList(downloadList);
  };

  return (
    <div className="min-w-full flex flex-col">
      <EpisodeTable episodeList={episodeList} updateEpisode={updateEpisode} />
      <button
        className="mt-4 btn btn-blue text-sm font-bold"
        onClick={handleClick}
      >
        collect download data
      </button>
    </div>
  );
}

export default EpisodeForm;
