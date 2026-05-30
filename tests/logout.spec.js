import {test, expect} from '@playwright/test';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';


test('logout from inventory page', async ({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventoryPageSauceDemo = new inventoryPage(page);

    //login to Sauce Demo
    await loginSauceDemo.goToPage();
    await loginSauceDemo.login();

    //logout
    await inventoryPageSauceDemo.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginSauceDemo.usernameInput).toBeVisible();
    await expect(loginSauceDemo.passwordInput).toBeVisible();
    await expect(loginSauceDemo.loginButton).toBeVisible();
})