//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {

  props: {
    leftSection: {
      type: Object,
      default: function () { return ({
        text: "Available",
        styles: {
          backgroundColor: "#0acf97"
        },
        sortOption: null
      }); }
    },

    rightSection: {
      type: Object,
      default: function () { return ({
        text: "Assigned",
        styles: {
          backgroundColor: "#727df5"
        },
        sortOption: null
      }); }
    },
    mappingOptions: {
      type: Object,
      default: function () { return ({
        value: "name",
        key: "id"
      }); }
    },

    baseList: {
      type: Array,
      default: function () { return [
        { id: 1, name: "Person 1" },
        { id: 3, name: "Person 3" },
        { id: 4, name: "Person 4" },
        { id: 5, name: "Person 5" }
      ]; }
    },

    selectedList: {
      type: Array,
      default: function () { return [
        { id: 2, name: "Person 2" },
        { id: 6, name: "Person 6" },
        { id: 7, name: "Person 7" }
      ]; }
    },

    isSortable: {
      type: Boolean,
      default: true
    }
  },

  data: function () { return ({
    baseSearchValue: "",
    selectedSearchValue: ""
  }); },
  computed: {
    baseListLocal: {
      get: function() {
        return this.baseList;
      },
      set: function(item) {
        this.$emit("updateBase", item);
      }
    },
    selectedListLocal: {
      get: function() {
        return this.selectedList;
      },
      set: function(item) {
        this.$emit("updateSelected", item);
      }
    },
    filteredBase: function filteredBase() {
      var this$1 = this;

      return this.baseListLocal
        .filter(function (item) {
          return item[this$1.mappingOptions.value]
            .toLowerCase()
            .includes(this$1.baseSearchValue.toLowerCase());
        })
        .sort(this[this.leftSection.sortOption]);
    },
    filteredSelected: function filteredSelected() {
      var this$1 = this;

      return this.selectedListLocal
        .filter(function (item) {
          return item[this$1.mappingOptions.value]
            .toLowerCase()
            .includes(this$1.selectedSearchValue.toLowerCase());
        })
        .sort(this[this.rightSection.sortOption]);
    }
  },

  methods: {
    addAll: function addAll() {
      this.selectedListLocal = ( this.selectedListLocal ).concat( this.baseListLocal
      );
      this.baseListLocal = [];
    },

    removeAll: function removeAll() {
      this.baseListLocal = ( this.baseListLocal ).concat( this.selectedListLocal);
      this.selectedListLocal = [];
    },

    transferToRight: function transferToRight(item) {
      var this$1 = this;

      this.baseListLocal = this.baseListLocal.filter(
        function (listItem) { return listItem[this$1.mappingOptions.key] !== item[this$1.mappingOptions.key]; }
      );
      this.selectedListLocal = ( this.selectedListLocal ).concat( [item]);
    },

    transferToLeft: function transferToLeft(item) {
      var this$1 = this;

      this.selectedListLocal = this.selectedListLocal.filter(
        function (listItem) { return listItem[this$1.mappingOptions.key] !== item[this$1.mappingOptions.key]; }
      );

      this.baseListLocal = ( this.baseListLocal ).concat( [item]);
    },

    asc: function asc(a, b) {
      return a[this.mappingOptions.value].localeCompare(
        b[this.mappingOptions.value]
      );
    },

    desc: function desc(a, b) {
      return b[this.mappingOptions.value].localeCompare(
        a[this.mappingOptions.value]
      );
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("section", { staticClass: "vue-multiselectbox" }, [
    _c("div", { staticClass: "multiselect-header" }, [
      _c(
        "div",
        { staticClass: "multiselect-title", style: _vm.leftSection.styles },
        [_vm._v("\n      " + _vm._s(_vm.leftSection.text) + "\n    ")]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "multiselect-title", style: _vm.rightSection.styles },
        [_vm._v("\n      " + _vm._s(_vm.rightSection.text) + "\n    ")]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "multiselect-container" }, [
      _c(
        "div",
        { staticClass: "multiselect-box" },
        [
          _c(
            "div",
            {
              staticClass: "multiselect-box-border multiselect-box-border-first"
            },
            [
              _c("div", { staticClass: "multiselect-box-search" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.baseSearchValue,
                      expression: "baseSearchValue"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    placeholder:
                      "" +
                      (_vm.baseList.length > 1
                        ? "Search in " + _vm.baseList.length + " entries"
                        : "Search in " + _vm.baseList.length + " entry")
                  },
                  domProps: { value: _vm.baseSearchValue },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.baseSearchValue = $event.target.value;
                    }
                  }
                }),
                _vm._v(" "),
                _vm.isSortable
                  ? _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.leftSection.sortOption,
                            expression: "leftSection.sortOption"
                          }
                        ],
                        staticClass: "form-control",
                        on: {
                          change: function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value;
                                return val
                              });
                            _vm.$set(
                              _vm.leftSection,
                              "sortOption",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            );
                          }
                        }
                      },
                      [
                        _c(
                          "option",
                          {
                            attrs: { disabled: "" },
                            domProps: { value: null }
                          },
                          [_vm._v("Sort Options")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "asc" } }, [
                          _vm._v("Ascended")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "desc" } }, [
                          _vm._v("Descended")
                        ])
                      ]
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.filteredBase.length
                ? _c(
                    "transition-group",
                    { staticClass: "list-group" },
                    _vm._l(_vm.filteredBase, function(b) {
                      return _c(
                        "li",
                        {
                          key: b[_vm.mappingOptions.key],
                          staticClass: "list-group-item",
                          on: {
                            click: function($event) {
                              return _vm.transferToRight(b)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(b[_vm.mappingOptions.value]) +
                              "\n          "
                          )
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("transition", { attrs: { name: "fade" } }, [
            _vm.filteredBase.length
              ? _c("div", { staticClass: "btn-wrapper" }, [
                  _c("a", {
                    staticClass: "btn-move",
                    on: { click: _vm.addAll }
                  })
                ])
              : _vm._e()
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "multiselect-box" },
        [
          _c(
            "div",
            {
              staticClass: "multiselect-box-border multiselect-box-border-first"
            },
            [
              _c("div", { staticClass: "multiselect-box-search" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectedSearchValue,
                      expression: "selectedSearchValue"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    placeholder:
                      "" +
                      (_vm.selectedList.length > 1
                        ? "Search in " + _vm.selectedList.length + " entries"
                        : "Search in " + _vm.selectedList.length + " entry")
                  },
                  domProps: { value: _vm.selectedSearchValue },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.selectedSearchValue = $event.target.value;
                    }
                  }
                }),
                _vm._v(" "),
                _vm.isSortable
                  ? _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.rightSection.sortOption,
                            expression: "rightSection.sortOption"
                          }
                        ],
                        staticClass: "form-control",
                        on: {
                          change: function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value;
                                return val
                              });
                            _vm.$set(
                              _vm.rightSection,
                              "sortOption",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            );
                          }
                        }
                      },
                      [
                        _c(
                          "option",
                          {
                            attrs: { disabled: "" },
                            domProps: { value: null }
                          },
                          [_vm._v("Sort Options")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "asc" } }, [
                          _vm._v("Ascended")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "desc" } }, [
                          _vm._v("Descended")
                        ])
                      ]
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.filteredSelected.length
                ? _c(
                    "transition-group",
                    { staticClass: "list-group" },
                    _vm._l(_vm.filteredSelected, function(b) {
                      return _c(
                        "li",
                        {
                          key: b[_vm.mappingOptions.key],
                          staticClass: "list-group-item selected",
                          on: {
                            click: function($event) {
                              return _vm.transferToLeft(b)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(b[_vm.mappingOptions.value]) +
                              "\n          "
                          )
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("transition", { attrs: { name: "fade" } }, [
            _vm.filteredSelected.length
              ? _c("div", { staticClass: "btn-wrapper" }, [
                  _c("a", {
                    staticClass: "btn-empty",
                    on: { click: _vm.removeAll }
                  })
                ])
              : _vm._e()
          ])
        ],
        1
      )
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-cf425c16_0", { source: "\n.vue-multiselectbox {\n  font-family: \"Avenir\", Helvetica, Arial, sans-serif;\n}\n.multiselect-container {\n  display: flex;\n  flex-flow: row wrap;\n}\n.multiselect-header {\n  display: flex;\n  flex-direction: row;\n  margin: 0px !important;\n  padding-bottom: 0px;\n  color: white;\n  font-size: medium;\n}\n.multiselect-title {\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  height: 31px;\n  line-height: 31px;\n  background-color: #727df5;\n  padding-left: 16px;\n  font-weight: bold;\n  flex: 1 100%;\n}\n.multiselect-box {\n  flex: 1;\n}\n.multiselect-box-border {\n  border: solid 1px #707070;\n  height: 245px;\n  overflow: auto;\n}\n.multiselect-box-border-first {\n  background-color: #f7f7f7;\n  border-right: transparent;\n}\n.multiselect-box .form-control {\n  margin: 7px 15px;\n  height: 32px;\n  width: 100%;\n  background-color: white;\n  padding-left: 10px;\n}\n.multiselect-box-search {\n  display: flex;\n  align-items: center;\n  border-bottom: solid 1px #707070;\n}\n.multiselect-box-filtering {\n  display: flex;\n  border-bottom: solid 1px #707070;\n}\n.multiselect-box .list-group-item {\n  cursor: pointer;\n  background-color: #e8e7e7;\n  padding: 0 12px;\n  height: 39px;\n  line-height: 39px;\n  border-radius: 0;\n}\n.multiselect-box .list-group-item.selected {\n  background-color: #4a8ef1;\n  color: #fff;\n}\n.multiselect-box .list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n}\n.multiselect-box .list-group-item.selected:nth-child(even),\n.multiselect-box .list-group-item.selected:hover {\n  background-color: #3975f1;\n}\n.multiselect-container .btn-wrapper {\n  display: flex;\n  justify-content: flex-end;\n}\n.multiselect-container .btn-move,\n.multiselect-container .btn-empty {\n  cursor: pointer;\n  font-weight: bold;\n  padding: 15px 18px;\n  width: 115px;\n  height: 35px;\n  border-width: 0 1px 1px 1px;\n  border-style: solid;\n  border-color: #707070;\n  border-bottom-left-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n  background-repeat: no-repeat;\n  background-position: center center;\n}\n.multiselect-container .btn-move {\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NC4zNjUiIGhlaWdodD0iMTQuNTk1IiB2aWV3Qm94PSIwIDAgODQuMzY1IDE0LjU5NSI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIC5jbHMtMXtmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJtb3ZlLWFsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3OS45OTYgLTUyMi40MDUpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0iYXJyb3ciIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zMyIgZD0iTTAgNy4zTDguOTE5IDB2NC4wNTRoOS40NjR2Ni40ODZIOC45MTl2NC4wNTR6IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzMyIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzUxIiBkPSJNOS4zMjgtNi40NjNxLS41MjEgMS4yODktLjkzMiAyLjMtLjE3Ni40MzQtLjM0Ljg0NHQtLjMuNzMybC0uMjE0LjUyMS0uMDc2LjE5M3EtLjEyMy4zLS4yNjEuNTY4YTIuMzMgMi4zMyAwIDAgMS0uMzA1LjQ3IDEuNDM2IDEuNDM2IDAgMCAxLS40LjMyMiAxLjA0IDEuMDQgMCAwIDEtLjUwNy4xMiAxLjEwNiAxLjEwNiAwIDAgMS0uNDYzLS4wOTEgMS4xMjQgMS4xMjQgMCAwIDEtLjM2Ni0uMjc1IDIuMjQ4IDIuMjQ4IDAgMCAxLS4zMTMtLjQ2MyA2LjcyNiA2LjcyNiAwIDAgMS0uMjkzLS42NDdsLTEuODQ1LTQuNTdWLS44NWEuODQzLjg0MyAwIDAgMS0uMDY3LjMzNC44My44MyAwIDAgMS0uMTg1LjI3Mi44ODkuODg5IDAgMCAxLS4yNzUuMTgyLjg0My44NDMgMCAwIDEtLjMzNC4wNjcuODQzLjg0MyAwIDAgMS0uMzM0LS4wNjcuODU0Ljg1NCAwIDAgMS0uMjcyLS4xODIuODU0Ljg1NCAwIDAgMS0uMTgyLS4yNzJBLjg0My44NDMgMCAwIDEgMS0uODV2LTUuNDA4YTcuNDc2IDcuNDc2IDAgMCAxIC4wNTMtLjkyOSAxLjk4MyAxLjk4MyAwIDAgMSAuMjEtLjcxMyAxLjEzNCAxLjEzNCAwIDAgMSAuNDUxLS40NTQgMS41NzEgMS41NzEgMCAwIDEgLjc2NS0uMTYxIDEuNDExIDEuNDExIDAgMCAxIC41OTUuMTE3IDEuMzg1IDEuMzg1IDAgMCAxIC40NzUuMzc4IDMuNDQyIDMuNDQyIDAgMCAxIC40MjguNjc3cS4yMDguNDE2LjQ1NCAxLjAwOGwxLjU2MyAzLjc4aC4wNDdsMS41ODItMy43NzlxLjIxMS0uNS40MTMtLjkwOGEzLjczMyAzLjczMyAwIDAgMSAuNDMxLS42ODYgMS43NjkgMS43NjkgMCAwIDEgLjUtLjQzNCAxLjIyOCAxLjIyOCAwIDAgMSAuNjE1LS4xNTIgMS43NTMgMS43NTMgMCAwIDEgLjY1My4xMTEgMS4wMjYgMS4wMjYgMCAwIDEgLjQ1Ny4zNTcgMS43MTUgMS43MTUgMCAwIDEgLjI2Ny42MzYgNC4zMzYgNC4zMzYgMCAwIDEgLjA4OC45NHY1LjYyYS44NDMuODQzIDAgMCAxLS4wNjcuMzM0LjgzLjgzIDAgMCAxLS4xODUuMjcyLjg4OS44ODkgMCAwIDEtLjI3NS4xODIuODQzLjg0MyAwIDAgMS0uMzM0LjA2Ny44NDMuODQzIDAgMCAxLS4zMzYtLjA2Ny44NTQuODU0IDAgMCAxLS4yNzItLjE4Mi44NTQuODU0IDAgMCAxLS4xNzgtLjI3Mi44NDMuODQzIDAgMCAxLS4wNzItLjMzNHptMy4xMjMgMy41MWEzLjQgMy40IDAgMCAxIC4yLTEuMTc1IDIuNjg3IDIuNjg3IDAgMCAxIC42MDktLjk3IDIuOTM2IDIuOTM2IDAgMCAxIDEuMDItLjY2MiAzLjg0NCAzLjg0NCAwIDAgMSAxLjQzOC0uMjQ2IDMuOTczIDMuOTczIDAgMCAxIDEuNC4yMjkgMi45IDIuOSAwIDAgMSAxLjAyNS42MzYgMi43IDIuNyAwIDAgMSAuNjMzLjk2N0EzLjM1NCAzLjM1NCAwIDAgMSAxOS0yLjk1M2EzLjI5IDMuMjkgMCAwIDEtLjIwNSAxLjE2MyAyLjY4NCAyLjY4NCAwIDAgMS0uNjE1Ljk2MSAyLjk1IDIuOTUgMCAwIDEtMS4wMjUuNjU2IDMuODczIDMuODczIDAgMCAxLTEuNDMuMjQzIDMuOTg4IDMuOTg4IDAgMCAxLTEuNDE1LS4yMzFBMi45IDIuOSAwIDAgMSAxMy4yOC0uOGEyLjYzMiAyLjYzMiAwIDAgMS0uNjIxLS45NjEgMy4zNjMgMy4zNjMgMCAwIDEtLjIwOC0xLjE5MnptMS45NTEgMGEzLjcxNCAzLjcxNCAwIDAgMCAuMDcuNzM1IDEuOTYyIDEuOTYyIDAgMCAwIC4yMjYuNjEyIDEuMiAxLjIgMCAwIDAgLjQwNy40MTkgMS4xNTEgMS4xNTEgMCAwIDAgLjYxNS4xNTUgMS4xNjYgMS4xNjYgMCAwIDAgLjU4My0uMTQxIDEuMTU5IDEuMTU5IDAgMCAwIC40MS0uMzkzIDEuOTIyIDEuOTIyIDAgMCAwIC4yNDMtLjYwNiAzLjQ3MiAzLjQ3MiAwIDAgMCAuMDgyLS43ODIgMy41NyAzLjU3IDAgMCAwLS4wNzMtLjczNSAyIDIgMCAwIDAtLjIzMS0uNjE1IDEuMjIzIDEuMjIzIDAgMCAwLS40MDctLjQyMiAxLjEyNCAxLjEyNCAwIDAgMC0uNjA2LS4xNTUgMS4xNTcgMS4xNTcgMCAwIDAtLjYwOS4xNTIgMS4yIDEuMiAwIDAgMC0uNDEuNDE2IDEuOTE3IDEuOTE3IDAgMCAwLS4yMjkuNjE1IDMuNzg5IDMuNzg5IDAgMCAwLS4wNzMuNzQ1em05LjY4IDEuNjUzYTMuMTQzIDMuMTQzIDAgMCAxLS4yNzUuNiAxLjYwNiAxLjYwNiAwIDAgMS0uMzQuNCAxLjE5MiAxLjE5MiAwIDAgMS0uNDIyLjIyNiAxLjgzMyAxLjgzMyAwIDAgMS0uNTI3LjA3IDEuNDg3IDEuNDg3IDAgMCAxLS42LS4xMTEgMS4zMTUgMS4zMTUgMCAwIDEtLjQ1NC0uMzQgMi41NiAyLjU2IDAgMCAxLS4zNzItLjU3N3EtLjE3LS4zNDktLjM0Ni0uODIzTDE5LjgtNC4zODNxLS4wNjQtLjE2NC0uMTQxLS4zNTRhLjk0Ny45NDcgMCAwIDEtLjA3Ni0uMzQ5LjgyNy44MjcgMCAwIDEgLjA2NC0uMzMxLjc0Mi43NDIgMCAwIDEgLjE3OS0uMjU1LjgyNi44MjYgMCAwIDEgLjI2Ny0uMTY0LjkwNi45MDYgMCAwIDEgLjMyOC0uMDU5LjY4LjY4IDAgMCAxIC4zOS4xMjYgMS40MiAxLjQyIDAgMCAxIC4zMzEuMzE5IDIuNCAyLjQgMCAwIDEgLjI1NS40MjIgMi41IDIuNSAwIDAgMSAuMTYxLjQyOGwuOTYxIDIuOTgyIDEuMDI1LTMuMmEyLjk0OSAyLjk0OSAwIDAgMSAuMTU1LS40MTkgMS41MjUgMS41MjUgMCAwIDEgLjIxNC0uMzQzLjk3My45NzMgMCAwIDEgLjI3OC0uMjMxLjcyNi43MjYgMCAwIDEgLjM1NC0uMDg1IDEuMDMxIDEuMDMxIDAgMCAxIC4zMjguMDUzLjgyNi44MjYgMCAwIDEgLjI3OC4xNTUuNzc1Ljc3NSAwIDAgMSAuMTkzLjI1Mi43ODMuNzgzIDAgMCAxIC4wNzMuMzQ5IDEuMDI2IDEuMDI2IDAgMCAxLS4wNy4zNDZsLS4xMjkuMzU3cS0uMjgxLjc3OS0uNTY1IDEuNTQ0em04LjAzMy0xLjg0YS40MTYuNDE2IDAgMCAxLS4xNTguMzU3LjcyNS43MjUgMCAwIDEtLjQzOS4xMTdoLTMuNjI3YTEuNjE0IDEuNjE0IDAgMCAwIC40MDcgMS4xIDEuNTM3IDEuNTM3IDAgMCAwIDEuMTUxLjM5IDMuMjU1IDMuMjU1IDAgMCAwIC40NzItLjAzMiAzLjkxIDMuOTEgMCAwIDAgLjQzMS0uMDg4cS4yMTEtLjA1Ni40MjItLjEyNmwuNDM5LS4xNDZhLjM4Mi4zODIgMCAwIDEgLjEzNS0uMDI5LjM3NS4zNzUgMCAwIDEgLjMxMS4xNDkuNTQ5LjU0OSAwIDAgMSAuMTE3LjM0OS42MDkuNjA5IDAgMCAxLS4wNDEuMjIzIDEuMDQ2IDEuMDQ2IDAgMCAxLS4zODcuNDY2IDIuMjgxIDIuMjgxIDAgMCAxLS42MjEuMjkzIDMuODkzIDMuODkzIDAgMCAxLS43NDQuMTQ5IDcuMjI3IDcuMjI3IDAgMCAxLS43NS4wNDEgMy45NjkgMy45NjkgMCAwIDEtMS4yNTctLjE5MyAyLjg0OCAyLjg0OCAwIDAgMS0xLjAxMS0uNTggMi42MyAyLjYzIDAgMCAxLS42NzEtLjk1NSAzLjM4OCAzLjM4OCAwIDAgMS0uMjQzLTEuMzMgMi45OTEgMi45OTEgMCAwIDEgLjIzNC0xLjE4NCAyLjg3OCAyLjg3OCAwIDAgMSAuNjUzLS45NTUgMy4wOTIgMy4wOTIgMCAwIDEgMS0uNjM5IDMuMzQxIDMuMzQxIDAgMCAxIDEuMjYyLS4yMzEgMy4zIDMuMyAwIDAgMSAxLjI5NS4yMzEgMi41NjMgMi41NjMgMCAwIDEgLjkuNjIxIDIuNTI3IDIuNTI3IDAgMCAxIC41MzMuOTA4IDMuNDkzIDMuNDkzIDAgMCAxIC4xODcgMS4wOTN6bS0xLjU2NC0uMzZhMi4xMjUgMi4xMjUgMCAwIDAtLjEwOC0uNTc0IDEuMzc2IDEuMzc2IDAgMCAwLS4yNTgtLjQ1NyAxLjE1NiAxLjE1NiAwIDAgMC0uNDEtLjMgMS4zNzggMS4zNzggMCAwIDAtLjU2NS0uMTA4IDEuMjA3IDEuMjA3IDAgMCAwLS41My4xMTQgMS4yODIgMS4yODIgMCAwIDAtLjQxLjMxMSAxLjQ0MyAxLjQ0MyAwIDAgMC0uMjcuNDU3IDEuOTI2IDEuOTI2IDAgMCAwLS4xMTQuNTZ6bTkuODE0LTMuNDFsLTEuMjg5IDMuNzY5aDIuNmwtMS4yODEtMy43Njd6bTMuODIgNS4xMzNsLjA4OC4yMnEuMDQ3LjExNS4wODguMjMxLjA0MS4xMTcuMDY3LjIyNmEuODM4LjgzOCAwIDAgMSAuMDI2LjIuODg3Ljg4NyAwIDAgMS0uMDc5LjM4NC44MjguODI4IDAgMCAxLS4yMTQuMjgxLjk2NS45NjUgMCAwIDEtLjMxMy4xNzYgMS4xNTMgMS4xNTMgMCAwIDEtLjM3Ny4wNTkgMS4wNzMgMS4wNzMgMCAwIDEtLjM5My0uMDY0Ljc4NC43ODQgMCAwIDEtLjI5My0uMjA1IDEuNSAxLjUgMCAwIDEtLjIzNy0uMzY2cS0uMTA4LS4yMjYtLjIzMS0uNTU0bC0uMjgxLS43NDRoLTMuMzE3bC0uMjQuNzQ0YTQuNDc3IDQuNDc3IDAgMCAxLS4yMTQuNTYzIDEuMzgzIDEuMzgzIDAgMCAxLS4yNC4zNjYuNzg0Ljc4NCAwIDAgMS0uMy4yIDEuMTcgMS4xNyAwIDAgMS0uNC4wNjIgMS4xNTMgMS4xNTMgMCAwIDEtLjM3OC0uMDYyLjk2NS45NjUgMCAwIDEtLjMxMy0uMTc2LjgyOC44MjggMCAwIDEtLjIxNC0uMjgxLjg4Ny44ODcgMCAwIDEtLjA4LS4zODMuODM4LjgzOCAwIDAgMSAuMDI2LS4ycS4wMjYtLjEwOC4wNjctLjIyNnQuMDg4LS4yMzFxLjA0Ny0uMTE0LjA4OC0uMjJsMS41NzYtNC4yNnEuMjIzLS42LjQyNS0xLjA1OGEzLjc0NCAzLjc0NCAwIDAgMSAuNDQ1LS43NzYgMS42NTMgMS42NTMgMCAwIDEgLjU2LS40NzggMS42NzYgMS42NzYgMCAwIDEgLjc2OC0uMTYxIDEuODUyIDEuODUyIDAgMCAxIC43MjEuMTI2IDEuNDE4IDEuNDE4IDAgMCAxIC41MzkuNDE2IDMuNDQ3IDMuNDQ3IDAgMCAxIC40NTcuNzY4cS4yMTcuNDc1LjQ4IDEuMTY2em0zLjIxMS42MjFhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNi4xOTJhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMy4yNDYgMGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di02LjE5MmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMjYuODU1eiIgY2xhc3M9ImNscy0xIiBkYXRhLW5hbWU9IlBhdGggNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODUgMTQ2Ljc0MykiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);\n}\n.multiselect-container .btn-empty {\nbackground-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OS4wOTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA4OS4wOTggMjIiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojNWY1ZjVmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4fS5jbHMtMntmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJlbXB0eS1saXN0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc5IC01MTkpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0idHJhc2giIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0idHJhc2gtMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDQzLjY4IDkuNSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0IiBkPSJNMyA2aDE4IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzNCIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM1IiBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJQYXRoIDM1Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU2IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTEpIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU3IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQgMTEpIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTAiIGQ9Ik0xLjk1NyAwYS45NDguOTQ4IDAgMCAxLS41LS4xMjMuOTc4Ljk3OCAwIDAgMS0uMzI1LS4zMTkgMS4zNjMgMS4zNjMgMCAwIDEtLjE3Ny0uNDQzQTIuMzQzIDIuMzQzIDAgMCAxIC45LTEuMzc3di01LjU4NGE0LjMzOSA0LjMzOSAwIDAgMSAuMDQxLS42MTggMS4xNCAxLjE0IDAgMCAxIC4xODItLjQ4OS45MzEuOTMxIDAgMCAxIC40MS0uMzIyIDEuODU2IDEuODU2IDAgMCAxIC43MjctLjExN2gzLjc2M2EuODMuODMgMCAwIDEgLjMxOS4wNjIuODY5Ljg2OSAwIDAgMSAuMjYxLjE2NC43NTQuNzU0IDAgMCAxIC4xNzYuMjQzLjcwOS43MDkgMCAwIDEgLjA2NC4zLjY4OS42ODkgMCAwIDEtLjA2NC4zLjc2NC43NjQgMCAwIDEtLjE3OS4yMzguODI1LjgyNSAwIDAgMS0uMjYxLjE2MS44NjcuODY3IDAgMCAxLS4zMTkuMDU5SDMuMDA2djEuOUg1Ljc2YS44NjcuODY3IDAgMCAxIC4zMTkuMDU5LjguOCAwIDAgMSAuMjYxLjE2NC44LjggMCAwIDEgLjE3Ni4yNDMuNjg5LjY4OSAwIDAgMSAuMDY0LjMuNjg5LjY4OSAwIDAgMS0uMDY0LjMuNzY0Ljc2NCAwIDAgMS0uMTc2LjI0LjgyNS44MjUgMCAwIDEtLjI2MS4xNjEuODY3Ljg2NyAwIDAgMS0uMzE5LjA1OUgzLjAwNnYyLjA1MUg2LjE3YS43NDguNzQ4IDAgMCAxIC4zLjA1OS43NjMuNzYzIDAgMCAxIC4yNDMuMTY0Ljc2My43NjMgMCAwIDEgLjE2NC4yNDMuNzQ4Ljc0OCAwIDAgMSAuMDU5LjMuNzQ4Ljc0OCAwIDAgMS0uMDU5LjMuNzMuNzMgMCAwIDEtLjE2NC4yNC43ODguNzg4IDAgMCAxLS4yNDMuMTYxLjc0OC43NDggMCAwIDEtLjMuMDM2em02LjIwNS00Ljc0YTEuNTIyIDEuNTIyIDAgMCAxIC4yLS44NTUuNzc3Ljc3NyAwIDAgMSAuNjk0LS4zLjg3Ni44NzYgMCAwIDEgLjc0Ny4zIDEuNCAxLjQgMCAwIDEgLjIyNi44NTUgMS44NjUgMS44NjUgMCAwIDEgLjMxOS0uNTEzIDIuMDg3IDIuMDg3IDAgMCAxIC40NjMtLjQgMi4yNzggMi4yNzggMCAwIDEgLjU2NS0uMjU1IDIuMiAyLjIgMCAwIDEgLjYzMy0uMDkxIDIuMzE2IDIuMzE2IDAgMCAxIC42LjA3OSAxLjgwNSAxLjgwNSAwIDAgMSAuNTUxLjI1MiAxLjgyNiAxLjgyNiAwIDAgMSAuNDQ4LjQzNyAxLjk3OSAxLjk3OSAwIDAgMSAuMy42MzMgMi41OCAyLjU4IDAgMCAxIC40MjgtLjY2MiAyLjIgMi4yIDAgMCAxIC41MzMtLjQzNCAyLjE1NiAyLjE1NiAwIDAgMSAuNi0uMjM0IDIuODcgMi44NyAwIDAgMSAuNjMtLjA3IDEuOTQ0IDEuOTQ0IDAgMCAxIC43MTguMTM1IDEuNjc2IDEuNjc2IDAgMCAxIC42LjQwNyAxLjk4OCAxLjk4OCAwIDAgMSAuNDE2LjY4NiAyLjczMyAyLjczMyAwIDAgMSAuMTU1Ljk2NHYyLjY0OGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di0yLjU2M2ExLjQ2OSAxLjQ2OSAwIDAgMC0uMDctLjQ3MiAxLjAyMiAxLjAyMiAwIDAgMC0uMi0uMzUyLjgyNC44MjQgMCAwIDAtLjMtLjIxNy45MDguOTA4IDAgMCAwLS4zNjMtLjA3MyAxLjM2OSAxLjM2OSAwIDAgMC0uNDU3LjA3NiAxLjAxMSAxLjAxMSAwIDAgMC0uMzc4LjIzNCAxLjE0MiAxLjE0MiAwIDAgMC0uMjU4LjQgMS42MTkgMS42MTkgMCAwIDAtLjEuNTkydjIuMzczYTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV2LTIuNDQ5YTEuNDM3IDEuNDM3IDAgMCAwLS4yNDktLjkxNC44MjEuODIxIDAgMCAwLS42NzctLjMxMSAxLjMxNCAxLjMxNCAwIDAgMC0uNDY5LjA4MiAxLjA0OCAxLjA0OCAwIDAgMC0uMzc1LjI0IDEuMTE3IDEuMTE3IDAgMCAwLS4yNDkuMzkzIDEuNDg1IDEuNDg1IDAgMCAwLS4wOTEuNTM5djIuNDI2YTEuNCAxLjQgMCAwIDEtLjIxMi44NTQuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV6TTIxLjI0LTIuOTY1YTQuMTE0IDQuMTE0IDAgMCAwIC4wNjIuNzMyIDEuOCAxLjggMCAwIDAgLjIxMS41OTUgMS4xMDYgMS4xMDYgMCAwIDAgLjQuNCAxLjIgMS4yIDAgMCAwIC42MTguMTQ2IDEuMDY1IDEuMDY1IDAgMCAwIC41NzEtLjE0NCAxLjA2MSAxLjA2MSAwIDAgMCAuMzcyLS40IDEuOTQgMS45NCAwIDAgMCAuMi0uNiA0LjI4NiA0LjI4NiAwIDAgMCAuMDYyLS43NSA0Ljc4MSA0Ljc4MSAwIDAgMC0uMDQ3LS42NTkgMi4xMjggMi4xMjggMCAwIDAtLjE3Ni0uNjEyIDEuMiAxLjIgMCAwIDAtLjM1Ny0uNDUxLjk1My45NTMgMCAwIDAtLjYtLjE3NiAxLjQ4OSAxLjQ4OSAwIDAgMC0uNjI0LjExNy45NTUuOTU1IDAgMCAwLS40MS4zNTcgMS42MjUgMS42MjUgMCAwIDAtLjIyLjYgNC44MjggNC44MjggMCAwIDAtLjA2Mi44NDV6bS0uMDA2LTEuNzc1YTEuOTg5IDEuOTg5IDAgMCAxIC4zNzUtLjU0NSAyLjMwNiAyLjMwNiAwIDAgMSAuNS0uMzkzIDIuMzUxIDIuMzUxIDAgMCAxIC41NzctLjIzNyAyLjM2MSAyLjM2MSAwIDAgMSAuNi0uMDc5IDEuOTczIDEuOTczIDAgMCAxIC45NzMuMjRBMi4zMTggMi4zMTggMCAwIDEgMjUtNS4xYTMuMDQ3IDMuMDQ3IDAgMCAxIC40NzIuOTczIDQuMjQgNC4yNCAwIDAgMSAuMTY0IDEuMiA0LjAzNSA0LjAzNSAwIDAgMS0uMTczIDEuMjEzIDIuOTA4IDIuOTA4IDAgMCAxLS40ODYuOTQ2IDIuMjU4IDIuMjU4IDAgMCAxLS43NS42MTggMi4xIDIuMSAwIDAgMS0uOTcuMjIzIDIuMjYgMi4yNiAwIDAgMS0xLjE3Mi0uMyAyLjQ5IDIuNDkgMCAwIDEtLjg1NS0uODU1VjEuMDJhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNS43NmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMy44NTV6bTYuMDc2LTEuMTc4bC4xMjktMS4yMTNhMi40NTUgMi40NTUgMCAwIDEgLjA2Mi0uMzUyIDEuMDM3IDEuMDM3IDAgMCAxIC4xNDEtLjMyMi43MjkuNzI5IDAgMCAxIC4yNjEtLjIzNy44OC44OCAwIDAgMSAuNDI4LS4wOTEuNjE1LjYxNSAwIDAgMSAuNTYuMjcgMS41IDEuNSAwIDAgMSAuMTczLjh2MS4xNDNoLjY1NmEuNzU3Ljc1NyAwIDAgMSAuNDg2LjE0OS41NjcuNTY3IDAgMCAxIC4xODguNDcyLjUyNS41MjUgMCAwIDEtLjIuNDQ4Ljg3OS44NzkgMCAwIDEtLjUzOS4xNDloLS41OTJ2Mi4yMTVxMCAuMzUyLjAxMi42YTEuMjExIDEuMjExIDAgMCAwIC4wNzYuNC40MjIuNDIyIDAgMCAwIC4xOTMuMjIzLjgxMy44MTMgMCAwIDAgLjM2OS4wNjdxLjE3IDAgLjMzMS4wMTVhLjgzMi44MzIgMCAwIDEgLjI4NC4wNzMuNDY3LjQ2NyAwIDAgMSAuMi4xNzMuNTc3LjU3NyAwIDAgMSAuMDczLjMxMy41NDMuNTQzIDAgMCAxLS4xMTEuMzU3LjcwNy43MDcgMCAwIDEtLjMxOS4yMDggMi4wNzYgMi4wNzYgMCAwIDEtLjUuMXEtLjI5LjAyNi0uNjQ3LjAyNmEyLjM2NiAyLjM2NiAwIDAgMS0uNzQ3LS4xMjMgMS40NDcgMS40NDcgMCAwIDEtLjU4LS4zNzIgMS43IDEuNyAwIDAgMS0uMzc1LS42NjIgMy4yNzYgMy4yNzYgMCAwIDEtLjEzMi0xVi00LjdoLS4yN2EuODkuODkgMCAwIDEtLjUyNy0uMTQ5LjU1MS41NTEgMCAwIDEtLjIxMS0uNDgzLjU2My41NjMgMCAwIDEgLjE2Ny0uNDI1LjcuNyAwIDAgMSAuNTA3LS4xNjF6TTMzLjItLjA3NmwtMS45MS00LjQ1OXEtLjA2NC0uMTQ2LS4xMi0uM2EuODc3Ljg3NyAwIDAgMS0uMDU2LS4zLjczNi43MzYgMCAwIDEgLjA2NC0uMzExLjcyMi43MjIgMCAwIDEgLjE3Ni0uMjQuODE5LjgxOSAwIDAgMSAuMjU4LS4xNTUuODgzLjg4MyAwIDAgMSAuMzE2LS4wNTYuNjQuNjQgMCAwIDEgLjMzNC4wOTEgMS4wOCAxLjA4IDAgMCAxIC4yNzguMjQzIDEuODEgMS44MSAwIDAgMSAuMjIzLjM0NnEuMS4xOTMuMTczLjM5M2wxLjEyNSAzLjA1OSAxLjE2LTMuMDc2YTEuNzI0IDEuNzI0IDAgMCAxIC4yNTgtLjQ5MiAxLjc0OCAxLjc0OCAwIDAgMSAuMzQtLjM0LjQzMi40MzIgMCAwIDEgLjE5LS4xNjcuNi42IDAgMCAxIC4yNDMtLjA1LjY1Ny42NTcgMCAwIDEgLjI4Ny4wNjQuNzc0Ljc3NCAwIDAgMSAuMjM3LjE3Ni44NTQuODU0IDAgMCAxIC4xNjEuMjUyQS43NTQuNzU0IDAgMCAxIDM3LTUuMWEuOTU1Ljk1NSAwIDAgMS0uMDcuMzM3cS0uMDcuMTg1LS4xMzUuMzQ5bC0yLjM1IDUuOTY1YTMuOTg4IDMuOTg4IDAgMCAxLS4xNjcuMzY5IDEuNjQ2IDEuNjQ2IDAgMCAxLS4yMDUuMzExLjk4NS45ODUgMCAwIDEtLjI1NS4yMTcuNjE2LjYxNiAwIDAgMS0uMzE2LjA4MiAxIDEgMCAwIDEtLjM0My0uMDU5LjgwOS44MDkgMCAwIDEtLjU0Mi0uNzc5IDEuMTc5IDEuMTc5IDAgMCAxIC4wODItLjM3MnEuMDc2LS4yLjE0MS0uMzg0em0xMy44MjctMS40ODNhLjc1OC43NTggMCAwIDEgLjMuMDYyLjc4Ni43ODYgMCAwIDEgLjI0OS4xNjcuNzg2Ljc4NiAwIDAgMSAuMTY3LjI0OS43NTguNzU4IDAgMCAxIC4wNjIuMy43NTguNzU4IDAgMCAxLS4wNjIuMy43ODYuNzg2IDAgMCAxLS4xNjcuMjQ5Ljc4Ni43ODYgMCAwIDEtLjI0OS4xNjcuNzU4Ljc1OCAwIDAgMS0uMy4wNjJoLTQuMDEzYS45NDYuOTQ2IDAgMCAxLS41MjctLjEzOCAxLjAyMSAxLjAyMSAwIDAgMS0uMzM4LS4zNTkgMS42MDYgMS42MDYgMCAwIDEtLjE3Ni0uNTEzIDMuNDIyIDMuNDIyIDAgMCAxLS4wNS0uNTg2di01Ljc3MmExLjE3NCAxLjE3NCAwIDAgMSAuMDg1LS40NDggMS4xNjYgMS4xNjYgMCAwIDEgLjIzMS0uMzYzIDEuMDY1IDEuMDY1IDAgMCAxIC4zNDMtLjI0MyAxLjAyNyAxLjAyNyAwIDAgMSAuNDI1LS4wODggMS4wMjcgMS4wMjcgMCAwIDEgLjQyNS4wODggMS4xIDEuMSAwIDAgMSAuMzQ2LjI0MyAxLjE0IDEuMTQgMCAwIDEgLjIzNC4zNjMgMS4xNzQgMS4xNzQgMCAwIDEgLjA4NS40NDhsLjAwMyA1LjgxMnptMy42NjItNi40MjFhLjY2My42NjMgMCAwIDEtLjA4OC4zNDMuOC44IDAgMCAxLS4yMjkuMjQ5IDEuMDE0IDEuMDE0IDAgMCAxLS4zMjUuMTQ5IDEuNDQ0IDEuNDQ0IDAgMCAxLS4zNzguMDUgMS40MTIgMS40MTIgMCAwIDEtLjM5LS4wNTMgMS4wMjQgMS4wMjQgMCAwIDEtLjMyNS0uMTU1Ljc3NC43NzQgMCAwIDEtLjIyMy0uMjQ5LjY3Mi42NzIgMCAwIDEtLjA4Mi0uMzM0LjYzOS42MzkgMCAwIDEgLjA3OS0uMzEzLjgxMi44MTIgMCAwIDEgLjIxNC0uMjQ5IDEgMSAwIDAgMSAuMzIyLS4xNjQgMS4zNjkgMS4zNjkgMCAwIDEgLjQxLS4wNTkgMS4zNjkgMS4zNjkgMCAwIDEgLjM3OC4wNTMgMS4wNjIgMS4wNjIgMCAwIDEgLjMyNS4xNTIuNzc2Ljc3NiAwIDAgMSAuMjI2LjI0Ni42NTMuNjUzIDAgMCAxIC4wODYuMzM0ek01MC42LTEuMTU0YTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTVWLTQuNzRhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMi44NjUtMy4xN2EuNC40IDAgMCAwIC4yLjM1NCAxLjgxNyAxLjgxNyAwIDAgMCAuNTUxLjIwOHEuMzM0LjA3Ni42ODYuMTQ2dC42ODYuMTYxYTUuMDE5IDUuMDE5IDAgMCAxIC42MjcuMjE0IDIuMDM4IDIuMDM4IDAgMCAxIC41MTYuMzA4IDEuMzQ4IDEuMzQ4IDAgMCAxIC4zNTIuNDQ1IDEuNCAxLjQgMCAwIDEgLjEyOS42MjQgMS43MDkgMS43MDkgMCAwIDEtLjE4Ny44MTIgMS43MjkgMS43MjkgMCAwIDEtLjUzLjYgMi42MTIgMi42MTIgMCAwIDEtLjgxNy4zODEgMy45ODMgMy45ODMgMCAwIDEtMS4wNTEuMTQxQTcuOTEgNy45MSAwIDAgMSA1My41NzggMGE0LjMyOSA0LjMyOSAwIDAgMS0uODk0LS4yMDggMS45MDYgMS45MDYgMCAwIDEtLjYyNC0uMzQ5LjYzNS42MzUgMCAwIDEtLjIzNC0uNDg5LjQ3My40NzMgMCAwIDEgLjE1OC0uMzgxLjYuNiAwIDAgMSAuNC0uMTM1Ljg2Ni44NjYgMCAwIDEgLjIyMy4wMzVxLjEyOS4wMzUuMjgxLjA4OGwuMzI1LjExNHEuMTczLjA2Mi4zNi4xMDhhNC4yMzggNC4yMzggMCAwIDAgLjQ4My4xIDMuMzg3IDMuMzg3IDAgMCAwIC41MTMuMDM4QTEuNjEgMS42MSAwIDAgMCA1NC45LTEuMWExLjAzOSAxLjAzOSAwIDAgMCAuMjg0LS4xLjY0NC42NDQgMCAwIDAgLjIwOC0uMTczLjUuNSAwIDAgMCAuMS0uMjU4LjUzNy41MzcgMCAwIDAgLjAyOS0uMDcuMjYuMjYgMCAwIDAgLjAxMi0uMDgyLjM4LjM4IDAgMCAwLS4xNDktLjI5MyAxLjA5IDEuMDkgMCAwIDAtLjQxOS0uMjA1cS0uNDUxLS4xMDUtLjg2MS0uMTkzdC0uNzU5LS4xODdhNC41NzcgNC41NzcgMCAwIDEtLjYzMy0uMjI5IDEuNzExIDEuNzExIDAgMCAxLS40OC0uMzE2IDEuMyAxLjMgMCAwIDEtLjMtLjQ1MSAxLjY3OSAxLjY3OSAwIDAgMS0uMTA4LS42MzlBMS40MiAxLjQyIDAgMCAxIDUyLTUuMDI0YTEuNTQ1IDEuNTQ1IDAgMCAxIC41My0uNTM2IDIuNzMxIDIuNzMxIDAgMCAxIC44MzgtLjMzMSA0Ljk0IDQuOTQgMCAwIDEgMS4xMTMtLjExNCA0LjIyNSA0LjIyNSAwIDAgMSAxLjcuMjY3cS41ODMuMjY3LjU4My42OTRhLjQ0LjQ0IDAgMCAxLS4xNTguMzY2LjU5Mi41OTIgMCAwIDEtLjM4MS4xMjYuNzM3LjczNyAwIDAgMS0uMjQzLS4wNDRxLS4xMjYtLjA0NC0uMy0uMWEzLjQyMSAzLjQyMSAwIDAgMC0uNDE5LS4xIDMuNDUzIDMuNDUzIDAgMCAwLS42LS4wNDQgNC42NDMgNC42NDMgMCAwIDAtLjQ4OS4wMjMgMS41MjkgMS41MjkgMCAwIDAtLjM3NS4wODIuNTc0LjU3NCAwIDAgMC0uMjQuMTU4LjM3NS4zNzUgMCAwIDAtLjA5Mi4yNTN6bTUuMzQ0LTEuNTk0bC4xMjktMS4yMTNBMi40NTUgMi40NTUgMCAwIDEgNTktNy40ODJhMS4wMzcgMS4wMzcgMCAwIDEgLjE0MS0uMzIyLjcyOS43MjkgMCAwIDEgLjI2MS0uMjM3Ljg4Ljg4IDAgMCAxIC40MjgtLjA5MS42MTUuNjE1IDAgMCAxIC41Ni4yNyAxLjUgMS41IDAgMCAxIC4xNzMuOHYxLjE0M2guNjU2YS43NTcuNzU3IDAgMCAxIC40ODYuMTQ5LjU2Ny41NjcgMCAwIDEgLjE4OC40NzIuNTI1LjUyNSAwIDAgMS0uMi40NDguODc5Ljg3OSAwIDAgMS0uNTM5LjE0OWgtLjU5MnYyLjIxNXEwIC4zNTIuMDEyLjZhMS4yMTEgMS4yMTEgMCAwIDAgLjA3Ni40LjQyMi40MjIgMCAwIDAgLjE5My4yMjMuODEzLjgxMyAwIDAgMCAuMzY5LjA2N3EuMTcgMCAuMzMxLjAxNWEuODMyLjgzMiAwIDAgMSAuMjg0LjA3My40NjcuNDY3IDAgMCAxIC4yLjE3My41NzcuNTc3IDAgMCAxIC4wNzMuMzEzLjU0My41NDMgMCAwIDEtLjExMS4zNTcuNzA3LjcwNyAwIDAgMS0uMzE5LjIwOCAyLjA3NiAyLjA3NiAwIDAgMS0uNS4xcS0uMjkuMDI2LS42NDcuMDI2YTIuMzY2IDIuMzY2IDAgMCAxLS43NDctLjEyMyAxLjQ0NyAxLjQ0NyAwIDAgMS0uNTgtLjM3MiAxLjcgMS43IDAgMCAxLS4zNzUtLjY2MiAzLjI3NiAzLjI3NiAwIDAgMS0uMTMyLTFWLTQuN2gtLjI3YS44OS44OSAwIDAgMS0uNTI3LS4xNDkuNTUxLjU1MSAwIDAgMS0uMjExLS40ODMuNTYzLjU2MyAwIDAgMSAuMTY3LS40MjUuNy43IDAgMCAxIC41MDctLjE2MXoiIGNsYXNzPSJjbHMtMiIgZGF0YS1uYW1lPSJQYXRoIDUwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTU4IDE0Ni43NDMpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);\n}\n.multiselect-box .list-group-item:nth-child(even),\n.multiselect-box .list-group-item:hover {\n  background-color: #f5f1f1;\n}\n\n", map: {"version":3,"sources":["/Users/macosx/Desktop/vue-multiselection-box/src/components/multi-selection-box.vue"],"names":[],"mappings":";AAuPA;EACA,mDAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;AACA;AAEA;EACA,8BAAA;EACA,+BAAA;EACA,YAAA;EACA,iBAAA;EACA,yBAAA;EACA,kBAAA;EACA,iBAAA;EACA,YAAA;AACA;AAEA;EACA,OAAA;AACA;AAEA;EACA,yBAAA;EACA,aAAA;EACA,cAAA;AACA;AAEA;EACA,yBAAA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,uBAAA;EACA,kBAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,gCAAA;AACA;AAEA;EACA,aAAA;EACA,gCAAA;AACA;AAEA;EACA,eAAA;EACA,yBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;AACA;AAEA;EACA,yBAAA;EACA,WAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;AACA;AAEA;;EAEA,yBAAA;AACA;AAEA;EACA,aAAA;EACA,yBAAA;AACA;AACA;;EAEA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,2BAAA;EACA,mBAAA;EACA,qBAAA;EACA,iCAAA;EACA,kCAAA;EACA,4BAAA;EACA,kCAAA;AACA;AAEA;EACA,iyOAAA;AACA;AAEA;AACA,y7WAAA;AAAA;AAEA;;EAEA,yBAAA;AACA","file":"multi-selection-box.vue","sourcesContent":["<template>\n  <section class=\"vue-multiselectbox\">\n    <div class=\"multiselect-header\">\n      <div class=\"multiselect-title\" :style=\"leftSection.styles\">\n        {{ leftSection.text }}\n      </div>\n      <div class=\"multiselect-title\" :style=\"rightSection.styles\">\n        {{ rightSection.text }}\n      </div>\n    </div>\n\n    <div class=\"multiselect-container\">\n      <div class=\"multiselect-box\">\n        <div class=\"multiselect-box-border multiselect-box-border-first\">\n          <div class=\"multiselect-box-search\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              :placeholder=\"\n                `${\n                  baseList.length > 1\n                    ? 'Search in ' + baseList.length + ' entries'\n                    : 'Search in ' + baseList.length + ' entry'\n                }`\n              \"\n              v-model=\"baseSearchValue\"\n            />\n            <select\n              v-if=\"isSortable\"\n              class=\"form-control\"\n              v-model=\"leftSection.sortOption\"\n            >\n              <option :value=\"null\" disabled>Sort Options</option>\n              <option value=\"asc\">Ascended</option>\n              <option value=\"desc\">Descended</option>\n            </select>\n          </div>\n          <transition-group v-if=\"filteredBase.length\" class=\"list-group\">\n            <li\n              v-for=\"b in filteredBase\"\n              :key=\"b[mappingOptions.key]\"\n              class=\"list-group-item\"\n              @click=\"transferToRight(b)\"\n            >\n              {{ b[mappingOptions.value] }}\n            </li>\n          </transition-group>\n        </div>\n        <transition name=\"fade\">\n          <div v-if=\"filteredBase.length\" class=\"btn-wrapper\">\n            <a class=\"btn-move\" @click=\"addAll\" />\n          </div>\n        </transition>\n      </div>\n      <div class=\"multiselect-box\">\n        <div class=\"multiselect-box-border multiselect-box-border-first\">\n          <div class=\"multiselect-box-search\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              :placeholder=\"\n                `${\n                  selectedList.length > 1\n                    ? 'Search in ' + selectedList.length + ' entries'\n                    : 'Search in ' + selectedList.length + ' entry'\n                }`\n              \"\n              v-model=\"selectedSearchValue\"\n            />\n            <select\n              v-if=\"isSortable\"\n              class=\"form-control\"\n              v-model=\"rightSection.sortOption\"\n            >\n              <option :value=\"null\" disabled>Sort Options</option>\n              <option value=\"asc\">Ascended</option>\n              <option value=\"desc\">Descended</option>\n            </select>\n          </div>\n\n          <transition-group v-if=\"filteredSelected.length\" class=\"list-group\">\n            <li\n              v-for=\"b in filteredSelected\"\n              :key=\"b[mappingOptions.key]\"\n              class=\"list-group-item selected\"\n              @click=\"transferToLeft(b)\"\n            >\n              {{ b[mappingOptions.value] }}\n            </li>\n          </transition-group>\n        </div>\n        <transition name=\"fade\">\n          <div v-if=\"filteredSelected.length\" class=\"btn-wrapper\">\n            <a class=\"btn-empty\" @click=\"removeAll\" />\n          </div>\n        </transition>\n      </div>\n    </div>\n  </section>\n</template>\n\n<script>\nexport default {\n\n  props: {\n    leftSection: {\n      type: Object,\n      default: () => ({\n        text: \"Available\",\n        styles: {\n          backgroundColor: \"#0acf97\"\n        },\n        sortOption: null\n      })\n    },\n\n    rightSection: {\n      type: Object,\n      default: () => ({\n        text: \"Assigned\",\n        styles: {\n          backgroundColor: \"#727df5\"\n        },\n        sortOption: null\n      })\n    },\n    mappingOptions: {\n      type: Object,\n      default: () => ({\n        value: \"name\",\n        key: \"id\"\n      })\n    },\n\n    baseList: {\n      type: Array,\n      default: () => [\n        { id: 1, name: \"Person 1\" },\n        { id: 3, name: \"Person 3\" },\n        { id: 4, name: \"Person 4\" },\n        { id: 5, name: \"Person 5\" }\n      ]\n    },\n\n    selectedList: {\n      type: Array,\n      default: () => [\n        { id: 2, name: \"Person 2\" },\n        { id: 6, name: \"Person 6\" },\n        { id: 7, name: \"Person 7\" }\n      ]\n    },\n\n    isSortable: {\n      type: Boolean,\n      default: true\n    }\n  },\n\n  data: () => ({\n    baseSearchValue: \"\",\n    selectedSearchValue: \"\"\n  }),\n  computed: {\n    baseListLocal: {\n      get: function() {\n        return this.baseList;\n      },\n      set: function(item) {\n        this.$emit(\"updateBase\", item);\n      }\n    },\n    selectedListLocal: {\n      get: function() {\n        return this.selectedList;\n      },\n      set: function(item) {\n        this.$emit(\"updateSelected\", item);\n      }\n    },\n    filteredBase() {\n      return this.baseListLocal\n        .filter(item => {\n          return item[this.mappingOptions.value]\n            .toLowerCase()\n            .includes(this.baseSearchValue.toLowerCase());\n        })\n        .sort(this[this.leftSection.sortOption]);\n    },\n    filteredSelected() {\n      return this.selectedListLocal\n        .filter(item => {\n          return item[this.mappingOptions.value]\n            .toLowerCase()\n            .includes(this.selectedSearchValue.toLowerCase());\n        })\n        .sort(this[this.rightSection.sortOption]);\n    }\n  },\n\n  methods: {\n    addAll() {\n      this.selectedListLocal = [\n        ...this.selectedListLocal,\n        ...this.baseListLocal\n      ];\n      this.baseListLocal = [];\n    },\n\n    removeAll() {\n      this.baseListLocal = [...this.baseListLocal, ...this.selectedListLocal];\n      this.selectedListLocal = [];\n    },\n\n    transferToRight(item) {\n      this.baseListLocal = this.baseListLocal.filter(\n        listItem =>\n          listItem[this.mappingOptions.key] !== item[this.mappingOptions.key]\n      );\n      this.selectedListLocal = [...this.selectedListLocal, item];\n    },\n\n    transferToLeft(item) {\n      this.selectedListLocal = this.selectedListLocal.filter(\n        listItem =>\n          listItem[this.mappingOptions.key] !== item[this.mappingOptions.key]\n      );\n\n      this.baseListLocal = [...this.baseListLocal, item];\n    },\n\n    asc(a, b) {\n      return a[this.mappingOptions.value].localeCompare(\n        b[this.mappingOptions.value]\n      );\n    },\n\n    desc(a, b) {\n      return b[this.mappingOptions.value].localeCompare(\n        a[this.mappingOptions.value]\n      );\n    }\n  }\n};\n</script>\n\n<style>\n  .vue-multiselectbox {\n    font-family: \"Avenir\", Helvetica, Arial, sans-serif;\n  }\n\n  .multiselect-container {\n    display: flex;\n    flex-flow: row wrap;\n  }\n\n  .multiselect-header {\n    display: flex;\n    flex-direction: row;\n    margin: 0px !important;\n    padding-bottom: 0px;\n    color: white;\n    font-size: medium;\n  }\n\n  .multiselect-title {\n    border-top-left-radius: 0.5rem;\n    border-top-right-radius: 0.5rem;\n    height: 31px;\n    line-height: 31px;\n    background-color: #727df5;\n    padding-left: 16px;\n    font-weight: bold;\n    flex: 1 100%;\n  }\n\n  .multiselect-box {\n    flex: 1;\n  }\n\n  .multiselect-box-border {\n    border: solid 1px #707070;\n    height: 245px;\n    overflow: auto;\n  }\n\n  .multiselect-box-border-first {\n    background-color: #f7f7f7;\n    border-right: transparent;\n  }\n\n  .multiselect-box .form-control {\n    margin: 7px 15px;\n    height: 32px;\n    width: 100%;\n    background-color: white;\n    padding-left: 10px;\n  }\n\n  .multiselect-box-search {\n    display: flex;\n    align-items: center;\n    border-bottom: solid 1px #707070;\n  }\n\n  .multiselect-box-filtering {\n    display: flex;\n    border-bottom: solid 1px #707070;\n  }\n\n  .multiselect-box .list-group-item {\n    cursor: pointer;\n    background-color: #e8e7e7;\n    padding: 0 12px;\n    height: 39px;\n    line-height: 39px;\n    border-radius: 0;\n  }\n\n  .multiselect-box .list-group-item.selected {\n    background-color: #4a8ef1;\n    color: #fff;\n  }\n\n  .multiselect-box .list-group {\n    display: flex;\n    flex-direction: column;\n    padding-left: 0;\n    margin-bottom: 0;\n    list-style-type: none;\n  }\n\n  .multiselect-box .list-group-item.selected:nth-child(even),\n  .multiselect-box .list-group-item.selected:hover {\n    background-color: #3975f1;\n  }\n\n  .multiselect-container .btn-wrapper {\n    display: flex;\n    justify-content: flex-end;\n  }\n  .multiselect-container .btn-move,\n  .multiselect-container .btn-empty {\n    cursor: pointer;\n    font-weight: bold;\n    padding: 15px 18px;\n    width: 115px;\n    height: 35px;\n    border-width: 0 1px 1px 1px;\n    border-style: solid;\n    border-color: #707070;\n    border-bottom-left-radius: 0.5rem;\n    border-bottom-right-radius: 0.5rem;\n    background-repeat: no-repeat;\n    background-position: center center;\n  }\n\n  .multiselect-container .btn-move {\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NC4zNjUiIGhlaWdodD0iMTQuNTk1IiB2aWV3Qm94PSIwIDAgODQuMzY1IDE0LjU5NSI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIC5jbHMtMXtmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJtb3ZlLWFsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3OS45OTYgLTUyMi40MDUpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0iYXJyb3ciIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zMyIgZD0iTTAgNy4zTDguOTE5IDB2NC4wNTRoOS40NjR2Ni40ODZIOC45MTl2NC4wNTR6IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzMyIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzUxIiBkPSJNOS4zMjgtNi40NjNxLS41MjEgMS4yODktLjkzMiAyLjMtLjE3Ni40MzQtLjM0Ljg0NHQtLjMuNzMybC0uMjE0LjUyMS0uMDc2LjE5M3EtLjEyMy4zLS4yNjEuNTY4YTIuMzMgMi4zMyAwIDAgMS0uMzA1LjQ3IDEuNDM2IDEuNDM2IDAgMCAxLS40LjMyMiAxLjA0IDEuMDQgMCAwIDEtLjUwNy4xMiAxLjEwNiAxLjEwNiAwIDAgMS0uNDYzLS4wOTEgMS4xMjQgMS4xMjQgMCAwIDEtLjM2Ni0uMjc1IDIuMjQ4IDIuMjQ4IDAgMCAxLS4zMTMtLjQ2MyA2LjcyNiA2LjcyNiAwIDAgMS0uMjkzLS42NDdsLTEuODQ1LTQuNTdWLS44NWEuODQzLjg0MyAwIDAgMS0uMDY3LjMzNC44My44MyAwIDAgMS0uMTg1LjI3Mi44ODkuODg5IDAgMCAxLS4yNzUuMTgyLjg0My44NDMgMCAwIDEtLjMzNC4wNjcuODQzLjg0MyAwIDAgMS0uMzM0LS4wNjcuODU0Ljg1NCAwIDAgMS0uMjcyLS4xODIuODU0Ljg1NCAwIDAgMS0uMTgyLS4yNzJBLjg0My44NDMgMCAwIDEgMS0uODV2LTUuNDA4YTcuNDc2IDcuNDc2IDAgMCAxIC4wNTMtLjkyOSAxLjk4MyAxLjk4MyAwIDAgMSAuMjEtLjcxMyAxLjEzNCAxLjEzNCAwIDAgMSAuNDUxLS40NTQgMS41NzEgMS41NzEgMCAwIDEgLjc2NS0uMTYxIDEuNDExIDEuNDExIDAgMCAxIC41OTUuMTE3IDEuMzg1IDEuMzg1IDAgMCAxIC40NzUuMzc4IDMuNDQyIDMuNDQyIDAgMCAxIC40MjguNjc3cS4yMDguNDE2LjQ1NCAxLjAwOGwxLjU2MyAzLjc4aC4wNDdsMS41ODItMy43NzlxLjIxMS0uNS40MTMtLjkwOGEzLjczMyAzLjczMyAwIDAgMSAuNDMxLS42ODYgMS43NjkgMS43NjkgMCAwIDEgLjUtLjQzNCAxLjIyOCAxLjIyOCAwIDAgMSAuNjE1LS4xNTIgMS43NTMgMS43NTMgMCAwIDEgLjY1My4xMTEgMS4wMjYgMS4wMjYgMCAwIDEgLjQ1Ny4zNTcgMS43MTUgMS43MTUgMCAwIDEgLjI2Ny42MzYgNC4zMzYgNC4zMzYgMCAwIDEgLjA4OC45NHY1LjYyYS44NDMuODQzIDAgMCAxLS4wNjcuMzM0LjgzLjgzIDAgMCAxLS4xODUuMjcyLjg4OS44ODkgMCAwIDEtLjI3NS4xODIuODQzLjg0MyAwIDAgMS0uMzM0LjA2Ny44NDMuODQzIDAgMCAxLS4zMzYtLjA2Ny44NTQuODU0IDAgMCAxLS4yNzItLjE4Mi44NTQuODU0IDAgMCAxLS4xNzgtLjI3Mi44NDMuODQzIDAgMCAxLS4wNzItLjMzNHptMy4xMjMgMy41MWEzLjQgMy40IDAgMCAxIC4yLTEuMTc1IDIuNjg3IDIuNjg3IDAgMCAxIC42MDktLjk3IDIuOTM2IDIuOTM2IDAgMCAxIDEuMDItLjY2MiAzLjg0NCAzLjg0NCAwIDAgMSAxLjQzOC0uMjQ2IDMuOTczIDMuOTczIDAgMCAxIDEuNC4yMjkgMi45IDIuOSAwIDAgMSAxLjAyNS42MzYgMi43IDIuNyAwIDAgMSAuNjMzLjk2N0EzLjM1NCAzLjM1NCAwIDAgMSAxOS0yLjk1M2EzLjI5IDMuMjkgMCAwIDEtLjIwNSAxLjE2MyAyLjY4NCAyLjY4NCAwIDAgMS0uNjE1Ljk2MSAyLjk1IDIuOTUgMCAwIDEtMS4wMjUuNjU2IDMuODczIDMuODczIDAgMCAxLTEuNDMuMjQzIDMuOTg4IDMuOTg4IDAgMCAxLTEuNDE1LS4yMzFBMi45IDIuOSAwIDAgMSAxMy4yOC0uOGEyLjYzMiAyLjYzMiAwIDAgMS0uNjIxLS45NjEgMy4zNjMgMy4zNjMgMCAwIDEtLjIwOC0xLjE5MnptMS45NTEgMGEzLjcxNCAzLjcxNCAwIDAgMCAuMDcuNzM1IDEuOTYyIDEuOTYyIDAgMCAwIC4yMjYuNjEyIDEuMiAxLjIgMCAwIDAgLjQwNy40MTkgMS4xNTEgMS4xNTEgMCAwIDAgLjYxNS4xNTUgMS4xNjYgMS4xNjYgMCAwIDAgLjU4My0uMTQxIDEuMTU5IDEuMTU5IDAgMCAwIC40MS0uMzkzIDEuOTIyIDEuOTIyIDAgMCAwIC4yNDMtLjYwNiAzLjQ3MiAzLjQ3MiAwIDAgMCAuMDgyLS43ODIgMy41NyAzLjU3IDAgMCAwLS4wNzMtLjczNSAyIDIgMCAwIDAtLjIzMS0uNjE1IDEuMjIzIDEuMjIzIDAgMCAwLS40MDctLjQyMiAxLjEyNCAxLjEyNCAwIDAgMC0uNjA2LS4xNTUgMS4xNTcgMS4xNTcgMCAwIDAtLjYwOS4xNTIgMS4yIDEuMiAwIDAgMC0uNDEuNDE2IDEuOTE3IDEuOTE3IDAgMCAwLS4yMjkuNjE1IDMuNzg5IDMuNzg5IDAgMCAwLS4wNzMuNzQ1em05LjY4IDEuNjUzYTMuMTQzIDMuMTQzIDAgMCAxLS4yNzUuNiAxLjYwNiAxLjYwNiAwIDAgMS0uMzQuNCAxLjE5MiAxLjE5MiAwIDAgMS0uNDIyLjIyNiAxLjgzMyAxLjgzMyAwIDAgMS0uNTI3LjA3IDEuNDg3IDEuNDg3IDAgMCAxLS42LS4xMTEgMS4zMTUgMS4zMTUgMCAwIDEtLjQ1NC0uMzQgMi41NiAyLjU2IDAgMCAxLS4zNzItLjU3N3EtLjE3LS4zNDktLjM0Ni0uODIzTDE5LjgtNC4zODNxLS4wNjQtLjE2NC0uMTQxLS4zNTRhLjk0Ny45NDcgMCAwIDEtLjA3Ni0uMzQ5LjgyNy44MjcgMCAwIDEgLjA2NC0uMzMxLjc0Mi43NDIgMCAwIDEgLjE3OS0uMjU1LjgyNi44MjYgMCAwIDEgLjI2Ny0uMTY0LjkwNi45MDYgMCAwIDEgLjMyOC0uMDU5LjY4LjY4IDAgMCAxIC4zOS4xMjYgMS40MiAxLjQyIDAgMCAxIC4zMzEuMzE5IDIuNCAyLjQgMCAwIDEgLjI1NS40MjIgMi41IDIuNSAwIDAgMSAuMTYxLjQyOGwuOTYxIDIuOTgyIDEuMDI1LTMuMmEyLjk0OSAyLjk0OSAwIDAgMSAuMTU1LS40MTkgMS41MjUgMS41MjUgMCAwIDEgLjIxNC0uMzQzLjk3My45NzMgMCAwIDEgLjI3OC0uMjMxLjcyNi43MjYgMCAwIDEgLjM1NC0uMDg1IDEuMDMxIDEuMDMxIDAgMCAxIC4zMjguMDUzLjgyNi44MjYgMCAwIDEgLjI3OC4xNTUuNzc1Ljc3NSAwIDAgMSAuMTkzLjI1Mi43ODMuNzgzIDAgMCAxIC4wNzMuMzQ5IDEuMDI2IDEuMDI2IDAgMCAxLS4wNy4zNDZsLS4xMjkuMzU3cS0uMjgxLjc3OS0uNTY1IDEuNTQ0em04LjAzMy0xLjg0YS40MTYuNDE2IDAgMCAxLS4xNTguMzU3LjcyNS43MjUgMCAwIDEtLjQzOS4xMTdoLTMuNjI3YTEuNjE0IDEuNjE0IDAgMCAwIC40MDcgMS4xIDEuNTM3IDEuNTM3IDAgMCAwIDEuMTUxLjM5IDMuMjU1IDMuMjU1IDAgMCAwIC40NzItLjAzMiAzLjkxIDMuOTEgMCAwIDAgLjQzMS0uMDg4cS4yMTEtLjA1Ni40MjItLjEyNmwuNDM5LS4xNDZhLjM4Mi4zODIgMCAwIDEgLjEzNS0uMDI5LjM3NS4zNzUgMCAwIDEgLjMxMS4xNDkuNTQ5LjU0OSAwIDAgMSAuMTE3LjM0OS42MDkuNjA5IDAgMCAxLS4wNDEuMjIzIDEuMDQ2IDEuMDQ2IDAgMCAxLS4zODcuNDY2IDIuMjgxIDIuMjgxIDAgMCAxLS42MjEuMjkzIDMuODkzIDMuODkzIDAgMCAxLS43NDQuMTQ5IDcuMjI3IDcuMjI3IDAgMCAxLS43NS4wNDEgMy45NjkgMy45NjkgMCAwIDEtMS4yNTctLjE5MyAyLjg0OCAyLjg0OCAwIDAgMS0xLjAxMS0uNTggMi42MyAyLjYzIDAgMCAxLS42NzEtLjk1NSAzLjM4OCAzLjM4OCAwIDAgMS0uMjQzLTEuMzMgMi45OTEgMi45OTEgMCAwIDEgLjIzNC0xLjE4NCAyLjg3OCAyLjg3OCAwIDAgMSAuNjUzLS45NTUgMy4wOTIgMy4wOTIgMCAwIDEgMS0uNjM5IDMuMzQxIDMuMzQxIDAgMCAxIDEuMjYyLS4yMzEgMy4zIDMuMyAwIDAgMSAxLjI5NS4yMzEgMi41NjMgMi41NjMgMCAwIDEgLjkuNjIxIDIuNTI3IDIuNTI3IDAgMCAxIC41MzMuOTA4IDMuNDkzIDMuNDkzIDAgMCAxIC4xODcgMS4wOTN6bS0xLjU2NC0uMzZhMi4xMjUgMi4xMjUgMCAwIDAtLjEwOC0uNTc0IDEuMzc2IDEuMzc2IDAgMCAwLS4yNTgtLjQ1NyAxLjE1NiAxLjE1NiAwIDAgMC0uNDEtLjMgMS4zNzggMS4zNzggMCAwIDAtLjU2NS0uMTA4IDEuMjA3IDEuMjA3IDAgMCAwLS41My4xMTQgMS4yODIgMS4yODIgMCAwIDAtLjQxLjMxMSAxLjQ0MyAxLjQ0MyAwIDAgMC0uMjcuNDU3IDEuOTI2IDEuOTI2IDAgMCAwLS4xMTQuNTZ6bTkuODE0LTMuNDFsLTEuMjg5IDMuNzY5aDIuNmwtMS4yODEtMy43Njd6bTMuODIgNS4xMzNsLjA4OC4yMnEuMDQ3LjExNS4wODguMjMxLjA0MS4xMTcuMDY3LjIyNmEuODM4LjgzOCAwIDAgMSAuMDI2LjIuODg3Ljg4NyAwIDAgMS0uMDc5LjM4NC44MjguODI4IDAgMCAxLS4yMTQuMjgxLjk2NS45NjUgMCAwIDEtLjMxMy4xNzYgMS4xNTMgMS4xNTMgMCAwIDEtLjM3Ny4wNTkgMS4wNzMgMS4wNzMgMCAwIDEtLjM5My0uMDY0Ljc4NC43ODQgMCAwIDEtLjI5My0uMjA1IDEuNSAxLjUgMCAwIDEtLjIzNy0uMzY2cS0uMTA4LS4yMjYtLjIzMS0uNTU0bC0uMjgxLS43NDRoLTMuMzE3bC0uMjQuNzQ0YTQuNDc3IDQuNDc3IDAgMCAxLS4yMTQuNTYzIDEuMzgzIDEuMzgzIDAgMCAxLS4yNC4zNjYuNzg0Ljc4NCAwIDAgMS0uMy4yIDEuMTcgMS4xNyAwIDAgMS0uNC4wNjIgMS4xNTMgMS4xNTMgMCAwIDEtLjM3OC0uMDYyLjk2NS45NjUgMCAwIDEtLjMxMy0uMTc2LjgyOC44MjggMCAwIDEtLjIxNC0uMjgxLjg4Ny44ODcgMCAwIDEtLjA4LS4zODMuODM4LjgzOCAwIDAgMSAuMDI2LS4ycS4wMjYtLjEwOC4wNjctLjIyNnQuMDg4LS4yMzFxLjA0Ny0uMTE0LjA4OC0uMjJsMS41NzYtNC4yNnEuMjIzLS42LjQyNS0xLjA1OGEzLjc0NCAzLjc0NCAwIDAgMSAuNDQ1LS43NzYgMS42NTMgMS42NTMgMCAwIDEgLjU2LS40NzggMS42NzYgMS42NzYgMCAwIDEgLjc2OC0uMTYxIDEuODUyIDEuODUyIDAgMCAxIC43MjEuMTI2IDEuNDE4IDEuNDE4IDAgMCAxIC41MzkuNDE2IDMuNDQ3IDMuNDQ3IDAgMCAxIC40NTcuNzY4cS4yMTcuNDc1LjQ4IDEuMTY2em0zLjIxMS42MjFhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNi4xOTJhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMy4yNDYgMGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di02LjE5MmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMjYuODU1eiIgY2xhc3M9ImNscy0xIiBkYXRhLW5hbWU9IlBhdGggNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODUgMTQ2Ljc0MykiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);\n    }\n\n  .multiselect-container .btn-empty {\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OS4wOTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA4OS4wOTggMjIiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojNWY1ZjVmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4fS5jbHMtMntmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJlbXB0eS1saXN0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc5IC01MTkpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0idHJhc2giIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0idHJhc2gtMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDQzLjY4IDkuNSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0IiBkPSJNMyA2aDE4IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzNCIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM1IiBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJQYXRoIDM1Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU2IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTEpIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU3IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQgMTEpIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTAiIGQ9Ik0xLjk1NyAwYS45NDguOTQ4IDAgMCAxLS41LS4xMjMuOTc4Ljk3OCAwIDAgMS0uMzI1LS4zMTkgMS4zNjMgMS4zNjMgMCAwIDEtLjE3Ny0uNDQzQTIuMzQzIDIuMzQzIDAgMCAxIC45LTEuMzc3di01LjU4NGE0LjMzOSA0LjMzOSAwIDAgMSAuMDQxLS42MTggMS4xNCAxLjE0IDAgMCAxIC4xODItLjQ4OS45MzEuOTMxIDAgMCAxIC40MS0uMzIyIDEuODU2IDEuODU2IDAgMCAxIC43MjctLjExN2gzLjc2M2EuODMuODMgMCAwIDEgLjMxOS4wNjIuODY5Ljg2OSAwIDAgMSAuMjYxLjE2NC43NTQuNzU0IDAgMCAxIC4xNzYuMjQzLjcwOS43MDkgMCAwIDEgLjA2NC4zLjY4OS42ODkgMCAwIDEtLjA2NC4zLjc2NC43NjQgMCAwIDEtLjE3OS4yMzguODI1LjgyNSAwIDAgMS0uMjYxLjE2MS44NjcuODY3IDAgMCAxLS4zMTkuMDU5SDMuMDA2djEuOUg1Ljc2YS44NjcuODY3IDAgMCAxIC4zMTkuMDU5LjguOCAwIDAgMSAuMjYxLjE2NC44LjggMCAwIDEgLjE3Ni4yNDMuNjg5LjY4OSAwIDAgMSAuMDY0LjMuNjg5LjY4OSAwIDAgMS0uMDY0LjMuNzY0Ljc2NCAwIDAgMS0uMTc2LjI0LjgyNS44MjUgMCAwIDEtLjI2MS4xNjEuODY3Ljg2NyAwIDAgMS0uMzE5LjA1OUgzLjAwNnYyLjA1MUg2LjE3YS43NDguNzQ4IDAgMCAxIC4zLjA1OS43NjMuNzYzIDAgMCAxIC4yNDMuMTY0Ljc2My43NjMgMCAwIDEgLjE2NC4yNDMuNzQ4Ljc0OCAwIDAgMSAuMDU5LjMuNzQ4Ljc0OCAwIDAgMS0uMDU5LjMuNzMuNzMgMCAwIDEtLjE2NC4yNC43ODguNzg4IDAgMCAxLS4yNDMuMTYxLjc0OC43NDggMCAwIDEtLjMuMDM2em02LjIwNS00Ljc0YTEuNTIyIDEuNTIyIDAgMCAxIC4yLS44NTUuNzc3Ljc3NyAwIDAgMSAuNjk0LS4zLjg3Ni44NzYgMCAwIDEgLjc0Ny4zIDEuNCAxLjQgMCAwIDEgLjIyNi44NTUgMS44NjUgMS44NjUgMCAwIDEgLjMxOS0uNTEzIDIuMDg3IDIuMDg3IDAgMCAxIC40NjMtLjQgMi4yNzggMi4yNzggMCAwIDEgLjU2NS0uMjU1IDIuMiAyLjIgMCAwIDEgLjYzMy0uMDkxIDIuMzE2IDIuMzE2IDAgMCAxIC42LjA3OSAxLjgwNSAxLjgwNSAwIDAgMSAuNTUxLjI1MiAxLjgyNiAxLjgyNiAwIDAgMSAuNDQ4LjQzNyAxLjk3OSAxLjk3OSAwIDAgMSAuMy42MzMgMi41OCAyLjU4IDAgMCAxIC40MjgtLjY2MiAyLjIgMi4yIDAgMCAxIC41MzMtLjQzNCAyLjE1NiAyLjE1NiAwIDAgMSAuNi0uMjM0IDIuODcgMi44NyAwIDAgMSAuNjMtLjA3IDEuOTQ0IDEuOTQ0IDAgMCAxIC43MTguMTM1IDEuNjc2IDEuNjc2IDAgMCAxIC42LjQwNyAxLjk4OCAxLjk4OCAwIDAgMSAuNDE2LjY4NiAyLjczMyAyLjczMyAwIDAgMSAuMTU1Ljk2NHYyLjY0OGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di0yLjU2M2ExLjQ2OSAxLjQ2OSAwIDAgMC0uMDctLjQ3MiAxLjAyMiAxLjAyMiAwIDAgMC0uMi0uMzUyLjgyNC44MjQgMCAwIDAtLjMtLjIxNy45MDguOTA4IDAgMCAwLS4zNjMtLjA3MyAxLjM2OSAxLjM2OSAwIDAgMC0uNDU3LjA3NiAxLjAxMSAxLjAxMSAwIDAgMC0uMzc4LjIzNCAxLjE0MiAxLjE0MiAwIDAgMC0uMjU4LjQgMS42MTkgMS42MTkgMCAwIDAtLjEuNTkydjIuMzczYTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV2LTIuNDQ5YTEuNDM3IDEuNDM3IDAgMCAwLS4yNDktLjkxNC44MjEuODIxIDAgMCAwLS42NzctLjMxMSAxLjMxNCAxLjMxNCAwIDAgMC0uNDY5LjA4MiAxLjA0OCAxLjA0OCAwIDAgMC0uMzc1LjI0IDEuMTE3IDEuMTE3IDAgMCAwLS4yNDkuMzkzIDEuNDg1IDEuNDg1IDAgMCAwLS4wOTEuNTM5djIuNDI2YTEuNCAxLjQgMCAwIDEtLjIxMi44NTQuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV6TTIxLjI0LTIuOTY1YTQuMTE0IDQuMTE0IDAgMCAwIC4wNjIuNzMyIDEuOCAxLjggMCAwIDAgLjIxMS41OTUgMS4xMDYgMS4xMDYgMCAwIDAgLjQuNCAxLjIgMS4yIDAgMCAwIC42MTguMTQ2IDEuMDY1IDEuMDY1IDAgMCAwIC41NzEtLjE0NCAxLjA2MSAxLjA2MSAwIDAgMCAuMzcyLS40IDEuOTQgMS45NCAwIDAgMCAuMi0uNiA0LjI4NiA0LjI4NiAwIDAgMCAuMDYyLS43NSA0Ljc4MSA0Ljc4MSAwIDAgMC0uMDQ3LS42NTkgMi4xMjggMi4xMjggMCAwIDAtLjE3Ni0uNjEyIDEuMiAxLjIgMCAwIDAtLjM1Ny0uNDUxLjk1My45NTMgMCAwIDAtLjYtLjE3NiAxLjQ4OSAxLjQ4OSAwIDAgMC0uNjI0LjExNy45NTUuOTU1IDAgMCAwLS40MS4zNTcgMS42MjUgMS42MjUgMCAwIDAtLjIyLjYgNC44MjggNC44MjggMCAwIDAtLjA2Mi44NDV6bS0uMDA2LTEuNzc1YTEuOTg5IDEuOTg5IDAgMCAxIC4zNzUtLjU0NSAyLjMwNiAyLjMwNiAwIDAgMSAuNS0uMzkzIDIuMzUxIDIuMzUxIDAgMCAxIC41NzctLjIzNyAyLjM2MSAyLjM2MSAwIDAgMSAuNi0uMDc5IDEuOTczIDEuOTczIDAgMCAxIC45NzMuMjRBMi4zMTggMi4zMTggMCAwIDEgMjUtNS4xYTMuMDQ3IDMuMDQ3IDAgMCAxIC40NzIuOTczIDQuMjQgNC4yNCAwIDAgMSAuMTY0IDEuMiA0LjAzNSA0LjAzNSAwIDAgMS0uMTczIDEuMjEzIDIuOTA4IDIuOTA4IDAgMCAxLS40ODYuOTQ2IDIuMjU4IDIuMjU4IDAgMCAxLS43NS42MTggMi4xIDIuMSAwIDAgMS0uOTcuMjIzIDIuMjYgMi4yNiAwIDAgMS0xLjE3Mi0uMyAyLjQ5IDIuNDkgMCAwIDEtLjg1NS0uODU1VjEuMDJhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNS43NmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMy44NTV6bTYuMDc2LTEuMTc4bC4xMjktMS4yMTNhMi40NTUgMi40NTUgMCAwIDEgLjA2Mi0uMzUyIDEuMDM3IDEuMDM3IDAgMCAxIC4xNDEtLjMyMi43MjkuNzI5IDAgMCAxIC4yNjEtLjIzNy44OC44OCAwIDAgMSAuNDI4LS4wOTEuNjE1LjYxNSAwIDAgMSAuNTYuMjcgMS41IDEuNSAwIDAgMSAuMTczLjh2MS4xNDNoLjY1NmEuNzU3Ljc1NyAwIDAgMSAuNDg2LjE0OS41NjcuNTY3IDAgMCAxIC4xODguNDcyLjUyNS41MjUgMCAwIDEtLjIuNDQ4Ljg3OS44NzkgMCAwIDEtLjUzOS4xNDloLS41OTJ2Mi4yMTVxMCAuMzUyLjAxMi42YTEuMjExIDEuMjExIDAgMCAwIC4wNzYuNC40MjIuNDIyIDAgMCAwIC4xOTMuMjIzLjgxMy44MTMgMCAwIDAgLjM2OS4wNjdxLjE3IDAgLjMzMS4wMTVhLjgzMi44MzIgMCAwIDEgLjI4NC4wNzMuNDY3LjQ2NyAwIDAgMSAuMi4xNzMuNTc3LjU3NyAwIDAgMSAuMDczLjMxMy41NDMuNTQzIDAgMCAxLS4xMTEuMzU3LjcwNy43MDcgMCAwIDEtLjMxOS4yMDggMi4wNzYgMi4wNzYgMCAwIDEtLjUuMXEtLjI5LjAyNi0uNjQ3LjAyNmEyLjM2NiAyLjM2NiAwIDAgMS0uNzQ3LS4xMjMgMS40NDcgMS40NDcgMCAwIDEtLjU4LS4zNzIgMS43IDEuNyAwIDAgMS0uMzc1LS42NjIgMy4yNzYgMy4yNzYgMCAwIDEtLjEzMi0xVi00LjdoLS4yN2EuODkuODkgMCAwIDEtLjUyNy0uMTQ5LjU1MS41NTEgMCAwIDEtLjIxMS0uNDgzLjU2My41NjMgMCAwIDEgLjE2Ny0uNDI1LjcuNyAwIDAgMSAuNTA3LS4xNjF6TTMzLjItLjA3NmwtMS45MS00LjQ1OXEtLjA2NC0uMTQ2LS4xMi0uM2EuODc3Ljg3NyAwIDAgMS0uMDU2LS4zLjczNi43MzYgMCAwIDEgLjA2NC0uMzExLjcyMi43MjIgMCAwIDEgLjE3Ni0uMjQuODE5LjgxOSAwIDAgMSAuMjU4LS4xNTUuODgzLjg4MyAwIDAgMSAuMzE2LS4wNTYuNjQuNjQgMCAwIDEgLjMzNC4wOTEgMS4wOCAxLjA4IDAgMCAxIC4yNzguMjQzIDEuODEgMS44MSAwIDAgMSAuMjIzLjM0NnEuMS4xOTMuMTczLjM5M2wxLjEyNSAzLjA1OSAxLjE2LTMuMDc2YTEuNzI0IDEuNzI0IDAgMCAxIC4yNTgtLjQ5MiAxLjc0OCAxLjc0OCAwIDAgMSAuMzQtLjM0LjQzMi40MzIgMCAwIDEgLjE5LS4xNjcuNi42IDAgMCAxIC4yNDMtLjA1LjY1Ny42NTcgMCAwIDEgLjI4Ny4wNjQuNzc0Ljc3NCAwIDAgMSAuMjM3LjE3Ni44NTQuODU0IDAgMCAxIC4xNjEuMjUyQS43NTQuNzU0IDAgMCAxIDM3LTUuMWEuOTU1Ljk1NSAwIDAgMS0uMDcuMzM3cS0uMDcuMTg1LS4xMzUuMzQ5bC0yLjM1IDUuOTY1YTMuOTg4IDMuOTg4IDAgMCAxLS4xNjcuMzY5IDEuNjQ2IDEuNjQ2IDAgMCAxLS4yMDUuMzExLjk4NS45ODUgMCAwIDEtLjI1NS4yMTcuNjE2LjYxNiAwIDAgMS0uMzE2LjA4MiAxIDEgMCAwIDEtLjM0My0uMDU5LjgwOS44MDkgMCAwIDEtLjU0Mi0uNzc5IDEuMTc5IDEuMTc5IDAgMCAxIC4wODItLjM3MnEuMDc2LS4yLjE0MS0uMzg0em0xMy44MjctMS40ODNhLjc1OC43NTggMCAwIDEgLjMuMDYyLjc4Ni43ODYgMCAwIDEgLjI0OS4xNjcuNzg2Ljc4NiAwIDAgMSAuMTY3LjI0OS43NTguNzU4IDAgMCAxIC4wNjIuMy43NTguNzU4IDAgMCAxLS4wNjIuMy43ODYuNzg2IDAgMCAxLS4xNjcuMjQ5Ljc4Ni43ODYgMCAwIDEtLjI0OS4xNjcuNzU4Ljc1OCAwIDAgMS0uMy4wNjJoLTQuMDEzYS45NDYuOTQ2IDAgMCAxLS41MjctLjEzOCAxLjAyMSAxLjAyMSAwIDAgMS0uMzM4LS4zNTkgMS42MDYgMS42MDYgMCAwIDEtLjE3Ni0uNTEzIDMuNDIyIDMuNDIyIDAgMCAxLS4wNS0uNTg2di01Ljc3MmExLjE3NCAxLjE3NCAwIDAgMSAuMDg1LS40NDggMS4xNjYgMS4xNjYgMCAwIDEgLjIzMS0uMzYzIDEuMDY1IDEuMDY1IDAgMCAxIC4zNDMtLjI0MyAxLjAyNyAxLjAyNyAwIDAgMSAuNDI1LS4wODggMS4wMjcgMS4wMjcgMCAwIDEgLjQyNS4wODggMS4xIDEuMSAwIDAgMSAuMzQ2LjI0MyAxLjE0IDEuMTQgMCAwIDEgLjIzNC4zNjMgMS4xNzQgMS4xNzQgMCAwIDEgLjA4NS40NDhsLjAwMyA1LjgxMnptMy42NjItNi40MjFhLjY2My42NjMgMCAwIDEtLjA4OC4zNDMuOC44IDAgMCAxLS4yMjkuMjQ5IDEuMDE0IDEuMDE0IDAgMCAxLS4zMjUuMTQ5IDEuNDQ0IDEuNDQ0IDAgMCAxLS4zNzguMDUgMS40MTIgMS40MTIgMCAwIDEtLjM5LS4wNTMgMS4wMjQgMS4wMjQgMCAwIDEtLjMyNS0uMTU1Ljc3NC43NzQgMCAwIDEtLjIyMy0uMjQ5LjY3Mi42NzIgMCAwIDEtLjA4Mi0uMzM0LjYzOS42MzkgMCAwIDEgLjA3OS0uMzEzLjgxMi44MTIgMCAwIDEgLjIxNC0uMjQ5IDEgMSAwIDAgMSAuMzIyLS4xNjQgMS4zNjkgMS4zNjkgMCAwIDEgLjQxLS4wNTkgMS4zNjkgMS4zNjkgMCAwIDEgLjM3OC4wNTMgMS4wNjIgMS4wNjIgMCAwIDEgLjMyNS4xNTIuNzc2Ljc3NiAwIDAgMSAuMjI2LjI0Ni42NTMuNjUzIDAgMCAxIC4wODYuMzM0ek01MC42LTEuMTU0YTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTVWLTQuNzRhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMi44NjUtMy4xN2EuNC40IDAgMCAwIC4yLjM1NCAxLjgxNyAxLjgxNyAwIDAgMCAuNTUxLjIwOHEuMzM0LjA3Ni42ODYuMTQ2dC42ODYuMTYxYTUuMDE5IDUuMDE5IDAgMCAxIC42MjcuMjE0IDIuMDM4IDIuMDM4IDAgMCAxIC41MTYuMzA4IDEuMzQ4IDEuMzQ4IDAgMCAxIC4zNTIuNDQ1IDEuNCAxLjQgMCAwIDEgLjEyOS42MjQgMS43MDkgMS43MDkgMCAwIDEtLjE4Ny44MTIgMS43MjkgMS43MjkgMCAwIDEtLjUzLjYgMi42MTIgMi42MTIgMCAwIDEtLjgxNy4zODEgMy45ODMgMy45ODMgMCAwIDEtMS4wNTEuMTQxQTcuOTEgNy45MSAwIDAgMSA1My41NzggMGE0LjMyOSA0LjMyOSAwIDAgMS0uODk0LS4yMDggMS45MDYgMS45MDYgMCAwIDEtLjYyNC0uMzQ5LjYzNS42MzUgMCAwIDEtLjIzNC0uNDg5LjQ3My40NzMgMCAwIDEgLjE1OC0uMzgxLjYuNiAwIDAgMSAuNC0uMTM1Ljg2Ni44NjYgMCAwIDEgLjIyMy4wMzVxLjEyOS4wMzUuMjgxLjA4OGwuMzI1LjExNHEuMTczLjA2Mi4zNi4xMDhhNC4yMzggNC4yMzggMCAwIDAgLjQ4My4xIDMuMzg3IDMuMzg3IDAgMCAwIC41MTMuMDM4QTEuNjEgMS42MSAwIDAgMCA1NC45LTEuMWExLjAzOSAxLjAzOSAwIDAgMCAuMjg0LS4xLjY0NC42NDQgMCAwIDAgLjIwOC0uMTczLjUuNSAwIDAgMCAuMS0uMjU4LjUzNy41MzcgMCAwIDAgLjAyOS0uMDcuMjYuMjYgMCAwIDAgLjAxMi0uMDgyLjM4LjM4IDAgMCAwLS4xNDktLjI5MyAxLjA5IDEuMDkgMCAwIDAtLjQxOS0uMjA1cS0uNDUxLS4xMDUtLjg2MS0uMTkzdC0uNzU5LS4xODdhNC41NzcgNC41NzcgMCAwIDEtLjYzMy0uMjI5IDEuNzExIDEuNzExIDAgMCAxLS40OC0uMzE2IDEuMyAxLjMgMCAwIDEtLjMtLjQ1MSAxLjY3OSAxLjY3OSAwIDAgMS0uMTA4LS42MzlBMS40MiAxLjQyIDAgMCAxIDUyLTUuMDI0YTEuNTQ1IDEuNTQ1IDAgMCAxIC41My0uNTM2IDIuNzMxIDIuNzMxIDAgMCAxIC44MzgtLjMzMSA0Ljk0IDQuOTQgMCAwIDEgMS4xMTMtLjExNCA0LjIyNSA0LjIyNSAwIDAgMSAxLjcuMjY3cS41ODMuMjY3LjU4My42OTRhLjQ0LjQ0IDAgMCAxLS4xNTguMzY2LjU5Mi41OTIgMCAwIDEtLjM4MS4xMjYuNzM3LjczNyAwIDAgMS0uMjQzLS4wNDRxLS4xMjYtLjA0NC0uMy0uMWEzLjQyMSAzLjQyMSAwIDAgMC0uNDE5LS4xIDMuNDUzIDMuNDUzIDAgMCAwLS42LS4wNDQgNC42NDMgNC42NDMgMCAwIDAtLjQ4OS4wMjMgMS41MjkgMS41MjkgMCAwIDAtLjM3NS4wODIuNTc0LjU3NCAwIDAgMC0uMjQuMTU4LjM3NS4zNzUgMCAwIDAtLjA5Mi4yNTN6bTUuMzQ0LTEuNTk0bC4xMjktMS4yMTNBMi40NTUgMi40NTUgMCAwIDEgNTktNy40ODJhMS4wMzcgMS4wMzcgMCAwIDEgLjE0MS0uMzIyLjcyOS43MjkgMCAwIDEgLjI2MS0uMjM3Ljg4Ljg4IDAgMCAxIC40MjgtLjA5MS42MTUuNjE1IDAgMCAxIC41Ni4yNyAxLjUgMS41IDAgMCAxIC4xNzMuOHYxLjE0M2guNjU2YS43NTcuNzU3IDAgMCAxIC40ODYuMTQ5LjU2Ny41NjcgMCAwIDEgLjE4OC40NzIuNTI1LjUyNSAwIDAgMS0uMi40NDguODc5Ljg3OSAwIDAgMS0uNTM5LjE0OWgtLjU5MnYyLjIxNXEwIC4zNTIuMDEyLjZhMS4yMTEgMS4yMTEgMCAwIDAgLjA3Ni40LjQyMi40MjIgMCAwIDAgLjE5My4yMjMuODEzLjgxMyAwIDAgMCAuMzY5LjA2N3EuMTcgMCAuMzMxLjAxNWEuODMyLjgzMiAwIDAgMSAuMjg0LjA3My40NjcuNDY3IDAgMCAxIC4yLjE3My41NzcuNTc3IDAgMCAxIC4wNzMuMzEzLjU0My41NDMgMCAwIDEtLjExMS4zNTcuNzA3LjcwNyAwIDAgMS0uMzE5LjIwOCAyLjA3NiAyLjA3NiAwIDAgMS0uNS4xcS0uMjkuMDI2LS42NDcuMDI2YTIuMzY2IDIuMzY2IDAgMCAxLS43NDctLjEyMyAxLjQ0NyAxLjQ0NyAwIDAgMS0uNTgtLjM3MiAxLjcgMS43IDAgMCAxLS4zNzUtLjY2MiAzLjI3NiAzLjI3NiAwIDAgMS0uMTMyLTFWLTQuN2gtLjI3YS44OS44OSAwIDAgMS0uNTI3LS4xNDkuNTUxLjU1MSAwIDAgMS0uMjExLS40ODMuNTYzLjU2MyAwIDAgMSAuMTY3LS40MjUuNy43IDAgMCAxIC41MDctLjE2MXoiIGNsYXNzPSJjbHMtMiIgZGF0YS1uYW1lPSJQYXRoIDUwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTU4IDE0Ni43NDMpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);  }\n\n  .multiselect-box .list-group-item:nth-child(even),\n  .multiselect-box .list-group-item:hover {\n    background-color: #f5f1f1;\n  }\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('MultiSelectionBox', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
