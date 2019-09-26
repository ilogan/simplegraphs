import React from "react";
import createGraphOptions from "../services/graph";

import { CanvasJSChart } from "../assets/canvasjs.react";

function Graph({ episodeDownloadList, episodeList }) {
  console.log(episodeList);
  const options = createGraphOptions(episodeDownloadList, episodeList, true);
  console.log(options);

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Graph;
