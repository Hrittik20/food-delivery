'use client'

import getDishId from '@/utils/get-dish-id';
import { Card, Skeleton } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [item, setItem] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const itemDetails = await getDishId(id);
      setItem(itemDetails);
    };

    fetchData();
 }, [id]);


 if(!item){
  return(
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="skeleton-text h-6 w-3/4 mb-4"></div>
          <div className="skeleton-text h-6 w-1/2 mb-4"></div>
          <div className="skeleton-text h-6 w-1/2 mb-4"></div>
          <div className="skeleton-text h-6 w-1/2 mb-4"></div>
          <div className="skeleton-text h-6 w-1/2 mb-4"></div>
          <div className="skeleton-text h-6 w-1/2 mb-4"></div>
        </div>
      </div>
    </div>
  );
 }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold text-center mb-4">{item.name}</h2>
          <p className="text-lg text-center mb-4">{item.description}</p>
          <img className="mx-auto mb-4" src={item.image} alt={item.name} />
          <p className="text-lg font-medium text-center mb-4">Price: ₽{item.price.toFixed(2)}</p>
          <p className="text-lg font-medium text-center mb-4">Vegetarian: {item.vegetarian ? 'Yes' : 'No'}</p>
          <p className="text-lg font-medium text-center mb-4">Rating: {item.rating}</p>
          <p className="text-lg font-medium text-center mb-4">Category: {item.category}</p>
        </div>
      </div>
    </div>
  )
}

export default page