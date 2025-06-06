// Capitalize first letter
export const capitalize = (str) =>
    typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';

// Sort expenses based on option
export const sortExpenses = (expenses, option) => {
    const sorted = [...expenses];

    switch (option) {
        case 'price-low-high':
        return sorted.sort((a, b) => a.amount - b.amount);
        case 'category-az':
        return sorted.sort((a, b) => {
            const aName = a.category?.name?.toLowerCase() || '';
            const bName = b.category?.name?.toLowerCase() || '';
            return aName.localeCompare(bName);
        });
        default:
        return sorted;
    }
};
