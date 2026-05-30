class cartPage {
    constructor(page) {
        this.page = page;
        this.pageHeading = page.getByText('Your Cart');
        this.itemName = page.locator('.inventory_item_name');
        this.itemQuantity = page.locator('.cart_quantity');
        this.itemPrice = page.locator('.inventory_item_price');
        this.checkoutButton = page.getByRole('button', {name:'Checkout'});
    }

        async clickCheckoutButton() {
            await this.checkoutButton.click();          
        }
}

export default cartPage;