class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (el: T) => void;
  append: (el: T) => void;
  addByIndex: (el: T, index: number) => void;
  deleteByIndex: (index: number) => T | null;
  deleteHead: () => T | null;
  deleteTail: () => T | null;
  toArray: () => void;
  getNodeByIndex: (index: number) => T | null;
  sizeList: number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;

  constructor(initialState?: T[]) {
    this.size = 0;
    this.head = null;
    initialState?.forEach((el) => {
      this.addByIndex(el, 0);
    });
  }

  //добавление в начало списка
  prepend(el: T) {
    let node = new LinkedListNode(el);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  //добавление в конец списка
  append(el: T) {
    let node = new LinkedListNode(el);

    if (this.size === 0) {
      this.head = node;
    } else {
      let currentEl = this.head;
      while (currentEl && currentEl.next !== null) {
        currentEl = currentEl.next;
      }
      if (currentEl) {
        currentEl.next = new LinkedListNode(el);
      }
    }
    this.size++;
  }

  addByIndex(el: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Введите верное значение индекса");
    } else {
      let node = new LinkedListNode(el);

      // добавдение в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let currentEl = this.head;
        let currentIndex = 0;
        let prevEl = null;

        // перебираем элементы до нужной позиции
        while (currentIndex < index && currentEl) {
          prevEl = currentEl;
          currentEl = currentEl.next;
          currentIndex++;
        }
        // Добавить элемент
        if (prevEl) {
          prevEl.next = node;
        }
        node.next = currentEl;
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let currentEl = this.head;

    if (index === 0 && currentEl) {
      this.head = currentEl.next;
    } else {
      let prevEl = null;
      let currentIndex = 0;

      while (currentIndex < index && currentEl) {
        prevEl = currentEl;
        currentEl = currentEl.next;
        currentIndex++;
      }

      if (prevEl && currentEl) {
        prevEl.next = currentEl.next;
      }
    }
    this.size--;
    return currentEl ? currentEl.value : null;
  }

  deleteHead() {
    if (!this.head) return null;
    let deletedHead = this.head;

    if (this.head.next) {
      this.head = deletedHead.next;
    } else {
      this.head = null;
    }
    this.size--;
    return deletedHead ? deletedHead.value : null;
  }

  deleteTail() {
    if (this.size === 0) return null;

    let currentEl = this.head;
    let prevEl = null;
    let currentIndex = 0;

    while (currentIndex < this.size - 1 && currentEl) {
      prevEl = currentEl;
      currentEl = currentEl.next;
      currentIndex++;
    }

    if (prevEl && currentEl) {
      prevEl.next = currentEl.next;
    }
    this.size--;
    return currentEl ? currentEl.value : null;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }
    let currentEl = this.head;
    let curruntIndex = 0;

    while (curruntIndex < index && currentEl) {
      currentEl = currentEl.next;
      curruntIndex++;
    }
    return currentEl ? currentEl.value : null;
  }

  get sizeList() {
    return this.size;
  }
}
