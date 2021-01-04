import React, { useState } from 'react';
import MoviesList from './Main/MoviesList';
import Filters from './Sidebar/Filters';

export type TStateFilters =  {
	sort_by: string
}

function App() {
	const [filters, setFilters] = useState<TStateFilters>({sort_by: "popularity.desc"});

	const onChangeFilters = (name: keyof TStateFilters, value: string) => {
		const newFilters = {...filters};
		newFilters[name] = value;

		setFilters(newFilters);
	}

  return (
	<div className="container pt-5">
		<div className="row">
			<div className="col-4">
				<h4>Фильмы</h4>
				<Filters filters={filters} onChangeFilters={onChangeFilters}/>
			</div>
			<div className="col-8">
				<MoviesList filters={filters}/>
			</div>
		</div>
	</div>
  );
}

export default App;
