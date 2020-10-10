
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkList{
    constructor() {
        this.head = null;
        this.size = 0;
    }

    remove(index) {
        if(index < 0 || index >= this.size) throw Error("索引异常");
        if(index === null || index === undefined) {
            index = this.size - 1;
        }
        let del = this.getNode(index);
        if(index == 0) {
            this.head = this.head.next;
        }else {
            let pre = this.getNode(index - 1);
            pre.next = pre.next.next;
        }
        this.size--;
        return del;
    }

    add(index, element){
        if(arguments.length == 0) throw Error("节点不能为空");
        if(arguments.length == 1) {
            element = index;
            index = this.size;
        }
        if(index < 0 || index > this.size) throw Error("索引异常");
        let current = new Node(element);
        if(index == 0) {
            current.next = this.head;
            this.head = current;
        }else {
            let pre = this.getNode(index-1);
            current.next = pre.next;
            pre.next = current;
        }
        this.size++;
    }

    getNode(index) {
        if(index >= this.size) throw Error("索引异常");
        let current = this.head;
        for(let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    reserve() {
        let head = this.head;
        if(head == null || this.head.next == null) return head;
        let nHead = null;
        while(head !== null) {
            let temp = head.next;
            head.next = nHead;
            nHead = head;
            head = temp;
        }

        this.head = nHead;
    }

    display() {
        if(this.head === null) {
            console.log("该链表为空")
        }else {
            let temp = this.head;
            while(temp) {
                console.log(temp.element);
                temp = temp.next;
            }
        }
    }
}

module.exports = LinkList

let linkList = new LinkList();
linkList.add(1);
linkList.add(2);
linkList.add(3);
linkList.add(0,4);
linkList.remove(0);
linkList.display();
linkList.reserve();
linkList.display();