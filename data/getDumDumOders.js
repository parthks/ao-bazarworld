
// open dumdum_assets.json
let assets = require('fs').readFileSync('data/dumdumz_assets.json', 'utf8')
let orders = require('fs').readFileSync('data/orderbook.json', 'utf8')

var orders_data = JSON.parse(orders)["Orderbook"];
var dumdum_assets = JSON.parse(assets)["Assets"];
console.log(dumdum_assets.length);
console.log(orders_data.length);

const dumdum_orders = []
const dumdum_active_orders = []
for (let i = 0; i < orders_data.length; i++) {
    const order = orders_data[i];
    const pair = order["Pair"];
    const base = pair[0]
    const quote = pair[1]
    if (dumdum_assets.includes(base) || dumdum_assets.includes(quote)) {
        dumdum_orders.push(order);
        if (order["Orders"].length != 0) {
            dumdum_active_orders.push(order);
        }
    }
}
console.log(dumdum_orders.length);
// write to file
require('fs').writeFileSync('data/dumdum_orders.json', JSON.stringify(dumdum_orders, null, 2), 'utf8');
require('fs').writeFileSync('data/dumdum_active_orders.json', JSON.stringify(dumdum_active_orders, null, 2), 'utf8');