import {
    AdminUiPlugin,
    DefaultAssetServerPlugin,
    defaultEmailTypes,
    DefaultSearchPlugin,
    examplePaymentHandler,
    HandlebarsMjmlGenerator,
    VendureConfig,
} from '@vendure/core';
import path from 'path';

import { ADMIN_API_PATH, API_PORT, SHOP_API_PATH } from '../common/shared-constants';

/**
 * Config settings used during development
 */
export const devConfig: VendureConfig = {
    authOptions: {
        disableAuth: false,
        sessionSecret: 'some-secret',
        requireVerification: false,
    },
    port: API_PORT,
    adminApiPath: ADMIN_API_PATH,
    shopApiPath: SHOP_API_PATH,
    dbConnectionOptions: {
        synchronize: false,
        logging: false,

        type: 'mysql',
        host: '192.168.99.100',
        port: 3306,
        username: 'root',
        password: '',
        database: 'vendure-dev',

        // type: 'sqlite',
        // database:  path.join(__dirname, 'vendure.sqlite'),

        // type: 'postgres',
        // host: '127.0.0.1',
        // port: 5432,
        // username: 'postgres',
        // password: 'Be70',
        // database: 'vendure',
    },
    paymentOptions: {
        paymentMethodHandlers: [examplePaymentHandler],
    },
    customFields: {},
    emailOptions: {
        emailTemplatePath: path.join(__dirname, '../core/src/email/templates'),
        emailTypes: defaultEmailTypes,
        generator: new HandlebarsMjmlGenerator(),
        transport: {
            type: 'file',
            raw: false,
            outputPath: path.join(__dirname, 'test-emails'),
        },
        templateVars: {
            shopUrl: 'http://localhost:4201/',
        },
    },
    importExportOptions: {
        importAssetsDir: path.join(__dirname, 'import-assets'),
    },
    plugins: [
        new DefaultAssetServerPlugin({
            route: 'assets',
            assetUploadDir: path.join(__dirname, 'assets'),
            port: 5002,
        }),
        new DefaultSearchPlugin(),
       /* new AdminUiPlugin({
            port: 5001,
        }),*/
    ],
};