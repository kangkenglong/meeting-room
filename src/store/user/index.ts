import { register } from 'core-fe/src';
import { USER_NAME, UserState } from '@module/types';
import { UserModule } from './module';

const state: UserState = {
    userInfo: {
        userId: '123456',
        userName: 'Kedron',
    },
};

export const userModule = new UserModule(USER_NAME, state);

const userStore = register<UserModule>(userModule);

export const userActions = userStore.getActions();
