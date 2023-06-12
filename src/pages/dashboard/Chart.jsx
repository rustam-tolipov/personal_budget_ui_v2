import styles from './Chart.module.css';
import { DonoutChart } from '../../components/DonoutChart';

const Chart = ({ data, totalBalance }) => {
  return (
    <div className={styles.chart}>
      <div className={styles.card}></div>
      <div className={styles.circle}>
        <DonoutChart data={data} totalBalance={totalBalance} />
      </div>
    </div>
  );
};

export default Chart;
