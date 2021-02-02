import React from "react";
import { API_KEY_3, API_URL, CallApi } from "../../api/api";
import { RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardText, CardTitle } from "reactstrap";
import MovieTabs from "./MovieTabs";

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

type IState = {
	movie: any
}

class MoviePage extends React.Component<ChildComponentProps, IState>{
	state: IState = {
		movie: {
			
		}
	}

	async componentDidMount(){
		const movie: any = await CallApi.get(`movie/${this.props.match.params.id}`);
		this.setState({movie});
		console.log("movie: ", movie);
	}

	render(){
		const {movie} = this.state;

		return(
			<>
				<div className="row mb-3">
					<div className="col-4">
						<Card body>
							<img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt=""/>
						</Card>
					</div>
					<div className="col-8">
						<CardTitle tag="h5">
							{movie.title}
							<span>({movie.release_date})</span>
						</CardTitle>
						<CardText>
							{movie.release_date && movie.release_date.split("-").join("/")}
							</CardText>
						<CardText>{movie.overview}</CardText>
					</div>
				</div>
				<MovieTabs id={this.props.match.params.id}/>
			</>
		)
	}
}

export default MoviePage;