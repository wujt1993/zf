class Node{
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right = null;
    }
}

class BTS {
    constructor() {
        this.root = null;
    }

    add(node) {
        if(this.root === null) {
            this.root = node
        }else {
            let temp = this.root;
            while(true) {
                if(temp.element > node.element) {
                    if(temp.left == null) {
                        temp.left = node;
                        break;
                    }else{
                        temp = temp.left;
                    }
                    
                }else {
                    if(temp.right == null) {
                        temp.right = node;
                        break;
                    }else{
                        temp = temp.right;
                    }
                }
            }
        }
    }
    //前序遍历：父 -> 左 -> 右
    preOrder() {
        if (this.root == null) return;
        const order = (node) => {
            if(node == null) return
            console.log(node.element);
            order(node.left);
            order(node.right);
        }
        order(this.root);
    }

    inOrder() {
        if (this.root == null) return;
        const order = (node) => {
            if(node == null) return
            
            order(node.left);
            console.log(node.element);
            order(node.right);
        }
        order(this.root);
    }

    postOrder() {
        if (this.root == null) return;
        const order = (node) => {
            if(node == null) return
            
            order(node.left);
            order(node.right);
            console.log(node.element);
        }
        order(this.root);
    }

    levelOrder() {
        if (this.root == null) return;
        let stack = [this.root];
        let index = 0;
        let cur = null;
        while(cur = stack[index++]) {
            console.log(cur.element)
            if(cur.left) {
                stack.push(cur.left)
            }
            if(cur.right) {
                stack.push(cur.right)
            }
        }

    }
}

module.exports = BTS;

const bts = new BTS();

bts.add(new Node(12));
bts.add(new Node(9));
bts.add(new Node(14));
bts.add(new Node(13));
bts.add(new Node(15));
bts.add(new Node(8));
bts.add(new Node(10));
console.log(bts.root);

// bts.preOrder();
//bts.inOrder();
// bts.postOrder()


bts.levelOrder()