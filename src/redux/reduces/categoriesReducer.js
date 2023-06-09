import {
  SET_CATEGORIES,
  SET_INCOMES_CATEGORIES,
  SET_EXPENSES_CATEGORIES,
} from '../actions/types';

const initialState = {
  categories: [],
  incomesCategories: [],
  expensesCategories: [],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_INCOMES_CATEGORIES:
      return {
        ...state,
        incomesCategories: action.payload,
      };
    case SET_EXPENSES_CATEGORIES:
      return {
        ...state,
        expensesCategories: action.payload,
      };
    default:
      return state;
  }
}
