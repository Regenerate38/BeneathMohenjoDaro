import delay from "./utils/Delay";
import createBars from "./CreateBars";

export default async function shellSort(scene, barWidth=40, barSpacing=10, xfactor=25) {
  await _shellSort(scene, scene.array, barWidth, barSpacing, xfactor);
  return false;
}

async function _shellSort(scene, arr, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  let n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;

      // Visualize: Change color of bars being compared
      bars[i].setFillStyle(0xff0000); // Red
      bars[i - gap].setFillStyle(0xff0000); // Red
      await delay(200);

      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }

      arr[j] = temp;

      // Reset color of all bars after insertion
      bars.forEach((bar, index) => {
        if (index !== i && index !== i - gap) {
          bar.setFillStyle(0x3498db); // Blue
        }
      });

      await delay(200);
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);;
    }
  }

  // Reset color of all bars at the end
  bars.forEach((bar) => {
    bar.setFillStyle(0x27ae60);
  });

  return arr;
}
