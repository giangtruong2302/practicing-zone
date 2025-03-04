class Stack {
    private items: any[];

    constructor() {
        this.items = [];
    }

    push(item: any) {
        this.items.push(item);
    }

    pop(): any {
        return this.items.pop();
    }

    peek(): any {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

class Queue {
    private items: any[];

    constructor() {
        this.items = [];
    }

    enqueue(item: any) {
        this.items.push(item);
    }

    dequeue(): any {
        return this.items.shift();
    }

    front(): any {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

class LinkedListNode {
    value: any;
    next: LinkedListNode | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    private head: LinkedListNode | null;

    constructor() {
        this.head = null;
    }

    append(value: any) {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    remove(value: any) {
        if (!this.head) return;
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    find(value: any): LinkedListNode | null {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    isEmpty(): boolean {
        return this.head === null;
    }

    clear() {
        this.head = null;
    }
}

export { Stack, Queue, LinkedList };