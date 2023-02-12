import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import Logger from "../../test/lib/Logger.js";
import { startTests } from "../../test/test/TestRunner.js";

export default class TestView extends ViewUI {

    private static ID = "home";

    public constructor(){
        super({
            type: "view",
            id: TestView.ID,
            classes: ["box-row","box-x-start","box-y-center"],
            styles: {
                background : "#222",
            }
        });
    }

    /**
     * Show the view
     * @param params The parameters of the view 
     * @param container The container of the view
     */
    public async show(params : string[], container : UIComponent): Promise<void> {
    
        await startTests(undefined);

        const logContainer = new UIComponent({
            type: "div",
            id: "log-container",
            classes: ["box-column","box-x-start","box-y-start"],
            styles: {
                width: "100vw",
                height: "100vh",
                padding : "1rem",
                overflow: "auto",
                fontSize: "1rem",
                color: "white",
                overflowY: "auto",
            }
        });

        let i = 0;

        Logger.BUFFER.forEach(log => {

            const logLineNumber = new UIComponent({
                type: "div",
                text:  i + "",
                classes: ["box-row","box-x-start","box-y-center"],
                styles: {
                    width: "5rem",
                    height: "auto",
                }
            });

            const logLine = new UIComponent({
                type: "div",
                text: logLineNumber.toHTML() + log + "<br>",
                classes: ["box-row","box-x-start","box-y-center"],
                styles: {
                    width: "100%",
                    height: "auto",
                    padding : ".25rem 0 ",   
                }
            });

            logContainer.appendChild(logLine);
            i++;
        });
        
        logContainer.appendTo(this.element);
        this.appendTo(container);
    }
}