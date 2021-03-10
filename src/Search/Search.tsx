import React, { useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, Input } from 'reactstrap';
import useDebounce from './../hook/useDebounce';
import { searchMoviesThunk } from '../store/redusers';

const Search: FunctionComponent = () => {
	const [value, setValue] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const dispatch = useDispatch();

	function search(value: string): void {
		dispatch(searchMoviesThunk(value));
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value);
		debouncedSearch(e.target.value);
	};

	return (
		<InputGroup className="mb-3">
			<Input
				placeholder='Найти фильм...'
				value={value}
				onChange={onChange}
			/>
		</InputGroup>
	)
}

export default Search;