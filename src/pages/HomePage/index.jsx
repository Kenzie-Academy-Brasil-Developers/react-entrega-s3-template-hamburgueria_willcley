import { useEffect, useState } from 'react';
import { CartModal } from '../../components/CartModal';
import { Header } from '../../components/Header';
import { ProductList } from '../../components/ProductList';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const localCartList = localStorage.getItem('@MYCARTLIST');
  const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : []);
  const [cartAmount, setCartAmount] = useState(localCartList ? (
    JSON.parse(localCartList).reduce((sum, item) => sum + item.amount, 0)
  ) : 0);
  const [openModal, setOpenModal] = useState(false);
  
  const [search, setSearch] = useState('');
  const productListResult = productList.filter(product => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase())
    ) || (
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    const apiProducts = async () => {
      const newProductList = await api.get('/products')
      .then(res => setProductList(res.data))
      .catch(err => {
        throw new Error(err.message);
      })
      .catch(err => {
        toast.error(err.message, {
          autoClose: 4000,
          theme: 'colored',
        });
      })
    };
    apiProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('@MYCARTLIST', JSON.stringify(cartList));
  }, [cartList]);
  
  const addToCart = (item) => {
    if (!cartList.some(cartItem => cartItem.id === item.id)) {
      item.amount = 1;
      item.amountPrice = item.price;
      setCartList([...cartList, item]);

      toast.success(`${item.name} adicionado ao carrinho`, {
        autoClose: 2000,
      });
    } else {
      const itemOnCart = cartList.find(cartItem => cartItem.id === item.id);
      itemOnCart.amount++;
      itemOnCart.amountPrice = itemOnCart.price * itemOnCart.amount;

      localStorage.setItem('@MYCARTLIST', JSON.stringify(cartList));

      toast.success(`Quantidade de ${item.name} no carrinho: ${item.amount}`, {
        autoClose: 2000,
      });
    }

    setCartAmount(cartAmount + 1);
  };

  const removeFromCart = (item) => {
    if (item.amount === 1) {
      const newCartList = cartList.filter(cartItem => cartItem.id !== item.id);
      setCartList(newCartList);
    } else {
      item.amount--;
      item.amountPrice -= item.price;
      
      localStorage.setItem('@MYCARTLIST', JSON.stringify(cartList));
    }

    toast.success(`${item.name} removido`, {
      autoClose: 1000,
    });
    
    setCartAmount(cartAmount - 1);
  };

  return (
    <>
      <Header
        cartList={cartList}
        cartAmount={cartAmount}
        setOpenModal={setOpenModal}
        search={search}
        setSearch={setSearch}
      />
      <main>
        <ProductList
          productList={search ? productListResult : productList}
          addToCart={addToCart}
        />
        {openModal ? (
          <CartModal
            cartList={cartList}
            setCartList={setCartList}
            setOpenModal={setOpenModal}
            removeFromCart={removeFromCart}
          />
        ) : null}
      </main>
    </>
  );
};
