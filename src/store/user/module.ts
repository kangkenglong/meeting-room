import {Module, type SagaGenerator} from 'core-fe/src';
import {
    type RootState,
    type UserModuleName,
    type UserState,
} from '@module/types';

export class UserModule extends Module<RootState, UserModuleName> {
    constructor(name: UserModuleName, initialState: UserState) {
        super(name, initialState);
    }
}
