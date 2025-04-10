export const BookFlightLocators = {
    departFromInput: 'input[placeholder=\'Depart from\']',
    destinationInput: 'input[placeholder=\'Going to\']',
    dropdownOptions: 'li[role="option"]',
    dropdownOptionByText: (text: string) =>
        `li[role="option"]:has-text("${text}")`,
    findFlightButton: 'button:has-text("Find flights")',
    selectedDate: 'div[aria-selected="true"][class*="day--selected"]:not([class*="outside-month"])',
    tripTypeDropdown: 'div[role="button"][aria-haspopup="listbox"]',
    tripTypeOption: (value: string) => `li[data-value="${value}"]`
};