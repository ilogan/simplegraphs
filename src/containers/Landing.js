import React from "react";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <header>
      <div className="flex justify-center">
        <div className="max-w-xs">
          <h1 className="text-4xl ">Simplegraphs</h1>
          <div className="flex justify-center">
            <Link to="/login">
              <button className="mt-4 btn btn-blue">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Landing;
