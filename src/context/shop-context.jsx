import React,{useState,createContext} from 'react'
import { PRODUCTS } from '../products';

export const ShopContext = createContext(null);
// cette constance permet de dire a use state 
//qu'initialement il a 0 produit dans le panier
const getDefaultCart = () =>{
    let cart = {};
    for(let i = 1; i< PRODUCTS.length+1; i++){
        cart[i]=0
    } 
    return cart;
}

export const ShopContextProvider = (props) => {
    const [cartItems, SetCartItems]= useState(getDefaultCart());

    const getTotalAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems ){
            if (cartItems[item]>0){
                let itemInfo = PRODUCTS.find((product)=>product.id === Number(item))
                totalAmount+=cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }
    const addToCart= (itemId)=>{
        SetCartItems((prev)=> ({...prev, [itemId]:prev[itemId] + 1}))
    };
    // La fonction decrementation
    const removeFromCart= (itemId)=>{
        SetCartItems((prev)=> ({...prev, [itemId]:prev[itemId] -  1}))
    };

    const updateCartItemCount = (newAmount, itemId)=>{
        SetCartItems((prev)=> ({...prev, [itemId]: newAmount}))
    }
    const contextValue =
    {
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateCartItemCount,
        getTotalAmount
    }
  return (
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  )
}
