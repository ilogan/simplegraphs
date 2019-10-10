import React from "react";
import * as WebDataRocksReact from "./webdatarocks.react";
function WebData() {
  return (
    <div className="mt-8 w-full">
      <WebDataRocksReact.Pivot
        toolbar={true}
        report={"https://cdn.webdatarocks.com/reports/report.json"}
      />
    </div>
  );
}

export default WebData;
