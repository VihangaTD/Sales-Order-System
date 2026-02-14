import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await api.get('/orders');
    return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, data }) => {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        saveStatus: 'idle', 
        saveError: null,
    },
    reducers: {
        resetSaveStatus: (state) => {
            state.saveStatus = 'idle';
            state.saveError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create
            .addCase(createOrder.pending, (state) => {
                state.saveStatus = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.saveStatus = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.saveStatus = 'failed';
                state.saveError = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.saveStatus = 'loading';
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.saveStatus = 'succeeded';
                const index = state.items.findIndex(order => order.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.saveStatus = 'failed';
                state.saveError = action.error.message;
            });
    },
});

export const { resetSaveStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
