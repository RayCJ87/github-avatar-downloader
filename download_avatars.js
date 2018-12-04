var request = require('request');
var fs = require('fs');
var arg = process.argv;
var repoOwner = arg[2];
var repoName = arg[3];

console.log('Welcome to the GitHub Avatar Downloader!');


/*
* To check if the user input is only 2 arguments. The program will not execute if the input is not 2.
* Error messages will occur and encourage the user to input correct arguments.
*/
function inputTest(arg) {
  if (arg.length === 4) {
    getRepoContributors(repoOwner, repoName, function (err, result) {
    // console.log('Errors:', err);
    // console.log('Result:', result);
    });
  }
  else if (arg.length > 4) {
    console.log('Hey buddy, please input 2 arguments only!!!');
    console.log('Your input is ' + arg.length + '. Too many!');
  }
  else {
    console.log('Hey buddy, please input 2 arguments only!!!');
    console.log('Your input is ' + arg.length + '. Input a bit more!');
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function (err, res, body) {
    cb(err, body)
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
        var userID = data[i]['login'];
        downloadImageByURL(data[i]['avatar_url'], userID);
    }

  });

}
/*
* Store each contributors' images with proper file names.
*/
function downloadImageByURL (url, filePath) {
  var fileStore =  './avatars/'+ filePath;
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Downloading the image of ' + filePath + '...');
      console.log('Finished downloading the image of ' + filePath + '!');
    })

    .pipe(fs.createWriteStream(fileStore));

}

inputTest(arg);
