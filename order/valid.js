/*===============Add To Cart================*/

export function addToCart(Item, Order, data, id) {
  let _books = JSON.parse(localStorage.getItem("books")) || [];
  var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  var orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (currentUser[0]) {
    if (currentUser[0].role === "customer") {
      console.log(data);
      var obj = _books.find((item) => item.ID === Number(id));

      var existingOrderIndex = orders.findIndex(
        (order) => order.userId === currentUser[0].id
      );

      if (existingOrderIndex !== -1) {
        console.log(orders[existingOrderIndex].items);
        var existingItemIndex = orders[existingOrderIndex].items.findIndex(
          (item) => item.bookId === obj["ID"]
        );

        if (existingItemIndex !== -1) {
          if (
            orders[existingOrderIndex].items[existingItemIndex].quantity <
            obj["stockNum"]
          ) {
            orders[existingOrderIndex].items[existingItemIndex].quantity++;
            Swal.fire("Added to your cart !!");
          } else {
            Swal.fire("Sorry Out Of Stock !!!");
          }
        } else {
          var newItemIndex = orders[existingOrderIndex].items.length + 1;
          debugger;
          var newItem = new Item(
            newItemIndex,
            obj["salerID"],
            obj["title"],
            obj["price"],
            1,
            obj["imgLink"],
            obj["ID"]
          );
          orders[existingOrderIndex].items.push(newItem.getItem());
          Swal.fire("Added to your cart !!");
        }
      } else {
        var newItem = new Item(
          1,
          obj["salerID"],
          obj["title"],
          obj["price"],
          1,
          obj["imgLink"],
          obj["ID"]
        );
        var newOrder = new Order(currentUser[0].id, "pending", [newItem]);
        orders.push(newOrder.getOrder());
        Swal.fire("Added to your cart !!");
      }

      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      Swal.fire({
        title: "Please Login As A Customer!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }
  } else {
    Swal.fire({
      title: "Please Login As A Customer!",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }
}
export function notificationUpdate(orders) {
  debugger;
  var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  let totalItems = 0;

  if (currentUser.length > 0) {
    orders.forEach((order) => {
      if (order.userId === currentUser[0].id) {
        if (order.items && Array.isArray(order.items)) {
          totalItems += order.items.length;
        }
      }
    });

    document.getElementById("notification").innerText = totalItems;
    console.log("hg");
  }
}
/*===============End Add To Cart================*/
