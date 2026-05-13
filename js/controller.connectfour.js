"use strict";

import { MODEL } from "./model.connectfour.js";
import { init } from "./view.polished.js";


export const CONTROLLER = {
    init() {
        init();
        let field = document.querySelectorAll(".field");
        for (let i = 0; i < field.length; i++) {
            field[i].addEventListener("click", this.getId);
        }
        MODEL.playerChanged();
    },
    getId(e) {
        let id = e.target.id.split("/");
        let col = id[1];
        MODEL.insert(col);
    }
}
CONTROLLER.init();

