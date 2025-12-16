import { db } from "../firebase/firebaseConfig.js";
import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
    setDoc
} from "firebase/firestore";

import Phaser from "phaser";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const BLOCK_CATALOG = [

    { type: "steve", price: 1 },

    { type: "grass", price: 1 },
    { type: "dirt", price: 1 },
    { type: "flower", price: 1 },

    { type: "torch", price: 2 },
    { type: "sand", price: 2 },

    { type: "oak_planks", price: 3 },
    { type: "half_wood", price: 3 },
    { type: "leaves", price: 3 },

    { type: "mushroom", price: 4 },
    { type: "red_mushroom", price: 4 },
    { type: "oak_wood", price: 4 },

    { type: "stone", price: 5 },
    { type: "cactus", price: 5 },
    { type: "stone1", price: 5 },

    { type: "glass", price: 6 },
    { type: "pink_wool", price: 6 },

    { type: "triangle_wood", price: 7 },
    { type: "triangle_wood2", price: 7 },

    { type: "ice", price: 8 },

    { type: "pumpkin", price: 9 },

    { type: "wood_trapdoor", price: 10 },

    { type: "bricks", price: 10 },
    { type: "lantern", price: 11 },

    { type: "magma", price: 12 },

    { type: "iron_trapdoor", price: 15 },
    { type: "books", price: 15 },

    { type: "crafting_table", price: 20 },
    { type: "TNT", price: 20 },

    { type: "cake", price: 25 },
    { type: "chest", price: 25 },

    { type: "stove", price: 30 },

    { type: "shit", price: 40 },
    { type: "shit1", price: 40 },
    { type: "shit3", price: 40 },

    { type: "obsidian", price: 50 },

    { type: "iron_block", price: 80 },

    { type: "bedrock", price: 100 },
    { type: "gold_block", price: 100 },

    { type: "diamond_block", price: 150 },

    { type: "emerald_block", price: 200 },

    { type: "command_block", price: 500 }


];


export default class SignUpScene extends Phaser.Scene {
    constructor() {
        super("SignUpScene");
    }
    preload() { }

    create() {
        const WIDTH = this.scale.width;
        const HEIGHT = this.scale.height;
        this.background = this.add.rectangle(-1, 0, this.scale.width, this.scale.height, "0xA9AAA9").setOrigin(0);

        // Sign Up form
        const signupForm = this.add.dom(WIDTH / 2, HEIGHT / 2).createFromHTML(`
            <div style="
                background: #ffffff;
                width: 420px;
                height: 450px;
                border-radius: 12px;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                display: flex;
                flex-direction: column;
                padding: 20px;">
                <h1 style="
                    font-family: Arial, sans-serif; 
                    font-size: 32px;
                    color: #333333;
                    margin-bottom: 20px;
                    text-align: center;
                    ">Sign Up</h1>
                
                <h2 style="font-family:Arial,sans-sefif; font-size:16px; margin-top:40px; margin-left:15px;">Enter your email</h2>
                <input type="text" id="email" name="email" placeholder="Enter email" style="
                    width: 90%;
                    padding: 12px 20px;
                    margin-top: 5px;
                    margin-left: 15px;
                    box-sizing: border-box;
                    border: 2px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    display: block;
                " />
                
                <h2 style="font-family:Arial,sans-sefif; font-size:16px; margin-top:30px; margin-left:15px;">Create new password</h2>
                <input type="text" id="password" name="password" placeholder="Enter password" style="
                    width: 90%;
                    padding: 12px 20px;
                    margin-top: 5px;
                    margin-left: 15px;
                    box-sizing: border-box;
                    border: 2px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    display: block;
                " />

                <button id="signupButton" style="
                    margin-top: 50px;
                    width: 50%;
                    padding: 12px;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: #4796FD;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 18px;
                    cursor: pointer;
                ">Sign Up</button>

            </div>
        `)

        // Add events to buttons
        const signupButton = signupForm.getChildByID('signupButton');
        signupButton.addEventListener('click', () => {
            const emailInput = signupForm.getChildByID('email');
            const passwordInput = signupForm.getChildByID('password');
            const email = emailInput.value;
            const password = passwordInput.value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.createUserData(user.uid, user.email);
                    console.log("Account created successfully");
                    this.scene.start("LoginScene");
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        });


    }

    async createUserData(uid, email) {
        console.log("Creating user data for:", uid);
        const initialInventory = BLOCK_CATALOG.map(block => ({ type: block.type, count: 0, price: block.price }));

        await setDoc(doc(db, "users", uid), {
            email,
            money: 0,
            inventory: initialInventory,
            maps: {
                default: []
            }
        });

        console.log("User data created for:", uid);
    }

    update() {

    }
}