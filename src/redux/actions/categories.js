import {
  SET_CATEGORIES,
  SET_INCOMES_CATEGORIES,
  SET_EXPENSES_CATEGORIES,
} from './types';
import categoriesApi from '../../api/categories';

export const getCategories = (member_id) => async (dispatch) => {
  const res = await categoriesApi.getMemberCategories(member_id);
  dispatch({ type: SET_CATEGORIES, payload: res.data });
};

export const getIncomesCategories = (member_id) => async (dispatch) => {
  const res = await categoriesApi.getIncomesCategories(member_id);
  dispatch({ type: SET_INCOMES_CATEGORIES, payload: res.data });
};

export const getExpensesCategories = (member_id) => async (dispatch) => {
  const res = await categoriesApi.getExpensesCategories(member_id);
  dispatch({ type: SET_EXPENSES_CATEGORIES, payload: res.data });
};
