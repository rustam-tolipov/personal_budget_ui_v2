import PropTypes from 'prop-types';
import styles from './CategoriesModal.module.css';
import { createPortal } from 'react-dom';
import Overlay from '../../components/utilities/Overlay';
import { useEffect, useRef, useState } from 'react';
import categoriesApi from '../../api/categories';
import usersApi from '../../api/users';
import { icons } from '../../data/categoriesList';
import Select from 'react-select';

const CategoriesModal = (props) => {
  const { open, setOpen, categories, setCategories } = props;
  const [members, setMembers] = useState([]);
  const [selectIcon, setSelectIcon] = useState(icons[0]);
  const [selectedMembers, setSelectedMembers] = useState([]); // [1, 2, 3]
  const nameInputRef = useRef(null);
  const typeInputRef = useRef(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await usersApi.getMembers();
      setMembers(response.data);
    };

    fetchMembers();
  }, [open]);

  const addCategory = async (data) => {
    data.preventDefault();

    data = {
      category: {
        name: nameInputRef.current.value,
        kind: typeInputRef.current.value,
        icon: selectIcon,
        members_ids: selectedMembers,
      },
    };

    const response = await categoriesApi.addCategory(data);
    setCategories([response.data, ...categories]);

    nameInputRef.current.value = '';
    setOpen(false);
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
            onChange={(selected) =>
              setSelectedMembers(selected.map((member) => member.value))
            }
            required
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: '0.8rem',
                border: '1px solid #0000002c',
                fontSize: '1.2rem',
              }),
            }}
          />

          <select ref={typeInputRef} required className={styles.input}>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>

          <button type='submit' className={styles.input + ' ' + styles.button}>
            Add
          </button>
        </div>

        <div className={styles.icons}>
          {icons.map((icon) => (
            <label
              key={icon.name}
              className={styles.icon}
              title={icon.name}
              style={{
                background: selectIcon === icon.name ? '#0000002c' : '',
              }}
            >
              <input
                type='radio'
                name='icon'
                value={icon.name}
                checked={selectIcon === icon.name}
                onChange={() => setSelectIcon(icon.name)}
                className={styles.icon_input}
                required
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

CategoriesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default CategoriesModal;
