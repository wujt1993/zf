// 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

function ListNode(x){
    this.val = x;
    this.next = null;
}
//{1,2,3,3,4,4,5}
function getHead(arr) {
    let pHead = null;
    let temp = null
    arr.forEach(element => {
        pHead ? temp = temp.next = new ListNode(element) : pHead = temp = new ListNode(element)
    });
    return pHead
}
let pHead = getHead([1,2,3,3,4,4,5]);
console.log(JSON.stringify(pHead, null, 2));
function deleteDuplication(pHead)
{
    if(!pHead && !pHead.next) return pHead;
    let map = {
        [pHead.val]: true
    }
    let temp = pHead;
    while(temp.next) {
        if(!map[temp.next.val]) {
            map[temp.next.val] = true;
            temp = temp.next;
        } else {
            temp.next = temp.next.next
        }
    } 
    return pHead
}

console.log(JSON.stringify(deleteDuplication(pHead), null, 2));