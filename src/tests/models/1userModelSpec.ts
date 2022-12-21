import userModel, { User } from '../../models/userModel';

describe('User Database actions', () => {
    it('Should have an addNew method', () => {
        expect(userModel.addNew).toBeDefined();
    });
    it('addNew method should create a new user and the created user is equal to the returned user', async () => {
        const user: User = {
            email: 'example@gmail.com',
            password: '1234',
            firstName: 'ahmed',
            lastName: 'khalil',
        };
        const result = await userModel.addNew(user);
        expect(result.id).toEqual(1);
    });
    it('Should have a getAll method', () => {
        expect(userModel.getAll).toBeDefined();
    });
    it('getAll method should return the users list', async () => {
        const result = await userModel.getAll();
        expect(result).toHaveSize;
    });
    it('Shlould have an authenticate method ', async () => {
        expect(userModel.authenticate).toBeDefined();
    });
    it('Authenticate method should return the user data on success ', async () => {
        const result = await userModel.authenticate(
            'example@gmail.com',
            '1234'
        );
        expect(result?.email).toEqual('example@gmail.com');
        expect(result).toBeNull;
    });
    it('Authenticattion method should return null on failure ', async () => {
        const result = await userModel.authenticate(
            'example@gmail.com',
            'wrongpassword'
        );
        expect(result).toBeNull;
    });

    it('getById method should be defined', async () => {
        expect(userModel.getById).toBeDefined();
    });
    it('getById method should return the correct user data', async () => {
        const user: User = await userModel.getById('1');
        expect(user.id).toEqual(1);
    });
});
