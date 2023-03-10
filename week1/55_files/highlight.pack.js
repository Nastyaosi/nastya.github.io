var hljs = new function() {
    function l(o) {
        return o.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }
    function b(p) {
        for (var o = p.firstChild; o; o = o.nextSibling) {
            if (o.nodeName == "CODE") {
                return o
            }
            if (!(o.nodeType == 3 && o.nodeValue.match(/\s+/))) {
                break
            }
        }
    }
    function h(p, o) {
        return Array.prototype.map.call(p.childNodes, function(q) {
            if (q.nodeType == 3) {
                return o ? q.nodeValue.replace(/\n/g, "") : q.nodeValue
            }
            if (q.nodeName == "BR") {
                return"\n"
            }
            return h(q, o)
        }).join("")
    }
    function a(q) {
        var p = (q.className + " " + (q.parentNode ? q.parentNode.className : "")).split(/\s+/);
        p = p.map(function(r) {
            return r.replace(/^language-/, "")
        });
        for (var o = 0; o < p.length; o++) {
            if (e[p[o]] || p[o] == "no-highlight") {
                return p[o]
            }
        }
    }
    function c(q) {
        var o = [];
        (function p(r, s) {
            for (var t = r.firstChild; t; t = t.nextSibling) {
                if (t.nodeType == 3) {
                    s += t.nodeValue.length
                } else {
                    if (t.nodeName == "BR") {
                        s += 1
                    } else {
                        if (t.nodeType == 1) {
                            o.push({event: "start", offset: s, node: t});
                            s = p(t, s);
                            o.push({event: "stop", offset: s, node: t})
                        }
                    }
                }
            }
            return s
        })(q, 0);
        return o
    }
    function j(x, v, w) {
        var p = 0;
        var y = "";
        var r = [];
        function t() {
            if (x.length && v.length) {
                if (x[0].offset != v[0].offset) {
                    return(x[0].offset < v[0].offset) ? x : v
                } else {
                    return v[0].event == "start" ? x : v
                }
            } else {
                return x.length ? x : v
            }
        }
        function s(A) {
            function z(B) {
                return" " + B.nodeName + '="' + l(B.value) + '"'
            }
            return"<" + A.nodeName + Array.prototype.map.call(A.attributes, z).join("") + ">"
        }
        while (x.length || v.length) {
            var u = t().splice(0, 1)[0];
            y += l(w.substr(p, u.offset - p));
            p = u.offset;
            if (u.event == "start") {
                y += s(u.node);
                r.push(u.node)
            } else {
                if (u.event == "stop") {
                    var o, q = r.length;
                    do {
                        q--;
                        o = r[q];
                        y += ("</" + o.nodeName.toLowerCase() + ">")
                    } while (o != u.node);
                    r.splice(q, 1);
                    while (q < r.length) {
                        y += s(r[q]);
                        q++
                    }
                }
            }
        }
        return y + l(w.substr(p))
    }
    function f(r) {
        function o(s) {
            return(s && s.source) || s
        }
        function p(t, s) {
            return RegExp(o(t), "m" + (r.cI ? "i" : "") + (s ? "g" : ""))
        }
        function q(z, x) {
            if (z.compiled) {
                return
            }
            z.compiled = true;
            var u = [];
            if (z.k) {
                var s = {};
                function A(B, t) {
                    t.split(" ").forEach(function(C) {
                        var D = C.split("|");
                        s[D[0]] = [B, D[1] ? Number(D[1]) : 1];
                        u.push(D[0])
                    })
                }
                z.lR = p(z.l || hljs.IR + "(?!\\.)", true);
                if (typeof z.k == "string") {
                    A("keyword", z.k)
                } else {
                    for (var y in z.k) {
                        if (!z.k.hasOwnProperty(y)) {
                            continue
                        }
                        A(y, z.k[y])
                    }
                }
                z.k = s
            }
            if (x) {
                if (z.bWK) {
                    z.b = "\\b(" + u.join("|") + ")\\b(?!\\.)\\s*"
                }
                z.bR = p(z.b ? z.b : "\\B|\\b");
                if (!z.e && !z.eW) {
                    z.e = "\\B|\\b"
                }
                if (z.e) {
                    z.eR = p(z.e)
                }
                z.tE = o(z.e) || "";
                if (z.eW && x.tE) {
                    z.tE += (z.e ? "|" : "") + x.tE
                }
            }
            if (z.i) {
                z.iR = p(z.i)
            }
            if (z.r === undefined) {
                z.r = 1
            }
            if (!z.c) {
                z.c = []
            }
            for (var w = 0; w < z.c.length; w++) {
                if (z.c[w] == "self") {
                    z.c[w] = z
                }
                q(z.c[w], z)
            }
            if (z.starts) {
                q(z.starts, x)
            }
            var v = [];
            for (var w = 0; w < z.c.length; w++) {
                v.push(o(z.c[w].b))
            }
            if (z.tE) {
                v.push(o(z.tE))
            }
            if (z.i) {
                v.push(o(z.i))
            }
            z.t = v.length ? p(v.join("|"), true) : {exec: function(t) {
                    return null
                }}
        }
        q(r)
    }
    function d(E, F, C) {
        function o(r, N) {
            for (var M = 0; M < N.c.length; M++) {
                var L = N.c[M].bR.exec(r);
                if (L && L.index == 0) {
                    return N.c[M]
                }
            }
        }
        function s(L, r) {
            if (L.e && L.eR.test(r)) {
                return L
            }
            if (L.eW) {
                return s(L.parent, r)
            }
        }
        function t(r, L) {
            return !C && L.i && L.iR.test(r)
        }
        function y(M, r) {
            var L = G.cI ? r[0].toLowerCase() : r[0];
            return M.k.hasOwnProperty(L) && M.k[L]
        }
        function H() {
            var L = l(w);
            if (!A.k) {
                return L
            }
            var r = "";
            var O = 0;
            A.lR.lastIndex = 0;
            var M = A.lR.exec(L);
            while (M) {
                r += L.substr(O, M.index - O);
                var N = y(A, M);
                if (N) {
                    v += N[1];
                    r += '<span class="' + N[0] + '">' + M[0] + "</span>"
                } else {
                    r += M[0]
                }
                O = A.lR.lastIndex;
                M = A.lR.exec(L)
            }
            return r + L.substr(O)
        }
        function z() {
            if (A.sL && !e[A.sL]) {
                return l(w)
            }
            var r = A.sL ? d(A.sL, w) : g(w);
            if (A.r > 0) {
                v += r.keyword_count;
                B += r.r
            }
            return'<span class="' + r.language + '">' + r.value + "</span>"
        }
        function K() {
            return A.sL !== undefined ? z() : H()
        }
        function J(M, r) {
            var L = M.cN ? '<span class="' + M.cN + '">' : "";
            if (M.rB) {
                x += L;
                w = ""
            } else {
                if (M.eB) {
                    x += l(r) + L;
                    w = ""
                } else {
                    x += L;
                    w = r
                }
            }
            A = Object.create(M, {parent: {value: A}})
        }
        function D(L, r) {
            w += L;
            if (r === undefined) {
                x += K();
                return 0
            }
            var N = o(r, A);
            if (N) {
                x += K();
                J(N, r);
                return N.rB ? 0 : r.length
            }
            var O = s(A, r);
            if (O) {
                var M = A;
                if (!(M.rE || M.eE)) {
                    w += r
                }
                x += K();
                do {
                    if (A.cN) {
                        x += "</span>"
                    }
                    B += A.r;
                    A = A.parent
                } while (A != O.parent);
                if (M.eE) {
                    x += l(r)
                }
                w = "";
                if (O.starts) {
                    J(O.starts, "")
                }
                return M.rE ? 0 : r.length
            }
            if (t(r, A)) {
                throw new Error('Illegal lexem "' + r + '" for mode "' + (A.cN || "<unnamed>") + '"')
            }
            w += r;
            return r.length || 1
        }
        var G = e[E];
        f(G);
        var A = G;
        var w = "";
        var B = 0;
        var v = 0;
        var x = "";
        try {
            var u, q, p = 0;
            while (true) {
                A.t.lastIndex = p;
                u = A.t.exec(F);
                if (!u) {
                    break
                }
                q = D(F.substr(p, u.index - p), u[0]);
                p = u.index + q
            }
            D(F.substr(p));
            return{r: B, keyword_count: v, value: x, language: E}
        } catch (I) {
            if (I.message.indexOf("Illegal") != -1) {
                return{r: 0, keyword_count: 0, value: l(F)}
            } else {
                throw I
            }
        }
    }
    function g(s) {
        var o = {keyword_count: 0, r: 0, value: l(s)};
        var q = o;
        for (var p in e) {
            if (!e.hasOwnProperty(p)) {
                continue
            }
            var r = d(p, s, false);
            r.language = p;
            if (r.keyword_count + r.r > q.keyword_count + q.r) {
                q = r
            }
            if (r.keyword_count + r.r > o.keyword_count + o.r) {
                q = o;
                o = r
            }
        }
        if (q.language) {
            o.second_best = q
        }
        return o
    }
    function i(q, p, o) {
        if (p) {
            q = q.replace(/^((<[^>]+>|\t)+)/gm, function(r, v, u, t) {
                return v.replace(/\t/g, p)
            })
        }
        if (o) {
            q = q.replace(/\n/g, "<br>")
        }
        return q
    }
    function m(r, u, p) {
        var v = h(r, p);
        var t = a(r);
        if (t == "no-highlight") {
            return
        }
        var w = t ? d(t, v, true) : g(v);
        t = w.language;
        var o = c(r);
        if (o.length) {
            var q = document.createElement("pre");
            q.innerHTML = w.value;
            w.value = j(o, c(q), v)
        }
        w.value = i(w.value, u, p);
        var s = r.className;
        if (!s.match("(\\s|^)(language-)?" + t + "(\\s|$)")) {
            s = s ? (s + " " + t) : t
        }
        r.innerHTML = w.value;
        r.className = s;
        r.result = {language: t, kw: w.keyword_count, re: w.r};
        if (w.second_best) {
            r.second_best = {language: w.second_best.language, kw: w.second_best.keyword_count, re: w.second_best.r}
        }
    }
    function n() {
        if (n.called) {
            return
        }
        n.called = true;
        Array.prototype.map.call(document.getElementsByTagName("pre"), b).filter(Boolean).forEach(function(o) {
            m(o, hljs.tabReplace)
        })
    }
    function k() {
        window.addEventListener("DOMContentLoaded", n, false);
        window.addEventListener("load", n, false)
    }
    var e = {};
    this.LANGUAGES = e;
    this.highlight = d;
    this.highlightAuto = g;
    this.fixMarkup = i;
    this.highlightBlock = m;
    this.initHighlighting = n;
    this.initHighlightingOnLoad = k;
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    this.BNR = "\\b(0b[01]+)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.BE = {b: "\\\\[\\s\\S]", r: 0};
    this.ASM = {cN: "string", b: "'", e: "'", i: "\\n", c: [this.BE], r: 0};
    this.QSM = {cN: "string", b: '"', e: '"', i: "\\n", c: [this.BE], r: 0};
    this.CLCM = {cN: "comment", b: "//", e: "$"};
    this.CBLCLM = {cN: "comment", b: "/\\*", e: "\\*/"};
    this.HCM = {cN: "comment", b: "#", e: "$"};
    this.NM = {cN: "number", b: this.NR, r: 0};
    this.CNM = {cN: "number", b: this.CNR, r: 0};
    this.BNM = {cN: "number", b: this.BNR, r: 0};
    this.REGEXP_MODE = {cN: "regexp", b: /\//, e: /\/[gim]*/, i: /\n/, c: [this.BE, {b: /\[/, e: /\]/, r: 0, c: [this.BE]}]};
    this.inherit = function(q, r) {
        var o = {};
        for (var p in q) {
            o[p] = q[p]
        }
        if (r) {
            for (var p in r) {
                o[p] = r[p]
            }
        }
        return o
    }
}();
hljs.LANGUAGES.javascript = function(a) {
    return{k: {keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const", literal: "true false null undefined NaN Infinity"}, c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, {b: /</, e: />;/, sL: "xml"}], r: 0}, {cN: "function", bWK: true, e: /{/, k: "function", c: [{cN: "title", b: /[A-Za-z$_][0-9A-Za-z$_]*/}, {cN: "params", b: /\(/, e: /\)/, c: [a.CLCM, a.CBLCLM], i: /["'\(]/}], i: /\[|%/}]}
}(hljs);
hljs.LANGUAGES.css = function(a) {
    var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var c = {cN: "function", b: b + "\\(", e: "\\)", c: ["self", a.NM, a.ASM, a.QSM]};
    return{cI: true, i: "[=/|']", c: [a.CBLCLM, {cN: "id", b: "\\#[A-Za-z0-9_-]+"}, {cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0}, {cN: "attr_selector", b: "\\[", e: "\\]", i: "$"}, {cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"}, {cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page"}, {cN: "at_rule", b: "@", e: "[{;]", c: [{cN: "keyword", b: /\S+/}, {b: /\s/, eW: true, eE: true, r: 0, c: [c, a.ASM, a.QSM, a.NM]}]}, {cN: "tag", b: b, r: 0}, {cN: "rules", b: "{", e: "}", i: "[^\\s]", r: 0, c: [a.CBLCLM, {cN: "rule", b: "[^\\s]", rB: true, e: ";", eW: true, c: [{cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: true, i: "[^\\s]", starts: {cN: "value", eW: true, eE: true, c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, {cN: "hexcolor", b: "#[0-9A-Fa-f]+"}, {cN: "important", b: "!important"}]}}]}]}]}
}(hljs);
hljs.LANGUAGES.xml = function(a) {
    var c = "[A-Za-z0-9\\._:-]+";
    var b = {eW: true, r: 0, c: [{cN: "attribute", b: c, r: 0}, {b: '="', rB: true, e: '"', c: [{cN: "value", b: '"', eW: true}]}, {b: "='", rB: true, e: "'", c: [{cN: "value", b: "'", eW: true}]}, {b: "=", c: [{cN: "value", b: "[^\\s/>]+"}]}]};
    return{cI: true, c: [{cN: "pi", b: "<\\?", e: "\\?>", r: 10}, {cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{b: "\\[", e: "\\]"}]}, {cN: "comment", b: "<!--", e: "-->", r: 10}, {cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10}, {cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: {title: "style"}, c: [b], starts: {e: "</style>", rE: true, sL: "css"}}, {cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: {title: "script"}, c: [b], starts: {e: "<\/script>", rE: true, sL: "javascript"}}, {b: "<%", e: "%>", sL: "vbscript"}, {cN: "tag", b: "</?", e: "/?>", r: 0, c: [{cN: "title", b: "[^ /><]+"}, b]}]}
}(hljs);
hljs.LANGUAGES.http = function(a) {
    return{i: "\\S", c: [{cN: "status", b: "^HTTP/[0-9\\.]+", e: "$", c: [{cN: "number", b: "\\b\\d{3}\\b"}]}, {cN: "request", b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$", rB: true, e: "$", c: [{cN: "string", b: " ", e: " ", eB: true, eE: true}]}, {cN: "attribute", b: "^\\w", e: ": ", eE: true, i: "\\n|\\s|=", starts: {cN: "string", e: "$"}}, {b: "\\n\\n", starts: {sL: "", eW: true}}]}
}(hljs);
hljs.LANGUAGES.php = function(a) {
    var e = {cN: "variable", b: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"};
    var b = [a.inherit(a.ASM, {i: null}), a.inherit(a.QSM, {i: null}), {cN: "string", b: 'b"', e: '"', c: [a.BE]}, {cN: "string", b: "b'", e: "'", c: [a.BE]}];
    var c = [a.BNM, a.CNM];
    var d = {cN: "title", b: a.UIR};
    return{cI: true, k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return implements parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ enddeclare final try this switch continue endfor endif declare unset true false namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler", c: [a.CLCM, a.HCM, {cN: "comment", b: "/\\*", e: "\\*/", c: [{cN: "phpdoc", b: "\\s@[A-Za-z]+"}]}, {cN: "comment", eB: true, b: "__halt_compiler.+?;", eW: true}, {cN: "string", b: "<<<['\"]?\\w+['\"]?$", e: "^\\w+;", c: [a.BE]}, {cN: "preprocessor", b: "<\\?php", r: 10}, {cN: "preprocessor", b: "\\?>"}, e, {cN: "function", bWK: true, e: "{", k: "function", i: "\\$|\\[|%", c: [d, {cN: "params", b: "\\(", e: "\\)", c: ["self", e, a.CBLCLM].concat(b).concat(c)}]}, {cN: "class", bWK: true, e: "{", k: "class", i: "[:\\(\\$]", c: [{bWK: true, eW: true, k: "extends", c: [d]}, d]}, {b: "=>"}].concat(b).concat(c)}
}(hljs);
hljs.LANGUAGES.sql = function(a) {
    return{cI: true, c: [{cN: "operator", b: "(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b(?!:)", e: ";", eW: true, k: {keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row", aggregate: "count sum min max avg"}, c: [{cN: "string", b: "'", e: "'", c: [a.BE, {b: "''"}], r: 0}, {cN: "string", b: '"', e: '"', c: [a.BE, {b: '""'}], r: 0}, {cN: "string", b: "`", e: "`", c: [a.BE]}, a.CNM]}, a.CBLCLM, {cN: "comment", b: "--", e: "$"}]}
}(hljs);