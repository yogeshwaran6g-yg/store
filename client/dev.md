<!-- todo -->

cart mock api to real one change cart local schema and cart add item function review

check home's feature product section something broks

productscreen

init(image dec shipping cart) done

some coloured section like playshifu
then review section
faq
feaatured section people also buy

new md

1.product
2.cart

3.order

4.user

5.checkout

review

1. product

   products context makes init product, provides the call by slug and
   call by id then the product screen uses that
   (uses product service function to call api)

   > > > pending test all product functions

2. cart

   cart context makes init cart sync the local cart if loged user mean
   push cart to db then if already have item mean update quantity
   (uses cart service function to call api and create and uses the initernal cart reducer to update the cart state )

   > > > pending test all cart functions

3. auth

   auth context uses the auth service no any other only

   > > > pending protected routes not created
   > > > pending test full auth

4. order
   the context and the order service have not fullfiled one function using double rtnres and the auth not used o the id unable to pass and the dashboard

   users all route making double req

5. checkout
   Cart
  ↓
Checkout (address + review)
  ↓
Create Order (Pending, UNPAID)
  ↓
Create Payment (Cashfree)
  ↓
Cashfree Checkout
  ↓
Webhook confirms payment
  ↓
Order → Processing / Failed

todo

1.teenpatti todo make leftsuccess if request happens in left room even error cause
2.the barcode scema removed adjust in productcontroller
3.the productContext make rerendering fix that
4.test all product functions
5.test full auth
6.add protected routes and create auth context
