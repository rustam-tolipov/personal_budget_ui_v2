import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Overlay = (props) => {
  const { setOpen, opacity } = props;

  const styles = {
    overlay: {
      position: 'relative',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#252525',
      opacity: `${opacity}`,
    },
  };

  const overlay = (
    <div style={styles.overlay} onClick={() => setOpen(false)}></div>
  );

  return open && createPortal(overlay, document.querySelector('#portal'));
};

Overlay.propTypes = {
  setOpen: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default Overlay;
