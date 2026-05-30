import {test, expect} from '@playwright/test';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';

test('add product to cart', async ({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventorySauceDemo = new inventoryPage(page);

    //Login to the page
    await loginSauceDemo.goToPage();    
    await loginSauceDemo.login();

    //Add Sauce Labs Backpack to the cart
    await inventorySauceDemo.addToCartSauceLabsBackpack();

    //Validate that the shopping cart icon has '1' displayed next to it
    await expect(inventorySauceDemo.shoppingCartBadge).toHaveText('1');

    //Validate that the 'Add to Cart' button after used changes to 'Remove'
    await expect(inventorySauceDemo.sauceLabsBackpackAddButton).toHaveText('Remove');
})
