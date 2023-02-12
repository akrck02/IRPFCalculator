export default class Logger {

    static BUFFER = [];


    static log(...data : any) {
        Logger.BUFFER.push("   " + data.join(","));
        console.info("   ",data.join(","));
    }

    static success(...data : any) {
        Logger.BUFFER.push(" ✅ " + data.join(","));
        console.info(" ✅", data.join(","));
    }

    static warning(...data : any) {
        Logger.BUFFER.push(" 🔶 " + data.join(","));
        console.warn(" 🔶", data.join(","));
    }

    static error(...data : any) {
        Logger.BUFFER.push(" ❌ " + data.join(","));
        console.error(" ❌", data.join(","));
    }

    static jump() {
        Logger.BUFFER.push("");
        console.info("");
    }

    static rawlog(...data : any) {
        Logger.BUFFER.push(data.join(" "));
        console.info(data.join(" "));
    }

    static hardTitle(title : string) {
        Logger.jump();
        Logger.line("#");

        Logger.BUFFER.push("  " + title.toUpperCase() + " ");
        console.info("  " + title.toUpperCase() + " ");
        Logger.line("#");
    }

    static softTitle(title : string) {
        Logger.jump();
        Logger.line();

        Logger.BUFFER.push("  " + title);
        console.info("  " + title);
        Logger.line();
    }

    static line(char : string = "-"){
        let line = char;
        Logger.BUFFER.push(line.repeat(42));
        console.info(line.repeat(42));
    }
}