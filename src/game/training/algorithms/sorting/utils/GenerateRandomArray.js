export default function generateRandomArray(size) {
    return Array.from({ length: size }, () => Phaser.Math.Between(10, 100));
}