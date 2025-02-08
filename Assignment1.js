// const readline = require('readline');

// const RL = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

let m1Garand = {
    maxAmmo: 8,
    currentAmmo: 0,
    chamberLoaded: false,
    safetyOff: false,
    safetyToggle: function () {
        new Audio('click.mp3').play();
        this.safetyOff = !this.safetyOff;
        document.getElementById("safetyButton").style.background = this.safetyOff ? "red" : "green";
        console.log("Safety: ", this.safetyOff);
    },
    fire: async function () {
        try {
            console.log("Safety: ", this.safetyOff);
            if (this.currentAmmo > 0 && this.chamberLoaded && this.safetyOff) {
                console.log("Current Ammo before fire:", this.currentAmmo);
                console.log("Bang!");
                try {
                    new Audio('fire.mp3').play();
                } catch (err) {
                    cnsole.log("Failed to play fire sound: ", err);
                }
                try {
                    new Audio('pullBolt.mp3').play();
                } catch (err) {
                    console.log("Failed to play pullBolt sound: ", err);
                }
                this.currentAmmo--;
                if (this.currentAmmo == 0) {
                    try {
                        new Audio('ping.mp3').play();
                    } catch (err) {
                        console.log("Failed to play ping sound: ", err);
                    }
                    console.log("PING!!!!!");
                    this.chamberLoaded = false;
                }
            } else {
                console.log("Click!");
                try {
                    new Audio('click.mp3').play();
                } catch (err) {
                    console.log("Failed to play click sound: ", err);
                }
            }
        } catch (err) {
            console.log("Error during fire: ", err);
        }
    },
    reload: async function () {
        try {
            switch (this.currentAmmo) {
                case 0:
                    try {
                        new Audio('fullLoad.mp3').play();
                    } catch (err) {
                        console.log("Failed to play fullLoad sound: ", err);
                    }
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log("Reloading...CLICK!!!");
                    this.currentAmmo = 8;
                    this.chamberLoaded = true;
                    break;
                case 8:
                    console.log("M1 Garand is already fully loaded.");
                    break;
                default:
                    console.log("Reloading...");
                    while (this.currentAmmo < this.maxAmmo) {
                        this.chamberLoaded = false;
                        await new Promise(resolve => setTimeout(resolve, 500));
                        try {
                            new Audio('singleLoad.mp3').play();
                        } catch (err) {
                            console.log("Failed to play singleLoad sound: ", err);
                        }
                        this.currentAmmo++;
                        console.log("click...");
                    }
                    this.chamberLoaded = true;
            }
        } catch (err) {
            console.log("Error during reload: ", err);
        }
    },
    pullBolt: async function () {
        try {
            try {
                new Audio('pullBolt.mp3').play();
            } catch (err) {
                console.log("Failed to play pullBolt sound: ", err);
            }
            console.log("Chik-Chik");
            if (this.currentAmmo > 0) {
                if (!this.chamberLoaded) {
                    this.chamberLoaded = true;
                } else {
                    this.currentAmmo--;
                    console.log("Ding!!");
                    if (this.currentAmmo == 0) {
                        try {
                            new Audio('ping.mp3').play();
                        } catch (err) {
                            console.log("Failed to play ping sound: ", err);
                        }
                        console.log("PING!!!!!");
                        this.chamberLoaded = false;
                    }
                }
            }
        } catch (err) {
            console.log("Error during pullBolt: ", err);
        }
    },
    disarm: async function () {
        try {
            if (this.currentAmmo != 0 || this.chamberLoaded) {
                try {
                    new Audio('pullBolt.mp3').play();
                } catch (err) {
                    console.log("Failed to play pullBolt sound: ", err);
                }
                try {
                    new Audio('disarm.mp3').play();
                } catch (err) {
                    console.log("Failed to play disarm sound: ", err);
                }
                console.log("Disarming...Clik-Clak");
                this.currentAmmo = 0;
                this.chamberLoaded = false;
            } else {
                console.log("M1 Garand is already disarmed.");
            }
        } catch (err) {
            console.log("Error during disarm: ", err);
        }
    }
};

// async function getUserInput() {
//     return new Promise((resolve) => {
//         RL.question("Enter command (r: reload, f: fire, p: pullBolt, d: disarm, exit: exit): ", (command) => {
//             resolve(command);
//         });
//     });
// }

// function getUserInput() {
    
// }
// function m1GarandSim() {
//     console.log("M1 Garand Simulator");
//     console.log("Instructions:\n- Enter 'r' to reload\n- Enter 'f' to fire\n- Enter 'p' to pull the bolt\n- Enter 'd' to disarm\n- Enter 'exit' to exit.\n");

//     let command;
//     while (true) {
//         try {
//             command = getUserInput();
//             switch (command.toLowerCase()) {
//                 case 'r':
//                     m1Garand.reload();
//                     break;
//                 case 'f':
//                     m1Garand.fire();
//                     break;
//                 case 'p':
//                     m1Garand.pullBolt();
//                     break;
//                 case 'd':
//                     m1Garand.disarm();
//                     break;
//                 case 'exit':
//                     RL.close();
//                     process.exit();
//                 default:
//                     throw "Invalid command. Please enter a valid command.";
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }

