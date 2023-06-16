import { AiOutlineSearch } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';

import styles from './Searchbar.module.css';
import transactionsApi from '../api/transactions';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Searchbar = ({ member_id }) => {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState('bob');
  const [open, setOpen] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await transactionsApi.searchTransactions(
        member_id,
        name
      );

      if (response.status === 200) {
        setTransactions(response.data);
      }
    };

    fetchTransactions();
  }, [member_id, name]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <header className={styles.header}>
      <AiOutlineSearch className={styles.header_icon} name='search' />
      <input
        type='text'
        placeholder='Search'
        className={styles.header_searchbar}
        onChange={handleNameChange}
      />
      <IoNotificationsOutline
        className={styles.header_icon + ' ' + styles.notification}
        name='notifications-outline'
      />

      {open && transactions.length > 0 && (
        <ul className={styles.header_transactions}>
          <li className={styles.transaction_header}>Transactions</li>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <NavLink
                to={`/member/${transaction.member_id}/categories/${transaction.category_id}`}
                className={styles.transaction}
                onClick={() => setOpen(false)}
              >
                <p className={styles.name}>
                  <AiOutlineSearch name='search' />

                  {transaction.name}
                </p>
                <p className={styles.amount}>$ {transaction.amount}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
export default Searchbar;
