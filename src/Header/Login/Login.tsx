import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

type TStateLogin = {
	showModal: boolean
}

class Login extends React.Component<any, TStateLogin> {
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
							<LoginForm />
						</ModalBody>
					</Modal>
      </div>
		);		
	}
}

export default Login;
