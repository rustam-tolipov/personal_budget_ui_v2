import { createPortal } from 'react-dom';
import styles from './TransactionModal.module.css';
import Overlay from '../../components/utilities/Overlay';
import { useEffect, useRef } from 'react';
import transactionsApi from '../../api/transactions';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions/categories';

const TransactionModalUpdate = (props) => {
  const {
    open,
    setOpen,
    transactions,
    setTransactions,
    currentTransaction,
    member_id,
    category_id,
  } = props;

  const nameInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (currentTransaction) {
      if (nameInputRef.current)
        nameInputRef.current.value = currentTransaction.name;
      if (amountInputRef.current)
        amountInputRef.current.value = currentTransaction.amount;
      if (dateInputRef.current) {
        // const dateObj = new Date();

        // // get the month in this format of 04, the same for months
        // const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        // const day = ('0' + dateObj.getDate()).slice(-2);
        // const year = dateObj.getFullYear();

        // const shortDate = `${year}-${month}-${day}`;

        const date = new Date(currentTransaction.date);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        const shortDate = `${year}-${month}-${day}`;
        dateInputRef.current.value = shortDate;
      }
    }
  }, [currentTransaction, open]);

  const dispatch = useDispatch();

  const updateTransaction = async (data) => {
    data.preventDefault();

    data = {
      transaction: {
        name: nameInputRef.current.value,
        amount: amountInputRef.current.value,
        member_id: currentTransaction.member_id,
        category_id: currentTransaction.category_id,
        created_at: dateInputRef.current.value,
      },
    };

    const response = await transactionsApi.updateTransaction(
      member_id,
      category_id,
      currentTransaction.id,
      data
    );
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === currentTransaction.id ? response.data : transaction
      )
    );

    nameInputRef.current.value = '';
    amountInputRef.current.value = '';
    setOpen(false);

    dispatch(getCategories(member_id));
  };

  const transactionForm = (
    <div className={styles.port_overlay}>
      <div className={styles.port_overlay_top}>
        <h3 className={styles.port_overlay_title}>Add a new category</h3>
        <button
          onClick={() => setOpen(false)}
          className={styles.port_overlay_close}
        >
          close
        </button>
      </div>

      <form className={styles.form} onSubmit={updateTransaction}>
        <div className={styles.form_group}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            placeholder='name'
            ref={nameInputRef}
            className={styles.input}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            placeholder='amount'
            ref={amountInputRef}
            className={styles.input}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            placeholder='date'
            ref={dateInputRef}
            className={styles.input}
          />
        </div>

        <button type='submit' className={styles.btn}>
          Update
        </button>
      </form>
    </div>
  );

  return (
    <>
      {open && <Overlay open={open} setOpen={setOpen} opacity={0.5} />}
      {open && createPortal(transactionForm, document.getElementById('portal'))}
    </>
  );
};

TransactionModalUpdate.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  member_id: PropTypes.string.isRequired,
  category_id: PropTypes.number.isRequired,
  transactions: PropTypes.array,
  setTransactions: PropTypes.func,
  currentTransaction: PropTypes.object,
};

export default TransactionModalUpdate;
