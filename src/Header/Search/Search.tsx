import React, { useState, useRef, FunctionComponent, useCallback } from 'react';
import { InputGroup, Input } from 'reactstrap';
import { CallApi } from './../../api/api';

function useDebounce(callback: (...args: any) => any, delay: number) {
	const timer = useRef<any>();

	const debouncedCallback = useCallback((...args) => {
		if (timer.current) {
			clearTimeout(timer.current);
		}

		timer.current = setTimeout(() => {
			callback(...args);
		}, delay)
	}, [callback, delay]);
	

	return debouncedCallback;
}

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