import createBars from "./CreateBars";
import delay from "./utils/Delay";
import setDefaultBlockColor from "./utils/SetDefaultBlockColor";

var activeColor = 0xaa0000;

export default async function insertionSort(scene, delayTime, barWidth = 40, barSpacing = 10, xfactor = 25, blocks = null) {
  if (blocks) {
    await sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks)
  } else {
    await sortArray(scene, delayTime, barWidth, barSpacing, xfactor);
  }
  return false;
}

async function sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks) {
  const bars = scene.barGroup.getChildren();
  await _insertionSortWithBlocks(scene, delayTime, scene.array, barWidth, barSpacing, xfactor, blocks);
  for (var i = 0; i < 12; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
  setDefaultBlockColor(blocks);
  blocks[5].setColor(activeColor);
  await delay(delayTime);
}

async function _insertionSortWithBlocks(scene, delayTime, arr, barWidth, barSpacing, xfactor, blocks) {
  const bars = scene.barGroup.getChildren();
  setDefaultBlockColor(blocks);
  blocks[0].setColor(activeColor);
  await delay(delayTime);
  for (let i = 1; i < arr.length; i++) {
    setDefaultBlockColor(blocks);
    blocks[1].setColor(activeColor);
    await delay(delayTime);
    let key = arr[i];
    let j = i - 1;

    setDefaultBlockColor(blocks);
    blocks[2].setColor(activeColor);
    await delay(delayTime);
    while (j >= 0 && arr[j] > key) {
      // Visualize: Change bar colors
      setDefaultBlockColor(blocks);
      blocks[3].setColor(activeColor);
      await delay(delayTime);
      bars[j + 1].setFillStyle(0xff0000);
      bars[j].setFillStyle(0xff0000);
      await delay(delayTime);

      arr[j + 1] = arr[j];
      j = j - 1;
      setDefaultBlockColor(blocks);
      blocks[2].setColor(activeColor);
      await delay(delayTime);
    }
    setDefaultBlockColor(blocks);
    blocks[4].setColor(activeColor);
    await delay(delayTime);
    arr[j + 1] = key;

    await delay(delayTime);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
    await delay(delayTime);
  }
}


async function sortArray(scene, delayTime, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  await _insertionSort(scene, delayTime, scene.array, barWidth, barSpacing, xfactor);
  for (var i = 0; i < 12; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
}

async function _insertionSort(scene, delayTime, arr, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      // Visualize: Change bar colors
      bars[j + 1].setFillStyle(0xff0000);
      bars[j].setFillStyle(0xff0000);
      await delay(delayTime);

      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;

    // Reset bar colors after insertion
    bars.forEach((bar) => {
      bar.setFillStyle(0x3498db); // Blue
    });
    await delay(delayTime);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
  }
}
