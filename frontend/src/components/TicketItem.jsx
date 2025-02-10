import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TicketItem({ ticket }) {
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div> {/* Ensure status is displayed */}
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
}

TicketItem.propTypes = {
  ticket: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketItem;