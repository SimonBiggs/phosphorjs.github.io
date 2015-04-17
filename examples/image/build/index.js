"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var example;
(function (example) {
    var Size = phosphor.utility.Size;
    var Component = phosphor.virtualdom.Component;
    var createFactory = phosphor.virtualdom.createFactory;
    var dom = phosphor.virtualdom.dom;
    var BoxPanel = phosphor.widgets.BoxPanel;
    var ElementHost = phosphor.widgets.ElementHost;
    var SizePolicy = phosphor.widgets.SizePolicy;
    var Widget = phosphor.widgets.Widget;
    /**
     * Example image data - all public domain.
     */
    var imageItems = [
        { name: 'Mt Saint Elias', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Mt_Saint_Elias_NOAA_2102.jpg/640px-Mt_Saint_Elias_NOAA_2102.jpg' },
        { name: 'Aiguille du Dru', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Aiguille_du_Dru_3.jpg/640px-Aiguille_du_Dru_3.jpg' },
        { name: 'Moraine Lake', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/640px-Moraine_Lake_17092005.jpg' },
        { name: 'Kalamitsi Beach', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/20100726_Kalamitsi_Beach_Ionian_Sea_Lefkada_island_Greece.jpg/640px-20100726_Kalamitsi_Beach_Ionian_Sea_Lefkada_island_Greece.jpg' },
        { name: 'Atlantic Ocean', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/640px-Clouds_over_the_Atlantic_Ocean.jpg' },
        { name: "Rub' al Khali", path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rub_al_Khali_002.JPG/640px-Rub_al_Khali_002.JPG' },
        { name: 'Hellyer Gorge', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Hellyer_Gorge%2C_Tasmania.jpg/640px-Hellyer_Gorge%2C_Tasmania.jpg' },
        { name: 'Omega Nebula', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Omega_Nebula.jpg/591px-Omega_Nebula.jpg' },
        { name: 'Crab Nebula', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/480px-Crab_Nebula.jpg' },
        { name: 'Blue Linckia', path: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blue_Linckia_Starfish.JPG/360px-Blue_Linckia_Starfish.JPG' }
    ];
    /**
     * A simple component which renders a selector control.
     */
    var SelectorComponent = (function (_super) {
        __extends(SelectorComponent, _super);
        function SelectorComponent() {
            _super.call(this);
            this.node.addEventListener('change', this);
        }
        SelectorComponent.prototype.dispose = function () {
            this.node.removeEventListener('change', this);
            _super.prototype.dispose.call(this);
        };
        SelectorComponent.prototype.render = function () {
            return this.data.values.map(function (value) { return dom.option(value); });
        };
        SelectorComponent.prototype.handleEvent = function (event) {
            if (event.type === 'change') {
                this.data.onSelected(this.node.value);
            }
        };
        SelectorComponent.tagName = 'select';
        SelectorComponent.className = 'SelectorComponent';
        return SelectorComponent;
    })(Component);
    /**
     * A factory function for a selector component.
     */
    var Selector = createFactory(SelectorComponent);
    /**
     * A simple widget which displays an image.
     *
     * This could just as easily be rendered as part of the component,
     * but for this example it demonstrates a simple custom widget.
     */
    var SimpleImageWidget = (function (_super) {
        __extends(SimpleImageWidget, _super);
        function SimpleImageWidget() {
            var _this = this;
            _super.call(this);
            this.addClass('SimpleImageWidget');
            this.node.onload = function () { return _this.updateGeometry(); };
        }
        Object.defineProperty(SimpleImageWidget.prototype, "src", {
            get: function () {
                return this.node.src;
            },
            set: function (src) {
                this.node.src = src;
            },
            enumerable: true,
            configurable: true
        });
        SimpleImageWidget.prototype.sizeHint = function () {
            var img = this.node;
            return new Size(img.naturalWidth, img.naturalHeight);
        };
        SimpleImageWidget.prototype.createNode = function () {
            return document.createElement('img');
        };
        return SimpleImageWidget;
    })(Widget);
    /**
     * A top level panel which combines a selector and image panel.
     */
    var MainPanel = (function (_super) {
        __extends(MainPanel, _super);
        function MainPanel() {
            var _this = this;
            _super.call(this);
            this._onSelected = function (value) {
                for (var i = 0; i < imageItems.length; ++i) {
                    var item = imageItems[i];
                    if (item.name === value) {
                        _this._image.src = item.path;
                        return;
                    }
                }
                _this._image.src = item.path;
            };
            this.addClass('MainPanel');
            var names = imageItems.map(function (item) { return item.name; });
            var selector = Selector({ values: names, onSelected: this._onSelected });
            var host = new ElementHost(selector, 200, 24);
            host.setSizePolicy(SizePolicy.Expanding, 0 /* Fixed */);
            var image = this._image = new SimpleImageWidget();
            image.setSizePolicy(0 /* Fixed */, 0 /* Fixed */);
            image.src = imageItems[0].path;
            this.addWidget(host);
            this.addWidget(image);
        }
        return MainPanel;
    })(BoxPanel);
    function main() {
        var panel = new MainPanel();
        panel.attach(document.getElementById('main'));
        panel.fit();
        window.onresize = function () { return panel.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example
