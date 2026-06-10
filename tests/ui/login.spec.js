import {expect, test} from '@playwright/test';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';

test('login to application', async ({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventorySauceDemo = new inventoryPage(page);

    //Login to the page
    await loginSauceDemo.goToPage();
    await loginSauceDemo.login();
    
    //Validate successful login by checking that Products is dislayed after login successfully
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(inventorySauceDemo.headingInventoryPage).toBeVisible();

})

