import PreloadScript from "../classes/PreloadScript.js";
import Test from "../classes/Test.js";
import { TestState } from "../classes/TestState.js";
import TestSuite from "../classes/TestSuite.js";
import Logger from "../lib/Logger.js";
import PreloadTest from "../preload/PreloadTest.js";
import CalcTests from "./CalcTests.js";

console.log = Logger.log;

const TEST_SUITES : any[] = [
   CalcTests
];

export async function startTests(selectedSuite : string){

    /**
     * Execute preload scripts
     */
    const PRELOAD_SCRIPTS = [
        PreloadTest
    ];


    Logger.hardTitle("Executing preload scripts")
    for (let i = 0; i < PRELOAD_SCRIPTS.length; i++) {
        const script = new PRELOAD_SCRIPTS[i]();
        Logger.softTitle(script.constructor.name);
        await script.execute();
    }

    /**
     * Start test session
     */
    const start = new Date().getTime();
    const RUNNED_SUITES : TestSuite[] = [];
    let result : boolean  = true; 

    for (let i = 0; i < TEST_SUITES.length; i++) {
        const suiteType = TEST_SUITES[i];
        const suite = new suiteType();
        RUNNED_SUITES.push(suite);

        if(!selectedSuite && result) {
            result = await suite.runAll();
        }

        if(selectedSuite && (selectedSuite.toLowerCase() === suite.constructor.name.toLowerCase())) {
            result = await suite.runAll();
        }

    }

    const end = new Date().getTime();


    Logger.hardTitle("TEST RESULTS")
    RUNNED_SUITES.forEach(suite => {
        Logger.jump();
        Logger.rawlog(suite.constructor.name.toUpperCase());
        Logger.line();
        Logger.jump();

        suite.getTests().forEach((test : Test) =>{
            if(test.getState() == TestState.PENDING){
                test.setState(TestState.SKIPPED);
            }

            switch (test.getState()) {
                case TestState.ERROR:
                    Logger.error(test.getName() + " : " + test.getStateName());
                    break;
                case TestState.FAILED:
                    Logger.warning(test.getName() + " : " + test.getStateName());
                    break;

                case TestState.PASSED:
                    Logger.success(test.getName() + " : " + test.getStateName());
                    break;
                default:
                    Logger.log(test.getName() + " : " + test.getStateName())
                    break;
            }

          
        })
    })
    
    Logger.jump();
    Logger.line();
    Logger.log("TOTAL TIME: " + (end-start) + "ms.\n");


    RUNNED_SUITES.forEach(suite => {
        suite.getTests().forEach((test : Test) =>{
            if(test.getState() == TestState.FAILED || test.getState() == TestState.ERROR){
                console.error("Test failed");
                return;
            }
        })
    })
}
