import React, { useState } from 'react';
import MoviesList from './Main/MoviesList';
import Filters from './Sidebar/Filters';

function App() {
	const [filters, setFilters] = useState({sort_by: "vote_count.asc"});

  return (
	<div className="container pt-5">
		<div className="row">
			<div className="col-4">
				<h4>Фильмы</h4>
				<Filters filters={filters} setFilters={setFilters}/>
			</div>
			<div className="col-8">
				<MoviesList filters={filters}/>
			</div>
		</div>
	</div>
  );
}

export default App;
