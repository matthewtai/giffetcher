$(document).ready(function () {
  var buttons = $(".Topic-buttons");
  var topics = ["The Office", "Silicon Valley", "Friends", "Westworld"];
  var apikey = "lRptSUFqDHvNoT6rMaGYzgArF9jGAQWp"


  $(".gif").hide()

  function start() {
    buttons.empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("ml-1 btn btn-primary");
      a.attr("data-person", topics[i]);
      a.append(topics[i]);
      buttons.append(a);
    }
  }
  start();

  $(document).on("click", "button", function () {
    $(".gif").show()
    var searchterm = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchterm + "&api_key=" + apikey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");
          gifImage.addClass("gif")
          gifImage.attr("data-state", "still")
          gifImage.attr("src", results[i].images.fixed_height_still.url);

          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);

          $(".gifs").prepend(gifDiv);
        }
      });
  })

  $(document).on('click', ".gif", function () {
    var src = $(this).attr("src");
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      $(this).attr("data-state", "animate");

    } else {
      $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
      $(this).attr("data-state", "still");
    }
  });

  $(document).on("click", "#add-gif", function (event) {
    event.preventDefault();

    var movie = $("#gif-input").val().trim();


    topics.push(movie);


    start();
  });
})