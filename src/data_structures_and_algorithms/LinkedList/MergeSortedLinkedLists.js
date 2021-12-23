import LinkedList from "./LinkedList";
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


//Using Recursion (To be avoided in production since space complexity depends on length of linked-list)
function mergeSortedLinkedLists(headA, headB){
    if(!headA && !headB) return;
    else if(!headA) return headB;
    else if(!headB) return headA;
    else if(headA.data <= headB.data) {
        headA.next = mergeSortedLinkedLists(headA.next, headB);
        return headA;
    }else {
        headB.next = mergeSortedLinkedLists(headA, headB.next);
        return headB;
    }
}

function mergeSortedLinkedLists(headA, headB){
    let linkedListA = new LinkedList(headA);
    let linkedListB = new LinkedList(headB);
    linkedListA = linkedListA.reverse();
    linkedListB = linkedListB.reverse();
    console.log(linkedListA, linkedListB);
}