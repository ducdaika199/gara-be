"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupData = exports.deleteOrder = exports.addOrder = exports.getOrderById = void 0;
const country_model_1 = require("./models/country-model");
const order_model_1 = require("./models/order-model");
// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
async function getOrderById(id) {
    const foundOrder = await (0, order_model_1.getOrderModel)().findOne({
        where: { id },
        include: (0, country_model_1.getCountryModel)(),
        // ✅ Best Practice: The data access layer should return a plain JS object and avoid leaking DB narratives outside
        // The 'Raw' option below instructs to include only pure data within the response
        raw: true,
        nest: true,
    });
    return foundOrder;
}
exports.getOrderById = getOrderById;
async function addOrder(orderDetails) {
    const addingResponse = await (0, order_model_1.getOrderModel)().create(orderDetails);
    return addingResponse;
}
exports.addOrder = addOrder;
async function deleteOrder(orderIdToDelete) {
    await (0, order_model_1.getOrderModel)().destroy({ where: { id: orderIdToDelete } });
}
exports.deleteOrder = deleteOrder;
async function cleanupData() {
    await (0, order_model_1.getOrderModel)().truncate();
}
exports.cleanupData = cleanupData;
