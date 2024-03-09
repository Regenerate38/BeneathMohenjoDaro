import createBars from "../CreateBars";
import generateRandomArray from "./GenerateRandomArray";

export default function randomizeArray(scene) {
    scene.array = generateRandomArray(12);
    createBars(scene, scene.array, scene.barGroup);
}