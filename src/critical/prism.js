/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+docker+elixir+elm+git+go+haskell+javadoclike+json+json5+lua+markdown+markup-templating+mongodb+nginx+perl+php+phpdoc+php-extras+purescript+python+jsx+rust+scss+sql+toml+typoscript+wasm&plugins=line-highlight */
var _self =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof WorkerGlobalScope &&
              self instanceof WorkerGlobalScope
                ? self
                : {},
    Prism = (function(u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            M = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler:
                    u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof W
                            ? new W(n.type, e(n.content), n.alias)
                            : Array.isArray(n)
                                ? n.map(e)
                                : n
                                      .replace(/&/g, '&amp;')
                                      .replace(/</g, '&lt;')
                                      .replace(/\u00a0/g, ' ')
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return (
                            e.__id ||
                                Object.defineProperty(e, '__id', {
                                    value: ++n,
                                }),
                            e.__id
                        )
                    },
                    clone: function r(e, t) {
                        var a, n
                        switch (((t = t || {}), M.util.type(e))) {
                            case 'Object':
                                if (((n = M.util.objId(e)), t[n])) return t[n]
                                for (var i in ((a = {}), (t[n] = a), e))
                                    e.hasOwnProperty(i) && (a[i] = r(e[i], t))
                                return a
                            case 'Array':
                                return (
                                    (n = M.util.objId(e)),
                                    t[n]
                                        ? t[n]
                                        : ((a = []),
                                          (t[n] = a),
                                          e.forEach(function(e, n) {
                                              a[n] = r(e, t)
                                          }),
                                          a)
                                )
                            default:
                                return e
                        }
                    },
                    getLanguage: function(e) {
                        for (; e && !c.test(e.className); ) e = e.parentElement
                        return e
                            ? (e.className.match(c) || [
                                  ,
                                  'none',
                              ])[1].toLowerCase()
                            : 'none'
                    },
                    currentScript: function() {
                        if ('undefined' == typeof document) return null
                        if ('currentScript' in document)
                            return document.currentScript
                        try {
                            throw new Error()
                        } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(
                                e.stack
                            ) || [])[1]
                            if (n) {
                                var r = document.getElementsByTagName('script')
                                for (var t in r) if (r[t].src == n) return r[t]
                            }
                            return null
                        }
                    },
                    isActive: function(e, n, r) {
                        for (var t = 'no-' + n; e; ) {
                            var a = e.classList
                            if (a.contains(n)) return !0
                            if (a.contains(t)) return !1
                            e = e.parentElement
                        }
                        return !!r
                    },
                },
                languages: {
                    extend: function(e, n) {
                        var r = M.util.clone(M.languages[e])
                        for (var t in n) r[t] = n[t]
                        return r
                    },
                    insertBefore: function(r, e, n, t) {
                        var a = (t = t || M.languages)[r],
                            i = {}
                        for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                if (l == e)
                                    for (var o in n)
                                        n.hasOwnProperty(o) && (i[o] = n[o])
                                n.hasOwnProperty(l) || (i[l] = a[l])
                            }
                        var s = t[r]
                        return (
                            (t[r] = i),
                            M.languages.DFS(M.languages, function(e, n) {
                                n === s && e != r && (this[e] = i)
                            }),
                            i
                        )
                    },
                    DFS: function e(n, r, t, a) {
                        a = a || {}
                        var i = M.util.objId
                        for (var l in n)
                            if (n.hasOwnProperty(l)) {
                                r.call(n, l, n[l], t || l)
                                var o = n[l],
                                    s = M.util.type(o)
                                'Object' !== s || a[i(o)]
                                    ? 'Array' !== s ||
                                      a[i(o)] ||
                                      ((a[i(o)] = !0), e(o, r, l, a))
                                    : ((a[i(o)] = !0), e(o, r, null, a))
                            }
                    },
                },
                plugins: {},
                highlightAll: function(e, n) {
                    M.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function(e, n, r) {
                    var t = {
                        callback: r,
                        container: e,
                        selector:
                            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                    }
                    M.hooks.run('before-highlightall', t),
                        (t.elements = Array.prototype.slice.apply(
                            t.container.querySelectorAll(t.selector)
                        )),
                        M.hooks.run('before-all-elements-highlight', t)
                    for (var a, i = 0; (a = t.elements[i++]); )
                        M.highlightElement(a, !0 === n, t.callback)
                },
                highlightElement: function(e, n, r) {
                    var t = M.util.getLanguage(e),
                        a = M.languages[t]
                    e.className =
                        e.className.replace(c, '').replace(/\s+/g, ' ') +
                        ' language-' +
                        t
                    var i = e.parentElement
                    i &&
                        'pre' === i.nodeName.toLowerCase() &&
                        (i.className =
                            i.className.replace(c, '').replace(/\s+/g, ' ') +
                            ' language-' +
                            t)
                    var l = {
                        element: e,
                        language: t,
                        grammar: a,
                        code: e.textContent,
                    }
                    function o(e) {
                        (l.highlightedCode = e),
                            M.hooks.run('before-insert', l),
                            (l.element.innerHTML = l.highlightedCode),
                            M.hooks.run('after-highlight', l),
                            M.hooks.run('complete', l),
                            r && r.call(l.element)
                    }
                    if ((M.hooks.run('before-sanity-check', l), !l.code))
                        return (
                            M.hooks.run('complete', l),
                            void (r && r.call(l.element))
                        )
                    if ((M.hooks.run('before-highlight', l), l.grammar))
                        if (n && u.Worker) {
                            var s = new Worker(M.filename)
                            ;(s.onmessage = function(e) {
                                o(e.data)
                            }),
                                s.postMessage(
                                    JSON.stringify({
                                        language: l.language,
                                        code: l.code,
                                        immediateClose: !0,
                                    })
                                )
                        } else o(M.highlight(l.code, l.grammar, l.language))
                    else o(M.util.encode(l.code))
                },
                highlight: function(e, n, r) {
                    var t = { code: e, grammar: n, language: r }
                    return (
                        M.hooks.run('before-tokenize', t),
                        (t.tokens = M.tokenize(t.code, t.grammar)),
                        M.hooks.run('after-tokenize', t),
                        W.stringify(M.util.encode(t.tokens), t.language)
                    )
                },
                tokenize: function(e, n) {
                    var r = n.rest
                    if (r) {
                        for (var t in r) n[t] = r[t]
                        delete n.rest
                    }
                    var a = new i()
                    return (
                        I(a, a.head, e),
                        (function e(n, r, t, a, i, l) {
                            for (var o in t)
                                if (t.hasOwnProperty(o) && t[o]) {
                                    var s = t[o]
                                    s = Array.isArray(s) ? s : [s]
                                    for (var u = 0; u < s.length; ++u) {
                                        if (l && l.cause == o + ',' + u) return
                                        var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = c.alias
                                        if (h && !c.pattern.global) {
                                            var v = c.pattern
                                                .toString()
                                                .match(/[imsuy]*$/)[0]
                                            c.pattern = RegExp(
                                                c.pattern.source,
                                                v + 'g'
                                            )
                                        }
                                        for (
                                            var p = c.pattern || c,
                                                m = a.next,
                                                y = i;
                                            m !== r.tail &&
                                            !(l && y >= l.reach);
                                            y += m.value.length, m = m.next
                                        ) {
                                            var k = m.value
                                            if (r.length > n.length) return
                                            if (!(k instanceof W)) {
                                                var b,
                                                    x = 1
                                                if (h) {
                                                    if (!(b = z(p, y, n, f)))
                                                        break
                                                    var w = b.index,
                                                        A =
                                                            b.index +
                                                            b[0].length,
                                                        P = y
                                                    for (
                                                        P += m.value.length;
                                                        P <= w;

                                                    )
                                                        (m = m.next),
                                                            (P +=
                                                                m.value.length)
                                                    if (
                                                        ((P -= m.value.length),
                                                        (y = P),
                                                        m.value instanceof W)
                                                    )
                                                        continue
                                                    for (
                                                        var S = m;
                                                        S !== r.tail &&
                                                        (P < A ||
                                                            'string' ==
                                                                typeof S.value);
                                                        S = S.next
                                                    )
                                                        x++,
                                                            (P +=
                                                                S.value.length)
                                                    x--,
                                                        (k = n.slice(y, P)),
                                                        (b.index -= y)
                                                } else if (!(b = z(p, 0, k, f)))
                                                    continue
                                                var w = b.index,
                                                    E = b[0],
                                                    O = k.slice(0, w),
                                                    L = k.slice(w + E.length),
                                                    N = y + k.length
                                                l &&
                                                    N > l.reach &&
                                                    (l.reach = N)
                                                var j = m.prev
                                                O &&
                                                    ((j = I(r, j, O)),
                                                    (y += O.length)),
                                                    q(r, j, x)
                                                var C = new W(
                                                    o,
                                                    g ? M.tokenize(E, g) : E,
                                                    d,
                                                    E
                                                )
                                                if (
                                                    ((m = I(r, j, C)),
                                                    L && I(r, m, L),
                                                    1 < x)
                                                ) {
                                                    var _ = {
                                                        cause: o + ',' + u,
                                                        reach: N,
                                                    }
                                                    e(n, r, t, m.prev, y, _),
                                                        l &&
                                                            _.reach > l.reach &&
                                                            (l.reach = _.reach)
                                                }
                                            }
                                        }
                                    }
                                }
                        })(e, a, n, a.head, 0),
                        (function(e) {
                            var n = [],
                                r = e.head.next
                            for (; r !== e.tail; ) n.push(r.value), (r = r.next)
                            return n
                        })(a)
                    )
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var r = M.hooks.all
                        ;(r[e] = r[e] || []), r[e].push(n)
                    },
                    run: function(e, n) {
                        var r = M.hooks.all[e]
                        if (r && r.length)
                            for (var t, a = 0; (t = r[a++]); ) t(n)
                    },
                },
                Token: W,
            }
        function W(e, n, r, t) {
            (this.type = e),
                (this.content = n),
                (this.alias = r),
                (this.length = 0 | (t || '').length)
        }
        function z(e, n, r, t) {
            e.lastIndex = n
            var a = e.exec(r)
            if (a && t && a[1]) {
                var i = a[1].length
                ;(a.index += i), (a[0] = a[0].slice(i))
            }
            return a
        }
        function i() {
            var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null }
            ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
        }
        function I(e, n, r) {
            var t = n.next,
                a = { value: r, prev: n, next: t }
            return (n.next = a), (t.prev = a), e.length++, a
        }
        function q(e, n, r) {
            for (var t = n.next, a = 0; a < r && t !== e.tail; a++) t = t.next
            ;((n.next = t).prev = n), (e.length -= a)
        }
        if (
            ((u.Prism = M),
            (W.stringify = function n(e, r) {
                if ('string' == typeof e) return e
                if (Array.isArray(e)) {
                    var t = ''
                    return (
                        e.forEach(function(e) {
                            t += n(e, r)
                        }),
                        t
                    )
                }
                var a = {
                        type: e.type,
                        content: n(e.content, r),
                        tag: 'span',
                        classes: ['token', e.type],
                        attributes: {},
                        language: r,
                    },
                    i = e.alias
                i &&
                    (Array.isArray(i)
                        ? Array.prototype.push.apply(a.classes, i)
                        : a.classes.push(i)),
                    M.hooks.run('wrap', a)
                var l = ''
                for (var o in a.attributes)
                    l +=
                        ' ' +
                        o +
                        '="' +
                        (a.attributes[o] || '').replace(/"/g, '&quot;') +
                        '"'
                return (
                    '<' +
                    a.tag +
                    ' class="' +
                    a.classes.join(' ') +
                    '"' +
                    l +
                    '>' +
                    a.content +
                    '</' +
                    a.tag +
                    '>'
                )
            }),
            !u.document)
        )
            return (
                u.addEventListener &&
                    (M.disableWorkerMessageHandler ||
                        u.addEventListener(
                            'message',
                            function(e) {
                                var n = JSON.parse(e.data),
                                    r = n.language,
                                    t = n.code,
                                    a = n.immediateClose
                                u.postMessage(
                                    M.highlight(t, M.languages[r], r)
                                ),
                                    a && u.close()
                            },
                            !1
                        )),
                M
            )
        var e = M.util.currentScript()
        function r() {
            M.manual || M.highlightAll()
        }
        if (
            (e &&
                ((M.filename = e.src),
                e.hasAttribute('data-manual') && (M.manual = !0)),
            !M.manual)
        ) {
            var t = document.readyState
            'loading' === t || ('interactive' === t && e && e.defer)
                ? document.addEventListener('DOMContentLoaded', r)
                : window.requestAnimationFrame
                    ? window.requestAnimationFrame(r)
                    : window.setTimeout(r, 16)
        }
        return M
    })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
    'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            'internal-subset': {
                pattern: /(\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
            },
            string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
            punctuation: /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/,
            name: /[^\s<>'"]+/,
        },
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
            },
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [
                        { pattern: /^=/, alias: 'attr-equals' },
                        /"|'/,
                    ],
                },
            },
            punctuation: /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
            },
        },
    },
    entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
        /&#x?[\da-f]{1,8};/i,
    ],
}),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside['internal-subset'].inside =
        Prism.languages.markup),
    Prism.hooks.add('wrap', function(a) {
        'entity' === a.type &&
            (a.attributes.title = a.content.replace(/&amp;/, '&'))
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        value: function(a, e) {
            var s = {}
            ;(s['language-' + e] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[e],
            }),
                (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
            var n = {
                'included-cdata': {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: s,
                },
            }
            n['language-' + e] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[e],
            }
            var t = {}
            ;(t[a] = {
                pattern: RegExp(
                    '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
                        /__/g,
                        function() {
                            return a
                        }
                    ),
                    'i'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore('markup', 'cdata', t)
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml)
!(function(s) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: 'selector',
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0,
                },
            },
        },
        url: {
            pattern: RegExp(
                '\\burl\\((?:' +
                    e.source +
                    '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
                'i'
            ),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
            },
        },
        selector: RegExp(
            '[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
                e.source +
                ')*(?=\\s*\\{)'
        ),
        string: { pattern: e, greedy: !0 },
        property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/,
    }),
        (s.languages.css.atrule.inside.rest = s.languages.css)
    var t = s.languages.markup
    t &&
        (t.tag.addInlined('style', 'css'),
        s.languages.insertBefore(
            'inside',
            'attr-value',
            {
                'style-attr': {
                    pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                    lookbehind: !0,
                    inside: {
                        'attr-value': {
                            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                            inside: {
                                style: {
                                    pattern: /(["'])[\s\S]+(?=["']$)/,
                                    lookbehind: !0,
                                    alias: 'language-css',
                                    inside: s.languages.css,
                                },
                                punctuation: [
                                    { pattern: /^=/, alias: 'attr-equals' },
                                    /"|'/,
                                ],
                            },
                        },
                        'attr-name': /^style/i,
                    },
                },
            },
            t.tag
        ))
})(Prism)
Prism.languages.clike = {
    comment: [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0,
        },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
    },
    'class-name': {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
            lookbehind: !0,
        },
    ],
    keyword: [
        { pattern: /((?:^|})\s*)catch\b/, lookbehind: !0 },
        {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0,
        },
    ],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
    (Prism.languages.javascript[
        'class-name'
    ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                'regex-source': {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: 'language-regex',
                    inside: Prism.languages.regex,
                },
                'regex-flags': /[a-z]+$/,
                'regex-delimiter': /^\/|\/$/,
            },
        },
        'function-variable': {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function',
        },
        parameter: [
            {
                pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        'interpolation-punctuation': {
                            pattern: /^\${|}$/,
                            alias: 'punctuation',
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
    }),
    Prism.languages.markup &&
        Prism.languages.markup.tag.addInlined('script', 'javascript'),
    (Prism.languages.js = Prism.languages.javascript)
!(function(e) {
    var t =
            '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
        n = {
            pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
            lookbehind: !0,
            alias: 'punctuation',
            inside: null,
        },
        a = {
            bash: n,
            environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
            variable: [
                {
                    pattern: /\$?\(\([\s\S]+?\)\)/,
                    greedy: !0,
                    inside: {
                        variable: [
                            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                            /^\$\(\(/,
                        ],
                        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                        operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                        punctuation: /\(\(?|\)\)?|,|;/,
                    },
                },
                {
                    pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                    greedy: !0,
                    inside: { variable: /^\$\(|^`|\)$|`$/ },
                },
                {
                    pattern: /\$\{[^}]+\}/,
                    greedy: !0,
                    inside: {
                        operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                        punctuation: /[\[\]]/,
                        environment: {
                            pattern: RegExp('(\\{)' + t),
                            lookbehind: !0,
                            alias: 'constant',
                        },
                    },
                },
                /\$(?:\w+|[#?*!@$])/,
            ],
            entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
        }
    ;(e.languages.bash = {
        shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
        comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
        'function-name': [
            {
                pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                lookbehind: !0,
                alias: 'function',
            },
            { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
        ],
        'for-or-select': {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: 'variable',
            lookbehind: !0,
        },
        'assign-left': {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
                    lookbehind: !0,
                    alias: 'constant',
                },
            },
            alias: 'variable',
            lookbehind: !0,
        },
        string: [
            {
                pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
                lookbehind: !0,
                greedy: !0,
                inside: a,
            },
            {
                pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                lookbehind: !0,
                greedy: !0,
                inside: { bash: n },
            },
            {
                pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
                lookbehind: !0,
                greedy: !0,
                inside: a,
            },
        ],
        environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
        variable: a.variable,
        function: {
            pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        keyword: {
            pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        builtin: {
            pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: 'class-name',
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
        operator: {
            pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
            inside: {
                'file-descriptor': { pattern: /^\d/, alias: 'important' },
            },
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0,
        },
    }),
        (n.inside = e.languages.bash)
    for (
        var s = [
                'comment',
                'function-name',
                'for-or-select',
                'assign-left',
                'string',
                'environment',
                'function',
                'keyword',
                'builtin',
                'boolean',
                'file-descriptor',
                'operator',
                'punctuation',
                'number',
            ],
            i = a.variable[1].inside,
            o = 0;
        o < s.length;
        o++
    )
        i[s[o]] = e.languages.bash[s[o]]
    e.languages.shell = e.languages.bash
})(Prism)
!(function(e) {
    var r = '(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)'.replace(
            /<SP_BS>/g,
            function() {
                return '\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])'
            }
        ),
        n =
            '"(?:[^"\\\\\r\n]|\\\\(?:\r\n|[^]))*"|\'(?:[^\'\\\\\r\n]|\\\\(?:\r\n|[^]))*\'',
        t = '--[\\w-]+=(?:<STR>|(?!["\'])(?:[^\\s\\\\]|\\\\.)+)'.replace(
            /<STR>/g,
            function() {
                return n
            }
        ),
        o = { pattern: RegExp(n), greedy: !0 },
        i = { pattern: /(^[ \t]*)#.*/m, lookbehind: !0, greedy: !0 }
    function a(e, n) {
        return (
            (e = e
                .replace(/<OPT>/g, function() {
                    return t
                })
                .replace(/<SP>/g, function() {
                    return r
                })),
            RegExp(e, n)
        )
    }
    (e.languages.docker = {
        instruction: {
            pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
            lookbehind: !0,
            greedy: !0,
            inside: {
                options: {
                    pattern: a(
                        '(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*',
                        'i'
                    ),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        property: { pattern: /(^|\s)--[\w-]+/, lookbehind: !0 },
                        string: [
                            o,
                            {
                                pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
                                lookbehind: !0,
                            },
                        ],
                        operator: /\\$/m,
                        punctuation: /=/,
                    },
                },
                keyword: [
                    {
                        pattern: a(
                            '(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b',
                            'i'
                        ),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    {
                        pattern: a(
                            '(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS',
                            'i'
                        ),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    {
                        pattern: a('(^ONBUILD<SP>)\\w+', 'i'),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    { pattern: /^\w+/, greedy: !0 },
                ],
                comment: i,
                string: o,
                variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
                operator: /\\$/m,
            },
        },
        comment: i,
    }),
        (e.languages.dockerfile = e.languages.docker)
})(Prism)
;(Prism.languages.elixir = {
    doc: {
        pattern: /@(?:doc|moduledoc)\s+(?:("""|''')[\s\S]*?\1|("|')(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2)/,
        inside: { attribute: /^@\w+/, string: /['"][\s\S]+/ },
    },
    comment: { pattern: /#.*/m, greedy: !0 },
    regex: {
        pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
        greedy: !0,
    },
    string: [
        {
            pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
            greedy: !0,
            inside: {},
        },
        { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
        {
            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
            inside: {},
        },
    ],
    atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: 'symbol' },
    module: { pattern: /\b[A-Z]\w*\b/, alias: 'class-name' },
    'attr-name': /\w+\??:(?!:)/,
    argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: 'variable' },
    attribute: { pattern: /@\w+/, alias: 'variable' },
    function: /\b[_a-zA-Z]\w*[?!]?(?:(?=\s*(?:\.\s*)?\()|(?=\/\d+))/,
    number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
    keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct|delegate)?|do|else|end|fn|for|if|import|not|or|raise|require|rescue|try|unless|use|when)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    operator: [
        /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
        { pattern: /([^<])<(?!<)/, lookbehind: !0 },
        { pattern: /([^>])>(?!>)/, lookbehind: !0 },
    ],
    punctuation: /<<|>>|[.,%\[\]{}()]/,
}),
    Prism.languages.elixir.string.forEach(function(e) {
        e.inside = {
            interpolation: {
                pattern: /#\{[^}]+\}/,
                inside: {
                    delimiter: { pattern: /^#\{|\}$/, alias: 'punctuation' },
                    rest: Prism.languages.elixir,
                },
            },
        }
    })
Prism.languages.elm = {
    comment: /--.*|{-[\s\S]*?-}/,
    char: {
        pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/,
        greedy: !0,
    },
    string: [
        { pattern: /"""[\s\S]*?"""/, greedy: !0 },
        { pattern: /"(?:[^\\"\r\n]|\\.)*"/, greedy: !0 },
    ],
    'import-statement': {
        pattern: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
        inside: { keyword: /\b(?:import|as|exposing)\b/ },
    },
    keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
    builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
    hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
    constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
    punctuation: /[{}[\]|(),.:]/,
}
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    'commit-sha1': /^commit \w{40}$/m,
}
;(Prism.languages.go = Prism.languages.extend('clike', {
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
})),
    delete Prism.languages.go['class-name']
;(Prism.languages.haskell = {
    comment: {
        pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m,
        lookbehind: !0,
    },
    char: {
        pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
        alias: 'string',
    },
    string: { pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/, greedy: !0 },
    keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    'import-statement': {
        pattern: /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
    },
    builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[-!#$%*+=?&@|~:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
    hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
    constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
    punctuation: /[{}[\];(),.:]/,
}),
    (Prism.languages.hs = Prism.languages.haskell)
!(function(h) {
    function v(e, n) {
        return '___' + e.toUpperCase() + n + '___'
    }
    Object.defineProperties((h.languages['markup-templating'] = {}), {
        buildPlaceholders: {
            value: function(a, r, e, o) {
                if (a.language === r) {
                    var c = (a.tokenStack = [])
                    ;(a.code = a.code.replace(e, function(e) {
                        if ('function' == typeof o && !o(e)) return e
                        for (
                            var n, t = c.length;
                            -1 !== a.code.indexOf((n = v(r, t)));

                        )
                            ++t
                        return (c[t] = e), n
                    })),
                        (a.grammar = h.languages.markup)
                }
            },
        },
        tokenizePlaceholders: {
            value: function(p, k) {
                if (p.language === k && p.tokenStack) {
                    p.grammar = h.languages[k]
                    var m = 0,
                        d = Object.keys(p.tokenStack)
                    !(function e(n) {
                        for (var t = 0; t < n.length && !(m >= d.length); t++) {
                            var a = n[t]
                            if (
                                'string' == typeof a ||
                                (a.content && 'string' == typeof a.content)
                            ) {
                                var r = d[m],
                                    o = p.tokenStack[r],
                                    c = 'string' == typeof a ? a : a.content,
                                    i = v(k, r),
                                    u = c.indexOf(i)
                                if (-1 < u) {
                                    ++m
                                    var g = c.substring(0, u),
                                        l = new h.Token(
                                            k,
                                            h.tokenize(o, p.grammar),
                                            'language-' + k,
                                            o
                                        ),
                                        s = c.substring(u + i.length),
                                        f = []
                                    g && f.push.apply(f, e([g])),
                                        f.push(l),
                                        s && f.push.apply(f, e([s])),
                                        'string' == typeof a
                                            ? n.splice.apply(
                                                  n,
                                                  [t, 1].concat(f)
                                              )
                                            : (a.content = f)
                                }
                            } else a.content && e(a.content)
                        }
                        return n
                    })(p.tokens)
                }
            },
        },
    })
})(Prism)
!(function(a) {
    var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
        t = [
            { pattern: /\b(?:false|true)\b/i, alias: 'boolean' },
            {
                pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
                greedy: !0,
                lookbehind: !0,
            },
            /\b(?:null)\b/i,
            /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
        ],
        i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
        s = /[{}\[\](),:;]/
    a.languages.php = {
        delimiter: {
            pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
            alias: 'important',
        },
        comment: e,
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
            pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            lookbehind: !0,
            inside: { punctuation: /\\/ },
        },
        'class-name-definition': {
            pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
            lookbehind: !0,
            alias: 'class-name',
        },
        keyword: [
            {
                pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
                alias: 'type-casting',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
                alias: 'type-declaration',
                greedy: !0,
            },
            {
                pattern: /(\|\s*)(?:null|false)\b/i,
                alias: 'type-declaration',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /\b(?:parent|self|static)(?=\s*::)/i,
                alias: 'static-context',
                greedy: !0,
            },
            /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
        ],
        'argument-name': {
            pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,
            lookbehind: !0,
        },
        'class-name': [
            {
                pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
                greedy: !0,
                lookbehind: !0,
            },
            { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
            {
                pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /\b[a-z_]\w*(?=\s*\$)/i,
                alias: 'type-declaration',
                greedy: !0,
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                alias: ['class-name-fully-qualified', 'type-declaration'],
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /\b[a-z_]\w*(?=\s*::)/i,
                alias: 'static-context',
                greedy: !0,
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
                alias: ['class-name-fully-qualified', 'static-context'],
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                alias: ['class-name-fully-qualified', 'type-hint'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                alias: ['class-name-fully-qualified', 'return-type'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
        ],
        constant: t,
        function: /\w+\s*(?=\()/,
        property: { pattern: /(->)[\w]+/, lookbehind: !0 },
        number: i,
        operator: n,
        punctuation: s,
    }
    var l = {
            pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
            lookbehind: !0,
            inside: a.languages.php,
        },
        r = [
            {
                pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
                alias: 'nowdoc-string',
                greedy: !0,
                inside: {
                    delimiter: {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { punctuation: /^<<<'?|[';]$/ },
                    },
                },
            },
            {
                pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
                alias: 'heredoc-string',
                greedy: !0,
                inside: {
                    delimiter: {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { punctuation: /^<<<"?|[";]$/ },
                    },
                    interpolation: l,
                },
            },
            {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                alias: 'backtick-quoted-string',
                greedy: !0,
            },
            {
                pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                alias: 'single-quoted-string',
                greedy: !0,
            },
            {
                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                alias: 'double-quoted-string',
                greedy: !0,
                inside: { interpolation: l },
            },
        ]
    a.languages.insertBefore('php', 'variable', { string: r }),
        a.languages.insertBefore('php', 'variable', {
            attribute: {
                pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
                greedy: !0,
                inside: {
                    'attribute-content': {
                        pattern: /^(#\[)[\s\S]+(?=]$)/,
                        lookbehind: !0,
                        inside: {
                            comment: e,
                            string: r,
                            'attribute-class-name': [
                                {
                                    pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                                    alias: 'class-name',
                                    greedy: !0,
                                    lookbehind: !0,
                                },
                                {
                                    pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                                    alias: [
                                        'class-name',
                                        'class-name-fully-qualified',
                                    ],
                                    greedy: !0,
                                    lookbehind: !0,
                                    inside: { punctuation: /\\/ },
                                },
                            ],
                            constant: t,
                            number: i,
                            operator: n,
                            punctuation: s,
                        },
                    },
                    delimiter: { pattern: /^#\[|]$/, alias: 'punctuation' },
                },
            },
        }),
        a.hooks.add('before-tokenize', function(e) {
            if (/<\?/.test(e.code)) {
                a.languages['markup-templating'].buildPlaceholders(
                    e,
                    'php',
                    /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
                )
            }
        }),
        a.hooks.add('after-tokenize', function(e) {
            a.languages['markup-templating'].tokenizePlaceholders(e, 'php')
        })
})(Prism)
!(function(p) {
    var a = (p.languages.javadoclike = {
        parameter: {
            pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
            lookbehind: !0,
        },
        keyword: {
            pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
            lookbehind: !0,
        },
        punctuation: /[{}]/,
    })
    Object.defineProperty(a, 'addSupport', {
        value: function(a, e) {
            'string' == typeof a && (a = [a]),
                a.forEach(function(a) {
                    !(function(a, e) {
                        var n = 'doc-comment',
                            t = p.languages[a]
                        if (t) {
                            var r = t[n]
                            if (!r) {
                                var o = {
                                    'doc-comment': {
                                        pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                                        lookbehind: !0,
                                        alias: 'comment',
                                    },
                                }
                                r = (t = p.languages.insertBefore(
                                    a,
                                    'comment',
                                    o
                                ))[n]
                            }
                            if (
                                (r instanceof RegExp &&
                                    (r = t[n] = { pattern: r }),
                                Array.isArray(r))
                            )
                                for (var i = 0, s = r.length; i < s; i++)
                                    r[i] instanceof RegExp &&
                                        (r[i] = { pattern: r[i] }),
                                        e(r[i])
                            else e(r)
                        }
                    })(a, function(a) {
                        a.inside || (a.inside = {}), (a.inside.rest = e)
                    })
                })
        },
    }),
        a.addSupport(['java', 'javascript', 'php'], a)
})(Prism)
;(Prism.languages.json = {
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
    (Prism.languages.webmanifest = Prism.languages.json)
!(function(n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
    n.languages.json5 = n.languages.extend('json', {
        property: [
            { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
            {
                pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
                alias: 'unquoted',
            },
        ],
        string: { pattern: e, greedy: !0 },
        number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    })
})(Prism)
Prism.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
        greedy: !0,
    },
    number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
        /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
        { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 },
    ],
    punctuation: /[\[\](){},;]|\.+|:+/,
}
!(function(u) {
    function n(n) {
        return (
            (n = n.replace(/<inner>/g, function() {
                return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))'
            })),
            RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')')
        )
    }
    var e = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+',
        t = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(
            /__/g,
            function() {
                return e
            }
        ),
        a =
            '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)'
    ;(u.languages.markdown = u.languages.extend('markup', {})),
        u.languages.insertBefore('markdown', 'prolog', {
            'front-matter-block': {
                pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                    punctuation: /^---|---$/,
                    'font-matter': {
                        pattern: /\S+(?:\s+\S+)*/,
                        alias: ['yaml', 'language-yaml'],
                        inside: u.languages.yaml,
                    },
                },
            },
            blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
            table: {
                pattern: RegExp('^' + t + a + '(?:' + t + ')*', 'm'),
                inside: {
                    'table-data-rows': {
                        pattern: RegExp('^(' + t + a + ')(?:' + t + ')*$'),
                        lookbehind: !0,
                        inside: {
                            'table-data': {
                                pattern: RegExp(e),
                                inside: u.languages.markdown,
                            },
                            punctuation: /\|/,
                        },
                    },
                    'table-line': {
                        pattern: RegExp('^(' + t + ')' + a + '$'),
                        lookbehind: !0,
                        inside: { punctuation: /\||:?-{3,}:?/ },
                    },
                    'table-header-row': {
                        pattern: RegExp('^' + t + '$'),
                        inside: {
                            'table-header': {
                                pattern: RegExp(e),
                                alias: 'important',
                                inside: u.languages.markdown,
                            },
                            punctuation: /\|/,
                        },
                    },
                },
            },
            code: [
                {
                    pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
                    lookbehind: !0,
                    alias: 'keyword',
                },
                { pattern: /``.+?``|`[^`\r\n]+`/, alias: 'keyword' },
                {
                    pattern: /^```[\s\S]*?^```$/m,
                    greedy: !0,
                    inside: {
                        'code-block': {
                            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                            lookbehind: !0,
                        },
                        'code-language': {
                            pattern: /^(```).+/,
                            lookbehind: !0,
                        },
                        punctuation: /```/,
                    },
                },
            ],
            title: [
                {
                    pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
                    alias: 'important',
                    inside: { punctuation: /==+$|--+$/ },
                },
                {
                    pattern: /(^\s*)#.+/m,
                    lookbehind: !0,
                    alias: 'important',
                    inside: { punctuation: /^#+|#+$/ },
                },
            ],
            hr: {
                pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                lookbehind: !0,
                alias: 'punctuation',
            },
            list: {
                pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                lookbehind: !0,
                alias: 'punctuation',
            },
            'url-reference': {
                pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: {
                    variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
                    string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                    punctuation: /^[\[\]!:]|[<>]/,
                },
                alias: 'url',
            },
            bold: {
                pattern: n(
                    '\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^..)[\s\S]+(?=..$)/,
                        lookbehind: !0,
                        inside: {},
                    },
                    punctuation: /\*\*|__/,
                },
            },
            italic: {
                pattern: n(
                    '\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^.)[\s\S]+(?=.$)/,
                        lookbehind: !0,
                        inside: {},
                    },
                    punctuation: /[*_]/,
                },
            },
            strike: {
                pattern: n('(~~?)(?:(?!~)<inner>)+?\\2'),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^~~?)[\s\S]+(?=\1$)/,
                        lookbehind: !0,
                        inside: {},
                    },
                    punctuation: /~~?/,
                },
            },
            url: {
                pattern: n(
                    '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    operator: /^!/,
                    content: {
                        pattern: /(^\[)[^\]]+(?=\])/,
                        lookbehind: !0,
                        inside: {},
                    },
                    variable: {
                        pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                        lookbehind: !0,
                    },
                    url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
                    string: {
                        pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                        lookbehind: !0,
                    },
                },
            },
        }),
        ['url', 'bold', 'italic', 'strike'].forEach(function(e) {
            ['url', 'bold', 'italic', 'strike'].forEach(function(n) {
                e !== n &&
                    (u.languages.markdown[e].inside.content.inside[n] =
                        u.languages.markdown[n])
            })
        }),
        u.hooks.add('after-tokenize', function(n) {
            ('markdown' !== n.language && 'md' !== n.language) ||
                !(function n(e) {
                    if (e && 'string' != typeof e)
                        for (var t = 0, a = e.length; t < a; t++) {
                            var i = e[t]
                            if ('code' === i.type) {
                                var r = i.content[1],
                                    o = i.content[3]
                                if (
                                    r &&
                                    o &&
                                    'code-language' === r.type &&
                                    'code-block' === o.type &&
                                    'string' == typeof r.content
                                ) {
                                    var l = r.content
                                            .replace(/\b#/g, 'sharp')
                                            .replace(/\b\+\+/g, 'pp'),
                                        s =
                                            'language-' +
                                            (l = (/[a-z][\w-]*/i.exec(l) || [
                                                '',
                                            ])[0].toLowerCase())
                                    o.alias
                                        ? 'string' == typeof o.alias
                                            ? (o.alias = [o.alias, s])
                                            : o.alias.push(s)
                                        : (o.alias = [s])
                                }
                            } else n(i.content)
                        }
                })(n.tokens)
        }),
        u.hooks.add('wrap', function(n) {
            if ('code-block' === n.type) {
                for (var e = '', t = 0, a = n.classes.length; t < a; t++) {
                    var i = n.classes[t],
                        r = /language-(.+)/.exec(i)
                    if (r) {
                        e = r[1]
                        break
                    }
                }
                var o = u.languages[e]
                if (o) {
                    var l = document.createElement('div')
                    l.innerHTML = n.content
                    var s = l.textContent
                    n.content = u.highlight(s, o, e)
                } else if (e && 'none' !== e && u.plugins.autoloader) {
                    var d =
                        'md-' +
                        new Date().valueOf() +
                        '-' +
                        Math.floor(1e16 * Math.random())
                    ;(n.attributes.id = d),
                        u.plugins.autoloader.loadLanguages(e, function() {
                            var n = document.getElementById(d)
                            n &&
                                (n.innerHTML = u.highlight(
                                    n.textContent,
                                    u.languages[e],
                                    e
                                ))
                        })
                }
            }
        }),
        (u.languages.md = u.languages.markdown)
})(Prism)
!(function($) {
    var e = [
            '$eq',
            '$gt',
            '$gte',
            '$in',
            '$lt',
            '$lte',
            '$ne',
            '$nin',
            '$and',
            '$not',
            '$nor',
            '$or',
            '$exists',
            '$type',
            '$expr',
            '$jsonSchema',
            '$mod',
            '$regex',
            '$text',
            '$where',
            '$geoIntersects',
            '$geoWithin',
            '$near',
            '$nearSphere',
            '$all',
            '$elemMatch',
            '$size',
            '$bitsAllClear',
            '$bitsAllSet',
            '$bitsAnyClear',
            '$bitsAnySet',
            '$comment',
            '$elemMatch',
            '$meta',
            '$slice',
            '$currentDate',
            '$inc',
            '$min',
            '$max',
            '$mul',
            '$rename',
            '$set',
            '$setOnInsert',
            '$unset',
            '$addToSet',
            '$pop',
            '$pull',
            '$push',
            '$pullAll',
            '$each',
            '$position',
            '$slice',
            '$sort',
            '$bit',
            '$addFields',
            '$bucket',
            '$bucketAuto',
            '$collStats',
            '$count',
            '$currentOp',
            '$facet',
            '$geoNear',
            '$graphLookup',
            '$group',
            '$indexStats',
            '$limit',
            '$listLocalSessions',
            '$listSessions',
            '$lookup',
            '$match',
            '$merge',
            '$out',
            '$planCacheStats',
            '$project',
            '$redact',
            '$replaceRoot',
            '$replaceWith',
            '$sample',
            '$set',
            '$skip',
            '$sort',
            '$sortByCount',
            '$unionWith',
            '$unset',
            '$unwind',
            '$abs',
            '$accumulator',
            '$acos',
            '$acosh',
            '$add',
            '$addToSet',
            '$allElementsTrue',
            '$and',
            '$anyElementTrue',
            '$arrayElemAt',
            '$arrayToObject',
            '$asin',
            '$asinh',
            '$atan',
            '$atan2',
            '$atanh',
            '$avg',
            '$binarySize',
            '$bsonSize',
            '$ceil',
            '$cmp',
            '$concat',
            '$concatArrays',
            '$cond',
            '$convert',
            '$cos',
            '$dateFromParts',
            '$dateToParts',
            '$dateFromString',
            '$dateToString',
            '$dayOfMonth',
            '$dayOfWeek',
            '$dayOfYear',
            '$degreesToRadians',
            '$divide',
            '$eq',
            '$exp',
            '$filter',
            '$first',
            '$floor',
            '$function',
            '$gt',
            '$gte',
            '$hour',
            '$ifNull',
            '$in',
            '$indexOfArray',
            '$indexOfBytes',
            '$indexOfCP',
            '$isArray',
            '$isNumber',
            '$isoDayOfWeek',
            '$isoWeek',
            '$isoWeekYear',
            '$last',
            '$last',
            '$let',
            '$literal',
            '$ln',
            '$log',
            '$log10',
            '$lt',
            '$lte',
            '$ltrim',
            '$map',
            '$max',
            '$mergeObjects',
            '$meta',
            '$min',
            '$millisecond',
            '$minute',
            '$mod',
            '$month',
            '$multiply',
            '$ne',
            '$not',
            '$objectToArray',
            '$or',
            '$pow',
            '$push',
            '$radiansToDegrees',
            '$range',
            '$reduce',
            '$regexFind',
            '$regexFindAll',
            '$regexMatch',
            '$replaceOne',
            '$replaceAll',
            '$reverseArray',
            '$round',
            '$rtrim',
            '$second',
            '$setDifference',
            '$setEquals',
            '$setIntersection',
            '$setIsSubset',
            '$setUnion',
            '$size',
            '$sin',
            '$slice',
            '$split',
            '$sqrt',
            '$stdDevPop',
            '$stdDevSamp',
            '$strcasecmp',
            '$strLenBytes',
            '$strLenCP',
            '$substr',
            '$substrBytes',
            '$substrCP',
            '$subtract',
            '$sum',
            '$switch',
            '$tan',
            '$toBool',
            '$toDate',
            '$toDecimal',
            '$toDouble',
            '$toInt',
            '$toLong',
            '$toObjectId',
            '$toString',
            '$toLower',
            '$toUpper',
            '$trim',
            '$trunc',
            '$type',
            '$week',
            '$year',
            '$zip',
            '$comment',
            '$explain',
            '$hint',
            '$max',
            '$maxTimeMS',
            '$min',
            '$orderby',
            '$query',
            '$returnKey',
            '$showDiskLoc',
            '$natural',
        ],
        t =
            '(?:' +
            (e = e.map(function($) {
                return $.replace('$', '\\$')
            })).join('|') +
            ')\\b'
    ;($.languages.mongodb = $.languages.extend('javascript', {})),
        $.languages.insertBefore('mongodb', 'string', {
            property: {
                pattern: /(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)(?=\s*:)/,
                greedy: !0,
                inside: { keyword: RegExp('^([\'"])?' + t + '(?:\\1)?$') },
            },
        }),
        ($.languages.mongodb.string.inside = {
            url: {
                pattern: /https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*/i,
                greedy: !0,
            },
            entity: {
                pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
                greedy: !0,
            },
        }),
        $.languages.insertBefore('mongodb', 'constant', {
            builtin: {
                pattern: RegExp(
                    '\\b(?:' +
                        [
                            'ObjectId',
                            'Code',
                            'BinData',
                            'DBRef',
                            'Timestamp',
                            'NumberLong',
                            'NumberDecimal',
                            'MaxKey',
                            'MinKey',
                            'RegExp',
                            'ISODate',
                            'UUID',
                        ].join('|') +
                        ')\\b'
                ),
                alias: 'keyword',
            },
        })
})(Prism)
;(Prism.languages.nginx = Prism.languages.extend('clike', {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
})),
    Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i })
Prism.languages.perl = {
    comment: [
        { pattern: /(^\s*)=\w[\s\S]*?=cut.*/m, lookbehind: !0 },
        { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
    ],
    string: [
        {
            pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: !0,
        },
        {
            pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: !0,
        },
        { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
        { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
        {
            pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,
            greedy: !0,
        },
        { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
        { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
        { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
    ],
    regex: [
        {
            pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
            greedy: !0,
        },
    ],
    variable: [
        /[&*$@%]\{\^[A-Z]+\}/,
        /[&*$@%]\^[A-Z_]/,
        /[&*$@%]#?(?=\{)/,
        /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
        /[&*$@%]\d+/,
        /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
    ],
    filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: 'symbol' },
    vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: 'string' },
    function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
    keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    punctuation: /[{}[\];(),:]/,
}
!(function(a) {
    var e = '(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+'
    ;(a.languages.phpdoc = a.languages.extend('javadoclike', {
        parameter: {
            pattern: RegExp(
                '(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:' +
                    e +
                    '\\s+)?)\\$\\w+'
            ),
            lookbehind: !0,
        },
    })),
        a.languages.insertBefore('phpdoc', 'keyword', {
            'class-name': [
                {
                    pattern: RegExp(
                        '(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)' +
                            e
                    ),
                    lookbehind: !0,
                    inside: {
                        keyword: /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/,
                        punctuation: /[|\\[\]()]/,
                    },
                },
            ],
        }),
        a.languages.javadoclike.addSupport('php', a.languages.phpdoc)
})(Prism)
Prism.languages.insertBefore('php', 'variable', {
    this: /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: {
        pattern: /\b[\w\\]+::/,
        inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
    },
})
;(Prism.languages.purescript = Prism.languages.extend('haskell', {
    keyword: /\b(?:ado|case|class|data|derive|do|else|forall|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    'import-statement': {
        pattern: /(^\s*)import\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: { keyword: /\b(?:import|as|hiding)\b/ },
    },
    builtin: /\b(?:absurd|add|ap|append|apply|between|bind|bottom|clamp|compare|comparing|compose|conj|const|degree|discard|disj|div|eq|flap|flip|gcd|identity|ifM|join|lcm|liftA1|liftM1|map|max|mempty|min|mod|mul|negate|not|notEq|one|otherwise|recip|show|sub|top|unit|unless|unlessM|void|when|whenM|zero)\b/,
})),
    (Prism.languages.purs = Prism.languages.purescript)
;(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    'string-interpolation': {
        pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                // FIXING Go TEMPLATE: {{"{{"}}
                pattern: /((?:^|[^{])(?:{{"{{"}})*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                lookbehind: !0,
                inside: {
                    'format-spec': {
                        pattern: /(:)[^:(){}]+(?=}$)/,
                        lookbehind: !0,
                    },
                    'conversion-option': {
                        pattern: /![sra](?=[:}]$)/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            string: /[\s\S]+/,
        },
    },
    'triple-quoted-string': {
        pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: 'string',
    },
    string: {
        pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0,
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0,
    },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
        pattern: /(^\s*)@\w+(?:\.\w+)*/im,
        lookbehind: !0,
        alias: ['annotation', 'punctuation'],
        inside: { punctuation: /\./ },
    },
    keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
}),
    (Prism.languages.python[
        'string-interpolation'
    ].inside.interpolation.inside.rest =
        Prism.languages.python),
    (Prism.languages.py = Prism.languages.python)
!(function(o) {
    var t = o.util.clone(o.languages.javascript),
        e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})'
    function n(t, n) {
        return (
            (t = t
                .replace(/<S>/g, function() {
                    return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)'
                })
                .replace(/<BRACES>/g, function() {
                    return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})'
                })
                .replace(/<SPREAD>/g, function() {
                    return e
                })),
            RegExp(t, n)
        )
    }
    (e = n(e).source),
        (o.languages.jsx = o.languages.extend('markup', t)),
        (o.languages.jsx.tag.pattern = n(
            '</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>'
        )),
        (o.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
        (o.languages.jsx.tag.inside[
            'attr-value'
        ].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i),
        (o.languages.jsx.tag.inside.tag.inside[
            'class-name'
        ] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        (o.languages.jsx.tag.inside.comment = t.comment),
        o.languages.insertBefore(
            'inside',
            'attr-name',
            { spread: { pattern: n('<SPREAD>'), inside: o.languages.jsx } },
            o.languages.jsx.tag
        ),
        o.languages.insertBefore(
            'inside',
            'attr-value',
            {
                script: {
                    pattern: n('=<BRACES>'),
                    inside: {
                        'script-punctuation': {
                            pattern: /^=(?={)/,
                            alias: 'punctuation',
                        },
                        rest: o.languages.jsx,
                    },
                    alias: 'language-javascript',
                },
            },
            o.languages.jsx.tag
        )
    var i = function(t) {
            return t
                ? 'string' == typeof t
                    ? t
                    : 'string' == typeof t.content
                        ? t.content
                        : t.content.map(i).join('')
                : ''
        },
        r = function(t) {
            for (var n = [], e = 0; e < t.length; e++) {
                var a = t[e],
                    g = !1
                if (
                    ('string' != typeof a &&
                        ('tag' === a.type &&
                        a.content[0] &&
                        'tag' === a.content[0].type
                            ? '</' === a.content[0].content[0].content
                                ? 0 < n.length &&
                                  n[n.length - 1].tagName ===
                                      i(a.content[0].content[1]) &&
                                  n.pop()
                                : '/>' ===
                                      a.content[a.content.length - 1].content ||
                                  n.push({
                                      tagName: i(a.content[0].content[1]),
                                      openedBraces: 0,
                                  })
                            : 0 < n.length &&
                              'punctuation' === a.type &&
                              '{' === a.content
                                ? n[n.length - 1].openedBraces++
                                : 0 < n.length &&
                                  0 < n[n.length - 1].openedBraces &&
                                  'punctuation' === a.type &&
                                  '}' === a.content
                                    ? n[n.length - 1].openedBraces--
                                    : (g = !0)),
                    (g || 'string' == typeof a) &&
                        0 < n.length &&
                        0 === n[n.length - 1].openedBraces)
                ) {
                    var s = i(a)
                    e < t.length - 1 &&
                        ('string' == typeof t[e + 1] ||
                            'plain-text' === t[e + 1].type) &&
                        ((s += i(t[e + 1])), t.splice(e + 1, 1)),
                        0 < e &&
                            ('string' == typeof t[e - 1] ||
                                'plain-text' === t[e - 1].type) &&
                            ((s = i(t[e - 1]) + s), t.splice(e - 1, 1), e--),
                        (t[e] = new o.Token('plain-text', s, null, s))
                }
                a.content && 'string' != typeof a.content && r(a.content)
            }
        }
    o.hooks.add('after-tokenize', function(t) {
        ('jsx' !== t.language && 'tsx' !== t.language) || r(t.tokens)
    })
})(Prism)
!(function(e) {
    for (
        var a = '/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/', t = 0;
        t < 2;
        t++
    )
        a = a.replace(/<self>/g, function() {
            return a
        })
    ;(a = a.replace(/<self>/g, function() {
        return '[^\\s\\S]'
    })),
        (e.languages.rust = {
            comment: [
                {
                    pattern: RegExp('(^|[^\\\\])' + a),
                    lookbehind: !0,
                    greedy: !0,
                },
                { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
            ],
            string: {
                pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
                greedy: !0,
            },
            char: {
                pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
                greedy: !0,
                alias: 'string',
            },
            attribute: {
                pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
                greedy: !0,
                alias: 'attr-name',
                inside: { string: null },
            },
            'closure-params': {
                pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                    'closure-punctuation': {
                        pattern: /^\||\|$/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            'lifetime-annotation': { pattern: /'\w+/, alias: 'symbol' },
            'fragment-specifier': {
                pattern: /(\$\w+:)[a-z]+/,
                lookbehind: !0,
                alias: 'punctuation',
            },
            variable: /\$\w+/,
            'function-definition': {
                pattern: /(\bfn\s+)\w+/,
                lookbehind: !0,
                alias: 'function',
            },
            'type-definition': {
                pattern: /(\b(?:enum|struct|union)\s+)\w+/,
                lookbehind: !0,
                alias: 'class-name',
            },
            'module-declaration': [
                {
                    pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
                    lookbehind: !0,
                    alias: 'namespace',
                },
                {
                    pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
                    lookbehind: !0,
                    alias: 'namespace',
                    inside: { punctuation: /::/ },
                },
            ],
            keyword: [
                /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
                /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/,
            ],
            function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
            macro: { pattern: /\w+!/, alias: 'property' },
            constant: /\b[A-Z_][A-Z_\d]+\b/,
            'class-name': /\b[A-Z]\w*\b/,
            namespace: {
                pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
                inside: { punctuation: /::/ },
            },
            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/,
            boolean: /\b(?:false|true)\b/,
            punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
            operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
        }),
        (e.languages.rust['closure-params'].inside.rest = e.languages.rust),
        (e.languages.rust.attribute.inside.string = e.languages.rust.string)
})(Prism)
;(Prism.languages.scss = Prism.languages.extend('css', {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
    },
    atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
        pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
        inside: {
            parent: { pattern: /&/, alias: 'important' },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
        },
    },
    property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
})),
    Prism.languages.insertBefore('scss', 'atrule', {
        keyword: [
            /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
            { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
        ],
    }),
    Prism.languages.insertBefore('scss', 'important', {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    }),
    Prism.languages.insertBefore('scss', 'function', {
        'module-modifier': {
            pattern: /\b(?:as|with|show|hide)\b/i,
            alias: 'keyword',
        },
        placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
        boolean: /\b(?:true|false)\b/,
        null: { pattern: /\bnull\b/, alias: 'keyword' },
        operator: {
            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
            lookbehind: !0,
        },
    }),
    (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss)
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0,
    },
    variable: [
        { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
        /@[\w.$]+/,
    ],
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0,
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
}
!(function(e) {
    function n(e) {
        return e.replace(/__/g, function() {
            return '(?:[\\w-]+|\'[^\'\n\r]*\'|"(?:\\\\.|[^\\\\"\r\n])*")'
        })
    }
    e.languages.toml = {
        comment: { pattern: /#.*/, greedy: !0 },
        table: {
            pattern: RegExp(
                n('(^\\s*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])'),
                'm'
            ),
            lookbehind: !0,
            greedy: !0,
            alias: 'class-name',
        },
        key: {
            pattern: RegExp(
                n('(^\\s*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)'),
                'm'
            ),
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
        },
        string: {
            pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
            greedy: !0,
        },
        date: [
            {
                pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
                alias: 'number',
            },
            { pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/, alias: 'number' },
        ],
        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
        boolean: /\b(?:true|false)\b/,
        punctuation: /[.,=[\]{}]/,
    }
})(Prism)
!(function(E) {
    var n = /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|GMENU|GMENU_FOLDOUT|GMENU_LAYERS|GP|HMENU|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENU|TMENUITEM|TMENU_LAYERS|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/
    ;(E.languages.typoscript = {
        comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
            {
                pattern: /(^|[^\\:= \t]|(?:^|[^= \t])[ \t]+)\/\/.*/,
                lookbehind: !0,
                greedy: !0,
            },
            { pattern: /(^|[^"'])#.*/, lookbehind: !0, greedy: !0 },
        ],
        function: [
            {
                pattern: /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^"\r\n]*"|'[^'\r\n]*')\s*>/,
                inside: {
                    string: {
                        pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
                        inside: { keyword: n },
                    },
                    keyword: { pattern: /INCLUDE_TYPOSCRIPT/ },
                },
            },
            {
                pattern: /@import\s*(?:"[^"\r\n]*"|'[^'\r\n]*')/,
                inside: { string: /"[^"\r\n]*"|'[^'\r\n]*'/ },
            },
        ],
        string: {
            pattern: /^([^=]*=[< ]?)(?:(?!]\n).)*/,
            lookbehind: !0,
            inside: {
                function: /{\$.*}/,
                keyword: n,
                number: /^[0-9]+$/,
                punctuation: /[,|:]/,
            },
        },
        keyword: n,
        number: { pattern: /[0-9]+\s*[.{=]/, inside: { operator: /[.{=]/ } },
        tag: { pattern: /\.?[\w-\\]+\.?/, inside: { punctuation: /\./ } },
        punctuation: /[{}[\];(),.:|]/,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    }),
        (E.languages.tsconfig = E.languages.typoscript)
})(Prism)
Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
        { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
        {
            pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
            inside: { punctuation: /\./ },
        },
        /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/,
}
!(function() {
    if (
        'undefined' != typeof self &&
        self.Prism &&
        self.document &&
        document.querySelector
    ) {
        var t,
            o = 'line-numbers',
            s = 'linkable-line-numbers',
            a = function() {
                if (void 0 === t) {
                    var e = document.createElement('div')
                    ;(e.style.fontSize = '13px'),
                        (e.style.lineHeight = '1.5'),
                        (e.style.padding = '0'),
                        (e.style.border = '0'),
                        (e.innerHTML = '&nbsp;<br />&nbsp;'),
                        document.body.appendChild(e),
                        (t = 38 === e.offsetHeight),
                        document.body.removeChild(e)
                }
                return t
            },
            l = !0,
            u = 0
        Prism.hooks.add('before-sanity-check', function(e) {
            var t = e.element.parentElement
            if (c(t)) {
                var n = 0
                v('.line-highlight', t).forEach(function(e) {
                    (n += e.textContent.length), e.parentNode.removeChild(e)
                }),
                    n &&
                        /^( \n)+$/.test(e.code.slice(-n)) &&
                        (e.code = e.code.slice(0, -n))
            }
        }),
            Prism.hooks.add('complete', function e(t) {
                var n = t.element.parentElement
                if (c(n)) {
                    clearTimeout(u)
                    var i = Prism.plugins.lineNumbers,
                        r = t.plugins && t.plugins.lineNumbers
                    if (b(n, o) && i && !r) Prism.hooks.add('line-numbers', e)
                    else d(n)(), (u = setTimeout(f, 1))
                }
            }),
            window.addEventListener('hashchange', f),
            window.addEventListener('resize', function() {
                v('pre')
                    .filter(c)
                    .map(function(e) {
                        return d(e)
                    })
                    .forEach(y)
            })
    }
    function v(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }
    function b(e, t) {
        return e.classList.contains(t)
    }
    function y(e) {
        e()
    }
    function c(e) {
        return (
            !(!e || !/pre/i.test(e.nodeName)) &&
            (!!e.hasAttribute('data-line') ||
                !(!e.id || !Prism.util.isActive(e, s)))
        )
    }
    function d(u, e, c) {
        var t = (e =
                'string' == typeof e ? e : u.getAttribute('data-line') || '')
                .replace(/\s+/g, '')
                .split(',')
                .filter(Boolean),
            d = +u.getAttribute('data-line-offset') || 0,
            f = (a() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
            p = Prism.util.isActive(u, o),
            n = u.querySelector('code'),
            h = p ? u : n || u,
            m = [],
            g =
                n && h != n
                    ? (function(e, t) {
                          var n = getComputedStyle(e),
                              i = getComputedStyle(t)
                          function r(e) {
                              return +e.substr(0, e.length - 2)
                          }
                          return (
                              t.offsetTop +
                              r(i.borderTopWidth) +
                              r(i.paddingTop) -
                              r(n.paddingTop)
                          )
                      })(u, n)
                    : 0
        t.forEach(function(e) {
            var t = e.split('-'),
                n = +t[0],
                i = +t[1] || n,
                r =
                    u.querySelector(
                        '.line-highlight[data-range="' + e + '"]'
                    ) || document.createElement('div')
            if (
                (m.push(function() {
                    r.setAttribute('aria-hidden', 'true'),
                        r.setAttribute('data-range', e),
                        (r.className = (c || '') + ' line-highlight')
                }),
                p && Prism.plugins.lineNumbers)
            ) {
                var o = Prism.plugins.lineNumbers.getLine(u, n),
                    s = Prism.plugins.lineNumbers.getLine(u, i)
                if (o) {
                    var a = o.offsetTop + g + 'px'
                    m.push(function() {
                        r.style.top = a
                    })
                }
                if (s) {
                    var l = s.offsetTop - o.offsetTop + s.offsetHeight + 'px'
                    m.push(function() {
                        r.style.height = l
                    })
                }
            } else
                m.push(function() {
                    r.setAttribute('data-start', String(n)),
                        n < i && r.setAttribute('data-end', String(i)),
                        (r.style.top = (n - d - 1) * f + g + 'px'),
                        (r.textContent = new Array(i - n + 2).join(' \n'))
                })
            m.push(function() {
                h.appendChild(r)
            })
        })
        var i = u.id
        if (p && Prism.util.isActive(u, s) && i) {
            b(u, s) ||
                m.push(function() {
                    u.classList.add(s)
                })
            var r = parseInt(u.getAttribute('data-start') || '1')
            v('.line-numbers-rows > span', u).forEach(function(e, t) {
                var n = t + r
                e.onclick = function() {
                    var e = i + '.' + n
                    ;(l = !1),
                        (location.hash = e),
                        setTimeout(function() {
                            l = !0
                        }, 1)
                }
            })
        }
        return function() {
            m.forEach(y)
        }
    }
    function f() {
        var e = location.hash.slice(1)
        v('.temporary.line-highlight').forEach(function(e) {
            e.parentNode.removeChild(e)
        })
        var t = (e.match(/\.([\d,-]+)$/) || [, ''])[1]
        if (t && !document.getElementById(e)) {
            var n = e.slice(0, e.lastIndexOf('.')),
                i = document.getElementById(n)
            if (i)
                i.hasAttribute('data-line') || i.setAttribute('data-line', ''),
                    d(i, t, 'temporary ')(),
                    l &&
                        document
                            .querySelector('.temporary.line-highlight')
                            .scrollIntoView()
        }
    }
})()
