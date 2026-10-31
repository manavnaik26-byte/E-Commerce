import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const CartIconWithBadge = ({ itemCount }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
      <FiShoppingCart size={28} />
      {itemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-17px',
            right: '-14px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '9px',
            fontWeight: 'bold',
            minWidth: '7px',
            textAlign: 'center',
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIconWithBadge;
