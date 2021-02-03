import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CallApi } from "../../api/api";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface ISimilar {
	adult: boolean
	backdrop_path: null,
	genre_ids: number[],
	id: number
	original_language: string
	original_title: string
	overview: string
	release_date: string
	poster_path: null,
	popularity: string
	title: string
	video: false,
	vote_average: number
	vote_count: number
}

interface IState {
	page: number | null
	total_pages: number | null
	videos: ISimilar[]
}

class MovieVideos extends React.Component<ChildComponentProps, IState> {
	state: IState = {
		page: null,
		total_pages: null,
		videos: []
	}

	async componentDidMount(){
		const path = this.props.match.path.split("/").filter(p => p !== "").join("/");
		const {page, total_pages, results}: any =  await CallApi.get(path);
		this.setState({
			page,
			total_pages,
			videos: results
		})
	}

	render(){
		const videos = this.state.videos;

		return (
			<div className="card-container">
				{videos.map(v => {
					return (
						<Card key={v.id} className="card-item">
							<CardImg 
								top
								width="100%"
								src={`https://image.tmdb.org/t/p/w500/${v.poster_path}`} 
								className={"card-img"}
								alt={v.title} 
							/>
							<CardBody>
								<CardTitle tag="h5">{v.title}</CardTitle>
								<CardText tag="h6" className="mb-2 text-muted">{v.vote_count}</CardText>
							</CardBody>
						</Card>
					)
				})}
			</div>
		)
	}
}

export default MovieVideos;