import {test, expect} from '@playwright/test';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';

test('add product to cart', async ({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventorySauceDemo = new inventoryPage(page);

    //Login to the page
    await loginSauceDemo.goToPage();    
    await loginSauceDemo.login();

    //Get the number of items the badge has before adding a new one
    const itemsBefore = await inventorySauceDemo.itemsInBadge();

    //Add Sauce Labs Backpack to the cart
    await inventorySauceDemo.addToCartSauceLabsBackpack();

    //Get the number of items the badge has after adding a new one    
    const itemsAfter = await inventorySauceDemo.itemsInBadge();

    //Validate that the shopping cart is increased in one after adding the item
    expect(itemsAfter).toBe(itemsBefore + 1);

    //Validate that the 'Add to Cart' button after used changes to 'Remove'
    await expect(inventorySauceDemo.sauceLabsBackpackAddButton).toHaveText('Remove');
})
