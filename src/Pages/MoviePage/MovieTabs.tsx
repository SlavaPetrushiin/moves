import React from 'react';
import { Route, Switch, NavLink} from 'react-router-dom';
import { TabContent, Nav, NavItem } from 'reactstrap';
import MovieCredits from './MovieCredits';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';

interface IProps {
	id: string
}

class MovieTabs extends React.Component<IProps>{
	state = {
		activeTab: '1'
	}

	toggleTab = (tab: string) => {
		if (this.state.activeTab !== tab) 
			this.setState({activeTab: tab})
	}
	render(){
		return(
			<div>
				<Switch>
					<Nav tabs className="mb-3">
						<NavItem>
							<NavLink
								to={`/movie/${this.props.id}/detail`}
								className={`nav-link`}
								onClick={() => { this.toggleTab('1'); }}
								activeStyle={{color:"green"}}
							>
								Детали
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								to={`/movie/${this.props.id}/credits`}
								className={`nav-link`}
								onClick={() => { this.toggleTab('2'); }}
								activeStyle={{color:"green"}}
							>
								Актеры
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								to={`/movie/${this.props.id}/similar`}
								className={`nav-link`}
								onClick={() => { this.toggleTab('3'); }}
								activeStyle={{color:"green"}}
							>
								Похожие фильмы
							</NavLink>
						</NavItem>
					</Nav>
				</Switch>
				<TabContent activeTab={this.state.activeTab}>
					<Switch>
						<Route path={`/movie/${this.props.id}/detail`} component={MovieDetail}/>
						<Route path={`/movie/${this.props.id}/credits`} component={MovieCredits}/>
						<Route path={`/movie/${this.props.id}/similar`} component={MovieVideos}/>
					</Switch>
				</TabContent>
    	</div>
		)
	}
}

export default MovieTabs;