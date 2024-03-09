import createBars from "./createBars";
import delay from "./utils/Delay";

export default async function heapSort(scene, barWidth=40, barSpacing=10, xfactor=25) {
  await sortArray(scene, barWidth, barSpacing, xfactor);
  return false;
}

async function sortArray(scene, barWidth, barSpacing, xfactor) {
  await _heapSort(scene, scene.array, barWidth, barSpacing, xfactor);
}

async function _heapSort(scene, arr, barWidth, barSpacing, xfactor) {
  var N = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
    await heapify(scene, arr, N, i, barWidth, barSpacing, xfactor);
    await delay(200);
  }

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    // Move current root to end
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    await heapify(scene, arr, i, 0, barWidth, barSpacing, xfactor);
    await delay(200);
  }

  const bars = scene.barGroup.getChildren()
  for (let k = 0; k < bars.length; k++) {
    bars[k].setFillStyle(0x27ae60)
  }
}

async function heapify(scene, arr, N, i, barWidth, barSpacing, xfactor) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest != i) {
    // Change fill color to indicate comparison
    const bars = scene.barGroup.getChildren();
    // Reset colors
    for (let k = 0; k < bars.length; k++) {
      bars[k].setFillStyle(0x3498db);
    }
    bars[i].setFillStyle(0xff0000);
    bars[largest].setFillStyle(0xff0000);
    await delay(400);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor); // Update visualization

    // Swap values
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    await heapify(scene, arr, N, largest, barWidth, barSpacing, xfactor);
  }
}

