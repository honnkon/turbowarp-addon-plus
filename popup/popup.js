"use strict";
// 仮想DOMを制御するクラス
class VDOM {
    constructor(nodeTag, attributes, children) {
        this.nodeTag = "";
        this.attributes = {};
        this.children = "";
        this.nodeTag = nodeTag;
        this.attributes = attributes;
        this.children = children;
    }
    render() {
        const node = document.createElement(this.nodeTag);
        for (let key in this.attributes) {
            node.setAttribute(key, this.attributes[key]);
        }
        if (typeof this.children === "string") {
            node.textContent = this.children;
        }
        else {
            node.appendChild(this.children.render());
        }
        return node;
    }
}
function h(text, children = "") {
    const tag = text.match(/<(\w+)( ?[^>]*)*>(.*?)<\/\1>/);
    if (tag) {
        const nodeTag = tag[1];
        const attributes = {};
        if (tag[2] != undefined) {
            tag[2].split(" ").forEach((item) => {
                if (item !== "") {
                    // @ts-ignore
                    attributes[item.split("=")[0]] = (item.split("=")[1].slice(1, -1));
                }
            });
        }
        if (children == "") {
            children = tag[3];
        }
        return new VDOM(nodeTag, attributes, children);
    }
    else {
        throw new SyntaxError("Invalid DOM");
    }
}
const main = document.querySelector("#container");
if (main !== null) {
    main.innerHTML = "";
    let toggle = h('<div class="toggle"></div>', h('<div class="toggle-off"></div>')).render();
    main.appendChild(toggle);
    toggle.addEventListener("click", () => {
        // @ts-ignore
        toggle.firstChild.className = toggle.firstChild.className == "toggle-off" ? "toggle-on" : "toggle-off";
    });
}
