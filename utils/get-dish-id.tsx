async function getDishId(id){

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/dish/${id}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }
       
    const dish = await response.json();
    return dish;

}

export default getDishId;