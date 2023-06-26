import { useDispatch, useSelector } from 'react-redux';
import { changeAmountOfProduct, selectOrders } from '../../store/ordersSlice';
import { getSumByField } from '../../utils/helpers';

export const OrderBox = (props) => {
  const dispatch = useDispatch();
  const { orders } = useSelector(selectOrders);
  const orderListIsNotEmpty = orders.length > 0;
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const changeAmount = (id, amount) => {
    if (amount < 0) return;
    dispatch(changeAmountOfProduct({ id, amount }));
  };
  return (
    <div className="overlay container">
      <div className="popup">
        <h3>Your orders</h3>
        {orderListIsNotEmpty ? (
          orders.map((item) => {
            const { id, title, price, amount } = item;
            return (
              <div key={id} className="row">
                <div className="col-4">{title}</div>
                <div className="col-4">${amount * price}</div>
                <div className="col-4 increment-order">
                  <button
                    onClick={() => changeAmount(id, amount - 1)}
                    className="btn btn-primary"
                  >
                    -
                  </button>
                  <div>{amount}</div>
                  <button
                    onClick={() => changeAmount(id, amount + 1)}
                    className="btn btn-primary"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>You haven't ordered anything yet...</p>
        )}
        {orderListIsNotEmpty && <div>Total price: {totalPrice}</div>}
        <button onClick={props.toggleOrderBoxVisibility} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};
