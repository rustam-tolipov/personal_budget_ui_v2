import { useParams } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';
import styles from './Dashboard.module.css';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const Dashboard = ({ current, component }) => {
  const get_member_id =
    JSON.parse(localStorage.getItem('me')) !== null
      ? JSON.parse(localStorage.getItem('me')).member_id
      : undefined;
  const main_member_id =
    get_member_id !== undefined ? String(get_member_id) : '';

  const { member_id = main_member_id } = useParams();

  return (
    <div className={styles.container}>
      <Sidebar current={current} member_id={member_id} />

      <div className={styles.dashboard}>
        <Searchbar current={current} member_id={member_id} />

        {component}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  current: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
};

export default Dashboard;
