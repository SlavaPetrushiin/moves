import React from "react";

type TProps = {
	page: number
	totalPage: number
	onChangePage: (page: number) => void
}

class Pagination extends React.Component<TProps> {
	render(){
		const page = this.props.page;
		const totalPage = this.props.totalPage;
		const onChangePage = this.props.onChangePage;

		return (
			<div>
				<div className="btn-group">
				<button
					onClick={() => onChangePage(page - 1)}
					type="button" className="btn btn-secondary"
					disabled={page === 1}
				>
					Назад
				</button>
				<button 
					onClick={() => onChangePage(page + 1)}
					type="button" className="btn btn-secondary"
					disabled={page === totalPage}
				>
					Вперед
				</button>
				</div>
				<div>
					<p>Страница: {page} из {totalPage}</p>
				</div>
			</div>
		)
	}
}

export default Pagination;