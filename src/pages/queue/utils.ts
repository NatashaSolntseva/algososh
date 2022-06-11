interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number };
  getTail: () => { value: T | null; index: number };
  clear: () => void;
  isEmpty: () => boolean;
}

export default class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  isEmpty = () => this.length === 0;

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Достигнута максимальная длина очереди");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди");
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди");
    }
    return { value: this.container[this.head], index: this.head };
  };

  getTail = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("Нет элементов в очереди");
    }
    return { value: this.container[this.tail - 1], index: this.tail - 1 };
  };
}
