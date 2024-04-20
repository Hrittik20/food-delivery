import axios from "axios";

const url = `${process.env.API_KEY}/api/dish`;

async function getCategories(){
    try{
        const response = await axios.get(url);
        const dish = response.data.dishes.categories;
        //const dishNames = dishes.map(dish => dish.name);
        return dish;
    } catch (error) {
        console.log("Error fetching data: ", error);
        return [];
    }
}

export default getCategories;