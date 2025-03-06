export const formulaSearchQuery = async (value: string) => {
    const formulaApi = process.env.NEXT_PUBLIC_FORMULA_API;
    
    if(!value) {
        console.error("No search query was found!")
       return []; 
    }

    try {
        const encodedValue = encodeURIComponent(value);

        const response = await fetch(`${formulaApi}?search=${encodedValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("response", response);

        if(!response.ok) {
            return [];
        }

        const data = await response.json();

        return data;
    } catch (e) {
        console.error("Failed to find query request", e);
        throw new Error("Failed to fetch autocomplete");
    }
}