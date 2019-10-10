import React from "react";

import Landing from "./HomeItems/Landing";
import Dashboard from "./HomeItems/Dashboard";

function Home({ cProps }) {
  try {
    return cProps.authState === "signedIn" && cProps.authData ? (
      <Dashboard authState={cProps.authState} authData={cProps.authData} />
    ) : (
      <Landing />
    );
  } catch (e) {
    alert("Unable to render dash", e.message);
    return <Landing />;
  }
}

export default Home;
