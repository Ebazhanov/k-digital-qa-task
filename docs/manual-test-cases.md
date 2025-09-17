# 📝 Manual Test Cases

Below are example manual test cases for https://www.sofa.de/ to ensure broad coverage of key functionalities.

### Test Case 1: Shopping & Wishlist Flow

**Steps:**

1. Log in with a valid user.
2. Navigate to a category page (e.g., Sofas, Echtsofa).
3. Randomly select 5 products and add them to the wishlist.
4. Open the wishlist and verify each product’s details (name, price, etc.) match the category page.
5. Add all 5 wishlist items to the basket.
6. Open the basket and review items.

**Expected Result:**  
All 5 selected products appear in the wishlist with correct details. Basket contains all 5 items with accurate name, price, and quantity.

---

### Test Case 2: Browse & Add to Cart (Filters & Sorting)

**Steps:**

1. Open homepage.
2. Navigate to "Sofas" → "3-Sitzer".
3. Apply a filter (e.g., leather) and sort by price.
4. Open a product, select a variant, and add it to the cart.
5. Open the cart and verify product name, price, and quantity.

**Expected Result:**  
Filters and sorting work as expected. Product details are correct. Cart updates properly.

---

### Test Case 3: Checkout Flow

**Steps:**

1. Log in with a valid account.
2. Add product(s) to cart.
3. Proceed to checkout.
4. Enter shipping address and select payment method.
5. Review and confirm order.

**Expected Result:**  
Checkout displays correct totals, shipping, and payment options. Order confirmation is shown.

---

### Test Case 4: Search Functionality

**Steps:**

1. Use the search bar and type “Ledersofa”.
2. Review the results list.
3. Open one product from the results.

**Expected Result:**  
Relevant sofas appear. Product page opens correctly.

---

### Test Case 5: Newsletter Subscription

**Steps:**

1. Scroll to the footer and enter a valid email for the newsletter.
2. Submit the form.

**Expected Result:**  
A success message is shown, and a confirmation email is received.

---

### Test Case 6: Contact Form Submission

**Steps:**

1. Open the “Kontakt” page.
2. Fill in name, email, and message fields.
3. Submit the form.

**Expected Result:**  
A success or confirmation message is displayed. Form submits without errors.

---
