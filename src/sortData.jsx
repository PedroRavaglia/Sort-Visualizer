import selectionSort from './SortingAlgorithms/selectionSort'
import bubbleSort from './SortingAlgorithms/bubbleSort'
import insertionSort from './SortingAlgorithms/insertionSort'
import quickSort from './SortingAlgorithms/quickSort'

export const sortData = [
  {
    name: "Selection Sort",
    url: "/selectionSort",
    func: selectionSort,
    desc: [
      `Selection Sort is an iterative and in-place sorting algorithm that divides the data structure in two sublists:
      the ordered one, and the unordered one. The algorithm loops for all the elements of the data structure and for 
      every cycle picks the smallest element of the unordered sublist and adds it to the sorted sublist, progressively 
      filling it.`,
      `It's a really simple and intuitive algorithm that does not require additional memory, but it's not really efficient 
      on big data structures due to its quadratic time complexity.`
    ], 
    comp: ["O(n²)", "O(n²)", "O(n²)", "O(1)"]
  },
  {
    name: "Bubble Sort",
    url: "/bubbleSort",
    func: bubbleSort,
    desc: [
      `Bubble Sort is an iterative sorting algorithm that imitates the movement of bubbles in sparkling water. The bubbles 
      represents the elements of the data structure.`,
      `The bigger bubbles reach the top faster than smaller bubbles, and this algorithm works in the same way. It iterates 
      through the data structure and for each cycle compares the current element with the next one, swapping them if they 
      are in the wrong order.`,
      `It's a simple algorithm to implement, but not much efficient: on average, quadratic sorting algorithms with the same 
      time complexity such as Selection Sort or Insertion Sort perform better.`
    ], 
    comp: ["O(n²)", "O(n)", "O(n²)", "O(1)"]
  },
  {
    name: "Insertion Sort",
    url: "/insertionSort",
    func: insertionSort,
    desc: [
      `Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant 
      than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient 
      on small data structures almost sorted.`,
      `The algorithm divides the data structure in two sublists: a sorted one, and one still to sort. Initially, the sorted sublist 
      is made up of just one element and it gets progressively filled. For every iteration, the algorithm picks an element on the 
      unsorted sublist and inserts it at the right place in the sorted sublist.`
    ], 
    comp: ["O(n²)", "O(n)", "O(n²)", "O(1)"]
  },
  {
    name: "Quick Sort",
    url: "/quickSort",
    func: quickSort,
    desc: [
      `Quick Sort is a sorting algorithm based on splitting the data structure in smaller partitions and sort them recursively until 
      the data structure is sorted.`,
      `This division in partitions is done based on an element, called pivot: all the elements bigger than the pivot get placed on the 
      right side of the structure, the smaller ones to the left, creating two partitions. Next, this procedure gets applied recursively 
      to the two partitions and so on.`
    ], 
    comp: ["O(n × log n)", "O(n²)", "O(n × log n)", "O(n)"]
  }
];