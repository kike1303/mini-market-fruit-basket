import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from './modal';

const mockStore = configureStore();

describe('Modal', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn(); // Mock dispatch function

        render(
            <Provider store={store}>
                <Modal>
                    <div>Modal Content</div>
                </Modal>
            </Provider>
        );
    });

    test('renders modal with child content', () => {
        const modalContent = screen.getByText('Modal Content');
        expect(modalContent).toBeInTheDocument();
    });

    test('closes modal when clicking outside of the content', () => {
        const modalBackground = screen.getByTestId('modal-background');
        fireEvent.click(modalBackground);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    test('does not close modal when clicking on content', () => {
        const modalContent = screen.getByText('Modal Content');
        fireEvent.click(modalContent);
        expect(store.dispatch).not.toHaveBeenCalled();
    });
});
