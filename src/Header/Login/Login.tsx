import React from 'react';
import { API_KEY_3, API_URL } from '../../api/api';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';
import { TUser } from '../../App';

const apiAuthentication = (url: string = "", option = {}) => {
	return new Promise((resolve, reject) => {
			fetch(url, option)
				.then(response => {
					if(response.status < 400){
						return response.json();
					} else {
						throw response;
					}
				})
				.then(data => resolve(data))
				.catch(response  => {
					response.json().then((error: string) => {
						reject(error);
					});
				})
	})
}

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

	sendPromises = () => {
		apiAuthentication(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
			.then((data: any) => {
				return apiAuthentication(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
					method: "POST",
					mode: "cors",
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						"username": "slavaPetrushin",
						"password": "488661632sla",
						"request_token": data.request_token
					})
				})
			})
			.then((data: any) => {
				return apiAuthentication(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
					method: "POST",
					mode: "cors",
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						"success": data.success,
						"request_token": data.request_token
					})
				})
			})
      .then(data => {
        console.log("session", data);
      })
      .catch(error => {
        console.log("error", error);
			});
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
					//onClick={this.sendPromises}
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
