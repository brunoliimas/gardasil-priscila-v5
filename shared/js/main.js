$(function () {
	const SLIDE_PREFIX = "Gardasil_BR_pt_ParaElaTambem_Priscila_V5_Slide-";
	const TOTAL_SLIDES = 16;
	const STAGE_W = 1024;
	const STAGE_H = 768;
	const urlParams = new URLSearchParams(window.location.search);

	function isVeevaEnvironment() {
		const host = window.location.hostname;
		if (
			host.endsWith("github.io") ||
			host === "localhost" ||
			host === "127.0.0.1" ||
			host === ""
		) {
			return false;
		}
		try {
			return !!(window.webkit && window.webkit.messageHandlers);
		} catch (e) {
			return false;
		}
	}

	// Browser mode: query string, GitHub Pages / localhost, ou fora do app Veeva
	let browserMode =
		urlParams.get("browserMode") === "true" ||
		(urlParams.get("browserMode") !== "false" && !isVeevaEnvironment());
	console.log("Browser Mode:", browserMode);

	let navigating = false;

	function getCurrentSlideNum() {
		const match = window.location.pathname.match(/Slide-(\d+)/i);
		return match ? parseInt(match[1], 10) : 1;
	}

	function padSlide(num) {
		return String(num).padStart(2, "0");
	}

	function goToSlide(num) {
		if (navigating) return;
		if (num < 1 || num > TOTAL_SLIDES) return;
		navigating = true;
		const folder = SLIDE_PREFIX + padSlide(num);
		window.location.href = "../" + folder + "/index.html?browserMode=true";
	}

	function nextSlideBrowser() {
		goToSlide(getCurrentSlideNum() + 1);
	}

	function prevSlideBrowser() {
		goToSlide(getCurrentSlideNum() - 1);
	}

	function overlayBlocksSwipe() {
		if ($("#menu").css("pointer-events") === "auto") return true;
		const popups = window.vaPopups || {};
		return Object.keys(popups).some(function (id) {
			const tl = popups[id];
			if (!tl || typeof tl.progress !== "function") return false;
			return tl.progress() > 0;
		});
	}

	function isInteractiveTarget(el) {
		return $(el).closest(
			"[data-link-veeva], [data-open-popup], [data-url], [id*='BTN'], #ST_SLIDE_BTN_NEXT, #ST_SLIDE_BTN_PREV, #ST_BTN_MENU, #ST_BTN_MN, #BTN_MENU, #menu, #shared-popups, #popups, .scroll"
		).length > 0;
	}

	function fitStage() {
		const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
		const left = (window.innerWidth - STAGE_W * scale) / 2;
		const top = (window.innerHeight - STAGE_H * scale) / 2;
		$("#main").css({
			transform: "scale(" + scale + ")",
			transformOrigin: "top left",
			left: left + "px",
			top: top + "px",
		});
	}

	function linkVeeva(el) {
		const link = el.data("link-veeva");
		if (!link) return;

		if (browserMode) {
			if (navigating) return;
			navigating = true;
			window.location.href = "../" + link + "/index.html?browserMode=true";
		} else {
			com.veeva.clm.gotoSlide(link + ".zip", "");
		}
	}

	$("#ST_SLIDE_BTN_NEXT").on("click touchstart", function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (browserMode) {
			nextSlideBrowser();
		} else {
			com.veeva.clm.nextSlide();
		}
	});

	$("#ST_SLIDE_BTN_PREV").on("click touchstart", function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (browserMode) {
			prevSlideBrowser();
		} else {
			com.veeva.clm.prevSlide();
		}
	});

	$(document).on("click touchstart", "[data-link-veeva]", function (event) {
		event.stopPropagation();
		event.preventDefault();
		linkVeeva($(this));
	});

	if (browserMode) {
		$("html, body").addClass("browser-mode");
		fitStage();
		$(window).on("resize orientationchange", fitStage);

		let startX = 0;
		let startY = 0;
		let startTime = 0;
		let tracking = false;
		const SWIPE_MIN_DIST = 60;
		const SWIPE_MAX_TIME = 800;

		function onSwipeStart(x, y, target) {
			if (overlayBlocksSwipe() || isInteractiveTarget(target)) {
				tracking = false;
				return;
			}
			tracking = true;
			startX = x;
			startY = y;
			startTime = Date.now();
		}

		function onSwipeEnd(x, y) {
			if (!tracking) return;
			tracking = false;
			if (overlayBlocksSwipe()) return;
			const dx = x - startX;
			const dy = y - startY;
			const dt = Date.now() - startTime;
			if (dt > SWIPE_MAX_TIME) return;
			if (Math.abs(dx) < SWIPE_MIN_DIST) return;
			if (Math.abs(dx) < Math.abs(dy)) return;
			if (dx < 0) nextSlideBrowser();
			else prevSlideBrowser();
		}

		$("#main").on("touchstart", function (e) {
			const t = e.originalEvent.changedTouches[0];
			onSwipeStart(t.clientX, t.clientY, e.target);
		});

		$("#main").on("touchend", function (e) {
			const t = e.originalEvent.changedTouches[0];
			onSwipeEnd(t.clientX, t.clientY);
		});

		$("#main").on("mousedown", function (e) {
			if (e.which !== 1) return;
			onSwipeStart(e.clientX, e.clientY, e.target);
		});

		$(document).on("mouseup", function (e) {
			onSwipeEnd(e.clientX, e.clientY);
		});

		$(document).on("keydown", function (e) {
			if (overlayBlocksSwipe()) return;
			if (e.key === "ArrowRight" || e.key === "PageDown") {
				e.preventDefault();
				nextSlideBrowser();
			} else if (e.key === "ArrowLeft" || e.key === "PageUp") {
				e.preventDefault();
				prevSlideBrowser();
			}
		});
	}

	$("body")
		.on("touchmove", "#main", function (event) {
			event.preventDefault();
		})
		.on("touchmove", ".scroll", function (event) {
			event.stopPropagation();
		});

	function handleVeevaTrack(event) {
		event.preventDefault();
		const track_veeva = $(this).data("track-veeva");
		const slide_title = $("title").html();
		const element_track = {
			Track_Element_Id_vod__c: slide_title,
			Track_Element_Description_vod__c: track_veeva,
			Usage_Start_Time_vod__c: new Date(),
			Usage_Duration_vod__c: 0,
		};

		if (!browserMode) {
			com.veeva.clm.createRecord("Call_Clickstream_vod__c", element_track, function () {});
		} else {
			console.table(element_track);
		}
	}

	$(document).on("touchstart click", "[data-track-veeva]", handleVeevaTrack);
});
