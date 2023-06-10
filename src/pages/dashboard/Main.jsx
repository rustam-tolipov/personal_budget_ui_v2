import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from './Categories';
import Chart from './Chart';

import styles from './Main.module.css';
import Transactions from './Transactions';
import { useParams } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categories';

import PropTypes from 'prop-types';

const Main = ({ type, main_member_id }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { member_id = String(currentUser.member_id) } = useParams();
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState([0]);

  const dispatch = useDispatch();

  const categoriesState = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories(member_id));
  }, [dispatch, member_id, main_member_id]);

  useEffect(() => {
    if (categoriesState) {
      if (categoriesState.categories) {
        setCategories(categoriesState.categories);
        if (categoriesState.categories.length > 0) {
          setChartData(
            categoriesState.categories.map((category) => category.total_amount)
          );
        }
      }
    }
  }, [categoriesState, currentUser, dispatch, member_id]);

  const data = {
    labels: categories.map((category) => category.name),

    datasets: [
      {
        data: chartData,
        total_incomes: categories.reduce((acc, category) => {
          if (category.kind === 'income') {
            return acc + Number(category.total_amount);
          }
          return acc;
        }, 0),

        total_expenses: categories.reduce((acc, category) => {
          if (category.kind === 'expense') {
            return acc + Number(category.total_amount);
          }
          return acc;
        }, 0),
      },
    ],
  };

  return (
    <main className={styles.main}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        member_id={member_id}
        member_name='bob'
        type={type}
      />
      {chartData.length > 0 && <Chart data={data} />}
      <Transactions categories={categories} />
    </main>
  );
};

Main.propTypes = {
  type: PropTypes.string.isRequired,
  main_member_id: PropTypes.string,
};

export default Main;
