import { useEffect, useState } from 'react';
import styles from './Category.module.css';
import transactionsApi from '../../api/transactions';
import TransactionModal from './TransactionModal';
import PropTypes from 'prop-types';
import RedirectTitle from '../../components/RedirectTitle';
import { useParams } from 'react-router-dom';
import CategoriesModalUpdate from '../dashboard/CategoriesModalUpdate';
import TransactionModalUpdate from './TransactionModalUpdate';

const Category = ({ main_member_id }) => {
  const { member_id = main_member_id } = useParams();
  const { category_id } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openTransactionUpdate, setOpenTransactionUpdate] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await transactionsApi.getCategoryTransactions(
        member_id,
        category_id
      );
      setTransactions(response.data);
    };

    fetchTransactions();
  }, [member_id, category_id]);

  const deleteTransaction = async (id) => {
    await transactionsApi.deleteTransaction(id);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className={styles.main}>
      <RedirectTitle
        styles={styles}
        member_id={member_id}
        category_id={category_id}
        setOpen={setOpenModal}
        setOpenUpdate={setOpenModalUpdate}
      />
      <div className={styles.transactions}>
        <table className={styles.transactions_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.group}</td>
                <td>{transaction.date}</td>
                <td className={styles.table_action}>
                  <button
                    className={styles.category_delete_transaction}
                    onClick={() => setOpenTransactionUpdate(transaction)}
                  >
                    Update
                  </button>
                </td>
                <td className={styles.table_action}>
                  <button
                    className={styles.category_delete_transaction}
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openTransactionUpdate && (
        <TransactionModalUpdate
          open={openTransactionUpdate}
          setOpen={setOpenTransactionUpdate}
          currentTransaction={openTransactionUpdate}
          member_id={member_id}
          category_id={openTransactionUpdate.date}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
      {openModal && (
        <TransactionModal
          open={openModal}
          setOpen={setOpenModal}
          member_id={Number(member_id)}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
      <CategoriesModalUpdate
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        member_id={Number(member_id)}
        category_id={Number(category_id)}
        // categories={categories}
        // setCategories={setCategories}
      />
    </div>
  );
};

Category.propTypes = {
  main_member_id: PropTypes.string,
};

export default Category;
