async function delBasket(id){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/basket/dish/${id}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully deleted");

}

export default delBasket;