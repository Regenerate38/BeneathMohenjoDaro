import createBars from "./CreateBars";
import delay from "./utils/Delay";

export default async function mergeSort(scene, delayTime = 500, barWidth, barSpacing, xfactor, blocks = null) {
  if (blocks) {
    await sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks);
  } else {
    await sortArray(scene, delayTime, barWidth, barSpacing, xfactor);
  }
  return false;
}

async function sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks) {
  const bars = scene.barGroup.getChildren();
  await _mergeSortWithBlocks(scene, delayTime, scene.array, 0, scene.array.length - 1, barWidth, barSpacing, xfactor, blocks);
  for (var i = 0; i < 14; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
}

async function _mergeSortWithBlocks(scene, delayTime, arr, l, r, barWidth, barSpacing, xfactor, blocks) {
  if (l < r) {
    var m = l + parseInt((r - l) / 2);
    await _mergeSortWithBlocks(scene, delayTime, arr, l, m, barWidth, barSpacing, xfactor, blocks);
    await _mergeSortWithBlocks(scene, delayTime, arr, m + 1, r, barWidth, barSpacing, xfactor, blocks);
    await mergeWithBlocks(scene, delayTime, arr, l, m, r, barWidth, barSpacing, xfactor, blocks);
    await delay(delayTime);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
  }
}

async function mergeWithBlocks(scene, delayTime, arr, l, m, r, barWidth, barSpacing, xfactor, blocks) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  var i = 0;
  var j = 0;
  var k = l;
  const bars = scene.barGroup.getChildren();

  while (i < n1 && j < n2) {
    // Change color for bars being compared
    bars[l + i].setFillStyle(0xff0000); // Red
    bars[m + 1 + j].setFillStyle(0xff0000); // Red
    await delay(delayTime);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }

  // Reset colors after merging
  for (let x = l; x <= r; x++) {
    bars[x].setFillStyle(0x3498db); // Default color 
  }
}




async function sortArray(scene, delayTime, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  await _mergeSort(scene, delayTime, scene.array, 0, scene.array.length - 1, barWidth, barSpacing, xfactor);
  
  // Sorted
  for (let i = 0; i < 14; i++) {
    bars[i].setFillStyle(0x27ae60);
  }
}

async function _mergeSort(scene, delayTime, arr, l, r, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  if (l < r) {
    // Find the middle point
    var m = l + parseInt((r - l) / 2);

    // Left
    for (let i = l; i <= m; i++) { bars[i].setFillStyle(0x00ff00); }
    await delay(delayTime)
    for (let i = l; i <= m; i++) { bars[i].setFillStyle(0x3498db); }
    await _mergeSort(scene, delayTime, arr, l, m, barWidth, barSpacing, xfactor);

    // Right
    for (let i = m+1; i <= r; i++) { bars[i].setFillStyle(0x00ff00); }
    await delay(delayTime)
    for (let i = m+1; i <= r; i++) { bars[i].setFillStyle(0x3498db); }
    await _mergeSort(scene, delayTime, arr, m + 1, r, barWidth, barSpacing, xfactor);

    // Merge
    await merge(scene, delayTime, arr, l, m, r, barWidth, barSpacing, xfactor);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
    await delay(delayTime);
  }

  //Sorted!
  bars.forEach(bar => {
    bar.setFillStyle(0x3498db);
  });
}

async function merge(scene, delayTime, arr, l, m, r, barWidth, barSpacing, xfactor) {
  let n1 = m - l + 1; // Left including middle
  let n2 = r - m; // Right

  let L = new Array(n1); // Left array
  for (let i = 0; i < n1; i++) {
    L[i] = arr[l + i]
  };

  let R = new Array(n2); // Right array
  for (let j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = l;
  const bars = scene.barGroup.getChildren();

  while (i < n1 && j < n2) {
    // Change color for bars being compared
    bars[l + i].setFillStyle(0xff0000); // Red
    bars[m + 1 + j].setFillStyle(0xff0000); // Red
    await delay(delayTime);
    createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
    
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    // createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
    // await delay(delayTime);
    k++;
    console.log(arr)
    console.log(L)
    console.log(R)
  }
  
  // while (i < n1) {
  //   arr[k] = L[i];
  //   i++;
  //   k++;
  // }
  
  // while (j < n2) {
  //   arr[m+1+j] = arr[k];
  //   arr[k] = R[j];
  //   j++;
  //   k++;
  // }

  // Reset colors after merging
  bars.forEach(bar => {
    bar.setFillStyle(0x3498db); // Default color 
  });
}
