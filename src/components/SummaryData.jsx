import { Link } from 'react-router-dom';
import OutlinedCard from "../common-component/Card";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store';
import { fetchUser } from '../store';
import { fetchReview } from '../store';
import { fetchOrder } from '../store';
import TopAppBar from "./TopAppBar"
import '../style/Dashboard.css'

function SummaryData() {

      const dispatch = useDispatch();

        const orders = useSelector((state) => {
            return state.orders.data
          })
    
        const products = useSelector((state) => {
        return state.products.data
        })

        const users = useSelector((state) => {
        return state.users.data
        })

        const reviews = useSelector((state) => {
        return state.reviews.data
        })

      useEffect(() => {
        dispatch(fetchOrder());
        dispatch(fetchProducts());
        dispatch(fetchUser());
        dispatch(fetchReview())
      }, [dispatch]);

      const Order = orders.orders
      const Products = products.products

      const orderLength = Order ? Order.length : 0;
      const productLength = Products ? Products.length : 0 ;
   

  return (
    <>
        <TopAppBar />

        <div className='container'>
          <div className='sub-container'>
            
            <Link to="/productsList" className='link'>
              <OutlinedCard
                title="Total Products"
                value={productLength}
                icon={<Inventory2Icon />}
              />
            </Link>

            <Link to="" className='link' >
              <OutlinedCard
                title="Total Users"
                value={users.result}
                icon={<PersonOutlineIcon />}
              />
            </Link>

          </div>

          <div className="sub-container">

            <Link to="" className='link' >
              <OutlinedCard
                title="Total Orders"
                value={orderLength}
                icon={<ShoppingBagIcon />}
              />
            </Link>

            <Link to="" className='link' >
              <OutlinedCard
                title="Total Reviews"
                value={reviews.result}
                icon={<ReviewsIcon />}
              />
            </Link>

            </div>
          </div>
    </>
  );
}

export default SummaryData;
