import Logger from "../lib/Logger.js";
import Test from "./Test.js";

export default abstract class TestSuite {

    protected tests : Test[];
    constructor(){this.tests = []}

    async runAll(name: string) : Promise<boolean> {

        const start = new Date().getTime();

        Logger.hardTitle("🧪 Running test suite " + name + " 🧪");

        for(let i = 0; i < this.tests.length; i++) {
            
            const testResult = await (this.tests[i].run());

            if(!testResult) {
                Logger.softTitle("🟡 Tests terminated with a failure 🟡");
                return false;
            }
        }

        const end = new Date().getTime();

        Logger.softTitle("🟢 All tests passed successfully 🟢");
        Logger.rawlog("Test suite ran in " + (end-start) + "ms.\n");
        return true;        
    }

    public getTests() : Test[] {
        return this.tests;
    }
} 