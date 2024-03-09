export default function setDefaultBlockColor (blocks) {
    console.log(blocks)
    blocks.forEach(block => {
        block.setColor(0x000000)
    })
}