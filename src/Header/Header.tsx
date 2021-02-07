import React from 'react';
import Login from './Login/Login';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import {logOutThunk, User} from './../store/redusers';

interface IMapStateToProps {
	user: User | null
}

interface IMapDispatchToProps {
	logOutThunk: () => void
}


class Header extends React.Component<any & IMapStateToProps & IMapDispatchToProps> {
	render(){
		return (
			<header className="row">
				<div className="col-12 bg-secondary pt-3 pb-3 mb-3 d-flex justify-content-end align-items-center">
					{this.props.user 
						? <HeaderDropdownMenu
							logOut={this.props.logOutThunk}
							user={this.props.user}
						/>
						: <Login />
					}
				</div>
			</header>
		);		
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, {logOutThunk})(Header);