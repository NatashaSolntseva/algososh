class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  getSize: () => number;
  addToTail: (el: T) => void;
  insertAtIndex: (el: T, index: number) => void;
  getNodeByIndex: (index: number) => T | null;
  removeFromIndex: (index: number) => T | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(initialState?: T[]) {
    this.size = 0;
    this.head = null;
    initialState?.forEach((el) => {
      this.insertAtIndex(el, 0);
    });
  }

  getSize() {
    return this.size;
  }

  addToTail(el: T) {
    let node = new Node(el);

    if (this.size === 0) {
      this.head = node;
    } else {
      let currentEl = this.head;
      while (currentEl && currentEl.next !== null) {
        currentEl = currentEl.next;
      }
      if (currentEl) {
        currentEl.next = new Node(el);
      }
    }
    this.size++;
  }

  insertAtIndex(el: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Введите верное значение индекса");
    } else {
      let node = new Node(el);

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

  removeFromIndex(index: number) {
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
}
