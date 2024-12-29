import {
  ADD_BILL,
  EDIT_BILL,
  DELETE_BILL,
  FILTER_BILLS,
  HIGHLIGHT_BILLS,
} from "../actions/actionTypes.js";



const initialState = {
  bills: [],
  filteredBills: [],
  totalAmount: 0,
  monthlyBudget: 50000, // Default budget
  highlightedBills: [],
};

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BILL:
      const updatedBills = [
        ...state.bills,
        { ...action.payload, id: state.bills.length + 1 },
      ];
      return {
        ...state,
        bills: updatedBills,
        filteredBills: updatedBills,
        totalAmount: updatedBills.reduce(
          (sum, bill) => sum + parseFloat(bill.amount),
          0
        ),
      };

    case EDIT_BILL:
      const billsAfterEdit = state.bills.map((bill) =>
        bill.id === action.payload.id ? { ...bill, ...action.payload } : bill
      );
      return {
        ...state,
        bills: billsAfterEdit,
        filteredBills: billsAfterEdit,
        totalAmount: billsAfterEdit.reduce(
          (sum, bill) => sum + parseFloat(bill.amount),
          0
        ),
      };

    case DELETE_BILL:
      const billsAfterDelete = state.bills.filter(
        (bill) => bill.id !== action.payload
      );
      return {
        ...state,
        bills: billsAfterDelete,
        filteredBills: billsAfterDelete,
        totalAmount: billsAfterDelete.reduce(
          (sum, bill) => sum + parseFloat(bill.amount),
          0
        ),
      };

    case FILTER_BILLS:
      const filtered = action.payload
        ? state.bills.filter((bill) => bill.category === action.payload)
        : state.bills;
      return {
        ...state,
        filteredBills: filtered,
      };

    case HIGHLIGHT_BILLS:
      let budgetRemaining = state.monthlyBudget;
      const highlighted = [];

      // Sort bills by amount (ascending order)
      const sortedBills = [...state.bills].sort(
        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
      );

      // Select bills within budget
      for (const bill of sortedBills) {
        const billAmount = parseFloat(bill.amount);
        if (budgetRemaining >= billAmount) {
          budgetRemaining -= billAmount;
          highlighted.push(bill);
        } else {
          break; // Exit early if the budget is exceeded
        }
      }

      return {
        ...state,
        highlightedBills: highlighted,
      };

    //     case HIGHLIGHT_BILLS:
    //       let budgetRemaining = state.monthlyBudget;
    //       const highlighted = [];
    //       const sortedBills = [...state.bills].sort(
    //         (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
    //       );

    //       for (const bill of sortedBills) {
    //         if (budgetRemaining - parseFloat(bill.amount) >= 0) {
    //           budgetRemaining -= parseFloat(bill.amount);
    //           highlighted.push(bill);
    //         } else {
    //           break;
    //         }
    //       }

    //       return {
    //         ...state,
    //         highlightedBills: highlighted,
    //       };

    default:
      return state;
  }
};

export default billReducer;
