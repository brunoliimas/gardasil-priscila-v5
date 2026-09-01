(function (window, $) {
    "use strict";

    var popupMarkup = "\u003cimg id=\"POP_PRISCILA_BG\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_BG.png\" alt=\"\" />\u003cimg id=\"POP_PRISCILA_BTN_CLS\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_BTN_CLS.png\" alt=\"\" />\u003cimg id=\"POP_PRISCILA_TT\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_TT.png\" alt=\"\" />\u003cimg id=\"POP_PRISCILA_TXT\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_TXT.png\" alt=\"\" />\u003cimg id=\"POP_PRISCILA_MENTION\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_MENTION.png\" alt=\"\" />\u003cimg id=\"POP_PRISCILA_LEG\" class=\"va-shared-popup-item\" src=\"../shared/popups/images/POP_PRISCILA_LEG.png\" alt=\"\" />";
    var popupConfigs = [{"id":"POP_PRISCILA","openSelectors":["#AN_BTN_POP_PRISCILA","#ST_BTN_POP_PRISCILA","#BTN_POP_PRISCILA","#AN_BTN_PRISCILA","#ST_BTN_PRISCILA","#BTN_PRISCILA"],"closeSelectors":["#POP_PRISCILA_BTN_CLS","#POP_PRISCILA_CLS","#POP_PRISCILA_ICON_CLS","#POP_PRISCILA_BG"],"children":[{"id":"POP_PRISCILA_BG","effect":"default","duration":0.3,"delay":null},{"id":"POP_PRISCILA_BTN_CLS","effect":"scale","duration":0.3,"delay":null},{"id":"POP_PRISCILA_TT","effect":"fade-left","duration":0.3,"delay":null},{"id":"POP_PRISCILA_TXT","effect":"fade-left","duration":0.3,"delay":null},{"id":"POP_PRISCILA_MENTION","effect":"fade-left","duration":0.3,"delay":null},{"id":"POP_PRISCILA_LEG","effect":"fade-left","duration":0.3,"delay":null}]}];

    function buildPopupFromVars(child) {
        var vars = {
            duration: child.duration,
            display: "none",
            opacity: 0
        };
        if (child.effect === "fade-left") vars.left = "-=30";
        if (child.effect === "fade-right") vars.left = "+=30";
        if (child.effect === "fade-up") vars.top = "+=30";
        if (child.effect === "fade-down") vars.top = "-=30";
        if (child.effect === "scale") vars.scale = 0.8;
        return vars;
    }

    window.initPopups = function () {
        var $host = $("#shared-popups");
        if (!$host.length) return;
        if (!$host.attr("data-shared-popups-ready")) {
            $host.html(popupMarkup).attr("data-shared-popups-ready", "true");
        }
        window.vaPopups = window.vaPopups || {};
        if (!window.gsap) return;

        popupConfigs.forEach(function (pop) {
            var ids = pop.children.map(function (child) { return "#" + child.id; });
            // Estado final visível (CSS começa em display:none).
            if (ids.length) gsap.set(ids.join(", "), { display: "block", opacity: 1 });
            var tl = gsap.timeline({ paused: true });
            pop.children.forEach(function (child, index) {
                var position = index === 0 ? 0 : "-=.2";
                if (child.delay != null) position = "+=" + child.delay;
                tl.from("#" + child.id, buildPopupFromVars(child), position);
            });
            window.vaPopups[pop.id] = tl;

            if (pop.openSelectors && pop.openSelectors.length) {
                $(pop.openSelectors.join(", ")).not("[aria-disabled='true']").on("touchstart click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    tl.timeScale(1).play();
                });
            }
            if (pop.closeSelectors && pop.closeSelectors.length) {
                $(pop.closeSelectors.join(", ")).on("touchstart click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    tl.timeScale(2).reverse();
                });
            }
        });
    };
}(window, window.jQuery));
