import { useState, useEffect } from 'react';

 const useDebounce = (searchTerm :any, delay : number) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(searchTerm);
            }, delay);
                //Clear timeout handler
            return () => {
                clearTimeout(handler);
            };
        },
        [searchTerm, delay] 
    );

    return debouncedValue;
}

export default useDebounce;