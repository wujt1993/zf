function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function Tree() {
    this.root = null;
    this.preArr = [];
    this.infixArr = [];
    this.postArr = [];
    this.levelArr = []
}
//前序遍历： 父 - 左 - 右
Tree.prototype.preOrder = function(root) {
    if(root === null) {
        return 
    }else if(root === undefined) {
        this.preOrder(this.root);
    }else {
        this.preArr.push(root.val);
        this.preOrder(root.left);
        this.preOrder(root.right);
    }
}

//中序遍历： 左 - 父  - 右
Tree.prototype.infixOrder = function(root) {
    if(root === null) {
        return 
    }else if(root === undefined) {
        this.infixOrder(this.root);
    }else {
        this.infixOrder(root.left);
        this.infixArr.push(root.val);
        this.infixOrder(root.right);
    }
}

//后序遍历： 左 - 右 - 父
Tree.prototype.postOrder = function(root) {
    if(root === null) {
        return 
    }else if(root === undefined) {
        this.postOrder(this.root);
    }else {
        
        this.postOrder(root.left);
        this.postOrder(root.right);
        this.postArr.push(root.val);
    }
}

//层序遍历
Tree.prototype.levelOrder = function() {
    if(this.root == null) return;
    let levelArr = [this.root]
    let current = null;
    let index = 0;
    while(current = levelArr[index++]) {
        this.levelArr.push(current.val);
        if(current.left) {
            levelArr.push(current.left);
        }
        if(current.right) {
            levelArr.push(current.right);
        }
    }
}
let tree = new Tree();
let root = new TreeNode(0);
let node1 = new TreeNode(1);
let node2 = new TreeNode(2);
let node3 = new TreeNode(3);
let node4 = new TreeNode(4);
let node5 = new TreeNode(5);
let node6 = new TreeNode(6);
root.left = node1;
root.right = node2;
node1.left = node3;
node1.right = node4;
node2.right = node5;
node5.left = node6;
tree.root = root;

tree.preOrder();//0 1 3 4 2 5 6
tree.infixOrder();// 3 1 4 0 2 6 5
tree.postOrder();// 3 4 1 6 5 2 0
tree.levelOrder();// 0 1 2 3 4 5 6

// console.log(tree.preArr);
// console.log(tree.infixArr);
// console.log(tree.postArr);
// console.log(tree.levelArr);

function reConstructBinaryTree(pre, vin)
{
    return rebuild(pre, 0, pre.length - 1, vin, 0, vin.length - 1)
}


function rebuild(pre, pre_left, pre_right, vin, vin_left, vin_right) {
    if(pre_left > pre_right) return null;
    let root = new TreeNode(pre[pre_left]);
    let rootIndex = vin_left;
    while(root.val != vin[rootIndex++]);
    rootIndex--;
    root.left = rebuild(pre, pre_left + 1, pre_left + rootIndex - vin_left, vin, vin_left, rootIndex - 1);
    root.right = rebuild(pre, pre_left + rootIndex - vin_left + 1, pre_right, vin, rootIndex+1, vin_right);
    return root;
}


console.log(reConstructBinaryTree([1,2,3,4,5,6,7],[3,2,4,1,6,5,7])) // {1,2,5,3,4,6,7}

