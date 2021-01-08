import React from "react";

type TProps = {
	value: string
	name: string
	id: string
	labelText: string
	children: React.ReactNode
	onChangeValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

class UISelect extends React.Component<TProps> {
	render(){
		const { id, name, value, onChangeValue, labelText, children } = this.props;

		return (
			<>
				<label htmlFor="sort_by">{labelText}</label>
				<select
					className="form-select mb-3"
					value={value}
					name={name}
					id={id}
					onChange={onChangeValue}
				>
					{children}
				</select>
			</>
		)
	}
}

export default UISelect;