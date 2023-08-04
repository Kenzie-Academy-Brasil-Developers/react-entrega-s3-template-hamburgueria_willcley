import styles from './style.module.scss';
import { ProductCard } from './ProductCard';

export const ProductList = ({ productList, addToCart }) => {
  return (
    <>
      <ul className={styles.list__container}>
        {productList.length > 0 ? (
          <>
            {productList.map((product) => (
              <ProductCard
                key={product.id} 
                product={product} 
                addToCart={addToCart}
              />
            ))}
          </>
        ) : (
          <p className='text1'>Sem resultados</p>
        )}
      </ul>
    </>
  );
};
