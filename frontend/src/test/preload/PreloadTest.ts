import PreloadScript from "../classes/PreloadScript.js";

export default class PreloadTest extends PreloadScript {
    async execute() :  Promise<any> {
        console.log("PreloadTest executed");
        return 0;
    }
}