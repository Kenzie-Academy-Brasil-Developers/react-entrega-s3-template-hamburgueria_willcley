import styles from './style.module.scss';

export const ProductCard = ({ product, addToCart }) => {
  return (
    <li className={styles.card} key={product.id}>
      <div className={styles.card__img}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={styles.card__container}>
        <h3 className='title3'>{product.name}</h3>
        <span className='text3'>{product.category}</span>
        <span className={`text2-600 ${styles.container__span}`}>
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
        <button
          className='btn__primary--medium'
          onClick={() => addToCart(product)}
        >
          Adicionar
        </button>
      </div>
    </li>
  );
};
