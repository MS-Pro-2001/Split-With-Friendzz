const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const initialState = {
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case DELETE_USER:
      const updatedData = state.data.filter(
        (user) => user._id !== action.payload
      );
      console.log({ updatedData });
      return {
        ...state,
        data: updatedData,
      };
    default:
      return state;
  }
};

export default userReducer;
