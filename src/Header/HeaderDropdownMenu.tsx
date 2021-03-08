import React from 'react';
import {
  DropdownToggle,
	Dropdown,
	DropdownMenu
} from 'reactstrap';
import {IUser} from './../interfaces/interfaces';

type IState = {
	dropdownOpen: boolean
}

interface IDropdownProps {
	logOut: () => void
	user: null | IUser
}

class HeaderDropdownMenu extends React.Component<IDropdownProps, IState> {
	state: IState = {
		dropdownOpen: false
	}

	toggle = () => this.setState(prev => ({dropdownOpen: !prev.dropdownOpen}));

	handleClickLogOut = () => {
		this.props.logOut();
		this.toggle();
	};

	render(){
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="header-menu">
				<DropdownToggle
					tag="div"
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					{this.props.user?.username}
				</DropdownToggle>
				<DropdownMenu right>
					<div onClick={this.handleClickLogOut} className="dropdown-item">Выйти</div>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

export default HeaderDropdownMenu;