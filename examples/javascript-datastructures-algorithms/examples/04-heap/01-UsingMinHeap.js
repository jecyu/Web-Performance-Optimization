const { MinHeap } = PackDataStructuresAlogrithms;

let heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);

heap.insert(1);

console.log('Heap size :', heap.size());
console.log('Heap is empty :', heap.isEmpty());
console.log('Heap min value :', heap.findMinimum());

// 导出
heap = new MinHeap();
for (let i = 1; i < 10; i ++) {
  heap.insert(i);
}
console.log('Extract minimum :', heap.extract());
console.log(heap);