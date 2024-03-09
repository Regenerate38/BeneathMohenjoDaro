import { Scene } from "phaser";
import { ButtonData } from "./buttons/data";

import createBars from "./CreateBars"
import generateRandomArray from "./utils/GenerateRandomArray";
import randomizeArray from "./utils/RandomizeArray";

import bubbleSort from "./BubbleSort";
import quickSort from "./QuickSort";
import mergeSort from "./MergeSort";
import heapSort from "./HeapSort";
import selectionSort from "./SelectionSort";
import insertionSort from "./InsertionSort";
import shellSort from "./ShellSort";

var isSorting = false;
var input = document.createElement('input');

export class SortWindow extends Scene {
    constructor() {
        super("SortWindow");
        this.array = [];
        this.barGroup = null;
        this.delayTime = 500;
        input.value = this.delayTime
    }
    
    init(data) {
        this.sortAlgorithm = data.sortAlgorithm;
    }

    preload() {
        this.load.image("Scroll", "assets/tvzor-lazur.png");
    }

    create() {
        this.add.image(512, 384, "background").setAlpha(0.8);
        this.cameras.main.setBackgroundColor(0x330000);
        this.add.image(512, 384, "Scroll").setDisplaySize(900, 600);
        this.array = generateRandomArray(12);

        const title = this.add.text(512, 140, `${this.sortAlgorithm}`, {
            fontFamily: "menu_font",
            fontSize: "30px",
            fill: "#ffffff",
        });
        title.setOrigin(0.5, 0.5);

        this.createButtons();
        
        this.barGroup = this.add.group();
        createBars(this, this.array, this.barGroup);

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            isSorting = false;
            this.scene.start("Sorting");
            document.body.removeChild(input);
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
        var text = this.add.text(50, 50, 'Delay: ' + input.value, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

        // Handle input changes
        input.addEventListener('input', function() {
            // Update the Phaser text object with the input value
            text.setText('Delay: ' + input.value);
            console.log(input.value);
            this.delayTime = parseInt(input.value);
            console.log("Delay"+this.delayTime);
        });


        var buttonContainer = this.add.container(0, 0);
        var buttonData = ButtonData;
        buttonData.forEach((data, index) => {
            var button = this.add.rectangle(
                data.x,
                data.y,
                data.width,
                data.height,
                data.color
            );
            button.setInteractive();

            var buttonText = this.add.text(data.x, data.y, data.text, {
                fontSize: "20px",
                fontFamily: "menu_font",
                fill: "#ffffff",
            });
            buttonText.setOrigin(0.5, 0.5);

            buttonContainer.add([button, buttonText]);

            button.on("pointerover", () => {
                button.fillColor = 0x3c2920;
            });

            button.on("pointerout", () => {
                button.fillColor = data.color;
            });
            button.on("pointerdown", async () => {
                if (index === 0 && !isSorting) {
                    isSorting = true;
                    this.delayTime = parseInt(input.value);
                    if (isSorting){
                        switch (this.sortAlgorithm) {
                            case 'BubbleSort':
                                isSorting = await bubbleSort(this, this.delayTime);
                                break;
                            case 'QuickSort':
                                isSorting = await quickSort(this);
                                break;
                            case 'MergeSort':
                                isSorting = await mergeSort(this, this.delayTime);
                                break;
                            case 'HeapSort':
                                isSorting = await heapSort(this);
                                break;
                            case 'RadixSort':
                                isSorting = false;
                                break;
                            case 'SelectionSort':
                                isSorting = await selectionSort(this, this.delayTime);
                                break;
                            case 'InsertionSort':
                                isSorting = await insertionSort(this, this.delayTime);
                                break;
                            case 'ShellSort':
                                isSorting = await shellSort(this);
                                break;
                            default:
                                isSorting = false;
                                break;
                        }
                    }
                } else if (index === 1 && !isSorting) {
                    this.array = generateRandomArray(12);
                    randomizeArray(this);
                } else if (index === 2 && !isSorting) {
                    document.body.removeChild(input);
                    this.scene.start("Edit", { callerScene: `${this.sortAlgorithm}` });
                }
            });
        });
    }
}