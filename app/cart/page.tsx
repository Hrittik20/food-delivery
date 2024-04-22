'use client'

import { updateCartCount } from '@/actions/actions';
import delBasket from '@/utils/del-basket';
import getBasket from '@/utils/get-basket';
import { Divider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const [allBasket, setAllBasket] = useState<[]>([]);
    const cartCount = useSelector(state => state.cart.cartCount);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const data = await getBasket();
                setAllBasket(data);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchBasket(); // Call the async function
    }, []);

    const handleDelete = (index, dishId) => {
        dispatch(updateCartCount(cartCount-1));
        delBasket(dishId);
        const newBasket = allBasket.filter((item, itemIndex) => itemIndex !== index);
        setAllBasket(newBasket);
    };

  return (
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <Divider className="my-4" />
        {!allBasket || allBasket.length === 0 ? (
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p className="text-4xl font-bold text-gray-700">Your cart is empty.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allBasket.map((item, index) => (
                    // <div key={index} className="border p-4 rounded-lg shadow-md">
                    //     <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                    //     <h2 className="text-xl font-semibold">{item.name}</h2>
                    //     <p className="text-gray-500">{item.description}</p>
                    //     <p className="text-lg font-bold">{item.price}</p>
                    //     {/* <p className="text-sm font-medium">Quantity: {item.quantity}</p> */}
                    //     <button onClick={() => handleDelete(index)} className="text-red-500">Delete</button>
                    // </div>
                    <div key={index} className="border p-4 rounded-lg shadow-md">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-500">{item.description}</p>
                            <p className="text-lg font-bold">{item.price}</p>
                        </div>
                        <div className='justify-end flex mt-2'>
                            <button onClick={() => handleDelete(index, item.id)} className="text-red-500">
                                <img src="trash.png" alt="Delete" style={{ width: '25px', height: 'auto' }}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default page


