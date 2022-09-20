"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/buy',
            handler: 'balance.buyProduct',
        },
        {
            method: 'POST',
            path: '/credit',
            handler: 'balance.creditAccount',
        },
    ],
};
