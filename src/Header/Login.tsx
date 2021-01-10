import React from 'react';
import { API_KEY_3, API_URL } from '../api/api';

const apiAuthentication = (url: string, option = {}) => {
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
					response.json().then((error: any) => {

						reject(error);
					});
				})
	})
}

class Login extends React.Component {
	sendPromises = async () => {
		try{
			let requestToken: string;

			const authentication = await  fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`);
			if(authentication.status > 400) throw new Error ("Error authentication");
			const authenticationResult = await  authentication.json();
			requestToken = authenticationResult.request_token;

			const validateWithLogin = await fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({
					"username": "slavaPetrushin",
					"password": "",
					"request_token": requestToken
				})
			})
			if(validateWithLogin.status > 400) throw new Error ("Error validateWithLogin");

			const validateWithLoginResult = await  validateWithLogin.json();
			const {success, request_token} = validateWithLoginResult;

			const session = await fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({
					"success": success,
					"request_token": request_token
				})
			})
			if(validateWithLogin.status > 400) throw new Error ("Error session");
			let sessionResult = await  session.json();
		}
		catch(error){
			let e = error
		}
	}

	render(){
		return (
      <div>
        <button
          className="btn btn-success"
					type="button"
					onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
		);		
	}
}

export default Login;