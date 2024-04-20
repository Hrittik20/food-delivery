const initialState = {
    cartCount: 0,
   };
   
   const cartReducer = (state = initialState, action) => {
    switch (action.type) {
       case 'UPDATE_CART_COUNT':
         return {
           ...state,
           cartCount: action.payload,
         };
       default:
         console.log('Unknown action:', action);
         return state;
    }
   };
   
   export default cartReducer;
   