class checkoutStepOnePage {
    constructor (page) {
        this.page = page;
        this.pageHeading = page.getByText('Checkout: Your Information');
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.zipCodeField = page.getByPlaceholder('Zip/Postal Code');
        //this.continueButton = page.locator('.submit-button btn btn_primary cart_button btn_action');
        this.continueButton = page.locator('[data-test="continue"]');

    }

    async fillFirstName() {
        await this.firstNameField.fill('Lilian');
    }
    
    async fillLastName() {
        await this.lastNameField.fill('Zurita');
    }

    async fillZip() {
        await this.zipCodeField.fill('000');
    }
        
    async clickContinue() {
        await this.continueButton.click();
    }

}

export default checkoutStepOnePage;
