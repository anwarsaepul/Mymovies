$('.search-button').on('click', function(){
	$.ajax({
	url: linkFilm() + '&s=' + $('.input-keyword').val(),
	success: results => {
		const movies = results.Search;
		let cards = '';
		// looping menjadi beberapa element
		movies.forEach(m => {
			cards += showCard(m);

		});

		$('.movie-container').html(cards);
		// console.log(movies);


		// Ketika tombol detail diklik
		$('.modal-detail-button').on('click', function() {
			// ambil imdbID nya
			// console.log( $(this).data('imdbid'));
			$.ajax({
				url: linkFilm() + '&i='+ $(this).data('imdbid'),
				success: m => {
					const movieDetail = showMovieDetail(m);
				$('.modal-body').html(movieDetail);
				},
				error: (e) => {
					// Jika Errror
					console.log(e.responseText);
				}
			});

		});
	},
	error: (e) => {
		// Jika Errror
		console.log(e.responseText);
	}
});
})

function linkFilm(l) {
	return `http://www.omdbapi.com/?apikey=dca61bcc`
}


function showCard(m) {
	return `<div class="col-md-4 my-4">
				<div class="card text-center">
		           	<img src="${m.Poster}" class="card-img-top">
				   	<div class="card-body">
				   		<h5 class="card-title">${m.Title}</h5>
				        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
				        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
			     	</div>
				</div>
	      	</div>`;
};


function showMovieDetail(m){
	return `<div class="container-fluid">
				<div class="row">                
					<div class="col-md-3">
						<img src="${m.Poster}" class="img-fluid">
	                </div>
					<div class="col-md">
		                <ul class="list-group">
							<li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
							<li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
							<li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
							<li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
							<li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
						</ul>
		           	</div>				                
				</div>
			</div>`;
}