import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { CallApi } from "../../api/api";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface ICast {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string
	cast_id: number
	character: string
	credit_id: string
	order: number
}

interface IState {
	cast: ICast[]
}

class MovieCredits extends React.Component<ChildComponentProps, IState> {
	state: IState = {
		cast: [],
	}

	async componentDidMount(){
		const path = this.props.match.path.split("/").filter(p => p !== "").join("/");
		const credits: any = await CallApi.get(path);
		this.setState({cast: credits.cast});
	}

	render(){
		const cast = this.state.cast;

		return (
			<div className="card-container">
					{cast.map(c => {
						return (
						<Card key={c.id} className="card-item">
							<CardImg 
								top
								width="100%"
								src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} 
								className={"card-img"}
								alt={c.name} 
							/>
							<CardBody>
								<CardTitle tag="h5">{c.name}</CardTitle>
								<CardText tag="h6" className="mb-2 text-muted">{c.original_name}</CardText>
							</CardBody>
						</Card>
						)
					})}
			</div>
		)
	}
}

export default MovieCredits;