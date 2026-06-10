import {test, expect} from '@playwright/test';
import loginPage from '../../pages/LoginPage';
import inventoryPage from '../../pages/InventoryPage';

test('validate content of the sorting dropdown', async({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventorySauceDemo = new inventoryPage(page);

    //Login to the page
    await loginSauceDemo.goToPage();
    await loginSauceDemo.login();

    //Validate the content of the sorting dropdown
    await inventorySauceDemo.clickSortingDropdown();
    await expect(inventorySauceDemo.sortingDropdownContainer).toHaveText(['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']);

} )