import { useEffect, useState } from 'react';
import styles from './Settings.module.css';
import usersApi from '../../api/users';
import MembersPopupUpdate from '../../components/MembersPopupUpdate';
import { NavLink } from 'react-router-dom';

const Settings = () => {
  const defaultImage =
    'https://res-2.cloudinary.com/dhatgaadw/image/upload/v1661765174/e0eiopj9eqt5dwnt5n2v.jpg';

  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      const response = await usersApi.getSettingsMembers();
      setMembers(response.data);
    };

    getMembers();
  }, []);

  const deleteMember = async (id) => {
    await usersApi.deleteMember(id);
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className={styles.settings}>
      <div className={styles.members_container}>
        <h1>Members List</h1>

        <ul className={styles.members_list}>
          {members.map((member) => (
            <li className={styles.list_item} key={member.id}>
              <NavLink
                className={styles.info}
                to={`/member/${member.id}/dashboard`}
              >
                <img
                  src={member.image.url ? member.image.url : defaultImage}
                  alt='user'
                />
                <p className={styles.item_name}>{member.username}</p>
                {member.kind === 'admin' ? (
                  <p className={styles.item_kind}>admin</p>
                ) : (
                  <p className={styles.item_kind}>member</p>
                )}
                <p className={styles.item_total}>${member.total_balance}</p>
              </NavLink>

              {member.kind === 'admin' ? null : (
                <>
                <button
                    className={styles.item_edit}
                    onClick={() => setOpen(member.id)}
                  >
                    edit
                  </button>
                  <button
                    className={styles.item_delete}
                    onClick={() => deleteMember(member.id)}
                  >
                    del
                  </button>
                </>
              )}
            </li>
          ))}

          {open && (
            <MembersPopupUpdate
              open={open}
              setOpen={setOpen}
              members={members}
              setMembers={setMembers}
            />
          )}
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Settings;
