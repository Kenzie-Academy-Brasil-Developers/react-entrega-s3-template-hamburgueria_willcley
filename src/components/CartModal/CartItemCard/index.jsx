import { useRef } from 'react';
import styles from './style.module.scss';
import { MdDelete } from 'react-icons/md';

export const CartItemCard = ({ product, removeFromCart, totalUpdate }) => {
   const amountRef = useRef(null);
   
   return (
      <li className={styles.card} key={product.id}>
         <div className={styles.card__content}>
            <img src={product.img} alt={product.name} />
            <div>
               <h3 className='title3'>{product.name}</h3>
               {product.amount > 1 ? (
                  <p
                     ref={amountRef}
                     className='text2'
                  >x{product.amount}</p>
               ) : null}
            </div>
         </div>
         <button
            aria-label='delete'
            title='Remover item'
            onClick={() => {
               removeFromCart(product);

               if (product.amount > 1) {
                  amountRef.current.innerText = `x${product.amount}`;
               } else if (product.amount === 1) {
                  amountRef.current.innerText = '';
               }

               totalUpdate();
            }}
         >
            <MdDelete size={21} />
         </button>
      </li>
   );
};
