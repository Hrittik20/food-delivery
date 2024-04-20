import GetProps from "@/components/GetProps";
import GetApp from "@/components/GetApp";
import Catalog from "@/components/Catalog";
import HomeGrid from "@/components/HomeGrid";
import SearchBar from "@/components/SearchBar";
import getDish from "@/utils/get-dish";
import { DishProps } from "@/types";
import DishCard from "@/components/DishCard";
import GetCards from "@/components/GetCards";


export default function Home() {

  // const allDish = data.dishes;
  // console.log(allDish)
  //const dishNames = allDish.map((dish: DishProps) => dish.name);

//   const router = useRouter();
//   const handlePress = () => {
//     router.push('/item');
//  };
  //const dish = response.data.dishes;
        //const dishNames = dishes.map(dish => dish.name);
  return (
    <>
    <main className='overflow-hidden'>
      {/* <section>
        <div className='home__cars-wrapper'>
        {allDish?.map((dish: DishProps) => (
        <DishCard dish={dish} />
        ))}
        </div>
      </section> */}
      {/* <HomeGrid /> */}
      <GetCards/>
      {/* <GetApp /> */}
    
    
    
    </main>
    </>
  );
}
