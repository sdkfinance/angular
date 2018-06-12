import {Organization} from './organization';

export interface ProviderAccount {
    id: string;
    provider: {
        name: string;
    };
    organization: Organization;
    supportedTransactionTypes: string[];
}
