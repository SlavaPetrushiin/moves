import React from 'react';
import { apiAuthentication, API_KEY_3, API_URL, CallApi } from '../../api/api';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';
import { TUser } from '../../App';

type TStateLogin = {
	showModal: boolean
}

type TLoginProps = {
	updateSessionID: (session_id: string) => void
	updateUser: (user: TUser) => void
}

class Login extends React.Component<TLoginProps> {
	state: TStateLogin = {
		showModal: false
	}

	toggleModal = () => {
		this.setState((prevState: TStateLogin) => ({
			showModal: !prevState.showModal
		}))
	}

	render(){
		const showModal = this.state.showModal;

		return (
      <div>
        <button
          className="btn btn-success"
					type="button"
					onClick={this.toggleModal}
        >
          Login
        </button>
					<Modal isOpen={showModal} toggle={this.toggleModal}>
						<ModalBody>
							<LoginForm updateSessionID={this.props.updateSessionID} updateUser={this.props.updateUser}/>
						</ModalBody>
					</Modal>
      </div>
		);		
	}
}

export default Login;
