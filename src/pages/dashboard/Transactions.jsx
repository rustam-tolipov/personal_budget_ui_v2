import { IoAddOutline } from 'react-icons/io5';
import styles from './Transactions.module.css';
import { useEffect, useState } from 'react';
import transactionsApi from '../../api/transactions';
import { NavLink, useParams } from 'react-router-dom';
import TransactionModal from '../category/TransactionModal';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Transactions = ({ categories }) => {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  const currentUser = useSelector((state) => state.auth.currentUser);
  
  const { member_id = currentUser.member_id } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await transactionsApi.getRecentTransactions(member_id);

      if (response.status === 200) {
        setTransactions(response.data);
      }
    };

    fetchTransactions();
  }, [member_id]);

  return (
    <div className={styles.transactions}>
      {categories.length > 0 ? (
        <button
          type='button'
          className={styles.transaction_btn}
          onClick={() => setOpenModal(true)}
        >
          Add New Transaction
          <IoAddOutline size='2.4rem' />
        </button>
      ) : (
        <button type='button' className={styles.transaction_btn}>
          No Categories Yet
        </button>
      )}

      <div className={styles.items}>
        <div className={styles.items_list}>
          {transactions &&
            transactions.map((transaction, index) => (
              <NavLink
                className={styles.list_item}
                key={index}
                to={`/member/${member_id}/transactions/${transaction.id}`}
              >
                <h3>{transaction.name}</h3>
                <div className={styles.item_details}>
                  <p>{transaction.date}</p>
                  <p>
                    {transaction.group === 'income'
                      ? `+$ ${transaction.amount}`
                      : `-$ ${transaction.amount}`}
                  </p>
                </div>
              </NavLink>
            ))}
        </div>
      </div>

      {openModal && (
        <TransactionModal
          open={openModal}
          setOpen={setOpenModal}
          member_id={Number(member_id)}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
    </div>
  );
};

Transactions.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Transactions;
