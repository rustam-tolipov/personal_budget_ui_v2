import styles from './Loading.module.css';
import loadingSvg from './../assets/img/loader.svg'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingSvg} alt='loading' className={styles.loading_img} />
    </div>
  );
};

export default Loading;
