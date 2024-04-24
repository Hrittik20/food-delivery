'use client'
import getDish from '@/utils/get-dish';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Pagination } from "@nextui-org/react";
import { DishProps } from '@/types';
import StarRating from './StarRating';
import FilterBar from './FilterBar';
import addBasket from '@/utils/add-basket';
import ErrorMessage from './ErrorMessage';
import  { updateCartCount }  from '@/actions/actions'
import { useDispatch, useSelector } from 'react-redux';

const GetCards = () => {
    const router = useRouter();
    const [allDish, setAllDish] = useState<DishProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [filters, setFilters] = useState({ category: [], vegetarian: false, sort: '' });
    const cartCount = useSelector(state => state.cart.cartCount);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState([]);
    
    // const data = await getDish();
    // const allDish = data.dishes
    // console.log('TEsTTT')
    // console.log(allDish)

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const data = await getDish(currentPage, filters);
                setAllDish(data.dishes);
                setTotalPage(data.pagination.size-1);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchDishes(); // Call the async function
    }, [currentPage, filters]);

    const handlePress = (id) => {
      event.preventDefault();
      console.log("Navigating to dish:", id);
      router.push(`/item/${id}`);
    };

    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if(token){
        return true;
      } else {
        return false;
      }
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const isInCart = (id) => {
      return addedToCart.includes(id);
    };

    const handleFilterChange = (newFilters) => {
      setFilters(newFilters);
   };

   const handleAddCart = (dishId) => (event) => {
      if(checkAuth()){
        console.log("YESS")
        event.preventDefault();
        dispatch(updateCartCount(cartCount+1));
        setAddedToCart([...addedToCart, dishId]);
        // localStorage.setItem("cartItem", cartItemCount.toString());
        addBasket(dishId);
      } else {
        event.preventDefault();
        alert("You need to be logged in to add items to the cart.");
      }
      // event.preventDefault();
      // localStorage.setItem("cartItem", cartItemCount.toString());
      // addBasket(dishId);

    };

    function truncateDescription(description, maxWords) {
      const words = description.split(' ');
      if (words.length > maxWords) {
         return `${words.slice(0, maxWords).join(' ')}...`;
      }
      return description;
     }
    
  return (
    // <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
    //     {allDish.map((dish: DishProps) => (
    //       <Card shadow="sm" key={dish.id} isPressable onPress={handlePress}>
    //         <CardBody className="overflow-visible p-0">
    //           <Image
    //              shadow="sm"
    //              radius="lg"
    //              width="100%"
    //              alt={dish.name}
    //              className="w-full object-cover h-[140px]"
    //              src={dish.image}
    //           />
    //         </CardBody>
    //         <CardFooter className="text-small justify-between">
    //           <b>{dish.name}</b>
    //           <p className="text-default-500">{dish.price}</p>
    //         </CardFooter>
    //       </Card>
    //     ))}
    // </div>

    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {allDish.map((dish: DishProps) => (
            <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
              <a href="" className="c-card block bg-white dark:bg-gray-800 shadow-md hover:shadow-xl dark:hover:shadow-gray-500/50 rounded-lg overflow-hidden flex flex-col">
              <div className="relative pb-48 overflow-hidden">
                <img className="absolute inset-0 h-full w-full object-cover" onClick={() => handlePress(dish.id)} src={dish.image} alt={dish.name}/>
              </div>
              <div className="p-4 flex-1" onClick={() => handlePress(dish.id)}>
                <span className={`inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase tracking-wide text-xs ${dish.vegetarian ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {dish.vegetarian ? 'Veg' : 'Non-Veg'}
                </span>              
                <h2 className="mt-2 mb-2  font-bold">{dish.name}</h2>
                <p className="text-sm">{truncateDescription(dish.description, 15)}</p>
                <div className="mt-3 flex items-center">
                  <span className="text-sm font-semibold">ab</span>&nbsp;<span className="font-bold text-xl">{dish.price}</span>&nbsp;<span className="text-sm font-semibold">₽</span>
                </div>
              </div>
              <div className="p-4 border-t border-b text-xs text-gray-700" onClick={() => handlePress(dish.id)}>
                <div className="p-4 flex items-start text-sm text-gray-600">
                  <StarRating rating={dish.rating} />
                </div>       
              </div>
              <div className="p-4 flex justify-center" onClick={() => event.preventDefault()}>
              {isInCart(dish.id) ? (
                <div className="p-4 flex justify-center">
                  <div className="flex items-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
                    -
                  </button>
                  <div className="px-4">1</div> {/* Display current quantity */}
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    +
                  </button>
                  </div>
                </div>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddCart(dish.id)}>
                    Add to Cart
                </button>
              )}
              </div>
              </a>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
          <Pagination
            onChange={handlePageChange}
            total={totalPage}
            isCompact
            showControls
            initialPage={1}
            classNames={{
              wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
              item: "w-8 h-8 text-small rounded-none bg-transparent hover:bg-sky-700",
              cursor:
                "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
            }}
          />
        </div>
      </div>
    </div> 
  )
}

export default GetCards;