import PropTypes from 'prop-types';
import styles from './CategoriesModal.module.css';
import { createPortal } from 'react-dom';
import Overlay from '../../components/utilities/Overlay';
import { useEffect, useRef, useState } from 'react';
import categoriesApi from '../../api/categories';
import usersApi from '../../api/users';
import { icons } from '../../data/categoriesList';
import Select from 'react-select';

const CategoriesModalUpdate = (props) => {
  const { open, setOpen, category_id, member_id } = props;

  const [members, setMembers] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]); // [1, 2, 3]
  const [defaultSelectedMembers, setDefaultSelectedMembers] = useState([]); // [1, 2, 3
  const [selectedIcon, setSelectedIcon] = useState('');

  const nameInputRef = useRef('');
  const typeInputRef = useRef('');

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await usersApi.getMembers();
      setMembers(response.data);
    };

    const fetchCategory = async () => {
      const response = await categoriesApi.getCategory(category_id);
      setCategory(response.data);

      if (nameInputRef.current) nameInputRef.current.value = response.data.name;
      if (typeInputRef.current) typeInputRef.current.value = response.data.kind;
    };

    fetchMembers();
    fetchCategory();
  }, [open, category_id, selectedIcon]);

  useEffect(() => {
    if (category.members_ids) {
      // set Pre-selected values only value and label
      const selected_member = members.filter((member) =>
        category.members_ids.includes(member.id)
      );
      setDefaultSelectedMembers(
        selected_member.map((member) => ({
          value: member.id,
          label: member.username,
        }))
      );
    }
  }, [category, members, selectedIcon]);

  const addCategory = async (data) => {
    data.preventDefault();

    data = {
      category: {
        name: nameInputRef.current.value,
        kind: typeInputRef.current.value,
        icon: selectedIcon,
        members_ids: selectedMembers.map((member) => member.value),
      },
    };

    const response = await categoriesApi.updateCategory(
      member_id,
      category_id,
      data
    );

    nameInputRef.current.value = '';
    setOpen(false);
  };

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
  };

  const handleBackground = (icon_name) => {
    if (selectedIcon === '') {
      return category.icon === icon_name ? '#0000002c' : '';
    }

    return selectedIcon === icon_name ? '#0000002c' : '';
  };

  const categoriesHTML = (
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

      <form className={styles.form} onSubmit={addCategory}>
        <div className={styles.form_group}>
          <input
            type='text'
            placeholder='name'
            ref={nameInputRef}
            required
            className={styles.input}
          />

          <Select
            isMulti
            options={members.map((member) => ({
              value: member.id,
              label: member.username,
            }))}
            onChange={handleSelectChange}
            required
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: '0.8rem',
                border: '1px solid #0000002c',
                fontSize: '1.2rem',
              }),
            }}
            defaultValue={defaultSelectedMembers}
          />

          <select ref={typeInputRef} required className={styles.input}>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>

          <button type='submit' className={styles.input + ' ' + styles.button}>
            Update
          </button>
        </div>

        <div className={styles.icons}>
          {icons.map((icon) => (
            <label
              key={icon.name}
              className={styles.icon}
              title={icon.name}
              style={{
                backgroundColor: handleBackground(icon.name),
              }}
            >
              <input
                type='radio'
                name='icon'
                value={icon.name}
                checked={selectedIcon === icon.name}
                onChange={handleIconChange}
                className={styles.icon_input}
              />
              {icon.icon}
            </label>
          ))}
        </div>
      </form>
    </div>
  );

  return (
    <>
      {open && <Overlay open={open} setOpen={setOpen} opacity={0.5} />}
      {open && createPortal(categoriesHTML, document.querySelector('#portal'))}
    </>
  );
};

CategoriesModalUpdate.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
};

export default CategoriesModalUpdate;
