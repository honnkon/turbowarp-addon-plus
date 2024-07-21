"use strict";
// Base url: turbowarp.org
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    if (location.pathname.match(/\/addons/)) {
        if (!window.opener.location.pathname.match(/\/addons/)) {
            window.open("/addons", "", "width=1280,height=800");
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
function Loaded() {
    return __awaiter(this, void 0, void 0, function* () {
        let settings;
        yield chrome.storage.sync.get(null).then((data) => {
            settings = data;
        });
        if (location.host === "turbowarp.org") {
            if (settings.footerLinks)
                FooterLinks();
            else
                settings.footerLinks = false;
            if (settings.addonInWindow)
                AddonInWindow();
            else
                settings.addonInWindow = false;
        }
        if (location.host === "extensions.turbowarp.org") {
            if (settings.ExtensionInNewTab)
                ExtensionInNewTab();
            else
                settings.extensionInNewTab = false;
        }
    });
}
Loaded();
