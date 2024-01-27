/*===============Add To Cart================*/
export function addToCart(Item, Order, data, id) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    var orders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log(data);
    var obj = data["books"].find(item => item.ID === Number(id));
    

    var existingOrderIndex = orders.findIndex(order => order.userId === currentUser[0].id);

    if (existingOrderIndex !== -1) {
        console.log(orders[existingOrderIndex].items);
        var existingItemIndex = orders[existingOrderIndex].items.findIndex(item => item.name === obj["title"]);

        if (existingItemIndex !== -1) {
            if (orders[existingOrderIndex].items[existingItemIndex].quantity < obj["stockNum"]) {
                orders[existingOrderIndex].items[existingItemIndex].quantity++;
            } else {
                Swal.fire("Sorry Out Of Stock !!!");
            }
        } else {
            var newItemIndex = orders[existingOrderIndex].items.length+1;
            var newItem = new Item(
                newItemIndex,
                obj["salerID"],
                obj["title"],
                obj["price"],
                1,
                obj["imgLink"]
            );
            orders[existingOrderIndex].items.push(newItem.getItem());
        }
    } else {
        var newItem = new Item(
            1,
            obj["salerID"],
            obj["title"],
            obj["price"],
            1,
            obj["imgLink"]
        );
        var newOrder = new Order(currentUser[0].id, "pending", [newItem]);
        orders.push(newOrder.getOrder());
    }

    localStorage.setItem("orders", JSON.stringify(orders));
}
export function notificationUpdate(orders) {

    var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    let totalItems = 0;

    orders.forEach(order => {
        if (order.userId === currentUser[0].id) {
            if (order.items && Array.isArray(order.items)) {
                totalItems += order.items.length;
            }
        }
    });

    document.getElementById("notification").innerText = totalItems;
}
/*===============End Add To Cart================*/