import React from "react";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";

import Navbar from "./containers/Navbar";
import Routes from "./Routes";
import { Authenticator } from "aws-amplify-react";

Amplify.configure(awsmobile);

function App() {
  return (
    <div>
      <Authenticator hideDefault>
        <Navbar />
        <Routes />
      </Authenticator>
    </div>
  );
}

export default App;
