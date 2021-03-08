import React, { FunctionComponent} from "react";

type TProps = {
	page: number
	totalPage: number
	onChangePage: (page: number) => void
}

const  Pagination: FunctionComponent<TProps>  = ({page, totalPage, onChangePage}) =>  {
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

export default Pagination;