import React from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../store/ordersSlice';

export const ProductCard = (product) => {
  const { id, thumbnail, description, price, title } = product;
  const dispatch = useDispatch();
  const handleAddOrder = () => {
    dispatch(
      addOrder({
        id,
        title,
        price,
        amount: 1,
      })
    );
  };
  return (
    <div className="card">
      <img src={thumbnail} className="card-img-top" alt=" " />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Product {description}</p>
        <p className="card-price">$ {price}</p>
        <button onClick={handleAddOrder} className="btn btn-primary">
          Add to orders
        </button>
      </div>
    </div>
  );
};
