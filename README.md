# spotify-extension
Spotify extension to use with Tableau Desktop. 

With this extension, you can create playlists based on datapoints you select from a dashboard. This extension was created to demo how the [Tableau Extensions API](https://github.com/tableau/extensions-api) can be used with Tableau Desktop and Spotify. It has limited functionalities and is made to be a starting point for connecting Tableau and Spotify. 

More improvements to come in the future.

## Requirements
1. Spotify data - obtainable by using this awesome [tool](https://github.com/avertin/spotify_data).
2. Pre-Release version of Tableau Desktop - follow steps to sign up and download copy on [this page](https://tableau.github.io/extensions-api/docs/trex_getstarted.html).
3. Node.js - you can get Node.js from [https://nodejs.org](https://nodejs.org)

## Instructions
1. This extension currently does not support obtaining Spotify oauth tokens (work in progress), so you will have to manually get an oauth token from spotify. You can get it from the Spotify website by going [here](https://developer.spotify.com/web-api/console/post-playlists/). Click on 'GET OAUTH TOKEN' and checkmark 'playlist-modify-public' before requesting (login required). Copy/paste the token to the token variable in spotify.js.
```javascript
var token = '';
```

2. Copy `spotify.trex` to `~\Documents\My Tableau Repository (Beta)\Extensions` so it will be available in Tableau.

3. Open a command prompt window to the location where you cloned this repo.

4. Make sure you're in the `.\spotify-extension` directory.

5. Start a simple file hosting server:
		* Node.js : First run `npm install` (only the first time) then `npm start`.

6. Launch the pre-release version of Tableau Desktop. Create a new dashboard, and you should now be able to drag and drop the Spotify extension.

## Notes
* When making a sheet in Tableau Desktop, you must include the 'Track Id' dimension so that it shows up in the datatable in the extension window. Playlists are created by adding each individual track, so make sure that the datatable has one row for each track. Example of this:

![Extension window](./assets/Extension%20Datatable.png)

* You also need to drag and select datapoints for it to be recognized by the extension. Best use case is to have a scatter plot with all tracks on the viz (e.g. plot popularity vs. danceability of all songs).

* Most of the code is adopted from the tutorial included in the Extensions API SDK. The tutorials and the 4 other samples are very helpful in learning how to use the Extensions API.
