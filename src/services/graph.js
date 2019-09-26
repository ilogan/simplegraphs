// convert download info from api into a graph data point
// return a list of points where the sum accumlates
const cumulativePointSum = pointList => {
  let sum = 0;
  const updatedPoints = pointList.map(point => {
    sum += point.y;
    return { ...point, y: sum };
  });
  return updatedPoints;
};

const convertToPoints = (day, daysSinceRelease) => {
  return { y: day.downloads_total, x: daysSinceRelease };
};

// return a graph readable data entry
const createEpisodeData = (dataPoints, name, type = "line") => {
  return {
    type,
    name,
    toolTipContent: "{name}: {y} Downloads",
    showInLegend: false,
    dataPoints
  };
};

// return options to construct a graph
const createGraphOptions = (episodeDownloadList, episodeList, isCumulative) => {
  const dataList = episodeDownloadList.map(episodeDownloads => {
    let dataPoints = episodeDownloads.by_interval.map((day, i) =>
      convertToPoints(day, i)
    );
    if (isCumulative) {
      dataPoints = cumulativePointSum(dataPoints);
    }
    const episode = episodeList.find(ep => ep.id === episodeDownloads.id);
    const data = createEpisodeData(dataPoints, episode.title);
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
