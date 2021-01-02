import React from 'react';
import MoviesList from './Main/MoviesList';
import Filters from './Sidebar/Filters';

function App() {
  return (
	<div className="container pt-5">
		<div className="row">
			<div className="col-4">
				<h4>Фильмы</h4>
				<Filters />
			</div>
			<div className="col-8">
				<MoviesList />
			</div>
		</div>
	</div>
  );
}

export default App;
