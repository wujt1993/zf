
//输入一个链表，输出该链表中倒数第k个结点。
function ListNode(x){
    this.val = x;
    this.next = null;
}
let head = new ListNode(0);
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
let node6 = new ListNode(6);
let node7 = new ListNode(7);
let node8 = new ListNode(8);
head.next = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
node6.next = node7;
node7.next = node8;

console.log(FindKthToTail(head, 3));
function FindKthToTail(head, k){
    let slow = head;
    let fast = head;
    while(k--) {
        fast = fast.next;
        if(!fast) return null
    }

    while(fast) {

        slow = slow.next;
        fast = fast.next
    }
    return slow
}



// class Solution {
//     public:
//         ListNode* FindKthToTail(ListNode* pListHead, unsigned int k) {
//             if (!pListHead || k <= 0) return nullptr;
//             auto slow = pListHead, fast = pListHead;
     
//             while (k--) {
//                 if (fast)
//                     fast = fast->next;
//                 else
//                     return nullptr; //如果单链表长度 < K,直接返回
//             }
//             while (fast) {
//                 slow = slow->next;
//                 fast = fast->next;
//             }
//             return slow;
//         }
//     };