/**
 * company name
 * @type {string}
 */
export const COMPANY_NAME: string = 'sdk.finance';
/**
 * url of togotype
 * @type {string}
 */
export const LOGO_URL: string = 'https://s3.eu-central-1.amazonaws.com/sdkdevelopersdata/resources/pic/SDK-finance.png';
export const LOGO_LINK: string = 'https://sdk.finance';
export const LOGIN_LOGO_URL: string = 'https://s3.eu-central-1.amazonaws.com/sdkdevelopersdata/resources/pic/SDK-finance.png';
/**
 * Token name in localstorage depends on company name
 * @type {string}
 */
export const TOKEN_LS_NAME: string = COMPANY_NAME + '_common_token';
/**
 * Page titles
 * @type {{}}
 */
export const PAGE_TITLES: any = {
    dashboard: 'Backoffice - Main',
    clients: 'Backoffice - Clients',
    transactions: 'Backoffice - Transactions',
    promotions: 'Backoffice - Promotions',
    news: 'Backoffice - News',
    reports: 'Backoffice - Reports',
    pos: 'Backoffice - POS',
    operators: 'Backoffice - Operators',
    toAccounting: 'Backoffice - Учёт ТО',
    settings: 'Backoffice - Settings',
    login: 'Backoffice - Log in',
    resetPass: 'Backoffice - Reset password',
    coins: 'Backoffice - E-wallets',
    products: 'Backoffice - Producrs',
    loyaltyGroups: 'Backoffice - Loyalty groups',
    loyaltyRules: 'Backoffice - Loyalty rules',
    i18n: 'Backoffice - I18n',
    invoices: 'Backoffice - Invoices',
    vouchers: 'Backoffice - Vouchers',
    payments: 'Backoffice - Payments',
    withdrawal: 'Backoffice - Withdrawal',
    topUp: 'Backoffice - Top up',
    identificationUsers: 'Backoffice - Identification users',
    userManagement: 'Backoffice - Users management',
    issuers: 'Backoffice - Issuers',
    contracts: 'Backoffice - Contracts',
    messages: 'Backoffice - Messages',
    monitoring: 'Backoffice - Monitoring',
    cardHolds: 'Backoffice - Card holds',
    systemOperations: 'Backoffice - System operations',
    cashBoxDay: 'Backoffice - Cashbox day',
    topUpWallet: 'Backoffice - Top up wallet',
    cashDesks: 'Backoffice - Cash desks',
    cashDeskWithdrawal: 'Backoffice - Withdrawal cash'
};
/**
 * Title in search box
 * @type {{}}
 */
export const WINDOW_TITLE: any = {
    dashboard: 'Main',
    promotions: 'Promotions',
    news: 'News',
    operators: 'Operators',
    toAccounting: 'Учёт ТО',
    loyaltyGroups: 'Loyalty groups',
    loyaltyRules: 'Loyalty rules',
    bonusDetails: 'Details of bonuses',
    clients: 'page.support.sidebar.clients',
    transactions: 'entity.transaction.transactions',
    reports: 'entity.report.reports',
    pos: 'page.merchant.pos.my_pos',
    settings: 'page.individual.sidebar.settings',
    coins: 'entity.coin.coins',
    products: 'entity.product.products',
    i18n: 'page.administrator.i18n',
    invoices: 'page.individual.invoices',
    createInvoice: 'page.individual.invoices.buttons.create_invoice',
    vouchers: 'page.individual.sidebar.vouchers',
    payments: 'page.individual.sidebar.payment.services',
    withdrawal: 'page.individual.sidebar.withdrawal',
    topUp: 'page.common.charge',
    identificationUsers: 'page.compliance.identification_and_blocking',
    userManagement: 'page.supervisor.manage_users',
    issuers: 'page.administrator.emitent.view.title',
    contracts: 'page.fin_spec.contract.view.title',
    messages: 'page.common.conversations.title',
    monitoring: 'page.administrator.monitoring',
    cardHolds: 'page.individual.holds',
    systemOperations: 'page.cashier.system',
    cashBoxDay: 'page.cashier.cashbox_day',
    topUpWallet: 'page.cashier.cashbox_day.top_up',
    cashDesks: 'entity.cash_desk.cash_desks',
    cashDeskWithdrawal: 'page.cashier.withdraw_cash.title'

};
/**
 * Current local
 * @type {string}
 */
export const LOCAL: string = 'en';
/**
 * Categories of online payments services
 * @type {[{name: string; category: string}]}
 */
