import createBars from "./CreateBars";
import delay from "./utils/Delay";

export default async function insertionSort(scene, barWidth=40, barSpacing=10, xfactor=25) {
  await sortArray(scene, barWidth, barSpacing, xfactor);
  return false;
}

async function sortArray(scene, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  await _insertionSort(scene, scene.array, barWidth, barSpacing, xfactor);
  for (var i = 0; i < 12; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
}

async function _insertionSort(scene, arr, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      // Visualize: Change bar colors
      bars[j + 1].setFillStyle(0xff0000);
      bars[j].setFillStyle(0xff0000);
      await delay(200);

      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;

    // Reset bar colors after insertion
    bars.forEach((bar) => {
      bar.setFillStyle(0x3498db); // Blue
    });
    await delay(200);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);;
  }
}

