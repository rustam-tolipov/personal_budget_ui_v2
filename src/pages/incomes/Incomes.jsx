import { useEffect, useState } from 'react';
import Categories from '../dashboard/Categories';
import styles from './Incomes.module.css';
import categoriesApi from '../../api/categories';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Incomes = ({ type, main_member_id }) => {
  const [categories, setCategories] = useState([]);

  const { member_id = main_member_id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoriesApi.getIncomesCategories(member_id);
      setCategories(response.data);
    };

    fetchCategories();
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

Incomes.propTypes = {
  type: PropTypes.string.isRequired,
  main_member_id: PropTypes.string,
};

export default Incomes;
