import {TransliterationService} from '../_services/transliteration.service';

export class Profile {
    profile?: {
        person?: {
            namePlain?: {
                first?: string;
                last?: string;
                middle?: string;
            };
            nameIntl?: {
                first?: string;
                last?: string;
                middle?: string;
            };
            description?: string;
        };
        contact?: {
            phoneNumber?: string;
            phoneVerified?: boolean;
            email?: string;
            emailVerified?: boolean;
            countryCode?: string;
        };
        type?: string;
        status?: string;
        business?: {
            companyName?: string;
            legal?: string;
            type?: string;
            administrator?: {
                firstName?: string;
                lastName?: string;
                email?: string;
                phone?: string;
            }
        };
        additional?: any;
        security?: {
            twoFactorsAuthEnabled?: boolean;
            transactionNotification?: {
                phone?: boolean;
                email?: boolean;
            };
            authorizationNotification?: {
                phone?: boolean;
                email?: boolean;
            }
        }
    };

    constructor(profile?: any) {
        if (profile) {
            this.profile = {};
            Object.assign(this.profile, profile.profile);
        }
    }

    getBodyForUpdateUserName() {
        return {
            person: {
                namePlain: {
                    first: this.profile.person.namePlain.first,
                    last: this.profile.person.namePlain.last,
                    middle: this.profile.person.namePlain.middle
                },
                nameIntl: {
                    first: TransliterationService.translit(this.profile.person.namePlain.first),
                    last: TransliterationService.translit(this.profile.person.namePlain.last),
                    middle: TransliterationService.translit(this.profile.person.namePlain.middle)
                },
                description: 'description'
            }
        };
    }

}
