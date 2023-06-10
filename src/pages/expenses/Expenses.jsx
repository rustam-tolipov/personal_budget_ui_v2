import { useEffect, useState } from 'react';
import Categories from '../dashboard/Categories';
import styles from './Expenses.module.css';
import categoriesApi from '../../api/categories';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Expenses = ({ type, main_member_id }) => {
  const { member_id = main_member_id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await categoriesApi.getExpensesCategories(member_id);
      setCategories(res.data);
    };

    getCategories();
  }, [member_id]);

  if (member_id === undefined) {
    return (
      <main className={styles.main} style={{ justifyContent: 'center' }}>
        <div className={styles.error}>
          <h1 className={styles.title}>No Categories Yet</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        member_id={member_id}
        type={type}
      />
    </main>
  );
};

Expenses.propTypes = {
  type: PropTypes.string.isRequired,
  main_member_id: PropTypes.string,
};

export default Expenses;
