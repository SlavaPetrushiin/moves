import React from "react";
import { AppContext } from "../App"

export default (Component: any) => class AppContextHOX extends React.Component {
	render(){
		return (
			<AppContext.Consumer>
				{context => (
					<Component {...context} {...this.props}/>
				)}
			</AppContext.Consumer>
		)
	}
};
