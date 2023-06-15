import { BsPersonCircle } from 'react-icons/bs';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { NavLink } from 'react-router-dom';

import usersApi from '../api/users';
import authApi from '../api/auth';

import styles from './MembersPopup.module.css';
import Overlay from './utilities/Overlay';
import PropTypes from 'prop-types';

import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const MembersPopup = (props) => {
  const { open, setOpen, setMostResentMembers } = props;
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [displayMembers, setDisplayMembers] = useState(false);
  const [image, setImage] = useState(
    'https://res-2.cloudinary.com/dhatgaadw/image/upload/v1661765174/e0eiopj9eqt5dwnt5n2v.jpg'
  );

  useEffect(() => {
    const getMembers = async () => {
      const response = await usersApi.getMembers();
      setMembers(response.data);
    };

    getMembers();
  }, []);

  const usernameInputRef = useRef(null);

  const addMember = async (data) => {
    data.preventDefault();

    const formData = new FormData();

    formData.append('username', usernameInputRef.current.value);
    formData.append('image', image);

    try {
      const response = await usersApi.addMember(formData);
      setMostResentMembers([response.data, ...members]);
      setOpen(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    navigate('/login');
    localStorage.removeItem('me');
    Cookies.remove('token');
    await authApi.logout();
    window.location.reload();
  };

  const addMembersModal = (
    <div className={styles.port_overlay}>
      <div className={styles.port_overlay_top}>
        <h3 className={styles.port_overlay_title}>Add new post</h3>
        <button
          className={styles.port_overlay_close}
          onClick={() => setOpen(false)}
        >
          close
        </button>
      </div>

      <div className={styles.port_overlay_content}>
        {image instanceof File ? (
          <img
            src={URL.createObjectURL(image)}
            alt=''
            className={styles.create_overlay_img}
          />
        ) : (
          <img src={image} alt='' className={styles.create_overlay_img} />
        )}

        <form className={styles.form} onSubmit={addMember}>
          <input
            type='text'
            placeholder='Username'
            ref={usernameInputRef}
            className={styles.input}
          />

          {/* <input
            type='file'
            placeholder='Image'
            onChange={(e) => setImage(e.target.files[0])}
            className={styles.input}
          /> */}

          <button type='submit' className={styles.btn}>
            Add
          </button>
        </form>
      </div>
    </div>
  );

  const membersList = (
    <>
      <div className={styles.members_menu}>
        <h3 className={styles.members_menu_title}>Options</h3>
        <ul className={styles.sidebar__user_list}>
          <li className={styles.sidebar__user_item}>
            <NavLink
              to={`/user/dashboard`}
              className={styles.sidebar__user_link}
              onClick={() => setDisplayMembers(!displayMembers)}
            >
              <FiHome className={styles.sidebar__icon} />
              <span>Home</span>
            </NavLink>
          </li>
          <li className={styles.sidebar__user_item}>
            <NavLink
              to={`/user/settings`}
              className={styles.sidebar__user_link}
              onClick={() => setDisplayMembers(!displayMembers)}
            >
              <FiSettings className={styles.sidebar__icon} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li className={styles.sidebar__user_item}>
            <a className={styles.sidebar__user_link} onClick={logout}>
              <FiLogOut className={styles.sidebar__icon} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <div className={styles.sidebar__user}>
      <BsPersonCircle
        className={styles.sidebar__icon}
        onClick={() => setDisplayMembers(!displayMembers)}
      />

      {open && <Overlay open={open} setOpen={setOpen} opacity={0.5} />}
      {open && createPortal(addMembersModal, document.querySelector('#portal'))}

      {displayMembers && (
        <Overlay
          open={displayMembers}
          setOpen={setDisplayMembers}
          opacity={0}
        />
      )}

      {displayMembers &&
        createPortal(membersList, document.querySelector('#portal'))}
    </div>
  );
};

MembersPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MembersPopup;
