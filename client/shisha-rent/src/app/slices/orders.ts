import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../../api";
import { NewOrderFormData } from "../../components/forms/newOrderForm/NewOrderForm";
import { OrderSwitchDoneBody } from "../../components/owner/orders/listOfOpenOrders/openOrderRow/OpenOrderRow";
import { NewExtraFormData } from "../../components/owner/extrasView/newExtra/NewExtra";
import { NewDeliveryHourFormData } from "../../components/owner/deliveryHoursView/newDeliveryHour/NewDeliveryHour";
import { NewTobaccoFormData } from "../../components/owner/tobaccosView/newTobacco/NewTobacco";

export interface Order {
  _id?: string;
  shishaName: string;
  userFullName: string;
  userAddress: string;
  dateOfDelivery: string;
  timeOfDelivery: string;
  userTelNumber: string;
  userEmailAddress: string;
  extras?: Extra[];
  tobacco: Tobacco;
  total: number;
  userNote?: string;
  createdAt?: string;
  done?: boolean;
  ownerNote?: string;
}

export interface OrdersState {
  orders: Order[];
  openOrders: Order[] | null;
  status: "idle" | "loading" | "successful" | "failed";
  messages: { [key: string]: string };
  showAllOrders: boolean;
  newOrderDate: string | null;
  offeredExtras: Extra[];
  selectedExtras: Extra[];
  offeredTobaccos: Tobacco[];
  tobaccoPrice: number;
  selectedTobacco: Tobacco | null;
  deliveryHours: DeliveryHour[];
}

export interface Extra {
  _id?: string;
  name: string;
  price: number;
}

export interface Tobacco {
  _id?: string;
  type: string;
  name: string;
  price: number;
}

export interface DeliveryHour {
  _id?: string;
  hour: number;
}

