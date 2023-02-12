import { AssertionError } from "assert";

export default class Assertion {
    
    static fail(message : string) {
        throw new AssertionError({
            message : message
        });
    }

    static assert(condition : boolean, message : string = "assertion failed") {
        if(!condition)
            this.fail(message);
    }
    
    static assertFalse(condition : boolean, message : string) {
        if(condition)
            this.fail(message);
    }

    static equal(a : any, b : any, message : string) {
        if(a !== b)
            this.fail(message);
    }

    static notEqual(a : any, b : any, message : string) {
        if(a === b)
            this.fail(message);
    }
    
    static assertSize(size : number, collection : any[], message : string) {
        if(collection.length !== size)
            this.fail(message);
    }
}