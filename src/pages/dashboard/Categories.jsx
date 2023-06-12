import PropTypes from 'prop-types';

import styles from './Categories.module.css';
import { useState } from 'react';
import CategoriesModal from './CategoriesModal';
import { NavLink, useLocation } from 'react-router-dom';
import RedirectTitle from '../../components/RedirectTitle';
import { icons } from '../../data/categoriesList';

const Categories = ({ categories, setCategories, member_id, type = '' }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={styles.categories}>
      <RedirectTitle
        styles={styles}
        member_id={member_id}
        type='categories'
        setOpen={setOpen}
      />

      <ul
        className={
          styles.categories_list +
          (!type.includes('categories') ? ` ${styles.lg}` : '')
        }
      >
        {categories.slice(0, 9).map((category) => (
          <li className={styles.category_item} key={category.id}>
            <NavLink
              to={
                path.includes('member')
                  ? `/member/${member_id}/${type}/${category.id}`
                  : `/${type}/${category.id}`
              }
            >
              <div className={styles.item_icon}>
                {icons.find((icon) => icon.name === category.icon).icon}
              </div>
              <div className={styles.item_info}>
                <div className={styles.item_name}>{category.name}</div>
                <div className={styles.item_amount}>
                  ${category.total_amount}
                </div>
              </div>
            </NavLink>
          </li>
        ))}

        {categories.length > 9 && type === 'categories' && (
          <li className={styles.category_item}>
            <NavLink
              to={
                path.includes('member')
                  ? `/member/${member_id}/expenses`
                  : `/${type}`
              }
            >
              <div className={styles.item_icon}>
                <div className={styles.item_icon_more}>...</div>
              </div>
              <div className={styles.item_info}>
                <div className={styles.item_name}>More</div>
              </div>
            </NavLink>
          </li>
        )}
      </ul>

      <CategoriesModal
        open={open}
        setOpen={setOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

// props validation
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  member_id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Categories;
