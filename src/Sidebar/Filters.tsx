import React from "react";

class Filters extends React.Component {
	render(){
		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<select className="form-select" id="sort_by">
						<option selected>Популярные по убыванию</option>
						<option value="1">Популярные по возростанию</option>
						<option value="2">Рейтинг по убыванию</option>
						<option value="3">Рейтинг по возростанию</option>
					</select>	
				</form>
		)
	}
}

export default Filters;