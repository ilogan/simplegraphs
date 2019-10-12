import React, { useState } from "react";
import { Auth } from "aws-amplify";

function Login({ history, cProps }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      // sign in and set the user
      const user = await Auth.signIn(username, password);
      cProps.onStateChange("signedIn", user);
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        throw e;
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (e.code === "PasswordResetRequiredException") {
        throw e;
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else if (e.code === "NotAuthorizedException") {
        throw e;

        // The error happens when the incorrect password is provided
      } else if (e.code === "UserNotFoundException") {
        throw e;

        // The error happens when the supplied username/email does not exist in the Cognito user pool
      } else {
        throw e;
      }
    }
  };

  const isValidated = () => {
    return username.length > 0 && password.length > 0;
  };

  const validationStyles = () => {
    return isValidated()
      ? "btn btn-blue"
      : "btn btn-blue bg-blue-200 hover:bg-blue-200 cursor-not-allowed";
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signIn();
      history.push("/");
    } catch (e) {
      console.error("Login error");
      alert(e.message);
    }
  };

  return (
    <div className="top-container">
      <div className="center-col-container">
        <form className="w-full max-w-xs md:max-w-sm" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="username"
              >
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className={validationStyles()} disabled={!isValidated()}>
                Login
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10 text-sm">
          <div className="md:flex md:items-center">
            <p className="">
              Simplecast requires an api token to access their API. This account
              has credentials to access that API. Note that user signups will
              become available upon further testing and feature addition!
            </p>
          </div>

          <div className="mt-6 md:flex md:items-center">
            <div className="flex">
              <p>
                Username: <br />
                <span className="font-semibold">demo-user</span>
              </p>
              <p className="ml-8">
                Password: <br />
                <span className="font-semibold">Realpassword1!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
