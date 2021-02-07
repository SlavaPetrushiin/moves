import React from 'react';
import { authorizationUser } from '../../store/redusers';
import { connect } from "react-redux";

interface IErrors {
	password?: string
	username?: string	
	repeat_password?: string
}

interface ITouched {
	password?: boolean
	username?: boolean
	repeat_password?: string	
}

interface IState {
	repeat_password: string
	password: string
	username: string
	errors: IErrors
	touched: ITouched
	baseError: string
	submitting: boolean
}

class LoginForm extends React.Component<any, IState> {
	state: IState = {
		repeat_password: "",
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

		this.props.authorizationUser(this.state.username, this.state.password);
	}

	validateFields = () => {
		const {repeat_password, password, username} = this.state;
    const errors: IErrors  = {};

    if (username === "")
      errors.username = "Заполните поле";
		
		if(password === "")	
			errors.password = "Заполните поле";
		
		if(repeat_password === ""){
			errors.repeat_password = "Введите повтороно пароль";
		}

		if(repeat_password.length > 0 && password.length > 0 && repeat_password !==  password){
			errors.repeat_password = "Пароли не совпадают";
		}

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
				[name]: null,
			}
		}));
	}

	handleOnFocusField = (e: React.FormEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name;

		if(name === "password" && this.state.repeat_password.length > 0 && this.state.errors.repeat_password){
			this.setState(prev => ({
				...prev,
				errors: {
					...prev.errors,
					repeat_password: ""
				},
			}))
		}
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
		const {username, password, errors, touched, baseError, submitting, repeat_password} = this.state;

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
					onFocus={this.handleOnFocusField}
				/>
				{errors.password && touched.password && <div className="invalid-feedback">
        	{errors.password}
      	</div>}
			</div>
			<div className="col-12">
				<label htmlFor="repeat_password" className="form-label">Повторите пароль</label>
				<input 
					type="password"
					className={`form-control ${errors.password && touched.password ? "border-danger" : null}`}
					id="repeat_password"
					name="repeat_password"
					value={repeat_password}
					placeholder="Введите повторно пароль"
					onChange={this.handleChangeField}
					onBlur={this.handleOnBlurField}
				/>
				{errors.repeat_password && touched.repeat_password && <div className="invalid-feedback">
        	{errors.repeat_password}
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

interface IDispatchToProps {
	authorizationUser: (username: string, password: string) => void;
}

export default connect(null, {authorizationUser})(LoginForm);