export const ONLINE_PAYMENTS_CATEGORIES: any[] = [
    {
        name: 'page.individual.product.categories.mobile',
        category: 'MOBILE'
    },
    {
        name: 'page.individual.product.categories.internet',
        category: 'INTERNET_TV'
    },
    {
        name: 'page.individual.product.categories.sip',
        category: 'SIP'
    },
    {
        name: 'page.individual.product.categories.comunal',
        category: 'COMMUNAL'
    },
    {
        name: 'page.individual.product.categories.bank',
        category: 'BANK'
    },
    {
        name: 'page.individual.product.categories.web_money',
        category: 'WEB_MONEY'
    },
    {
        name: 'page.individual.product.categories.entertainment',
        category: 'ENTERTAINMENT'
    },
    {
        name: 'page.individual.product.categories.other',
        category: 'OTHER'
    },
];
/**
 * System roles available to view by user with role
 * @type {{}}
 */
export const ROLES = {
    administrator: {
        individual: 'entity.role.individual',
        merchant: 'entity.role.merchant',
        exchange_manager: 'entity.role.exchange_manager',
        payroll_specialist: 'entity.role.payroll_specialist',
        payroll_manager: 'entity.role.payroll_manager',
        financial_specialist: 'entity.role.financial_specialist',
        cfo: 'entity.role.cfo',
        ceo: 'entity.role.ceo',
        cashier: 'entity.role.cashier',
        accountant: 'entity.role.accountant',
        compliance_specialist: 'entity.role.compliance_specialist',
        administrator: 'entity.role.administrator',
        customer_support: 'entity.role.customer_support',
        customer_support_manager: 'entity.role.customer_support_manager',
        antifraud_specialist: 'entity.role.antifraud_specialist'
    },
    cfo: {
        individual: 'entity.role.individual',
        merchant: 'entity.role.merchant',
        exchange_manager: 'entity.role.exchange_manager',
        payroll_specialist: 'entity.role.payroll_specialist',
        payroll_manager: 'entity.role.payroll_manager',
        financial_specialist: 'entity.role.financial_specialist',
        cfo: 'entity.role.cfo',
        cashier: 'entity.role.cashier',
        accountant: 'entity.role.accountant',
        compliance_specialist: 'entity.role.compliance_specialist',
        customer_support: 'entity.role.customer_support',
        customer_support_manager: 'entity.role.customer_support_manager',
        antifraud_specialist: 'entity.role.antifraud_specialist'
    },
    compliance_specialist: {
        individual: 'entity.role.individual',
        merchant: 'entity.role.merchant',
        exchange_manager: 'entity.role.exchange_manager',
        payroll_specialist: 'entity.role.payroll_specialist',
        payroll_manager: 'entity.role.payroll_manager',
        customer_support: 'entity.role.customer_support',
        customer_support_manager: 'entity.role.customer_support_manager',
        antifraud_specialist: 'entity.role.antifraud_specialist'
    }
};

export const ORGANIZATION_TYPES = {
    system: 'entity.org.type.system',
    individual: 'entity.org.type.individual',
    merchant: 'entity.org.type.merchant',
    gate_provider: 'entity.org.type.gate_provider',
    cash_desk: 'entity.org.type.cash_desk',
    payroll: 'entity.org.type.payroll',
    exchanger: 'entity.org.type.exchanger'
};
/**
 * Statuses of user identification
 * @type {{}}
 */
export const USER_IDENTIFICATION_STATUSES = {
    none: 'entity.status.org.none',
    declined: 'entity.status.org.declined',
    approved: 'entity.status.org.approved',
    pending: 'entity.status.org.pending'
};
/**
 * Roles which can have wallets
 */
export const ROLES_WITH_WALLETS: string[] = ['individual', 'merchant', 'exchange_manager', 'financial_specialist',
    'cfo', 'ceo', 'cashier', 'accountant', 'administrator'];
/**
 * Roles which can have smart cards
 */
export const ROLES_WITH_SMART_CARDS: string[] = ['individual', 'merchant'];
/**
 * Roles which mast be linked to organisation
 */
export const ORG_ROLES: string[] = ['financial_specialist', 'customer_support', 'customer_support_manager', 'cfo', 'ceo',
    'accountant', 'compliance_specialist', 'administrator', 'payroll_specialist', 'antifraud_specialist'];

export const LIMIT_PROFILE_TYPES = {
    per_transaction: 'entity.limit.time.per_transaction',
    per_day: 'entity.limit.time.per_day',
    per_week: 'entity.limit.time.per_week',
    per_month: 'entity.limit.time.per_month',
    per_quarter: 'entity.limit.time.per_quarter',
    per_year: 'entity.limit.time.per_year',
    per_life: 'entity.limit.time.per_life'
};

