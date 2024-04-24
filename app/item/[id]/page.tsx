'use client'

import StarRating from '@/components/StarRating';
import getDishId from '@/utils/get-dish-id';
import { Button, Card, Skeleton } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { updateCartCount }  from '@/actions/actions';
import addBasket from '@/utils/add-basket';

const page = () => {

  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [item, setItem] = useState(null);
  const cartCount = useSelector(state => state.cart.cartCount);
  const dispatch = useDispatch();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      return false;
    }
  }

  const handleAddCart = (dishId) => (event) => {
    if(checkAuth()){
      event.preventDefault();
      dispatch(updateCartCount(cartCount+1));
      addBasket(dishId);
    } else {
      event.preventDefault();
      alert("You need to be logged in to add items to the cart.");
    }

  };
  
  useEffect(() => {
    const fetchData = async () => {
      const itemDetails = await getDishId(id);
      setItem(itemDetails);
    };

    fetchData();
 }, [id]);


 if(!item){
  return(
    <Skeleton />
  );
 }

  return (
  <div className="min-h-screen py-6 flex flex-col justify-center items-center  dark:text-white">
    <div className="max-w-3xl w-full mx-auto bg-white dark:rounded-xl rounded-lg dark:shadow-lg shadow-md overflow-hidden">
      <div className="p-8 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">{item.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img className="object-cover w-full h-64 rounded-lg" src={item.image} alt={item.name} />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg mb-4">{item.description}</p>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Category:</p>
                  <p className="text-lg font-medium">{item.category}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Price:</p>
                  <p className="text-lg font-medium">₽{item.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Vegetarian:</p>
                  <span className={`inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase tracking-wide text-xs ${item.vegetarian ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {item.vegetarian ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="text-lg font-medium ">Rating:</p>
                  <div className="p-4 border-t border-b text-xs text-gray-700">
                    <div className="p-4 flex items-start text-sm text-gray-600">
                      <StarRating rating={item.rating} />
                    </div>       
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddCart(item.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default page