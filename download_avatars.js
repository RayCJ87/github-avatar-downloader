var request = require('request');
var fs = require('fs');
var arg = process.argv;
var repoOwner = arg[2];
var repoName = arg[3];



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
    cb(err, body)
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
        var userID = data[i]['login'];
        downloadImageByURL(data[i]["avatar_url"], userID);
    }
  });
}

function downloadImageByURL(url, filePath){
  var fileStore =  './avatars/'+ filePath;
  request.get(url)
    .on('error', function(err){
      throw err;
    })
    .on('response', function (response){
      console.log('Downloading the image of ' + filePath + '...');
    })
    .pipe(fs.createWriteStream(fileStore));
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});