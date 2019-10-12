import React, { useEffect } from "react";
import WebDataRocks from "webdatarocks";

function WebDataRocksTable({ report }) {
  useEffect(() => {
    // create a table and populate it with json data
    new WebDataRocks({
      container: "#pivot-table-container",
      toolbar: true,
      report
    });
  }, [report]);

  // must have id "pivot-table-comtainer to sync with WebDataRocks
  return (
    <div className="mt-20 w-full">
      <div id="pivot-table-container"></div>
    </div>
  );
}

export default WebDataRocksTable;
