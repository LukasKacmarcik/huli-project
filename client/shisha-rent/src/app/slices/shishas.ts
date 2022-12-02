import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../../api";
import { NewShishaFormData } from "../../components/forms/newShishaForm/NewShishaForm";

export interface Shisha {
  name: string;
  description: string;
  price: number;
  selectedFile: string;
  note?: string;
}

export interface ShishasState {
  shishas: Shisha[];
  status: "idle" | "loading" | "successful" | "failed";
  messages: { [key: string]: string };
}

const initialState: ShishasState = {
  status: "idle",
  shishas: [],
  messages: {},
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchShishas = createAsyncThunk(
  "shishas/fetchShishas",
  async () => {
    try {
      const response = await api.get("/shishas");
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const postNewShisha = createAsyncThunk(
  "shishas/postNewShisha",
  async (newShisha: NewShishaFormData) => {
    try {
      const response = await api.post("/shisha/new", newShisha);
      console.log(response.status);
      if (response.status === 201) {
        const response = await api.get("/shishas");
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const shishasSlice = createSlice({
  name: "shishas",
  initialState,
  // // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchShishas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShishas.fulfilled, (state, action) => {
        state.status = "successful";
        state.shishas = action.payload;
      })
      .addCase(fetchShishas.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(postNewShisha.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewShisha.fulfilled, (state, action) => {
        state.status = "successful";
        state.shishas = action.payload;
      })
      .addCase(postNewShisha.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShishas = (state: RootState) => state.shishas.shishas;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default shishasSlice.reducer;
