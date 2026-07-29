/*
 * WebViewTV 3.0.1 -> 酷9 WebView 动态适配脚本
 * 机制版本: 2026-07-27-apk-engine-v2
 *
 * 设计原则：
 * 1. 原样保留 APK 的 32 条站点适配规则和 500ms 单动作循环；
 * 2. 不移动、不重建网页播放器 DOM；
 * 3. 不改写 video.src，不破坏 AliPlayer/Video.js 的 blob/动态签名地址；
 * 4. 原位 CSS 铺满酷9 WebView，原生全屏仅作为可选增强。
 */

var WVTK_CONFIG = {
    version: "2026-07-27-apk-engine-v2",
    pcUserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    mobileUserAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36",
    adapters: [{"url":"mgtv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.classList.contains('item') && e.textContent.trim() === (extra ? extra.split(' ')[0] : '')","needPreClick2":true,"preClickElementCondition2":"e.tagName === 'A' && e.classList.contains('channel') && e.querySelector('.name')?.textContent.trim() === (extra ? extra.split(' ')[1] : '')"},{"url":"btime.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'LI' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"miguvideo.com","ua":"MOBILE","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"gdtv.cn","ua":"MOBILE","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"dw.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":true,"playButtonCondition":"e.classList.contains('vjs-big-play-button')","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"haoqu99.com","ua":"PC","videoElementCondition":"e.id === 'iplayer'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"yntv.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'LI' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"nhk.or.jp","ua":"PC","videoElementCondition":"e.tagName === 'IFRAME'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"vtv.vn","ua":"PC","videoElementCondition":"e.tagName === 'IFRAME'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"4gtv","ua":"PC","videoElementCondition":"e.id === 'videoPlay_html5_api'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"gstv.com.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'SPAN' && e.textContent.trim() === '电视'","needPreClick2":true,"preClickElementCondition2":"e.tagName === 'SPAN' && e.textContent.trim() === extra"},{"url":"hbtv.com.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.classList.contains('prism-big-play-btn')","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"jstv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"lcxw.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'IMG' && e.getAttribute('src') === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"nctv.net.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'P' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"ngcz.tv","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'P' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"nmtv.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"sctv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'IMG' && e.getAttribute('src') === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"0515yc.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'LI' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"jlntv.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"jxntv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"ntdtv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'LI' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"sxrtv.com","ua":"PC","videoElementCondition":"e.id === 'player'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'P' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"wuhubtv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'A' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"ahbztv.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"hbnews.net","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'SPAN' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"lasatv.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"wifixz.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"dtradio.com.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'P' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"sxtygdy.com","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'DIV' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"xiancity.cn","ua":"PC","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":true,"preClickElementCondition":"e.tagName === 'A' && e.textContent.trim() === extra","needPreClick2":false,"preClickElementCondition2":"true"},{"url":"fjtv.net","ua":"MOBILE","videoElementCondition":"e.tagName === 'VIDEO'","needEnterFullscreenButton":false,"enterFullscreenButtonCondition":"true","needPlayButton":false,"playButtonCondition":"true","needPreClick":false,"preClickElementCondition":"true","needPreClick2":false,"preClickElementCondition2":"true"}]
};

function wvtk_decodeParam(value) {
    if (value === null || typeof value === "undefined") return "";
    var text = String(value);
    if (/%[0-9a-fA-F]{2}/.test(text)) {
        try { return decodeURIComponent(text); } catch (error) {}
    }
    return text;
}

function wvtk_queryParam(item, key) {
    if (item && item[key] !== null && typeof item[key] !== "undefined" && String(item[key]) !== "") {
        return wvtk_decodeParam(item[key]);
    }
    var requestUrl = item && item.url ? String(item.url) : "";
    try {
        if (typeof ku9 !== "undefined" && ku9 && typeof ku9.getQuery === "function") {
            var bridgeValue = ku9.getQuery(requestUrl, key);
            if (bridgeValue !== null && typeof bridgeValue !== "undefined" && String(bridgeValue) !== "") {
                return wvtk_decodeParam(bridgeValue);
            }
        }
    } catch (error) {}
    var match = new RegExp("[?&]" + key + "=([^&#]*)").exec(requestUrl);
    return match ? wvtk_decodeParam(match[1]) : "";
}

function wvtk_defaultAdapter() {
    return {
        url: "",
        ua: "PC",
        videoElementCondition: "e.tagName === 'VIDEO'",
        needEnterFullscreenButton: false,
        enterFullscreenButtonCondition: "true",
        needPlayButton: false,
        playButtonCondition: "true",
        needPreClick: false,
        preClickElementCondition: "true",
        needPreClick2: false,
        preClickElementCondition2: "true"
    };
}

function wvtk_findAdapter(url) {
    var address = String(url || "").toLowerCase();

    /* CCTV News is newer than the APK's adapter table.  It owns an AliPlayer
       instance and produces a runtime blob URL, so it must stay page-owned. */
    if (address.indexOf("m-live.cctvnews.cctv.com/live/landscape") !== -1) {
        return {
            url: "m-live.cctvnews.cctv.com",
            ua: "MOBILE",
            kind: "CCTV_NEWS_ALIPLAYER",
            videoElementCondition: "e.tagName === 'VIDEO'",
            needEnterFullscreenButton: false,
            enterFullscreenButtonCondition: "true",
            needPlayButton: true,
            playButtonCondition: "e.classList && (e.classList.contains('custom-play-btn') || e.classList.contains('custom-prism-play-control'))",
            needPreClick: false,
            preClickElementCondition: "true",
            needPreClick2: false,
            preClickElementCondition2: "true"
        };
    }

    var adapters = WVTK_CONFIG.adapters || [];
    for (var index = 0; index < adapters.length; index++) {
        var adapter = adapters[index];
        if (adapter && adapter.url && address.indexOf(String(adapter.url).toLowerCase()) !== -1) {
            return adapter;
        }
    }
    return wvtk_defaultAdapter();
}

