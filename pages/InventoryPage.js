class inventoryPage {
    constructor(page) {
        this.page = page;
        this.headingInventoryPage = page.getByText('Products');
        this.sauceLabsBackpackAddButton = page.locator('button[name*="sauce-labs-backpack"]');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.sortingDropdown = page.locator('.product_sort_container');
        this.sortingDropdownContainer = page.locator('.product_sort_container option');
        this.hamburguerButton = page.locator('.bm-burger-button');
        this.logoutOption = page.getByText('Logout');
    }
        async itemsInBadge() {
            const addedItems = await this.shoppingCartBadge.count();

            if (addedItems === 0) {
            return 0;
            }    
            else {
                return parseInt(await this.shoppingCartBadge.textContent(), 10); 
            }
                
        }

        async addToCartSauceLabsBackpack() {
            await this.sauceLabsBackpackAddButton.click();
        }

        async goToShoppingCart() {
            await this.shoppingCart.click();
        }

        async clickSortingDropdown() {
            await this.sortingDropdown.click();
        }

        async logout() {
        await this.hamburguerButton.click();
        await this.logoutOption.click();
    }
}

export default inventoryPage;
