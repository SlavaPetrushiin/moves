import React from 'react';
import { TUser } from '../App';
import Login from './Login/Login';
import User from './User';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
	DropdownItem,
	Dropdown,

} from 'reactstrap';
import AppContextHOC from '../HOC/AppContextHOC';

type THeaderProps = {
	updateSessionID: (session_id: string) => void
	updateUser: (user: TUser) => void
	user: null | TUser
}

type IState = {
	dropdownOpen: boolean
}

class Header extends React.Component<THeaderProps, IState> {
	state: IState = {
		dropdownOpen: false
	}

	toggle = () => this.setState(prev => ({dropdownOpen: !prev.dropdownOpen}))

	render(){
		return (
			<header className="row">
				<div className="col-12 bg-secondary pt-3 pb-3 mb-3 d-flex justify-content-between align-items-center">
					<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="header-menu">
						<DropdownToggle
							tag="div"
							data-toggle="dropdown"
							aria-expanded={this.state.dropdownOpen}
						>
							{this.props.user?.username}
						</DropdownToggle>
						<DropdownMenu right>
							<div onClick={this.toggle}>Выйти</div>
						</DropdownMenu>
					</Dropdown>
					{!this.props.user && <Login updateSessionID={this.props.updateSessionID} updateUser={this.props.updateUser}/>}
				</div>
			</header>
		);		
	}
}

export default AppContextHOC(Header);