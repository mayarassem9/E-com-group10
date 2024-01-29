export class Item {
    #ID;
    #name;
    #price;
    #quantity;
    #imgLink;
    #sellerId;
    #bookId;

    set ID(_ID){
        this.#ID=_ID;
    }
    get ID(){
        return this.#ID;
    }
    set bookId(_bookId){
        this.#bookId=_bookId;
    }
    get bookId(){
        return this.#bookId;
    }


    set name(_name){
        this.#name=_name;
    }
    get name(){
        return this.#name;
    }
 
    set price(_price){
        this.#price=_price;
    }
    get price(){
        return this.#price;
    }

    set quantity(_quantity){
        this.#quantity=_quantity;
    }
    get quantity(){
        return this.#quantity;
    }

    set imgLink(_imgLink){
        this.#imgLink=_imgLink;
    }
    get imgLink(){
        return this.#imgLink;
    }
    set sellerId(_sellerId){
        this.#sellerId=_sellerId;
    }
    get sellerId(){
        return this.#sellerId;
    }

    


    constructor(_ID,_sellerId,_name, _price,_quantity=1,_imgLink,_bookId) {
        this.ID=_ID;
    this.sellerId=_sellerId;
      this.name = _name;
      this.price = _price;
      this.quantity = _quantity;
      this.imgLink=_imgLink;
      this.bookId=_bookId
    }

    getItem() {

        return{
            "ID":this.ID,
            "sellerId":this.sellerId,
            "name":this.name,
            "price":this.price,
            "quantity":this.quantity,
            "imgLink":this.imgLink,
            "bookId":this.bookId,
        }
        
    }
  }
  
  export class Order {
    #orderId;
    #userId;
    #items;
    #status;


    set orderId(_orderId){
        this.#orderId=_orderId;
    }
    get orderId(){
        return this.#orderId;
    }

   

    set status(_status){
        this.#status=_status;
    }
    get status(){
        return this.#status;
    }

    set userId(_userId){
        this.#userId=_userId;
    }
    get userId(){
        return this.#userId;
    }

    set items(_items){
        this.#items=_items;
    }
    get items() {
        return this.#items.map(item => item.getItem());
    }

    static getLastOrderId() {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const lastOrder = orders[orders.length - 1];
        return lastOrder ? lastOrder.orderId : 0;
    }


    constructor(_userId,_status,_items) {
        const newOrderId = Order.getLastOrderId() + 1;
        this.orderId=newOrderId;
      this.userId = _userId;
        this.status=_status;
      this.items = _items || [];
    }
  
    addItem(item) {
      this.items.push(item);
    }

    getOrder() {
        return {
            "orderId":this.#orderId,
            "userId": this.#userId,
            "status":this.#status,
            "items": this.items,
            
        };
    }
  
    
    
  }
  
  