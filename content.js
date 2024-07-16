"use strict";
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
// TODO: プロジェクトページとエディターを移動したときに実行されるようにする
function AddonInWindow() {
    let AddonElement = document.querySelector("#app > div > div > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(4)");
    if (AddonElement != null) {
        AddonElement.addEventListener("click", () => {
            window.open("/addons", "", "width=1280,height=800");
            return false;
        });
    }
    else {
        AddonElement = document.querySelector("#app > div > div.interface_menu_3K-Q2 > div > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(4)");
        if (AddonElement != null) {
            AddonElement.addEventListener("click", () => {
                window.open("/addons", "", "width=1280,height=800");
                return false;
            });
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
        // window.onload = AddonInWindow;
    }
    if (location.host === "extensions.turbowarp.org") {
        ExtensionInNewTab();
    }
}
Main();
