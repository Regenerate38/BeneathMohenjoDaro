import createBars from "./CreateBars";
import delay from "./utils/Delay";
import setDefaultBlockColor from "./utils/SetDefaultBlockColor";

var activeColor = 0xaa0000;

export default async function selectionSort(scene, delayTime, barWidth=40, barSpacing=10, xfactor=25, blocks = null) {
  if (blocks) {
    await sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks);
    setDefaultBlockColor(blocks);
    blocks[6].setColor(activeColor);
    await delay(delayTime);
  } else {
    await sortArray(scene, delayTime, barWidth, barSpacing, xfactor);
  }
  return false;
}

async function sortArrayWithBlocks(scene, delayTime, barWidth, barSpacing, xfactor, blocks) {
  const bars = scene.barGroup.getChildren();

  setDefaultBlockColor(blocks);
  blocks[0].setColor(activeColor);
  await delay(delayTime);
  
  for (let i = 0; i < 12; i++) {
    setDefaultBlockColor(blocks);
    blocks[1].setColor(activeColor);
    await delay(delayTime);
    
    for (let j = i + 1; j < 12; j++) {
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);;
      
      bars[i].setFillStyle(0xaa0000);
      if (bars[j]) bars[j].setFillStyle(0xaa0000);      
      setDefaultBlockColor(blocks);
      blocks[2].setColor(activeColor);
      await delay(delayTime);
      
      if (scene.array[i] > scene.array[j]) {
        setDefaultBlockColor(blocks);
        blocks[3].setColor(activeColor);
        await delay(delayTime);
        [scene.array[i], scene.array[j]] = [scene.array[j], scene.array[i]];
      }
      
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
      await delay(delayTime);
    }
    for (let k = 0; k <= i; k++) {
      bars[k].setFillStyle(0x27ae60);
    }
    setDefaultBlockColor(blocks);
    blocks[4].setColor(activeColor);
    await delay(delayTime);
  }
  setDefaultBlockColor(blocks);
  blocks[5].setColor(activeColor);
  await delay(delayTime);
}

async function sortArray(scene, delayTime, barWidth, barSpacing, xfactor) {
  const bars = scene.barGroup.getChildren();

  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);;

      bars[i].setFillStyle(0xaa0000);
      if (bars[j]) bars[j].setFillStyle(0xaa0000);
      await delay(delayTime);

      if (scene.array[i] > scene.array[j]) {
        [scene.array[i], scene.array[j]] = [scene.array[j], scene.array[i]];
      }

      createBars(scene, scene.array, scene.barGroup, barWidth, barSpacing, xfactor);
      await delay(delayTime);
    }
    for (let k = 0; k <= i; k++) {
      bars[k].setFillStyle(0x27ae60);
    }
  }
}
