import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from '../../store/productsListSlice';
import { getProductsList } from '../../store/productsListSlice';
import { ProductCard } from './ProductCard';
import { ProductFilter } from '../ProductFilter/ProductFilter';
import { OrderBox } from '../OrderBox/OrderBox';
import { selectOrders } from '../../store/ordersSlice';
import { getSumByField } from '../../utils/helpers';

export const ProductsList = () => {
  const { status, isProductsLoaded, filteredProducts } =
    useSelector(selectProducts);
  const { orders } = useSelector(selectOrders);
  const dispatch = useDispatch();
  const [isOrderBoxVisible, setOrderBoxVisibility] = useState(false);
  useEffect(() => {
    if (!isProductsLoaded && status !== 'loading') {
      dispatch(getProductsList());
    }
  });
  const toggleOrderBoxVisibility = () => {
    setOrderBoxVisibility(!isOrderBoxVisible);
  };
  const ordersAmount = getSumByField(orders, 'amount');
  return isProductsLoaded ? (
    <>
      {/* In a working project it is better to make a separate order page with a react router */}
      {isOrderBoxVisible && (
        <OrderBox toggleOrderBoxVisibility={toggleOrderBoxVisibility} />
      )}
      <header className="bg-dark text-white p-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1>Shop</h1>
            </div>
            <div className="col-6 text-end">
              <div
                className="toggle-orderbox-btn"
                onClick={toggleOrderBoxVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </div>
              <span>({ordersAmount})</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          <ProductFilter />
          <div className="col-md-9 products">
            {filteredProducts.map((item) => {
              return <ProductCard {...item} key={item.id} />;
            })}{' '}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>LOADING</>
  );
};
