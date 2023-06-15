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

const MembersPopupUpdate = (props) => {
  const { open, setOpen, members, setMembers } = props;

  const [member, setMember] = useState([]);
  const [image, setImage] = useState(
    'https://res-2.cloudinary.com/dhatgaadw/image/upload/v1661765174/e0eiopj9eqt5dwnt5n2v.jpg'
  );

  useEffect(() => {
    setMember(members.find((member) => member.id === open));
  }, [open, members]);

  const usernameInputRef = useRef(null);

  useEffect(() => {
    if (member) {
      usernameInputRef.current.value = member.username;
      if (member.image && member.image.url) {
        setImage(member.image.url);
      } else {
        setImage(
          'https://res-2.cloudinary.com/dhatgaadw/image/upload/v1661765174/e0eiopj9eqt5dwnt5n2v.jpg'
        );
      }
    }
  }, [member]);

  const addMember = async (data) => {
    data.preventDefault();

    const formData = new FormData();
    formData.append('username', usernameInputRef.current.value);
    formData.append('image', image);

    const headers = {};

    if (image) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    try {
      const response = await usersApi.updateMember(open, formData, headers);
      setMembers(
        members.map((member) =>
          member.id === open ? { ...member, ...response.data } : member
        )
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
            Update
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={styles.sidebar__user}>
      {open && <Overlay open={open} setOpen={setOpen} opacity={0.5} />}
      {open && createPortal(addMembersModal, document.querySelector('#portal'))}
    </div>
  );
};

MembersPopupUpdate.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
};

export default MembersPopupUpdate;
