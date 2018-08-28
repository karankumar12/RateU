var google = require('google')

google.resultsPerPage = 25
var nextCounter = 0

google('Mia Khalifa university of texas at dallas rate my professor', function (err, res){
  if (err) console.error(err)


    var link = res.links[0];
		URL = link.href
    console.log(link.href)

		if (URL.substring(0,5) != "http:")	{
			console.log("stfu");
			console.log(URL.substring(0,5));
			throw new Error("Why do black people sing \"to the left, to the left\"? Because they don't have rights");
		}

    var request = require("request"),
      cheerio = require("cheerio"),
      url = link.href;

    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body),
          firstName = $("[class='pfname']").html();
          lastName = $("[class='plname']").html();
          difficulty = $("[class='breakdown-section difficulty'] .grade").html();
          overallQuality = $("[class='breakdown-container quality'] .grade").html();
          var firstName = firstName.replace(/\s+/g, "");
          var lastName = lastName.replace(/\s+/g, "");
          var difficulty = difficulty.replace(/\s+/g, "");
          var overallQuality = overallQuality.replace(/\s+/g, "");

        console.log(firstName + " " + lastName + "'s overall difficulty is " + difficulty + ".");
        console.log(firstName + " " + lastName + "'s overall quality is " + overallQuality + ".");

      } else {
        console.log("Nigga you fucked up here: " + error);
      }
    });


})
