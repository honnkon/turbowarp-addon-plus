// Base url: turbowarp.org

// トップページのリンクを新しいタブで開く
function FooterLinks() {
	let footer_links = document.querySelectorAll("#app > div > footer > div > div.interface_footer-columns_1SUSg a");
	footer_links.forEach((link) => {
		//@ts-ignore
		link.target = "_blank";
	});
}

// アドオンをウィンドウで開く
function AddonInWindow() {
	if(location.pathname.match(/\/addons/)){
		if(!window.opener.location.pathname.match(/\/addons/)) {
			window.open("/addons","", "width=1280,height=800");
			window.close();
		}
	}
}

// Base url: extensions.turbowarp.org

// 拡張機能やサンプルプロジェクト、ドキュメントを新しいタブで開く
function ExtensionInNewTab() {
	let links = document.querySelectorAll("body > div.section.extensions-outer > div.extensions > div.extension a");
	links.forEach((link) => {
		//@ts-ignore
		link.target = "_blank";
	});
}

function Main() {
	if (location.host === "turbowarp.org") {
		FooterLinks();
		AddonInWindow();
	}

	if (location.host === "extensions.turbowarp.org") {
		ExtensionInNewTab();
	}
}

Main();