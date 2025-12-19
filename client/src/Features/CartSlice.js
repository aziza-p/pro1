import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config.js";
const initialState = {
  carts: [],
  cart: {
    items: [], // ✅ لازم array
    totalPrice: 0,
    count: 0,
    _id: null,
    userId: null,
    createdAt: null,
    updatedAt: null,
  },
  status: "idle",
  iserror: null,
};
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getAllCarts = createAsyncThunk(
  "manageCart/getAllCarts",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${SERVER_URL}/getCart/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const checkout = createAsyncThunk(
  "manageCart/checkout",
  async (userId) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/checkout`, {
        userId,
      });
      return response.data.order;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  }
);
export const addToCart = createAsyncThunk(
  "manageCart/addToCart",
  async (cartData) => {
    try {
      console.log(cartData);
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${ENV.SERVER_URL}/addToCart`, {
        userId: cartData.userId,
        productId: cartData.productId,
        quantity: cartData.quantity,
      });
      console.log(response);
      const cart = response.data.cart; //retrieve the response from the server
      return cart; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCart = createAsyncThunk(
  "manageCart/getCart",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.users.user;

    if (!user || !user.email) {
      return [];
    }

    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/getCart/${user.email}`
    );

    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "manageCart/deleteCartItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ENV.SERVER_URL}/deleteCartItem/${id}`
      );
      if (response.status === 200) {
        return id; // في حالة النجاح، نعيد الـ id
      } else {
        // إذا كانت الاستجابة ليست 200، نرجع الخطأ
        return rejectWithValue("Failed to delete item");
      }
    } catch (error) {
      // إذا حدث خطأ في الاتصال بالخادم، نرجع الخطأ مع تفاصيل إضافية
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "manageCart/updateProduct",
  async (cartData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateProduct/`, // Ensure SERVER_URL is correct
        {
          productId: cartData._id,
          pcode: cartData.pcode,
          desc: cartData.desc,
          price: cartData.price,
          quantity: cartData.quantity,
          total: cartData.quantity * cartData.price,
        }
      );

      console.log(response);
      const cart = response.data; // retrieve the cart directly from the server
      return cart; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart", //name of the state
  initialState, // initial value of the state
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder

      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload && action.payload.items) {
          state.cart = action.payload;
        }
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = {
          items: action.payload?.items || [],
        };
      })

      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cart.items = state.cart.items.filter(
          (cartItem) => cartItem._id !== action.payload
        );

        // Recalculate the total price
        state.cart.totalPrice = state.cart.items.reduce(
          (sum, item) => sum + (item.productId?.price ?? 0) * item.quantity,
          0
        );
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.iserror = true;
      })
      .addCase(getAllCarts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload;
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      });
  },
});
export const { reset } = CartSlice.actions;
export default CartSlice.reducer;