export const COMMISSION_TYPES = {
    zero: {
        name: 'entity.commission.type.zero',
        format: 'entity.commission.type.zero.format',
        fixed: false,
        percent: false
    },
    percent: {
        name: 'entity.commission.type.percent',
        format: 'entity.commission.type.percent.format',
        fixed: false,
        percent: true
    },
    fixed: {
        name: 'entity.commission.type.fixed',
        format: 'entity.commission.type.fixed.format',
        fixed: true,
        percent: false
    },
    greater_of_fixed_or_percent: {
        name: `entity.commission.type.greater_of_fixed_or_percent`,
        format: 'entity.commission.type.greater_of_fixed_or_percent.format',
        fixed: true,
        percent: true
    },
    lesser_of_fixed_or_percent: {
        name: `entity.commission.type.lesser_of_fixed_or_percent`,
        title: 'entity.commission.type.lesser_of_fixed_or_percent.format',
        fixed: true,
        percent: true
    }
};

export const TRANSACTION_TYPES = {
    client_transaction_transfer: 'entity.transaction.transfer',
    client_transaction_split: 'entity.transaction.split',
    client_transaction_merge: 'entity.transaction.merge',
    client_transaction_issue: 'entity.transaction.issue',
    client_transaction_balance: 'entity.transaction.balance',
    client_transaction_redeem: 'entity.transaction.redeem',
    client_create_prepaid: 'entity.transaction.prepaid_create',
    client_charge_prepaid: 'entity.transaction.prepaid_charge',
    merchant_payment: 'entity.transaction.merchant_payment',
    merchant_invoice: 'entity.transaction.merchant_invoice',
    gate_charge: 'entity.transaction.gate_charge',
    gate_redeem: 'entity.transaction.gate_redeem',
    gate_purchase: 'entity.transaction.gate_purchase',
    gate_card_refund: 'entity.transaction.gate_card_refund',
    gate_card_verification: 'entity.transaction.gate_card_verification',
    exchange_transaction: 'entity.transaction.exchange',
    cash_desk_redeem: 'entity.transaction.cash_desk_redeem',
    cash_desk_charge: 'entity.transaction.cash_desk_charge',
    payroll_charge: 'entity.transaction.payroll_charge',
    payroll_charge_sub: 'entity.transaction.payroll_charge_sub',
    reserve_charge: 'entity.transaction.reserve_charge',
    reserve_redeem: 'entity.transaction.reserve_redeem',
    cash_investment: 'entity.transaction.investment',
    cash_collect: 'entity.transaction.cash_collect',
    cash_input: 'entity.transaction.cash_input',
    contract_transit: 'entity.transaction.contract_transit',
    merchant_cashback: 'entity.transaction.merchant_cashback',
    deposit_topup: 'entity.transaction.deposit_topup',
    deposit_profit_payment: 'entity.transaction.deposit_profit_payment',
    deposit_payout: 'entity.transaction.deposit_payout',
    deposit_capitalization: 'entity.transaction.deposit_capitalization',
    deposit_accruing: 'entity.transaction.deposit_accruing',
    credit_issue: 'entity.transaction.credit_issue',
    credit_payment: 'entity.transaction.credit_payment',
    bank_topup: 'entity.transaction.bank_topup',
    bank_redeem: 'entity.transaction.bank_redeem'
};

export const TRANSACTION_STATUSES = {
    'limited': 'entity.status.limited',
    'pending': 'entity.status.pending',
    'declined': 'entity.status.declined',
    'processed': 'entity.status.success',
    'rejected': 'entity.status.org.declined',
    'error': 'entity.status.error'
};

export const I18N_LOCALES = [
    {
        locale: 'en',
        name: 'English',
        bsDatePickerConfig: {
            locale: 'en-gb',
            param: 'enGbLocale'
        }
    },
    {
        locale: 'ru',
        name: 'Русский',
        bsDatePickerConfig: {
            locale: 'ru',
            param: 'ruLocale'
        }
    },
    {
        locale: 'uk',
        name: 'Українська',
        bsDatePickerConfig: {
            locale: 'en-gb',
            param: 'enGbLocale'
        }
    }
];

