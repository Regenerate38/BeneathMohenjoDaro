import createBars from "./CreateBars";
import delay from "./utils/Delay";

export default async function selectionSort(scene, barWidth=40, barSpacing=10, xfactor=25) {
  await sortArray(scene, barWidth, barSpacing, xfactor);
  return false;
}

async function sortArray(scene, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();

  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);;

      bars[i].setFillStyle(0xaa0000);
      if (bars[j]) bars[j].setFillStyle(0xaa0000);
      await delay(200);

      if (scene.array[i] > scene.array[j]) {
        [scene.array[i], scene.array[j]] = [scene.array[j], scene.array[i]];
      }

      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
      await delay(200);
    }
    for (let k = 0; k <= i; k++) {
      bars[k].setFillStyle(0x27ae60);
    }
  }
}
