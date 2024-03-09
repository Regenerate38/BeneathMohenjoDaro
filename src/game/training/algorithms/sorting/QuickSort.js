import delay from "./utils/Delay";

export default async function quickSort(scene, barWidth = 40, barSpacing = 10, xfactor=25) {
  await sortArray(scene, barWidth, barSpacing, xfactor);
  return false;
}

async function sortArray(scene, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  await _quickSort(scene, scene.array, 0, 11, barWidth, barSpacing, xfactor);
  for (var i = 0; i < 12; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
}

async function _quickSort(scene, arr, low, high, barWidth, barSpacing, xfactor) {
  if (low < high) {
    let pi = await partition(scene, arr, low, high, barWidth, barSpacing, xfactor);
    await _quickSort(scene, arr, low, pi - 1, barWidth, barSpacing, xfactor);
    await _quickSort(scene, arr, pi + 1, high, barWidth, barSpacing, xfactor);
  }
}

async function partition(scene, arr, low, high, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();

  let pivot = arr[high];
  let i = low - 1;
  await delay(200);

  createBars(scene, pivot, barWidth, barSpacing, xfactor);

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      // bars[i].setFillStyle(0xffe441);
      bars[j].setFillStyle(0x22ee11);
      await delay(200);

      createBars(scene, pivot, barWidth, barSpacing, xfactor);
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[j].setFillStyle(0xffe441);
      bars[i].setFillStyle(0x22ee11);
      await delay(50);
      createBars(scene, pivot, barWidth, barSpacing, xfactor);
    } else {
      bars[j].setFillStyle(0xffffff);
      await delay(50);
      createBars(scene, pivot, barWidth, barSpacing, xfactor);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  await delay(200);
  createBars(scene, i + 1, barWidth, barSpacing, xfactor);

  return i + 1;
}

function createBars (scene, pivotIndex, barWidth, barSpacing, xfactor) {
  const startX =
    (scene.sys.game.config.width -
      (barWidth + barSpacing) * scene.array.length) /
    2 + xfactor;
  let _fontSize
  if (barWidth > 30) {
      _fontSize = 16
  } else {
      _fontSize = 0
  }

  // const maxHeight = Math.max(...scene.array);
  // const startY = scene.sys.game.config.height - maxHeight;

  scene.barGroup.clear(true, true); // Clear existing bars

  scene.array.forEach((value, index) => {
    const rect = scene.add.rectangle(
      startX + (barWidth + barSpacing) * index,
      535,
      barWidth,
      value * 3,
      index === pivotIndex ? 0xff0000 : 0x3498db
    );
    rect.setOrigin(0.5, 1);
    scene.barGroup.add(rect);

    const text = scene.add.text(rect.x, rect.y, value.toString(), {
      fontSize: `${_fontSize}px`,
      fill: "#ffffff",
    });
    text.setOrigin(0.5, 1);
    rect.setData("index", index);
    rect.setData("value", value);
  });
}


function isSorted(scene) {
  const bars = scene.barGroup.getChildren();
  for (var i = 0; i < 11; i++) {
    if (scene.array[i] > scene.array[i + 1]) {
      return false;
    }
  }
  return true;
}
