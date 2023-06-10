import styles from './Sidebar.module.css';
import { BsCalendarWeek, BsPersonAdd, BsTrash2Fill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RiBillLine } from 'react-icons/ri';
import logo from '../../assets/img/beedget.svg';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import MembersPopup from '../../components/MembersPopup';
import usersApi from '../../api/users';

const Sidebar = ({ member_id, current }) => {
  const [open, setOpen] = useState(false);
  const [mostResentMembers, setMostResentMembers] = useState([]);
  const [mostResentMembersLoading, setMostResentMembersLoading] =
    useState(false);
  const [mostResentCollaps, setMostResentCollaps] = useState(3);

  const user_routes = [
    {
      name: 'Dashboard',
      icon: <AiFillHome className={styles.link_icon} />,
      path: '/user/dashboard',
    },
    {
      name: 'Incomes',
      icon: <GiMoneyStack className={styles.link_icon} />,
      path: '/user/incomes',
    },
    {
      name: 'Expenses',
      icon: <GiTakeMyMoney className={styles.link_icon} />,
      path: '/user/expenses',
    },
    {
      name: 'Calendar',
      icon: <BsCalendarWeek className={styles.link_icon} />,
      path: '/user/calendar',
    },
    {
      name: 'Bills',
      icon: <RiBillLine className={styles.link_icon} />,
      path: '/user/bills',
    },
  ];

  const members_routes = [
    {
      name: 'Dashboard',
      icon: <AiFillHome className={styles.link_icon} />,
      path: `/member/${member_id}/dashboard`,
    },
    {
      name: 'Incomes',
      icon: <GiMoneyStack className={styles.link_icon} />,
      path: `/member/${member_id}/incomes`,
    },
    {
      name: 'Expenses',
      icon: <GiTakeMyMoney className={styles.link_icon} />,
      path: `/member/${member_id}/expenses`,
    },
    {
      name: 'Calendar',
      icon: <BsCalendarWeek className={styles.link_icon} />,
      path: `/member/${member_id}/calendar`,
    },
    {
      name: 'Bills',
      icon: <RiBillLine className={styles.link_icon} />,
      path: `/member/${member_id}/bills`,
    },
  ];

  useEffect(() => {
    const getMostResentMembers = async () => {
      setMostResentMembersLoading(true);
      const response = await usersApi.getMembers();
      setMostResentMembers(response.data);
      setMostResentMembersLoading(false);
    };

    getMostResentMembers();
  }, []);

  const defaultImage =
    'https://res-2.cloudinary.com/dhatgaadw/image/upload/v1661765174/e0eiopj9eqt5dwnt5n2v.jpg';

  const displayMembers = (mostResentMembers, mostResentCollaps) => {
    if (mostResentMembersLoading) {
      return <p>Loading...</p>;
    }

    return mostResentMembers.slice(0, mostResentCollaps).map((member) => (
      <li
        className={
          member_id == member.id
            ? styles.members_item_active
            : styles.members_item
        }
        key={member.id}
      >
        <NavLink
          to={`/member/${member.id}/dashboard`}
          className={styles.sidebar__members_link}
        >
          <div className={styles.sidebar__members_item_icon}>
            <img
              src={member.image.url ? member.image.url : defaultImage}
              alt='user'
            />
          </div>
          <span>
            {member.username.length > 10
              ? member.username.slice(0, 10) + '...'
              : member.username}
          </span>
          <p className={styles.amount}> {member.kind}</p>
        </NavLink>
      </li>
    ));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_content}>
        <div className={styles.sidebar__top} to='/'>
          <NavLink className={styles.sidebar__logo} to='/user/dashboard'>
            <img className={styles.logo} src={logo} alt='Beedget logo' />
            <span>beedget</span>
          </NavLink>

          <MembersPopup
            open={open}
            setOpen={setOpen}
            setMostResentMembers={setMostResentMembers}
          />
        </div>

        <nav className={styles.sidebar__nav}>
          <ul className={styles.sidebar__list}>
            {current === 'user' &&
              user_routes.map((route) => (
                <li className={styles.sidebar__item} key={route.name}>
                  <NavLink
                    to={route.path}
                    className={
                      styles.sidebar__link +
                      ' ' +
                      (location.pathname === route.path
                        ? styles.sidebar__link_active
                        : '')
                    }
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </NavLink>
                </li>
              ))}
            {current === 'member' &&
              members_routes.map((route) => (
                <li className={styles.sidebar__item} key={route.name}>
                  <NavLink
                    to={route.path}
                    className={
                      styles.sidebar__link +
                      ' ' +
                      (location.pathname === route.path
                        ? styles.sidebar__link_active
                        : '')
                    }
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className={styles.sidebar__members}>
          <div className={styles.members_title}>
            Family members:
            {mostResentCollaps === 3 ? (
              <button
                className={styles.members_btn}
                onClick={() => setMostResentCollaps(mostResentMembers.length)}
                type='button'
              >
                <IoIosArrowUp />
              </button>
            ) : (
              <button
                className={styles.members_btn}
                onClick={() => setMostResentCollaps(3)}
                type='button'
              >
                <IoIosArrowDown />
              </button>
            )}
          </div>

          <ul className={styles.sidebar__members_list}>
            <li className={styles.members_item} onClick={() => setOpen(true)}>
              <a className={styles.sidebar__members_link}>
                <div className={styles.sidebar__members_item_icon}>
                  <BsPersonAdd className={styles.member_icon} color='#f8fafc' />
                </div>
                <span>Add a new member</span>
              </a>
            </li>
            {displayMembers(mostResentMembers, mostResentCollaps)}{' '}
          </ul>
        </div>

        {/* <div className={styles.sidebar__bottom} to='/'>
            <div className={styles.sidebar__logo}>
              <img className={styles.logo} src={logo} alt='Beedget logo' />
              <span>learn more about us</span>
            </div>
          </div> */}
      </div>
    </div>
  );
};

// props validation
Sidebar.propTypes = {
  member_id: PropTypes.string,
};

export default Sidebar;
