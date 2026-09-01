(function (window, $) {
    "use strict";

    var menuTimeline = null;
    var menuMarkup = "\u003cimg id=\"MN_BG\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BG.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BG.png\" />\u003cimg id=\"MN_TT\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_TT.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_TT.png\" />\u003cimg id=\"MN_BTN_CLS\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_CLS.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_CLS.png\" />\u003cimg id=\"MN_BTN_HOME\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_HOME.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_HOME.png\" data-link-veeva=\"Gardasil_BR_pt_ParaElaTambem_Priscila_V5_Slide-01\" />\u003cimg id=\"MN_BTN_REF\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_REF.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_REF.png\" data-link-veeva=\"Gardasil_BR_pt_ParaElaTambem_Priscila_V5_Slide-16\" />\u003cimg id=\"MN_LEG\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_LEG.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_LEG.png\" />\u003cimg id=\"MN_TAG\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_TAG.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_TAG.png\" />\u003cimg id=\"MN_IMG\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_IMG.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_IMG.png\" />\u003cimg id=\"MN_BTN_ADRIANA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_ADRIANA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_ADRIANA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_POP_ADRIANA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_POP_ADRIANA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_POP_ADRIANA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_PRISCILA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_PRISCILA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_PRISCILA.png\" data-link-veeva=\"Gardasil_BR_pt_ParaElaTambem_Priscila_V5_Slide-02\" />\u003cimg id=\"MN_BTN_POP_PRISCILA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_POP_PRISCILA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_POP_PRISCILA.png\" data-open-popup=\"POP_PRISCILA\" />\u003cimg id=\"MN_BTN_MARINA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_MARINA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_MARINA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_POP_MARINA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_POP_MARINA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_POP_MARINA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_ESTELA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_ESTELA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_ESTELA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_POP_ESTELA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_POP_ESTELA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_POP_ESTELA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_FERNANDA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_FERNANDA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_FERNANDA.png\" aria-disabled=\"true\" />\u003cimg id=\"MN_BTN_POP_FERNANDA\" class=\"va-shared-menu-item\" src=\"../shared/menu/images/MN_BTN_POP_FERNANDA.png\" alt=\"\" data-default-src=\"../shared/menu/images/MN_BTN_POP_FERNANDA.png\" aria-disabled=\"true\" />";
    var disabledIds = ["MN_BTN_ADRIANA","MN_BTN_POP_ADRIANA","MN_BTN_MARINA","MN_BTN_POP_MARINA","MN_BTN_ESTELA","MN_BTN_POP_ESTELA","MN_BTN_FERNANDA","MN_BTN_POP_FERNANDA"];
    var closeSelectors = "#MN_BG, #MN_BTN_CLS";

    function currentSlideName() {
        var path = window.location.pathname.split("/").filter(Boolean);
        var folder = path.length > 1 ? path[path.length - 2] : "";
        return document.title || folder || "";
    }

    function markState() {
        var current = currentSlideName().replace(/\.zip$/i, "");
        $("#menu .va-shared-menu-item").each(function () {
            var $el = $(this);
            var defaultSrc = $el.attr("data-default-src") || $el.attr("src");
            var activeSrc = $el.attr("data-active-src");
            var disabledSrc = $el.attr("data-disabled-src");
            var target = String($el.attr("data-link-veeva") || "").replace(/\.zip$/i, "");
            var isActive = !!(target && (current === target || current.endsWith(target)));
            var isDisabled = disabledIds.indexOf(this.id) >= 0;

            $el.toggleClass("is-active", isActive);
            $el.toggleClass("is-disabled", isDisabled);
            if (isActive) $el.attr("aria-current", "page");
            else $el.removeAttr("aria-current");
            if (isDisabled) $el.attr("aria-disabled", "true");
            else $el.removeAttr("aria-disabled");

            if (isDisabled && disabledSrc) $el.attr("src", disabledSrc);
            else if (isActive && activeSrc) $el.attr("src", activeSrc);
            else $el.attr("src", defaultSrc);
        });
    }

    function bindExternalUrls() {
        $("#menu").off("touchstart.vaMenuUrl click.vaMenuUrl", "[data-url]")
            .on("click.vaMenuUrl", "[data-url]", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var url = $(this).attr("data-url");
            if (url) window.open(url, "_blank");
        });
    }

    window.initMenu = function () {
        var $menu = $("#menu");
        if (!$menu.length) return;
        if (!$menu.attr("data-shared-menu-ready")) {
            $menu.html(menuMarkup).attr("data-shared-menu-ready", "true");
        }

        markState();
        bindExternalUrls();

        var $items = $menu.find(".va-shared-menu-item");
        if (window.gsap) {
            if (menuTimeline) menuTimeline.kill();
            // Estado final visível (CSS do menu começa em display:none).
            gsap.set($items, { display: "block", opacity: 1, scale: 1 });
            menuTimeline = gsap.timeline({
                paused: true,
                onReverseComplete: function () {
                    gsap.set($items, { display: "none", clearProps: "transform" });
                    $menu.css("pointer-events", "none");
                }
            });
            // Padrão fluido (TimelineMax legado): chain + overlap -=.25 + scale:0 nos BTN
            menuTimeline
            .from("#MN_BG", { duration: 0.3, display: "none", opacity: 0 })
            .from("#MN_TT", { duration: 0.3, display: "none", opacity: 0, top: "-=30" }, "-=.25")
            .from("#MN_BTN_CLS", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_HOME", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_REF", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_LEG", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_TAG", { duration: 0.3, display: "none", opacity: 0, top: "-=30" }, "-=.25")
            .from("#MN_IMG", { duration: 0.3, display: "none", opacity: 0, top: "-=30" }, "-=.25")
            .from("#MN_BTN_ADRIANA", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_BTN_POP_ADRIANA", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_PRISCILA", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_BTN_POP_PRISCILA", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_MARINA", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_BTN_POP_MARINA", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_ESTELA", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_BTN_POP_ESTELA", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25")
            .from("#MN_BTN_FERNANDA", { duration: 0.3, display: "none", opacity: 0, left: "-=30" }, "-=.25")
            .from("#MN_BTN_POP_FERNANDA", { duration: 0.3, display: "none", opacity: 0, scale: 0 }, "-=.25");
            window.vaMenuTimeline = menuTimeline;
        } else {
            $items.hide();
        }

        $("#BTN_MN, #BTN_MENU, #ST_BTN_MN, #ST_BTN_MENU, #AN_BTN_MN")
            .off("click.vaMenuOpen")
            .on("click.vaMenuOpen", function (event) {
                event.preventDefault();
                event.stopPropagation();
                $menu.css("pointer-events", "auto");
                if (menuTimeline) {
                    menuTimeline.timeScale(1).play(0);
                } else {
                    $items.show();
                }
            });

        $menu.off("click.vaMenuPopup", "[data-open-popup]")
            .on("click.vaMenuPopup", "[data-open-popup]", function (event) {
                event.preventDefault();
                event.stopPropagation();
                var popId = $(this).attr("data-open-popup");
                if (menuTimeline) menuTimeline.timeScale(2).reverse();
                else {
                    $items.hide();
                    $menu.css("pointer-events", "none");
                }
                var map = window.vaPopups || {};
                if (popId && map[popId]) {
                    map[popId].timeScale(1).play();
                }
            });

        if (closeSelectors) {
            $menu.off("click.vaMenuClose", closeSelectors)
                .on("click.vaMenuClose", closeSelectors, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (menuTimeline) menuTimeline.timeScale(2).reverse();
                    else {
                        $items.hide();
                        $menu.css("pointer-events", "none");
                    }
                });
        }
    };
}(window, window.jQuery));
