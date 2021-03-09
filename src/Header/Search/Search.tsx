import React, { useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, Input } from 'reactstrap';
import { CallApi } from '../../api/api';
import useDebounce from '../../hook/useDebounce';
import { TMovie } from '../../interfaces/interfaces';
import { searchMoviesThunk, updateMovies, updatePage } from './../../store/redusers';

interface IResSearch {
	results: TMovie[]
	page: number
}

const Search: FunctionComponent = () => {
	const [value, setValue] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const dispatch = useDispatch();

	async function search(value: string) {
		const res = await CallApi.get<IResSearch>('search/movie', {
			query: value
		});

		dispatch(updateMovies(res.results));
		dispatch(updatePage(res.page));

	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value);
		debouncedSearch(e.target.value);
	};

	return (
		<InputGroup>
			<Input
				placeholder='Search'
				value={value}
				onChange={onChange}
			/>
		</InputGroup>
	)
}

export default Search;