const initialState: OrdersState = {
  status: "idle",
  showAllOrders: false,
  orders: [],
  openOrders: null,
  messages: {},
  newOrderDate: null,
  offeredExtras: [],
  selectedExtras: [],
  offeredTobaccos: [],
  tobaccoPrice: 0,
  selectedTobacco: null,
  deliveryHours: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await api.get("/orders");
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error: any) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const fetchOpenOrders = createAsyncThunk(
  "orders/fetchOpenOrders",
  async () => {
    try {
      const response = await api.get("/orders/open");
      return response.data;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const postNewOrder = createAsyncThunk(
  "orders/postNewOrder",
  async (newOrder: NewOrderFormData) => {
    try {
      const response = await api.post("/order/new", newOrder);
      if (response.status === 201) {
        const response = await api.get("/orders");
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (updateOrderBody: any) => {
    try {
      const response = await api.patch("/order/update", updateOrderBody);
      if (response.status === 200) {
        const response = await api.get("/orders");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const switchOrderDoneStatus = createAsyncThunk(
  "orders/switchOrderDoneStatus",
  async (orderIdAndStatus: OrderSwitchDoneBody) => {
    try {
      const response = await api.patch("/order/done", orderIdAndStatus);
      if (response.status === 200) {
        const response = await api.get("/orders/open");
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const fetchExtras = createAsyncThunk("extras/fetchExtras", async () => {
  try {
    const response = await api.get("/extras");
    return response.data;
  } catch (error: any) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const postNewExtra = createAsyncThunk(
  "orders/postNewExtra",
  async (newExtra: NewExtraFormData) => {
    try {
      const response = await api.post(`/extra/new`, newExtra);
      if (response.status === 201) {
        const response = await api.get("/extras");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const deleteExtra = createAsyncThunk(
  "orders/deleteExtra",
  async (extraId: string) => {
    try {
      const response = await api.delete(`/extra/delete/${extraId}`);
      if (response.status === 200) {
        const response = await api.get("/extras");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const fetchTobaccos = createAsyncThunk(
  "extras/fetchTobaccos",
  async () => {
    try {
      const response = await api.get("/tobaccos");
      return response.data;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const postNewTobacco = createAsyncThunk(
  "orders/postNewTobacco",
  async (newTobacco: NewTobaccoFormData) => {
    try {
      const response = await api.post(`/tobacco/new`, newTobacco);
      if (response.status === 201) {
        const response = await api.get("/tobaccos");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const deleteTobacco = createAsyncThunk(
  "orders/deleteTobacco",
  async (tobaccoId: string) => {
    try {
      const response = await api.delete(`/tobacco/delete/${tobaccoId}`);
      if (response.status === 200) {
        const response = await api.get("/tobaccos");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const fetchDeliveryHours = createAsyncThunk(
  "deliveryHours/fetchDeliveryHours",
  async () => {
    try {
      const response = await api.get("/deliveryHours");
      return response.data;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const postNewDeliveryHour = createAsyncThunk(
  "orders/postNewDeliveryHour",
  async (deliveryHour: NewDeliveryHourFormData) => {
    try {
      const response = await api.post(`/deliveryHour/new`, deliveryHour);
      if (response.status === 201) {
        const response = await api.get("/deliveryHours");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const deleteDeliveryHour = createAsyncThunk(
  "orders/deleteDeliveryHour",
  async (deliveryHourId: string) => {
    try {
      const response = await api.delete(
        `/deliveryHour/delete/${deliveryHourId}`
      );
      if (response.status === 200) {
        const response = await api.get("/deliveryHours");
        return response.data;
      }
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  // // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSelectedExtras: (state, action: PayloadAction<Extra[]>) => {
      state.selectedExtras = action.payload || [];
    },
    updateNewOrderDate: (state, action: PayloadAction<string | null>) => {
      state.newOrderDate = action.payload;
    },
    switchShowAllOrders: (state) => {
      state.showAllOrders = !state.showAllOrders;
    },
    updateTobaccoPrice: (state, action: PayloadAction<number>) => {
      state.tobaccoPrice = action.payload;
    },
    updateSelectedTobacco: (state, action: PayloadAction<Tobacco | null>) => {
      state.selectedTobacco = action.payload;
    },
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
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const openOrdersOnly = action.payload
          .filter((order: Order) => order.done === false)
          .reverse();
        state.status = "successful";
        state.orders = action.payload;
        state.openOrders = openOrdersOnly;
      })
      .addCase(fetchOrders.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(fetchOpenOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOpenOrders.fulfilled, (state, action) => {
        state.status = "successful";
        state.openOrders = action.payload;
      })
      .addCase(fetchOpenOrders.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(postNewOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewOrder.fulfilled, (state, action) => {
        state.status = "successful";
        state.orders = action.payload;
      })
      .addCase(postNewOrder.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "successful";
        state.openOrders = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(switchOrderDoneStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(switchOrderDoneStatus.fulfilled, (state, action) => {
        state.status = "successful";
        state.openOrders = action.payload;
      })
      .addCase(switchOrderDoneStatus.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(fetchExtras.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExtras.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredExtras = action.payload;
      })
      .addCase(fetchExtras.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(postNewExtra.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewExtra.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredExtras = action.payload;
      })
      .addCase(postNewExtra.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(deleteExtra.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExtra.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredExtras = action.payload;
      })
      .addCase(deleteExtra.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(fetchTobaccos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTobaccos.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredTobaccos = action.payload;
      })
      .addCase(fetchTobaccos.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(postNewTobacco.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewTobacco.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredTobaccos = action.payload;
      })
      .addCase(postNewTobacco.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(deleteTobacco.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTobacco.fulfilled, (state, action) => {
        state.status = "successful";
        state.offeredTobaccos = action.payload;
      })
      .addCase(deleteTobacco.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(fetchDeliveryHours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeliveryHours.fulfilled, (state, action) => {
        state.status = "successful";
        state.deliveryHours = action.payload;
      })
      .addCase(fetchDeliveryHours.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(postNewDeliveryHour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewDeliveryHour.fulfilled, (state, action) => {
        state.status = "successful";
        state.deliveryHours = action.payload;
      })
      .addCase(postNewDeliveryHour.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
    builder
      .addCase(deleteDeliveryHour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDeliveryHour.fulfilled, (state, action) => {
        state.status = "successful";
        state.deliveryHours = action.payload;
      })
      .addCase(deleteDeliveryHour.rejected, (state, action: any) => {
        state.status = "failed";
        state.messages = JSON.parse(action.error.message);
      });
  },
});

export const {
  updateSelectedExtras,
  updateNewOrderDate,
  switchShowAllOrders,
  updateTobaccoPrice,
  updateSelectedTobacco,
} = ordersSlice.actions;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// // Posible selector bellow just for reference not used
export const selectOrders = (state: RootState) => state.orders.orders;

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

export default ordersSlice.reducer;
