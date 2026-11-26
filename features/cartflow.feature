Feature: Add products to the cart

Scenario: A shopper adds a product to the cart
Given the shopper is on the "Combination Pliers" product page
When the shopper adds 1 of them to the cart
Then the cart shows 1 "Combination Pliers"