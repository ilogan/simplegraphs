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
      <div className="text-sm">
        <p className="mt-10">
          This table initializes showing the number of downloads for the first
          30 days of a podcast episode's life. You can remove the 30 days filter
          by first clicking "DAYS SINCE RELEASE" then clicking "Select All". The
          pivot table can be further customized by clicking on fields and moving
          data around as you see fit!
        </p>
        <p className="mt-4">
          Now, I know what you're thinking... "Simplegraphs? More like
          ComplicatedPivotTable!" Look, there was a graph, but it didn't look
          that great. More graphs to come in the future. All in good time! Stay
          tuned for updates on my{" "}
          <a
            href="https://github.com/ilogan/simplegraphs"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            github
          </a>
          !
        </p>
      </div>
    </div>
  );
}

export default WebDataRocksTable;
