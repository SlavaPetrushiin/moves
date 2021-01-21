import React from 'react';
import { TUser, AppContext } from '../App';

type THeaderProps = {
	user: null |TUser
}

class User extends React.Component<THeaderProps> {
	render(){
		const {user} = this.props
		return (
			<div className="user_avatar">
				<span>{user?.username}</span>
			</div>
		);		
	}
}

export default (props: any) => {
	return (
		<AppContext.Consumer>
			{context => (
				<User user={context.user!} {...props}/>
			)}
		</AppContext.Consumer>
	)
}

