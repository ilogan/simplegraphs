import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-6 mb-8">
      <div className="flex items-center text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">
            Simplegraphs
          </span>
        </Link>
      </div>

      <div className="block flex items-center">
        <div className="text-sm">
          <Link
            to="/login"
            className="inline-block text-orange-200 hover:text-white mr-4"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
