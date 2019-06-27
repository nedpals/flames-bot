"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function spin(idx_number, debug = false) {
    const flames_obj = {
        "F": "friends",
        "L": "lovers",
        "A": "anger",
        "M": "married",
        "E": "enemies",
        "S": "soulmates"
    };
    const arr = Object.keys(flames_obj);
    let result;
    if (idx_number === 0) {
        result = arr[0];
    }
    else {
        const remainder = idx_number % arr.length;
        const groups = Math.ceil(idx_number / arr.length);
        [...Array(groups).keys()].forEach((group, g_i, gs_arr) => {
            [...arr.keys()].forEach((i, _, g_arr) => {
                if (debug) {
                    console.log(`Group: ${group}`, i, arr[i]);
                }
                if (g_i === gs_arr.length - 1 && i === g_arr.length - 1) {
                    result = arr[i];
                }
            });
        });
        if (remainder !== 0) {
            [...Array(remainder).keys()].forEach((i, _, r_arr) => {
                if (debug) {
                    console.log(`Remainder`, i, arr[i]);
                }
                if (i === r_arr.length - 1) {
                    result = arr[i];
                }
            });
        }
    }
    return flames_obj[result];
}
exports.default = spin;
