import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
// import { toast } from "react-toastify";

export interface SessionState {
  id: string | null;
  status: "idle" | "loading" | "successful" | "failed";
  username: string | null;
  messages: { [key: string]: string };
}

const initialState: SessionState = {
  id: null,
  status: "idle",
  username: null,
  messages: {},
};

export const fetchCurrentUser = createAsyncThunk(
  "session/fetchCurrentUser",
  async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (userData: any) => {
    try {
      const response = await api.post("/login", userData);
      // if (response.statusText !== "Created") {
      //   throw new Error(response.data.message);
      // }
      window.localStorage.setItem("jwt", `${response.data.accessToken}`);

      const response2 = await api.get("/user");
      return response2.data;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logOut(state, action) {
      localStorage.removeItem("jwt");
      state.username = null;
      state.id = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "successful";
        state.username = action.payload.username;
        state.id = action.payload.userId;
      })
      .addCase(fetchCurrentUser.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "successful";
        state.id = action.payload.userId;
        state.username = action.payload.username;
        state.messages = {};
        // toast.success(`You have successfully logged in as ${state.username}`, {
        //   position: "bottom-left",
        // });
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
        // toast.error(`You failed to log in`, {
        //   position: "bottom-left",
        // });
      });
  },
});

export const { logOut } = sessionSlice.actions;

export default sessionSlice.reducer;
