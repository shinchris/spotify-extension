// The necessary configuration for your server
// Contains credentials for your Spotify application
// And the new redirect path for the OAuth flow
// Should be kept secret

var PORT = 8888;

var redirectUri = "http://localhost:" + PORT + "/callback";

module.exports = {
 'PORT': PORT,
 'CLIENT_ID': 'f03122bba2c140e2bc3e3c7612419526',
 'CLIENT_SECRET': 'e28d591706b04cffb5a5f72632e04369',
 'REDIRECT_URI': redirectUri
};
