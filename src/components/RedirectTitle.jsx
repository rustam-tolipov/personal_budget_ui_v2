import { NavLink, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IoAddOutline } from 'react-icons/io5';
// RxSlash
import { RxSlash } from 'react-icons/rx';
import { BiGridAlt } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { AiOutlineUnorderedList, AiFillDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

import styles from './RedirectTitle.module.css';
import categoriesApi from '../api/categories';

const RedirectTitle = ({ member_id, setOpen, setOpenUpdate }) => {
  const { category_id } = useParams();

  const location = useLocation();
  const path = location.pathname;

  const dashboardNavLink = (
    <NavLink to={`/user/dashboard`} className={styles.categories_title_text}>
      <AiFillHome className={styles.categories_title_icon} />{' '}
      <RxSlash className={styles.categories_icon} />
      Dashboard
    </NavLink>
  );

  const memberDashboardNavLink = (
    <NavLink
      to={`/member/${member_id}/dashboard`}
      className={styles.categories_title_text}
    >
      <AiFillHome className={styles.categories_title_icon} />{' '}
      <RxSlash className={styles.categories_icon} />
      Dashboard
    </NavLink>
  );

  const incomesNavLink = path === `/user/incomes` && (
    <NavLink to={`/user/incomes`} className={styles.categories_title_text}>
      <RxSlash className={styles.categories_icon} />
      Incomes
    </NavLink>
  );

  const expensesNavLink = path === `/user/expenses` && (
    <NavLink to={`/user/expenses`} className={styles.categories_title_text}>
      <RxSlash className={styles.categories_icon} />
      Expenses
    </NavLink>
  );

  const incomesCategoriesNavLink = path === `/user/incomes/${category_id}` && (
    <NavLink to={`/user/incomes`} className={styles.categories_title_text}>
      <RxSlash className={styles.categories_icon} />
      Incomes <RxSlash className={styles.categories_icon} /> Category{' '}
    </NavLink>
  );

  const expensesCategoriesNavLink = path ===
    `/user/expenses/${category_id}` && (
    <NavLink to={`/user/expenses`} className={styles.categories_title_text}>
      <RxSlash className={styles.categories_icon} />
      Expenses <RxSlash className={styles.categories_icon} /> Category{' '}
      <RxSlash className={styles.categories_icon} /> {category_id}
    </NavLink>
  );

  const categoryNavLink = path.includes('/user/categories/') && (
    <NavLink
      to={`/user/categories/${category_id}`}
      className={styles.categories_title_text}
    >
      <RxSlash className={styles.categories_icon} />
      Categories <RxSlash className={styles.categories_icon} /> Category{' '}
      <RxSlash className={styles.categories_icon} />
      {category_id}
    </NavLink>
  );

  console.log('member_id', member_id);

  const deleteMemberCategory = async () => {
    try {
      await categoriesApi.deleteMemberCategory(member_id, category_id);
      window.location.href = `/member/${member_id}/dashboard`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.categories_top}>
      <div className={styles.categories_title}>
        {member_id ? memberDashboardNavLink : dashboardNavLink} {incomesNavLink}{' '}
        {expensesNavLink} {categoryNavLink}
        {incomesCategoriesNavLink} {expensesCategoriesNavLink}
      </div>

      <div type='button' className={styles.options}>
        <IoAddOutline
          className={styles.categories_btn_icon}
          onClick={() => setOpen(true)}
        />
        {/* <BiGridAlt className={styles.categories_btn_icon} /> */}
        {/* <AiOutlineUnorderedList className={styles.categories_btn_icon} /> */}
        {setOpenUpdate && (
          <FaRegEdit
            className={styles.categories_btn_icon}
            onClick={() => setOpenUpdate(true)}
          />
        )}
        {category_id && (
          <AiFillDelete
            className={styles.categories_btn_icon}
            onClick={deleteMemberCategory}
          />
        )}
      </div>
    </div>
  );
};

RedirectTitle.propTypes = {
  type: PropTypes.string,
  member_id: PropTypes.string,
  styles: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setOpenUpdate: PropTypes.func,
};

export default RedirectTitle;
