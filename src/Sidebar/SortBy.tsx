import React from "react";
import { TFilters } from "../App";
import UISelect from "./UISelect";

type TProps = {
	filters: TFilters
	options: TOption[]
	onChangeSortBy: (name: any, value: string) => void
}

type TOption = {
	label: string
	value: string
}

class SortBy extends React.Component<TProps> {
	static defaultProps = {
		options: [
			{
				label: "Популярные по убыванию",
				value: "popularity.desc",
			},
			{
				label: "Популярные по возростанию",
				value: "popularity.asc"
			},
			{
				label: "Популярные по убыванию",
				value: "vote_average.desc"
			},
			{
				label: "Рейтинг по возростанию",
				value: "vote_average.asc"
			}
		]
	}

	onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.onChangeSortBy(e.currentTarget.name, e.currentTarget.value);
	}

	render(){
		const sort_by = this.props.filters.sort_by;
		const options = this.props.options;
		return (
			<UISelect
				value={sort_by}
				name={"sort_by"}
				id={"sort_by"}
				labelText={"Сортировать по:"}
				onChangeValue={this.onChangeValue}	
			>
				{options.map((option: TOption) => <option key={option.value} value={option.value}>{option.label}</option>)}
			</UISelect>
		)
	}
}

export default SortBy;
