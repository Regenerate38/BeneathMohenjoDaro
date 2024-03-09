import createBars from "./CreateBars";
import delay from "./utils/Delay";
import setDefaultBlockColor from "./utils/SetDefaultBlockColor";

export default async function bubbleSort(scene, delayTime=500, barWidth=40, barSpacing=10, xfactor=25, blocks = null) {
  if (blocks) {
    await _bubbleSortWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks)
  } else {
    await _bubbleSort(scene, delayTime, barWidth, barSpacing, xfactor,)
  }
  return false
}

async function _bubbleSortWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks) {
  const bars = scene.barGroup.getChildren();
  const activeColor = 0xff0000

  for (let i = 0; i < 12; i++) {
    // Setting outer loop block as active
    setDefaultBlockColor(blocks)
    blocks[0].setColor(activeColor)
    await delay(delayTime);

    for (let j = 0; j < 12 - i; ++j) {
      // Setting inner loop block as active
      setDefaultBlockColor(blocks)
      blocks[1].setColor(activeColor)
      await delay(delayTime);

      // Selecting first two elements of the array
      bars[j].setFillStyle(0xaa0000);
      if (bars[j + 1]) bars[j + 1].setFillStyle(0xaa0000);
      
      // Setting Comparision block as active
      setDefaultBlockColor(blocks)
      blocks[2].setColor(activeColor)
      await delay(delayTime);

      // Comparing
      if (scene.array[j] > scene.array[j + 1]) {
        [scene.array[j], scene.array[j + 1]] = [
          scene.array[j + 1],
          scene.array[j],
        ];

        // Setting Swapping block as active
        setDefaultBlockColor(blocks)
        blocks[3].setColor(activeColor)

        createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
        bars[j].setFillStyle(0xaa0000);
        if (bars[j + 1]) bars[j + 1].setFillStyle(0xaa0000);    
        await delay(delayTime);
      }

      bars[j].setFillStyle(0xaa0000);
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);

      // Setting inner increment block as active
      setDefaultBlockColor(blocks)
      blocks[4].setColor(activeColor)
      await delay(delayTime);
    }

    // Setting outer increment block as active
    setDefaultBlockColor(blocks)
    blocks[5].setColor(activeColor)
    await delay(delayTime);
  }
  
  createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
  for (let k = 0; k < 12; k++) {
    bars[k].fillColor = 0x27ae60;
  }

  // Setting
  setDefaultBlockColor(blocks)
  blocks[6].setColor(activeColor)
  await delay(delayTime);
}

async function _bubbleSort(scene, delayTime, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();
  createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12 - i; ++j) {
      // Selecting first two elements of the array
      bars[j].setFillStyle(0xaa0000);
      if (bars[j + 1]) bars[j + 1].setFillStyle(0xaa0000);
      await delay(delayTime);
      
      if (scene.array[j] > scene.array[j + 1]) {
        await delay(delayTime);
        [scene.array[j], scene.array[j + 1]] = [
          scene.array[j + 1],
          scene.array[j],
        ];
        createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
        bars[j].setFillStyle(0xaa0000);
        if (bars[j + 1]) bars[j + 1].setFillStyle(0xaa0000);    
        await delay(delayTime);
      }
      bars[j].setFillStyle(0xaa0000);
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
      await delay(delayTime);
    }
  }
  
  createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
  for (let k = 0; k < 12; k++) {
    bars[k].fillColor = 0x27ae60;
  }
  await delay(delayTime);
}

