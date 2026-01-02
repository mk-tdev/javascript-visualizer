// Algorithm metadata and code display strings
export const algorithmCode = {
    bubble: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    selection: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      // Find minimum element
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap with current position
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    insertion: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    // Shift larger elements right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Insert key at correct position
    arr[j + 1] = key;
  }
  return arr;
}`,
    merge: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Merge sorted halves
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left, right);
}`,
    quick: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  // Recursively sort and combine
  return quickSort(left)
    .concat(middle, quickSort(right));
}`
};

// Algorithm implementations with visualization
export function createAlgorithms(visualizer) {
    const { highlightLine, sleep, renderArray, updateStats, comparisons, swaps, array } = visualizer;

    async function bubbleSort(arr) {
        const n = arr.length;
        highlightLine(2);
        await sleep();
        for (let i = 0; i < n; i++) {
            highlightLine(3);
            await sleep();
            for (let j = 0; j < n - i - 1; j++) {
                highlightLine(4);
                await sleep();
                visualizer.comparisons++;
                updateStats();
                renderArray(arr, [j, j + 1], Array.from({ length: n - i }, (_, k) => n - 1 - k));

                highlightLine(6);
                await sleep();
                if (arr[j] > arr[j + 1]) {
                    highlightLine(8);
                    await sleep();
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    visualizer.swaps++;
                    updateStats();
                }
            }
        }
        highlightLine(null);
        renderArray(arr, [], Array.from({ length: n }, (_, i) => i));
    }

    async function selectionSort(arr) {
        const n = arr.length;
        highlightLine(2);
        await sleep();
        for (let i = 0; i < n - 1; i++) {
            highlightLine(3);
            await sleep();
            let minIdx = i;
            highlightLine(4);
            await sleep();
            for (let j = i + 1; j < n; j++) {
                highlightLine(5);
                await sleep();
                visualizer.comparisons++;
                updateStats();
                renderArray(arr, [i, j], Array.from({ length: i }, (_, k) => k));

                highlightLine(6);
                await sleep();
                if (arr[j] < arr[minIdx]) {
                    highlightLine(7);
                    await sleep();
                    minIdx = j;
                }
            }
            highlightLine(11);
            await sleep();
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                visualizer.swaps++;
                updateStats();
            }
        }
        highlightLine(null);
        renderArray(arr, [], Array.from({ length: n }, (_, i) => i));
    }

    async function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            highlightLine(2);
            await sleep();
            let key = arr[i];
            highlightLine(3);
            await sleep();
            let j = i - 1;

            highlightLine(5);
            await sleep();
            while (j >= 0 && arr[j] > key) {
                visualizer.comparisons++;
                updateStats();
                renderArray(arr, [j, j + 1], Array.from({ length: i }, (_, k) => k));

                highlightLine(6);
                await sleep();
                arr[j + 1] = arr[j];
                visualizer.swaps++;
                updateStats();
                j--;
            }
            highlightLine(10);
            await sleep();
            arr[j + 1] = key;
        }
        highlightLine(null);
        renderArray(arr, [], Array.from({ length: arr.length }, (_, i) => i));
    }

    async function mergeSort(arr) {
        highlightLine(2);
        await sleep();
        await mergeSortHelper(arr, 0, arr.length - 1);
        highlightLine(null);
        renderArray(arr, [], Array.from({ length: arr.length }, (_, i) => i));
    }

    async function mergeSortHelper(arr, left, right) {
        highlightLine(4);
        await sleep();
        if (left < right) {
            highlightLine(5);
            await sleep();
            const mid = Math.floor((left + right) / 2);
            highlightLine(6);
            await sleep();
            await mergeSortHelper(arr, left, mid);
            highlightLine(7);
            await sleep();
            await mergeSortHelper(arr, mid + 1, right);
            highlightLine(9);
            await sleep();
            await merge(arr, left, mid, right);
        }
    }

    async function merge(arr, left, mid, right) {
        highlightLine(13);
        await sleep();
        const leftArr = arr.slice(left, mid + 1);
        highlightLine(14);
        await sleep();
        const rightArr = arr.slice(mid + 1, right + 1);
        highlightLine(15);
        await sleep();
        let i = 0, j = 0, k = left;

        highlightLine(17);
        await sleep();
        while (i < leftArr.length && j < rightArr.length) {
            visualizer.comparisons++;
            updateStats();
            renderArray(arr, [left + i, mid + 1 + j]);

            highlightLine(18);
            await sleep();
            if (leftArr[i] <= rightArr[j]) {
                highlightLine(19);
                await sleep();
                arr[k++] = leftArr[i++];
            } else {
                highlightLine(21);
                await sleep();
                arr[k++] = rightArr[j++];
            }
            visualizer.swaps++;
        }

        highlightLine(25);
        await sleep();
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }

    async function quickSort(arr) {
        highlightLine(2);
        await sleep();
        await quickSortHelper(arr, 0, arr.length - 1);
        highlightLine(null);
        renderArray(arr, [], Array.from({ length: arr.length }, (_, i) => i));
    }

    async function quickSortHelper(arr, low, high) {
        highlightLine(2);
        await sleep();
        if (low < high) {
            highlightLine(4);
            await sleep();
            const pi = await partition(arr, low, high);
            highlightLine(5);
            await sleep();
            await quickSortHelper(arr, low, pi - 1);
            highlightLine(6);
            await sleep();
            await quickSortHelper(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        highlightLine(4);
        await sleep();
        const pivot = arr[high];
        highlightLine(5);
        await sleep();
        let i = low - 1;

        for (let j = low; j < high; j++) {
            visualizer.comparisons++;
            updateStats();
            renderArray(arr, [j, high]);
            await sleep();

            if (arr[j] < pivot) {
                highlightLine(5);
                await sleep();
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                visualizer.swaps++;
                updateStats();
            }
        }
        highlightLine(6);
        await sleep();
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        visualizer.swaps++;
        updateStats();
        return i + 1;
    }

    return {
        bubble: {
            name: 'Bubble Sort',
            complexity: { time: 'O(n²)', space: 'O(1)' },
            description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The largest element "bubbles up" to the end with each pass.',
            sort: bubbleSort
        },
        selection: {
            name: 'Selection Sort',
            complexity: { time: 'O(n²)', space: 'O(1)' },
            description: 'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.',
            sort: selectionSort
        },
        insertion: {
            name: 'Insertion Sort',
            complexity: { time: 'O(n²)', space: 'O(1)' },
            description: 'Builds the sorted array one item at a time. Takes each element and inserts it into its correct position in the already-sorted portion of the array.',
            sort: insertionSort
        },
        merge: {
            name: 'Merge Sort',
            complexity: { time: 'O(n log n)', space: 'O(n)' },
            description: 'A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves together.',
            sort: mergeSort
        },
        quick: {
            name: 'Quick Sort',
            complexity: { time: 'O(n log n)', space: 'O(log n)' },
            description: 'A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
            sort: quickSort
        }
    };
}
