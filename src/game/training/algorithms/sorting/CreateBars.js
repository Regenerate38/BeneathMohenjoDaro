export default function createBars(scene, array, barGroup, barWidth=40, barSpacing=10, xfactor=25) {
    const startX =
        (scene.sys.game.config.width -
            (barWidth + barSpacing) * array.length) /
        2 + xfactor;
    let _fontSize
    if (barWidth > 30) {
        _fontSize = 16
    } else {
        _fontSize = 0
    }
  
    // const maxHeight = Math.max(...array);
    // const startY = scene.sys.game.config.height - maxHeight;
  
    barGroup.clear(true, true); // Clear existing bars
  
    array.forEach((value, index) => {
        const rect = scene.add.rectangle(
            startX + (barWidth + barSpacing) * index,
            535,
            barWidth,
            value * 3,
            0x3498db
        );
        rect.setOrigin(0.5, 1);
        barGroup.add(rect);
  
        const text = scene.add.text(rect.x, rect.y, value.toString(), {
            fontSize: `${_fontSize}px`,
            fill: "#ffffff",
        });
        text.setOrigin(0.5, 1);
        rect.setData("index", index);
        rect.setData("value", value);
    });
}
  