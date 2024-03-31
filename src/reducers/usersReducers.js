import { getUniqueId } from '../../utils/helperFunctions';

/* eslint-disable no-case-declarations */
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const ADD_EXPENSE = 'ADD_EXPENSE';

const initialState = {
  membersData: [],
  expenseData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        membersData: [action.payload, ...state.membersData],
      };
    case DELETE_USER:
      // eslint-disable-next-line no-case-declarations
      const updatedData = state.membersData.filter(
        (user) => user._id !== action.payload
      );
      console.log({ updatedData });
      return {
        ...state,
        membersData: updatedData,
      };

    case ADD_EXPENSE:
      console.log({ payload: action.payload });
      const totalAmount = action.payload.price;
      const toSplitBetween = action.payload.splitBetween.map(
        (user) => user.name
      );
      const expenseDescription = action.payload.description;
      const paidBy = action.payload.paidBy;

      const result = splitWithFriends(
        paidBy,
        toSplitBetween,
        totalAmount,

        expenseDescription
      );

      return { ...state, expenseData: [result, ...state.expenseData] };
    default:
      return state;
  }
};

export default userReducer;

function splitWithFriends(
  paidBy,
  users,
  totalAmount,

  expenseDescription
) {
  const totalUsers = users.length;
  const amountPerPerson = totalAmount / totalUsers;

  // Initialize the users object for this expense
  const usersObj = {};
  users.forEach((userName) => {
    if (userName !== paidBy) {
      usersObj[paidBy] = { 'dena hain': [], 'lena hain': [] };
      usersObj[userName] = { 'dena hain': [], 'lena hain': [] };
    }
  });

  // Calculate how much each member owes or is owed
  users.forEach((userName) => {
    if (userName !== paidBy) {
      const amountOwed = amountPerPerson;
      usersObj[paidBy]['lena hain'].push({
        username: userName,
        amount: amountOwed,
      });
      usersObj[userName]['dena hain'].push({
        username: paidBy,
        amount: amountOwed,
      });
    }
  });

  // Assign the users object to the expense
  const payload = {
    _id: getUniqueId(),
    description: expenseDescription,
    users: usersObj,
  };

  return payload;
}

// Example usage
// const paidBy = 'User 1'; // Assuming User 1 paid
// const users = ['User 1', 'User 2', 'User 3', 'User 4']; // Array of usernames
// const totalAmount = 100; // Total amount paid
// const expenseId = "1"; // Expense ID
// const expenseDescription = "Dinner with friends"; // Expense description
