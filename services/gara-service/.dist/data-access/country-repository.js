"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = void 0;
const country_model_1 = require("./models/country-model");
// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
async function getAllCountries() {
    const results = (0, country_model_1.getCountryModel)().findAll();
    return results;
}
exports.getAllCountries = getAllCountries;
