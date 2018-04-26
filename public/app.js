// JSON Article route
$.getJSON('/articles', function(data) {

	for( var i = 0; i < data.length; i++ ) {
		$('#articles').append('<p data-id="' + data[i]._id + '">' + data[i].title + '<br/>' + data[i].link + '</p>');
	}

}); // close getJSON

// Click handler to save note
$(document).on('click', '#saveNote', function() {
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			title: $('#titleinput').val(),
			body: $('#bodyinput').val()
		}
	})
	.done(function(data){
		console.log(data);
		$('#notes').empty();
	});

	$('#titleinput').val("");
	$('#bodyinput').val("");
	
});


// on click for paragraph
$(document).on('click', 'p', function() {
	$('#notes').empty();
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: "GET",
		url: "/articles/" + thisId,
	})

	.done(function(data) {
		console.log(data);

		$('#notes').append('<h2 class="noteTitle">' + data.title + '</h2><hr>');
		$('#notes').append('<input id="titleinput" name="title" placeholder="Message Title"><br><br>');
		$('#notes').append('<textarea id="bodyinput" name="body" placeholder="Message"></textarea><br>');
		$('#notes').append('<button class="btn btn-success" data-id="' + data._id + '"id="saveNote">Save</button>');

		if(data.note) {
			$('#titleinput').val(data.note.title);
			$('#bodyinput').val(data.note.body);
		}

	}); // close .done

}); //Paragraph click handler close



