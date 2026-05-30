class checkoutComplete {
    constructor (page) {
        this.page = page;
        this.pageHeading = page.getByText('Checkout: Complete!');
        this.ponyExpressImage = page.getByAltText('Pony Express');
        this.thanksMessage = page.getByText('Thank you for your order!');
        this.thanksSubMessage = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.getByRole('button', {name: 'Back Home'});
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

export default checkoutComplete;