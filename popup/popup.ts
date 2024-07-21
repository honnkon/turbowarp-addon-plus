declare const chrome: any;

// 仮想DOMを制御するクラス
class VDOM {
	nodeTag: string = "";
	attributes: any = {}
	children: VDOM | string = "";

	constructor(nodeTag: string, attributes: any, children: VDOM | string) {
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
		} else {
			node.appendChild(this.children.render());
		}
		return node;
	}
}

function h(text: string, children: VDOM | string = ""): VDOM {
	const tag = text.match(/<(\w+)( ?[^>]*)*>(.*?)<\/\1>/);
	if (tag) {
		const nodeTag = tag[1];

		const attributes = {};
		if (tag[2] != undefined) {
			tag[2].split(" ").forEach((item) => {
				if (item !== "") {
					// @ts-ignore
					attributes[item.split("=")[0]] = (item.split("=")[1].slice(1, -1))
				}
			})
		}
		if (children == "") {
			children = tag[3];
		}
		return new VDOM(nodeTag, attributes, children);
	} else {
		throw new SyntaxError("Invalid DOM");
	}
}

function toggleBoxCreate(toggleItem: string,titleText:string="", explain: string = "") {
	let toggle: HTMLElement;
	let title: HTMLElement;
	let explaining: HTMLElement;
	let container: HTMLElement;
	if (settings?.[toggleItem] == undefined) {
		// @ts-ignore
		settings[toggleItem] = false;
	}
	toggle = h(`<div class="toggle"></div>`, h(`<div class="toggle-${settings[toggleItem] ? 'on' : 'off'}"></div>`)).render();
	title = h(`<div class="title"></div>`,titleText).render();
	explaining = h(`<div class="explaining"></div>`, explain).render();
	container = h(`<div class="content"></div>`).render();
	container.appendChild(toggle);
	container.appendChild(title);
	container.appendChild(explaining);
	// @ts-ignore
	main.appendChild(container);

	toggle.addEventListener("click", () => {
		// @ts-ignore
		const toggleIf: boolean = toggle.firstChild.className == "toggle-on";
		// @ts-ignore
		toggle.firstChild.className = toggleIf ? "toggle-off" : "toggle-on";
		settings[toggleItem] = !toggleIf;
		// @ts-ignore
		chrome.storage.sync.set(settings);
	})
}

async function Main() {
	await chrome.storage.sync.get(null).then((data: any) => {
		settings = data;
	});
	toggleBoxCreate("footerLinks","フッターを新しいタブで開く","turbowarpページのフッターを新しいタブで開くようにする。");
	toggleBoxCreate("addonInWindow","アドオン ウィンドウ","turbowarp addonページをウィンドウで開くようにする。");
	toggleBoxCreate("extensionInNewTab","拡張機能を新しいタブで開く","turbowarp extensionページの拡張機能を新しいタブで開くようにする。");
}

const main = document.querySelector("#container");
let settings: any;
if (main !== null) {
	main.innerHTML = "";
	Main();
}