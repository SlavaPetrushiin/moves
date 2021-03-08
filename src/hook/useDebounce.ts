import { useRef, useCallback } from 'react';

export default function useDebounce(callback: (...args: any) => any, delay: number) {
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