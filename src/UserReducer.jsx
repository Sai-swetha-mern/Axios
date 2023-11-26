
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },

    editUser: (state, action) => {
        const { id, name, email, username } = action.payload;
        
        return state.map(user =>
          user.id === id ? { ...user, name, email, username } : user
        );

      }
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
);

export const { setUsers, addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;