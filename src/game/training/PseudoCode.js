const BubbleSort = {
    1: "for j = 0 to numberOfElements",
    2: "  for i = 1 to numberOfElements - j",
    3: "    if leftElement > rightElement",
    4: "      swap(leftElement, rightElement)",
    5: "    i++",
    6: "j++",
    7: "Sorted!"
}

const QuickSort = {
    1: "for each (unsorted) partition",
    2: "set first element as pivot",
    3: "    storeIndex = pivotIndex+1",
    4: "    for i = pivotIndex+1 to rightmostIndex",
    5: "    if ((a[i] < a[pivot]) or (equal but 50% lucky))",
    6: "        swap(i, storeIndex); ++storeIndex",
    7: "    swap(pivot, storeIndex-1)",
    8: "Sorted!"
}

const MergeSort = {
    1: "split each element into partitions of size 1",
    2: "recursively merge adjacent partitions",
    3: "  for i = leftPartIdx to rightPartIdx",
    4: "    if leftPartHeadVal <= rightPartHeadVal:",
    5: "      copy leftPartHeadValue",
    6: "    else copy rightPartHeadVal; Increase InvIdx",
    7: "copy elements back to original array",
    8: "Sorted!"
}

const HeapSort = {
    1: "Build max heap from input array",
    2: "Repeat until heap is empty:",
    3: "    Largest element is at the root",
    4: "    Swap root with last heap element",
    5: "    Move swapped element to sorted section",
    6: "    Heapify next elements to restore max heap",
    8: "Sorted!"
};

const RadixSort = {
    1: "create 10 buckets (queues) for each digit (0 to 9)",
    2: "for each digit placing",
    3: "    for each e in list, move e into its bucket",
    4: "    for each bucket b, starting from smallest digit",
    5: "        while b is non-empty, restore e to list",
    6: "Sorted!"
}

const SelectionSort = {
    1: "for i = 0 to array.length-1",
    2: "  for j = i+1 to array.length-1",
    3: "    if array[j] < array[i]",
    4: "      swap array[i] with array[j]",
    5: "    j++",
    6: "  i++",
    7: "Sorted!"
}

const InsertionSort = {
    1: "for i = 1 to array.length",
    2: "  key = array[i], j = i-1",
    3: "  while (j >= 0 && arr[j] > key)",
    4: "    arr[j + 1] = arr[j]; j = j - 1;",
    5: "  arr[j + 1] = key;",
    6: "Sorted!"
}

const ShellSort = {
    1: "Begin with a gap as half the array size",
    2: "Repeat until the gap is 0:",
    3: "    For each group of elements spaced by the gap:",
    4: "        Perform insertion sort on the group",
    5: "        Reduce the gap by half",
    6: "Sorted!"
};

export { BubbleSort, QuickSort, MergeSort, HeapSort, RadixSort, SelectionSort, InsertionSort, ShellSort }