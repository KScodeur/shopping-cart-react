import React, {useContext} from 'react'
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import "./cart.css";
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const {cartItems,getTotalAmount} = useContext(ShopContext);
  const totalAmount=getTotalAmount();
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div>
        <h1>Les éléments de votre panier</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product)=>{
          if(cartItems[product.id]!==0){
            return <CartItem data={product}/>
          } 
        })}
      </div>
      {totalAmount>0?(
      <div className='checkout'>
        <p>total: ${totalAmount} ::smile </p>
        <button onClick={()=>navigate("/")}>Continuer les achats</button>
        <button>Payer</button>
      </div>
      ): <h1>Votre panier est vide</h1>}
    </div>
  )
}
