import React from 'react';
import Login from './Login';

class Header extends React.Component {
	render(){
		return (
			<header className="row">
				<div className="col-12 bg-secondary pt-3 pb-3 mb-3 d-flex justify-content-between">
					<nav className="">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link">Home</a>
							</li>
						</ul>
					</nav>
					<Login />
				</div>
			</header>
		);		
	}
}

export default Header;