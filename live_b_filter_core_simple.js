/* 海宝过滤核心 - 从你的最终版改造 */

function runFilter() {
    var SOURCE_URL = "http://38.75.136.137:88/api/tvlist.php";
    var PARSER_URL = "http://A/ku9/py/live_b_ku9.py";
    var SOURCE_HEADERS = {"User-Agent": "okhttp/3.12.13", "Accept": "*/*"};
    var BLOCKED_HOST = "live." + String.fromCharCode(104, 97, 105, 98, 97, 111, 51, 54, 53) + ".cn";

    function textValue(value) {
        return value === null || value === undefined ? "" : String(value);
    }

    function requestBody(url, headers) {
        try {
            var response = ku9.request(url, "GET", headers || {}, "", true);
            if (response && Number(response.code) >= 200 && Number(response.code) < 300) {
                return textValue(response.body);
            }
        } catch (ignoreRequest) {
        }
        try {
            return textValue(ku9.get(url, headers || null));
        } catch (ignoreGet) {
            return "";
        }
    }

    function sourceHost(source) {
        var match = /^https?:\/\/(?:[^@\/]+@)?(\[[^\]]+\]|[^:\/?#]+)/i.exec(textValue(source).trim());
        if (!match) {
            return "";
        }
        return textValue(match[1]).replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
    }

    function isBlockedSource(source) {
        var host = sourceHost(source);
        return host === BLOCKED_HOST ||
            (host.length > BLOCKED_HOST.length &&
             host.slice(-(BLOCKED_HOST.length + 1)) === "." + BLOCKED_HOST);
    }

    function validUpstream(body) {
        var value = textValue(body);
        var lowered = value.replace(/^\s+/, "").slice(0, 128).toLowerCase();
        if (!value || lowered.indexOf("<!doctype") === 0 || lowered.indexOf("<html") === 0) {
            return false;
        }
        return value.indexOf(",#genre#") !== -1 &&
            /,\s*(?:https?|rtmp|rtsp|udp|rtp):\/\//i.test(value);
    }

    function wrapSource(source) {
        return PARSER_URL + "?src=" + encodeURIComponent(source) + "&current_auth=1";
    }

    function isGroupSource(source) {
        return /^#genre#(?:,|$)/i.test(textValue(source).trim());
    }

    function filterPlaylist(body) {
        var normalized = textValue(body).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var hadFinalNewline = /\n$/.test(normalized);
        var lines = normalized.split("\n");
        var output = [];
        for (var i = 0; i < lines.length; i += 1) {
            var line = lines[i];
            var comma = line.indexOf(",");
            if (comma < 0) {
                output.push(line);
                continue;
            }
            var name = line.slice(0, comma);
            var source = line.slice(comma + 1);
            if (isGroupSource(source)) {
                output.push(line);
                continue;
            }
            if (isBlockedSource(source)) {
                continue;
            }
            output.push(name + "," + wrapSource(source));
        }
        var result = output.join("\n");
        if (hadFinalNewline && result.slice(-1) !== "\n") {
            result += "\n";
        }
        return result;
    }

    var body = requestBody(SOURCE_URL, SOURCE_HEADERS);
    if (validUpstream(body)) {
        return filterPlaylist(body);
    }
    return "";
}