/* Function#toString serializes this function into Ku9's page-side jscode. */
function wvtk_webview_boot(config) {
    "use strict";

    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (window.__WVTK_PLAYER__ && typeof window.__WVTK_PLAYER__.update === "function") {
        window.__WVTK_PLAYER__.update(config || {});
        return;
    }

    var DEFAULT_ADAPTER = {
        url: "",
        ua: "PC",
        videoElementCondition: "e.tagName === 'VIDEO'",
        needEnterFullscreenButton: false,
        enterFullscreenButtonCondition: "true",
        needPlayButton: false,
        playButtonCondition: "true",
        needPreClick: false,
        preClickElementCondition: "true",
        needPreClick2: false,
        preClickElementCondition2: "true"
    };

    var state = {
        config: config || {},
        adapter: (config && config.adapter) || DEFAULT_ADAPTER,
        extra: (config && config.extra) || "",
        sourceUrl: (config && config.sourceUrl) || "",
        media: null,
        video: null,
        fullscreenTarget: null,
        stopped: false,
        timer: null,
        pre1Done: false,
        pre2Done: false,
        playButtonClicks: 0,
        lastPlayButtonAt: 0,
        fullscreenButtonDone: false,
        nativeFullscreenAttempts: 0,
        lastNativeFullscreenAt: 0,
        qualityAttempts: 0,
        qualityMenuOpened: false,
        qualityDone: false,
        conditionCache: {},
        conditionErrors: {},
        listeners: [],
        scaleType: 0,
        reportAt: 0,
        lastReportPosition: -1,
        reportedAudio: false,
        loadingHidden: false,
        cctvPlayer: null,
        cctvPlayerSearches: 0,
        lastCctvPlayerSearchAt: 0,
        lastCctvPlayerPlayAt: 0,
        loopCount: 0
    };
    window.__WVTK_PLAYER__ = state;

    function log(message) {
        try { console.log("[WebViewTV-Ku9] " + message); } catch (error) {}
    }

    function warn(message) {
        try { console.warn("[WebViewTV-Ku9] " + message); } catch (error) {}
    }

    function isCctvNewsPage() {
        return String(state.adapter && state.adapter.kind || "") === "CCTV_NEWS_ALIPLAYER" ||
            String(state.sourceUrl || "").toLowerCase().indexOf("m-live.cctvnews.cctv.com/live/landscape") !== -1;
    }

    function bridge(method, args) {
        try {
            if (typeof window.ku9 !== "undefined" && window.ku9 && typeof window.ku9[method] === "function") {
                return window.ku9[method].apply(window.ku9, args || []);
            }
        } catch (error) {}
        return null;
    }

    function evaluateFlag(value) {
        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value !== 0;
        var expression = String(value === null || typeof value === "undefined" ? "false" : value);
        if (expression.toLowerCase() === "true") return true;
        if (expression.toLowerCase() === "false" || expression === "") return false;
        try { return !!(new Function("extra", "return !!(" + expression + ");"))(state.extra); }
        catch (error) { return false; }
    }

    function need(name) {
        return evaluateFlag(state.adapter && state.adapter[name]);
    }

    function fallbackCondition(expression, element, extra) {
        var expr = String(expression || "");
        if (!expr || expr === "true") return true;
        if (!element) return false;

        var tag = /e\.tagName\s*===\s*['\"]([^'\"]+)['\"]/.exec(expr);
        if (tag && String(element.tagName || "").toUpperCase() !== tag[1].toUpperCase()) return false;

        var id = /e\.id\s*===\s*['\"]([^'\"]+)['\"]/.exec(expr);
        if (id && String(element.id || "") !== id[1]) return false;

        var classes = [];
        var classRegex = /e\.classList\.contains\(['\"]([^'\"]+)['\"]\)/g;
        var classMatch;
        while ((classMatch = classRegex.exec(expr)) !== null) classes.push(classMatch[1]);
        if (classes.length) {
            var classOkay = false;
            for (var ci = 0; ci < classes.length; ci++) {
                if (element.classList && element.classList.contains(classes[ci])) classOkay = true;
            }
            if (!classOkay) return false;
        }

        if (expr.indexOf("getAttribute('src')") !== -1 || expr.indexOf('getAttribute("src")') !== -1) {
            return String(element.getAttribute && element.getAttribute("src") || "") === String(extra || "");
        }

        if (expr.indexOf("querySelector('.name')") !== -1 || expr.indexOf('querySelector(".name")') !== -1) {
            var nameNode = element.querySelector ? element.querySelector(".name") : null;
            var expectedName = String(extra || "").split(" ")[1] || "";
            return !!nameNode && String(nameNode.textContent || "").trim() === expectedName;
        }

        if (expr.indexOf("textContent.trim()") !== -1) {
            var expected = String(extra || "");
            if (expr.indexOf("extra.split(' ')[0]") !== -1 || expr.indexOf('extra.split(" ")[0]') !== -1) {
                expected = expected.split(" ")[0] || "";
            } else if (expr.indexOf("extra.split(' ')[1]") !== -1 || expr.indexOf('extra.split(" ")[1]') !== -1) {
                expected = expected.split(" ")[1] || "";
            } else {
                var literal = /textContent\.trim\(\)\s*===\s*['\"]([^'\"]*)['\"]/.exec(expr);
                if (literal) expected = literal[1];
            }
            return String(element.textContent || "").trim() === expected;
        }
        return false;
    }

    function matches(expression, element) {
        var expr = String(expression || "true");
        try {
            var evaluator = state.conditionCache[expr];
            if (!evaluator) {
                evaluator = new Function("e", "extra", "return !!(" + expr + ");");
                state.conditionCache[expr] = evaluator;
            }
            return !!evaluator(element, state.extra);
        } catch (error) {
            if (!state.conditionErrors[expr]) {
                state.conditionErrors[expr] = true;
                warn("condition fallback: " + expr + " (" + error + ")");
            }
            return fallbackCondition(expr, element, state.extra);
        }
    }

    /* document.all is what the APK scans.  querySelectorAll gives the same
       top-document order and additionally lets us inspect open shadow roots and
       same-origin frames without changing any DOM. */
    function eachElement(visitor) {
        var roots = [document];
        var seen = [];
        while (roots.length) {
            var root = roots.shift();
            if (!root || seen.indexOf(root) !== -1) continue;
            seen.push(root);
            var nodes = [];
            try { nodes = root.querySelectorAll("*"); } catch (error) {}
            for (var index = 0; index < nodes.length; index++) {
                var element = nodes[index];
                if (visitor(element) === false) return false;
                try { if (element.shadowRoot) roots.push(element.shadowRoot); } catch (error2) {}
                if (String(element.tagName || "").toUpperCase() === "IFRAME") {
                    try { if (element.contentDocument) roots.push(element.contentDocument); } catch (error3) {}
                }
            }
        }
        return true;
    }

    function findByCondition(expression) {
        var found = null;
        eachElement(function (element) {
            if (matches(expression, element)) {
                found = element;
                return false;
            }
            return true;
        });
        return found;
    }

    function findFirst(selectors, root) {
        var scope = root || document;
        for (var index = 0; index < selectors.length; index++) {
            try {
                var found = scope.querySelector(selectors[index]);
                if (found) return found;
            } catch (error) {}
        }
        return null;
    }

    function elementIsConnected(element) {
        if (!element) return false;
        try { if (typeof element.isConnected === "boolean") return element.isConnected; } catch (error) {}
        try {
            var owner = element.ownerDocument || document;
            return !!(owner.documentElement && owner.documentElement.contains(element));
        } catch (error2) { return false; }
    }

    function parentOrHost(node) {
        if (!node) return null;
        try { if (node.parentElement) return node.parentElement; } catch (error) {}
        try {
            var root = node.getRootNode ? node.getRootNode() : null;
            if (root && root.host) return root.host;
        } catch (error2) {}
        return null;
    }

    function setImportant(element, name, value) {
        try { if (element && element.style) element.style.setProperty(name, value, "important"); } catch (error) {}
    }

    function prepareDocument(doc) {
        if (!doc) return;
        try {
            setImportant(doc.documentElement, "width", "100%");
            setImportant(doc.documentElement, "height", "100%");
            setImportant(doc.documentElement, "margin", "0");
            setImportant(doc.documentElement, "padding", "0");
            setImportant(doc.documentElement, "overflow", "hidden");
            setImportant(doc.documentElement, "background", "#000");
            setImportant(doc.body, "width", "100%");
            setImportant(doc.body, "height", "100%");
            setImportant(doc.body, "margin", "0");
            setImportant(doc.body, "padding", "0");
            setImportant(doc.body, "overflow", "hidden");
            setImportant(doc.body, "background", "#000");
        } catch (error) {}
    }

    /* A transformed/contained ancestor changes the containing block of a fixed
       child.  Clear only those clipping properties; never make ancestors fixed. */
    function clearClippingAncestors(element) {
        var node = parentOrHost(element);
        for (var depth = 0; node && depth < 10; depth++) {
            var tag = String(node.tagName || "").toUpperCase();
            if (tag === "HTML") break;
            setImportant(node, "transform", "none");
            setImportant(node, "contain", "none");
            setImportant(node, "overflow", "visible");
            node = parentOrHost(node);
        }
    }

    function viewportElement(element, zIndex) {
        if (!element || !element.style) return;
        setImportant(element, "display", "block");
        setImportant(element, "position", "fixed");
        setImportant(element, "inset", "0");
        setImportant(element, "left", "0");
        setImportant(element, "top", "0");
        setImportant(element, "right", "0");
        setImportant(element, "bottom", "0");
        setImportant(element, "width", "100vw");
        setImportant(element, "height", "100vh");
        setImportant(element, "min-width", "0");
        setImportant(element, "min-height", "0");
        setImportant(element, "max-width", "none");
        setImportant(element, "max-height", "none");
        setImportant(element, "margin", "0");
        setImportant(element, "padding", "0");
        setImportant(element, "visibility", "visible");
        setImportant(element, "opacity", "1");
        setImportant(element, "z-index", String(zIndex || 2147483647));
        setImportant(element, "background", "#000");
        clearClippingAncestors(element);
        try { prepareDocument(element.ownerDocument || document); } catch (error) {}
    }

    function styleFrameChain(element) {
        var doc = null;
        try { doc = element && element.ownerDocument; } catch (error) {}
        for (var depth = 0; doc && depth < 4; depth++) {
            var frame = null;
            try { frame = doc.defaultView && doc.defaultView.frameElement; } catch (error2) {}
            if (!frame) break;
            viewportElement(frame, 2147483646 - depth);
            try { doc = frame.ownerDocument; } catch (error3) { break; }
        }
    }

    function closestPlayerContainer(video) {
        var node = video;
        for (var depth = 0; node && depth < 10; depth++) {
            try {
                if (String(node.id || "") === "player" ||
                    (node.classList && (node.classList.contains("prism-player") || node.classList.contains("player-container")))) {
                    return node;
                }
            } catch (error) {}
            node = parentOrHost(node);
        }
        return null;
    }

    function styleMediaInPlace(media) {
        if (!media) return;
        var tag = String(media.tagName || "").toUpperCase();
        var target = media;

        if (isCctvNewsPage() && tag === "VIDEO") {
            target = closestPlayerContainer(media) || media;
            viewportElement(target, 2147483646);
            if (target !== media) {
                setImportant(media, "display", "block");
                setImportant(media, "position", "absolute");
                setImportant(media, "inset", "0");
                setImportant(media, "width", "100%");
                setImportant(media, "height", "100%");
                setImportant(media, "min-width", "0");
                setImportant(media, "min-height", "0");
                setImportant(media, "max-width", "none");
                setImportant(media, "max-height", "none");
                setImportant(media, "margin", "0");
                setImportant(media, "padding", "0");
                setImportant(media, "background", "#000");
                setImportant(media, "z-index", "1");
            }
        } else {
            viewportElement(media, 2147483647);
        }

        state.fullscreenTarget = target;
        styleFrameChain(media);
        applyScale(state.scaleType);
    }

    function mediaVideo() {
        if (state.video && elementIsConnected(state.video)) return state.video;
        state.video = null;
        if (state.media) {
            try {
                if (String(state.media.tagName || "").toUpperCase() === "VIDEO") state.video = state.media;
                else state.video = state.media.querySelector && state.media.querySelector("video");
            } catch (error) {}
        }
        if (state.video) setupVideoElement(state.video);
        return state.video;
    }

    function applyScale(scaleType) {
        state.scaleType = Number(scaleType);
        if (!isFinite(state.scaleType)) state.scaleType = 0;
        var video = state.video;
        if (!video || !video.style) return;

        setImportant(video, "object-position", "center center");
        if (state.scaleType === 4) setImportant(video, "object-fit", "none");
        else if (state.scaleType === 5) setImportant(video, "object-fit", "cover");
        else if (state.scaleType === 1 || state.scaleType === 2) setImportant(video, "object-fit", "contain");
        else setImportant(video, "object-fit", "fill");

        if (state.scaleType === 1) setImportant(video, "aspect-ratio", "16 / 9");
        else if (state.scaleType === 2) setImportant(video, "aspect-ratio", "4 / 3");
        else {
            try { video.style.removeProperty("aspect-ratio"); } catch (error) {}
        }
    }

    function isVisible(element) {
        if (!element) return false;
        try {
            var style = window.getComputedStyle ? window.getComputedStyle(element) : null;
            if (style && (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0)) return false;
            var rect = element.getBoundingClientRect();
            return rect.width > 1 && rect.height > 1;
        } catch (error) { return true; }
    }

    function clickElement(element) {
        if (!element) return false;
        try {
            var eventNames = ["mouseover", "mousedown", "mouseup"];
            for (var index = 0; index < eventNames.length; index++) {
                var event;
                try { event = new MouseEvent(eventNames[index], {bubbles: true, cancelable: true, view: window}); }
                catch (error) {
                    event = document.createEvent("MouseEvents");
                    event.initMouseEvent(eventNames[index], true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                }
                element.dispatchEvent(event);
            }
            if (typeof element.click === "function") element.click();
            else return false;
            return true;
        } catch (error2) {
            try { element.click(); return true; } catch (error3) { return false; }
        }
    }

    function performPreClick1() {
        if (!need("needPreClick")) {
            state.pre1Done = true;
            return false;
        }
        if (state.pre1Done) return false;
        var element = findByCondition(state.adapter.preClickElementCondition);
        if (!element) return false;
        if (clickElement(element)) {
            state.pre1Done = true;
            log("pre-click 1: " + String(element.tagName || ""));
            return true;
        }
        return false;
    }

    function performPreClick2() {
        if (!state.pre1Done) return false;
        if (!need("needPreClick2")) {
            state.pre2Done = true;
            return false;
        }
        if (state.pre2Done) return false;
        var element = findByCondition(state.adapter.preClickElementCondition2);
        if (!element) return false;
        if (clickElement(element)) {
            state.pre2Done = true;
            log("pre-click 2: " + String(element.tagName || ""));
            return true;
        }
        return false;
    }

    function hideLoadingWhenReady(video) {
        if (state.loadingHidden) return;
        if (video) {
            try { if (Number(video.readyState || 0) < 1 && video.paused) return; } catch (error) {}
        }
        bridge("hideLoading", []);
        state.loadingHidden = true;
    }

    function reportVideo(video, force) {
        if (!video) return;
        var now = Date.now();
        if (!force && now < state.reportAt) return;
        state.reportAt = now + 750;

        try {
            var width = Number(video.videoWidth || 0);
            var height = Number(video.videoHeight || 0);
            if (width > 0 && height > 0) bridge("setvideo", [Math.round(width), Math.round(height)]);
        } catch (error) {}

        if (!state.reportedAudio) {
            bridge("setaudio", ["立体声"]);
            state.reportedAudio = true;
        }

        try {
            var duration = Number(video.duration || 0);
            bridge("setduration", [isFinite(duration) && duration > 0 ? duration : 0]);
        } catch (error2) {}

        try {
            var position = Number(video.currentTime || 0);
            if (!isFinite(position) || position < 0) position = 0;
            if (force || Math.abs(position - state.lastReportPosition) >= 0.25) {
                bridge("setposition", [position]);
                state.lastReportPosition = position;
            }
        } catch (error3) {}

        try {
            if (!video.paused || Number(video.readyState || 0) >= 2) hideLoadingWhenReady(video);
        } catch (error4) {}
    }

    function attachVideoListeners(video) {
        if (!video || video.__wvtkListenersAttached) return;
        try { video.__wvtkListenersAttached = true; } catch (error) {}

        function onPlaying() {
            styleMediaInPlace(state.media || video);
            reportVideo(video, true);
        }
        function onMetadata() { reportVideo(video, true); }
        function onTime() { reportVideo(video, false); }

        var pairs = [
            ["play", onPlaying], ["playing", onPlaying], ["canplay", onPlaying],
            ["loadedmetadata", onMetadata], ["durationchange", onMetadata],
            ["resize", onMetadata], ["timeupdate", onTime]
        ];
        for (var index = 0; index < pairs.length; index++) {
            try {
                video.addEventListener(pairs[index][0], pairs[index][1], false);
                state.listeners.push([video, pairs[index][0], pairs[index][1]]);
            } catch (error2) {}
        }
    }

    function setupVideoElement(video) {
        if (!video) return;
        state.video = video;
        window.wvt_video = video;
        try {
            video.autoplay = true;
            video.controls = false;
            video.removeAttribute("controls");
            video.muted = false;
            video.defaultMuted = false;
            video.volume = 1;
        } catch (error) {}
        attachVideoListeners(video);
        applyScale(state.scaleType);
        reportVideo(video, true);
    }

    function setupMedia(media) {
        state.media = media;
        state.video = null;
        styleMediaInPlace(media);
        if (String(media.tagName || "").toUpperCase() === "VIDEO") setupVideoElement(media);
        else {
            try {
                var childVideo = media.querySelector && media.querySelector("video");
                if (childVideo) setupVideoElement(childVideo);
            } catch (error) {}
            hideLoadingWhenReady(null);
        }
        log("media setup in place: " + String(media.tagName || "") + (media.id ? "#" + media.id : ""));
    }

    function removeInvalidMedia() {
        if (state.video && !elementIsConnected(state.video)) {
            state.video = null;
            window.wvt_video = null;
            if (state.media && elementIsConnected(state.media) && String(state.media.tagName || "").toUpperCase() !== "VIDEO") {
                log("nested video replaced; keep page-owned container");
                return true;
            }
        }
        if (state.media && !elementIsConnected(state.media)) {
            state.media = null;
            state.video = null;
            state.fullscreenTarget = null;
            state.playButtonClicks = 0;
            state.fullscreenButtonDone = false;
            window.wvt_video = null;
            log("media element removed; reference cleared");
            return true;
        }
        return false;
    }

    function findAndSetupMedia() {
        if (state.media) return false;
        var expression = state.adapter.videoElementCondition || DEFAULT_ADAPTER.videoElementCondition;
        var media = findByCondition(expression);
        if (!media) return false;
        setupMedia(media);
        return true;
    }

    function isAliPlayerLike(value) {
        if (!value || typeof value !== "object") return false;
        try {
            if (value.nodeType || value === window || value === document) return false;
            return typeof value.play === "function" &&
                (typeof value.getStatus === "function" || typeof value.getSourceUrl === "function" || !!value._el || !!value.tag);
        } catch (error) { return false; }
    }

    /* CCTV News keeps AliPlayer in React state.  The normal path is its own
       .custom-play-btn; this tiny, rate-limited scan is only a fallback and
       never writes the player's source/blob URL. */
    function findCctvPlayer(now) {
        if (!isCctvNewsPage()) return null;
        if (state.cctvPlayer && isAliPlayerLike(state.cctvPlayer)) return state.cctvPlayer;
        if (state.cctvPlayerSearches >= 8 || now - state.lastCctvPlayerSearchAt < 5000) return null;
        state.cctvPlayerSearches++;
        state.lastCctvPlayerSearchAt = now;

        var known = ["aliPlayer", "aliplayer", "livePlayer", "playerObj", "livePlayerObj"];
        for (var ki = 0; ki < known.length; ki++) {
            try {
                if (isAliPlayerLike(window[known[ki]])) {
                    state.cctvPlayer = window[known[ki]];
                    return state.cctvPlayer;
                }
            } catch (error) {}
        }

        var roots = [];
        try {
            roots.push(document.getElementById("player"));
            roots.push(document.querySelector(".custom-play-btn"));
            roots.push(document.querySelector("#player video"));
        } catch (error2) {}
        var queue = [];
        for (var ri = 0; ri < roots.length; ri++) {
            var root = roots[ri];
            if (!root) continue;
            try {
                var own = Object.getOwnPropertyNames(root);
                for (var oi = 0; oi < own.length; oi++) {
                    if (own[oi].indexOf("__react") === 0 || own[oi].indexOf("_player") !== -1 || own[oi].indexOf("player") !== -1) {
                        queue.push({value: root[own[oi]], depth: 0});
                    }
                }
            } catch (error3) {}
        }

        var seen = [];
        var inspected = 0;
        while (queue.length && inspected < 120) {
            var entry = queue.shift();
            var value = entry.value;
            inspected++;
            if (!value || (typeof value !== "object" && typeof value !== "function") || seen.indexOf(value) !== -1) continue;
            seen.push(value);
            if (isAliPlayerLike(value)) {
                state.cctvPlayer = value;
                return value;
            }
            if (entry.depth >= 3) continue;
            var names = [];
            try { names = Object.getOwnPropertyNames(value); } catch (error4) {}
            for (var ni = 0; ni < names.length && ni < 36; ni++) {
                var name = names[ni];
                if (name === "window" || name === "document" || name === "ownerDocument") continue;
                var child;
                try { child = value[name]; } catch (error5) { continue; }
                if (child && (typeof child === "object" || typeof child === "function")) {
                    queue.push({value: child, depth: entry.depth + 1});
                }
            }
        }
        return null;
    }

    function clickCctvNewsPlay(now) {
        if (!isCctvNewsPage() || now - state.lastPlayButtonAt < 700) return false;
        var selectors = ["#player .custom-play-btn", ".custom-play-btn", "#player .custom-prism-play-control"];
        for (var index = 0; index < selectors.length; index++) {
            var element = null;
            try { element = document.querySelector(selectors[index]); } catch (error) {}
            if (element && isVisible(element) && clickElement(element)) {
                state.lastPlayButtonAt = now;
                state.playButtonClicks++;
                log("CCTV News page play control: " + selectors[index]);
                return true;
            }
        }
        var player = findCctvPlayer(now);
        if (player && now - state.lastCctvPlayerPlayAt >= 1200) {
            state.lastCctvPlayerPlayAt = now;
            try {
                player.play();
                log("CCTV News AliPlayer.play fallback");
                return true;
            } catch (error2) {}
        }
        return false;
    }

    function clickAdapterPlayButton(now) {
        if (!need("needPlayButton")) return false;
        if (now - state.lastPlayButtonAt < 700) return false;
        var element = findByCondition(state.adapter.playButtonCondition);
        if (!element) return false;
        if (clickElement(element)) {
            state.lastPlayButtonAt = now;
            state.playButtonClicks++;
            log("adapter play button clicked");
            return true;
        }
        return false;
    }

    function attemptVideoPlay(video) {
        if (!video) return false;
        try {
            video.muted = false;
            video.defaultMuted = false;
            video.volume = 1;
            var result = video.play();
            if (result && typeof result.catch === "function") {
                result.catch(function (error) { warn("video.play rejected: " + error); });
            }
            return true;
        } catch (error2) {
            warn("video.play failed: " + error2);
            return false;
        }
    }

    function playVideoIfPaused() {
        var video = mediaVideo();
        if (!video) return false;
        try {
            if (!video.paused || video.error) return false;
        } catch (error) { return false; }

        var now = Date.now();
        attemptVideoPlay(video);
        var stillPaused = true;
        try { stillPaused = !!video.paused; } catch (error2) {}
        if (stillPaused) {
            if (isCctvNewsPage()) clickCctvNewsPlay(now);
            else clickAdapterPlayButton(now);
        }
        return true;
    }

    function normalizeText(text) {
        return String(text || "").replace(/\s+/g, "").trim();
    }

    function findVisibleText(text) {
        var target = normalizeText(text);
        var nodes = [];
        try { nodes = document.querySelectorAll("div,span,li,a,p,button,label,i,em"); } catch (error) {}
        for (var index = 0; index < nodes.length; index++) {
            var element = nodes[index];
            try { if (element.children && element.children.length > 3) continue; } catch (error2) {}
            if (isVisible(element) && normalizeText(element.textContent || element.innerText) === target) return element;
        }
        return null;
    }

    function selectCctvUltraHd() {
        if (state.qualityDone) return false;
        var address = String(state.sourceUrl || (location && location.href) || "").toLowerCase();
        if (isCctvNewsPage() || (address.indexOf("tv.cctv.com/live/") === -1 && address.indexOf("cctv.com/live/") === -1)) {
            state.qualityDone = true;
            return false;
        }
        state.qualityAttempts++;
        if (state.qualityAttempts > 40) {
            state.qualityDone = true;
            return false;
        }

        var ultra = findVisibleText("超清");
        if (ultra && clickElement(ultra)) {
            state.qualityDone = true;
            log("CCTV quality selected: 超清");
            return true;
        }

        if (!state.qualityMenuOpened) {
            var labels = ["高清", "标清", "流畅", "蓝光", "自动", "4K"];
            for (var index = 0; index < labels.length; index++) {
                var current = findVisibleText(labels[index]);
                if (current && clickElement(current)) {
                    state.qualityMenuOpened = true;
                    log("CCTV quality menu opened");
                    return true;
                }
            }
        }

        var candidates = [];
        try { candidates = document.querySelectorAll("[id*='720'],[class*='720'],[id*='p720'],[class*='p720'],[id*='resolution'],[class*='resolution']"); } catch (error) {}
        for (var ci = 0; ci < candidates.length; ci++) {
            var candidate = candidates[ci];
            var meta = normalizeText((candidate.id || "") + " " + (candidate.className || "") + " " + (candidate.textContent || "")).toLowerCase();
            if (isVisible(candidate) && (meta.indexOf("720") !== -1 || meta.indexOf("超清") !== -1) && clickElement(candidate)) {
                state.qualityDone = true;
                log("CCTV quality selected: 720p candidate");
                return true;
            }
        }
        return false;
    }

    function nativeFullscreenElement(doc) {
        try { return doc.fullscreenElement || doc.webkitFullscreenElement || doc.webkitCurrentFullScreenElement || null; }
        catch (error) { return null; }
    }

    function requestNativeFullscreen(target, force) {
        if (!target) return false;
        var now = Date.now();
        if (!force) {
            if (state.nativeFullscreenAttempts >= 2) return false;
            if (now - state.lastNativeFullscreenAt < 3000) return false;
        }
        var doc = null;
        try { doc = target.ownerDocument || document; } catch (error) { doc = document; }
        if (nativeFullscreenElement(doc)) return false;
        var method = target.requestFullscreen || target.webkitRequestFullscreen || target.webkitRequestFullScreen || target.mozRequestFullScreen;
        if (typeof method !== "function") return false;
        state.nativeFullscreenAttempts++;
        state.lastNativeFullscreenAt = now;
        try {
            var result = method.call(target);
            if (result && typeof result.catch === "function") result.catch(function () {});
            return true;
        } catch (error2) { return false; }
    }

    function autoFullscreenIfNeeded() {
        if (!state.media) return false;
        var video = mediaVideo();
        if (video) {
            try { if (video.paused) return false; } catch (error) {}
        }

        /* The APK prefers a site-provided button when configured. */
        if (need("needEnterFullscreenButton") && !state.fullscreenButtonDone) {
            var button = findByCondition(state.adapter.enterFullscreenButtonCondition);
            if (button && clickElement(button)) {
                state.fullscreenButtonDone = true;
                log("site fullscreen button clicked");
                return true;
            }
        }

        styleMediaInPlace(state.media);
        if (requestNativeFullscreen(state.fullscreenTarget || state.media, false)) return true;
        return false;
    }

    function tick() {
        if (state.stopped) return;
        state.loopCount++;

        /* This order and one-success-per-round behavior mirror main.js in APK. */
        var actions = [
            removeInvalidMedia,
            playVideoIfPaused,
            performPreClick1,
            performPreClick2,
            findAndSetupMedia,
            selectCctvUltraHd,
            autoFullscreenIfNeeded
        ];
        for (var index = 0; index < actions.length; index++) {
            try { if (actions[index]()) break; }
            catch (error) { warn("loop action failed: " + error); }
        }

        var video = mediaVideo();
        if (video) {
            styleMediaInPlace(state.media || video);
            reportVideo(video, false);
        } else if (state.media) {
            styleMediaInPlace(state.media);
            hideLoadingWhenReady(null);
        }
    }

    function loop() {
        if (state.stopped) return;
        tick();
        state.timer = setTimeout(loop, 500);
    }

    function onTrustedGesture(event) {
        if (event && event.isTrusted === false) return;
        var video = mediaVideo();
        if (video) attemptVideoPlay(video);
        else if (isCctvNewsPage()) clickCctvNewsPlay(Date.now());
        requestNativeFullscreen(state.fullscreenTarget || state.media, true);
    }

    function injectBaseStyle() {
        if (!document || !document.documentElement) return;
        prepareDocument(document);
        try {
            if (!document.getElementById("wvtk-ku9-base-style")) {
                var style = document.createElement("style");
                style.id = "wvtk-ku9-base-style";
                style.textContent = "video::-webkit-media-controls{display:none!important;-webkit-appearance:none!important;}[data-wvtk-hidden]{display:none!important;}";
                (document.head || document.documentElement).appendChild(style);
            }
        } catch (error) {}
    }

    state.update = function (nextConfig) {
        nextConfig = nextConfig || {};
        var changed = String(nextConfig.sourceUrl || "") !== String(state.sourceUrl || "");
        state.config = nextConfig;
        state.adapter = nextConfig.adapter || state.adapter || DEFAULT_ADAPTER;
        state.extra = nextConfig.extra || "";
        state.sourceUrl = nextConfig.sourceUrl || state.sourceUrl;
        if (changed) {
            state.pre1Done = false;
            state.pre2Done = false;
            state.qualityDone = false;
            state.qualityAttempts = 0;
            state.qualityMenuOpened = false;
        }
        setTimeout(tick, 0);
    };

    state.stop = function () {
        state.stopped = true;
        if (state.timer) clearTimeout(state.timer);
        for (var index = 0; index < state.listeners.length; index++) {
            try { state.listeners[index][0].removeEventListener(state.listeners[index][1], state.listeners[index][2], false); } catch (error) {}
        }
        state.listeners = [];
    };

    window.pause = function () {
        var video = mediaVideo();
        if (video) { try { video.pause(); } catch (error) {} }
        if (isCctvNewsPage() && state.cctvPlayer && typeof state.cctvPlayer.pause === "function") {
            try { state.cctvPlayer.pause(); } catch (error2) {}
        }
    };
    window.play = function () {
        var video = mediaVideo();
        if (video) attemptVideoPlay(video);
        if (video) {
            try { if (video.paused && isCctvNewsPage()) clickCctvNewsPlay(Date.now()); } catch (error) {}
        } else if (isCctvNewsPage()) clickCctvNewsPlay(Date.now());
    };
    window.setposition = function (position) {
        var video = mediaVideo();
        if (!video) return;
        try { video.currentTime = Number(position) || 0; } catch (error) {}
    };
    window.setspeed = function (speed) {
        var video = mediaVideo();
        if (!video) return;
        try { video.playbackRate = Number(speed) || 1; } catch (error) {}
    };
    window.setvolume = function (volume) {
        var video = mediaVideo();
        if (!video) return;
        try {
            var value = Number(volume);
            if (!isFinite(value)) value = 1;
            value = Math.max(0, Math.min(1, value));
            video.muted = value <= 0;
            video.volume = value;
        } catch (error) {}
    };
    window.setscale = function (scaleType) { applyScale(scaleType); };

    try {
        var initialScale = bridge("getscale", []);
        if (initialScale !== null && typeof initialScale !== "undefined") state.scaleType = Number(initialScale) || 0;
    } catch (error) {}

    injectBaseStyle();
    try { document.addEventListener("keydown", onTrustedGesture, true); } catch (error2) {}
    try { document.addEventListener("click", onTrustedGesture, true); } catch (error3) {}
    try { document.addEventListener("touchend", onTrustedGesture, true); } catch (error4) {}
    setTimeout(loop, 1000);
    log("APK engine started; version=" + String(config && config.version || "") + "; extra=" + state.extra);
}


/* CCTV website source 1 patch.  This function is serialized only for
   tv.cctv.com/live/*; source 2 (Yangshipin) and source 3 (CCTV News) continue
   to receive the unchanged v2 page engine above. */
function wvtk_isCctvSource1Url(url) {
    var address = String(url || "").toLowerCase();
    return address.indexOf("://tv.cctv.com/live/") !== -1 ||
        address.indexOf("://www.cctv.com/live/") !== -1;
}

function wvtk_cctv_source1_boot(config) {
    "use strict";

    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (window.__WVTK_CCTV_SOURCE1__) return;

    var state = {
        version: String(config && config.version || ""),
        stopped: false,
        timer: null,
        pageFullscreenDone: false,
        pageFullscreenAttempts: 0,
        lastPageFullscreenAt: 0,
        nativeAttempts: 0,
        lastNativeAt: 0,
        qualityDone: false,
        qualityAttempts: 0,
        qualityClicks: 0,
        qualityTarget: "",
        lastQualityClickAt: 0,
        preferenceSeeded: false,
        logged: false
    };
    window.__WVTK_CCTV_SOURCE1__ = state;

    function log(message) {
        try { console.log("[WebViewTV-Ku9/CCTV1] " + message); } catch (error) {}
    }

    function setImportant(element, name, value) {
        try { if (element && element.style) element.style.setProperty(name, value, "important"); } catch (error) {}
    }

    function preparePage() {
        var html = null;
        var body = null;
        try { html = document.documentElement; body = document.body; } catch (error) {}
        var nodes = [html, body];
        for (var index = 0; index < nodes.length; index++) {
            var node = nodes[index];
            setImportant(node, "width", "100%");
            setImportant(node, "height", "100%");
            setImportant(node, "margin", "0");
            setImportant(node, "padding", "0");
            setImportant(node, "overflow", "hidden");
            setImportant(node, "background", "#000");
            setImportant(node, "visibility", "visible");
        }
    }

    function clearAncestors(element) {
        var node = null;
        try { node = element && element.parentElement; } catch (error) {}
        for (var depth = 0; node && depth < 10; depth++) {
            var tag = String(node.tagName || "").toUpperCase();
            if (tag === "HTML") break;
            setImportant(node, "transform", "none");
            setImportant(node, "contain", "none");
            setImportant(node, "overflow", "visible");
            try { node = node.parentElement; } catch (error2) { node = null; }
        }
    }

    function fillPlayer(player) {
        if (!player) return;
        setImportant(player, "display", "block");
        setImportant(player, "position", "fixed");
        setImportant(player, "inset", "0");
        setImportant(player, "left", "0");
        setImportant(player, "top", "0");
        setImportant(player, "right", "0");
        setImportant(player, "bottom", "0");
        setImportant(player, "width", "100vw");
        setImportant(player, "height", "100vh");
        setImportant(player, "min-width", "0");
        setImportant(player, "min-height", "0");
        setImportant(player, "max-width", "none");
        setImportant(player, "max-height", "none");
        setImportant(player, "margin", "0");
        setImportant(player, "padding", "0");
        setImportant(player, "visibility", "visible");
        setImportant(player, "opacity", "1");
        setImportant(player, "z-index", "2147483647");
        setImportant(player, "background", "#000");
        clearAncestors(player);
    }

    function fillVideo(video) {
        if (!video) return;
        setImportant(video, "display", "block");
        setImportant(video, "position", "absolute");
        setImportant(video, "inset", "0");
        setImportant(video, "width", "100%");
        setImportant(video, "height", "100%");
        setImportant(video, "min-width", "0");
        setImportant(video, "min-height", "0");
        setImportant(video, "max-width", "none");
        setImportant(video, "max-height", "none");
        setImportant(video, "margin", "0");
        setImportant(video, "padding", "0");
        setImportant(video, "background", "#000");
        setImportant(video, "transform", "translateZ(0)");
        try {
            video.playsInline = false;
            video.setAttribute("playsinline", "false");
            video.muted = false;
            video.volume = 1;
        } catch (error) {}
    }

    function clickElement(element) {
        if (!element) return false;
        try {
            var names = ["mouseover", "mousedown", "mouseup"];
            for (var index = 0; index < names.length; index++) {
                var event;
                try { event = new MouseEvent(names[index], {bubbles: true, cancelable: true, view: window}); }
                catch (error) {
                    event = document.createEvent("MouseEvents");
                    event.initMouseEvent(names[index], true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                }
                element.dispatchEvent(event);
            }
            element.click();
            return true;
        } catch (error2) {
            try { element.click(); return true; } catch (error3) { return false; }
        }
    }

    function playerNodes() {
        var player = null;
        var video = null;
        var pageButton = null;
        try {
            player = document.getElementById("player") || document.querySelector("#video .video_flash") || document.querySelector(".video_flash");
            video = document.getElementById("h5player_player") ||
                (player && player.querySelector ? player.querySelector("video") : null) || document.querySelector("video");
            pageButton = document.getElementById("player_pagefullscreen_player") ||
                document.querySelector("[id^='player_pagefullscreen_'][ispagefullscreen]");
        } catch (error) {}
        return {player: player, video: video, pageButton: pageButton};
    }

    function requestNativeFullscreen(target, force) {
        if (!target) return false;
        var now = Date.now();
        if (!force && (state.nativeAttempts >= 2 || now - state.lastNativeAt < 3000)) return false;
        var doc = null;
        try { doc = target.ownerDocument || document; } catch (error) { doc = document; }
        try {
            if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.webkitCurrentFullScreenElement) return false;
        } catch (error2) {}
        var method = target.requestFullscreen || target.webkitRequestFullscreen || target.webkitRequestFullScreen || target.mozRequestFullScreen;
        if (typeof method !== "function") return false;
        state.nativeAttempts++;
        state.lastNativeAt = now;
        try {
            var result = method.call(target);
            if (result && typeof result.catch === "function") result.catch(function () {});
            return true;
        } catch (error3) { return false; }
    }

    function setupFullscreen(forceNative) {
        preparePage();
        var nodes = playerNodes();
        var target = nodes.player || nodes.video;
        if (nodes.player) fillPlayer(nodes.player);
        else if (nodes.video) fillPlayer(nodes.video);
        if (nodes.video) fillVideo(nodes.video);

        var now = Date.now();
        if (nodes.pageButton) {
            var active = "";
            try { active = String(nodes.pageButton.getAttribute("ispagefullscreen") || "").toLowerCase(); } catch (error) {}
            if (active === "true") state.pageFullscreenDone = true;
            else if (!state.pageFullscreenDone && state.pageFullscreenAttempts < 8 && now - state.lastPageFullscreenAt >= 800) {
                state.pageFullscreenAttempts++;
                state.lastPageFullscreenAt = now;
                clickElement(nodes.pageButton);
                try {
                    if (String(nodes.pageButton.getAttribute("ispagefullscreen") || "").toLowerCase() === "true") state.pageFullscreenDone = true;
                } catch (error2) {}
            }
        }

        var ready = false;
        try { ready = !!nodes.video && Number(nodes.video.readyState || 0) > 0; } catch (error3) {}
        if (target && (forceNative || ready)) requestNativeFullscreen(target, !!forceNative);
        if (target && !state.logged) {
            state.logged = true;
            log("source-1 player fixed to viewport; version=" + state.version);
        }
        return target;
    }

    function seedPreference() {
        if (state.preferenceSeeded) return;
        try {
            var saved = String(window.localStorage.getItem("cctv_live_resolution") || "");
            if (saved !== "1080" && saved !== "720") window.localStorage.setItem("cctv_live_resolution", "720");
            state.preferenceSeeded = true;
        } catch (error) {}
    }

    function resolutionNode(value, label) {
        var selectors = [
            "#resolution_item_" + value + "_player",
            "[id^='resolution_item_" + value + "_']",
            "[id^='resolution_item_p" + value + "_']",
            "[id^='resolution_item_'][itemvalue='" + value + "']",
            "[id^='resolution_item_'][itemvalue='p" + value + "']"
        ];
        for (var index = 0; index < selectors.length; index++) {
            try {
                var found = document.querySelector(selectors[index]);
                if (found) return found;
            } catch (error) {}
        }
        var candidates = [];
        try { candidates = document.querySelectorAll("[id^='resolution_item_'],[itemvalue]"); } catch (error2) {}
        for (var ci = 0; ci < candidates.length; ci++) {
            var candidate = candidates[ci];
            var text = String(candidate.textContent || "").replace(/\s+/g, "").trim();
            var meta = String(candidate.id || "") + " " + String(candidate.getAttribute && candidate.getAttribute("itemvalue") || "");
            if (meta.toLowerCase().indexOf(String(value).toLowerCase()) !== -1 || text === label) return candidate;
        }
        return null;
    }

    function activeResolution() {
        try {
            var show = document.getElementById("player_resolution_show_player") || document.querySelector("[id^='player_resolution_show_']");
            if (show) {
                var value = show.getAttribute("activeresolution") || show.getAttribute("activeResolution");
                if (value !== null && typeof value !== "undefined") return String(value).toLowerCase().replace(/^p/, "");
            }
        } catch (error) {}
        return "";
    }

    function selectBestQuality() {
        if (state.qualityDone) return;
        seedPreference();
        state.qualityAttempts++;
        if (state.qualityAttempts > 180) {
            state.qualityDone = true;
            return;
        }

        var option1080 = resolutionNode("1080", "蓝光");
        var option720 = resolutionNode("720", "超清");
        var desired = option1080 ? "1080" : (option720 ? "720" : "");
        var option = option1080 || option720;
        var active = activeResolution();
        if (active === "1080" || (desired && active === desired)) {
            state.qualityDone = true;
            try { window.localStorage.setItem("cctv_live_resolution", active); } catch (error) {}
            log("quality confirmed: " + active + "p");
            return;
        }
        if (!option) return;
        if (state.qualityTarget !== desired) {
            state.qualityTarget = desired;
            state.qualityClicks = 0;
        }
        var now = Date.now();
        if (state.qualityClicks >= 3 || now - state.lastQualityClickAt < 1800) {
            if (state.qualityClicks >= 3) state.qualityDone = true;
            return;
        }
        var showButton = null;
        try { showButton = document.getElementById("player_resolution_show_player") || document.querySelector("[id^='player_resolution_show_']"); } catch (error2) {}
        if (showButton) clickElement(showButton);
        if (clickElement(option)) {
            state.qualityClicks++;
            state.lastQualityClickAt = now;
            try { window.localStorage.setItem("cctv_live_resolution", desired); } catch (error3) {}
            log("quality requested: " + desired + "p");
        }
    }

    function loop() {
        if (state.stopped) return;
        try { setupFullscreen(false); } catch (error) {}
        try { selectBestQuality(); } catch (error2) {}
        state.timer = setTimeout(loop, 500);
    }

    function onGesture(event) {
        if (event && event.isTrusted === false) return;
        setupFullscreen(true);
    }

    state.stop = function () {
        state.stopped = true;
        if (state.timer) clearTimeout(state.timer);
    };

    seedPreference();
    try { document.addEventListener("keydown", onGesture, true); } catch (error) {}
    try { document.addEventListener("click", onGesture, true); } catch (error2) {}
    try { document.addEventListener("touchend", onGesture, true); } catch (error3) {}
    setTimeout(loop, 0);
}


/* CCTV News source 3 uses AliPlayer inside a low-z-index React container.
   Its "open app" footer is a sibling with z-index:999, so a fixed #player can
   still be covered at the bottom even with a very high child z-index.  This
   patch is serialized only for m-live.cctvnews landscape pages. */
function wvtk_isCctvSource3Url(url) {
    var address = String(url || "").toLowerCase();
    return address.indexOf("://m-live.cctvnews.cctv.com/live/landscape") !== -1;
}

function wvtk_cctv_source3_fullscreen_boot(config) {
    "use strict";

    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (window.__WVTK_CCTV_SOURCE3_FULLSCREEN__) return;

    var state = {
        version: String(config && config.version || ""),
        stopped: false,
        timer: null
    };
    window.__WVTK_CCTV_SOURCE3_FULLSCREEN__ = state;

    function setImportant(element, name, value) {
        try { if (element && element.style) element.style.setProperty(name, value, "important"); } catch (error) {}
    }

    function parentOrHost(node) {
        if (!node) return null;
        try { if (node.parentElement) return node.parentElement; } catch (error) {}
        try {
            var root = node.getRootNode ? node.getRootNode() : null;
            if (root && root.host) return root.host;
        } catch (error2) {}
        return null;
    }

    function outerPlayerContainer(player) {
        var node = player;
        for (var depth = 0; node && depth < 12; depth++) {
            try {
                if (node.classList && node.classList.contains("player-container")) return node;
            } catch (error) {}
            node = parentOrHost(node);
        }
        return null;
    }

    function hidePageFooter() {
        var overlays = [];
        try { overlays = document.querySelectorAll(".open-app-footer-container,.open-app-footer"); } catch (error) {}
        for (var index = 0; index < overlays.length; index++) {
            var overlay = overlays[index];
            setImportant(overlay, "display", "none");
            setImportant(overlay, "visibility", "hidden");
            setImportant(overlay, "height", "0");
            setImportant(overlay, "min-height", "0");
            setImportant(overlay, "padding", "0");
            setImportant(overlay, "border", "0");
            setImportant(overlay, "pointer-events", "none");
        }
    }

    function reinforceFullscreenStack() {
        var player = null;
        try { player = document.getElementById("player") || document.querySelector(".prism-player"); } catch (error) {}

        hidePageFooter();
        if (!player) return;

        /* Lift the OUTER React stacking context above the footer.  Raising only
           #player cannot escape .player-container's original z-index:1. */
        var outer = outerPlayerContainer(player);
        if (outer) {
            setImportant(outer, "z-index", "2147483647");
            setImportant(outer, "overflow", "visible");
            setImportant(outer, "visibility", "visible");
            setImportant(outer, "opacity", "1");
        }

        /* Do not touch the AliPlayer video, blob URL, transform, dimensions, or
           playback-owned styles.  The unchanged v2 engine already sizes
           #player; this patch only repairs its outer stacking context. */
    }

    function loop() {
        if (state.stopped) return;
        try { reinforceFullscreenStack(); } catch (error) {}
        state.timer = setTimeout(loop, 500);
    }

    state.stop = function () {
        state.stopped = true;
        if (state.timer) clearTimeout(state.timer);
    };

    setTimeout(loop, 0);
}

function main(item) {
    var target = wvtk_queryParam(item, "id");
    var extra = wvtk_queryParam(item, "extra");
    if (!target && item && item.url && !/[?&]id=/.test(String(item.url))) target = String(item.url);
    if (!/^https?:\/\//i.test(target)) return {url: target};

    /* Keep the v2 page engine unchanged and append only the patch belonging
       to the detected source.  Unrelated channels serialize no patch code. */
    var isCctvSource1 = wvtk_isCctvSource1Url(target);
    var isCctvSource3 = wvtk_isCctvSource3Url(target);
    var adapter = isCctvSource1 ? {
        url: "tv.cctv.com/live/",
        ua: "PC",
        videoElementCondition: "e.id === 'player'",
        needEnterFullscreenButton: false,
        enterFullscreenButtonCondition: "true",
        needPlayButton: false,
        playButtonCondition: "true",
        needPreClick: false,
        preClickElementCondition: "true",
        needPreClick2: false,
        preClickElementCondition2: "true"
    } : wvtk_findAdapter(target);
    var useMobile = String(adapter.ua || "PC").toUpperCase() === "MOBILE" ||
        /(^|\.)cditv\.cn/i.test(target) || /(^|\.)cbg\.cn/i.test(target);
    var headers = {
        "User-Agent": useMobile ? WVTK_CONFIG.mobileUserAgent : WVTK_CONFIG.pcUserAgent,
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
        "X-Requested-With": "android"
    };
    var pageConfig = {
        version: WVTK_CONFIG.version,
        /* Prevent v2's CCTV-specific 720p selector from competing with the
           source-1-only best-quality selector.  The real page URL is still
           returned as webview and is passed separately to the patch. */
        sourceUrl: isCctvSource1 ? "wvtk-cctv-source1://page" : target,
        extra: extra,
        adapter: adapter
    };
    var jscode = "(" + wvtk_webview_boot.toString() + ")(" + JSON.stringify(pageConfig) + ");";
    if (isCctvSource1) {
        var source1Config = {
            version: "2026-07-27-source1-only",
            sourceUrl: target
        };
        jscode += "(" + wvtk_cctv_source1_boot.toString() + ")(" + JSON.stringify(source1Config) + ");";
    } else if (isCctvSource3) {
        var source3Config = {
            version: "2026-07-28-source3-footer-fix",
            sourceUrl: target
        };
        jscode += "(" + wvtk_cctv_source3_fullscreen_boot.toString() + ")(" + JSON.stringify(source3Config) + ");";
    }
    return {webview: target, headers: headers, jscode: jscode};
}
