import styles from './style.module.scss';
import { MdClose } from 'react-icons/md';
import { CartItemCard } from './CartItemCard';
import { useOutclick } from '../../hooks/useOutclick';
import { useKeydown } from '../../hooks/useKeydown';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export const CartModal = ({ cartList, setCartList, setCartAmount, setOpenModal, removeFromCart }) => {
  const totalSum = () => {
    return cartList.reduce((prevValue, product) => prevValue + product.amountPrice, 0);
  };
  let total = totalSum();
  const totalRef = useRef(null);

  const totalUpdate = () => {
    total = totalSum();

    totalRef.current.innerText = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const modalRef = useOutclick(() => {
    setOpenModal(false);
  });
  const closeBtnRef = useKeydown('Escape', (element) => {
    element.click();
  });

  return (
    <div className={styles.overlay} role='dialog'>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.modal__header}>
          <h2>Carrinho de compras</h2>
          <button
            ref={closeBtnRef}
            aria-label='close'
            title='Fechar'
            onClick={() => setOpenModal(false)}
          >
            <MdClose size={21} />
          </button>
        </div>
        <div className={styles.modal__list}>
          <ul>
            {cartList.length === 0 ? <p className='text2'>Carrinho vazio</p> : null}
            {cartList.map((product, i) => (
              <CartItemCard
                product={product}
                removeFromCart={removeFromCart}
                totalUpdate={totalUpdate}
              />
            ))}
          </ul>
        </div>
        <div className={styles.modal__value}>
          <div>
            <span className='text2-600'>Total</span>
            <span ref={totalRef} className={`text2-600 ${styles.price}`}>
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <button
            className='btn__primary'
            onClick={() => {
              if (cartList.length > 0) {
                setCartList([]);
                setCartAmount(0);
                toast.success('Carrinho esvaziado com sucesso', {
                  autoClose: 2000,
                });
              }
            }}
          >
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
