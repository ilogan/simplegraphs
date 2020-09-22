# Simplegraphs - Data Parser and Visualizer

[Simplegraphs](https://simplegraphs.netlify.app/) is a companion app being developed for podcasters who use [simplecast.com](https://simplecast.com/) to host their podcasts. Simplecast is a great tool for users to gather data on how well their podcasts are performing. Episode downloads, unique listeners, and general listener location are just a few of the more important metrics Simplecast keeps track of in their [API](https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api). 

This is great for developers who can parse the JSON data out of the supplied endpoints, but not so great for your average up-and-coming podcaster. The data provided on user dashboards is limited unless the user upgrades their hosting plan. For example, a basic-tier Simplecast user can see the last 7 days of downloads for their 5 most recent episodes. While helpful, it would be much more insightful if podcasters could compare any number of episodes for as many days as they wish. 

This is where Simplegraphs comes in. It seeks to pull data down from the provided Simplecast API and allow users to customize their data however they see fit.

## How does it work?

### The Backend
Currently, the backend is completely hosted by Amazon's cloud computing platform, [AWS](https://aws.amazon.com/). 

A proxy server forwards user requests to the Simplecast API, receives its response, then forwards the response back to the Simplegraphs user. 

The proxy serves a few important purposes:

1) User Authentication:
Only registered Simplegraph users can access the proxy. This is performed through Amazon's Cognito user pools. Essentially, if a user is not in an authorized pool, then they cannot use the service.

2) Provides Access Token:
Simplecast users need to provide a secret access token to retrieve data from the Simplecast API. If the token is not in the authorization header, users are denied access. The key needs to be secret, so it is stored server side and never seen by the frontend client. The proxy acts as a middleman to append the token during requests.

3) Limited Requests:
The proxy is intentionally limited in the types of requests it can make. It only reads data using GET requests. There are no existing endpoints in the proxy that allow a user to make POST, PUT, or DELETE requests.

4) Security:
The above three functions all come together to keep user information secure. Authentication is the first wall to block an unwanted intruder. Even if an attacker somehow managed to steal credentials to a Simplegraph user's account, they would have read-only access to the information. They would never see the api token, and they could not make any malicius write requests.

For now, only an admin (that's me) can add users to Simplegraphs. This is to ensure the backend is working fully as intended, with zero vulnerabilities.

### The Frontend

The frontend is primarily written in javascript using [React](https://reactjs.org/). Because of this, Simplegraphs is a single page application (SPA) in which all components are dynamically rendered. Route handling is provided with the help of [react-router](https://reacttraining.com/react-router/) to make page navigation seamless for users. 

There are two primary flows for users:

1) Unauthenticated:
Unauthenticated users are shown a landing page as their home. They have access to an additional login screen, but that's it. They must login to the app in order to attain the AWS credentials that allow them to use the application's features. 

2) Authenticated:
Authenticated users gain access to the backend proxy server. Upon logging into the app, rotating AWS credentials are provided to a user with the help of an Authenticator component. After 1 hour, the credentials expire and no longer work with the proxy server (this is so that if an attacker intercepts said credentials, they cannot continue to perform requests without following the proper authentication channel). 

Users who have access to the app can make two primary form submissions:

1) Podcast Submission: 
The first form makes a single request to an endpoint  providing all the episodes attributed to a podcast. The JSON data is parsed and formatted into a table, so users can choose which episodes they want to display download data for. 

2) Episode Submission:
The second form submission checks which episodes are marked for data retrieval. Requests are made to each respective episode download endpoint, and Simplegraphs transforms the individual JSON data files into a single object readable by a [WebDataRocks](https://www.webdatarocks.com/) pivot table. From here a user has access to the selected episode downloads data in an exportable format.

### todos
Further features are coming after some thorough jesting! 

- integrating charts with WebDataRocks table
- multiple user signup
