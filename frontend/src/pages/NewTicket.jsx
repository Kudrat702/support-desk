import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createTicket, reset} from '../features/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    const {user} = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } =
         useSelector((state) => state.tickets );
     
    const [name] = useState(user.name);
    const [phone_no] = useState(user.phone_no);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        if(isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }

        dispatch(reset());
    },[isError, isSuccess, message, dispatch, navigate]);


    const onSubmit = (e) => {
        e.preventDefault();
        const ticketData = { product, description };

        dispatch(createTicket(ticketData));
    };

    
  if(isLoading){
    return <Spinner />
  } 

  return (
    <div>
        <BackButton url='/' />
       <form onSubmit={onSubmit}>
         
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="phone_no">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phone_no}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="product">Product</label>
          <select
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="iPhone">iPhone X</option>
            <option value="MacBook Air">MacBook Air</option>
            <option value="MacBook Pro">MacBook Pro</option>
            <option value="iPad">iPad</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Issue Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
            <button type='submit' className="btn btn-block">
                Submit
            </button>
        </div>
      </section>
      </form>
    </div>
  );
}

export default NewTicket;
