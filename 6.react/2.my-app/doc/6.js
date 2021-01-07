function ListNode(x){
    this.val = x;
    this.next = null;
}
// {1,3,5},{2,4,6}
// {1,3,10,20},{4,5,6,7}
function getList(arr) {
    let head = null, temp = null;
    arr.forEach(element => {
        if(!head) {
            head = temp = new ListNode(element)
        }else {
            temp.next = new ListNode(element)
            temp = temp.next
        }
    });
    return head
}
let pHead1 = getList([1,3,10,20])
let pHead2 = getList([4,5,6,7])
console.log(JSON.stringify(Merge(pHead1, pHead2), null, 2))
function Merge(pHead1, pHead2) {
    let head = new ListNode(-1);
    let temp = head;
    while(pHead1 && pHead2) {
        if(pHead2.val < pHead1.val) {
            temp.next = pHead2;
            pHead2 = pHead2.next;
        }else {
            temp.next = pHead1;
            pHead1 = pHead1.next;
        }
        temp = temp.next;
    }
    temp.next = pHead1 ? pHead1 : pHead2
    return head.next
}

// class Solution {
//     public:
//      ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
//      {
//          if (!pHead1) return pHead2;
//          if (!pHead2) return pHead1;
//          if (pHead1->val <= pHead2->val) {
//              pHead1->next = Merge(pHead1->next, pHead2);
//              return pHead1;
//          }
//          else {
//              pHead2->next = Merge(pHead1, pHead2->next);
//              return pHead2;
//          }
//      }
//     };

