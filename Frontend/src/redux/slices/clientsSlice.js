import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await api.get('/clients');
    return response.data;
});

export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, data }) => {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                const index = state.items.findIndex(client => client.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default clientsSlice.reducer;
