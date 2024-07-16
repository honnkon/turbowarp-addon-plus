/** @jsx h */
let main = document.querySelector("#container");
function h(nodeName, attributes) {
    let args = [];
    for (let _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    let children = args.length ? [].concat.apply([], args) : null;
    return { nodeName: nodeName, attributes: attributes, children: children };
}
function render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split)
        return document.createTextNode(vnode);
    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);
    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach(function (k) { return n.setAttribute(k, a[k]); });
    // render (build) and then append child nodes:
    (vnode.children || []).forEach(function (c) { return n.appendChild(render(c)); });
    return n;
}
if (main != null) {
    main.innerHTML = "";
    main.appendChild(render(<p>Text</p>));
}
