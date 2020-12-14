class Node{
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class List {
    constructor() {
        this.head = null
        this.last = null
    }

    insert(val) {
        let node = new Node(val);
        if(this.head == null) {
            this.head = node;
            this.last = head;
        }else {
            this.last.next = node;
            this.last = node;
        }
    }

}
let list = new List();
list.insert(4);
list.insert(2);
list.insert(1);
list.insert(3);
console.log(list.head)
var insertionSortList = function(head) {

};