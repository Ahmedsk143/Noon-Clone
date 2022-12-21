import productModel, { Product } from '../../models/productModel';

describe('Product Database actions', () => {
    it('Should have an addNew method', () => {
        expect(productModel.addNew).toBeDefined();
    });
    it('addNew method should create a new product and the created product is equal to the returned product', async () => {
        const prodcut: Product = {
            name: 'Fan Heater',
            price: 999,
            category: 'Heaters',
        };
        const result = await productModel.addNew(prodcut);
        expect(result.name).toEqual('Fan Heater');
    });
    it('Should have a getAll method', () => {
        expect(productModel.getAll).toBeDefined();
    });
    it('getAll method should return the users list', async () => {
        const result = await productModel.getAll();
        expect(result).toHaveSize;
    });
    it('getById method should be defined', async () => {
        expect(productModel.getById).toBeDefined();
    });
    it('getById method should return the correct product data', async () => {
        const prodcut: Product = await productModel.getById('1');
        expect(prodcut.id).toEqual(1);
    });
});
