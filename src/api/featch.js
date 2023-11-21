
import { baseUrl } from "./constant";
export const getAutocompleteSuggestions = async (searchTerm) => {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
        throw new Error('Failed to fetch autocomplete suggestions');
    }
    return response.json();
};
export default getAutocompleteSuggestions;