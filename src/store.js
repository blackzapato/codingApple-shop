import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'

let cartStock = createSlice({
  name: "cartStock",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers : {
    addCount(state, action){
      let idx = state.findIndex(v => v.id == action.payload);
      state[idx].count++
    },
    addCart(state, action){
      state.push(action.payload);
    },
    delCount(state, action){
      let idx = state.findIndex(v => v.id == action.payload);
      state[idx].count = state[idx].count -1;
      if(state[idx].count < 1){
        state.splice(idx, 1);
      }
    }
  }
});

export let {addCount,addCart, delCount} = cartStock.actions

export default configureStore({
  reducer: { cartStock: cartStock.reducer, user: user.reducer },
});
