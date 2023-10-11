import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DogState {
  dogData: number[];
}

const initialState: DogState = {
  dogData: [],
};

const dogSlice = createSlice({
  name: "dog",
  initialState,
  reducers: {
    setDogs: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        dogData: action.payload,
      };
    },
    getDogs: (state) => {
      return { ...state };
    },
  },
});

export const dogActions = dogSlice.actions;
export default dogSlice;

/*
const dogReducer = (state = initialState, action: DogAction) => {
  switch (action.type) {
    case "SET_DOGS":
      return {
        ...state,
        dogData: action.payload,
      };
    default:
      return state;
  }
};
export default dogReducer;
*/
