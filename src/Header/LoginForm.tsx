import React from 'react';
import { API_KEY_3, API_URL } from '../api/api';

interface IState {
	password: string
	name: string
	errorName: boolean
	errorPassword: boolean
}

class LoginForm extends React.Component<any, IState> {
	state: IState = {
		password: "",
		name: "",
		errorName: false,
		errorPassword: false,
	}

	/*sendPromises = () => {
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
	}*/

	handleChangeField = (e: React.FormEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		const dataName: string = e.currentTarget.dataset.error!;

		this.setState(prev => ({...prev, [name]: value, [dataName]: false}));
	}

	handleOnBlurField = (e: React.FormEvent<HTMLInputElement>) => {
		const dataName: string = e.currentTarget.dataset.error!;
		const value = e.currentTarget.value;

		if(value.trim().length === 0) {
			this.setState(prev => ({...prev, [dataName]: true}))
		}
	}

	disabled = () => {
		return this.state.errorName || this.state.errorPassword || this.state.name.length === 0 || this.state.password.length === 0
	}

	render(){
		const {name, password, errorName, errorPassword} = this.state;

		return (
		<form className="row g-3">
			<div className="col-12">
				<label htmlFor="login_user" className="form-label">Пользователь</label>
				<input 
					type="text" 
					className={`form-control ${errorName ? "border-danger" : null}`}
					id="login_user"
					name="name"
					data-error="errorName"
					value={name}
					placeholder="Пользователь"
					onChange={this.handleChangeField}
					onBlur={this.handleOnBlurField}
				/>
			</div>
			<div className="col-12">
				<label htmlFor="login_password" className="form-label">Пароль</label>
				<input 
					type="password"
					className={`form-control ${errorPassword ? "border-danger" : null}`}
					id="login_password"
					name="password"
					data-error="errorPassword"
					value={password}
					placeholder="Пароль"
					onChange={this.handleChangeField}
					onBlur={this.handleOnBlurField}
				/>
			</div>
			<div className="col-12">
				<button 
					type="submit"
					className="btn btn-primary"
					disabled={this.disabled()}
				>
					Вход
				</button>
			</div>
		</form>
		);		
	}
}

export default LoginForm;
