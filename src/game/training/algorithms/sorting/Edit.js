import { Scene } from "phaser";
import { BubbleSort, QuickSort, MergeSort, HeapSort, RadixSort, SelectionSort, InsertionSort, ShellSort } from "../../PseudoCode";
import createBars from "./CreateBars";
import generateRandomArray from "./utils/GenerateRandomArray";
import randomizeArray from "./utils/RandomizeArray";
import setDefaultBlockColor from "./utils/SetDefaultBlockColor";

import bubbleSort from "./BubbleSort";
import quickSort from "./QuickSort";
import mergeSort from "./MergeSort";
import heapSort from "./HeapSort";
import selectionSort from "./SelectionSort";
import insertionSort from "./InsertionSort";
import shellSort from "./ShellSort";

var input = document.createElement("input");

class Block {
    constructor(scene, x, y, width, height, color, text) {
        this.factor = 10;
        this.scene = scene;
        this.block = scene.add.rectangle(x, y, width, height, color);
        this.label = scene.add.text(x - width / 2 + this.factor, y, text, {
            fontFamily: 'menu_font',
            fontSize: 16,
            color: '#ffffff',
        }).setOrigin(0, 0.5);
    }
    setColor(color) {
        this.block.setFillStyle(color);
    }
}

export class Edit extends Scene {
    constructor() {
        super("Edit");
        this.blocks = [];
        this.array = [];
        this.barGroup = null
        this.isSorting = false;
        this.delayTime = 500;
        input.value = this.delayTime;
    }

    init(data) {
        this.callerScene = data.callerScene;
    }

    preload() {
        this.load.image('inventory-bg', 'assets/inventory_background.png');
    }

    create() {
        console.log(this.callerScene)
        this.add.image(512, 384, "inventory-bg").setAlpha(0.8);
        this.cameras.main.setBackgroundColor(0x330000);

        const title = this.add.text(512, 140, `Algorithm: ${this.callerScene}`, {
            fontFamily: "menu_font",
            fontSize: "30px",
            fill: "#000000",
            fontStyle: "bold",
        });
        title.setOrigin(0.5, 0.5);
        this.createButtons();
        this.showPseudoCode();
        this.showBars();

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.isSorting = false
            this.blocks = [];
            setDefaultBlockColor(this.blocks);
            this.scene.start("SortWindow", { sortAlgorithm: `${this.callerScene}` });
        })
    }

    createButtons() {
        // Create a text input field
        input.type = 'number';
        input.style.label = 'Delay';
        input.style.position = 'absolute';
        input.style.width = '40px';
        input.style.height = '30px';
        input.style.top = '1vh';
        input.style.left = '95vw';
        input.style.align = 'center';
        document.body.appendChild(input);

        // Set up a Phaser text object to display the input value
        var text = this.add.text(50, 180, 'Delay: ' + input.value, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

        // Handle input changes
        input.addEventListener('input', function() {
            // Update the Phaser text object with the input value
            text.setText('Delay: ' + input.value);
            console.log(input.value);
            this.delayTime = parseInt(input.value);
            console.log("Delay"+this.delayTime);
        });

        var buttonContainer = this.add.container(0, 0);
        var buttonData = [
            {
                x: 512,
                y: 680,
                width: 300,
                height: 40,
                color: 0x60462d,
                text: "Back",
            },
            {
                x: 700,
                y: 600,
                width: 100,
                height: 40,
                color: 0x60462d,
                text: "Sort",
            },
            {
                x: 860,
                y: 600,
                width: 150,
                height: 40,
                color: 0x60462d,
                text: "Randomize",
            },
        ];
        buttonData.forEach((data, index) => {
            var button = this.add.rectangle(
                data.x,
                data.y,
                data.width,
                data.height,
                data.color
            );
            var text = this.add.text(data.x, data.y, data.text, {
                fontFamily: "menu_font",
                fontSize: "20px",
                fill: "#ffffff",
            });
            button.setInteractive();
            text.setOrigin(0.5, 0.5);
            buttonContainer.add(button);
            buttonContainer.add(text);

            button.on("pointerover", () => {
                button.fillColor = 0x3c2920;
            });

            button.on("pointerout", () => {
                button.fillColor = data.color;
            });
            button.on("pointerdown", async () => {
                if (index === 0) {
                    // Back
                    this.isSorting = false
                    this.blocks = [];
                    setDefaultBlockColor(this.blocks);
                    this.scene.start("SortWindow", { sortAlgorithm: `${this.callerScene}` });
                } else if (index === 1 && !this.isSorting) {
                    // Sort
                    this.isSorting = true
                    if (this.isSorting) {
                        this.delayTime = parseInt(input.value);
                        switch (this.callerScene) {
                            case 'BubbleSort':
                                this.isSorting = await bubbleSort(this, this.delayTime, 20, 5, 280, this.blocks);
                                break;
                            case 'QuickSort':
                                this.isSorting = await quickSort(this, 20, 5, 280);
                                break;
                            case 'MergeSort':
                                this.isSorting = await mergeSort(this, this.delayTime, 20, 5, 280, this.blocks);
                                break;
                            case 'HeapSort':
                                this.isSorting = await heapSort(this, 20, 5, 280);
                                break;
                            case 'RadixSort':
                                this.isSorting = false;
                                break;
                            case 'SelectionSort':
                                this.isSorting = await selectionSort(this, this.delayTime, 20, 5, 280, this.blocks);
                                break;
                            case 'InsertionSort':
                                this.isSorting = await insertionSort(this, 20, 5, 280);
                                break;
                            case 'ShellSort':
                                this.isSorting = await shellSort(this, 20, 5, 280);
                                break;
                            default:
                                this.isSorting = false;
                                break;
                        }
                    }
                } else if (index === 2 && !this.isSorting) {
                    setDefaultBlockColor(this.blocks)
                    this.array = generateRandomArray(12);
                    createBars(this, this.array, this.barGroup, 20, 5, 280);
                }
            });
        });
    }

    showPseudoCode() {
        let pseudoCode
        switch (this.callerScene) {
            case "BubbleSort":
                pseudoCode = BubbleSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                // this.blocks[2].setColor(0xff0000)
                break;
            case "QuickSort":
                pseudoCode = QuickSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "MergeSort":
                pseudoCode = MergeSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "HeapSort":
                pseudoCode = HeapSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "RadixSort":
                pseudoCode = RadixSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "SelectionSort":
                pseudoCode = SelectionSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "InsertionSort":
                pseudoCode = InsertionSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
            case "ShellSort":
                pseudoCode = ShellSort;
                for (let i = 0; i < Object.keys(pseudoCode).length; i++) {
                    const block = new Block(this, 300, 250 + i * 50, 500, 50, 0x000000, `${pseudoCode[i + 1]}`);
                    this.blocks.push(block);
                }
                break;
        }
    }

    showBars() {
        this.barGroup = this.add.group();
        this.array = generateRandomArray(12);
        createBars(this, this.array, this.barGroup, 20, 5, 280);
    }
}
