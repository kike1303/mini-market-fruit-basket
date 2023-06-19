import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  showModal: boolean;
}

const initialState: ModalState = {
  showModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalComponent: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export const { showModalComponent } = modalSlice.actions;
export default modalSlice.reducer;
