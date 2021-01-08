import React from "react";
import { TFilters } from "../App";

type TProps = {
	filters: TFilters
	options: TOption[]
	onChangeSortBy: (name: any, value: string) => void
}

type TOption = {
	label: string
	value: string
}

class PrimaryReleaseYear extends React.Component<TProps> {
	static defaultProps = {
		options: [
			{
				label: "2020",
				value: 2020
			},
			{
				label: "2019",
				value: 2019
			},
			{
				label: "2018",
				value: 2018
			},
			{
				label: "2017",
				value: 2017
			},
			{
				label: "2016",
				value: 2016,
			}
		]
	}

	onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.onChangeSortBy(e.currentTarget.name, e.currentTarget.value);
	}

	render(){
		const primary_release_year = this.props.filters.primary_release_year;
		const options = this.props.options;

		return (
					<select
						value={primary_release_year}
						onChange={this.onChangeValue}
						className="form-select mb-3"
						name="primary_release_year"
						id="primary_release_year"
					>
						{options.map((option: TOption) => <option key={`primary_release_year_${option.value}`} value={option.value}>{option.label}</option>)}
					</select>
		)
	}
}

export default PrimaryReleaseYear;