export const ADD_BILL = "ADD_BILL";
export const EDIT_BILL = "EDIT_BILL";
export const DELETE_BILL = "DELETE_BILL";
export const FILTER_BILLS = "FILTER_BILLS";
export const HIGHLIGHT_BILLS = "HIGHLIGHT_BILLS";

export const addBill = (bill) => ({
    type: ADD_BILL,
    payload: bill,
});

export const editBill = (bill) => ({
    type: EDIT_BILL,
    payload: bill,
});

export const deleteBill = (id) => ({
    type: DELETE_BILL,
    payload: id,
});

export const filterBills = (category) => ({
    type: FILTER_BILLS,
    payload: category,
});

export const highlightBills = () => ({
    type: HIGHLIGHT_BILLS,
});
