import LinkedListNode from "./LinkedListNode";

// Dummy Node method.
function mergeSortedLinkedLists(headA, headB){
    let head = new LinkedListNode(null);
    let tail = head;
    while(true){
        if(!headA && !headB) break;
        // instead of iterating remaining linked-list items, simply point tail to start of those items.
        if(!headA){
            tail.next = headB;
            break;
        }
        if(!headB){
            tail.next = headA;
            break;
        }
        if(headA.data <= headB.data){
            tail.next = headA;
            headA = headA.next;
        }else{
            tail.next = headB;
            headB = headB.next;
        }
        tail = tail.next;
    }
    return head.next;
}