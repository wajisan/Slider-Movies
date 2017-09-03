$( document ).ready(function() {

/* global variable for the movies*/
var currMovie = 0;
var nbMovies = 0;


/* We get data from the API the movieDB */
jQuery.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming",
        type: "GET",
        data: { 
        	api_key: 'e082a5c50ed38ae74299db1d0eb822fe',
        },
        contentType: 'application/json; charset=utf-8',
        
        /* Everything begin if we get the data*/
        success: function(resultData) {
        	nbMovies = resultData.results.length;
        	fillMovies(resultData.results);

        },
		
		/*if not, nothing happen*/        
        error : function(jqXHR, textStatus, errorThrown) {
        	console.log("error in Getting API");
        },

        timeout: 120000,
    });

	/* Simple function to create full star and empty with the round of the movie's vote.average */
	function putStars(nbstars) {
		var str = '';
		var stars = $("<div></div>");
		for (var i = 0; i < 10; i++) {
			if (i < nbstars)
				str += '<i class="fa fa-star" aria-hidden="true"></i>';
			else
				str += '<i class="fa fa-star-o" aria-hidden="true"></i>';
		}
		stars.html(str);
		return stars;
	}
	
	/* We fill our slider with the title, img, stars and desc */
	function fillMovies(movies) {

		var testList = $("<ul></ul>");

		/* One iteration for every movie */
	    for (var i = 0; i < movies.length; i++) {
	    	var curr = $("<li></li>", {id:"div"+i });
	    	currMovie = 0;
	    	if (i == 0)
	    		curr.addClass("current");
	    	var title = $("<h2></h2>").text(movies[i].title).appendTo(curr);
			var img = $('<img />',
	            { 
	               src: "https://image.tmdb.org/t/p/w500" + movies[i].poster_path,
	           	}).appendTo(curr);
			var stars = putStars(Math.round(movies[i].vote_average));
			stars.appendTo(curr);
	    	var desc =  $("<p></p>").text(movies[i].overview).appendTo(curr);

	    	/* Add the movie to others in the slider*/
	        $(testList).append(curr);

	    	/* We create here the nav buttons to link movies */
	        var link = $("<td></td").append($("<button></button>", {id: "b" + i} ).addClass("movlinks ").html('<i class="fa fa-circle" aria-hidden="true"></i>'));
	        $("#nav").append(link);
	    }

	        /* Colored the first element */
	        $("#b0").addClass("colored");

	    /* We add the fill slider to our page */
	    $('#main').append(testList);
	}


	/* When the user click on the top links */
	  $(document).on('click', '.movlinks', function () {
	  	$('.colored').removeClass('colored');
	  	$('.current').removeClass('current').fadeOut("fast");
	  	currMovie = parseInt($(this).attr('id').slice(1), 10);
	  	$('#div' + currMovie).fadeIn("slow").addClass('current');
	  	$('#b' + currMovie).addClass('colored');
	  });


	/* When the user click on next or prev button */
      $('#next').click(function() {
      	$('.colored').removeClass('colored');
        $('.current').removeClass('current').fadeOut("fast");
        currMovie++;
        if (currMovie >= nbMovies)
        	currMovie = 0;    	
        $('#div' + currMovie).fadeIn("slow").addClass('current');
        $('#b' + currMovie).addClass('colored');
    });

    $('#prev').click(function() {
      	$('.colored').removeClass('colored');
        $('.current').removeClass('current').fadeOut("fast");
        currMovie--;
        if (currMovie < 0)
        	currMovie = nbMovies - 1;
        $('#div' + currMovie).fadeIn("slow").addClass('current');
        $('#b' + currMovie).addClass('colored');
    });


});