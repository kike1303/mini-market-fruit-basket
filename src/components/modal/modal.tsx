import React, { ReactNode } from 'react';
import styles from './modal.module.css';
import { useDispatch } from 'react-redux';
import { showModalComponent } from '../../redux/modalSlice';
import { showShoppingCart } from '../../redux/cartSlice';

type ModalProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {

    const dispatch = useDispatch();
    
    const onClose = () => {
        dispatch(showModalComponent(false));
        dispatch(showShoppingCart(false));
    }

    return (
    <div className={styles.modal} onClick={onClose} data-testid="modal-background">
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        </div>
    </div>
    );
};

export default Modal;
