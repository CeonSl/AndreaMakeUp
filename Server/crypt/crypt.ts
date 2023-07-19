// -----------------NO FUNCIONA TODAVÍA
// const bcrypt = require("bcryptjs");
// const rondasDeSal = 10;

// export const hash = (Secretword: string) => bcrypt.hash(Secretword, rondasDeSal, (err: any, EncryptedSecretWord: string) => {
//     if (err) {
//         console.log("Error hasheando:", err);
//     } else {
//         console.log("Y hasheada es: " + EncryptedSecretWord);
//     }
// });

// export const compare = (Secretword: string, passwordByUser: string) => {
//     bcrypt.compare(passwordByUser, Secretword, (err: any, coinciden: boolean) => {
//         if (err) {
//             console.log("Error comprobando:", err);
//         } else {
//             console.log("¿La contraseña coincide?: " + coinciden);
//         }
//     });
// }

export {}