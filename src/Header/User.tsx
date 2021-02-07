import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import {User} from './../store/redusers';

type THeaderProps = {
	user: null | User
}

class UserC extends React.Component<THeaderProps> {
	render(){
		const {user} = this.props;
		return (
			<div className="user_avatar">
				<span>{user?.name}</span>
			</div>
		);		
	}
}

export default AppContextHOC(UserC)