export const I18N_RECORDS = {
    en: {
        'page.anonym.welcome': 'Welcome to SDK.Finance',
        'page.administrator.monitoring': 'Monitoring',
        'page.administrator.i18n': 'I18n',
        'page.administrator.i18n.key': 'Key',
        'page.administrator.i18n.not_found': 'Bundles not found',
        'page.cfo.crud_req.view.add_currency': 'Add provider currency',
        'page.cfo.crud_req.view.add_commission': 'Add commission for operation',
        'page.cfo.crud_req.view.add_commission_product': 'Add commission for product',
        'page.cfo.crud_req.view.add_limit': 'Add limit',
        'page.supervisor.user.all_roles': 'All roles',
        'page.supervisor.user.search.placeholder': 'Name, email or phone...',
        'page.supervisor.user.not_found': 'Users not found',
        'page.supervisor.user.wallets.not_found': 'The user has no wallets',
        'page.supervisor.user.smart_cards.not_found': 'The user has no smart cards',
        'page.supervisor.manage_docs.not_found': 'Documents not found',
        'page.merchant.invoice.add_hold_settings': 'Add hold settings',
        'page.merchant.invoice.hold_settings': 'Hold settings',
        'page.merchant.pos.back': 'Back to POS list',
        'page.merchant.pos.no_info': 'There is no information about POS',
        'page.merchant.pos.pos': 'POS',
        'page.individual.invoices.incoming': 'Incoming',
        'page.individual.invoices.outgoing': 'Outgoing',
        'page.individual.invoices.not_found': 'Invoices not found',
        'page.individual.invoices.pay_with_card': 'Pay with card',
        'page.individual.holds': 'Card holds',
        'page.individual.holds.not_found': 'Card holds not found',
        'page.individual.holds.title': 'Pay for invoice with payment card',
        'page.individual.holds.providers.not_found': 'Providers not found',
        'page.individual.product.not_found': 'Services not found',
        'page.individual.voucher.list.not_found': 'Vouchers not found',
        'page.individual.withdrawal.coins_not_found': 'You don\'t have coins to withdraw.',
        'page.individual.exchange.exchangers.not_found': 'Exchanger not found',
        'page.individual.settings.payment_cards.not_found': 'You don\'t have attachment cards',
        'page.individual.settings.payment_cards.add': 'Add card',
        'page.individual.settings.payment_cards.no_attachment_methods': 'No attachment methods',
        'page.individual.settings.smart_cards.not_found': 'You don\'t have smart cards',
        'page.individual.settings.bank.not_found': 'You don\'t have bank accounts',
        'page.individual.settings.bank.add': 'Add bank account',
        'page.individual.coin.not_found': 'You have no wallets',
        'page.individual.withdrawal.cash_desk.not_found': 'There is no cash box for this wallet',
        'page.individual.payment.cards.not_found': 'You have no active attached cards',
        'page.individual.payment_options.new_card': 'Pay with new card',
        'page.individual.payment_options.existing_card': 'Select attached card',
        'page.individual.exchange.exception.one_coin': 'To exchange currency you should have at least two wallets',
        'page.accountant.validator.greater_amount': 'Required amount greater than current',
        'page.accountant.cash_desks.not_found': 'Cash desks not found',
        'page.accountant.cash_desk.redeem.requests.not_found': 'There are no redeem requests',
        'page.cashier.top_up.exception.wallets_not_found': 'The user has no wallets',
        'page.common.action.loading': 'Loading...',
        'page.common.action.processing': 'Processing...',
        'page.common.action.deleting': 'Deleting...',
        'page.common.payment_card.add': 'Add new card',
        'page.common.action.reset': 'Reset',
        'page.common.action.capture': 'Capture',
        'page.common.action.release': 'Release',
        'page.common.transactions.not_found': 'Transactions not found',
        'page.common.charge.providers.not_found': 'Providers not found',
        'page.common.conversation.conversations.not_found': 'You have no messages',
        'page.common.filter.from': 'From',
        'page.common.filter.to': 'To',
        'validator.payment_card.cvv': 'Mast include 3 digits',
        'validator.payment_card.year': 'Must be from {0} to {1}',
        'validator.payment_card.month': 'Must be from 1 to 12',
        'validator.smart_card.number': 'Can include only digits. Min length: 4, max length: 50',
        'entity.payment_card': 'Payment card',
        'entity.payment_card.pan': 'PAN',
        'entity.transaction.bank_topup': 'Topup via bank',
        'snack_bar.message.smart_card.created': 'Smart card created'
    },
    ru: {},
    uk: {}
};

export const PAYMENT_METHODS_PARAMS = {
    wirecard_new: {
        option: {
            name: 'new_card'
        },
        provider: {
            accountId: '7bfe7c0f-887a-487b-a13b-c93fb9a7c846',
            name: 'Wirecard'
        }
    },
    existing_card: {
        option: {
            name: 'existing_card'
        }
    },
    new_payment_card: {
        option: {
            name: 'new_card'
        }
    }
};
