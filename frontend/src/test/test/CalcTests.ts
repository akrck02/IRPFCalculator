import Test from "../classes/Test.js";
import TestSuite from "../classes/TestSuite.js";


export default class CalcTests extends TestSuite {
    tests = [
        new Test(async function exportTasksTest(){
           

            for (let i = 0; i < 100; i++) {
                console.log("test")
            }

           
        })
    ]



    async runAll(){
        return await super.runAll(this.constructor.name)
    }
}