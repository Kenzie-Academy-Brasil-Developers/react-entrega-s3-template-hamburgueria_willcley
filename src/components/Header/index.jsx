import styles from './style.module.scss';
import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { MdSearch, MdShoppingCart } from 'react-icons/md';

export const Header = ({ cartAmount, setOpenModal, setSearch }) => {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setSearch(value);
    setValue('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <img
          className={styles.header__logo}
          src={Logo}
          alt='Logo Kenzie Burguer'
        />
        <div className={styles.header__form}>
          <div>
            <button className='btn__cart' onClick={() => setOpenModal(true)}>
              <MdShoppingCart size={24} />
              <span>{cartAmount}</span>
            </button>
          </div>
          <form className='input__search' onSubmit={submit}>
            <input
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Digitar Pesquisa'
            />
            <button className='btn__primary--medium'>
              <MdSearch size={21} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
