import React from 'react';
import { TUser } from '../App';
import Login from './Login/Login';
import User from './User';

type THeaderProps = {
	updateSessionID: (session_id: string) => void
	updateUser: (user: TUser) => void
	user: null | TUser
}

class Header extends React.Component<THeaderProps> {
	render(){
		return (
			<header className="row">
				<div className="col-12 bg-secondary pt-3 pb-3 mb-3 d-flex justify-content-between align-items-center">
					<nav className="">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link">Home</a>
							</li>
						</ul>
					</nav>
					{this.props.user ? <User user={this.props.user}/> : <Login updateSessionID={this.props.updateSessionID} updateUser={this.props.updateUser}/>}
					
				</div>
			</header>
		);		
	}
}

export default Header;