var google = require('google')
var app = require('express')();

google.resultsPerPage = 25
var nextCounter = 0
var professorName = 'Gordon Arnold'
var schoolName = 'University of Texas at Dallas'

app.get('/getData', (req, serverResponse) => {
  professorName = req.params.prof;
  schoolName = req.params.univ;
  console.log("Rqeuest received on Backend");
  // REQUEST TO GOOGLE AND response
  google("Gordon Arnold university of texas at dallas rate my professor", function (err, res){
  if (err) console.error(err)


    var link = res.links[0];
    URL = link.href
    console.log(link.href)

    if (URL.substring(0,5) != "http:")  {
      console.log("stfu");
      console.log(URL.substring(0,5));
      serverResponse.send( new Error("Why do people sing \"to the left, to the left\"? Because they don't have rights"));
    }

    var request = require("request"),
      cheerio = require("cheerio"),
      url = link.href;

    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body),
          //Firstname and Lastname are returned Null
          firstName = $("[class='pfname']").html();
          lastName = $("[class='plname']").html();
          difficulty = $("[class='breakdown-section difficulty'] .grade").html();
          overallQuality = $("[class='breakdown-container quality'] .grade").html();
          // ----
          var firstName = firstName.replace(/\s+/g, "");
          var lastName = lastName.replace(/\s+/g, "");
          var difficulty = difficulty.replace(/\s+/g, "");
          var overallQuality = overallQuality.replace(/\s+/g, "");

        console.log(firstName + " " + lastName + "'s overall difficulty is " + difficulty + ".");
        console.log(firstName + " " + lastName + "'s overall quality is " + overallQuality + ".");

        var responseData = firstName + " " + lastName + "'s overall difficulty is" + difficulty + "." + firstName + " " + lastName + "'s overall quality is " + overallQuality + ".";
      
        serverResponse.send(responseData);
      

      } else {
        console.log("you screwed up here: " + error);
        serverResponse.send("Error!");
      }
    });


})
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))

