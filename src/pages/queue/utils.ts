interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  clear: () => void;

  head: { value: T | null; index: number };
  tail: { value: T | null; index: number };

  isEmpty: boolean;
}

export default class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private _head: number = 0;
  private _tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  get isEmpty() {
    return this.length === 0;
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Достигнута максимальная длина очереди");
    }
    this.container[this._tail] = item;
    this._tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty) {
      throw new Error("Нет элементов в очереди");
    }
    this.container[this._head] = null;
    this._head++;
    this.length--;
  }

  clear = () => {
    this._head = 0;
    this._tail = 0;
    this.length = 0;
  };

  get head() {
    if (this.isEmpty) {
      throw new Error("Нет элементов в очереди");
    }
    return { value: this.container[this._head], index: this._head };
  }

  get tail() {
    if (this.isEmpty) {
      throw new Error("Нет элементов в очереди");
    }
    return { value: this.container[this._tail - 1], index: this._tail - 1 };
  }
}
