import React from "react";
import createGraphOptions from "../services/graph";

import { CanvasJSChart } from "../assets/canvasjs.react";

function Graph({ episodeDownloadList }) {
  const options = createGraphOptions(episodeDownloadList);
  console.log(options);

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Graph;
