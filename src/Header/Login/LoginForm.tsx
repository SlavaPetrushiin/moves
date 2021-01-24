import React from 'react';
import { API_KEY_3, API_URL, apiAuthentication, CallApi } from '../../api/api';
import { TUser } from '../../App';

interface IErrors {
	password?: string
	username?: string	
}

interface ITouched {
	password?: boolean
	username?: boolean	
}

interface IState {
	password: string
	username: string
	errors: IErrors
	touched: ITouched
	baseError: string
	submitting: boolean
}

type TLoginFormProps = {
	updateSessionID: (session_id: string) => void
	updateUser: (user: TUser) => void
}

class LoginForm extends React.Component<TLoginFormProps, IState> {
	state: IState = {
		password: "",
		username: "",
		errors: {},
		touched: {},
		baseError: "",
		submitting: false
	}
	
	sendLogin = async (e: any) => {
		e.preventDefault();
		this.setState({submitting: true});

		try{
			const data: any = await CallApi.get('authentication/token/new');

			const token: any = await CallApi.post('authentication/token/validate_with_login', {
				username: this.state.username,
				password: this.state.password,
				request_token: data.request_token
			})

			const session: any = await CallApi.post('authentication/session/new', {
				success: token.success,
				request_token: token.request_token
			})

			this.props.updateSessionID(session.session_id);
			
			const dataUser: any =  await CallApi.get('account', {
				session_id: session.session_id
			})
			
			this.setState({
				submitting: false
			}, () => {
				this.props.updateUser(dataUser);
			})
		}
		catch(error){
			this.setState(prev => ({
				...prev,
				baseError: error.status_message,
				submitting: false
			}));
		}
	}

	validateFields = () => {
    const errors: IErrors  = {};

    if (this.state.username === "")
      errors.username = "Заполните поле";
		
		if(this.state.password === "")	
			errors.password = "Заполните поле";

    return errors;
  };

	handleChangeField = (e: React.FormEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;

		this.setState(prev => ({
			...prev,
			[name]: value,
			baseError: "",
			errors: {
				...prev.errors,
				[name]: null
			}
		}));
	}

	handleOnBlurField = (e: React.FormEvent<HTMLInputElement>) => {
		const errors = this.validateFields();
		const name = e.currentTarget.name;

		if(Object.keys(errors).length > 0){
			this.setState(prev => ({
				...prev,
				errors: {
					...prev.errors,
					...errors
				},
				touched: {
					...prev.touched,
					[name]: true
				}
			}))
		}
	}

	render(){
		const {username, password, errors, touched, baseError, submitting} = this.state;

		return (
		<form className="row g-3">
			<div className="col-12">
				<label htmlFor="login_user" className="form-label">Пользователь</label>
				<input 
					type="text" 
					className={`form-control ${errors.username && touched.username ? "border-danger" : null}`}
					id="login_user"
					name="username"
					value={username}
					placeholder="Пользователь"
					onChange={this.handleChangeField}
					onBlur={this.handleOnBlurField}
				/>
				{errors.username && touched.username && <div className="invalid-feedback">
        	{errors.username}
      	</div>}
			</div>
			<div className="col-12">
				<label htmlFor="login_password" className="form-label">Пароль</label>
				<input 
					type="password"
					className={`form-control ${errors.password && touched.password ? "border-danger" : null}`}
					id="login_password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={this.handleChangeField}
					onBlur={this.handleOnBlurField}
				/>
				{errors.password && touched.password && <div className="invalid-feedback">
        	{errors.password}
      	</div>}
			</div>
			<div className="col-12">
				<button 
					type="submit"
					className="btn btn-primary w-100"
					onClick={this.sendLogin}
					disabled={submitting}
				>
					Вход
				</button>
			</div>
			{baseError && <div className="invalid-feedback text-center mt-2">
        	{baseError}
      	</div>}
		</form>
		);		
	}
}

export default LoginForm;
