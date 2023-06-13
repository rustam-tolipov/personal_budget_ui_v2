import { createPortal } from 'react-dom';
import styles from './TransactionModal.module.css';
import Overlay from '../../components/utilities/Overlay';
import { useEffect, useRef, useState } from 'react';
import transactionsApi from '../../api/transactions';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categories';

const TransactionModal = (props) => {
  const { open, setOpen, member_id, transactions, setTransactions } = props;

  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const categoriesState = useSelector((state) => state.categories);

  useEffect(() => {
    if (categoriesState) {
      if (categoriesState.categories) {
        setCategories(categoriesState.categories);
      }
    }
  }, [categoriesState, dispatch, member_id, open]);

  useEffect(() => {
    dispatch(getCategories(member_id));
  }, [dispatch, member_id, open]);

  const addTransaction = async (data) => {
    data.preventDefault();

    data = {
      transaction: {
        name: nameInputRef.current.value,
        amount: amountInputRef.current.value,
        category_id: categoryInputRef.current.value,
        member_id: member_id,
        created_at: dateInputRef.current.value,
      },
    };

    const response = await transactionsApi.addTransaction(
      member_id,
      categoryInputRef.current.value,
      data
    );
    setTransactions([...transactions, response.data]);

    nameInputRef.current.value = '';
    amountInputRef.current.value = '';
    categoryInputRef.current.value = '';
    setOpen(false);
  };

  const transactionForm = (
    <div className={styles.port_overlay}>
      <div className={styles.port_overlay_top}>
        <h3 className={styles.port_overlay_title}>Add a new transaction</h3>
        <button
          onClick={() => setOpen(false)}
          className={styles.port_overlay_close}
        >
          close
        </button>
      </div>

      <form className={styles.form} onSubmit={addTransaction}>
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
            min='0'
            step='0.01'
            max='1000000'
            placeholder='amount'
            ref={amountInputRef}
            className={styles.input}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor='category'>Category</label>
          <select ref={categoryInputRef} className={styles.input}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.form_group}>
          <label htmlFor='date'>Date</label>
          <input type='date' className={styles.input} ref={dateInputRef} />
        </div>

        <button type='submit' className={styles.btn}>
          Add
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

TransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  member_id: PropTypes.number.isRequired,
  transactions: PropTypes.array,
  setTransactions: PropTypes.func,
};

export default TransactionModal;
