var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    // console.log(res);
    cb(err, body)
    // console.log(body);
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
        console.log(" avatar url: " + data[i]["avatar_url"]);

    }

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});