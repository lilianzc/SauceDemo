class checkoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.pageHeading = page.getByText('Checkout: Overview');
        this.itemName = page.locator('.inventory_item_name');
        this.itemPrice = page.locator('.inventory_item_price');
        this.itemQuantity = page.locator('.cart_quantity');
        this.paymentInformation = page.getByText('Payment Information:');
        this.paymentInformationAddress = page.getByText('SauceCard #31337');
        this.shippingInformation = page.getByText('Shipping Information:');
        this.shippingInformationMethod = page.getByText('Free Pony Express Delivery!');
        this.priceTotal = page.getByText('Price Total');
        this.itemTotal = page.getByText('Item total: $29.99');
        this.itemTax = page.getByText('Tax: $2.40');
        this.totalPurchase = page.getByText('Total: $32.39');
        this.finishButton = page.getByText('Finish');
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}

export default checkoutStepTwoPage;