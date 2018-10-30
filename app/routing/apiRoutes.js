var friendData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  app.post("/api/friends", function(req, res){
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    console.log(req.body);

    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);
    // Calculates the difference between the user's scores and the scores of each user in the database
    var totalDifference = 0;

    for (var i=0;i< friendData.length; i++) {
      console.log(friendData[i]);
      totalDifference = 0;

      for (var j = 0; j< friendData[i].scores[j]; j++) {
        // We calsulate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));

        if (totalDifference <= bestMatch.friendDifference) {
          //Reset the best match to be the new friend
          bestMatch.name = friendData[i].name;
          bestMatch.photo = friendData[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    //Finally save the user's data to the database
    friendData.push(userData);

    //Return a JSON with the user's best match
    res.json(bestMatch);
  });

};






