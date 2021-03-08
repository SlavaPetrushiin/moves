import React, { useState, FunctionComponent } from 'react';
import { InputGroup, Input } from 'reactstrap';
import useDebounce from '../../hook/useDebounce';
import { CallApi } from './../../api/api';

const Search: FunctionComponent = () => {
	const [value, setValue] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	function search(value: string) {
		CallApi.get('search/movie', {
			query: value
		});
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