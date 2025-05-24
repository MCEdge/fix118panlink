// ==UserScript==
// @name         118网盘链接修复
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动移除118pan域名中多余的尾数1
// @author       YourName
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fixInvalidDomain() {
        // 处理iframe元素
        document.querySelectorAll('iframe[src]').forEach(iframe => {
            try {
                const url = new URL(iframe.src);
                if (url.hostname.endsWith('.com1')) {
                    url.hostname = url.hostname.replace(/\.com1$/, '.com');
                    iframe.src = url.href;
                }
            } catch(e) { /* 忽略无效URL */ }
        });

        // 处理a标签
        document.querySelectorAll('a[href]').forEach(a => {
            try {
                const url = new URL(a.href);
                if (url.hostname.endsWith('.com1')) {
                    url.hostname = url.hostname.replace(/\.com1$/, '.com');
                    a.href = url.href;
                }
            } catch(e) { /* 忽略无效URL */ }
        });
    }

    // 页面加载完成后立即执行
    window.addEventListener('DOMContentLoaded', fixInvalidDomain);
    // 兼容动态加载内容
    new MutationObserver(fixInvalidDomain).observe(document, {
        childList: true,
        subtree: true
    });
})();