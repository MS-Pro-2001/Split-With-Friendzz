const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const ADD_EXPENSE = 'ADD_EXPENSE';

export const addUser = (userObj = {}) => {
  return {
    type: ADD_USER,
    payload: userObj,
  };
};

export const deleteUser = (userId = '') => {
  return {
    type: DELETE_USER,
    payload: userId,
  };
};

export const addExpense = (expense = {}) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};
