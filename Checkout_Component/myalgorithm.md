1. check if the user is authenticated as a customer if not go to the login page
2. load the necessary data like
   - the data after cart loading it from the local storage
   - load the address data of the current user if exists
3. when the redeem button update the current myCart Object's Total
4. when confirming payment

   - validate billing address form
   - create new order object
   - copy the cart data into the order
   - get the products from the local storage
   - update it by decreasing the stock number for each order item that has been ordered loop through the books array decrease the stocknum by the quantity of each product
   - check if it's out of stock where the quantity of sold book is less than the quantity of the main book stock

5. if order has been sucessfully done
   - display Message
   - remove the order from localStorage
   - reset myCart

