import React from "react";
import { Auth } from "aws-amplify";

import { Link } from "react-router-dom";

function Navbar({ authState }) {
  // remove user credentials after hitting logout button
  const handleLogout = async () => {
    await Auth.signOut();
  };

  const logStyle = "inline-block text-orange-200 hover:text-white mr-4";
  const renderLogin = () => (
    <Link to="/login" className={logStyle}>
      Login
    </Link>
  );

  const renderLogout = () => (
    <Link to="/login" className={logStyle} onClick={handleLogout}>
      Logout
    </Link>
  );

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
          {authState === "signedIn" ? renderLogout() : renderLogin()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
