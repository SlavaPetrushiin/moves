import React from 'react';
import { TUser } from '../App';
import Login from './Login/Login';
import AppContextHOC from '../HOC/AppContextHOC';
import HeaderDropdownMenu from './HeaderDropdownMenu';

type THeaderProps = {
	updateSessionID: (session_id: string) => void
	updateUser: (user: TUser) => void
	logOut: () => void
	user: null | TUser
}

class Header extends React.Component<THeaderProps> {
	render(){
		return (
			<header className="row">
				<div className="col-12 bg-secondary pt-3 pb-3 mb-3 d-flex justify-content-end align-items-center">
					{this.props.user 
						? <HeaderDropdownMenu
							logOut={this.props.logOut}
							user={this.props.user}
						/>
						: <Login 
							updateSessionID={this.props.updateSessionID}
							updateUser={this.props.updateUser}
						/>
					}
				</div>
			</header>
		);		
	}
}

export default AppContextHOC(Header);