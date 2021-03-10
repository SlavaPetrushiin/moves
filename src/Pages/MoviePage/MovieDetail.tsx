import React, { FunctionComponent, useEffect } from "react";
import { CallApi } from "../../api/api";
import { useLocation } from "react-router-dom";

const MovieDetail: FunctionComponent = () => {
	let location = useLocation<any>();

	useEffect(() => {
		const path = location.pathname.split("/").filter((p) => p !== "").filter((d, i) => i < 2).join("/");
		CallApi.get(path)
	}, [])

	return (
		<div>MovieDetail</div>
	)
}

export default MovieDetail;