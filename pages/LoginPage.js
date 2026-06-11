export class loginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        //this.loginButton = page.locator('.submit-button btn_action');
        this.loginButton = page.getByRole('button');
    }

    async goToPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login() {
        await this.usernameInput.fill('standard_user');
        await this.passwordInput.fill('secret_sauce');
        await this.loginButton.click();
    }

}

export default loginPage;
