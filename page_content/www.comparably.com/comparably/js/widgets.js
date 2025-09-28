/*jshint browser: true */
(function () {
    if (window.comparably && window.comparably.widget && window.comparably.widget.init) return window.comparably.widget.init();
    function addEvent(elem, event, fn) {
        function listenHandler(e) {
            var ret = fn.apply(this, arguments);
            if (ret === false) {
                e.stopPropagation();
                e.preventDefault();
            }
            return(ret);
        }
        function attachHandler() {
            var ret = fn.call(elem, window.event);
            if (ret === false) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
            return(ret);
        }
        if (elem.addEventListener) {
            elem.addEventListener(event, listenHandler, false);
            return {elem: elem, handler: listenHandler, event: event};
        } else {
            elem.attachEvent("on" + event, attachHandler);
            return {elem: elem, handler: attachHandler, event: event};
        }
    }
    function removeEvent(token) {
        if (token.elem.removeEventListener) {
            token.elem.removeEventListener(token.event, token.handler);
        } else {
            token.elem.detachEvent("on" + token.event, token.handler);
        }
    }
    (function () {
        window.comparably = window.comparably || {};
        window.comparably.widget = {
            init: function() {
                clearTimeout(window.comparably.widget_timer);
                var comparablyWidget = document.querySelectorAll(".comparablyWidget:not(.init)");
                if (comparablyWidget && comparablyWidget.length) {
                    window.comparablyWidget = comparablyWidget;
                    for (var cwi = 0; cwi < comparablyWidget.length; cwi++) {
                        var widget = comparablyWidget[cwi];
                        if (!widget) return;
                        if (!widget.offsetParent || (window.getComputedStyle && window.getComputedStyle(widget).display === "none")) return window.comparably.widget_timer = setTimeout(window.comparably.widget.init, 2000);
                        if (widget.classList.contains("init")) return;
                        widget.classList.add("init");
                        var uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        var uuid_timer;
                        if (widget.dataset && widget.dataset.settings) {
                            var settings = {};
                            /* https://stackoverflow.com/questions/28100601/decode-url-safe-base64-in-javascript-browser-side */
                            try { settings = JSON.parse(atob(widget.dataset.settings.replace(/_/g, '/').replace(/-/g, '+'))); } catch(ex) {}
                            widget.settings = settings;
                            widget.setAttribute("data-uuid", uuid);
                            switch (settings.type) {
                                case "embed":
                                    if (settings.html) {
                                        widget.innerHTML = settings.html;
                                    }
                                    if (settings.script) {
                                        function doScript(src) {
                                            if (window.navigator.userAgent.match(/(MSIE|Trident)/)) {
                                                src += (src.indexOf("?") === -1 ? "?" : "&") + "uuid=" + uuid;
                                            }
                                            var script = document.createElement('script');
                                            script.widget = widget;
                                            script.async = true;
                                            script.src = src;
                                            document.head.appendChild(script);
                                        }
                                        if (settings.script instanceof Array) {
                                            for (var ssi = 0; ssi < settings.script.length; ssi++) {
                                                doScript(settings.script[ssi]);
                                            }
                                        } else {
                                            doScript(settings.script);
                                        }
                                    }
                                    break;
                                case "inline":
                                    var html = document.createElement('div');
                                    html.innerHTML = settings.html;
                                    var newWidget = html.firstChild;
                                    newWidget.classList.add("init");
                                    newWidget.style.width = "100%";
                                    widget.parentNode.replaceChild(newWidget, widget);
                                    addEvent(window, "message", function (ev) {
                                        var data;
                                        try { data = JSON.parse(ev.data); } catch(ex) {}
                                        if (data && data.uuid === uuid) {
                                            switch (data.action) {
                                                case "dimensions":
                                                    newWidget.style.height = data.height + "px";
                                                    break;
                                                case "ready":
                                                    clearInterval(uuid_timer);
                                                    newWidget.contentWindow.postMessage(JSON.stringify({ action: "dimensions" }), "*");
                                                    break;
                                            }
                                        }
                                    });
                                    uuid_timer = setInterval(function() {
                                        if (!newWidget || !newWidget.contentWindow || !newWidget.contentWindow.postMessage) return;
                                        newWidget.contentWindow.postMessage(JSON.stringify({ action: "uuid", uuid: uuid }), "*");
                                    }, 100);
                                break;
                                case "sidebar":
                                    function sidebar_init() {
                                        var html = document.createElement('div');
                                        html.innerHTML = settings.html;
                                        var newWidget = html.firstChild;
                                        newWidget.classList.add("init");
                                        newWidget.style.width = settings.width + "px";
                                        newWidget.style.height = "100vh";
                                        newWidget.style.position = "fixed";
                                        newWidget.style.top = 0;
                                        newWidget.style.right = (-1 * settings.width) + "px";
                                        newWidget.style.zIndex = 9999;
                                        newWidget.style.borderRadius = 0;
                                        newWidget.style.backgroundColor = "#fff";
                                        newWidget.style.transition =  "right 200ms";
                                        newWidget.style.boxShadow = "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)";
                                        widget.parentNode.replaceChild(newWidget, widget);
                                        addEvent(window, "message", function (ev) {
                                            var data;
                                            try { data = JSON.parse(ev.data); } catch(ex) {}
                                            if (data && data.uuid === uuid) {
                                                switch(data.action) {
                                                    case "close_widget":
                                                        newWidget.style.right = (-1 * settings.width) + "px";
                                                        break;
                                                    case "ready":
                                                        clearInterval(uuid_timer);
                                                        newWidget.contentWindow.postMessage(JSON.stringify({ action: "show_close_button" }), "*");
                                                        break;
                                                }
                                            }
                                        });
                                        setTimeout(function () {
                                            newWidget.style.right = 0;
                                        }, 100);
                                        uuid_timer = setInterval(function() {
                                            if (!newWidget || !newWidget.contentWindow || !newWidget.contentWindow.postMessage) return;
                                            newWidget.contentWindow.postMessage(JSON.stringify({ action: "uuid", uuid: uuid }), "*");
                                        }, 100);
                                        return newWidget;
                                    }
                                    settings.width = settings.width || 320;
                                    widget.classList.add("init");
                                    var button = document.createElement('div');
                                    button.textContent = settings.title || "Why Us?";
                                    button.classList.add("comparablyWidget-sidebar-button");
                                    button.style.background = settings.colorBG || "#3b424b";
                                    button.style.color = settings.colorTXT || "#fff";
                                    button.style.fontFamily = "Open Sans, Arial, sans-serif";
                                    button.style.fontWeight = "bold";
                                    button.style.lineHeight = "20px";
                                    button.style.padding = "10px 20px";
                                    button.style.borderRadius = "4px";
                                    button.style.cursor = "pointer";
                                    button.style.zIndex = 1;
                                    button.style.position = "fixed";
                                    button.style.top = 0;
                                    button.style.bottom = 0;
                                    button.style.height = "40px";
                                    button.style.margin = "auto";
                                    button.style.transformOrigin = "100% 50%";
                                    button.style.transform = "rotate(270deg) translate(50%, 50%)";
                                    button.style.right = "40px";
                                    button.style.boxShadow = "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);";
                                    addEvent(button, "click", function (ev) {
                                        if (!button.classList.contains("init")) {
                                            button.classList.add("init");
                                            return widget = sidebar_init();
                                        }
                                        widget.style.right = 0;
                                    });
                                    addEvent(button, "remove", function (ev) {
                                        widget.parentNode.removeChild(widget);
                                        button.parentNode.removeChild(button);
                                    });
                                    document.body.appendChild(button);
                                break;
                            }
                        }
                    }
                }
            }
        };
        addEvent(window, "onDOMContentLoaded", window.comparably.widget.init);
        window.comparably.widget.init();
    })();
})();
