import React from "react";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <header className="mx-auto px-8 max-w-3xl my-20">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Simplegraphs</h1>
        <div className="mt-8">
          <h3 className="font-semibold">Some Background</h3>
          <p className="text-sm md:text-base">
            The basic tier of Simplecast allows users to host their podcasts,
            while providing analytics on how listeners interact with their
            shows. Unfortunately, Simplecast limits the amount of data users can
            see on their dashboard, despite users having access to the{" "}
            <a
              className="link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api"
            >
              Simplecast 2.0
            </a>{" "}
            API.
          </p>
          <h3 className="mt-8 font-semibold">The Fix</h3>
          <p className="text-sm md:text-base">
            Simplegraphs reads in a Simplecast user's JSON formatted analytics
            data and allows them to better customize how that data is
            visualized. This way they can get a better idea on how their podcast
            is performing using the metrics they care about.
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="mt-8 btn btn-blue">Try it out!</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Landing;
