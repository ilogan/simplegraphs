// convert download info from api into a graph data point
const convertToPoints = (day, daysSinceRelease) => {
  return { y: day.downloads_total, x: daysSinceRelease };
};

// return a graph readable data entry
const createEpisodeData = (dataPoints, name, type = "line") => {
  return {
    type,
    name,
    showInLegend: false,
    dataPoints
  };
};

// return options to construct a graph
const createGraphOptions = episodeDownloadList => {
  const dataList = episodeDownloadList.map(episodeDownloads => {
    const dataPoints = episodeDownloads.by_interval.map((day, i) =>
      convertToPoints(day, i)
    );
    const data = createEpisodeData(dataPoints, episodeDownloads.id);
    return data;
  });

  const options = {
    animationEnabled: true,
    title: {
      text: "Downloads in first 30 days"
    },
    axisY: {
      title: "Downloads",
      includeZero: false
    },
    axisX: {
      title: "Days since release",
      includeZero: true
    },
    toolTip: {
      shared: false
    },
    data: dataList
  };

  return options;
};

export default createGraphOptions;
