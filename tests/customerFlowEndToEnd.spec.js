import {test, expect} from '@playwright/test';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';
import cartPage from '../pages/cartPage';
import checkoutStepOnePage from '../pages/checkoutStepOnePage';
import checkoutStepTwo from '../pages/checkoutStepTwoPage';
import checkoutComplete from '../pages/checkoutCompletePage';

test ('end to end customer flow', async ({page}) => {
    const loginSauceDemo = new loginPage(page);
    const inventoryPageSauceDemo = new inventoryPage(page);
    const cartPageSauceDemo = new cartPage(page);
    const checkoutStepOneSauceDemo = new checkoutStepOnePage(page);
    const checkoutStepTwoSauceDemo = new checkoutStepTwo(page);
    const checkoutCompleteSauceDemo = new checkoutComplete(page);

    //Login to the page
    await loginSauceDemo.goToPage();
    await loginSauceDemo.login();
    await expect(inventoryPageSauceDemo.headingInventoryPage).toHaveText('Products');

    //Add a product 
    await inventoryPageSauceDemo.addToCartSauceLabsBackpack();
    await expect(inventoryPageSauceDemo.sauceLabsBackpackAddButton).toHaveText('Remove');

    //Go to Cart
    await inventoryPageSauceDemo.goToShoppingCart();
    await expect(cartPageSauceDemo.pageHeading).toHaveText('Your Cart');
    await expect(cartPageSauceDemo.itemName).toHaveText('Sauce Labs Backpack');
    await expect(cartPageSauceDemo.itemQuantity).toHaveText('1');
    await expect(cartPageSauceDemo.itemPrice).toHaveText('$29.99' );

    //Go to checkout step 1 and fill data
    await cartPageSauceDemo.clickCheckoutButton();
    await expect(checkoutStepOneSauceDemo.pageHeading).toHaveText('Checkout: Your Information');
    await checkoutStepOneSauceDemo.fillFirstName();
    await checkoutStepOneSauceDemo.fillLastName();
    await checkoutStepOneSauceDemo.fillZip();

    //Go to checkout step 2
    await checkoutStepOneSauceDemo.clickContinue();
    await expect(checkoutStepTwoSauceDemo.pageHeading).toHaveText('Checkout: Overview');
    await expect(checkoutStepTwoSauceDemo.itemName).toHaveText('Sauce Labs Backpack');
    await expect(checkoutStepTwoSauceDemo.itemQuantity).toHaveText('1');
    await expect(checkoutStepTwoSauceDemo.itemPrice).toHaveText('$29.99');
    await expect(checkoutStepTwoSauceDemo.paymentInformation).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.paymentInformationAddress).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.shippingInformation).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.shippingInformationMethod).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.priceTotal).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.itemTotal).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.itemTax).toBeVisible();
    await expect(checkoutStepTwoSauceDemo.totalPurchase).toBeVisible();
    //Go to checkout complete page
    await checkoutStepTwoSauceDemo.clickFinishButton();
    await expect(checkoutCompleteSauceDemo.pageHeading).toHaveText('Checkout: Complete!');
    await expect(checkoutCompleteSauceDemo.ponyExpressImage).toBeVisible();
    await expect(checkoutCompleteSauceDemo.thanksMessage).toBeVisible();
    await expect(checkoutCompleteSauceDemo.thanksSubMessage).toBeVisible();

    //Go to home page
    await checkoutCompleteSauceDemo.clickBackHome();
    await expect(inventoryPageSauceDemo.headingInventoryPage).toHaveText('Products');

})