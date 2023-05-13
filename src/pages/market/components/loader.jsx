import PropTypes from 'prop-types';
import loader from './style/loader.module.css';
import cn from 'classnames';

const Loader = ({ isLoading }) => {
  if (!isLoading) return;
  return (
    <div className={loader.lds_ripple}>
      <div className={loader.lds_ripple_arc} />
      <div className={cn(loader.lds_ripple_arc, loader.arc_delay)} />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
