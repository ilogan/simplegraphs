// a slice is a view for webdatarocks
// gives the first thirty days of an episodes downloads
const thirtyDayDownloadsSlice = {
  rows: [
    {
      uniqueName: "Episode Title"
    }
  ],
  columns: [
    {
      uniqueName: "Days Since Release",
      filter: {
        members: [
          "Days Since Release.30",
          "Days Since Release.29",
          "Days Since Release.28",
          "Days Since Release.27",
          "Days Since Release.26",
          "Days Since Release.25",
          "Days Since Release.24",
          "Days Since Release.23",
          "Days Since Release.22",
          "Days Since Release.21",
          "Days Since Release.20",
          "Days Since Release.19",
          "Days Since Release.18",
          "Days Since Release.17",
          "Days Since Release.16",
          "Days Since Release.15",
          "Days Since Release.14",
          "Days Since Release.13",
          "Days Since Release.12",
          "Days Since Release.11",
          "Days Since Release.10",
          "Days Since Release.9",
          "Days Since Release.8",
          "Days Since Release.7",
          "Days Since Release.6",
          "Days Since Release.5",
          "Days Since Release.4",
          "Days Since Release.3",
          "Days Since Release.2",
          "Days Since Release.1"
        ]
      }
    },
    {
      uniqueName: "Measures"
    }
  ],
  measures: [
    {
      uniqueName: "Downloads",
      aggregation: "sum"
    }
  ]
};

// takes list of downloads data from  /analytics/downloads?episode={episodeId}
// converts into format consumable by webdatarocks
const importDownloadsData = (episodeDownloadList, episodeList) => {
  let data = [];
  episodeDownloadList.forEach(episodeDownloads => {
    // match the ids to get an episode containing a title
    const episode = episodeList.find(ep => ep.id === episodeDownloads.id);
    episodeDownloads.by_interval.forEach((day, i) => {
      const dayData = { ...day };
      dayData["Episode Title"] = episode.title;

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

// create a webdatarocks report from given data and options
const generateReport = (data, slice = null, conditions = null) => {
  const report = {
    dataSource: {
      dataSourceType: "json",
      data
    }
  };

  if (slice) {
    report["slice"] = slice;
  }

  if (conditions) {
    report["conditions"] = conditions;
  }

  return report;
};

export default { thirtyDayDownloadsSlice, importDownloadsData, generateReport };
