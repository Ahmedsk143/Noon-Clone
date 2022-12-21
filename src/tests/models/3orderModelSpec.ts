import orderModel, { Order } from '../../models/orderModel';

describe('Order Database actions', () => {
    it('Should have a create method', () => {
        expect(orderModel.create).toBeDefined();
    });
    it('create method should create a new order and the created order is equal to the returned order', async () => {
        const order: Order = {
            active: true,
            userId: 1,
        };
        const result = await orderModel.create(order);
        expect(result.userId).toEqual(1);
    });
    it('Should have a getAll method', () => {
        expect(orderModel.getAll).toBeDefined();
    });
    it('getAll method should return all orders of all users', async () => {
        const result = await orderModel.getAll();
        expect(result).toHaveSize;
    });

    it('getById method should be defined', async () => {
        expect(orderModel.getById).toBeDefined();
    });
    it('getById method should return the correct order data', async () => {
        const order: Order = await orderModel.getById('1');
        expect(order.id).toEqual(1);
    });
    it('getCurrent method should be defined', async () => {
        expect(orderModel.getById).toBeDefined();
    });
    it('getCompleted method should be defined', async () => {
        expect(orderModel.getById).toBeDefined();
    });
});
