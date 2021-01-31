import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import MoviesList from "../Main/MoviesList";
import Filters from "../Sidebar/Filters";

class MoviesPage extends React.Component {
	render(){
		return(
			<div className="row">
				<div className="col-4">
					<h4>Фильмы</h4>
					<Filters />
				</div>
				<div className="col-8">
					<MoviesList />
				</div>
			</div>
		)
	}
}

export default MoviesPage;