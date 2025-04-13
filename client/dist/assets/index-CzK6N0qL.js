var Lb = Object.defineProperty;
var qb = (n, l, i) =>
  l in n
    ? Lb(n, l, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (n[l] = i);
var Ef = (n, l, i) => qb(n, typeof l != "symbol" ? l + "" : l, i);
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) u(c);
  new MutationObserver((c) => {
    for (const o of c)
      if (o.type === "childList")
        for (const d of o.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && u(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(c) {
    const o = {};
    return (
      c.integrity && (o.integrity = c.integrity),
      c.referrerPolicy && (o.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function u(c) {
    if (c.ep) return;
    c.ep = !0;
    const o = i(c);
    fetch(c.href, o);
  }
})();
function Bb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var wf = { exports: {} },
  vi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ap;
function Vb() {
  if (Ap) return vi;
  Ap = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function i(u, c, o) {
    var d = null;
    if (
      (o !== void 0 && (d = "" + o),
      c.key !== void 0 && (d = "" + c.key),
      "key" in c)
    ) {
      o = {};
      for (var h in c) h !== "key" && (o[h] = c[h]);
    } else o = c;
    return (
      (c = o.ref),
      { $$typeof: n, type: u, key: d, ref: c !== void 0 ? c : null, props: o }
    );
  }
  return (vi.Fragment = l), (vi.jsx = i), (vi.jsxs = i), vi;
}
var Rp;
function Hb() {
  return Rp || ((Rp = 1), (wf.exports = Vb())), wf.exports;
}
var Z = Hb(),
  Tf = { exports: {} },
  Ne = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Op;
function Zb() {
  if (Op) return Ne;
  Op = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    u = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    o = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    y = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    x = Symbol.iterator;
  function b(O) {
    return O === null || typeof O != "object"
      ? null
      : ((O = (x && O[x]) || O["@@iterator"]),
        typeof O == "function" ? O : null);
  }
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    N = {};
  function U(O, P, ne) {
    (this.props = O),
      (this.context = P),
      (this.refs = N),
      (this.updater = ne || E);
  }
  (U.prototype.isReactComponent = {}),
    (U.prototype.setState = function (O, P) {
      if (typeof O != "object" && typeof O != "function" && O != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, O, P, "setState");
    }),
    (U.prototype.forceUpdate = function (O) {
      this.updater.enqueueForceUpdate(this, O, "forceUpdate");
    });
  function A() {}
  A.prototype = U.prototype;
  function k(O, P, ne) {
    (this.props = O),
      (this.context = P),
      (this.refs = N),
      (this.updater = ne || E);
  }
  var _ = (k.prototype = new A());
  (_.constructor = k), w(_, U.prototype), (_.isPureReactComponent = !0);
  var S = Array.isArray,
    R = { H: null, A: null, T: null, S: null, V: null },
    X = Object.prototype.hasOwnProperty;
  function q(O, P, ne, ie, oe, he) {
    return (
      (ne = he.ref),
      {
        $$typeof: n,
        type: O,
        key: P,
        ref: ne !== void 0 ? ne : null,
        props: he,
      }
    );
  }
  function T(O, P) {
    return q(O.type, P, void 0, void 0, void 0, O.props);
  }
  function M(O) {
    return typeof O == "object" && O !== null && O.$$typeof === n;
  }
  function B(O) {
    var P = { "=": "=0", ":": "=2" };
    return (
      "$" +
      O.replace(/[=:]/g, function (ne) {
        return P[ne];
      })
    );
  }
  var G = /\/+/g;
  function V(O, P) {
    return typeof O == "object" && O !== null && O.key != null
      ? B("" + O.key)
      : P.toString(36);
  }
  function I() {}
  function re(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (
          (typeof O.status == "string"
            ? O.then(I, I)
            : ((O.status = "pending"),
              O.then(
                function (P) {
                  O.status === "pending" &&
                    ((O.status = "fulfilled"), (O.value = P));
                },
                function (P) {
                  O.status === "pending" &&
                    ((O.status = "rejected"), (O.reason = P));
                }
              )),
          O.status)
        ) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function se(O, P, ne, ie, oe) {
    var he = typeof O;
    (he === "undefined" || he === "boolean") && (O = null);
    var de = !1;
    if (O === null) de = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          de = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case n:
            case l:
              de = !0;
              break;
            case v:
              return (de = O._init), se(de(O._payload), P, ne, ie, oe);
          }
      }
    if (de)
      return (
        (oe = oe(O)),
        (de = ie === "" ? "." + V(O, 0) : ie),
        S(oe)
          ? ((ne = ""),
            de != null && (ne = de.replace(G, "$&/") + "/"),
            se(oe, P, ne, "", function (bt) {
              return bt;
            }))
          : oe != null &&
            (M(oe) &&
              (oe = T(
                oe,
                ne +
                  (oe.key == null || (O && O.key === oe.key)
                    ? ""
                    : ("" + oe.key).replace(G, "$&/") + "/") +
                  de
              )),
            P.push(oe)),
        1
      );
    de = 0;
    var Ue = ie === "" ? "." : ie + ":";
    if (S(O))
      for (var Me = 0; Me < O.length; Me++)
        (ie = O[Me]), (he = Ue + V(ie, Me)), (de += se(ie, P, ne, he, oe));
    else if (((Me = b(O)), typeof Me == "function"))
      for (O = Me.call(O), Me = 0; !(ie = O.next()).done; )
        (ie = ie.value), (he = Ue + V(ie, Me++)), (de += se(ie, P, ne, he, oe));
    else if (he === "object") {
      if (typeof O.then == "function") return se(re(O), P, ne, ie, oe);
      throw (
        ((P = String(O)),
        Error(
          "Objects are not valid as a React child (found: " +
            (P === "[object Object]"
              ? "object with keys {" + Object.keys(O).join(", ") + "}"
              : P) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return de;
  }
  function D(O, P, ne) {
    if (O == null) return O;
    var ie = [],
      oe = 0;
    return (
      se(O, ie, "", "", function (he) {
        return P.call(ne, he, oe++);
      }),
      ie
    );
  }
  function J(O) {
    if (O._status === -1) {
      var P = O._result;
      (P = P()),
        P.then(
          function (ne) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 1), (O._result = ne));
          },
          function (ne) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 2), (O._result = ne));
          }
        ),
        O._status === -1 && ((O._status = 0), (O._result = P));
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var le =
    typeof reportError == "function"
      ? reportError
      : function (O) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var P = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof O == "object" &&
                O !== null &&
                typeof O.message == "string"
                  ? String(O.message)
                  : String(O),
              error: O,
            });
            if (!window.dispatchEvent(P)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", O);
            return;
          }
          console.error(O);
        };
  function ge() {}
  return (
    (Ne.Children = {
      map: D,
      forEach: function (O, P, ne) {
        D(
          O,
          function () {
            P.apply(this, arguments);
          },
          ne
        );
      },
      count: function (O) {
        var P = 0;
        return (
          D(O, function () {
            P++;
          }),
          P
        );
      },
      toArray: function (O) {
        return (
          D(O, function (P) {
            return P;
          }) || []
        );
      },
      only: function (O) {
        if (!M(O))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return O;
      },
    }),
    (Ne.Component = U),
    (Ne.Fragment = i),
    (Ne.Profiler = c),
    (Ne.PureComponent = k),
    (Ne.StrictMode = u),
    (Ne.Suspense = y),
    (Ne.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R),
    (Ne.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (O) {
        return R.H.useMemoCache(O);
      },
    }),
    (Ne.cache = function (O) {
      return function () {
        return O.apply(null, arguments);
      };
    }),
    (Ne.cloneElement = function (O, P, ne) {
      if (O == null)
        throw Error(
          "The argument must be a React element, but you passed " + O + "."
        );
      var ie = w({}, O.props),
        oe = O.key,
        he = void 0;
      if (P != null)
        for (de in (P.ref !== void 0 && (he = void 0),
        P.key !== void 0 && (oe = "" + P.key),
        P))
          !X.call(P, de) ||
            de === "key" ||
            de === "__self" ||
            de === "__source" ||
            (de === "ref" && P.ref === void 0) ||
            (ie[de] = P[de]);
      var de = arguments.length - 2;
      if (de === 1) ie.children = ne;
      else if (1 < de) {
        for (var Ue = Array(de), Me = 0; Me < de; Me++)
          Ue[Me] = arguments[Me + 2];
        ie.children = Ue;
      }
      return q(O.type, oe, void 0, void 0, he, ie);
    }),
    (Ne.createContext = function (O) {
      return (
        (O = {
          $$typeof: d,
          _currentValue: O,
          _currentValue2: O,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (O.Provider = O),
        (O.Consumer = { $$typeof: o, _context: O }),
        O
      );
    }),
    (Ne.createElement = function (O, P, ne) {
      var ie,
        oe = {},
        he = null;
      if (P != null)
        for (ie in (P.key !== void 0 && (he = "" + P.key), P))
          X.call(P, ie) &&
            ie !== "key" &&
            ie !== "__self" &&
            ie !== "__source" &&
            (oe[ie] = P[ie]);
      var de = arguments.length - 2;
      if (de === 1) oe.children = ne;
      else if (1 < de) {
        for (var Ue = Array(de), Me = 0; Me < de; Me++)
          Ue[Me] = arguments[Me + 2];
        oe.children = Ue;
      }
      if (O && O.defaultProps)
        for (ie in ((de = O.defaultProps), de))
          oe[ie] === void 0 && (oe[ie] = de[ie]);
      return q(O, he, void 0, void 0, null, oe);
    }),
    (Ne.createRef = function () {
      return { current: null };
    }),
    (Ne.forwardRef = function (O) {
      return { $$typeof: h, render: O };
    }),
    (Ne.isValidElement = M),
    (Ne.lazy = function (O) {
      return { $$typeof: v, _payload: { _status: -1, _result: O }, _init: J };
    }),
    (Ne.memo = function (O, P) {
      return { $$typeof: m, type: O, compare: P === void 0 ? null : P };
    }),
    (Ne.startTransition = function (O) {
      var P = R.T,
        ne = {};
      R.T = ne;
      try {
        var ie = O(),
          oe = R.S;
        oe !== null && oe(ne, ie),
          typeof ie == "object" &&
            ie !== null &&
            typeof ie.then == "function" &&
            ie.then(ge, le);
      } catch (he) {
        le(he);
      } finally {
        R.T = P;
      }
    }),
    (Ne.unstable_useCacheRefresh = function () {
      return R.H.useCacheRefresh();
    }),
    (Ne.use = function (O) {
      return R.H.use(O);
    }),
    (Ne.useActionState = function (O, P, ne) {
      return R.H.useActionState(O, P, ne);
    }),
    (Ne.useCallback = function (O, P) {
      return R.H.useCallback(O, P);
    }),
    (Ne.useContext = function (O) {
      return R.H.useContext(O);
    }),
    (Ne.useDebugValue = function () {}),
    (Ne.useDeferredValue = function (O, P) {
      return R.H.useDeferredValue(O, P);
    }),
    (Ne.useEffect = function (O, P, ne) {
      var ie = R.H;
      if (typeof ne == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return ie.useEffect(O, P);
    }),
    (Ne.useId = function () {
      return R.H.useId();
    }),
    (Ne.useImperativeHandle = function (O, P, ne) {
      return R.H.useImperativeHandle(O, P, ne);
    }),
    (Ne.useInsertionEffect = function (O, P) {
      return R.H.useInsertionEffect(O, P);
    }),
    (Ne.useLayoutEffect = function (O, P) {
      return R.H.useLayoutEffect(O, P);
    }),
    (Ne.useMemo = function (O, P) {
      return R.H.useMemo(O, P);
    }),
    (Ne.useOptimistic = function (O, P) {
      return R.H.useOptimistic(O, P);
    }),
    (Ne.useReducer = function (O, P, ne) {
      return R.H.useReducer(O, P, ne);
    }),
    (Ne.useRef = function (O) {
      return R.H.useRef(O);
    }),
    (Ne.useState = function (O) {
      return R.H.useState(O);
    }),
    (Ne.useSyncExternalStore = function (O, P, ne) {
      return R.H.useSyncExternalStore(O, P, ne);
    }),
    (Ne.useTransition = function () {
      return R.H.useTransition();
    }),
    (Ne.version = "19.1.0"),
    Ne
  );
}
var Cp;
function Ps() {
  return Cp || ((Cp = 1), (Tf.exports = Zb())), Tf.exports;
}
var j = Ps();
const gt = Bb(j);
var Af = { exports: {} },
  gi = {},
  Rf = { exports: {} },
  Of = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mp;
function Qb() {
  return (
    Mp ||
      ((Mp = 1),
      (function (n) {
        function l(D, J) {
          var le = D.length;
          D.push(J);
          e: for (; 0 < le; ) {
            var ge = (le - 1) >>> 1,
              O = D[ge];
            if (0 < c(O, J)) (D[ge] = J), (D[le] = O), (le = ge);
            else break e;
          }
        }
        function i(D) {
          return D.length === 0 ? null : D[0];
        }
        function u(D) {
          if (D.length === 0) return null;
          var J = D[0],
            le = D.pop();
          if (le !== J) {
            D[0] = le;
            e: for (var ge = 0, O = D.length, P = O >>> 1; ge < P; ) {
              var ne = 2 * (ge + 1) - 1,
                ie = D[ne],
                oe = ne + 1,
                he = D[oe];
              if (0 > c(ie, le))
                oe < O && 0 > c(he, ie)
                  ? ((D[ge] = he), (D[oe] = le), (ge = oe))
                  : ((D[ge] = ie), (D[ne] = le), (ge = ne));
              else if (oe < O && 0 > c(he, le))
                (D[ge] = he), (D[oe] = le), (ge = oe);
              else break e;
            }
          }
          return J;
        }
        function c(D, J) {
          var le = D.sortIndex - J.sortIndex;
          return le !== 0 ? le : D.id - J.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var o = performance;
          n.unstable_now = function () {
            return o.now();
          };
        } else {
          var d = Date,
            h = d.now();
          n.unstable_now = function () {
            return d.now() - h;
          };
        }
        var y = [],
          m = [],
          v = 1,
          x = null,
          b = 3,
          E = !1,
          w = !1,
          N = !1,
          U = !1,
          A = typeof setTimeout == "function" ? setTimeout : null,
          k = typeof clearTimeout == "function" ? clearTimeout : null,
          _ = typeof setImmediate < "u" ? setImmediate : null;
        function S(D) {
          for (var J = i(m); J !== null; ) {
            if (J.callback === null) u(m);
            else if (J.startTime <= D)
              u(m), (J.sortIndex = J.expirationTime), l(y, J);
            else break;
            J = i(m);
          }
        }
        function R(D) {
          if (((N = !1), S(D), !w))
            if (i(y) !== null) (w = !0), X || ((X = !0), V());
            else {
              var J = i(m);
              J !== null && se(R, J.startTime - D);
            }
        }
        var X = !1,
          q = -1,
          T = 5,
          M = -1;
        function B() {
          return U ? !0 : !(n.unstable_now() - M < T);
        }
        function G() {
          if (((U = !1), X)) {
            var D = n.unstable_now();
            M = D;
            var J = !0;
            try {
              e: {
                (w = !1), N && ((N = !1), k(q), (q = -1)), (E = !0);
                var le = b;
                try {
                  t: {
                    for (
                      S(D), x = i(y);
                      x !== null && !(x.expirationTime > D && B());

                    ) {
                      var ge = x.callback;
                      if (typeof ge == "function") {
                        (x.callback = null), (b = x.priorityLevel);
                        var O = ge(x.expirationTime <= D);
                        if (((D = n.unstable_now()), typeof O == "function")) {
                          (x.callback = O), S(D), (J = !0);
                          break t;
                        }
                        x === i(y) && u(y), S(D);
                      } else u(y);
                      x = i(y);
                    }
                    if (x !== null) J = !0;
                    else {
                      var P = i(m);
                      P !== null && se(R, P.startTime - D), (J = !1);
                    }
                  }
                  break e;
                } finally {
                  (x = null), (b = le), (E = !1);
                }
                J = void 0;
              }
            } finally {
              J ? V() : (X = !1);
            }
          }
        }
        var V;
        if (typeof _ == "function")
          V = function () {
            _(G);
          };
        else if (typeof MessageChannel < "u") {
          var I = new MessageChannel(),
            re = I.port2;
          (I.port1.onmessage = G),
            (V = function () {
              re.postMessage(null);
            });
        } else
          V = function () {
            A(G, 0);
          };
        function se(D, J) {
          q = A(function () {
            D(n.unstable_now());
          }, J);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (n.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (T = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return b;
          }),
          (n.unstable_next = function (D) {
            switch (b) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = b;
            }
            var le = b;
            b = J;
            try {
              return D();
            } finally {
              b = le;
            }
          }),
          (n.unstable_requestPaint = function () {
            U = !0;
          }),
          (n.unstable_runWithPriority = function (D, J) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var le = b;
            b = D;
            try {
              return J();
            } finally {
              b = le;
            }
          }),
          (n.unstable_scheduleCallback = function (D, J, le) {
            var ge = n.unstable_now();
            switch (
              (typeof le == "object" && le !== null
                ? ((le = le.delay),
                  (le = typeof le == "number" && 0 < le ? ge + le : ge))
                : (le = ge),
              D)
            ) {
              case 1:
                var O = -1;
                break;
              case 2:
                O = 250;
                break;
              case 5:
                O = 1073741823;
                break;
              case 4:
                O = 1e4;
                break;
              default:
                O = 5e3;
            }
            return (
              (O = le + O),
              (D = {
                id: v++,
                callback: J,
                priorityLevel: D,
                startTime: le,
                expirationTime: O,
                sortIndex: -1,
              }),
              le > ge
                ? ((D.sortIndex = le),
                  l(m, D),
                  i(y) === null &&
                    D === i(m) &&
                    (N ? (k(q), (q = -1)) : (N = !0), se(R, le - ge)))
                : ((D.sortIndex = O),
                  l(y, D),
                  w || E || ((w = !0), X || ((X = !0), V()))),
              D
            );
          }),
          (n.unstable_shouldYield = B),
          (n.unstable_wrapCallback = function (D) {
            var J = b;
            return function () {
              var le = b;
              b = J;
              try {
                return D.apply(this, arguments);
              } finally {
                b = le;
              }
            };
          });
      })(Of)),
    Of
  );
}
var Np;
function Yb() {
  return Np || ((Np = 1), (Rf.exports = Qb())), Rf.exports;
}
var Cf = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dp;
function Gb() {
  if (Dp) return Ot;
  Dp = 1;
  var n = Ps();
  function l(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      y +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var u = {
      d: {
        f: i,
        r: function () {
          throw Error(l(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function o(y, m, v) {
    var x =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
      children: y,
      containerInfo: m,
      implementation: v,
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(y, m) {
    if (y === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (Ot.createPortal = function (y, m) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(l(299));
      return o(y, m, null, v);
    }),
    (Ot.flushSync = function (y) {
      var m = d.T,
        v = u.p;
      try {
        if (((d.T = null), (u.p = 2), y)) return y();
      } finally {
        (d.T = m), (u.p = v), u.d.f();
      }
    }),
    (Ot.preconnect = function (y, m) {
      typeof y == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        u.d.C(y, m));
    }),
    (Ot.prefetchDNS = function (y) {
      typeof y == "string" && u.d.D(y);
    }),
    (Ot.preinit = function (y, m) {
      if (typeof y == "string" && m && typeof m.as == "string") {
        var v = m.as,
          x = h(v, m.crossOrigin),
          b = typeof m.integrity == "string" ? m.integrity : void 0,
          E = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        v === "style"
          ? u.d.S(y, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: x,
              integrity: b,
              fetchPriority: E,
            })
          : v === "script" &&
            u.d.X(y, {
              crossOrigin: x,
              integrity: b,
              fetchPriority: E,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Ot.preinitModule = function (y, m) {
      if (typeof y == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var v = h(m.as, m.crossOrigin);
            u.d.M(y, {
              crossOrigin: v,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && u.d.M(y);
    }),
    (Ot.preload = function (y, m) {
      if (
        typeof y == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var v = m.as,
          x = h(v, m.crossOrigin);
        u.d.L(y, v, {
          crossOrigin: x,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Ot.preloadModule = function (y, m) {
      if (typeof y == "string")
        if (m) {
          var v = h(m.as, m.crossOrigin);
          u.d.m(y, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else u.d.m(y);
    }),
    (Ot.requestFormReset = function (y) {
      u.d.r(y);
    }),
    (Ot.unstable_batchedUpdates = function (y, m) {
      return y(m);
    }),
    (Ot.useFormState = function (y, m, v) {
      return d.H.useFormState(y, m, v);
    }),
    (Ot.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (Ot.version = "19.1.0"),
    Ot
  );
}
var jp;
function Xb() {
  if (jp) return Cf.exports;
  jp = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (Cf.exports = Gb()), Cf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zp;
function Kb() {
  if (zp) return gi;
  zp = 1;
  var n = Yb(),
    l = Ps(),
    i = Xb();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function o(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (o(e) !== e) throw Error(u(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = o(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var f = s.alternate;
      if (f === null) {
        if (((r = s.return), r !== null)) {
          a = r;
          continue;
        }
        break;
      }
      if (s.child === f.child) {
        for (f = s.child; f; ) {
          if (f === a) return h(s), e;
          if (f === r) return h(s), t;
          f = f.sibling;
        }
        throw Error(u(188));
      }
      if (a.return !== r.return) (a = s), (r = f);
      else {
        for (var p = !1, g = s.child; g; ) {
          if (g === a) {
            (p = !0), (a = s), (r = f);
            break;
          }
          if (g === r) {
            (p = !0), (r = s), (a = f);
            break;
          }
          g = g.sibling;
        }
        if (!p) {
          for (g = f.child; g; ) {
            if (g === a) {
              (p = !0), (a = f), (r = s);
              break;
            }
            if (g === r) {
              (p = !0), (r = f), (a = s);
              break;
            }
            g = g.sibling;
          }
          if (!p) throw Error(u(189));
        }
      }
      if (a.alternate !== r) throw Error(u(190));
    }
    if (a.tag !== 3) throw Error(u(188));
    return a.stateNode.current === a ? e : t;
  }
  function m(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = m(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign,
    x = Symbol.for("react.element"),
    b = Symbol.for("react.transitional.element"),
    E = Symbol.for("react.portal"),
    w = Symbol.for("react.fragment"),
    N = Symbol.for("react.strict_mode"),
    U = Symbol.for("react.profiler"),
    A = Symbol.for("react.provider"),
    k = Symbol.for("react.consumer"),
    _ = Symbol.for("react.context"),
    S = Symbol.for("react.forward_ref"),
    R = Symbol.for("react.suspense"),
    X = Symbol.for("react.suspense_list"),
    q = Symbol.for("react.memo"),
    T = Symbol.for("react.lazy"),
    M = Symbol.for("react.activity"),
    B = Symbol.for("react.memo_cache_sentinel"),
    G = Symbol.iterator;
  function V(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (G && e[G]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var I = Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === I ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case U:
        return "Profiler";
      case N:
        return "StrictMode";
      case R:
        return "Suspense";
      case X:
        return "SuspenseList";
      case M:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case E:
          return "Portal";
        case _:
          return (e.displayName || "Context") + ".Provider";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case S:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case q:
          return (
            (t = e.displayName || null), t !== null ? t : re(e.type) || "Memo"
          );
        case T:
          (t = e._payload), (e = e._init);
          try {
            return re(e(t));
          } catch {}
      }
    return null;
  }
  var se = Array.isArray,
    D = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = { pending: !1, data: null, method: null, action: null },
    ge = [],
    O = -1;
  function P(e) {
    return { current: e };
  }
  function ne(e) {
    0 > O || ((e.current = ge[O]), (ge[O] = null), O--);
  }
  function ie(e, t) {
    O++, (ge[O] = e.current), (e.current = t);
  }
  var oe = P(null),
    he = P(null),
    de = P(null),
    Ue = P(null);
  function Me(e, t) {
    switch ((ie(de, t), ie(he, e), ie(oe, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? ep(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = ep(t)), (e = tp(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    ne(oe), ie(oe, e);
  }
  function bt() {
    ne(oe), ne(he), ne(de);
  }
  function Ut(e) {
    e.memoizedState !== null && ie(Ue, e);
    var t = oe.current,
      a = tp(t, e.type);
    t !== a && (ie(he, e), ie(oe, a));
  }
  function Zt(e) {
    he.current === e && (ne(oe), ne(he)),
      Ue.current === e && (ne(Ue), (di._currentValue = le));
  }
  var wn = Object.prototype.hasOwnProperty,
    Ln = n.unstable_scheduleCallback,
    oa = n.unstable_cancelCallback,
    Sl = n.unstable_shouldYield,
    xl = n.unstable_requestPaint,
    Qt = n.unstable_now,
    uc = n.unstable_getCurrentPriorityLevel,
    ou = n.unstable_ImmediatePriority,
    sc = n.unstable_UserBlockingPriority,
    Ga = n.unstable_NormalPriority,
    z = n.unstable_LowPriority,
    $ = n.unstable_IdlePriority,
    ee = n.log,
    pe = n.unstable_setDisableYieldValue,
    fe = null,
    ue = null;
  function ye(e) {
    if (
      (typeof ee == "function" && pe(e),
      ue && typeof ue.setStrictMode == "function")
    )
      try {
        ue.setStrictMode(fe, e);
      } catch {}
  }
  var Oe = Math.clz32 ? Math.clz32 : cc,
    et = Math.log,
    ht = Math.LN2;
  function cc(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((et(e) / ht) | 0)) | 0;
  }
  var fa = 256,
    da = 4194304;
  function qn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Xa(e, t, a) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var s = 0,
      f = e.suspendedLanes,
      p = e.pingedLanes;
    e = e.warmLanes;
    var g = r & 134217727;
    return (
      g !== 0
        ? ((r = g & ~f),
          r !== 0
            ? (s = qn(r))
            : ((p &= g),
              p !== 0
                ? (s = qn(p))
                : a || ((a = g & ~e), a !== 0 && (s = qn(a)))))
        : ((g = r & ~f),
          g !== 0
            ? (s = qn(g))
            : p !== 0
            ? (s = qn(p))
            : a || ((a = r & ~e), a !== 0 && (s = qn(a)))),
      s === 0
        ? 0
        : t !== 0 &&
          t !== s &&
          (t & f) === 0 &&
          ((f = s & -s),
          (a = t & -t),
          f >= a || (f === 32 && (a & 4194048) !== 0))
        ? t
        : s
    );
  }
  function Ka(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function fu(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ld() {
    var e = fa;
    return (fa <<= 1), (fa & 4194048) === 0 && (fa = 256), e;
  }
  function qd() {
    var e = da;
    return (da <<= 1), (da & 62914560) === 0 && (da = 4194304), e;
  }
  function oc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function xr(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function T0(e, t, a, r, s, f) {
    var p = e.pendingLanes;
    (e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0);
    var g = e.entanglements,
      C = e.expirationTimes,
      Y = e.hiddenUpdates;
    for (a = p & ~a; 0 < a; ) {
      var W = 31 - Oe(a),
        ae = 1 << W;
      (g[W] = 0), (C[W] = -1);
      var K = Y[W];
      if (K !== null)
        for (Y[W] = null, W = 0; W < K.length; W++) {
          var F = K[W];
          F !== null && (F.lane &= -536870913);
        }
      a &= ~ae;
    }
    r !== 0 && Bd(e, r, 0),
      f !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(p & ~t));
  }
  function Bd(e, t, a) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var r = 31 - Oe(t);
    (e.entangledLanes |= t),
      (e.entanglements[r] = e.entanglements[r] | 1073741824 | (a & 4194090));
  }
  function Vd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var r = 31 - Oe(a),
        s = 1 << r;
      (s & t) | (e[r] & t) && (e[r] |= t), (a &= ~s);
    }
  }
  function fc(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function dc(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Hd() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : _p(e.type));
  }
  function A0(e, t) {
    var a = J.p;
    try {
      return (J.p = e), t();
    } finally {
      J.p = a;
    }
  }
  var ha = Math.random().toString(36).slice(2),
    At = "__reactFiber$" + ha,
    kt = "__reactProps$" + ha,
    El = "__reactContainer$" + ha,
    hc = "__reactEvents$" + ha,
    R0 = "__reactListeners$" + ha,
    O0 = "__reactHandles$" + ha,
    Zd = "__reactResources$" + ha,
    Er = "__reactMarker$" + ha;
  function mc(e) {
    delete e[At], delete e[kt], delete e[hc], delete e[R0], delete e[O0];
  }
  function wl(e) {
    var t = e[At];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[El] || a[At])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = rp(e); e !== null; ) {
            if ((a = e[At])) return a;
            e = rp(e);
          }
        return t;
      }
      (e = a), (a = e.parentNode);
    }
    return null;
  }
  function Tl(e) {
    if ((e = e[At] || e[El])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function wr(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Al(e) {
    var t = e[Zd];
    return (
      t ||
        (t = e[Zd] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function mt(e) {
    e[Er] = !0;
  }
  var Qd = new Set(),
    Yd = {};
  function $a(e, t) {
    Rl(e, t), Rl(e + "Capture", t);
  }
  function Rl(e, t) {
    for (Yd[e] = t, e = 0; e < t.length; e++) Qd.add(t[e]);
  }
  var C0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Gd = {},
    Xd = {};
  function M0(e) {
    return wn.call(Xd, e)
      ? !0
      : wn.call(Gd, e)
      ? !1
      : C0.test(e)
      ? (Xd[e] = !0)
      : ((Gd[e] = !0), !1);
  }
  function du(e, t, a) {
    if (M0(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function hu(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function Bn(e, t, a, r) {
    if (r === null) e.removeAttribute(a);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + r);
    }
  }
  var yc, Kd;
  function Ol(e) {
    if (yc === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (yc = (t && t[1]) || ""),
          (Kd =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      yc +
      e +
      Kd
    );
  }
  var pc = !1;
  function vc(e, t) {
    if (!e || pc) return "";
    pc = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var ae = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(ae.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(ae, []);
                } catch (F) {
                  var K = F;
                }
                Reflect.construct(e, [], ae);
              } else {
                try {
                  ae.call();
                } catch (F) {
                  K = F;
                }
                e.call(ae.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (F) {
                K = F;
              }
              (ae = e()) &&
                typeof ae.catch == "function" &&
                ae.catch(function () {});
            }
          } catch (F) {
            if (F && K && typeof F.stack == "string") return [F.stack, K.stack];
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      s &&
        s.configurable &&
        Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var f = r.DetermineComponentFrameRoot(),
        p = f[0],
        g = f[1];
      if (p && g) {
        var C = p.split(`
`),
          Y = g.split(`
`);
        for (
          s = r = 0;
          r < C.length && !C[r].includes("DetermineComponentFrameRoot");

        )
          r++;
        for (; s < Y.length && !Y[s].includes("DetermineComponentFrameRoot"); )
          s++;
        if (r === C.length || s === Y.length)
          for (
            r = C.length - 1, s = Y.length - 1;
            1 <= r && 0 <= s && C[r] !== Y[s];

          )
            s--;
        for (; 1 <= r && 0 <= s; r--, s--)
          if (C[r] !== Y[s]) {
            if (r !== 1 || s !== 1)
              do
                if ((r--, s--, 0 > s || C[r] !== Y[s])) {
                  var W =
                    `
` + C[r].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      W.includes("<anonymous>") &&
                      (W = W.replace("<anonymous>", e.displayName)),
                    W
                  );
                }
              while (1 <= r && 0 <= s);
            break;
          }
      }
    } finally {
      (pc = !1), (Error.prepareStackTrace = a);
    }
    return (a = e ? e.displayName || e.name : "") ? Ol(a) : "";
  }
  function N0(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ol(e.type);
      case 16:
        return Ol("Lazy");
      case 13:
        return Ol("Suspense");
      case 19:
        return Ol("SuspenseList");
      case 0:
      case 15:
        return vc(e.type, !1);
      case 11:
        return vc(e.type.render, !1);
      case 1:
        return vc(e.type, !0);
      case 31:
        return Ol("Activity");
      default:
        return "";
    }
  }
  function $d(e) {
    try {
      var t = "";
      do (t += N0(e)), (e = e.return);
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function It(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Fd(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function D0(e) {
    var t = Fd(e) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var s = a.get,
        f = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (p) {
            (r = "" + p), f.call(this, p);
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (p) {
            r = "" + p;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function mu(e) {
    e._valueTracker || (e._valueTracker = D0(e));
  }
  function Jd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      r = "";
    return (
      e && (r = Fd(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function yu(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var j0 = /[\n"\\]/g;
  function en(e) {
    return e.replace(j0, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function gc(e, t, a, r, s, f, p, g) {
    (e.name = ""),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.type = p)
        : e.removeAttribute("type"),
      t != null
        ? p === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + It(t))
          : e.value !== "" + It(t) && (e.value = "" + It(t))
        : (p !== "submit" && p !== "reset") || e.removeAttribute("value"),
      t != null
        ? bc(e, p, It(t))
        : a != null
        ? bc(e, p, It(a))
        : r != null && e.removeAttribute("value"),
      s == null && f != null && (e.defaultChecked = !!f),
      s != null &&
        (e.checked = s && typeof s != "function" && typeof s != "symbol"),
      g != null &&
      typeof g != "function" &&
      typeof g != "symbol" &&
      typeof g != "boolean"
        ? (e.name = "" + It(g))
        : e.removeAttribute("name");
  }
  function Pd(e, t, a, r, s, f, p, g) {
    if (
      (f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.type = f),
      t != null || a != null)
    ) {
      if (!((f !== "submit" && f !== "reset") || t != null)) return;
      (a = a != null ? "" + It(a) : ""),
        (t = t != null ? "" + It(t) : a),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (r = r ?? s),
      (r = typeof r != "function" && typeof r != "symbol" && !!r),
      (e.checked = g ? e.checked : !!r),
      (e.defaultChecked = !!r),
      p != null &&
        typeof p != "function" &&
        typeof p != "symbol" &&
        typeof p != "boolean" &&
        (e.name = p);
  }
  function bc(e, t, a) {
    (t === "number" && yu(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function Cl(e, t, a, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t["$" + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        (s = t.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && r && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + It(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          (e[s].selected = !0), r && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Wd(e, t, a) {
    if (
      t != null &&
      ((t = "" + It(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + It(a) : "";
  }
  function Id(e, t, a, r) {
    if (t == null) {
      if (r != null) {
        if (a != null) throw Error(u(92));
        if (se(r)) {
          if (1 < r.length) throw Error(u(93));
          r = r[0];
        }
        a = r;
      }
      a == null && (a = ""), (t = a);
    }
    (a = It(t)),
      (e.defaultValue = a),
      (r = e.textContent),
      r === a && r !== "" && r !== null && (e.value = r);
  }
  function Ml(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var z0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function eh(e, t, a) {
    var r = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? r
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : r
      ? e.setProperty(t, a)
      : typeof a != "number" || a === 0 || z0.has(t)
      ? t === "float"
        ? (e.cssFloat = a)
        : (e[t] = ("" + a).trim())
      : (e[t] = a + "px");
  }
  function th(e, t, a) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (((e = e.style), a != null)) {
      for (var r in a)
        !a.hasOwnProperty(r) ||
          (t != null && t.hasOwnProperty(r)) ||
          (r.indexOf("--") === 0
            ? e.setProperty(r, "")
            : r === "float"
            ? (e.cssFloat = "")
            : (e[r] = ""));
      for (var s in t)
        (r = t[s]), t.hasOwnProperty(s) && a[s] !== r && eh(e, s, r);
    } else for (var f in t) t.hasOwnProperty(f) && eh(e, f, t[f]);
  }
  function _c(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var U0 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    k0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function pu(e) {
    return k0.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Sc = null;
  function xc(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Nl = null,
    Dl = null;
  function nh(e) {
    var t = Tl(e);
    if (t && (e = t.stateNode)) {
      var a = e[kt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (gc(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + en("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var r = a[t];
              if (r !== e && r.form === e.form) {
                var s = r[kt] || null;
                if (!s) throw Error(u(90));
                gc(
                  r,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (r = a[t]), r.form === e.form && Jd(r);
          }
          break e;
        case "textarea":
          Wd(e, a.value, a.defaultValue);
          break e;
        case "select":
          (t = a.value), t != null && Cl(e, !!a.multiple, t, !1);
      }
    }
  }
  var Ec = !1;
  function ah(e, t, a) {
    if (Ec) return e(t, a);
    Ec = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((Ec = !1),
        (Nl !== null || Dl !== null) &&
          (ts(), Nl && ((t = Nl), (e = Dl), (Dl = Nl = null), nh(t), e)))
      )
        for (t = 0; t < e.length; t++) nh(e[t]);
    }
  }
  function Tr(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var r = a[kt] || null;
    if (r === null) return null;
    a = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(u(231, t, typeof a));
    return a;
  }
  var Vn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    wc = !1;
  if (Vn)
    try {
      var Ar = {};
      Object.defineProperty(Ar, "passive", {
        get: function () {
          wc = !0;
        },
      }),
        window.addEventListener("test", Ar, Ar),
        window.removeEventListener("test", Ar, Ar);
    } catch {
      wc = !1;
    }
  var ma = null,
    Tc = null,
    vu = null;
  function lh() {
    if (vu) return vu;
    var e,
      t = Tc,
      a = t.length,
      r,
      s = "value" in ma ? ma.value : ma.textContent,
      f = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var p = a - e;
    for (r = 1; r <= p && t[a - r] === s[f - r]; r++);
    return (vu = s.slice(e, 1 < r ? 1 - r : void 0));
  }
  function gu(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function bu() {
    return !0;
  }
  function rh() {
    return !1;
  }
  function Lt(e) {
    function t(a, r, s, f, p) {
      (this._reactName = a),
        (this._targetInst = s),
        (this.type = r),
        (this.nativeEvent = f),
        (this.target = p),
        (this.currentTarget = null);
      for (var g in e)
        e.hasOwnProperty(g) && ((a = e[g]), (this[g] = a ? a(f) : f[g]));
      return (
        (this.isDefaultPrevented = (
          f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1
        )
          ? bu
          : rh),
        (this.isPropagationStopped = rh),
        this
      );
    }
    return (
      v(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = bu));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = bu));
        },
        persist: function () {},
        isPersistent: bu,
      }),
      t
    );
  }
  var Fa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    _u = Lt(Fa),
    Rr = v({}, Fa, { view: 0, detail: 0 }),
    L0 = Lt(Rr),
    Ac,
    Rc,
    Or,
    Su = v({}, Rr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Cc,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Or &&
              (Or && e.type === "mousemove"
                ? ((Ac = e.screenX - Or.screenX), (Rc = e.screenY - Or.screenY))
                : (Rc = Ac = 0),
              (Or = e)),
            Ac);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Rc;
      },
    }),
    ih = Lt(Su),
    q0 = v({}, Su, { dataTransfer: 0 }),
    B0 = Lt(q0),
    V0 = v({}, Rr, { relatedTarget: 0 }),
    Oc = Lt(V0),
    H0 = v({}, Fa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Z0 = Lt(H0),
    Q0 = v({}, Fa, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Y0 = Lt(Q0),
    G0 = v({}, Fa, { data: 0 }),
    uh = Lt(G0),
    X0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    K0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    $0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function F0(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = $0[e])
      ? !!t[e]
      : !1;
  }
  function Cc() {
    return F0;
  }
  var J0 = v({}, Rr, {
      key: function (e) {
        if (e.key) {
          var t = X0[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = gu(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? K0[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Cc,
      charCode: function (e) {
        return e.type === "keypress" ? gu(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? gu(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    P0 = Lt(J0),
    W0 = v({}, Su, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    sh = Lt(W0),
    I0 = v({}, Rr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Cc,
    }),
    e1 = Lt(I0),
    t1 = v({}, Fa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    n1 = Lt(t1),
    a1 = v({}, Su, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    l1 = Lt(a1),
    r1 = v({}, Fa, { newState: 0, oldState: 0 }),
    i1 = Lt(r1),
    u1 = [9, 13, 27, 32],
    Mc = Vn && "CompositionEvent" in window,
    Cr = null;
  Vn && "documentMode" in document && (Cr = document.documentMode);
  var s1 = Vn && "TextEvent" in window && !Cr,
    ch = Vn && (!Mc || (Cr && 8 < Cr && 11 >= Cr)),
    oh = " ",
    fh = !1;
  function dh(e, t) {
    switch (e) {
      case "keyup":
        return u1.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hh(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var jl = !1;
  function c1(e, t) {
    switch (e) {
      case "compositionend":
        return hh(t);
      case "keypress":
        return t.which !== 32 ? null : ((fh = !0), oh);
      case "textInput":
        return (e = t.data), e === oh && fh ? null : e;
      default:
        return null;
    }
  }
  function o1(e, t) {
    if (jl)
      return e === "compositionend" || (!Mc && dh(e, t))
        ? ((e = lh()), (vu = Tc = ma = null), (jl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ch && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var f1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function mh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!f1[e.type] : t === "textarea";
  }
  function yh(e, t, a, r) {
    Nl ? (Dl ? Dl.push(r) : (Dl = [r])) : (Nl = r),
      (t = us(t, "onChange")),
      0 < t.length &&
        ((a = new _u("onChange", "change", null, a, r)),
        e.push({ event: a, listeners: t }));
  }
  var Mr = null,
    Nr = null;
  function d1(e) {
    Fy(e, 0);
  }
  function xu(e) {
    var t = wr(e);
    if (Jd(t)) return e;
  }
  function ph(e, t) {
    if (e === "change") return t;
  }
  var vh = !1;
  if (Vn) {
    var Nc;
    if (Vn) {
      var Dc = "oninput" in document;
      if (!Dc) {
        var gh = document.createElement("div");
        gh.setAttribute("oninput", "return;"),
          (Dc = typeof gh.oninput == "function");
      }
      Nc = Dc;
    } else Nc = !1;
    vh = Nc && (!document.documentMode || 9 < document.documentMode);
  }
  function bh() {
    Mr && (Mr.detachEvent("onpropertychange", _h), (Nr = Mr = null));
  }
  function _h(e) {
    if (e.propertyName === "value" && xu(Nr)) {
      var t = [];
      yh(t, Nr, e, xc(e)), ah(d1, t);
    }
  }
  function h1(e, t, a) {
    e === "focusin"
      ? (bh(), (Mr = t), (Nr = a), Mr.attachEvent("onpropertychange", _h))
      : e === "focusout" && bh();
  }
  function m1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return xu(Nr);
  }
  function y1(e, t) {
    if (e === "click") return xu(t);
  }
  function p1(e, t) {
    if (e === "input" || e === "change") return xu(t);
  }
  function v1(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Yt = typeof Object.is == "function" ? Object.is : v1;
  function Dr(e, t) {
    if (Yt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      r = Object.keys(t);
    if (a.length !== r.length) return !1;
    for (r = 0; r < a.length; r++) {
      var s = a[r];
      if (!wn.call(t, s) || !Yt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Sh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function xh(e, t) {
    var a = Sh(e);
    e = 0;
    for (var r; a; ) {
      if (a.nodeType === 3) {
        if (((r = e + a.textContent.length), e <= t && r >= t))
          return { node: a, offset: t - e };
        e = r;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Sh(a);
    }
  }
  function Eh(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Eh(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function wh(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = yu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = yu(e.document);
    }
    return t;
  }
  function jc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var g1 = Vn && "documentMode" in document && 11 >= document.documentMode,
    zl = null,
    zc = null,
    jr = null,
    Uc = !1;
  function Th(e, t, a) {
    var r =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Uc ||
      zl == null ||
      zl !== yu(r) ||
      ((r = zl),
      "selectionStart" in r && jc(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (jr && Dr(jr, r)) ||
        ((jr = r),
        (r = us(zc, "onSelect")),
        0 < r.length &&
          ((t = new _u("onSelect", "select", null, t, a)),
          e.push({ event: t, listeners: r }),
          (t.target = zl))));
  }
  function Ja(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + e] = "webkit" + t),
      (a["Moz" + e] = "moz" + t),
      a
    );
  }
  var Ul = {
      animationend: Ja("Animation", "AnimationEnd"),
      animationiteration: Ja("Animation", "AnimationIteration"),
      animationstart: Ja("Animation", "AnimationStart"),
      transitionrun: Ja("Transition", "TransitionRun"),
      transitionstart: Ja("Transition", "TransitionStart"),
      transitioncancel: Ja("Transition", "TransitionCancel"),
      transitionend: Ja("Transition", "TransitionEnd"),
    },
    kc = {},
    Ah = {};
  Vn &&
    ((Ah = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ul.animationend.animation,
      delete Ul.animationiteration.animation,
      delete Ul.animationstart.animation),
    "TransitionEvent" in window || delete Ul.transitionend.transition);
  function Pa(e) {
    if (kc[e]) return kc[e];
    if (!Ul[e]) return e;
    var t = Ul[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Ah) return (kc[e] = t[a]);
    return e;
  }
  var Rh = Pa("animationend"),
    Oh = Pa("animationiteration"),
    Ch = Pa("animationstart"),
    b1 = Pa("transitionrun"),
    _1 = Pa("transitionstart"),
    S1 = Pa("transitioncancel"),
    Mh = Pa("transitionend"),
    Nh = new Map(),
    Lc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Lc.push("scrollEnd");
  function on(e, t) {
    Nh.set(e, t), $a(t, [e]);
  }
  var Dh = new WeakMap();
  function tn(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Dh.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: $d(t) }), Dh.set(e, t), t);
    }
    return { value: e, source: t, stack: $d(t) };
  }
  var nn = [],
    kl = 0,
    qc = 0;
  function Eu() {
    for (var e = kl, t = (qc = kl = 0); t < e; ) {
      var a = nn[t];
      nn[t++] = null;
      var r = nn[t];
      nn[t++] = null;
      var s = nn[t];
      nn[t++] = null;
      var f = nn[t];
      if (((nn[t++] = null), r !== null && s !== null)) {
        var p = r.pending;
        p === null ? (s.next = s) : ((s.next = p.next), (p.next = s)),
          (r.pending = s);
      }
      f !== 0 && jh(a, s, f);
    }
  }
  function wu(e, t, a, r) {
    (nn[kl++] = e),
      (nn[kl++] = t),
      (nn[kl++] = a),
      (nn[kl++] = r),
      (qc |= r),
      (e.lanes |= r),
      (e = e.alternate),
      e !== null && (e.lanes |= r);
  }
  function Bc(e, t, a, r) {
    return wu(e, t, a, r), Tu(e);
  }
  function Ll(e, t) {
    return wu(e, null, null, t), Tu(e);
  }
  function jh(e, t, a) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a);
    for (var s = !1, f = e.return; f !== null; )
      (f.childLanes |= a),
        (r = f.alternate),
        r !== null && (r.childLanes |= a),
        f.tag === 22 &&
          ((e = f.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = f),
        (f = f.return);
    return e.tag === 3
      ? ((f = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - Oe(a)),
          (e = f.hiddenUpdates),
          (r = e[s]),
          r === null ? (e[s] = [t]) : r.push(t),
          (t.lane = a | 536870912)),
        f)
      : null;
  }
  function Tu(e) {
    if (50 < li) throw ((li = 0), (Xo = null), Error(u(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var ql = {};
  function x1(e, t, a, r) {
    (this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Gt(e, t, a, r) {
    return new x1(e, t, a, r);
  }
  function Vc(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Hn(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Gt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function zh(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Au(e, t, a, r, s, f) {
    var p = 0;
    if (((r = e), typeof e == "function")) Vc(e) && (p = 1);
    else if (typeof e == "string")
      p = wb(e, a, oe.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case M:
          return (e = Gt(31, a, t, s)), (e.elementType = M), (e.lanes = f), e;
        case w:
          return Wa(a.children, s, f, t);
        case N:
          (p = 8), (s |= 24);
          break;
        case U:
          return (
            (e = Gt(12, a, t, s | 2)), (e.elementType = U), (e.lanes = f), e
          );
        case R:
          return (e = Gt(13, a, t, s)), (e.elementType = R), (e.lanes = f), e;
        case X:
          return (e = Gt(19, a, t, s)), (e.elementType = X), (e.lanes = f), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case A:
              case _:
                p = 10;
                break e;
              case k:
                p = 9;
                break e;
              case S:
                p = 11;
                break e;
              case q:
                p = 14;
                break e;
              case T:
                (p = 16), (r = null);
                break e;
            }
          (p = 29),
            (a = Error(u(130, e === null ? "null" : typeof e, ""))),
            (r = null);
      }
    return (
      (t = Gt(p, a, t, s)), (t.elementType = e), (t.type = r), (t.lanes = f), t
    );
  }
  function Wa(e, t, a, r) {
    return (e = Gt(7, e, r, t)), (e.lanes = a), e;
  }
  function Hc(e, t, a) {
    return (e = Gt(6, e, null, t)), (e.lanes = a), e;
  }
  function Zc(e, t, a) {
    return (
      (t = Gt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Bl = [],
    Vl = 0,
    Ru = null,
    Ou = 0,
    an = [],
    ln = 0,
    Ia = null,
    Zn = 1,
    Qn = "";
  function el(e, t) {
    (Bl[Vl++] = Ou), (Bl[Vl++] = Ru), (Ru = e), (Ou = t);
  }
  function Uh(e, t, a) {
    (an[ln++] = Zn), (an[ln++] = Qn), (an[ln++] = Ia), (Ia = e);
    var r = Zn;
    e = Qn;
    var s = 32 - Oe(r) - 1;
    (r &= ~(1 << s)), (a += 1);
    var f = 32 - Oe(t) + s;
    if (30 < f) {
      var p = s - (s % 5);
      (f = (r & ((1 << p) - 1)).toString(32)),
        (r >>= p),
        (s -= p),
        (Zn = (1 << (32 - Oe(t) + s)) | (a << s) | r),
        (Qn = f + e);
    } else (Zn = (1 << f) | (a << s) | r), (Qn = e);
  }
  function Qc(e) {
    e.return !== null && (el(e, 1), Uh(e, 1, 0));
  }
  function Yc(e) {
    for (; e === Ru; )
      (Ru = Bl[--Vl]), (Bl[Vl] = null), (Ou = Bl[--Vl]), (Bl[Vl] = null);
    for (; e === Ia; )
      (Ia = an[--ln]),
        (an[ln] = null),
        (Qn = an[--ln]),
        (an[ln] = null),
        (Zn = an[--ln]),
        (an[ln] = null);
  }
  var Nt = null,
    tt = null,
    He = !1,
    tl = null,
    Tn = !1,
    Gc = Error(u(519));
  function nl(e) {
    var t = Error(u(418, ""));
    throw (kr(tn(t, e)), Gc);
  }
  function kh(e) {
    var t = e.stateNode,
      a = e.type,
      r = e.memoizedProps;
    switch (((t[At] = e), (t[kt] = r), a)) {
      case "dialog":
        Le("cancel", t), Le("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ii.length; a++) Le(ii[a], t);
        break;
      case "source":
        Le("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Le("error", t), Le("load", t);
        break;
      case "details":
        Le("toggle", t);
        break;
      case "input":
        Le("invalid", t),
          Pd(
            t,
            r.value,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name,
            !0
          ),
          mu(t);
        break;
      case "select":
        Le("invalid", t);
        break;
      case "textarea":
        Le("invalid", t), Id(t, r.value, r.defaultValue, r.children), mu(t);
    }
    (a = r.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      r.suppressHydrationWarning === !0 ||
      Iy(t.textContent, a)
        ? (r.popover != null && (Le("beforetoggle", t), Le("toggle", t)),
          r.onScroll != null && Le("scroll", t),
          r.onScrollEnd != null && Le("scrollend", t),
          r.onClick != null && (t.onclick = ss),
          (t = !0))
        : (t = !1),
      t || nl(e);
  }
  function Lh(e) {
    for (Nt = e.return; Nt; )
      switch (Nt.tag) {
        case 5:
        case 13:
          Tn = !1;
          return;
        case 27:
        case 3:
          Tn = !0;
          return;
        default:
          Nt = Nt.return;
      }
  }
  function zr(e) {
    if (e !== Nt) return !1;
    if (!He) return Lh(e), (He = !0), !1;
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || cf(e.type, e.memoizedProps))),
        (a = !a)),
      a && tt && nl(e),
      Lh(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((a = e.data), a === "/$")) {
              if (t === 0) {
                tt = dn(e.nextSibling);
                break e;
              }
              t--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || t++;
          e = e.nextSibling;
        }
        tt = null;
      }
    } else
      t === 27
        ? ((t = tt), Ma(e.type) ? ((e = hf), (hf = null), (tt = e)) : (tt = t))
        : (tt = Nt ? dn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Ur() {
    (tt = Nt = null), (He = !1);
  }
  function qh() {
    var e = tl;
    return (
      e !== null &&
        (Vt === null ? (Vt = e) : Vt.push.apply(Vt, e), (tl = null)),
      e
    );
  }
  function kr(e) {
    tl === null ? (tl = [e]) : tl.push(e);
  }
  var Xc = P(null),
    al = null,
    Yn = null;
  function ya(e, t, a) {
    ie(Xc, t._currentValue), (t._currentValue = a);
  }
  function Gn(e) {
    (e._currentValue = Xc.current), ne(Xc);
  }
  function Kc(e, t, a) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function $c(e, t, a, r) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var f = s.dependencies;
      if (f !== null) {
        var p = s.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var g = f;
          f = s;
          for (var C = 0; C < t.length; C++)
            if (g.context === t[C]) {
              (f.lanes |= a),
                (g = f.alternate),
                g !== null && (g.lanes |= a),
                Kc(f.return, a, e),
                r || (p = null);
              break e;
            }
          f = g.next;
        }
      } else if (s.tag === 18) {
        if (((p = s.return), p === null)) throw Error(u(341));
        (p.lanes |= a),
          (f = p.alternate),
          f !== null && (f.lanes |= a),
          Kc(p, a, e),
          (p = null);
      } else p = s.child;
      if (p !== null) p.return = s;
      else
        for (p = s; p !== null; ) {
          if (p === e) {
            p = null;
            break;
          }
          if (((s = p.sibling), s !== null)) {
            (s.return = p.return), (p = s);
            break;
          }
          p = p.return;
        }
      s = p;
    }
  }
  function Lr(e, t, a, r) {
    e = null;
    for (var s = t, f = !1; s !== null; ) {
      if (!f) {
        if ((s.flags & 524288) !== 0) f = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var p = s.alternate;
        if (p === null) throw Error(u(387));
        if (((p = p.memoizedProps), p !== null)) {
          var g = s.type;
          Yt(s.pendingProps.value, p.value) ||
            (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (s === Ue.current) {
        if (((p = s.alternate), p === null)) throw Error(u(387));
        p.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(di) : (e = [di]));
      }
      s = s.return;
    }
    e !== null && $c(t, e, a, r), (t.flags |= 262144);
  }
  function Cu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Yt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function ll(e) {
    (al = e),
      (Yn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Rt(e) {
    return Bh(al, e);
  }
  function Mu(e, t) {
    return al === null && ll(e), Bh(e, t);
  }
  function Bh(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Yn === null)) {
      if (e === null) throw Error(u(308));
      (Yn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else Yn = Yn.next = t;
    return a;
  }
  var E1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, r) {
                  e.push(r);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                });
            };
          },
    w1 = n.unstable_scheduleCallback,
    T1 = n.unstable_NormalPriority,
    ot = {
      $$typeof: _,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Fc() {
    return { controller: new E1(), data: new Map(), refCount: 0 };
  }
  function qr(e) {
    e.refCount--,
      e.refCount === 0 &&
        w1(T1, function () {
          e.controller.abort();
        });
  }
  var Br = null,
    Jc = 0,
    Hl = 0,
    Zl = null;
  function A1(e, t) {
    if (Br === null) {
      var a = (Br = []);
      (Jc = 0),
        (Hl = Io()),
        (Zl = {
          status: "pending",
          value: void 0,
          then: function (r) {
            a.push(r);
          },
        });
    }
    return Jc++, t.then(Vh, Vh), t;
  }
  function Vh() {
    if (--Jc === 0 && Br !== null) {
      Zl !== null && (Zl.status = "fulfilled");
      var e = Br;
      (Br = null), (Hl = 0), (Zl = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function R1(e, t) {
    var a = [],
      r = {
        status: "pending",
        value: null,
        reason: null,
        then: function (s) {
          a.push(s);
        },
      };
    return (
      e.then(
        function () {
          (r.status = "fulfilled"), (r.value = t);
          for (var s = 0; s < a.length; s++) (0, a[s])(t);
        },
        function (s) {
          for (r.status = "rejected", r.reason = s, s = 0; s < a.length; s++)
            (0, a[s])(void 0);
        }
      ),
      r
    );
  }
  var Hh = D.S;
  D.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      A1(e, t),
      Hh !== null && Hh(e, t);
  };
  var rl = P(null);
  function Pc() {
    var e = rl.current;
    return e !== null ? e : Fe.pooledCache;
  }
  function Nu(e, t) {
    t === null ? ie(rl, rl.current) : ie(rl, t.pool);
  }
  function Zh() {
    var e = Pc();
    return e === null ? null : { parent: ot._currentValue, pool: e };
  }
  var Vr = Error(u(460)),
    Qh = Error(u(474)),
    Du = Error(u(542)),
    Wc = { then: function () {} };
  function Yh(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function ju() {}
  function Gh(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(ju, ju), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Kh(e), e);
      default:
        if (typeof t.status == "string") t.then(ju, ju);
        else {
          if (((e = Fe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(u(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (r) {
                if (t.status === "pending") {
                  var s = t;
                  (s.status = "fulfilled"), (s.value = r);
                }
              },
              function (r) {
                if (t.status === "pending") {
                  var s = t;
                  (s.status = "rejected"), (s.reason = r);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Kh(e), e);
        }
        throw ((Hr = t), Vr);
    }
  }
  var Hr = null;
  function Xh() {
    if (Hr === null) throw Error(u(459));
    var e = Hr;
    return (Hr = null), e;
  }
  function Kh(e) {
    if (e === Vr || e === Du) throw Error(u(483));
  }
  var pa = !1;
  function Ic(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function eo(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function va(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ga(e, t, a) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (Ze & 2) !== 0)) {
      var s = r.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (r.pending = t),
        (t = Tu(e)),
        jh(e, null, a),
        t
      );
    }
    return wu(e, r, t, a), Tu(e);
  }
  function Zr(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), Vd(e, a);
    }
  }
  function to(e, t) {
    var a = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), a === r)) {
      var s = null,
        f = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var p = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          f === null ? (s = f = p) : (f = f.next = p), (a = a.next);
        } while (a !== null);
        f === null ? (s = f = t) : (f = f.next = t);
      } else s = f = t;
      (a = {
        baseState: r.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: f,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
        (e.updateQueue = a);
      return;
    }
    (e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t);
  }
  var no = !1;
  function Qr() {
    if (no) {
      var e = Zl;
      if (e !== null) throw e;
    }
  }
  function Yr(e, t, a, r) {
    no = !1;
    var s = e.updateQueue;
    pa = !1;
    var f = s.firstBaseUpdate,
      p = s.lastBaseUpdate,
      g = s.shared.pending;
    if (g !== null) {
      s.shared.pending = null;
      var C = g,
        Y = C.next;
      (C.next = null), p === null ? (f = Y) : (p.next = Y), (p = C);
      var W = e.alternate;
      W !== null &&
        ((W = W.updateQueue),
        (g = W.lastBaseUpdate),
        g !== p &&
          (g === null ? (W.firstBaseUpdate = Y) : (g.next = Y),
          (W.lastBaseUpdate = C)));
    }
    if (f !== null) {
      var ae = s.baseState;
      (p = 0), (W = Y = C = null), (g = f);
      do {
        var K = g.lane & -536870913,
          F = K !== g.lane;
        if (F ? (qe & K) === K : (r & K) === K) {
          K !== 0 && K === Hl && (no = !0),
            W !== null &&
              (W = W.next =
                {
                  lane: 0,
                  tag: g.tag,
                  payload: g.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var Ae = e,
              Ee = g;
            K = t;
            var Xe = a;
            switch (Ee.tag) {
              case 1:
                if (((Ae = Ee.payload), typeof Ae == "function")) {
                  ae = Ae.call(Xe, ae, K);
                  break e;
                }
                ae = Ae;
                break e;
              case 3:
                Ae.flags = (Ae.flags & -65537) | 128;
              case 0:
                if (
                  ((Ae = Ee.payload),
                  (K = typeof Ae == "function" ? Ae.call(Xe, ae, K) : Ae),
                  K == null)
                )
                  break e;
                ae = v({}, ae, K);
                break e;
              case 2:
                pa = !0;
            }
          }
          (K = g.callback),
            K !== null &&
              ((e.flags |= 64),
              F && (e.flags |= 8192),
              (F = s.callbacks),
              F === null ? (s.callbacks = [K]) : F.push(K));
        } else
          (F = {
            lane: K,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null,
          }),
            W === null ? ((Y = W = F), (C = ae)) : (W = W.next = F),
            (p |= K);
        if (((g = g.next), g === null)) {
          if (((g = s.shared.pending), g === null)) break;
          (F = g),
            (g = F.next),
            (F.next = null),
            (s.lastBaseUpdate = F),
            (s.shared.pending = null);
        }
      } while (!0);
      W === null && (C = ae),
        (s.baseState = C),
        (s.firstBaseUpdate = Y),
        (s.lastBaseUpdate = W),
        f === null && (s.shared.lanes = 0),
        (Aa |= p),
        (e.lanes = p),
        (e.memoizedState = ae);
    }
  }
  function $h(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function Fh(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) $h(a[e], t);
  }
  var Ql = P(null),
    zu = P(0);
  function Jh(e, t) {
    (e = Wn), ie(zu, e), ie(Ql, t), (Wn = e | t.baseLanes);
  }
  function ao() {
    ie(zu, Wn), ie(Ql, Ql.current);
  }
  function lo() {
    (Wn = zu.current), ne(Ql), ne(zu);
  }
  var ba = 0,
    je = null,
    Ye = null,
    ut = null,
    Uu = !1,
    Yl = !1,
    il = !1,
    ku = 0,
    Gr = 0,
    Gl = null,
    O1 = 0;
  function lt() {
    throw Error(u(321));
  }
  function ro(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Yt(e[a], t[a])) return !1;
    return !0;
  }
  function io(e, t, a, r, s, f) {
    return (
      (ba = f),
      (je = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (D.H = e === null || e.memoizedState === null ? jm : zm),
      (il = !1),
      (f = a(r, s)),
      (il = !1),
      Yl && (f = Wh(t, a, r, s)),
      Ph(e),
      f
    );
  }
  function Ph(e) {
    D.H = Zu;
    var t = Ye !== null && Ye.next !== null;
    if (((ba = 0), (ut = Ye = je = null), (Uu = !1), (Gr = 0), (Gl = null), t))
      throw Error(u(300));
    e === null ||
      yt ||
      ((e = e.dependencies), e !== null && Cu(e) && (yt = !0));
  }
  function Wh(e, t, a, r) {
    je = e;
    var s = 0;
    do {
      if ((Yl && (Gl = null), (Gr = 0), (Yl = !1), 25 <= s))
        throw Error(u(301));
      if (((s += 1), (ut = Ye = null), e.updateQueue != null)) {
        var f = e.updateQueue;
        (f.lastEffect = null),
          (f.events = null),
          (f.stores = null),
          f.memoCache != null && (f.memoCache.index = 0);
      }
      (D.H = U1), (f = t(a, r));
    } while (Yl);
    return f;
  }
  function C1() {
    var e = D.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Xr(t) : t),
      (e = e.useState()[0]),
      (Ye !== null ? Ye.memoizedState : null) !== e && (je.flags |= 1024),
      t
    );
  }
  function uo() {
    var e = ku !== 0;
    return (ku = 0), e;
  }
  function so(e, t, a) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
  }
  function co(e) {
    if (Uu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      Uu = !1;
    }
    (ba = 0), (ut = Ye = je = null), (Yl = !1), (Gr = ku = 0), (Gl = null);
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return ut === null ? (je.memoizedState = ut = e) : (ut = ut.next = e), ut;
  }
  function st() {
    if (Ye === null) {
      var e = je.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = ut === null ? je.memoizedState : ut.next;
    if (t !== null) (ut = t), (Ye = e);
    else {
      if (e === null)
        throw je.alternate === null ? Error(u(467)) : Error(u(310));
      (Ye = e),
        (e = {
          memoizedState: Ye.memoizedState,
          baseState: Ye.baseState,
          baseQueue: Ye.baseQueue,
          queue: Ye.queue,
          next: null,
        }),
        ut === null ? (je.memoizedState = ut = e) : (ut = ut.next = e);
    }
    return ut;
  }
  function oo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xr(e) {
    var t = Gr;
    return (
      (Gr += 1),
      Gl === null && (Gl = []),
      (e = Gh(Gl, e, t)),
      (t = je),
      (ut === null ? t.memoizedState : ut.next) === null &&
        ((t = t.alternate),
        (D.H = t === null || t.memoizedState === null ? jm : zm)),
      e
    );
  }
  function Lu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xr(e);
      if (e.$$typeof === _) return Rt(e);
    }
    throw Error(u(438, String(e)));
  }
  function fo(e) {
    var t = null,
      a = je.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var r = je.alternate;
      r !== null &&
        ((r = r.updateQueue),
        r !== null &&
          ((r = r.memoCache),
          r != null &&
            (t = {
              data: r.data.map(function (s) {
                return s.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = oo()), (je.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), r = 0; r < e; r++) a[r] = B;
    return t.index++, a;
  }
  function Xn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function qu(e) {
    var t = st();
    return ho(t, Ye, e);
  }
  function ho(e, t, a) {
    var r = e.queue;
    if (r === null) throw Error(u(311));
    r.lastRenderedReducer = a;
    var s = e.baseQueue,
      f = r.pending;
    if (f !== null) {
      if (s !== null) {
        var p = s.next;
        (s.next = f.next), (f.next = p);
      }
      (t.baseQueue = s = f), (r.pending = null);
    }
    if (((f = e.baseState), s === null)) e.memoizedState = f;
    else {
      t = s.next;
      var g = (p = null),
        C = null,
        Y = t,
        W = !1;
      do {
        var ae = Y.lane & -536870913;
        if (ae !== Y.lane ? (qe & ae) === ae : (ba & ae) === ae) {
          var K = Y.revertLane;
          if (K === 0)
            C !== null &&
              (C = C.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: Y.action,
                  hasEagerState: Y.hasEagerState,
                  eagerState: Y.eagerState,
                  next: null,
                }),
              ae === Hl && (W = !0);
          else if ((ba & K) === K) {
            (Y = Y.next), K === Hl && (W = !0);
            continue;
          } else
            (ae = {
              lane: 0,
              revertLane: Y.revertLane,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null,
            }),
              C === null ? ((g = C = ae), (p = f)) : (C = C.next = ae),
              (je.lanes |= K),
              (Aa |= K);
          (ae = Y.action),
            il && a(f, ae),
            (f = Y.hasEagerState ? Y.eagerState : a(f, ae));
        } else
          (K = {
            lane: ae,
            revertLane: Y.revertLane,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null,
          }),
            C === null ? ((g = C = K), (p = f)) : (C = C.next = K),
            (je.lanes |= ae),
            (Aa |= ae);
        Y = Y.next;
      } while (Y !== null && Y !== t);
      if (
        (C === null ? (p = f) : (C.next = g),
        !Yt(f, e.memoizedState) && ((yt = !0), W && ((a = Zl), a !== null)))
      )
        throw a;
      (e.memoizedState = f),
        (e.baseState = p),
        (e.baseQueue = C),
        (r.lastRenderedState = f);
    }
    return s === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function mo(e) {
    var t = st(),
      a = t.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = e;
    var r = a.dispatch,
      s = a.pending,
      f = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var p = (s = s.next);
      do (f = e(f, p.action)), (p = p.next);
      while (p !== s);
      Yt(f, t.memoizedState) || (yt = !0),
        (t.memoizedState = f),
        t.baseQueue === null && (t.baseState = f),
        (a.lastRenderedState = f);
    }
    return [f, r];
  }
  function Ih(e, t, a) {
    var r = je,
      s = st(),
      f = He;
    if (f) {
      if (a === void 0) throw Error(u(407));
      a = a();
    } else a = t();
    var p = !Yt((Ye || s).memoizedState, a);
    p && ((s.memoizedState = a), (yt = !0)), (s = s.queue);
    var g = nm.bind(null, r, s, e);
    if (
      (Kr(2048, 8, g, [e]),
      s.getSnapshot !== t || p || (ut !== null && ut.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Xl(9, Bu(), tm.bind(null, r, s, a, t), null),
        Fe === null)
      )
        throw Error(u(349));
      f || (ba & 124) !== 0 || em(r, t, a);
    }
    return a;
  }
  function em(e, t, a) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = je.updateQueue),
      t === null
        ? ((t = oo()), (je.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
  }
  function tm(e, t, a, r) {
    (t.value = a), (t.getSnapshot = r), am(t) && lm(e);
  }
  function nm(e, t, a) {
    return a(function () {
      am(t) && lm(e);
    });
  }
  function am(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Yt(e, a);
    } catch {
      return !0;
    }
  }
  function lm(e) {
    var t = Ll(e, 2);
    t !== null && Jt(t, e, 2);
  }
  function yo(e) {
    var t = qt();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), il)) {
        ye(!0);
        try {
          a();
        } finally {
          ye(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function rm(e, t, a, r) {
    return (e.baseState = a), ho(e, Ye, typeof r == "function" ? r : Xn);
  }
  function M1(e, t, a, r, s) {
    if (Hu(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var f = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (p) {
          f.listeners.push(p);
        },
      };
      D.T !== null ? a(!0) : (f.isTransition = !1),
        r(f),
        (a = t.pending),
        a === null
          ? ((f.next = t.pending = f), im(t, f))
          : ((f.next = a.next), (t.pending = a.next = f));
    }
  }
  function im(e, t) {
    var a = t.action,
      r = t.payload,
      s = e.state;
    if (t.isTransition) {
      var f = D.T,
        p = {};
      D.T = p;
      try {
        var g = a(s, r),
          C = D.S;
        C !== null && C(p, g), um(e, t, g);
      } catch (Y) {
        po(e, t, Y);
      } finally {
        D.T = f;
      }
    } else
      try {
        (f = a(s, r)), um(e, t, f);
      } catch (Y) {
        po(e, t, Y);
      }
  }
  function um(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (r) {
            sm(e, t, r);
          },
          function (r) {
            return po(e, t, r);
          }
        )
      : sm(e, t, a);
  }
  function sm(e, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      cm(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), im(e, a)));
  }
  function po(e, t, a) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do (t.status = "rejected"), (t.reason = a), cm(t), (t = t.next);
      while (t !== r);
    }
    e.action = null;
  }
  function cm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function om(e, t) {
    return t;
  }
  function fm(e, t) {
    if (He) {
      var a = Fe.formState;
      if (a !== null) {
        e: {
          var r = je;
          if (He) {
            if (tt) {
              t: {
                for (var s = tt, f = Tn; s.nodeType !== 8; ) {
                  if (!f) {
                    s = null;
                    break t;
                  }
                  if (((s = dn(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                (f = s.data), (s = f === "F!" || f === "F" ? s : null);
              }
              if (s) {
                (tt = dn(s.nextSibling)), (r = s.data === "F!");
                break e;
              }
            }
            nl(r);
          }
          r = !1;
        }
        r && (t = a[0]);
      }
    }
    return (
      (a = qt()),
      (a.memoizedState = a.baseState = t),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: om,
        lastRenderedState: t,
      }),
      (a.queue = r),
      (a = Mm.bind(null, je, r)),
      (r.dispatch = a),
      (r = yo(!1)),
      (f = So.bind(null, je, !1, r.queue)),
      (r = qt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = s),
      (a = M1.bind(null, je, s, f, a)),
      (s.dispatch = a),
      (r.memoizedState = e),
      [t, a, !1]
    );
  }
  function dm(e) {
    var t = st();
    return hm(t, Ye, e);
  }
  function hm(e, t, a) {
    if (
      ((t = ho(e, t, om)[0]),
      (e = qu(Xn)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var r = Xr(t);
      } catch (p) {
        throw p === Vr ? Du : p;
      }
    else r = t;
    t = st();
    var s = t.queue,
      f = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((je.flags |= 2048), Xl(9, Bu(), N1.bind(null, s, a), null)),
      [r, f, e]
    );
  }
  function N1(e, t) {
    e.action = t;
  }
  function mm(e) {
    var t = st(),
      a = Ye;
    if (a !== null) return hm(t, a, e);
    st(), (t = t.memoizedState), (a = st());
    var r = a.queue.dispatch;
    return (a.memoizedState = e), [t, r, !1];
  }
  function Xl(e, t, a, r) {
    return (
      (e = { tag: e, create: a, deps: r, inst: t, next: null }),
      (t = je.updateQueue),
      t === null && ((t = oo()), (je.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((r = a.next), (a.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Bu() {
    return { destroy: void 0, resource: void 0 };
  }
  function ym() {
    return st().memoizedState;
  }
  function Vu(e, t, a, r) {
    var s = qt();
    (r = r === void 0 ? null : r),
      (je.flags |= e),
      (s.memoizedState = Xl(1 | t, Bu(), a, r));
  }
  function Kr(e, t, a, r) {
    var s = st();
    r = r === void 0 ? null : r;
    var f = s.memoizedState.inst;
    Ye !== null && r !== null && ro(r, Ye.memoizedState.deps)
      ? (s.memoizedState = Xl(t, f, a, r))
      : ((je.flags |= e), (s.memoizedState = Xl(1 | t, f, a, r)));
  }
  function pm(e, t) {
    Vu(8390656, 8, e, t);
  }
  function vm(e, t) {
    Kr(2048, 8, e, t);
  }
  function gm(e, t) {
    return Kr(4, 2, e, t);
  }
  function bm(e, t) {
    return Kr(4, 4, e, t);
  }
  function _m(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Sm(e, t, a) {
    (a = a != null ? a.concat([e]) : null), Kr(4, 4, _m.bind(null, t, e), a);
  }
  function vo() {}
  function xm(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    return t !== null && ro(t, r[1]) ? r[0] : ((a.memoizedState = [e, t]), e);
  }
  function Em(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var r = a.memoizedState;
    if (t !== null && ro(t, r[1])) return r[0];
    if (((r = e()), il)) {
      ye(!0);
      try {
        e();
      } finally {
        ye(!1);
      }
    }
    return (a.memoizedState = [r, t]), r;
  }
  function go(e, t, a) {
    return a === void 0 || (ba & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Ay()), (je.lanes |= e), (Aa |= e), a);
  }
  function wm(e, t, a, r) {
    return Yt(a, t)
      ? a
      : Ql.current !== null
      ? ((e = go(e, a, r)), Yt(e, t) || (yt = !0), e)
      : (ba & 42) === 0
      ? ((yt = !0), (e.memoizedState = a))
      : ((e = Ay()), (je.lanes |= e), (Aa |= e), t);
  }
  function Tm(e, t, a, r, s) {
    var f = J.p;
    J.p = f !== 0 && 8 > f ? f : 8;
    var p = D.T,
      g = {};
    (D.T = g), So(e, !1, t, a);
    try {
      var C = s(),
        Y = D.S;
      if (
        (Y !== null && Y(g, C),
        C !== null && typeof C == "object" && typeof C.then == "function")
      ) {
        var W = R1(C, r);
        $r(e, t, W, Ft(e));
      } else $r(e, t, r, Ft(e));
    } catch (ae) {
      $r(e, t, { then: function () {}, status: "rejected", reason: ae }, Ft());
    } finally {
      (J.p = f), (D.T = p);
    }
  }
  function D1() {}
  function bo(e, t, a, r) {
    if (e.tag !== 5) throw Error(u(476));
    var s = Am(e).queue;
    Tm(
      e,
      s,
      t,
      le,
      a === null
        ? D1
        : function () {
            return Rm(e), a(r);
          }
    );
  }
  function Am(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xn,
        lastRenderedState: le,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Xn,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Rm(e) {
    var t = Am(e).next.queue;
    $r(e, t, {}, Ft());
  }
  function _o() {
    return Rt(di);
  }
  function Om() {
    return st().memoizedState;
  }
  function Cm() {
    return st().memoizedState;
  }
  function j1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ft();
          e = va(a);
          var r = ga(t, e, a);
          r !== null && (Jt(r, t, a), Zr(r, t, a)),
            (t = { cache: Fc() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function z1(e, t, a) {
    var r = Ft();
    (a = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Hu(e)
        ? Nm(t, a)
        : ((a = Bc(e, t, a, r)), a !== null && (Jt(a, e, r), Dm(a, t, r)));
  }
  function Mm(e, t, a) {
    var r = Ft();
    $r(e, t, a, r);
  }
  function $r(e, t, a, r) {
    var s = {
      lane: r,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Hu(e)) Nm(t, s);
    else {
      var f = e.alternate;
      if (
        e.lanes === 0 &&
        (f === null || f.lanes === 0) &&
        ((f = t.lastRenderedReducer), f !== null)
      )
        try {
          var p = t.lastRenderedState,
            g = f(p, a);
          if (((s.hasEagerState = !0), (s.eagerState = g), Yt(g, p)))
            return wu(e, t, s, 0), Fe === null && Eu(), !1;
        } catch {
        } finally {
        }
      if (((a = Bc(e, t, s, r)), a !== null))
        return Jt(a, e, r), Dm(a, t, r), !0;
    }
    return !1;
  }
  function So(e, t, a, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: Io(),
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Hu(e))
    ) {
      if (t) throw Error(u(479));
    } else (t = Bc(e, a, r, 2)), t !== null && Jt(t, e, 2);
  }
  function Hu(e) {
    var t = e.alternate;
    return e === je || (t !== null && t === je);
  }
  function Nm(e, t) {
    Yl = Uu = !0;
    var a = e.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t);
  }
  function Dm(e, t, a) {
    if ((a & 4194048) !== 0) {
      var r = t.lanes;
      (r &= e.pendingLanes), (a |= r), (t.lanes = a), Vd(e, a);
    }
  }
  var Zu = {
      readContext: Rt,
      use: Lu,
      useCallback: lt,
      useContext: lt,
      useEffect: lt,
      useImperativeHandle: lt,
      useLayoutEffect: lt,
      useInsertionEffect: lt,
      useMemo: lt,
      useReducer: lt,
      useRef: lt,
      useState: lt,
      useDebugValue: lt,
      useDeferredValue: lt,
      useTransition: lt,
      useSyncExternalStore: lt,
      useId: lt,
      useHostTransitionStatus: lt,
      useFormState: lt,
      useActionState: lt,
      useOptimistic: lt,
      useMemoCache: lt,
      useCacheRefresh: lt,
    },
    jm = {
      readContext: Rt,
      use: Lu,
      useCallback: function (e, t) {
        return (qt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Rt,
      useEffect: pm,
      useImperativeHandle: function (e, t, a) {
        (a = a != null ? a.concat([e]) : null),
          Vu(4194308, 4, _m.bind(null, t, e), a);
      },
      useLayoutEffect: function (e, t) {
        return Vu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Vu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = qt();
        t = t === void 0 ? null : t;
        var r = e();
        if (il) {
          ye(!0);
          try {
            e();
          } finally {
            ye(!1);
          }
        }
        return (a.memoizedState = [r, t]), r;
      },
      useReducer: function (e, t, a) {
        var r = qt();
        if (a !== void 0) {
          var s = a(t);
          if (il) {
            ye(!0);
            try {
              a(t);
            } finally {
              ye(!1);
            }
          }
        } else s = t;
        return (
          (r.memoizedState = r.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s,
          }),
          (r.queue = e),
          (e = e.dispatch = z1.bind(null, je, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = qt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = yo(e);
        var t = e.queue,
          a = Mm.bind(null, je, t);
        return (t.dispatch = a), [e.memoizedState, a];
      },
      useDebugValue: vo,
      useDeferredValue: function (e, t) {
        var a = qt();
        return go(a, e, t);
      },
      useTransition: function () {
        var e = yo(!1);
        return (
          (e = Tm.bind(null, je, e.queue, !0, !1)),
          (qt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, a) {
        var r = je,
          s = qt();
        if (He) {
          if (a === void 0) throw Error(u(407));
          a = a();
        } else {
          if (((a = t()), Fe === null)) throw Error(u(349));
          (qe & 124) !== 0 || em(r, t, a);
        }
        s.memoizedState = a;
        var f = { value: a, getSnapshot: t };
        return (
          (s.queue = f),
          pm(nm.bind(null, r, f, e), [e]),
          (r.flags |= 2048),
          Xl(9, Bu(), tm.bind(null, r, f, a, t), null),
          a
        );
      },
      useId: function () {
        var e = qt(),
          t = Fe.identifierPrefix;
        if (He) {
          var a = Qn,
            r = Zn;
          (a = (r & ~(1 << (32 - Oe(r) - 1))).toString(32) + a),
            (t = "«" + t + "R" + a),
            (a = ku++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "»");
        } else (a = O1++), (t = "«" + t + "r" + a.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: _o,
      useFormState: fm,
      useActionState: fm,
      useOptimistic: function (e) {
        var t = qt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = So.bind(null, je, !0, a)),
          (a.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: fo,
      useCacheRefresh: function () {
        return (qt().memoizedState = j1.bind(null, je));
      },
    },
    zm = {
      readContext: Rt,
      use: Lu,
      useCallback: xm,
      useContext: Rt,
      useEffect: vm,
      useImperativeHandle: Sm,
      useInsertionEffect: gm,
      useLayoutEffect: bm,
      useMemo: Em,
      useReducer: qu,
      useRef: ym,
      useState: function () {
        return qu(Xn);
      },
      useDebugValue: vo,
      useDeferredValue: function (e, t) {
        var a = st();
        return wm(a, Ye.memoizedState, e, t);
      },
      useTransition: function () {
        var e = qu(Xn)[0],
          t = st().memoizedState;
        return [typeof e == "boolean" ? e : Xr(e), t];
      },
      useSyncExternalStore: Ih,
      useId: Om,
      useHostTransitionStatus: _o,
      useFormState: dm,
      useActionState: dm,
      useOptimistic: function (e, t) {
        var a = st();
        return rm(a, Ye, e, t);
      },
      useMemoCache: fo,
      useCacheRefresh: Cm,
    },
    U1 = {
      readContext: Rt,
      use: Lu,
      useCallback: xm,
      useContext: Rt,
      useEffect: vm,
      useImperativeHandle: Sm,
      useInsertionEffect: gm,
      useLayoutEffect: bm,
      useMemo: Em,
      useReducer: mo,
      useRef: ym,
      useState: function () {
        return mo(Xn);
      },
      useDebugValue: vo,
      useDeferredValue: function (e, t) {
        var a = st();
        return Ye === null ? go(a, e, t) : wm(a, Ye.memoizedState, e, t);
      },
      useTransition: function () {
        var e = mo(Xn)[0],
          t = st().memoizedState;
        return [typeof e == "boolean" ? e : Xr(e), t];
      },
      useSyncExternalStore: Ih,
      useId: Om,
      useHostTransitionStatus: _o,
      useFormState: mm,
      useActionState: mm,
      useOptimistic: function (e, t) {
        var a = st();
        return Ye !== null
          ? rm(a, Ye, e, t)
          : ((a.baseState = e), [e, a.queue.dispatch]);
      },
      useMemoCache: fo,
      useCacheRefresh: Cm,
    },
    Kl = null,
    Fr = 0;
  function Qu(e) {
    var t = Fr;
    return (Fr += 1), Kl === null && (Kl = []), Gh(Kl, e, t);
  }
  function Jr(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Yu(e, t) {
    throw t.$$typeof === x
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Um(e) {
    var t = e._init;
    return t(e._payload);
  }
  function km(e) {
    function t(H, L) {
      if (e) {
        var Q = H.deletions;
        Q === null ? ((H.deletions = [L]), (H.flags |= 16)) : Q.push(L);
      }
    }
    function a(H, L) {
      if (!e) return null;
      for (; L !== null; ) t(H, L), (L = L.sibling);
      return null;
    }
    function r(H) {
      for (var L = new Map(); H !== null; )
        H.key !== null ? L.set(H.key, H) : L.set(H.index, H), (H = H.sibling);
      return L;
    }
    function s(H, L) {
      return (H = Hn(H, L)), (H.index = 0), (H.sibling = null), H;
    }
    function f(H, L, Q) {
      return (
        (H.index = Q),
        e
          ? ((Q = H.alternate),
            Q !== null
              ? ((Q = Q.index), Q < L ? ((H.flags |= 67108866), L) : Q)
              : ((H.flags |= 67108866), L))
          : ((H.flags |= 1048576), L)
      );
    }
    function p(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function g(H, L, Q, te) {
      return L === null || L.tag !== 6
        ? ((L = Hc(Q, H.mode, te)), (L.return = H), L)
        : ((L = s(L, Q)), (L.return = H), L);
    }
    function C(H, L, Q, te) {
      var be = Q.type;
      return be === w
        ? W(H, L, Q.props.children, te, Q.key)
        : L !== null &&
          (L.elementType === be ||
            (typeof be == "object" &&
              be !== null &&
              be.$$typeof === T &&
              Um(be) === L.type))
        ? ((L = s(L, Q.props)), Jr(L, Q), (L.return = H), L)
        : ((L = Au(Q.type, Q.key, Q.props, null, H.mode, te)),
          Jr(L, Q),
          (L.return = H),
          L);
    }
    function Y(H, L, Q, te) {
      return L === null ||
        L.tag !== 4 ||
        L.stateNode.containerInfo !== Q.containerInfo ||
        L.stateNode.implementation !== Q.implementation
        ? ((L = Zc(Q, H.mode, te)), (L.return = H), L)
        : ((L = s(L, Q.children || [])), (L.return = H), L);
    }
    function W(H, L, Q, te, be) {
      return L === null || L.tag !== 7
        ? ((L = Wa(Q, H.mode, te, be)), (L.return = H), L)
        : ((L = s(L, Q)), (L.return = H), L);
    }
    function ae(H, L, Q) {
      if (
        (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
      )
        return (L = Hc("" + L, H.mode, Q)), (L.return = H), L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case b:
            return (
              (Q = Au(L.type, L.key, L.props, null, H.mode, Q)),
              Jr(Q, L),
              (Q.return = H),
              Q
            );
          case E:
            return (L = Zc(L, H.mode, Q)), (L.return = H), L;
          case T:
            var te = L._init;
            return (L = te(L._payload)), ae(H, L, Q);
        }
        if (se(L) || V(L))
          return (L = Wa(L, H.mode, Q, null)), (L.return = H), L;
        if (typeof L.then == "function") return ae(H, Qu(L), Q);
        if (L.$$typeof === _) return ae(H, Mu(H, L), Q);
        Yu(H, L);
      }
      return null;
    }
    function K(H, L, Q, te) {
      var be = L !== null ? L.key : null;
      if (
        (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
      )
        return be !== null ? null : g(H, L, "" + Q, te);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case b:
            return Q.key === be ? C(H, L, Q, te) : null;
          case E:
            return Q.key === be ? Y(H, L, Q, te) : null;
          case T:
            return (be = Q._init), (Q = be(Q._payload)), K(H, L, Q, te);
        }
        if (se(Q) || V(Q)) return be !== null ? null : W(H, L, Q, te, null);
        if (typeof Q.then == "function") return K(H, L, Qu(Q), te);
        if (Q.$$typeof === _) return K(H, L, Mu(H, Q), te);
        Yu(H, Q);
      }
      return null;
    }
    function F(H, L, Q, te, be) {
      if (
        (typeof te == "string" && te !== "") ||
        typeof te == "number" ||
        typeof te == "bigint"
      )
        return (H = H.get(Q) || null), g(L, H, "" + te, be);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case b:
            return (
              (H = H.get(te.key === null ? Q : te.key) || null), C(L, H, te, be)
            );
          case E:
            return (
              (H = H.get(te.key === null ? Q : te.key) || null), Y(L, H, te, be)
            );
          case T:
            var ze = te._init;
            return (te = ze(te._payload)), F(H, L, Q, te, be);
        }
        if (se(te) || V(te))
          return (H = H.get(Q) || null), W(L, H, te, be, null);
        if (typeof te.then == "function") return F(H, L, Q, Qu(te), be);
        if (te.$$typeof === _) return F(H, L, Q, Mu(L, te), be);
        Yu(L, te);
      }
      return null;
    }
    function Ae(H, L, Q, te) {
      for (
        var be = null, ze = null, xe = L, we = (L = 0), vt = null;
        xe !== null && we < Q.length;
        we++
      ) {
        xe.index > we ? ((vt = xe), (xe = null)) : (vt = xe.sibling);
        var Ve = K(H, xe, Q[we], te);
        if (Ve === null) {
          xe === null && (xe = vt);
          break;
        }
        e && xe && Ve.alternate === null && t(H, xe),
          (L = f(Ve, L, we)),
          ze === null ? (be = Ve) : (ze.sibling = Ve),
          (ze = Ve),
          (xe = vt);
      }
      if (we === Q.length) return a(H, xe), He && el(H, we), be;
      if (xe === null) {
        for (; we < Q.length; we++)
          (xe = ae(H, Q[we], te)),
            xe !== null &&
              ((L = f(xe, L, we)),
              ze === null ? (be = xe) : (ze.sibling = xe),
              (ze = xe));
        return He && el(H, we), be;
      }
      for (xe = r(xe); we < Q.length; we++)
        (vt = F(xe, H, we, Q[we], te)),
          vt !== null &&
            (e &&
              vt.alternate !== null &&
              xe.delete(vt.key === null ? we : vt.key),
            (L = f(vt, L, we)),
            ze === null ? (be = vt) : (ze.sibling = vt),
            (ze = vt));
      return (
        e &&
          xe.forEach(function (Ua) {
            return t(H, Ua);
          }),
        He && el(H, we),
        be
      );
    }
    function Ee(H, L, Q, te) {
      if (Q == null) throw Error(u(151));
      for (
        var be = null,
          ze = null,
          xe = L,
          we = (L = 0),
          vt = null,
          Ve = Q.next();
        xe !== null && !Ve.done;
        we++, Ve = Q.next()
      ) {
        xe.index > we ? ((vt = xe), (xe = null)) : (vt = xe.sibling);
        var Ua = K(H, xe, Ve.value, te);
        if (Ua === null) {
          xe === null && (xe = vt);
          break;
        }
        e && xe && Ua.alternate === null && t(H, xe),
          (L = f(Ua, L, we)),
          ze === null ? (be = Ua) : (ze.sibling = Ua),
          (ze = Ua),
          (xe = vt);
      }
      if (Ve.done) return a(H, xe), He && el(H, we), be;
      if (xe === null) {
        for (; !Ve.done; we++, Ve = Q.next())
          (Ve = ae(H, Ve.value, te)),
            Ve !== null &&
              ((L = f(Ve, L, we)),
              ze === null ? (be = Ve) : (ze.sibling = Ve),
              (ze = Ve));
        return He && el(H, we), be;
      }
      for (xe = r(xe); !Ve.done; we++, Ve = Q.next())
        (Ve = F(xe, H, we, Ve.value, te)),
          Ve !== null &&
            (e &&
              Ve.alternate !== null &&
              xe.delete(Ve.key === null ? we : Ve.key),
            (L = f(Ve, L, we)),
            ze === null ? (be = Ve) : (ze.sibling = Ve),
            (ze = Ve));
      return (
        e &&
          xe.forEach(function (kb) {
            return t(H, kb);
          }),
        He && el(H, we),
        be
      );
    }
    function Xe(H, L, Q, te) {
      if (
        (typeof Q == "object" &&
          Q !== null &&
          Q.type === w &&
          Q.key === null &&
          (Q = Q.props.children),
        typeof Q == "object" && Q !== null)
      ) {
        switch (Q.$$typeof) {
          case b:
            e: {
              for (var be = Q.key; L !== null; ) {
                if (L.key === be) {
                  if (((be = Q.type), be === w)) {
                    if (L.tag === 7) {
                      a(H, L.sibling),
                        (te = s(L, Q.props.children)),
                        (te.return = H),
                        (H = te);
                      break e;
                    }
                  } else if (
                    L.elementType === be ||
                    (typeof be == "object" &&
                      be !== null &&
                      be.$$typeof === T &&
                      Um(be) === L.type)
                  ) {
                    a(H, L.sibling),
                      (te = s(L, Q.props)),
                      Jr(te, Q),
                      (te.return = H),
                      (H = te);
                    break e;
                  }
                  a(H, L);
                  break;
                } else t(H, L);
                L = L.sibling;
              }
              Q.type === w
                ? ((te = Wa(Q.props.children, H.mode, te, Q.key)),
                  (te.return = H),
                  (H = te))
                : ((te = Au(Q.type, Q.key, Q.props, null, H.mode, te)),
                  Jr(te, Q),
                  (te.return = H),
                  (H = te));
            }
            return p(H);
          case E:
            e: {
              for (be = Q.key; L !== null; ) {
                if (L.key === be)
                  if (
                    L.tag === 4 &&
                    L.stateNode.containerInfo === Q.containerInfo &&
                    L.stateNode.implementation === Q.implementation
                  ) {
                    a(H, L.sibling),
                      (te = s(L, Q.children || [])),
                      (te.return = H),
                      (H = te);
                    break e;
                  } else {
                    a(H, L);
                    break;
                  }
                else t(H, L);
                L = L.sibling;
              }
              (te = Zc(Q, H.mode, te)), (te.return = H), (H = te);
            }
            return p(H);
          case T:
            return (be = Q._init), (Q = be(Q._payload)), Xe(H, L, Q, te);
        }
        if (se(Q)) return Ae(H, L, Q, te);
        if (V(Q)) {
          if (((be = V(Q)), typeof be != "function")) throw Error(u(150));
          return (Q = be.call(Q)), Ee(H, L, Q, te);
        }
        if (typeof Q.then == "function") return Xe(H, L, Qu(Q), te);
        if (Q.$$typeof === _) return Xe(H, L, Mu(H, Q), te);
        Yu(H, Q);
      }
      return (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
        ? ((Q = "" + Q),
          L !== null && L.tag === 6
            ? (a(H, L.sibling), (te = s(L, Q)), (te.return = H), (H = te))
            : (a(H, L), (te = Hc(Q, H.mode, te)), (te.return = H), (H = te)),
          p(H))
        : a(H, L);
    }
    return function (H, L, Q, te) {
      try {
        Fr = 0;
        var be = Xe(H, L, Q, te);
        return (Kl = null), be;
      } catch (xe) {
        if (xe === Vr || xe === Du) throw xe;
        var ze = Gt(29, xe, null, H.mode);
        return (ze.lanes = te), (ze.return = H), ze;
      } finally {
      }
    };
  }
  var $l = km(!0),
    Lm = km(!1),
    rn = P(null),
    An = null;
  function _a(e) {
    var t = e.alternate;
    ie(ft, ft.current & 1),
      ie(rn, e),
      An === null &&
        (t === null || Ql.current !== null || t.memoizedState !== null) &&
        (An = e);
  }
  function qm(e) {
    if (e.tag === 22) {
      if ((ie(ft, ft.current), ie(rn, e), An === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (An = e);
      }
    } else Sa();
  }
  function Sa() {
    ie(ft, ft.current), ie(rn, rn.current);
  }
  function Kn(e) {
    ne(rn), An === e && (An = null), ne(ft);
  }
  var ft = P(0);
  function Gu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || df(a))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function xo(e, t, a, r) {
    (t = e.memoizedState),
      (a = a(r, t)),
      (a = a == null ? t : v({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var Eo = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var r = Ft(),
        s = va(r);
      (s.payload = t),
        a != null && (s.callback = a),
        (t = ga(e, s, r)),
        t !== null && (Jt(t, e, r), Zr(t, e, r));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var r = Ft(),
        s = va(r);
      (s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = ga(e, s, r)),
        t !== null && (Jt(t, e, r), Zr(t, e, r));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Ft(),
        r = va(a);
      (r.tag = 2),
        t != null && (r.callback = t),
        (t = ga(e, r, a)),
        t !== null && (Jt(t, e, a), Zr(t, e, a));
    },
  };
  function Bm(e, t, a, r, s, f, p) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, f, p)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Dr(a, r) || !Dr(s, f)
        : !0
    );
  }
  function Vm(e, t, a, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, r),
      t.state !== e && Eo.enqueueReplaceState(t, t.state, null);
  }
  function ul(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var r in t) r !== "ref" && (a[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = v({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  var Xu =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Hm(e) {
    Xu(e);
  }
  function Zm(e) {
    console.error(e);
  }
  function Qm(e) {
    Xu(e);
  }
  function Ku(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function Ym(e, t, a) {
    try {
      var r = e.onCaughtError;
      r(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function wo(e, t, a) {
    return (
      (a = va(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Ku(e, t);
      }),
      a
    );
  }
  function Gm(e) {
    return (e = va(e)), (e.tag = 3), e;
  }
  function Xm(e, t, a, r) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var f = r.value;
      (e.payload = function () {
        return s(f);
      }),
        (e.callback = function () {
          Ym(t, a, r);
        });
    }
    var p = a.stateNode;
    p !== null &&
      typeof p.componentDidCatch == "function" &&
      (e.callback = function () {
        Ym(t, a, r),
          typeof s != "function" &&
            (Ra === null ? (Ra = new Set([this])) : Ra.add(this));
        var g = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: g !== null ? g : "",
        });
      });
  }
  function k1(e, t, a, r, s) {
    if (
      ((a.flags |= 32768),
      r !== null && typeof r == "object" && typeof r.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && Lr(t, a, s, !0),
        (a = rn.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              An === null ? $o() : a.alternate === null && nt === 0 && (nt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              r === Wc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([r])) : t.add(r),
                  Jo(e, r, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              r === Wc
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([r]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([r])) : a.add(r)),
                  Jo(e, r, s)),
              !1
            );
        }
        throw Error(u(435, a.tag));
      }
      return Jo(e, r, s), $o(), !1;
    }
    if (He)
      return (
        (t = rn.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            r !== Gc && ((e = Error(u(422), { cause: r })), kr(tn(e, a))))
          : (r !== Gc && ((t = Error(u(423), { cause: r })), kr(tn(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (r = tn(r, a)),
            (s = wo(e.stateNode, r, s)),
            to(e, s),
            nt !== 4 && (nt = 2)),
        !1
      );
    var f = Error(u(520), { cause: r });
    if (
      ((f = tn(f, a)),
      ai === null ? (ai = [f]) : ai.push(f),
      nt !== 4 && (nt = 2),
      t === null)
    )
      return !0;
    (r = tn(r, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = wo(a.stateNode, r, e)),
            to(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (f = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (f !== null &&
                  typeof f.componentDidCatch == "function" &&
                  (Ra === null || !Ra.has(f)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = Gm(s)),
              Xm(s, e, a, r),
              to(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Km = Error(u(461)),
    yt = !1;
  function _t(e, t, a, r) {
    t.child = e === null ? Lm(t, null, a, r) : $l(t, e.child, a, r);
  }
  function $m(e, t, a, r, s) {
    a = a.render;
    var f = t.ref;
    if ("ref" in r) {
      var p = {};
      for (var g in r) g !== "ref" && (p[g] = r[g]);
    } else p = r;
    return (
      ll(t),
      (r = io(e, t, a, p, f, s)),
      (g = uo()),
      e !== null && !yt
        ? (so(e, t, s), $n(e, t, s))
        : (He && g && Qc(t), (t.flags |= 1), _t(e, t, r, s), t.child)
    );
  }
  function Fm(e, t, a, r, s) {
    if (e === null) {
      var f = a.type;
      return typeof f == "function" &&
        !Vc(f) &&
        f.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = f), Jm(e, t, f, r, s))
        : ((e = Au(a.type, null, r, t, t.mode, s)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((f = e.child), !Do(e, s))) {
      var p = f.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Dr), a(p, r) && e.ref === t.ref)
      )
        return $n(e, t, s);
    }
    return (
      (t.flags |= 1),
      (e = Hn(f, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Jm(e, t, a, r, s) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Dr(f, r) && e.ref === t.ref)
        if (((yt = !1), (t.pendingProps = r = f), Do(e, s)))
          (e.flags & 131072) !== 0 && (yt = !0);
        else return (t.lanes = e.lanes), $n(e, t, s);
    }
    return To(e, t, a, r, s);
  }
  function Pm(e, t, a) {
    var r = t.pendingProps,
      s = r.children,
      f = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((r = f !== null ? f.baseLanes | a : a), e !== null)) {
          for (s = t.child = e.child, f = 0; s !== null; )
            (f = f | s.lanes | s.childLanes), (s = s.sibling);
          t.childLanes = f & ~r;
        } else (t.childLanes = 0), (t.child = null);
        return Wm(e, t, r, a);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Nu(t, f !== null ? f.cachePool : null),
          f !== null ? Jh(t, f) : ao(),
          qm(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Wm(e, t, f !== null ? f.baseLanes | a : a, a)
        );
    } else
      f !== null
        ? (Nu(t, f.cachePool), Jh(t, f), Sa(), (t.memoizedState = null))
        : (e !== null && Nu(t, null), ao(), Sa());
    return _t(e, t, s, a), t.child;
  }
  function Wm(e, t, a, r) {
    var s = Pc();
    return (
      (s = s === null ? null : { parent: ot._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: a, cachePool: s }),
      e !== null && Nu(t, null),
      ao(),
      qm(t),
      e !== null && Lr(e, t, r, !0),
      null
    );
  }
  function $u(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(u(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function To(e, t, a, r, s) {
    return (
      ll(t),
      (a = io(e, t, a, r, void 0, s)),
      (r = uo()),
      e !== null && !yt
        ? (so(e, t, s), $n(e, t, s))
        : (He && r && Qc(t), (t.flags |= 1), _t(e, t, a, s), t.child)
    );
  }
  function Im(e, t, a, r, s, f) {
    return (
      ll(t),
      (t.updateQueue = null),
      (a = Wh(t, r, a, s)),
      Ph(e),
      (r = uo()),
      e !== null && !yt
        ? (so(e, t, f), $n(e, t, f))
        : (He && r && Qc(t), (t.flags |= 1), _t(e, t, a, f), t.child)
    );
  }
  function ey(e, t, a, r, s) {
    if ((ll(t), t.stateNode === null)) {
      var f = ql,
        p = a.contextType;
      typeof p == "object" && p !== null && (f = Rt(p)),
        (f = new a(r, f)),
        (t.memoizedState =
          f.state !== null && f.state !== void 0 ? f.state : null),
        (f.updater = Eo),
        (t.stateNode = f),
        (f._reactInternals = t),
        (f = t.stateNode),
        (f.props = r),
        (f.state = t.memoizedState),
        (f.refs = {}),
        Ic(t),
        (p = a.contextType),
        (f.context = typeof p == "object" && p !== null ? Rt(p) : ql),
        (f.state = t.memoizedState),
        (p = a.getDerivedStateFromProps),
        typeof p == "function" && (xo(t, a, p, r), (f.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function" ||
          (typeof f.UNSAFE_componentWillMount != "function" &&
            typeof f.componentWillMount != "function") ||
          ((p = f.state),
          typeof f.componentWillMount == "function" && f.componentWillMount(),
          typeof f.UNSAFE_componentWillMount == "function" &&
            f.UNSAFE_componentWillMount(),
          p !== f.state && Eo.enqueueReplaceState(f, f.state, null),
          Yr(t, r, f, s),
          Qr(),
          (f.state = t.memoizedState)),
        typeof f.componentDidMount == "function" && (t.flags |= 4194308),
        (r = !0);
    } else if (e === null) {
      f = t.stateNode;
      var g = t.memoizedProps,
        C = ul(a, g);
      f.props = C;
      var Y = f.context,
        W = a.contextType;
      (p = ql), typeof W == "object" && W !== null && (p = Rt(W));
      var ae = a.getDerivedStateFromProps;
      (W =
        typeof ae == "function" ||
        typeof f.getSnapshotBeforeUpdate == "function"),
        (g = t.pendingProps !== g),
        W ||
          (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
            typeof f.componentWillReceiveProps != "function") ||
          ((g || Y !== p) && Vm(t, f, r, p)),
        (pa = !1);
      var K = t.memoizedState;
      (f.state = K),
        Yr(t, r, f, s),
        Qr(),
        (Y = t.memoizedState),
        g || K !== Y || pa
          ? (typeof ae == "function" &&
              (xo(t, a, ae, r), (Y = t.memoizedState)),
            (C = pa || Bm(t, a, C, r, K, Y, p))
              ? (W ||
                  (typeof f.UNSAFE_componentWillMount != "function" &&
                    typeof f.componentWillMount != "function") ||
                  (typeof f.componentWillMount == "function" &&
                    f.componentWillMount(),
                  typeof f.UNSAFE_componentWillMount == "function" &&
                    f.UNSAFE_componentWillMount()),
                typeof f.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof f.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = Y)),
            (f.props = r),
            (f.state = Y),
            (f.context = p),
            (r = C))
          : (typeof f.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1));
    } else {
      (f = t.stateNode),
        eo(e, t),
        (p = t.memoizedProps),
        (W = ul(a, p)),
        (f.props = W),
        (ae = t.pendingProps),
        (K = f.context),
        (Y = a.contextType),
        (C = ql),
        typeof Y == "object" && Y !== null && (C = Rt(Y)),
        (g = a.getDerivedStateFromProps),
        (Y =
          typeof g == "function" ||
          typeof f.getSnapshotBeforeUpdate == "function") ||
          (typeof f.UNSAFE_componentWillReceiveProps != "function" &&
            typeof f.componentWillReceiveProps != "function") ||
          ((p !== ae || K !== C) && Vm(t, f, r, C)),
        (pa = !1),
        (K = t.memoizedState),
        (f.state = K),
        Yr(t, r, f, s),
        Qr();
      var F = t.memoizedState;
      p !== ae ||
      K !== F ||
      pa ||
      (e !== null && e.dependencies !== null && Cu(e.dependencies))
        ? (typeof g == "function" && (xo(t, a, g, r), (F = t.memoizedState)),
          (W =
            pa ||
            Bm(t, a, W, r, K, F, C) ||
            (e !== null && e.dependencies !== null && Cu(e.dependencies)))
            ? (Y ||
                (typeof f.UNSAFE_componentWillUpdate != "function" &&
                  typeof f.componentWillUpdate != "function") ||
                (typeof f.componentWillUpdate == "function" &&
                  f.componentWillUpdate(r, F, C),
                typeof f.UNSAFE_componentWillUpdate == "function" &&
                  f.UNSAFE_componentWillUpdate(r, F, C)),
              typeof f.componentDidUpdate == "function" && (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof f.componentDidUpdate != "function" ||
                (p === e.memoizedProps && K === e.memoizedState) ||
                (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate != "function" ||
                (p === e.memoizedProps && K === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = F)),
          (f.props = r),
          (f.state = F),
          (f.context = C),
          (r = W))
        : (typeof f.componentDidUpdate != "function" ||
            (p === e.memoizedProps && K === e.memoizedState) ||
            (t.flags |= 4),
          typeof f.getSnapshotBeforeUpdate != "function" ||
            (p === e.memoizedProps && K === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (f = r),
      $u(e, t),
      (r = (t.flags & 128) !== 0),
      f || r
        ? ((f = t.stateNode),
          (a =
            r && typeof a.getDerivedStateFromError != "function"
              ? null
              : f.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = $l(t, e.child, null, s)),
              (t.child = $l(t, null, a, s)))
            : _t(e, t, a, s),
          (t.memoizedState = f.state),
          (e = t.child))
        : (e = $n(e, t, s)),
      e
    );
  }
  function ty(e, t, a, r) {
    return Ur(), (t.flags |= 256), _t(e, t, a, r), t.child;
  }
  var Ao = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Ro(e) {
    return { baseLanes: e, cachePool: Zh() };
  }
  function Oo(e, t, a) {
    return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= un), e;
  }
  function ny(e, t, a) {
    var r = t.pendingProps,
      s = !1,
      f = (t.flags & 128) !== 0,
      p;
    if (
      ((p = f) ||
        (p =
          e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0),
      p && ((s = !0), (t.flags &= -129)),
      (p = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (He) {
        if ((s ? _a(t) : Sa(), He)) {
          var g = tt,
            C;
          if ((C = g)) {
            e: {
              for (C = g, g = Tn; C.nodeType !== 8; ) {
                if (!g) {
                  g = null;
                  break e;
                }
                if (((C = dn(C.nextSibling)), C === null)) {
                  g = null;
                  break e;
                }
              }
              g = C;
            }
            g !== null
              ? ((t.memoizedState = {
                  dehydrated: g,
                  treeContext: Ia !== null ? { id: Zn, overflow: Qn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (C = Gt(18, null, null, 0)),
                (C.stateNode = g),
                (C.return = t),
                (t.child = C),
                (Nt = t),
                (tt = null),
                (C = !0))
              : (C = !1);
          }
          C || nl(t);
        }
        if (
          ((g = t.memoizedState),
          g !== null && ((g = g.dehydrated), g !== null))
        )
          return df(g) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        Kn(t);
      }
      return (
        (g = r.children),
        (r = r.fallback),
        s
          ? (Sa(),
            (s = t.mode),
            (g = Fu({ mode: "hidden", children: g }, s)),
            (r = Wa(r, s, a, null)),
            (g.return = t),
            (r.return = t),
            (g.sibling = r),
            (t.child = g),
            (s = t.child),
            (s.memoizedState = Ro(a)),
            (s.childLanes = Oo(e, p, a)),
            (t.memoizedState = Ao),
            r)
          : (_a(t), Co(t, g))
      );
    }
    if (
      ((C = e.memoizedState), C !== null && ((g = C.dehydrated), g !== null))
    ) {
      if (f)
        t.flags & 256
          ? (_a(t), (t.flags &= -257), (t = Mo(e, t, a)))
          : t.memoizedState !== null
          ? (Sa(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Sa(),
            (s = r.fallback),
            (g = t.mode),
            (r = Fu({ mode: "visible", children: r.children }, g)),
            (s = Wa(s, g, a, null)),
            (s.flags |= 2),
            (r.return = t),
            (s.return = t),
            (r.sibling = s),
            (t.child = r),
            $l(t, e.child, null, a),
            (r = t.child),
            (r.memoizedState = Ro(a)),
            (r.childLanes = Oo(e, p, a)),
            (t.memoizedState = Ao),
            (t = s));
      else if ((_a(t), df(g))) {
        if (((p = g.nextSibling && g.nextSibling.dataset), p)) var Y = p.dgst;
        (p = Y),
          (r = Error(u(419))),
          (r.stack = ""),
          (r.digest = p),
          kr({ value: r, source: null, stack: null }),
          (t = Mo(e, t, a));
      } else if (
        (yt || Lr(e, t, a, !1), (p = (a & e.childLanes) !== 0), yt || p)
      ) {
        if (
          ((p = Fe),
          p !== null &&
            ((r = a & -a),
            (r = (r & 42) !== 0 ? 1 : fc(r)),
            (r = (r & (p.suspendedLanes | a)) !== 0 ? 0 : r),
            r !== 0 && r !== C.retryLane))
        )
          throw ((C.retryLane = r), Ll(e, r), Jt(p, e, r), Km);
        g.data === "$?" || $o(), (t = Mo(e, t, a));
      } else
        g.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = C.treeContext),
            (tt = dn(g.nextSibling)),
            (Nt = t),
            (He = !0),
            (tl = null),
            (Tn = !1),
            e !== null &&
              ((an[ln++] = Zn),
              (an[ln++] = Qn),
              (an[ln++] = Ia),
              (Zn = e.id),
              (Qn = e.overflow),
              (Ia = t)),
            (t = Co(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (Sa(),
        (s = r.fallback),
        (g = t.mode),
        (C = e.child),
        (Y = C.sibling),
        (r = Hn(C, { mode: "hidden", children: r.children })),
        (r.subtreeFlags = C.subtreeFlags & 65011712),
        Y !== null ? (s = Hn(Y, s)) : ((s = Wa(s, g, a, null)), (s.flags |= 2)),
        (s.return = t),
        (r.return = t),
        (r.sibling = s),
        (t.child = r),
        (r = s),
        (s = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = Ro(a))
          : ((C = g.cachePool),
            C !== null
              ? ((Y = ot._currentValue),
                (C = C.parent !== Y ? { parent: Y, pool: Y } : C))
              : (C = Zh()),
            (g = { baseLanes: g.baseLanes | a, cachePool: C })),
        (s.memoizedState = g),
        (s.childLanes = Oo(e, p, a)),
        (t.memoizedState = Ao),
        r)
      : (_a(t),
        (a = e.child),
        (e = a.sibling),
        (a = Hn(a, { mode: "visible", children: r.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((p = t.deletions),
          p === null ? ((t.deletions = [e]), (t.flags |= 16)) : p.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Co(e, t) {
    return (
      (t = Fu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Fu(e, t) {
    return (
      (e = Gt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Mo(e, t, a) {
    return (
      $l(t, e.child, null, a),
      (e = Co(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function ay(e, t, a) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Kc(e.return, t, a);
  }
  function No(e, t, a, r, s) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: a,
          tailMode: s,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = r),
        (f.tail = a),
        (f.tailMode = s));
  }
  function ly(e, t, a) {
    var r = t.pendingProps,
      s = r.revealOrder,
      f = r.tail;
    if ((_t(e, t, r.children, a), (r = ft.current), (r & 2) !== 0))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && ay(e, a, t);
          else if (e.tag === 19) ay(e, a, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    switch ((ie(ft, r), s)) {
      case "forwards":
        for (a = t.child, s = null; a !== null; )
          (e = a.alternate),
            e !== null && Gu(e) === null && (s = a),
            (a = a.sibling);
        (a = s),
          a === null
            ? ((s = t.child), (t.child = null))
            : ((s = a.sibling), (a.sibling = null)),
          No(t, !1, s, a, f);
        break;
      case "backwards":
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Gu(e) === null)) {
            t.child = s;
            break;
          }
          (e = s.sibling), (s.sibling = a), (a = s), (s = e);
        }
        No(t, !0, a, null, f);
        break;
      case "together":
        No(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function $n(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Aa |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Lr(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, a = Hn(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (a = a.sibling = Hn(e, e.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function Do(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Cu(e)));
  }
  function L1(e, t, a) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo),
          ya(t, ot, e.memoizedState.cache),
          Ur();
        break;
      case 27:
      case 5:
        Ut(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        ya(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null
            ? (_a(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
            ? ny(e, t, a)
            : (_a(t), (e = $n(e, t, a)), e !== null ? e.sibling : null);
        _a(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((r = (a & t.childLanes) !== 0),
          r || (Lr(e, t, a, !1), (r = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (r) return ly(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null &&
            ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          ie(ft, ft.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Pm(e, t, a);
      case 24:
        ya(t, ot, e.memoizedState.cache);
    }
    return $n(e, t, a);
  }
  function ry(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) yt = !0;
      else {
        if (!Do(e, a) && (t.flags & 128) === 0) return (yt = !1), L1(e, t, a);
        yt = (e.flags & 131072) !== 0;
      }
    else (yt = !1), He && (t.flags & 1048576) !== 0 && Uh(t, Ou, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var r = t.elementType,
            s = r._init;
          if (((r = s(r._payload)), (t.type = r), typeof r == "function"))
            Vc(r)
              ? ((e = ul(r, e)), (t.tag = 1), (t = ey(null, t, r, e, a)))
              : ((t.tag = 0), (t = To(null, t, r, e, a)));
          else {
            if (r != null) {
              if (((s = r.$$typeof), s === S)) {
                (t.tag = 11), (t = $m(null, t, r, e, a));
                break e;
              } else if (s === q) {
                (t.tag = 14), (t = Fm(null, t, r, e, a));
                break e;
              }
            }
            throw ((t = re(r) || r), Error(u(306, t, "")));
          }
        }
        return t;
      case 0:
        return To(e, t, t.type, t.pendingProps, a);
      case 1:
        return (r = t.type), (s = ul(r, t.pendingProps)), ey(e, t, r, s, a);
      case 3:
        e: {
          if ((Me(t, t.stateNode.containerInfo), e === null))
            throw Error(u(387));
          r = t.pendingProps;
          var f = t.memoizedState;
          (s = f.element), eo(e, t), Yr(t, r, null, a);
          var p = t.memoizedState;
          if (
            ((r = p.cache),
            ya(t, ot, r),
            r !== f.cache && $c(t, [ot], a, !0),
            Qr(),
            (r = p.element),
            f.isDehydrated)
          )
            if (
              ((f = { element: r, isDehydrated: !1, cache: p.cache }),
              (t.updateQueue.baseState = f),
              (t.memoizedState = f),
              t.flags & 256)
            ) {
              t = ty(e, t, r, a);
              break e;
            } else if (r !== s) {
              (s = tn(Error(u(424)), t)), kr(s), (t = ty(e, t, r, a));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                tt = dn(e.firstChild),
                  Nt = t,
                  He = !0,
                  tl = null,
                  Tn = !0,
                  a = Lm(t, null, r, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((Ur(), r === s)) {
              t = $n(e, t, a);
              break e;
            }
            _t(e, t, r, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          $u(e, t),
          e === null
            ? (a = cp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : He ||
                ((a = t.type),
                (e = t.pendingProps),
                (r = cs(de.current).createElement(a)),
                (r[At] = t),
                (r[kt] = e),
                xt(r, a, e),
                mt(r),
                (t.stateNode = r))
            : (t.memoizedState = cp(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ut(t),
          e === null &&
            He &&
            ((r = t.stateNode = ip(t.type, t.pendingProps, de.current)),
            (Nt = t),
            (Tn = !0),
            (s = tt),
            Ma(t.type) ? ((hf = s), (tt = dn(r.firstChild))) : (tt = s)),
          _t(e, t, t.pendingProps.children, a),
          $u(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            He &&
            ((s = r = tt) &&
              ((r = fb(r, t.type, t.pendingProps, Tn)),
              r !== null
                ? ((t.stateNode = r),
                  (Nt = t),
                  (tt = dn(r.firstChild)),
                  (Tn = !1),
                  (s = !0))
                : (s = !1)),
            s || nl(t)),
          Ut(t),
          (s = t.type),
          (f = t.pendingProps),
          (p = e !== null ? e.memoizedProps : null),
          (r = f.children),
          cf(s, f) ? (r = null) : p !== null && cf(s, p) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((s = io(e, t, C1, null, null, a)), (di._currentValue = s)),
          $u(e, t),
          _t(e, t, r, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            He &&
            ((e = a = tt) &&
              ((a = db(a, t.pendingProps, Tn)),
              a !== null
                ? ((t.stateNode = a), (Nt = t), (tt = null), (e = !0))
                : (e = !1)),
            e || nl(t)),
          null
        );
      case 13:
        return ny(e, t, a);
      case 4:
        return (
          Me(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = $l(t, null, r, a)) : _t(e, t, r, a),
          t.child
        );
      case 11:
        return $m(e, t, t.type, t.pendingProps, a);
      case 7:
        return _t(e, t, t.pendingProps, a), t.child;
      case 8:
        return _t(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return _t(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (r = t.pendingProps),
          ya(t, t.type, r.value),
          _t(e, t, r.children, a),
          t.child
        );
      case 9:
        return (
          (s = t.type._context),
          (r = t.pendingProps.children),
          ll(t),
          (s = Rt(s)),
          (r = r(s)),
          (t.flags |= 1),
          _t(e, t, r, a),
          t.child
        );
      case 14:
        return Fm(e, t, t.type, t.pendingProps, a);
      case 15:
        return Jm(e, t, t.type, t.pendingProps, a);
      case 19:
        return ly(e, t, a);
      case 31:
        return (
          (r = t.pendingProps),
          (a = t.mode),
          (r = { mode: r.mode, children: r.children }),
          e === null
            ? ((a = Fu(r, a)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a))
            : ((a = Hn(e.child, r)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a)),
          t
        );
      case 22:
        return Pm(e, t, a);
      case 24:
        return (
          ll(t),
          (r = Rt(ot)),
          e === null
            ? ((s = Pc()),
              s === null &&
                ((s = Fe),
                (f = Fc()),
                (s.pooledCache = f),
                f.refCount++,
                f !== null && (s.pooledCacheLanes |= a),
                (s = f)),
              (t.memoizedState = { parent: r, cache: s }),
              Ic(t),
              ya(t, ot, s))
            : ((e.lanes & a) !== 0 && (eo(e, t), Yr(t, null, null, a), Qr()),
              (s = e.memoizedState),
              (f = t.memoizedState),
              s.parent !== r
                ? ((s = { parent: r, cache: r }),
                  (t.memoizedState = s),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = s),
                  ya(t, ot, r))
                : ((r = f.cache),
                  ya(t, ot, r),
                  r !== s.cache && $c(t, [ot], a, !0))),
          _t(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Fn(e) {
    e.flags |= 4;
  }
  function iy(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !mp(t))) {
      if (
        ((t = rn.current),
        t !== null &&
          ((qe & 4194048) === qe
            ? An !== null
            : ((qe & 62914560) !== qe && (qe & 536870912) === 0) || t !== An))
      )
        throw ((Hr = Wc), Qh);
      e.flags |= 8192;
    }
  }
  function Ju(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? qd() : 536870912), (e.lanes |= t), (Wl |= t));
  }
  function Pr(e, t) {
    if (!He)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var r = null; a !== null; )
            a.alternate !== null && (r = a), (a = a.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      r = 0;
    if (t)
      for (var s = e.child; s !== null; )
        (a |= s.lanes | s.childLanes),
          (r |= s.subtreeFlags & 65011712),
          (r |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling);
    else
      for (s = e.child; s !== null; )
        (a |= s.lanes | s.childLanes),
          (r |= s.subtreeFlags),
          (r |= s.flags),
          (s.return = e),
          (s = s.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = a), t;
  }
  function q1(e, t, a) {
    var r = t.pendingProps;
    switch ((Yc(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return We(t), null;
      case 1:
        return We(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          t.memoizedState.cache !== r && (t.flags |= 2048),
          Gn(ot),
          bt(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (zr(t)
              ? Fn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), qh())),
          We(t),
          null
        );
      case 26:
        return (
          (a = t.memoizedState),
          e === null
            ? (Fn(t),
              a !== null ? (We(t), iy(t, a)) : (We(t), (t.flags &= -16777217)))
            : a
            ? a !== e.memoizedState
              ? (Fn(t), We(t), iy(t, a))
              : (We(t), (t.flags &= -16777217))
            : (e.memoizedProps !== r && Fn(t), We(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        Zt(t), (a = de.current);
        var s = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== r && Fn(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(u(166));
            return We(t), null;
          }
          (e = oe.current),
            zr(t) ? kh(t) : ((e = ip(s, r, a)), (t.stateNode = e), Fn(t));
        }
        return We(t), null;
      case 5:
        if ((Zt(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && Fn(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(u(166));
            return We(t), null;
          }
          if (((e = oe.current), zr(t))) kh(t);
          else {
            switch (((s = cs(de.current)), e)) {
              case 1:
                e = s.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                e = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    e = s.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    e = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    (e = s.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof r.is == "string"
                        ? s.createElement("select", { is: r.is })
                        : s.createElement("select")),
                      r.multiple
                        ? (e.multiple = !0)
                        : r.size && (e.size = r.size);
                    break;
                  default:
                    e =
                      typeof r.is == "string"
                        ? s.createElement(a, { is: r.is })
                        : s.createElement(a);
                }
            }
            (e[At] = t), (e[kt] = r);
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6) e.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                (s.child.return = s), (s = s.child);
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t) break e;
                s = s.return;
              }
              (s.sibling.return = s.return), (s = s.sibling);
            }
            t.stateNode = e;
            e: switch ((xt(e, a, r), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!r.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Fn(t);
          }
        }
        return We(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && Fn(t);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(u(166));
          if (((e = de.current), zr(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (r = null),
              (s = Nt),
              s !== null)
            )
              switch (s.tag) {
                case 27:
                case 5:
                  r = s.memoizedProps;
              }
            (e[At] = t),
              (e = !!(
                e.nodeValue === a ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                Iy(e.nodeValue, a)
              )),
              e || nl(t);
          } else (e = cs(e).createTextNode(r)), (e[At] = t), (t.stateNode = e);
        }
        return We(t), null;
      case 13:
        if (
          ((r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = zr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(u(318));
              if (
                ((s = t.memoizedState),
                (s = s !== null ? s.dehydrated : null),
                !s)
              )
                throw Error(u(317));
              s[At] = t;
            } else
              Ur(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            We(t), (s = !1);
          } else
            (s = qh()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = s),
              (s = !0);
          if (!s) return t.flags & 256 ? (Kn(t), t) : (Kn(t), null);
        }
        if ((Kn(t), (t.flags & 128) !== 0)) return (t.lanes = a), t;
        if (
          ((a = r !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          (r = t.child),
            (s = null),
            r.alternate !== null &&
              r.alternate.memoizedState !== null &&
              r.alternate.memoizedState.cachePool !== null &&
              (s = r.alternate.memoizedState.cachePool.pool);
          var f = null;
          r.memoizedState !== null &&
            r.memoizedState.cachePool !== null &&
            (f = r.memoizedState.cachePool.pool),
            f !== s && (r.flags |= 2048);
        }
        return (
          a !== e && a && (t.child.flags |= 8192),
          Ju(t, t.updateQueue),
          We(t),
          null
        );
      case 4:
        return bt(), e === null && af(t.stateNode.containerInfo), We(t), null;
      case 10:
        return Gn(t.type), We(t), null;
      case 19:
        if ((ne(ft), (s = t.memoizedState), s === null)) return We(t), null;
        if (((r = (t.flags & 128) !== 0), (f = s.rendering), f === null))
          if (r) Pr(s, !1);
          else {
            if (nt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((f = Gu(e)), f !== null)) {
                  for (
                    t.flags |= 128,
                      Pr(s, !1),
                      e = f.updateQueue,
                      t.updateQueue = e,
                      Ju(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;

                  )
                    zh(a, e), (a = a.sibling);
                  return ie(ft, (ft.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            s.tail !== null &&
              Qt() > Iu &&
              ((t.flags |= 128), (r = !0), Pr(s, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = Gu(f)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ju(t, e),
                Pr(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !f.alternate &&
                  !He)
              )
                return We(t), null;
            } else
              2 * Qt() - s.renderingStartTime > Iu &&
                a !== 536870912 &&
                ((t.flags |= 128), (r = !0), Pr(s, !1), (t.lanes = 4194304));
          s.isBackwards
            ? ((f.sibling = t.child), (t.child = f))
            : ((e = s.last),
              e !== null ? (e.sibling = f) : (t.child = f),
              (s.last = f));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Qt()),
            (t.sibling = null),
            (e = ft.current),
            ie(ft, r ? (e & 1) | 2 : e & 1),
            t)
          : (We(t), null);
      case 22:
      case 23:
        return (
          Kn(t),
          lo(),
          (r = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== r && (t.flags |= 8192)
            : r && (t.flags |= 8192),
          r
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (We(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : We(t),
          (a = t.updateQueue),
          a !== null && Ju(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (r = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (r = t.memoizedState.cachePool.pool),
          r !== a && (t.flags |= 2048),
          e !== null && ne(rl),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Gn(ot),
          We(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function B1(e, t) {
    switch ((Yc(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Gn(ot),
          bt(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Zt(t), null;
      case 13:
        if (
          (Kn(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          Ur();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return ne(ft), null;
      case 4:
        return bt(), null;
      case 10:
        return Gn(t.type), null;
      case 22:
      case 23:
        return (
          Kn(t),
          lo(),
          e !== null && ne(rl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return Gn(ot), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function uy(e, t) {
    switch ((Yc(t), t.tag)) {
      case 3:
        Gn(ot), bt();
        break;
      case 26:
      case 27:
      case 5:
        Zt(t);
        break;
      case 4:
        bt();
        break;
      case 13:
        Kn(t);
        break;
      case 19:
        ne(ft);
        break;
      case 10:
        Gn(t.type);
        break;
      case 22:
      case 23:
        Kn(t), lo(), e !== null && ne(rl);
        break;
      case 24:
        Gn(ot);
    }
  }
  function Wr(e, t) {
    try {
      var a = t.updateQueue,
        r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            r = void 0;
            var f = a.create,
              p = a.inst;
            (r = f()), (p.destroy = r);
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (g) {
      $e(t, t.return, g);
    }
  }
  function xa(e, t, a) {
    try {
      var r = t.updateQueue,
        s = r !== null ? r.lastEffect : null;
      if (s !== null) {
        var f = s.next;
        r = f;
        do {
          if ((r.tag & e) === e) {
            var p = r.inst,
              g = p.destroy;
            if (g !== void 0) {
              (p.destroy = void 0), (s = t);
              var C = a,
                Y = g;
              try {
                Y();
              } catch (W) {
                $e(s, C, W);
              }
            }
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (W) {
      $e(t, t.return, W);
    }
  }
  function sy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Fh(t, a);
      } catch (r) {
        $e(e, e.return, r);
      }
    }
  }
  function cy(e, t, a) {
    (a.props = ul(e.type, e.memoizedProps)), (a.state = e.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (r) {
      $e(e, t, r);
    }
  }
  function Ir(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof a == "function" ? (e.refCleanup = a(r)) : (a.current = r);
      }
    } catch (s) {
      $e(e, t, s);
    }
  }
  function Rn(e, t) {
    var a = e.ref,
      r = e.refCleanup;
    if (a !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (s) {
          $e(e, t, s);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (s) {
          $e(e, t, s);
        }
      else a.current = null;
  }
  function oy(e) {
    var t = e.type,
      a = e.memoizedProps,
      r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && r.focus();
          break e;
        case "img":
          a.src ? (r.src = a.src) : a.srcSet && (r.srcset = a.srcSet);
      }
    } catch (s) {
      $e(e, e.return, s);
    }
  }
  function jo(e, t, a) {
    try {
      var r = e.stateNode;
      ib(r, e.type, a, t), (r[kt] = t);
    } catch (s) {
      $e(e, e.return, s);
    }
  }
  function fy(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ma(e.type)) ||
      e.tag === 4
    );
  }
  function zo(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || fy(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Ma(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Uo(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(e, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = ss));
    else if (
      r !== 4 &&
      (r === 27 && Ma(e.type) && ((a = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Uo(e, t, a), e = e.sibling; e !== null; )
        Uo(e, t, a), (e = e.sibling);
  }
  function Pu(e, t, a) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (
      r !== 4 &&
      (r === 27 && Ma(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (Pu(e, t, a), e = e.sibling; e !== null; )
        Pu(e, t, a), (e = e.sibling);
  }
  function dy(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var r = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      xt(t, r, a), (t[At] = e), (t[kt] = a);
    } catch (f) {
      $e(e, e.return, f);
    }
  }
  var Jn = !1,
    rt = !1,
    ko = !1,
    hy = typeof WeakSet == "function" ? WeakSet : Set,
    pt = null;
  function V1(e, t) {
    if (((e = e.containerInfo), (uf = ys), (e = wh(e)), jc(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var r = a.getSelection && a.getSelection();
          if (r && r.rangeCount !== 0) {
            a = r.anchorNode;
            var s = r.anchorOffset,
              f = r.focusNode;
            r = r.focusOffset;
            try {
              a.nodeType, f.nodeType;
            } catch {
              a = null;
              break e;
            }
            var p = 0,
              g = -1,
              C = -1,
              Y = 0,
              W = 0,
              ae = e,
              K = null;
            t: for (;;) {
              for (
                var F;
                ae !== a || (s !== 0 && ae.nodeType !== 3) || (g = p + s),
                  ae !== f || (r !== 0 && ae.nodeType !== 3) || (C = p + r),
                  ae.nodeType === 3 && (p += ae.nodeValue.length),
                  (F = ae.firstChild) !== null;

              )
                (K = ae), (ae = F);
              for (;;) {
                if (ae === e) break t;
                if (
                  (K === a && ++Y === s && (g = p),
                  K === f && ++W === r && (C = p),
                  (F = ae.nextSibling) !== null)
                )
                  break;
                (ae = K), (K = ae.parentNode);
              }
              ae = F;
            }
            a = g === -1 || C === -1 ? null : { start: g, end: C };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      sf = { focusedElem: e, selectionRange: a }, ys = !1, pt = t;
      pt !== null;

    )
      if (
        ((t = pt), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (pt = e);
      else
        for (; pt !== null; ) {
          switch (((t = pt), (f = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                (e = void 0),
                  (a = t),
                  (s = f.memoizedProps),
                  (f = f.memoizedState),
                  (r = a.stateNode);
                try {
                  var Ae = ul(a.type, s, a.elementType === a.type);
                  (e = r.getSnapshotBeforeUpdate(Ae, f)),
                    (r.__reactInternalSnapshotBeforeUpdate = e);
                } catch (Ee) {
                  $e(a, a.return, Ee);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  ff(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ff(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (pt = e);
            break;
          }
          pt = t.return;
        }
  }
  function my(e, t, a) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Ea(e, a), r & 4 && Wr(5, a);
        break;
      case 1:
        if ((Ea(e, a), r & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (p) {
              $e(a, a.return, p);
            }
          else {
            var s = ul(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (p) {
              $e(a, a.return, p);
            }
          }
        r & 64 && sy(a), r & 512 && Ir(a, a.return);
        break;
      case 3:
        if ((Ea(e, a), r & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Fh(e, t);
          } catch (p) {
            $e(a, a.return, p);
          }
        }
        break;
      case 27:
        t === null && r & 4 && dy(a);
      case 26:
      case 5:
        Ea(e, a), t === null && r & 4 && oy(a), r & 512 && Ir(a, a.return);
        break;
      case 12:
        Ea(e, a);
        break;
      case 13:
        Ea(e, a),
          r & 4 && vy(e, a),
          r & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = F1.bind(null, a)), hb(e, a))));
        break;
      case 22:
        if (((r = a.memoizedState !== null || Jn), !r)) {
          (t = (t !== null && t.memoizedState !== null) || rt), (s = Jn);
          var f = rt;
          (Jn = r),
            (rt = t) && !f ? wa(e, a, (a.subtreeFlags & 8772) !== 0) : Ea(e, a),
            (Jn = s),
            (rt = f);
        }
        break;
      case 30:
        break;
      default:
        Ea(e, a);
    }
  }
  function yy(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), yy(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && mc(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Je = null,
    Bt = !1;
  function Pn(e, t, a) {
    for (a = a.child; a !== null; ) py(e, t, a), (a = a.sibling);
  }
  function py(e, t, a) {
    if (ue && typeof ue.onCommitFiberUnmount == "function")
      try {
        ue.onCommitFiberUnmount(fe, a);
      } catch {}
    switch (a.tag) {
      case 26:
        rt || Rn(a, t),
          Pn(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        rt || Rn(a, t);
        var r = Je,
          s = Bt;
        Ma(a.type) && ((Je = a.stateNode), (Bt = !1)),
          Pn(e, t, a),
          si(a.stateNode),
          (Je = r),
          (Bt = s);
        break;
      case 5:
        rt || Rn(a, t);
      case 6:
        if (
          ((r = Je),
          (s = Bt),
          (Je = null),
          Pn(e, t, a),
          (Je = r),
          (Bt = s),
          Je !== null)
        )
          if (Bt)
            try {
              (Je.nodeType === 9
                ? Je.body
                : Je.nodeName === "HTML"
                ? Je.ownerDocument.body
                : Je
              ).removeChild(a.stateNode);
            } catch (f) {
              $e(a, t, f);
            }
          else
            try {
              Je.removeChild(a.stateNode);
            } catch (f) {
              $e(a, t, f);
            }
        break;
      case 18:
        Je !== null &&
          (Bt
            ? ((e = Je),
              lp(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                a.stateNode
              ),
              pi(e))
            : lp(Je, a.stateNode));
        break;
      case 4:
        (r = Je),
          (s = Bt),
          (Je = a.stateNode.containerInfo),
          (Bt = !0),
          Pn(e, t, a),
          (Je = r),
          (Bt = s);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        rt || xa(2, a, t), rt || xa(4, a, t), Pn(e, t, a);
        break;
      case 1:
        rt ||
          (Rn(a, t),
          (r = a.stateNode),
          typeof r.componentWillUnmount == "function" && cy(a, t, r)),
          Pn(e, t, a);
        break;
      case 21:
        Pn(e, t, a);
        break;
      case 22:
        (rt = (r = rt) || a.memoizedState !== null), Pn(e, t, a), (rt = r);
        break;
      default:
        Pn(e, t, a);
    }
  }
  function vy(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        pi(e);
      } catch (a) {
        $e(t, t.return, a);
      }
  }
  function H1(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new hy()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new hy()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Lo(e, t) {
    var a = H1(e);
    t.forEach(function (r) {
      var s = J1.bind(null, e, r);
      a.has(r) || (a.add(r), r.then(s, s));
    });
  }
  function Xt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var s = a[r],
          f = e,
          p = t,
          g = p;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (Ma(g.type)) {
                (Je = g.stateNode), (Bt = !1);
                break e;
              }
              break;
            case 5:
              (Je = g.stateNode), (Bt = !1);
              break e;
            case 3:
            case 4:
              (Je = g.stateNode.containerInfo), (Bt = !0);
              break e;
          }
          g = g.return;
        }
        if (Je === null) throw Error(u(160));
        py(f, p, s),
          (Je = null),
          (Bt = !1),
          (f = s.alternate),
          f !== null && (f.return = null),
          (s.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) gy(t, e), (t = t.sibling);
  }
  var fn = null;
  function gy(e, t) {
    var a = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xt(t, e),
          Kt(e),
          r & 4 && (xa(3, e, e.return), Wr(3, e), xa(5, e, e.return));
        break;
      case 1:
        Xt(t, e),
          Kt(e),
          r & 512 && (rt || a === null || Rn(a, a.return)),
          r & 64 &&
            Jn &&
            ((e = e.updateQueue),
            e !== null &&
              ((r = e.callbacks),
              r !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? r : a.concat(r)))));
        break;
      case 26:
        var s = fn;
        if (
          (Xt(t, e),
          Kt(e),
          r & 512 && (rt || a === null || Rn(a, a.return)),
          r & 4)
        ) {
          var f = a !== null ? a.memoizedState : null;
          if (((r = e.memoizedState), a === null))
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  (r = e.type),
                    (a = e.memoizedProps),
                    (s = s.ownerDocument || s);
                  t: switch (r) {
                    case "title":
                      (f = s.getElementsByTagName("title")[0]),
                        (!f ||
                          f[Er] ||
                          f[At] ||
                          f.namespaceURI === "http://www.w3.org/2000/svg" ||
                          f.hasAttribute("itemprop")) &&
                          ((f = s.createElement(r)),
                          s.head.insertBefore(
                            f,
                            s.querySelector("head > title")
                          )),
                        xt(f, r, a),
                        (f[At] = e),
                        mt(f),
                        (r = f);
                      break e;
                    case "link":
                      var p = dp("link", "href", s).get(r + (a.href || ""));
                      if (p) {
                        for (var g = 0; g < p.length; g++)
                          if (
                            ((f = p[g]),
                            f.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              f.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              f.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              f.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            p.splice(g, 1);
                            break t;
                          }
                      }
                      (f = s.createElement(r)),
                        xt(f, r, a),
                        s.head.appendChild(f);
                      break;
                    case "meta":
                      if (
                        (p = dp("meta", "content", s).get(
                          r + (a.content || "")
                        ))
                      ) {
                        for (g = 0; g < p.length; g++)
                          if (
                            ((f = p[g]),
                            f.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              f.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              f.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              f.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              f.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            p.splice(g, 1);
                            break t;
                          }
                      }
                      (f = s.createElement(r)),
                        xt(f, r, a),
                        s.head.appendChild(f);
                      break;
                    default:
                      throw Error(u(468, r));
                  }
                  (f[At] = e), mt(f), (r = f);
                }
                e.stateNode = r;
              } else hp(s, e.type, e.stateNode);
            else e.stateNode = fp(s, r, e.memoizedProps);
          else
            f !== r
              ? (f === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : f.count--,
                r === null
                  ? hp(s, e.type, e.stateNode)
                  : fp(s, r, e.memoizedProps))
              : r === null &&
                e.stateNode !== null &&
                jo(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Xt(t, e),
          Kt(e),
          r & 512 && (rt || a === null || Rn(a, a.return)),
          a !== null && r & 4 && jo(e, e.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (Xt(t, e),
          Kt(e),
          r & 512 && (rt || a === null || Rn(a, a.return)),
          e.flags & 32)
        ) {
          s = e.stateNode;
          try {
            Ml(s, "");
          } catch (F) {
            $e(e, e.return, F);
          }
        }
        r & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), jo(e, s, a !== null ? a.memoizedProps : s)),
          r & 1024 && (ko = !0);
        break;
      case 6:
        if ((Xt(t, e), Kt(e), r & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          (r = e.memoizedProps), (a = e.stateNode);
          try {
            a.nodeValue = r;
          } catch (F) {
            $e(e, e.return, F);
          }
        }
        break;
      case 3:
        if (
          ((ds = null),
          (s = fn),
          (fn = os(t.containerInfo)),
          Xt(t, e),
          (fn = s),
          Kt(e),
          r & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            pi(t.containerInfo);
          } catch (F) {
            $e(e, e.return, F);
          }
        ko && ((ko = !1), by(e));
        break;
      case 4:
        (r = fn),
          (fn = os(e.stateNode.containerInfo)),
          Xt(t, e),
          Kt(e),
          (fn = r);
        break;
      case 12:
        Xt(t, e), Kt(e);
        break;
      case 13:
        Xt(t, e),
          Kt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Qo = Qt()),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), Lo(e, r)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var C = a !== null && a.memoizedState !== null,
          Y = Jn,
          W = rt;
        if (
          ((Jn = Y || s),
          (rt = W || C),
          Xt(t, e),
          (rt = W),
          (Jn = Y),
          Kt(e),
          r & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || C || Jn || rt || sl(e)),
              a = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                C = a = t;
                try {
                  if (((f = C.stateNode), s))
                    (p = f.style),
                      typeof p.setProperty == "function"
                        ? p.setProperty("display", "none", "important")
                        : (p.display = "none");
                  else {
                    g = C.stateNode;
                    var ae = C.memoizedProps.style,
                      K =
                        ae != null && ae.hasOwnProperty("display")
                          ? ae.display
                          : null;
                    g.style.display =
                      K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (F) {
                  $e(C, C.return, F);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                C = t;
                try {
                  C.stateNode.nodeValue = s ? "" : C.memoizedProps;
                } catch (F) {
                  $e(C, C.return, F);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        r & 4 &&
          ((r = e.updateQueue),
          r !== null &&
            ((a = r.retryQueue),
            a !== null && ((r.retryQueue = null), Lo(e, a))));
        break;
      case 19:
        Xt(t, e),
          Kt(e),
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((e.updateQueue = null), Lo(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Xt(t, e), Kt(e);
    }
  }
  function Kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, r = e.return; r !== null; ) {
          if (fy(r)) {
            a = r;
            break;
          }
          r = r.return;
        }
        if (a == null) throw Error(u(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              f = zo(e);
            Pu(e, f, s);
            break;
          case 5:
            var p = a.stateNode;
            a.flags & 32 && (Ml(p, ""), (a.flags &= -33));
            var g = zo(e);
            Pu(e, g, p);
            break;
          case 3:
          case 4:
            var C = a.stateNode.containerInfo,
              Y = zo(e);
            Uo(e, Y, C);
            break;
          default:
            throw Error(u(161));
        }
      } catch (W) {
        $e(e, e.return, W);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function by(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        by(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function Ea(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) my(e, t.alternate, t), (t = t.sibling);
  }
  function sl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xa(4, t, t.return), sl(t);
          break;
        case 1:
          Rn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && cy(t, t.return, a),
            sl(t);
          break;
        case 27:
          si(t.stateNode);
        case 26:
        case 5:
          Rn(t, t.return), sl(t);
          break;
        case 22:
          t.memoizedState === null && sl(t);
          break;
        case 30:
          sl(t);
          break;
        default:
          sl(t);
      }
      e = e.sibling;
    }
  }
  function wa(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate,
        s = e,
        f = t,
        p = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          wa(s, f, a), Wr(4, f);
          break;
        case 1:
          if (
            (wa(s, f, a),
            (r = f),
            (s = r.stateNode),
            typeof s.componentDidMount == "function")
          )
            try {
              s.componentDidMount();
            } catch (Y) {
              $e(r, r.return, Y);
            }
          if (((r = f), (s = r.updateQueue), s !== null)) {
            var g = r.stateNode;
            try {
              var C = s.shared.hiddenCallbacks;
              if (C !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < C.length; s++)
                  $h(C[s], g);
            } catch (Y) {
              $e(r, r.return, Y);
            }
          }
          a && p & 64 && sy(f), Ir(f, f.return);
          break;
        case 27:
          dy(f);
        case 26:
        case 5:
          wa(s, f, a), a && r === null && p & 4 && oy(f), Ir(f, f.return);
          break;
        case 12:
          wa(s, f, a);
          break;
        case 13:
          wa(s, f, a), a && p & 4 && vy(s, f);
          break;
        case 22:
          f.memoizedState === null && wa(s, f, a), Ir(f, f.return);
          break;
        case 30:
          break;
        default:
          wa(s, f, a);
      }
      t = t.sibling;
    }
  }
  function qo(e, t) {
    var a = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && qr(a));
  }
  function Bo(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && qr(e));
  }
  function On(e, t, a, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) _y(e, t, a, r), (t = t.sibling);
  }
  function _y(e, t, a, r) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        On(e, t, a, r), s & 2048 && Wr(9, t);
        break;
      case 1:
        On(e, t, a, r);
        break;
      case 3:
        On(e, t, a, r),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && qr(e)));
        break;
      case 12:
        if (s & 2048) {
          On(e, t, a, r), (e = t.stateNode);
          try {
            var f = t.memoizedProps,
              p = f.id,
              g = f.onPostCommit;
            typeof g == "function" &&
              g(
                p,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (C) {
            $e(t, t.return, C);
          }
        } else On(e, t, a, r);
        break;
      case 13:
        On(e, t, a, r);
        break;
      case 23:
        break;
      case 22:
        (f = t.stateNode),
          (p = t.alternate),
          t.memoizedState !== null
            ? f._visibility & 2
              ? On(e, t, a, r)
              : ei(e, t)
            : f._visibility & 2
            ? On(e, t, a, r)
            : ((f._visibility |= 2),
              Fl(e, t, a, r, (t.subtreeFlags & 10256) !== 0)),
          s & 2048 && qo(p, t);
        break;
      case 24:
        On(e, t, a, r), s & 2048 && Bo(t.alternate, t);
        break;
      default:
        On(e, t, a, r);
    }
  }
  function Fl(e, t, a, r, s) {
    for (s = s && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var f = e,
        p = t,
        g = a,
        C = r,
        Y = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Fl(f, p, g, C, s), Wr(8, p);
          break;
        case 23:
          break;
        case 22:
          var W = p.stateNode;
          p.memoizedState !== null
            ? W._visibility & 2
              ? Fl(f, p, g, C, s)
              : ei(f, p)
            : ((W._visibility |= 2), Fl(f, p, g, C, s)),
            s && Y & 2048 && qo(p.alternate, p);
          break;
        case 24:
          Fl(f, p, g, C, s), s && Y & 2048 && Bo(p.alternate, p);
          break;
        default:
          Fl(f, p, g, C, s);
      }
      t = t.sibling;
    }
  }
  function ei(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          r = t,
          s = r.flags;
        switch (r.tag) {
          case 22:
            ei(a, r), s & 2048 && qo(r.alternate, r);
            break;
          case 24:
            ei(a, r), s & 2048 && Bo(r.alternate, r);
            break;
          default:
            ei(a, r);
        }
        t = t.sibling;
      }
  }
  var ti = 8192;
  function Jl(e) {
    if (e.subtreeFlags & ti)
      for (e = e.child; e !== null; ) Sy(e), (e = e.sibling);
  }
  function Sy(e) {
    switch (e.tag) {
      case 26:
        Jl(e),
          e.flags & ti &&
            e.memoizedState !== null &&
            Ab(fn, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Jl(e);
        break;
      case 3:
      case 4:
        var t = fn;
        (fn = os(e.stateNode.containerInfo)), Jl(e), (fn = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = ti), (ti = 16777216), Jl(e), (ti = t))
            : Jl(e));
        break;
      default:
        Jl(e);
    }
  }
  function xy(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function ni(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (pt = r), wy(r, e);
        }
      xy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Ey(e), (e = e.sibling);
  }
  function Ey(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ni(e), e.flags & 2048 && xa(9, e, e.return);
        break;
      case 3:
        ni(e);
        break;
      case 12:
        ni(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Wu(e))
          : ni(e);
        break;
      default:
        ni(e);
    }
  }
  function Wu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var r = t[a];
          (pt = r), wy(r, e);
        }
      xy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          xa(8, t, t.return), Wu(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), Wu(t));
          break;
        default:
          Wu(t);
      }
      e = e.sibling;
    }
  }
  function wy(e, t) {
    for (; pt !== null; ) {
      var a = pt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          xa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var r = a.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          qr(a.memoizedState.cache);
      }
      if (((r = a.child), r !== null)) (r.return = a), (pt = r);
      else
        e: for (a = e; pt !== null; ) {
          r = pt;
          var s = r.sibling,
            f = r.return;
          if ((yy(r), r === a)) {
            pt = null;
            break e;
          }
          if (s !== null) {
            (s.return = f), (pt = s);
            break e;
          }
          pt = f;
        }
    }
  }
  var Z1 = {
      getCacheForType: function (e) {
        var t = Rt(ot),
          a = t.data.get(e);
        return a === void 0 && ((a = e()), t.data.set(e, a)), a;
      },
    },
    Q1 = typeof WeakMap == "function" ? WeakMap : Map,
    Ze = 0,
    Fe = null,
    ke = null,
    qe = 0,
    Qe = 0,
    $t = null,
    Ta = !1,
    Pl = !1,
    Vo = !1,
    Wn = 0,
    nt = 0,
    Aa = 0,
    cl = 0,
    Ho = 0,
    un = 0,
    Wl = 0,
    ai = null,
    Vt = null,
    Zo = !1,
    Qo = 0,
    Iu = 1 / 0,
    es = null,
    Ra = null,
    St = 0,
    Oa = null,
    Il = null,
    er = 0,
    Yo = 0,
    Go = null,
    Ty = null,
    li = 0,
    Xo = null;
  function Ft() {
    if ((Ze & 2) !== 0 && qe !== 0) return qe & -qe;
    if (D.T !== null) {
      var e = Hl;
      return e !== 0 ? e : Io();
    }
    return Hd();
  }
  function Ay() {
    un === 0 && (un = (qe & 536870912) === 0 || He ? Ld() : 536870912);
    var e = rn.current;
    return e !== null && (e.flags |= 32), un;
  }
  function Jt(e, t, a) {
    ((e === Fe && (Qe === 2 || Qe === 9)) || e.cancelPendingCommit !== null) &&
      (tr(e, 0), Ca(e, qe, un, !1)),
      xr(e, a),
      ((Ze & 2) === 0 || e !== Fe) &&
        (e === Fe &&
          ((Ze & 2) === 0 && (cl |= a), nt === 4 && Ca(e, qe, un, !1)),
        Cn(e));
  }
  function Ry(e, t, a) {
    if ((Ze & 6) !== 0) throw Error(u(327));
    var r = (!a && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Ka(e, t),
      s = r ? X1(e, t) : Fo(e, t, !0),
      f = r;
    do {
      if (s === 0) {
        Pl && !r && Ca(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), f && !Y1(a))) {
          (s = Fo(e, t, !1)), (f = !1);
          continue;
        }
        if (s === 2) {
          if (((f = t), e.errorRecoveryDisabledLanes & f)) var p = 0;
          else
            (p = e.pendingLanes & -536870913),
              (p = p !== 0 ? p : p & 536870912 ? 536870912 : 0);
          if (p !== 0) {
            t = p;
            e: {
              var g = e;
              s = ai;
              var C = g.current.memoizedState.isDehydrated;
              if ((C && (tr(g, p).flags |= 256), (p = Fo(g, p, !1)), p !== 2)) {
                if (Vo && !C) {
                  (g.errorRecoveryDisabledLanes |= f), (cl |= f), (s = 4);
                  break e;
                }
                (f = Vt),
                  (Vt = s),
                  f !== null && (Vt === null ? (Vt = f) : Vt.push.apply(Vt, f));
              }
              s = p;
            }
            if (((f = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          tr(e, 0), Ca(e, t, 0, !0);
          break;
        }
        e: {
          switch (((r = e), (f = s), f)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ca(r, t, un, !Ta);
              break e;
            case 2:
              Vt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((s = Qo + 300 - Qt()), 10 < s)) {
            if ((Ca(r, t, un, !Ta), Xa(r, 0, !0) !== 0)) break e;
            r.timeoutHandle = np(
              Oy.bind(null, r, a, Vt, es, Zo, t, un, cl, Wl, Ta, f, 2, -0, 0),
              s
            );
            break e;
          }
          Oy(r, a, Vt, es, Zo, t, un, cl, Wl, Ta, f, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Cn(e);
  }
  function Oy(e, t, a, r, s, f, p, g, C, Y, W, ae, K, F) {
    if (
      ((e.timeoutHandle = -1),
      (ae = t.subtreeFlags),
      (ae & 8192 || (ae & 16785408) === 16785408) &&
        ((fi = { stylesheets: null, count: 0, unsuspend: Tb }),
        Sy(t),
        (ae = Rb()),
        ae !== null))
    ) {
      (e.cancelPendingCommit = ae(
        Uy.bind(null, e, t, f, a, r, s, p, g, C, W, 1, K, F)
      )),
        Ca(e, f, p, !Y);
      return;
    }
    Uy(e, t, f, a, r, s, p, g, C);
  }
  function Y1(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var r = 0; r < a.length; r++) {
          var s = a[r],
            f = s.getSnapshot;
          s = s.value;
          try {
            if (!Yt(f(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Ca(e, t, a, r) {
    (t &= ~Ho),
      (t &= ~cl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      r && (e.warmLanes |= t),
      (r = e.expirationTimes);
    for (var s = t; 0 < s; ) {
      var f = 31 - Oe(s),
        p = 1 << f;
      (r[f] = -1), (s &= ~p);
    }
    a !== 0 && Bd(e, a, t);
  }
  function ts() {
    return (Ze & 6) === 0 ? (ri(0), !1) : !0;
  }
  function Ko() {
    if (ke !== null) {
      if (Qe === 0) var e = ke.return;
      else (e = ke), (Yn = al = null), co(e), (Kl = null), (Fr = 0), (e = ke);
      for (; e !== null; ) uy(e.alternate, e), (e = e.return);
      ke = null;
    }
  }
  function tr(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && ((e.timeoutHandle = -1), sb(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Ko(),
      (Fe = e),
      (ke = a = Hn(e.current, null)),
      (qe = t),
      (Qe = 0),
      ($t = null),
      (Ta = !1),
      (Pl = Ka(e, t)),
      (Vo = !1),
      (Wl = un = Ho = cl = Aa = nt = 0),
      (Vt = ai = null),
      (Zo = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var s = 31 - Oe(r),
          f = 1 << s;
        (t |= e[s]), (r &= ~f);
      }
    return (Wn = t), Eu(), a;
  }
  function Cy(e, t) {
    (je = null),
      (D.H = Zu),
      t === Vr || t === Du
        ? ((t = Xh()), (Qe = 3))
        : t === Qh
        ? ((t = Xh()), (Qe = 4))
        : (Qe =
            t === Km
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      ($t = t),
      ke === null && ((nt = 1), Ku(e, tn(t, e.current)));
  }
  function My() {
    var e = D.H;
    return (D.H = Zu), e === null ? Zu : e;
  }
  function Ny() {
    var e = D.A;
    return (D.A = Z1), e;
  }
  function $o() {
    (nt = 4),
      Ta || ((qe & 4194048) !== qe && rn.current !== null) || (Pl = !0),
      ((Aa & 134217727) === 0 && (cl & 134217727) === 0) ||
        Fe === null ||
        Ca(Fe, qe, un, !1);
  }
  function Fo(e, t, a) {
    var r = Ze;
    Ze |= 2;
    var s = My(),
      f = Ny();
    (Fe !== e || qe !== t) && ((es = null), tr(e, t)), (t = !1);
    var p = nt;
    e: do
      try {
        if (Qe !== 0 && ke !== null) {
          var g = ke,
            C = $t;
          switch (Qe) {
            case 8:
              Ko(), (p = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              rn.current === null && (t = !0);
              var Y = Qe;
              if (((Qe = 0), ($t = null), nr(e, g, C, Y), a && Pl)) {
                p = 0;
                break e;
              }
              break;
            default:
              (Y = Qe), (Qe = 0), ($t = null), nr(e, g, C, Y);
          }
        }
        G1(), (p = nt);
        break;
      } catch (W) {
        Cy(e, W);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Yn = al = null),
      (Ze = r),
      (D.H = s),
      (D.A = f),
      ke === null && ((Fe = null), (qe = 0), Eu()),
      p
    );
  }
  function G1() {
    for (; ke !== null; ) Dy(ke);
  }
  function X1(e, t) {
    var a = Ze;
    Ze |= 2;
    var r = My(),
      s = Ny();
    Fe !== e || qe !== t
      ? ((es = null), (Iu = Qt() + 500), tr(e, t))
      : (Pl = Ka(e, t));
    e: do
      try {
        if (Qe !== 0 && ke !== null) {
          t = ke;
          var f = $t;
          t: switch (Qe) {
            case 1:
              (Qe = 0), ($t = null), nr(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Yh(f)) {
                (Qe = 0), ($t = null), jy(t);
                break;
              }
              (t = function () {
                (Qe !== 2 && Qe !== 9) || Fe !== e || (Qe = 7), Cn(e);
              }),
                f.then(t, t);
              break e;
            case 3:
              Qe = 7;
              break e;
            case 4:
              Qe = 5;
              break e;
            case 7:
              Yh(f)
                ? ((Qe = 0), ($t = null), jy(t))
                : ((Qe = 0), ($t = null), nr(e, t, f, 7));
              break;
            case 5:
              var p = null;
              switch (ke.tag) {
                case 26:
                  p = ke.memoizedState;
                case 5:
                case 27:
                  var g = ke;
                  if (!p || mp(p)) {
                    (Qe = 0), ($t = null);
                    var C = g.sibling;
                    if (C !== null) ke = C;
                    else {
                      var Y = g.return;
                      Y !== null ? ((ke = Y), ns(Y)) : (ke = null);
                    }
                    break t;
                  }
              }
              (Qe = 0), ($t = null), nr(e, t, f, 5);
              break;
            case 6:
              (Qe = 0), ($t = null), nr(e, t, f, 6);
              break;
            case 8:
              Ko(), (nt = 6);
              break e;
            default:
              throw Error(u(462));
          }
        }
        K1();
        break;
      } catch (W) {
        Cy(e, W);
      }
    while (!0);
    return (
      (Yn = al = null),
      (D.H = r),
      (D.A = s),
      (Ze = a),
      ke !== null ? 0 : ((Fe = null), (qe = 0), Eu(), nt)
    );
  }
  function K1() {
    for (; ke !== null && !Sl(); ) Dy(ke);
  }
  function Dy(e) {
    var t = ry(e.alternate, e, Wn);
    (e.memoizedProps = e.pendingProps), t === null ? ns(e) : (ke = t);
  }
  function jy(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Im(a, t, t.pendingProps, t.type, void 0, qe);
        break;
      case 11:
        t = Im(a, t, t.pendingProps, t.type.render, t.ref, qe);
        break;
      case 5:
        co(t);
      default:
        uy(a, t), (t = ke = zh(t, Wn)), (t = ry(a, t, Wn));
    }
    (e.memoizedProps = e.pendingProps), t === null ? ns(e) : (ke = t);
  }
  function nr(e, t, a, r) {
    (Yn = al = null), co(t), (Kl = null), (Fr = 0);
    var s = t.return;
    try {
      if (k1(e, s, t, a, qe)) {
        (nt = 1), Ku(e, tn(a, e.current)), (ke = null);
        return;
      }
    } catch (f) {
      if (s !== null) throw ((ke = s), f);
      (nt = 1), Ku(e, tn(a, e.current)), (ke = null);
      return;
    }
    t.flags & 32768
      ? (He || r === 1
          ? (e = !0)
          : Pl || (qe & 536870912) !== 0
          ? (e = !1)
          : ((Ta = e = !0),
            (r === 2 || r === 9 || r === 3 || r === 6) &&
              ((r = rn.current),
              r !== null && r.tag === 13 && (r.flags |= 16384))),
        zy(t, e))
      : ns(t);
  }
  function ns(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        zy(t, Ta);
        return;
      }
      e = t.return;
      var a = q1(t.alternate, t, Wn);
      if (a !== null) {
        ke = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ke = t;
        return;
      }
      ke = t = e;
    } while (t !== null);
    nt === 0 && (nt = 5);
  }
  function zy(e, t) {
    do {
      var a = B1(e.alternate, e);
      if (a !== null) {
        (a.flags &= 32767), (ke = a);
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ke = e;
        return;
      }
      ke = e = a;
    } while (e !== null);
    (nt = 6), (ke = null);
  }
  function Uy(e, t, a, r, s, f, p, g, C) {
    e.cancelPendingCommit = null;
    do as();
    while (St !== 0);
    if ((Ze & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((f = t.lanes | t.childLanes),
        (f |= qc),
        T0(e, a, f, p, g, C),
        e === Fe && ((ke = Fe = null), (qe = 0)),
        (Il = t),
        (Oa = e),
        (er = a),
        (Yo = f),
        (Go = s),
        (Ty = r),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            P1(Ga, function () {
              return Vy(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (r = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || r)
      ) {
        (r = D.T), (D.T = null), (s = J.p), (J.p = 2), (p = Ze), (Ze |= 4);
        try {
          V1(e, t, a);
        } finally {
          (Ze = p), (J.p = s), (D.T = r);
        }
      }
      (St = 1), ky(), Ly(), qy();
    }
  }
  function ky() {
    if (St === 1) {
      St = 0;
      var e = Oa,
        t = Il,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = D.T), (D.T = null);
        var r = J.p;
        J.p = 2;
        var s = Ze;
        Ze |= 4;
        try {
          gy(t, e);
          var f = sf,
            p = wh(e.containerInfo),
            g = f.focusedElem,
            C = f.selectionRange;
          if (
            p !== g &&
            g &&
            g.ownerDocument &&
            Eh(g.ownerDocument.documentElement, g)
          ) {
            if (C !== null && jc(g)) {
              var Y = C.start,
                W = C.end;
              if ((W === void 0 && (W = Y), "selectionStart" in g))
                (g.selectionStart = Y),
                  (g.selectionEnd = Math.min(W, g.value.length));
              else {
                var ae = g.ownerDocument || document,
                  K = (ae && ae.defaultView) || window;
                if (K.getSelection) {
                  var F = K.getSelection(),
                    Ae = g.textContent.length,
                    Ee = Math.min(C.start, Ae),
                    Xe = C.end === void 0 ? Ee : Math.min(C.end, Ae);
                  !F.extend && Ee > Xe && ((p = Xe), (Xe = Ee), (Ee = p));
                  var H = xh(g, Ee),
                    L = xh(g, Xe);
                  if (
                    H &&
                    L &&
                    (F.rangeCount !== 1 ||
                      F.anchorNode !== H.node ||
                      F.anchorOffset !== H.offset ||
                      F.focusNode !== L.node ||
                      F.focusOffset !== L.offset)
                  ) {
                    var Q = ae.createRange();
                    Q.setStart(H.node, H.offset),
                      F.removeAllRanges(),
                      Ee > Xe
                        ? (F.addRange(Q), F.extend(L.node, L.offset))
                        : (Q.setEnd(L.node, L.offset), F.addRange(Q));
                  }
                }
              }
            }
            for (ae = [], F = g; (F = F.parentNode); )
              F.nodeType === 1 &&
                ae.push({ element: F, left: F.scrollLeft, top: F.scrollTop });
            for (
              typeof g.focus == "function" && g.focus(), g = 0;
              g < ae.length;
              g++
            ) {
              var te = ae[g];
              (te.element.scrollLeft = te.left),
                (te.element.scrollTop = te.top);
            }
          }
          (ys = !!uf), (sf = uf = null);
        } finally {
          (Ze = s), (J.p = r), (D.T = a);
        }
      }
      (e.current = t), (St = 2);
    }
  }
  function Ly() {
    if (St === 2) {
      St = 0;
      var e = Oa,
        t = Il,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = D.T), (D.T = null);
        var r = J.p;
        J.p = 2;
        var s = Ze;
        Ze |= 4;
        try {
          my(e, t.alternate, t);
        } finally {
          (Ze = s), (J.p = r), (D.T = a);
        }
      }
      St = 3;
    }
  }
  function qy() {
    if (St === 4 || St === 3) {
      (St = 0), xl();
      var e = Oa,
        t = Il,
        a = er,
        r = Ty;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (St = 5)
        : ((St = 0), (Il = Oa = null), By(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (Ra = null),
        dc(a),
        (t = t.stateNode),
        ue && typeof ue.onCommitFiberRoot == "function")
      )
        try {
          ue.onCommitFiberRoot(fe, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        (t = D.T), (s = J.p), (J.p = 2), (D.T = null);
        try {
          for (var f = e.onRecoverableError, p = 0; p < r.length; p++) {
            var g = r[p];
            f(g.value, { componentStack: g.stack });
          }
        } finally {
          (D.T = t), (J.p = s);
        }
      }
      (er & 3) !== 0 && as(),
        Cn(e),
        (s = e.pendingLanes),
        (a & 4194090) !== 0 && (s & 42) !== 0
          ? e === Xo
            ? li++
            : ((li = 0), (Xo = e))
          : (li = 0),
        ri(0);
    }
  }
  function By(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), qr(t)));
  }
  function as(e) {
    return ky(), Ly(), qy(), Vy();
  }
  function Vy() {
    if (St !== 5) return !1;
    var e = Oa,
      t = Yo;
    Yo = 0;
    var a = dc(er),
      r = D.T,
      s = J.p;
    try {
      (J.p = 32 > a ? 32 : a), (D.T = null), (a = Go), (Go = null);
      var f = Oa,
        p = er;
      if (((St = 0), (Il = Oa = null), (er = 0), (Ze & 6) !== 0))
        throw Error(u(331));
      var g = Ze;
      if (
        ((Ze |= 4),
        Ey(f.current),
        _y(f, f.current, p, a),
        (Ze = g),
        ri(0, !1),
        ue && typeof ue.onPostCommitFiberRoot == "function")
      )
        try {
          ue.onPostCommitFiberRoot(fe, f);
        } catch {}
      return !0;
    } finally {
      (J.p = s), (D.T = r), By(e, t);
    }
  }
  function Hy(e, t, a) {
    (t = tn(a, t)),
      (t = wo(e.stateNode, t, 2)),
      (e = ga(e, t, 2)),
      e !== null && (xr(e, 2), Cn(e));
  }
  function $e(e, t, a) {
    if (e.tag === 3) Hy(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Hy(t, e, a);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (Ra === null || !Ra.has(r)))
          ) {
            (e = tn(a, e)),
              (a = Gm(2)),
              (r = ga(t, a, 2)),
              r !== null && (Xm(a, r, t, e), xr(r, 2), Cn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function Jo(e, t, a) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Q1();
      var s = new Set();
      r.set(t, s);
    } else (s = r.get(t)), s === void 0 && ((s = new Set()), r.set(t, s));
    s.has(a) ||
      ((Vo = !0), s.add(a), (e = $1.bind(null, e, t, a)), t.then(e, e));
  }
  function $1(e, t, a) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Fe === e &&
        (qe & a) === a &&
        (nt === 4 || (nt === 3 && (qe & 62914560) === qe && 300 > Qt() - Qo)
          ? (Ze & 2) === 0 && tr(e, 0)
          : (Ho |= a),
        Wl === qe && (Wl = 0)),
      Cn(e);
  }
  function Zy(e, t) {
    t === 0 && (t = qd()), (e = Ll(e, t)), e !== null && (xr(e, t), Cn(e));
  }
  function F1(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), Zy(e, a);
  }
  function J1(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          s = e.memoizedState;
        s !== null && (a = s.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    r !== null && r.delete(t), Zy(e, a);
  }
  function P1(e, t) {
    return Ln(e, t);
  }
  var ls = null,
    ar = null,
    Po = !1,
    rs = !1,
    Wo = !1,
    ol = 0;
  function Cn(e) {
    e !== ar &&
      e.next === null &&
      (ar === null ? (ls = ar = e) : (ar = ar.next = e)),
      (rs = !0),
      Po || ((Po = !0), I1());
  }
  function ri(e, t) {
    if (!Wo && rs) {
      Wo = !0;
      do
        for (var a = !1, r = ls; r !== null; ) {
          if (e !== 0) {
            var s = r.pendingLanes;
            if (s === 0) var f = 0;
            else {
              var p = r.suspendedLanes,
                g = r.pingedLanes;
              (f = (1 << (31 - Oe(42 | e) + 1)) - 1),
                (f &= s & ~(p & ~g)),
                (f = f & 201326741 ? (f & 201326741) | 1 : f ? f | 2 : 0);
            }
            f !== 0 && ((a = !0), Xy(r, f));
          } else
            (f = qe),
              (f = Xa(
                r,
                r === Fe ? f : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (f & 3) === 0 || Ka(r, f) || ((a = !0), Xy(r, f));
          r = r.next;
        }
      while (a);
      Wo = !1;
    }
  }
  function W1() {
    Qy();
  }
  function Qy() {
    rs = Po = !1;
    var e = 0;
    ol !== 0 && (ub() && (e = ol), (ol = 0));
    for (var t = Qt(), a = null, r = ls; r !== null; ) {
      var s = r.next,
        f = Yy(r, t);
      f === 0
        ? ((r.next = null),
          a === null ? (ls = s) : (a.next = s),
          s === null && (ar = a))
        : ((a = r), (e !== 0 || (f & 3) !== 0) && (rs = !0)),
        (r = s);
    }
    ri(e);
  }
  function Yy(e, t) {
    for (
      var a = e.suspendedLanes,
        r = e.pingedLanes,
        s = e.expirationTimes,
        f = e.pendingLanes & -62914561;
      0 < f;

    ) {
      var p = 31 - Oe(f),
        g = 1 << p,
        C = s[p];
      C === -1
        ? ((g & a) === 0 || (g & r) !== 0) && (s[p] = fu(g, t))
        : C <= t && (e.expiredLanes |= g),
        (f &= ~g);
    }
    if (
      ((t = Fe),
      (a = qe),
      (a = Xa(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (r = e.callbackNode),
      a === 0 ||
        (e === t && (Qe === 2 || Qe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        r !== null && r !== null && oa(r),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Ka(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((r !== null && oa(r), dc(a))) {
        case 2:
        case 8:
          a = sc;
          break;
        case 32:
          a = Ga;
          break;
        case 268435456:
          a = $;
          break;
        default:
          a = Ga;
      }
      return (
        (r = Gy.bind(null, e)),
        (a = Ln(a, r)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      r !== null && r !== null && oa(r),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Gy(e, t) {
    if (St !== 0 && St !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var a = e.callbackNode;
    if (as() && e.callbackNode !== a) return null;
    var r = qe;
    return (
      (r = Xa(
        e,
        e === Fe ? r : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      r === 0
        ? null
        : (Ry(e, r, t),
          Yy(e, Qt()),
          e.callbackNode != null && e.callbackNode === a
            ? Gy.bind(null, e)
            : null)
    );
  }
  function Xy(e, t) {
    if (as()) return null;
    Ry(e, t, !0);
  }
  function I1() {
    cb(function () {
      (Ze & 6) !== 0 ? Ln(ou, W1) : Qy();
    });
  }
  function Io() {
    return ol === 0 && (ol = Ld()), ol;
  }
  function Ky(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : pu("" + e);
  }
  function $y(e, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute("form", e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function eb(e, t, a, r, s) {
    if (t === "submit" && a && a.stateNode === s) {
      var f = Ky((s[kt] || null).action),
        p = r.submitter;
      p &&
        ((t = (t = p[kt] || null)
          ? Ky(t.formAction)
          : p.getAttribute("formAction")),
        t !== null && ((f = t), (p = null)));
      var g = new _u("action", "action", null, r, s);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (ol !== 0) {
                  var C = p ? $y(s, p) : new FormData(s);
                  bo(
                    a,
                    { pending: !0, data: C, method: s.method, action: f },
                    null,
                    C
                  );
                }
              } else
                typeof f == "function" &&
                  (g.preventDefault(),
                  (C = p ? $y(s, p) : new FormData(s)),
                  bo(
                    a,
                    { pending: !0, data: C, method: s.method, action: f },
                    f,
                    C
                  ));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var ef = 0; ef < Lc.length; ef++) {
    var tf = Lc[ef],
      tb = tf.toLowerCase(),
      nb = tf[0].toUpperCase() + tf.slice(1);
    on(tb, "on" + nb);
  }
  on(Rh, "onAnimationEnd"),
    on(Oh, "onAnimationIteration"),
    on(Ch, "onAnimationStart"),
    on("dblclick", "onDoubleClick"),
    on("focusin", "onFocus"),
    on("focusout", "onBlur"),
    on(b1, "onTransitionRun"),
    on(_1, "onTransitionStart"),
    on(S1, "onTransitionCancel"),
    on(Mh, "onTransitionEnd"),
    Rl("onMouseEnter", ["mouseout", "mouseover"]),
    Rl("onMouseLeave", ["mouseout", "mouseover"]),
    Rl("onPointerEnter", ["pointerout", "pointerover"]),
    Rl("onPointerLeave", ["pointerout", "pointerover"]),
    $a(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    $a(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    $a("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    $a(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    $a(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    $a(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var ii =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    ab = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ii)
    );
  function Fy(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a],
        s = r.event;
      r = r.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var p = r.length - 1; 0 <= p; p--) {
            var g = r[p],
              C = g.instance,
              Y = g.currentTarget;
            if (((g = g.listener), C !== f && s.isPropagationStopped()))
              break e;
            (f = g), (s.currentTarget = Y);
            try {
              f(s);
            } catch (W) {
              Xu(W);
            }
            (s.currentTarget = null), (f = C);
          }
        else
          for (p = 0; p < r.length; p++) {
            if (
              ((g = r[p]),
              (C = g.instance),
              (Y = g.currentTarget),
              (g = g.listener),
              C !== f && s.isPropagationStopped())
            )
              break e;
            (f = g), (s.currentTarget = Y);
            try {
              f(s);
            } catch (W) {
              Xu(W);
            }
            (s.currentTarget = null), (f = C);
          }
      }
    }
  }
  function Le(e, t) {
    var a = t[hc];
    a === void 0 && (a = t[hc] = new Set());
    var r = e + "__bubble";
    a.has(r) || (Jy(t, e, 2, !1), a.add(r));
  }
  function nf(e, t, a) {
    var r = 0;
    t && (r |= 4), Jy(a, e, r, t);
  }
  var is = "_reactListening" + Math.random().toString(36).slice(2);
  function af(e) {
    if (!e[is]) {
      (e[is] = !0),
        Qd.forEach(function (a) {
          a !== "selectionchange" && (ab.has(a) || nf(a, !1, e), nf(a, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[is] || ((t[is] = !0), nf("selectionchange", !1, t));
    }
  }
  function Jy(e, t, a, r) {
    switch (_p(t)) {
      case 2:
        var s = Mb;
        break;
      case 8:
        s = Nb;
        break;
      default:
        s = gf;
    }
    (a = s.bind(null, t, a, e)),
      (s = void 0),
      !wc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (s = !0),
      r
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
        ? e.addEventListener(t, a, { passive: s })
        : e.addEventListener(t, a, !1);
  }
  function lf(e, t, a, r, s) {
    var f = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var p = r.tag;
        if (p === 3 || p === 4) {
          var g = r.stateNode.containerInfo;
          if (g === s) break;
          if (p === 4)
            for (p = r.return; p !== null; ) {
              var C = p.tag;
              if ((C === 3 || C === 4) && p.stateNode.containerInfo === s)
                return;
              p = p.return;
            }
          for (; g !== null; ) {
            if (((p = wl(g)), p === null)) return;
            if (((C = p.tag), C === 5 || C === 6 || C === 26 || C === 27)) {
              r = f = p;
              continue e;
            }
            g = g.parentNode;
          }
        }
        r = r.return;
      }
    ah(function () {
      var Y = f,
        W = xc(a),
        ae = [];
      e: {
        var K = Nh.get(e);
        if (K !== void 0) {
          var F = _u,
            Ae = e;
          switch (e) {
            case "keypress":
              if (gu(a) === 0) break e;
            case "keydown":
            case "keyup":
              F = P0;
              break;
            case "focusin":
              (Ae = "focus"), (F = Oc);
              break;
            case "focusout":
              (Ae = "blur"), (F = Oc);
              break;
            case "beforeblur":
            case "afterblur":
              F = Oc;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = ih;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = B0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = e1;
              break;
            case Rh:
            case Oh:
            case Ch:
              F = Z0;
              break;
            case Mh:
              F = n1;
              break;
            case "scroll":
            case "scrollend":
              F = L0;
              break;
            case "wheel":
              F = l1;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = Y0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = sh;
              break;
            case "toggle":
            case "beforetoggle":
              F = i1;
          }
          var Ee = (t & 4) !== 0,
            Xe = !Ee && (e === "scroll" || e === "scrollend"),
            H = Ee ? (K !== null ? K + "Capture" : null) : K;
          Ee = [];
          for (var L = Y, Q; L !== null; ) {
            var te = L;
            if (
              ((Q = te.stateNode),
              (te = te.tag),
              (te !== 5 && te !== 26 && te !== 27) ||
                Q === null ||
                H === null ||
                ((te = Tr(L, H)), te != null && Ee.push(ui(L, te, Q))),
              Xe)
            )
              break;
            L = L.return;
          }
          0 < Ee.length &&
            ((K = new F(K, Ae, null, a, W)),
            ae.push({ event: K, listeners: Ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((K = e === "mouseover" || e === "pointerover"),
            (F = e === "mouseout" || e === "pointerout"),
            K &&
              a !== Sc &&
              (Ae = a.relatedTarget || a.fromElement) &&
              (wl(Ae) || Ae[El]))
          )
            break e;
          if (
            (F || K) &&
            ((K =
              W.window === W
                ? W
                : (K = W.ownerDocument)
                ? K.defaultView || K.parentWindow
                : window),
            F
              ? ((Ae = a.relatedTarget || a.toElement),
                (F = Y),
                (Ae = Ae ? wl(Ae) : null),
                Ae !== null &&
                  ((Xe = o(Ae)),
                  (Ee = Ae.tag),
                  Ae !== Xe || (Ee !== 5 && Ee !== 27 && Ee !== 6)) &&
                  (Ae = null))
              : ((F = null), (Ae = Y)),
            F !== Ae)
          ) {
            if (
              ((Ee = ih),
              (te = "onMouseLeave"),
              (H = "onMouseEnter"),
              (L = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((Ee = sh),
                (te = "onPointerLeave"),
                (H = "onPointerEnter"),
                (L = "pointer")),
              (Xe = F == null ? K : wr(F)),
              (Q = Ae == null ? K : wr(Ae)),
              (K = new Ee(te, L + "leave", F, a, W)),
              (K.target = Xe),
              (K.relatedTarget = Q),
              (te = null),
              wl(W) === Y &&
                ((Ee = new Ee(H, L + "enter", Ae, a, W)),
                (Ee.target = Q),
                (Ee.relatedTarget = Xe),
                (te = Ee)),
              (Xe = te),
              F && Ae)
            )
              t: {
                for (Ee = F, H = Ae, L = 0, Q = Ee; Q; Q = lr(Q)) L++;
                for (Q = 0, te = H; te; te = lr(te)) Q++;
                for (; 0 < L - Q; ) (Ee = lr(Ee)), L--;
                for (; 0 < Q - L; ) (H = lr(H)), Q--;
                for (; L--; ) {
                  if (Ee === H || (H !== null && Ee === H.alternate)) break t;
                  (Ee = lr(Ee)), (H = lr(H));
                }
                Ee = null;
              }
            else Ee = null;
            F !== null && Py(ae, K, F, Ee, !1),
              Ae !== null && Xe !== null && Py(ae, Xe, Ae, Ee, !0);
          }
        }
        e: {
          if (
            ((K = Y ? wr(Y) : window),
            (F = K.nodeName && K.nodeName.toLowerCase()),
            F === "select" || (F === "input" && K.type === "file"))
          )
            var be = ph;
          else if (mh(K))
            if (vh) be = p1;
            else {
              be = m1;
              var ze = h1;
            }
          else
            (F = K.nodeName),
              !F ||
              F.toLowerCase() !== "input" ||
              (K.type !== "checkbox" && K.type !== "radio")
                ? Y && _c(Y.elementType) && (be = ph)
                : (be = y1);
          if (be && (be = be(e, Y))) {
            yh(ae, be, a, W);
            break e;
          }
          ze && ze(e, K, Y),
            e === "focusout" &&
              Y &&
              K.type === "number" &&
              Y.memoizedProps.value != null &&
              bc(K, "number", K.value);
        }
        switch (((ze = Y ? wr(Y) : window), e)) {
          case "focusin":
            (mh(ze) || ze.contentEditable === "true") &&
              ((zl = ze), (zc = Y), (jr = null));
            break;
          case "focusout":
            jr = zc = zl = null;
            break;
          case "mousedown":
            Uc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Uc = !1), Th(ae, a, W);
            break;
          case "selectionchange":
            if (g1) break;
          case "keydown":
          case "keyup":
            Th(ae, a, W);
        }
        var xe;
        if (Mc)
          e: {
            switch (e) {
              case "compositionstart":
                var we = "onCompositionStart";
                break e;
              case "compositionend":
                we = "onCompositionEnd";
                break e;
              case "compositionupdate":
                we = "onCompositionUpdate";
                break e;
            }
            we = void 0;
          }
        else
          jl
            ? dh(e, a) && (we = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (we = "onCompositionStart");
        we &&
          (ch &&
            a.locale !== "ko" &&
            (jl || we !== "onCompositionStart"
              ? we === "onCompositionEnd" && jl && (xe = lh())
              : ((ma = W),
                (Tc = "value" in ma ? ma.value : ma.textContent),
                (jl = !0))),
          (ze = us(Y, we)),
          0 < ze.length &&
            ((we = new uh(we, e, null, a, W)),
            ae.push({ event: we, listeners: ze }),
            xe
              ? (we.data = xe)
              : ((xe = hh(a)), xe !== null && (we.data = xe)))),
          (xe = s1 ? c1(e, a) : o1(e, a)) &&
            ((we = us(Y, "onBeforeInput")),
            0 < we.length &&
              ((ze = new uh("onBeforeInput", "beforeinput", null, a, W)),
              ae.push({ event: ze, listeners: we }),
              (ze.data = xe))),
          eb(ae, e, Y, a, W);
      }
      Fy(ae, t);
    });
  }
  function ui(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function us(e, t) {
    for (var a = t + "Capture", r = []; e !== null; ) {
      var s = e,
        f = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          f === null ||
          ((s = Tr(e, a)),
          s != null && r.unshift(ui(e, s, f)),
          (s = Tr(e, t)),
          s != null && r.push(ui(e, s, f))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function lr(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Py(e, t, a, r, s) {
    for (var f = t._reactName, p = []; a !== null && a !== r; ) {
      var g = a,
        C = g.alternate,
        Y = g.stateNode;
      if (((g = g.tag), C !== null && C === r)) break;
      (g !== 5 && g !== 26 && g !== 27) ||
        Y === null ||
        ((C = Y),
        s
          ? ((Y = Tr(a, f)), Y != null && p.unshift(ui(a, Y, C)))
          : s || ((Y = Tr(a, f)), Y != null && p.push(ui(a, Y, C)))),
        (a = a.return);
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var lb = /\r\n?/g,
    rb = /\u0000|\uFFFD/g;
  function Wy(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        lb,
        `
`
      )
      .replace(rb, "");
  }
  function Iy(e, t) {
    return (t = Wy(t)), Wy(e) === t;
  }
  function ss() {}
  function Ge(e, t, a, r, s, f) {
    switch (a) {
      case "children":
        typeof r == "string"
          ? t === "body" || (t === "textarea" && r === "") || Ml(e, r)
          : (typeof r == "number" || typeof r == "bigint") &&
            t !== "body" &&
            Ml(e, "" + r);
        break;
      case "className":
        hu(e, "class", r);
        break;
      case "tabIndex":
        hu(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hu(e, a, r);
        break;
      case "style":
        th(e, r, f);
        break;
      case "data":
        if (t !== "object") {
          hu(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "symbol" ||
          typeof r == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        (r = pu("" + r)), e.setAttribute(a, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof f == "function" &&
            (a === "formAction"
              ? (t !== "input" && Ge(e, t, "name", s.name, s, null),
                Ge(e, t, "formEncType", s.formEncType, s, null),
                Ge(e, t, "formMethod", s.formMethod, s, null),
                Ge(e, t, "formTarget", s.formTarget, s, null))
              : (Ge(e, t, "encType", s.encType, s, null),
                Ge(e, t, "method", s.method, s, null),
                Ge(e, t, "target", s.target, s, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(a);
          break;
        }
        (r = pu("" + r)), e.setAttribute(a, r);
        break;
      case "onClick":
        r != null && (e.onclick = ss);
        break;
      case "onScroll":
        r != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Le("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(u(61));
          if (((a = r.__html), a != null)) {
            if (s.children != null) throw Error(u(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          r == null ||
          typeof r == "function" ||
          typeof r == "boolean" ||
          typeof r == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (a = pu("" + r)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol"
          ? e.setAttribute(a, "" + r)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        r === !0
          ? e.setAttribute(a, "")
          : r !== !1 &&
            r != null &&
            typeof r != "function" &&
            typeof r != "symbol"
          ? e.setAttribute(a, r)
          : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        !isNaN(r) &&
        1 <= r
          ? e.setAttribute(a, r)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r)
          ? e.removeAttribute(a)
          : e.setAttribute(a, r);
        break;
      case "popover":
        Le("beforetoggle", e), Le("toggle", e), du(e, "popover", r);
        break;
      case "xlinkActuate":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
        break;
      case "xlinkArcrole":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
        break;
      case "xlinkRole":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
        break;
      case "xlinkShow":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
        break;
      case "xlinkTitle":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
        break;
      case "xlinkType":
        Bn(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
        break;
      case "xmlBase":
        Bn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
        break;
      case "xmlLang":
        Bn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
        break;
      case "xmlSpace":
        Bn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
        break;
      case "is":
        du(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = U0.get(a) || a), du(e, a, r));
    }
  }
  function rf(e, t, a, r, s, f) {
    switch (a) {
      case "style":
        th(e, r, f);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r)) throw Error(u(61));
          if (((a = r.__html), a != null)) {
            if (s.children != null) throw Error(u(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof r == "string"
          ? Ml(e, r)
          : (typeof r == "number" || typeof r == "bigint") && Ml(e, "" + r);
        break;
      case "onScroll":
        r != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Le("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = ss);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Yd.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((s = a.endsWith("Capture")),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (f = e[kt] || null),
              (f = f != null ? f[a] : null),
              typeof f == "function" && e.removeEventListener(t, f, s),
              typeof r == "function")
            ) {
              typeof f != "function" &&
                f !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, r, s);
              break e;
            }
            a in e
              ? (e[a] = r)
              : r === !0
              ? e.setAttribute(a, "")
              : du(e, a, r);
          }
    }
  }
  function xt(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Le("error", e), Le("load", e);
        var r = !1,
          s = !1,
          f;
        for (f in a)
          if (a.hasOwnProperty(f)) {
            var p = a[f];
            if (p != null)
              switch (f) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Ge(e, t, f, p, a, null);
              }
          }
        s && Ge(e, t, "srcSet", a.srcSet, a, null),
          r && Ge(e, t, "src", a.src, a, null);
        return;
      case "input":
        Le("invalid", e);
        var g = (f = p = s = null),
          C = null,
          Y = null;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var W = a[r];
            if (W != null)
              switch (r) {
                case "name":
                  s = W;
                  break;
                case "type":
                  p = W;
                  break;
                case "checked":
                  C = W;
                  break;
                case "defaultChecked":
                  Y = W;
                  break;
                case "value":
                  f = W;
                  break;
                case "defaultValue":
                  g = W;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (W != null) throw Error(u(137, t));
                  break;
                default:
                  Ge(e, t, r, W, a, null);
              }
          }
        Pd(e, f, g, C, Y, p, s, !1), mu(e);
        return;
      case "select":
        Le("invalid", e), (r = p = f = null);
        for (s in a)
          if (a.hasOwnProperty(s) && ((g = a[s]), g != null))
            switch (s) {
              case "value":
                f = g;
                break;
              case "defaultValue":
                p = g;
                break;
              case "multiple":
                r = g;
              default:
                Ge(e, t, s, g, a, null);
            }
        (t = f),
          (a = p),
          (e.multiple = !!r),
          t != null ? Cl(e, !!r, t, !1) : a != null && Cl(e, !!r, a, !0);
        return;
      case "textarea":
        Le("invalid", e), (f = s = r = null);
        for (p in a)
          if (a.hasOwnProperty(p) && ((g = a[p]), g != null))
            switch (p) {
              case "value":
                r = g;
                break;
              case "defaultValue":
                s = g;
                break;
              case "children":
                f = g;
                break;
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(u(91));
                break;
              default:
                Ge(e, t, p, g, a, null);
            }
        Id(e, r, s, f), mu(e);
        return;
      case "option":
        for (C in a)
          if (a.hasOwnProperty(C) && ((r = a[C]), r != null))
            switch (C) {
              case "selected":
                e.selected =
                  r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Ge(e, t, C, r, a, null);
            }
        return;
      case "dialog":
        Le("beforetoggle", e), Le("toggle", e), Le("cancel", e), Le("close", e);
        break;
      case "iframe":
      case "object":
        Le("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < ii.length; r++) Le(ii[r], e);
        break;
      case "image":
        Le("error", e), Le("load", e);
        break;
      case "details":
        Le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Le("error", e), Le("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Y in a)
          if (a.hasOwnProperty(Y) && ((r = a[Y]), r != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Ge(e, t, Y, r, a, null);
            }
        return;
      default:
        if (_c(t)) {
          for (W in a)
            a.hasOwnProperty(W) &&
              ((r = a[W]), r !== void 0 && rf(e, t, W, r, a, void 0));
          return;
        }
    }
    for (g in a)
      a.hasOwnProperty(g) && ((r = a[g]), r != null && Ge(e, t, g, r, a, null));
  }
  function ib(e, t, a, r) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null,
          f = null,
          p = null,
          g = null,
          C = null,
          Y = null,
          W = null;
        for (F in a) {
          var ae = a[F];
          if (a.hasOwnProperty(F) && ae != null)
            switch (F) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = ae;
              default:
                r.hasOwnProperty(F) || Ge(e, t, F, null, r, ae);
            }
        }
        for (var K in r) {
          var F = r[K];
          if (((ae = a[K]), r.hasOwnProperty(K) && (F != null || ae != null)))
            switch (K) {
              case "type":
                f = F;
                break;
              case "name":
                s = F;
                break;
              case "checked":
                Y = F;
                break;
              case "defaultChecked":
                W = F;
                break;
              case "value":
                p = F;
                break;
              case "defaultValue":
                g = F;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null) throw Error(u(137, t));
                break;
              default:
                F !== ae && Ge(e, t, K, F, r, ae);
            }
        }
        gc(e, p, g, C, Y, W, f, s);
        return;
      case "select":
        F = p = g = K = null;
        for (f in a)
          if (((C = a[f]), a.hasOwnProperty(f) && C != null))
            switch (f) {
              case "value":
                break;
              case "multiple":
                F = C;
              default:
                r.hasOwnProperty(f) || Ge(e, t, f, null, r, C);
            }
        for (s in r)
          if (
            ((f = r[s]),
            (C = a[s]),
            r.hasOwnProperty(s) && (f != null || C != null))
          )
            switch (s) {
              case "value":
                K = f;
                break;
              case "defaultValue":
                g = f;
                break;
              case "multiple":
                p = f;
              default:
                f !== C && Ge(e, t, s, f, r, C);
            }
        (t = g),
          (a = p),
          (r = F),
          K != null
            ? Cl(e, !!a, K, !1)
            : !!r != !!a &&
              (t != null ? Cl(e, !!a, t, !0) : Cl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        F = K = null;
        for (g in a)
          if (
            ((s = a[g]),
            a.hasOwnProperty(g) && s != null && !r.hasOwnProperty(g))
          )
            switch (g) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ge(e, t, g, null, r, s);
            }
        for (p in r)
          if (
            ((s = r[p]),
            (f = a[p]),
            r.hasOwnProperty(p) && (s != null || f != null))
          )
            switch (p) {
              case "value":
                K = s;
                break;
              case "defaultValue":
                F = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(u(91));
                break;
              default:
                s !== f && Ge(e, t, p, s, r, f);
            }
        Wd(e, K, F);
        return;
      case "option":
        for (var Ae in a)
          if (
            ((K = a[Ae]),
            a.hasOwnProperty(Ae) && K != null && !r.hasOwnProperty(Ae))
          )
            switch (Ae) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ge(e, t, Ae, null, r, K);
            }
        for (C in r)
          if (
            ((K = r[C]),
            (F = a[C]),
            r.hasOwnProperty(C) && K !== F && (K != null || F != null))
          )
            switch (C) {
              case "selected":
                e.selected =
                  K && typeof K != "function" && typeof K != "symbol";
                break;
              default:
                Ge(e, t, C, K, r, F);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ee in a)
          (K = a[Ee]),
            a.hasOwnProperty(Ee) &&
              K != null &&
              !r.hasOwnProperty(Ee) &&
              Ge(e, t, Ee, null, r, K);
        for (Y in r)
          if (
            ((K = r[Y]),
            (F = a[Y]),
            r.hasOwnProperty(Y) && K !== F && (K != null || F != null))
          )
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null) throw Error(u(137, t));
                break;
              default:
                Ge(e, t, Y, K, r, F);
            }
        return;
      default:
        if (_c(t)) {
          for (var Xe in a)
            (K = a[Xe]),
              a.hasOwnProperty(Xe) &&
                K !== void 0 &&
                !r.hasOwnProperty(Xe) &&
                rf(e, t, Xe, void 0, r, K);
          for (W in r)
            (K = r[W]),
              (F = a[W]),
              !r.hasOwnProperty(W) ||
                K === F ||
                (K === void 0 && F === void 0) ||
                rf(e, t, W, K, r, F);
          return;
        }
    }
    for (var H in a)
      (K = a[H]),
        a.hasOwnProperty(H) &&
          K != null &&
          !r.hasOwnProperty(H) &&
          Ge(e, t, H, null, r, K);
    for (ae in r)
      (K = r[ae]),
        (F = a[ae]),
        !r.hasOwnProperty(ae) ||
          K === F ||
          (K == null && F == null) ||
          Ge(e, t, ae, K, r, F);
  }
  var uf = null,
    sf = null;
  function cs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ep(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tp(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function cf(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var of = null;
  function ub() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === of
        ? !1
        : ((of = e), !0)
      : ((of = null), !1);
  }
  var np = typeof setTimeout == "function" ? setTimeout : void 0,
    sb = typeof clearTimeout == "function" ? clearTimeout : void 0,
    ap = typeof Promise == "function" ? Promise : void 0,
    cb =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof ap < "u"
        ? function (e) {
            return ap.resolve(null).then(e).catch(ob);
          }
        : np;
  function ob(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ma(e) {
    return e === "head";
  }
  function lp(e, t) {
    var a = t,
      r = 0,
      s = 0;
    do {
      var f = a.nextSibling;
      if ((e.removeChild(a), f && f.nodeType === 8))
        if (((a = f.data), a === "/$")) {
          if (0 < r && 8 > r) {
            a = r;
            var p = e.ownerDocument;
            if ((a & 1 && si(p.documentElement), a & 2 && si(p.body), a & 4))
              for (a = p.head, si(a), p = a.firstChild; p; ) {
                var g = p.nextSibling,
                  C = p.nodeName;
                p[Er] ||
                  C === "SCRIPT" ||
                  C === "STYLE" ||
                  (C === "LINK" && p.rel.toLowerCase() === "stylesheet") ||
                  a.removeChild(p),
                  (p = g);
              }
          }
          if (s === 0) {
            e.removeChild(f), pi(t);
            return;
          }
          s--;
        } else
          a === "$" || a === "$?" || a === "$!"
            ? s++
            : (r = a.charCodeAt(0) - 48);
      else r = 0;
      a = f;
    } while (a);
    pi(t);
  }
  function ff(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ff(a), mc(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function fb(e, t, a, r) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (r) {
        if (!e[Er])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((f = e.getAttribute("rel")),
                f === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                f !== s.rel ||
                e.getAttribute("href") !==
                  (s.href == null || s.href === "" ? null : s.href) ||
                e.getAttribute("crossorigin") !==
                  (s.crossOrigin == null ? null : s.crossOrigin) ||
                e.getAttribute("title") !== (s.title == null ? null : s.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((f = e.getAttribute("src")),
                (f !== (s.src == null ? null : s.src) ||
                  e.getAttribute("type") !== (s.type == null ? null : s.type) ||
                  e.getAttribute("crossorigin") !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
                  f &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var f = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === f) return e;
      } else return e;
      if (((e = dn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function db(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = dn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function df(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function hb(e, t) {
    var a = e.ownerDocument;
    if (e.data !== "$?" || a.readyState === "complete") t();
    else {
      var r = function () {
        t(), a.removeEventListener("DOMContentLoaded", r);
      };
      a.addEventListener("DOMContentLoaded", r), (e._reactRetry = r);
    }
  }
  function dn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var hf = null;
  function rp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (t === 0) return e;
          t--;
        } else a === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ip(e, t, a) {
    switch (((t = cs(a)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function si(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    mc(e);
  }
  var sn = new Map(),
    up = new Set();
  function os(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var In = J.d;
  J.d = { f: mb, r: yb, D: pb, C: vb, L: gb, m: bb, X: Sb, S: _b, M: xb };
  function mb() {
    var e = In.f(),
      t = ts();
    return e || t;
  }
  function yb(e) {
    var t = Tl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Rm(t) : In.r(e);
  }
  var rr = typeof document > "u" ? null : document;
  function sp(e, t, a) {
    var r = rr;
    if (r && typeof t == "string" && t) {
      var s = en(t);
      (s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == "string" && (s += '[crossorigin="' + a + '"]'),
        up.has(s) ||
          (up.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          r.querySelector(s) === null &&
            ((t = r.createElement("link")),
            xt(t, "link", e),
            mt(t),
            r.head.appendChild(t)));
    }
  }
  function pb(e) {
    In.D(e), sp("dns-prefetch", e, null);
  }
  function vb(e, t) {
    In.C(e, t), sp("preconnect", e, t);
  }
  function gb(e, t, a) {
    In.L(e, t, a);
    var r = rr;
    if (r && e && t) {
      var s = 'link[rel="preload"][as="' + en(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + en(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (s += '[imagesizes="' + en(a.imageSizes) + '"]'))
        : (s += '[href="' + en(e) + '"]');
      var f = s;
      switch (t) {
        case "style":
          f = ir(e);
          break;
        case "script":
          f = ur(e);
      }
      sn.has(f) ||
        ((e = v(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a
        )),
        sn.set(f, e),
        r.querySelector(s) !== null ||
          (t === "style" && r.querySelector(ci(f))) ||
          (t === "script" && r.querySelector(oi(f))) ||
          ((t = r.createElement("link")),
          xt(t, "link", e),
          mt(t),
          r.head.appendChild(t)));
    }
  }
  function bb(e, t) {
    In.m(e, t);
    var a = rr;
    if (a && e) {
      var r = t && typeof t.as == "string" ? t.as : "script",
        s =
          'link[rel="modulepreload"][as="' + en(r) + '"][href="' + en(e) + '"]',
        f = s;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ur(e);
      }
      if (
        !sn.has(f) &&
        ((e = v({ rel: "modulepreload", href: e }, t)),
        sn.set(f, e),
        a.querySelector(s) === null)
      ) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(oi(f))) return;
        }
        (r = a.createElement("link")),
          xt(r, "link", e),
          mt(r),
          a.head.appendChild(r);
      }
    }
  }
  function _b(e, t, a) {
    In.S(e, t, a);
    var r = rr;
    if (r && e) {
      var s = Al(r).hoistableStyles,
        f = ir(e);
      t = t || "default";
      var p = s.get(f);
      if (!p) {
        var g = { loading: 0, preload: null };
        if ((p = r.querySelector(ci(f)))) g.loading = 5;
        else {
          (e = v({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
            (a = sn.get(f)) && mf(e, a);
          var C = (p = r.createElement("link"));
          mt(C),
            xt(C, "link", e),
            (C._p = new Promise(function (Y, W) {
              (C.onload = Y), (C.onerror = W);
            })),
            C.addEventListener("load", function () {
              g.loading |= 1;
            }),
            C.addEventListener("error", function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            fs(p, t, r);
        }
        (p = { type: "stylesheet", instance: p, count: 1, state: g }),
          s.set(f, p);
      }
    }
  }
  function Sb(e, t) {
    In.X(e, t);
    var a = rr;
    if (a && e) {
      var r = Al(a).hoistableScripts,
        s = ur(e),
        f = r.get(s);
      f ||
        ((f = a.querySelector(oi(s))),
        f ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = sn.get(s)) && yf(e, t),
          (f = a.createElement("script")),
          mt(f),
          xt(f, "link", e),
          a.head.appendChild(f)),
        (f = { type: "script", instance: f, count: 1, state: null }),
        r.set(s, f));
    }
  }
  function xb(e, t) {
    In.M(e, t);
    var a = rr;
    if (a && e) {
      var r = Al(a).hoistableScripts,
        s = ur(e),
        f = r.get(s);
      f ||
        ((f = a.querySelector(oi(s))),
        f ||
          ((e = v({ src: e, async: !0, type: "module" }, t)),
          (t = sn.get(s)) && yf(e, t),
          (f = a.createElement("script")),
          mt(f),
          xt(f, "link", e),
          a.head.appendChild(f)),
        (f = { type: "script", instance: f, count: 1, state: null }),
        r.set(s, f));
    }
  }
  function cp(e, t, a, r) {
    var s = (s = de.current) ? os(s) : null;
    if (!s) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = ir(a.href)),
            (a = Al(s).hoistableStyles),
            (r = a.get(t)),
            r ||
              ((r = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, r)),
            r)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = ir(a.href);
          var f = Al(s).hoistableStyles,
            p = f.get(e);
          if (
            (p ||
              ((s = s.ownerDocument || s),
              (p = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              f.set(e, p),
              (f = s.querySelector(ci(e))) &&
                !f._p &&
                ((p.instance = f), (p.state.loading = 5)),
              sn.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                sn.set(e, a),
                f || Eb(s, e, a, p.state))),
            t && r === null)
          )
            throw Error(u(528, ""));
          return p;
        }
        if (t && r !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = ur(a)),
              (a = Al(s).hoistableScripts),
              (r = a.get(t)),
              r ||
                ((r = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, r)),
              r)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, e));
    }
  }
  function ir(e) {
    return 'href="' + en(e) + '"';
  }
  function ci(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function op(e) {
    return v({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Eb(e, t, a, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (r.loading = 1)
      : ((t = e.createElement("link")),
        (r.preload = t),
        t.addEventListener("load", function () {
          return (r.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (r.loading |= 2);
        }),
        xt(t, "link", a),
        mt(t),
        e.head.appendChild(t));
  }
  function ur(e) {
    return '[src="' + en(e) + '"]';
  }
  function oi(e) {
    return "script[async]" + e;
  }
  function fp(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var r = e.querySelector('style[data-href~="' + en(a.href) + '"]');
          if (r) return (t.instance = r), mt(r), r;
          var s = v({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement("style")),
            mt(r),
            xt(r, "style", s),
            fs(r, a.precedence, e),
            (t.instance = r)
          );
        case "stylesheet":
          s = ir(a.href);
          var f = e.querySelector(ci(s));
          if (f) return (t.state.loading |= 4), (t.instance = f), mt(f), f;
          (r = op(a)),
            (s = sn.get(s)) && mf(r, s),
            (f = (e.ownerDocument || e).createElement("link")),
            mt(f);
          var p = f;
          return (
            (p._p = new Promise(function (g, C) {
              (p.onload = g), (p.onerror = C);
            })),
            xt(f, "link", r),
            (t.state.loading |= 4),
            fs(f, a.precedence, e),
            (t.instance = f)
          );
        case "script":
          return (
            (f = ur(a.src)),
            (s = e.querySelector(oi(f)))
              ? ((t.instance = s), mt(s), s)
              : ((r = a),
                (s = sn.get(f)) && ((r = v({}, a)), yf(r, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement("script")),
                mt(s),
                xt(s, "link", r),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((r = t.instance), (t.state.loading |= 4), fs(r, a.precedence, e));
    return t.instance;
  }
  function fs(e, t, a) {
    for (
      var r = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        s = r.length ? r[r.length - 1] : null,
        f = s,
        p = 0;
      p < r.length;
      p++
    ) {
      var g = r[p];
      if (g.dataset.precedence === t) f = g;
      else if (f !== s) break;
    }
    f
      ? f.parentNode.insertBefore(e, f.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function mf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function yf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var ds = null;
  function dp(e, t, a) {
    if (ds === null) {
      var r = new Map(),
        s = (ds = new Map());
      s.set(a, r);
    } else (s = ds), (r = s.get(a)), r || ((r = new Map()), s.set(a, r));
    if (r.has(e)) return r;
    for (
      r.set(e, null), a = a.getElementsByTagName(e), s = 0;
      s < a.length;
      s++
    ) {
      var f = a[s];
      if (
        !(
          f[Er] ||
          f[At] ||
          (e === "link" && f.getAttribute("rel") === "stylesheet")
        ) &&
        f.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var p = f.getAttribute(t) || "";
        p = e + p;
        var g = r.get(p);
        g ? g.push(f) : r.set(p, [f]);
      }
    }
    return r;
  }
  function hp(e, t, a) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function wb(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function mp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var fi = null;
  function Tb() {}
  function Ab(e, t, a) {
    if (fi === null) throw Error(u(475));
    var r = fi;
    if (
      t.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var s = ir(a.href),
          f = e.querySelector(ci(s));
        if (f) {
          (e = f._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (r.count++, (r = hs.bind(r)), e.then(r, r)),
            (t.state.loading |= 4),
            (t.instance = f),
            mt(f);
          return;
        }
        (f = e.ownerDocument || e),
          (a = op(a)),
          (s = sn.get(s)) && mf(a, s),
          (f = f.createElement("link")),
          mt(f);
        var p = f;
        (p._p = new Promise(function (g, C) {
          (p.onload = g), (p.onerror = C);
        })),
          xt(f, "link", a),
          (t.instance = f);
      }
      r.stylesheets === null && (r.stylesheets = new Map()),
        r.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (r.count++,
          (t = hs.bind(r)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function Rb() {
    if (fi === null) throw Error(u(475));
    var e = fi;
    return (
      e.stylesheets && e.count === 0 && pf(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var a = setTimeout(function () {
              if ((e.stylesheets && pf(e, e.stylesheets), e.unsuspend)) {
                var r = e.unsuspend;
                (e.unsuspend = null), r();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function hs() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) pf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var ms = null;
  function pf(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (ms = new Map()),
        t.forEach(Ob, e),
        (ms = null),
        hs.call(e));
  }
  function Ob(e, t) {
    if (!(t.state.loading & 4)) {
      var a = ms.get(e);
      if (a) var r = a.get(null);
      else {
        (a = new Map()), ms.set(e, a);
        for (
          var s = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            f = 0;
          f < s.length;
          f++
        ) {
          var p = s[f];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") &&
            (a.set(p.dataset.precedence, p), (r = p));
        }
        r && a.set(null, r);
      }
      (s = t.instance),
        (p = s.getAttribute("data-precedence")),
        (f = a.get(p) || r),
        f === r && a.set(null, s),
        a.set(p, s),
        this.count++,
        (r = hs.bind(this)),
        s.addEventListener("load", r),
        s.addEventListener("error", r),
        f
          ? f.parentNode.insertBefore(s, f.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var di = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0,
  };
  function Cb(e, t, a, r, s, f, p, g) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = oc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = oc(0)),
      (this.hiddenUpdates = oc(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = s),
      (this.onCaughtError = f),
      (this.onRecoverableError = p),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = g),
      (this.incompleteTransitions = new Map());
  }
  function yp(e, t, a, r, s, f, p, g, C, Y, W, ae) {
    return (
      (e = new Cb(e, t, a, p, g, C, Y, ae)),
      (t = 1),
      f === !0 && (t |= 24),
      (f = Gt(3, null, null, t)),
      (e.current = f),
      (f.stateNode = e),
      (t = Fc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (f.memoizedState = { element: r, isDehydrated: a, cache: t }),
      Ic(f),
      e
    );
  }
  function pp(e) {
    return e ? ((e = ql), e) : ql;
  }
  function vp(e, t, a, r, s, f) {
    (s = pp(s)),
      r.context === null ? (r.context = s) : (r.pendingContext = s),
      (r = va(t)),
      (r.payload = { element: a }),
      (f = f === void 0 ? null : f),
      f !== null && (r.callback = f),
      (a = ga(e, r, t)),
      a !== null && (Jt(a, e, t), Zr(a, e, t));
  }
  function gp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function vf(e, t) {
    gp(e, t), (e = e.alternate) && gp(e, t);
  }
  function bp(e) {
    if (e.tag === 13) {
      var t = Ll(e, 67108864);
      t !== null && Jt(t, e, 67108864), vf(e, 67108864);
    }
  }
  var ys = !0;
  function Mb(e, t, a, r) {
    var s = D.T;
    D.T = null;
    var f = J.p;
    try {
      (J.p = 2), gf(e, t, a, r);
    } finally {
      (J.p = f), (D.T = s);
    }
  }
  function Nb(e, t, a, r) {
    var s = D.T;
    D.T = null;
    var f = J.p;
    try {
      (J.p = 8), gf(e, t, a, r);
    } finally {
      (J.p = f), (D.T = s);
    }
  }
  function gf(e, t, a, r) {
    if (ys) {
      var s = bf(r);
      if (s === null) lf(e, t, r, ps, a), Sp(e, r);
      else if (jb(s, e, t, a, r)) r.stopPropagation();
      else if ((Sp(e, r), t & 4 && -1 < Db.indexOf(e))) {
        for (; s !== null; ) {
          var f = Tl(s);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (((f = f.stateNode), f.current.memoizedState.isDehydrated)) {
                  var p = qn(f.pendingLanes);
                  if (p !== 0) {
                    var g = f;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; p; ) {
                      var C = 1 << (31 - Oe(p));
                      (g.entanglements[1] |= C), (p &= ~C);
                    }
                    Cn(f), (Ze & 6) === 0 && ((Iu = Qt() + 500), ri(0));
                  }
                }
                break;
              case 13:
                (g = Ll(f, 2)), g !== null && Jt(g, f, 2), ts(), vf(f, 2);
            }
          if (((f = bf(r)), f === null && lf(e, t, r, ps, a), f === s)) break;
          s = f;
        }
        s !== null && r.stopPropagation();
      } else lf(e, t, r, null, a);
    }
  }
  function bf(e) {
    return (e = xc(e)), _f(e);
  }
  var ps = null;
  function _f(e) {
    if (((ps = null), (e = wl(e)), e !== null)) {
      var t = o(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = d(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (ps = e), null;
  }
  function _p(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (uc()) {
          case ou:
            return 2;
          case sc:
            return 8;
          case Ga:
          case z:
            return 32;
          case $:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Sf = !1,
    Na = null,
    Da = null,
    ja = null,
    hi = new Map(),
    mi = new Map(),
    za = [],
    Db =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Sp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Na = null;
        break;
      case "dragenter":
      case "dragleave":
        Da = null;
        break;
      case "mouseover":
      case "mouseout":
        ja = null;
        break;
      case "pointerover":
      case "pointerout":
        hi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        mi.delete(t.pointerId);
    }
  }
  function yi(e, t, a, r, s, f) {
    return e === null || e.nativeEvent !== f
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: r,
          nativeEvent: f,
          targetContainers: [s],
        }),
        t !== null && ((t = Tl(t)), t !== null && bp(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function jb(e, t, a, r, s) {
    switch (t) {
      case "focusin":
        return (Na = yi(Na, e, t, a, r, s)), !0;
      case "dragenter":
        return (Da = yi(Da, e, t, a, r, s)), !0;
      case "mouseover":
        return (ja = yi(ja, e, t, a, r, s)), !0;
      case "pointerover":
        var f = s.pointerId;
        return hi.set(f, yi(hi.get(f) || null, e, t, a, r, s)), !0;
      case "gotpointercapture":
        return (
          (f = s.pointerId), mi.set(f, yi(mi.get(f) || null, e, t, a, r, s)), !0
        );
    }
    return !1;
  }
  function xp(e) {
    var t = wl(e.target);
    if (t !== null) {
      var a = o(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = d(a)), t !== null)) {
            (e.blockedOn = t),
              A0(e.priority, function () {
                if (a.tag === 13) {
                  var r = Ft();
                  r = fc(r);
                  var s = Ll(a, r);
                  s !== null && Jt(s, a, r), vf(a, r);
                }
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function vs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = bf(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var r = new a.constructor(a.type, a);
        (Sc = r), a.target.dispatchEvent(r), (Sc = null);
      } else return (t = Tl(a)), t !== null && bp(t), (e.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function Ep(e, t, a) {
    vs(e) && a.delete(t);
  }
  function zb() {
    (Sf = !1),
      Na !== null && vs(Na) && (Na = null),
      Da !== null && vs(Da) && (Da = null),
      ja !== null && vs(ja) && (ja = null),
      hi.forEach(Ep),
      mi.forEach(Ep);
  }
  function gs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Sf ||
        ((Sf = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, zb)));
  }
  var bs = null;
  function wp(e) {
    bs !== e &&
      ((bs = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        bs === e && (bs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            r = e[t + 1],
            s = e[t + 2];
          if (typeof r != "function") {
            if (_f(r || a) === null) continue;
            break;
          }
          var f = Tl(a);
          f !== null &&
            (e.splice(t, 3),
            (t -= 3),
            bo(f, { pending: !0, data: s, method: a.method, action: r }, r, s));
        }
      }));
  }
  function pi(e) {
    function t(C) {
      return gs(C, e);
    }
    Na !== null && gs(Na, e),
      Da !== null && gs(Da, e),
      ja !== null && gs(ja, e),
      hi.forEach(t),
      mi.forEach(t);
    for (var a = 0; a < za.length; a++) {
      var r = za[a];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < za.length && ((a = za[0]), a.blockedOn === null); )
      xp(a), a.blockedOn === null && za.shift();
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (r = 0; r < a.length; r += 3) {
        var s = a[r],
          f = a[r + 1],
          p = s[kt] || null;
        if (typeof f == "function") p || wp(a);
        else if (p) {
          var g = null;
          if (f && f.hasAttribute("formAction")) {
            if (((s = f), (p = f[kt] || null))) g = p.formAction;
            else if (_f(s) !== null) continue;
          } else g = p.action;
          typeof g == "function" ? (a[r + 1] = g) : (a.splice(r, 3), (r -= 3)),
            wp(a);
        }
      }
  }
  function xf(e) {
    this._internalRoot = e;
  }
  (_s.prototype.render = xf.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var a = t.current,
        r = Ft();
      vp(a, r, e, t, null, null);
    }),
    (_s.prototype.unmount = xf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          vp(e.current, 2, null, e, null, null), ts(), (t[El] = null);
        }
      });
  function _s(e) {
    this._internalRoot = e;
  }
  _s.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Hd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < za.length && t !== 0 && t < za[a].priority; a++);
      za.splice(a, 0, e), a === 0 && xp(e);
    }
  };
  var Tp = l.version;
  if (Tp !== "19.1.0") throw Error(u(527, Tp, "19.1.0"));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(u(188))
        : ((e = Object.keys(e).join(",")), Error(u(268, e)));
    return (
      (e = y(t)),
      (e = e !== null ? m(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Ub = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ss = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ss.isDisabled && Ss.supportsFiber)
      try {
        (fe = Ss.inject(Ub)), (ue = Ss);
      } catch {}
  }
  return (
    (gi.createRoot = function (e, t) {
      if (!c(e)) throw Error(u(299));
      var a = !1,
        r = "",
        s = Hm,
        f = Zm,
        p = Qm,
        g = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (f = t.onCaughtError),
          t.onRecoverableError !== void 0 && (p = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (g = t.unstable_transitionCallbacks)),
        (t = yp(e, 1, !1, null, null, a, r, s, f, p, g, null)),
        (e[El] = t.current),
        af(e),
        new xf(t)
      );
    }),
    (gi.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(u(299));
      var r = !1,
        s = "",
        f = Hm,
        p = Zm,
        g = Qm,
        C = null,
        Y = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (r = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (f = a.onUncaughtError),
          a.onCaughtError !== void 0 && (p = a.onCaughtError),
          a.onRecoverableError !== void 0 && (g = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (C = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (Y = a.formState)),
        (t = yp(e, 1, !0, t, a ?? null, r, s, f, p, g, C, Y)),
        (t.context = pp(null)),
        (a = t.current),
        (r = Ft()),
        (r = fc(r)),
        (s = va(r)),
        (s.callback = null),
        ga(a, s, r),
        (a = r),
        (t.current.lanes = a),
        xr(t, a),
        Cn(t),
        (e[El] = t.current),
        af(e),
        new _s(t)
      );
    }),
    (gi.version = "19.1.0"),
    gi
  );
}
var Up;
function $b() {
  if (Up) return Af.exports;
  Up = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (Af.exports = Kb()), Af.exports;
}
var Fb = $b(),
  bi = {},
  kp;
function Jb() {
  if (kp) return bi;
  (kp = 1),
    Object.defineProperty(bi, "__esModule", { value: !0 }),
    (bi.parse = d),
    (bi.serialize = m);
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    l = /^[\u0021-\u003A\u003C-\u007E]*$/,
    i =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    u = /^[\u0020-\u003A\u003D-\u007E]*$/,
    c = Object.prototype.toString,
    o = (() => {
      const b = function () {};
      return (b.prototype = Object.create(null)), b;
    })();
  function d(b, E) {
    const w = new o(),
      N = b.length;
    if (N < 2) return w;
    const U = (E == null ? void 0 : E.decode) || v;
    let A = 0;
    do {
      const k = b.indexOf("=", A);
      if (k === -1) break;
      const _ = b.indexOf(";", A),
        S = _ === -1 ? N : _;
      if (k > S) {
        A = b.lastIndexOf(";", k - 1) + 1;
        continue;
      }
      const R = h(b, A, k),
        X = y(b, k, R),
        q = b.slice(R, X);
      if (w[q] === void 0) {
        let T = h(b, k + 1, S),
          M = y(b, S, T);
        const B = U(b.slice(T, M));
        w[q] = B;
      }
      A = S + 1;
    } while (A < N);
    return w;
  }
  function h(b, E, w) {
    do {
      const N = b.charCodeAt(E);
      if (N !== 32 && N !== 9) return E;
    } while (++E < w);
    return w;
  }
  function y(b, E, w) {
    for (; E > w; ) {
      const N = b.charCodeAt(--E);
      if (N !== 32 && N !== 9) return E + 1;
    }
    return w;
  }
  function m(b, E, w) {
    const N = (w == null ? void 0 : w.encode) || encodeURIComponent;
    if (!n.test(b)) throw new TypeError(`argument name is invalid: ${b}`);
    const U = N(E);
    if (!l.test(U)) throw new TypeError(`argument val is invalid: ${E}`);
    let A = b + "=" + U;
    if (!w) return A;
    if (w.maxAge !== void 0) {
      if (!Number.isInteger(w.maxAge))
        throw new TypeError(`option maxAge is invalid: ${w.maxAge}`);
      A += "; Max-Age=" + w.maxAge;
    }
    if (w.domain) {
      if (!i.test(w.domain))
        throw new TypeError(`option domain is invalid: ${w.domain}`);
      A += "; Domain=" + w.domain;
    }
    if (w.path) {
      if (!u.test(w.path))
        throw new TypeError(`option path is invalid: ${w.path}`);
      A += "; Path=" + w.path;
    }
    if (w.expires) {
      if (!x(w.expires) || !Number.isFinite(w.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${w.expires}`);
      A += "; Expires=" + w.expires.toUTCString();
    }
    if (
      (w.httpOnly && (A += "; HttpOnly"),
      w.secure && (A += "; Secure"),
      w.partitioned && (A += "; Partitioned"),
      w.priority)
    )
      switch (
        typeof w.priority == "string" ? w.priority.toLowerCase() : void 0
      ) {
        case "low":
          A += "; Priority=Low";
          break;
        case "medium":
          A += "; Priority=Medium";
          break;
        case "high":
          A += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${w.priority}`);
      }
    if (w.sameSite)
      switch (
        typeof w.sameSite == "string" ? w.sameSite.toLowerCase() : w.sameSite
      ) {
        case !0:
        case "strict":
          A += "; SameSite=Strict";
          break;
        case "lax":
          A += "; SameSite=Lax";
          break;
        case "none":
          A += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${w.sameSite}`);
      }
    return A;
  }
  function v(b) {
    if (b.indexOf("%") === -1) return b;
    try {
      return decodeURIComponent(b);
    } catch {
      return b;
    }
  }
  function x(b) {
    return c.call(b) === "[object Date]";
  }
  return bi;
}
Jb();
/**
 * react-router v7.5.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Lp = "popstate";
function Pb(n = {}) {
  function l(u, c) {
    let { pathname: o, search: d, hash: h } = u.location;
    return Ff(
      "",
      { pathname: o, search: d, hash: h },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default"
    );
  }
  function i(u, c) {
    return typeof c == "string" ? c : zi(c);
  }
  return Ib(l, i, null, n);
}
function Pe(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
function bn(n, l) {
  if (!n) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function Wb() {
  return Math.random().toString(36).substring(2, 10);
}
function qp(n, l) {
  return { usr: n.state, key: n.key, idx: l };
}
function Ff(n, l, i = null, u) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? br(l) : l),
    state: i,
    key: (l && l.key) || u || Wb(),
  };
}
function zi({ pathname: n = "/", search: l = "", hash: i = "" }) {
  return (
    l && l !== "?" && (n += l.charAt(0) === "?" ? l : "?" + l),
    i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i),
    n
  );
}
function br(n) {
  let l = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && ((l.hash = n.substring(i)), (n = n.substring(0, i)));
    let u = n.indexOf("?");
    u >= 0 && ((l.search = n.substring(u)), (n = n.substring(0, u))),
      n && (l.pathname = n);
  }
  return l;
}
function Ib(n, l, i, u = {}) {
  let { window: c = document.defaultView, v5Compat: o = !1 } = u,
    d = c.history,
    h = "POP",
    y = null,
    m = v();
  m == null && ((m = 0), d.replaceState({ ...d.state, idx: m }, ""));
  function v() {
    return (d.state || { idx: null }).idx;
  }
  function x() {
    h = "POP";
    let U = v(),
      A = U == null ? null : U - m;
    (m = U), y && y({ action: h, location: N.location, delta: A });
  }
  function b(U, A) {
    h = "PUSH";
    let k = Ff(N.location, U, A);
    m = v() + 1;
    let _ = qp(k, m),
      S = N.createHref(k);
    try {
      d.pushState(_, "", S);
    } catch (R) {
      if (R instanceof DOMException && R.name === "DataCloneError") throw R;
      c.location.assign(S);
    }
    o && y && y({ action: h, location: N.location, delta: 1 });
  }
  function E(U, A) {
    h = "REPLACE";
    let k = Ff(N.location, U, A);
    m = v();
    let _ = qp(k, m),
      S = N.createHref(k);
    d.replaceState(_, "", S),
      o && y && y({ action: h, location: N.location, delta: 0 });
  }
  function w(U) {
    let A = c.location.origin !== "null" ? c.location.origin : c.location.href,
      k = typeof U == "string" ? U : zi(U);
    return (
      (k = k.replace(/ $/, "%20")),
      Pe(
        A,
        `No window.location.(origin|href) available to create URL for href: ${k}`
      ),
      new URL(k, A)
    );
  }
  let N = {
    get action() {
      return h;
    },
    get location() {
      return n(c, d);
    },
    listen(U) {
      if (y) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Lp, x),
        (y = U),
        () => {
          c.removeEventListener(Lp, x), (y = null);
        }
      );
    },
    createHref(U) {
      return l(c, U);
    },
    createURL: w,
    encodeLocation(U) {
      let A = w(U);
      return { pathname: A.pathname, search: A.search, hash: A.hash };
    },
    push: b,
    replace: E,
    go(U) {
      return d.go(U);
    },
  };
  return N;
}
function Jv(n, l, i = "/") {
  return e_(n, l, i, !1);
}
function e_(n, l, i, u) {
  let c = typeof l == "string" ? br(l) : l,
    o = ua(c.pathname || "/", i);
  if (o == null) return null;
  let d = Pv(n);
  t_(d);
  let h = null;
  for (let y = 0; h == null && y < d.length; ++y) {
    let m = d_(o);
    h = o_(d[y], m, u);
  }
  return h;
}
function Pv(n, l = [], i = [], u = "") {
  let c = (o, d, h) => {
    let y = {
      relativePath: h === void 0 ? o.path || "" : h,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: d,
      route: o,
    };
    y.relativePath.startsWith("/") &&
      (Pe(
        y.relativePath.startsWith(u),
        `Absolute route path "${y.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (y.relativePath = y.relativePath.slice(u.length)));
    let m = ia([u, y.relativePath]),
      v = i.concat(y);
    o.children &&
      o.children.length > 0 &&
      (Pe(
        o.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
      ),
      Pv(o.children, l, v, m)),
      !(o.path == null && !o.index) &&
        l.push({ path: m, score: s_(m, o.index), routesMeta: v });
  };
  return (
    n.forEach((o, d) => {
      var h;
      if (o.path === "" || !((h = o.path) != null && h.includes("?"))) c(o, d);
      else for (let y of Wv(o.path)) c(o, d, y);
    }),
    l
  );
}
function Wv(n) {
  let l = n.split("/");
  if (l.length === 0) return [];
  let [i, ...u] = l,
    c = i.endsWith("?"),
    o = i.replace(/\?$/, "");
  if (u.length === 0) return c ? [o, ""] : [o];
  let d = Wv(u.join("/")),
    h = [];
  return (
    h.push(...d.map((y) => (y === "" ? o : [o, y].join("/")))),
    c && h.push(...d),
    h.map((y) => (n.startsWith("/") && y === "" ? "/" : y))
  );
}
function t_(n) {
  n.sort((l, i) =>
    l.score !== i.score
      ? i.score - l.score
      : c_(
          l.routesMeta.map((u) => u.childrenIndex),
          i.routesMeta.map((u) => u.childrenIndex)
        )
  );
}
var n_ = /^:[\w-]+$/,
  a_ = 3,
  l_ = 2,
  r_ = 1,
  i_ = 10,
  u_ = -2,
  Bp = (n) => n === "*";
function s_(n, l) {
  let i = n.split("/"),
    u = i.length;
  return (
    i.some(Bp) && (u += u_),
    l && (u += l_),
    i
      .filter((c) => !Bp(c))
      .reduce((c, o) => c + (n_.test(o) ? a_ : o === "" ? r_ : i_), u)
  );
}
function c_(n, l) {
  return n.length === l.length && n.slice(0, -1).every((u, c) => u === l[c])
    ? n[n.length - 1] - l[l.length - 1]
    : 0;
}
function o_(n, l, i = !1) {
  let { routesMeta: u } = n,
    c = {},
    o = "/",
    d = [];
  for (let h = 0; h < u.length; ++h) {
    let y = u[h],
      m = h === u.length - 1,
      v = o === "/" ? l : l.slice(o.length) || "/",
      x = Ds(
        { path: y.relativePath, caseSensitive: y.caseSensitive, end: m },
        v
      ),
      b = y.route;
    if (
      (!x &&
        m &&
        i &&
        !u[u.length - 1].route.index &&
        (x = Ds(
          { path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 },
          v
        )),
      !x)
    )
      return null;
    Object.assign(c, x.params),
      d.push({
        params: c,
        pathname: ia([o, x.pathname]),
        pathnameBase: p_(ia([o, x.pathnameBase])),
        route: b,
      }),
      x.pathnameBase !== "/" && (o = ia([o, x.pathnameBase]));
  }
  return d;
}
function Ds(n, l) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, u] = f_(n.path, n.caseSensitive, n.end),
    c = l.match(i);
  if (!c) return null;
  let o = c[0],
    d = o.replace(/(.)\/+$/, "$1"),
    h = c.slice(1);
  return {
    params: u.reduce((m, { paramName: v, isOptional: x }, b) => {
      if (v === "*") {
        let w = h[b] || "";
        d = o.slice(0, o.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const E = h[b];
      return (
        x && !E ? (m[v] = void 0) : (m[v] = (E || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: o,
    pathnameBase: d,
    pattern: n,
  };
}
function f_(n, l = !1, i = !0) {
  bn(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let u = [],
    c =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (d, h, y) => (
            u.push({ paramName: h, isOptional: y != null }),
            y ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    n.endsWith("*")
      ? (u.push({ paramName: "*" }),
        (c += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
      ? (c += "\\/*$")
      : n !== "" && n !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, l ? void 0 : "i"), u]
  );
}
function d_(n) {
  try {
    return n
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      bn(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`
      ),
      n
    );
  }
}
function ua(n, l) {
  if (l === "/") return n;
  if (!n.toLowerCase().startsWith(l.toLowerCase())) return null;
  let i = l.endsWith("/") ? l.length - 1 : l.length,
    u = n.charAt(i);
  return u && u !== "/" ? null : n.slice(i) || "/";
}
function h_(n, l = "/") {
  let {
    pathname: i,
    search: u = "",
    hash: c = "",
  } = typeof n == "string" ? br(n) : n;
  return {
    pathname: i ? (i.startsWith("/") ? i : m_(i, l)) : l,
    search: v_(u),
    hash: g_(c),
  };
}
function m_(n, l) {
  let i = l.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((c) => {
      c === ".." ? i.length > 1 && i.pop() : c !== "." && i.push(c);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Mf(n, l, i, u) {
  return `Cannot include a '${n}' character in a manually specified \`to.${l}\` field [${JSON.stringify(
    u
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function y_(n) {
  return n.filter(
    (l, i) => i === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function hd(n) {
  let l = y_(n);
  return l.map((i, u) => (u === l.length - 1 ? i.pathname : i.pathnameBase));
}
function md(n, l, i, u = !1) {
  let c;
  typeof n == "string"
    ? (c = br(n))
    : ((c = { ...n }),
      Pe(
        !c.pathname || !c.pathname.includes("?"),
        Mf("?", "pathname", "search", c)
      ),
      Pe(
        !c.pathname || !c.pathname.includes("#"),
        Mf("#", "pathname", "hash", c)
      ),
      Pe(!c.search || !c.search.includes("#"), Mf("#", "search", "hash", c)));
  let o = n === "" || c.pathname === "",
    d = o ? "/" : c.pathname,
    h;
  if (d == null) h = i;
  else {
    let x = l.length - 1;
    if (!u && d.startsWith("..")) {
      let b = d.split("/");
      for (; b[0] === ".."; ) b.shift(), (x -= 1);
      c.pathname = b.join("/");
    }
    h = x >= 0 ? l[x] : "/";
  }
  let y = h_(c, h),
    m = d && d !== "/" && d.endsWith("/"),
    v = (o || d === ".") && i.endsWith("/");
  return !y.pathname.endsWith("/") && (m || v) && (y.pathname += "/"), y;
}
var ia = (n) => n.join("/").replace(/\/\/+/g, "/"),
  p_ = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  v_ = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  g_ = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function b_(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var Iv = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Iv);
var __ = ["GET", ...Iv];
new Set(__);
var _r = j.createContext(null);
_r.displayName = "DataRouter";
var Ws = j.createContext(null);
Ws.displayName = "DataRouterState";
var eg = j.createContext({ isTransitioning: !1 });
eg.displayName = "ViewTransition";
var S_ = j.createContext(new Map());
S_.displayName = "Fetchers";
var x_ = j.createContext(null);
x_.displayName = "Await";
var xn = j.createContext(null);
xn.displayName = "Navigation";
var eu = j.createContext(null);
eu.displayName = "Location";
var En = j.createContext({ outlet: null, matches: [], isDataRoute: !1 });
En.displayName = "Route";
var yd = j.createContext(null);
yd.displayName = "RouteError";
function E_(n, { relative: l } = {}) {
  Pe(
    Sr(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: u } = j.useContext(xn),
    { hash: c, pathname: o, search: d } = tu(n, { relative: l }),
    h = o;
  return (
    i !== "/" && (h = o === "/" ? i : ia([i, o])),
    u.createHref({ pathname: h, search: d, hash: c })
  );
}
function Sr() {
  return j.useContext(eu) != null;
}
function kn() {
  return (
    Pe(
      Sr(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    j.useContext(eu).location
  );
}
var tg =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ng(n) {
  j.useContext(xn).static || j.useLayoutEffect(n);
}
function ag() {
  let { isDataRoute: n } = j.useContext(En);
  return n ? q_() : w_();
}
function w_() {
  Pe(
    Sr(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = j.useContext(_r),
    { basename: l, navigator: i } = j.useContext(xn),
    { matches: u } = j.useContext(En),
    { pathname: c } = kn(),
    o = JSON.stringify(hd(u)),
    d = j.useRef(!1);
  return (
    ng(() => {
      d.current = !0;
    }),
    j.useCallback(
      (y, m = {}) => {
        if ((bn(d.current, tg), !d.current)) return;
        if (typeof y == "number") {
          i.go(y);
          return;
        }
        let v = md(y, JSON.parse(o), c, m.relative === "path");
        n == null &&
          l !== "/" &&
          (v.pathname = v.pathname === "/" ? l : ia([l, v.pathname])),
          (m.replace ? i.replace : i.push)(v, m.state, m);
      },
      [l, i, o, c, n]
    )
  );
}
var T_ = j.createContext(null);
function A_(n) {
  let l = j.useContext(En).outlet;
  return l && j.createElement(T_.Provider, { value: n }, l);
}
function tu(n, { relative: l } = {}) {
  let { matches: i } = j.useContext(En),
    { pathname: u } = kn(),
    c = JSON.stringify(hd(i));
  return j.useMemo(() => md(n, JSON.parse(c), u, l === "path"), [n, c, u, l]);
}
function R_(n, l) {
  return lg(n, l);
}
function lg(n, l, i, u) {
  var k;
  Pe(
    Sr(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: c, static: o } = j.useContext(xn),
    { matches: d } = j.useContext(En),
    h = d[d.length - 1],
    y = h ? h.params : {},
    m = h ? h.pathname : "/",
    v = h ? h.pathnameBase : "/",
    x = h && h.route;
  {
    let _ = (x && x.path) || "";
    rg(
      m,
      !x || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${
        _ === "/" ? "*" : `${_}/*`
      }">.`
    );
  }
  let b = kn(),
    E;
  if (l) {
    let _ = typeof l == "string" ? br(l) : l;
    Pe(
      v === "/" || ((k = _.pathname) == null ? void 0 : k.startsWith(v)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${_.pathname}" was given in the \`location\` prop.`
    ),
      (E = _);
  } else E = b;
  let w = E.pathname || "/",
    N = w;
  if (v !== "/") {
    let _ = v.replace(/^\//, "").split("/");
    N = "/" + w.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let U =
    !o && i && i.matches && i.matches.length > 0
      ? i.matches
      : Jv(n, { pathname: N });
  bn(
    x || U != null,
    `No routes matched location "${E.pathname}${E.search}${E.hash}" `
  ),
    bn(
      U == null ||
        U[U.length - 1].route.element !== void 0 ||
        U[U.length - 1].route.Component !== void 0 ||
        U[U.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${E.pathname}${E.search}${E.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let A = D_(
    U &&
      U.map((_) =>
        Object.assign({}, _, {
          params: Object.assign({}, y, _.params),
          pathname: ia([
            v,
            c.encodeLocation
              ? c.encodeLocation(_.pathname).pathname
              : _.pathname,
          ]),
          pathnameBase:
            _.pathnameBase === "/"
              ? v
              : ia([
                  v,
                  c.encodeLocation
                    ? c.encodeLocation(_.pathnameBase).pathname
                    : _.pathnameBase,
                ]),
        })
      ),
    d,
    i,
    u
  );
  return l && A
    ? j.createElement(
        eu.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...E,
            },
            navigationType: "POP",
          },
        },
        A
      )
    : A;
}
function O_() {
  let n = L_(),
    l = b_(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
      ? n.message
      : JSON.stringify(n),
    i = n instanceof Error ? n.stack : null,
    u = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: u },
    o = { padding: "2px 4px", backgroundColor: u },
    d = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (d = j.createElement(
      j.Fragment,
      null,
      j.createElement("p", null, "💿 Hey developer 👋"),
      j.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        j.createElement("code", { style: o }, "ErrorBoundary"),
        " or",
        " ",
        j.createElement("code", { style: o }, "errorElement"),
        " prop on your route."
      )
    )),
    j.createElement(
      j.Fragment,
      null,
      j.createElement("h2", null, "Unexpected Application Error!"),
      j.createElement("h3", { style: { fontStyle: "italic" } }, l),
      i ? j.createElement("pre", { style: c }, i) : null,
      d
    )
  );
}
var C_ = j.createElement(O_, null),
  M_ = class extends j.Component {
    constructor(n) {
      super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        });
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, l) {
      return l.location !== n.location ||
        (l.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : l.error,
            location: l.location,
            revalidation: n.revalidation || l.revalidation,
          };
    }
    componentDidCatch(n, l) {
      console.error(
        "React Router caught the following error during render",
        n,
        l
      );
    }
    render() {
      return this.state.error !== void 0
        ? j.createElement(
            En.Provider,
            { value: this.props.routeContext },
            j.createElement(yd.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function N_({ routeContext: n, match: l, children: i }) {
  let u = j.useContext(_r);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = l.route.id),
    j.createElement(En.Provider, { value: n }, i)
  );
}
function D_(n, l = [], i = null, u = null) {
  if (n == null) {
    if (!i) return null;
    if (i.errors) n = i.matches;
    else if (l.length === 0 && !i.initialized && i.matches.length > 0)
      n = i.matches;
    else return null;
  }
  let c = n,
    o = i == null ? void 0 : i.errors;
  if (o != null) {
    let y = c.findIndex(
      (m) => m.route.id && (o == null ? void 0 : o[m.route.id]) !== void 0
    );
    Pe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        o
      ).join(",")}`
    ),
      (c = c.slice(0, Math.min(c.length, y + 1)));
  }
  let d = !1,
    h = -1;
  if (i)
    for (let y = 0; y < c.length; y++) {
      let m = c[y];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (h = y),
        m.route.id)
      ) {
        let { loaderData: v, errors: x } = i,
          b =
            m.route.loader &&
            !v.hasOwnProperty(m.route.id) &&
            (!x || x[m.route.id] === void 0);
        if (m.route.lazy || b) {
          (d = !0), h >= 0 ? (c = c.slice(0, h + 1)) : (c = [c[0]]);
          break;
        }
      }
    }
  return c.reduceRight((y, m, v) => {
    let x,
      b = !1,
      E = null,
      w = null;
    i &&
      ((x = o && m.route.id ? o[m.route.id] : void 0),
      (E = m.route.errorElement || C_),
      d &&
        (h < 0 && v === 0
          ? (rg(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (b = !0),
            (w = null))
          : h === v &&
            ((b = !0), (w = m.route.hydrateFallbackElement || null))));
    let N = l.concat(c.slice(0, v + 1)),
      U = () => {
        let A;
        return (
          x
            ? (A = E)
            : b
            ? (A = w)
            : m.route.Component
            ? (A = j.createElement(m.route.Component, null))
            : m.route.element
            ? (A = m.route.element)
            : (A = y),
          j.createElement(N_, {
            match: m,
            routeContext: { outlet: y, matches: N, isDataRoute: i != null },
            children: A,
          })
        );
      };
    return i && (m.route.ErrorBoundary || m.route.errorElement || v === 0)
      ? j.createElement(M_, {
          location: i.location,
          revalidation: i.revalidation,
          component: E,
          error: x,
          children: U(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
        })
      : U();
  }, null);
}
function pd(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function j_(n) {
  let l = j.useContext(_r);
  return Pe(l, pd(n)), l;
}
function z_(n) {
  let l = j.useContext(Ws);
  return Pe(l, pd(n)), l;
}
function U_(n) {
  let l = j.useContext(En);
  return Pe(l, pd(n)), l;
}
function vd(n) {
  let l = U_(n),
    i = l.matches[l.matches.length - 1];
  return (
    Pe(
      i.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    i.route.id
  );
}
function k_() {
  return vd("useRouteId");
}
function L_() {
  var u;
  let n = j.useContext(yd),
    l = z_("useRouteError"),
    i = vd("useRouteError");
  return n !== void 0 ? n : (u = l.errors) == null ? void 0 : u[i];
}
function q_() {
  let { router: n } = j_("useNavigate"),
    l = vd("useNavigate"),
    i = j.useRef(!1);
  return (
    ng(() => {
      i.current = !0;
    }),
    j.useCallback(
      async (c, o = {}) => {
        bn(i.current, tg),
          i.current &&
            (typeof c == "number"
              ? n.navigate(c)
              : await n.navigate(c, { fromRouteId: l, ...o }));
      },
      [n, l]
    )
  );
}
var Vp = {};
function rg(n, l, i) {
  !l && !Vp[n] && ((Vp[n] = !0), bn(!1, i));
}
j.memo(B_);
function B_({ routes: n, future: l, state: i }) {
  return lg(n, void 0, i, l);
}
function ig({ to: n, replace: l, state: i, relative: u }) {
  Pe(
    Sr(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: c } = j.useContext(xn);
  bn(
    !c,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: o } = j.useContext(En),
    { pathname: d } = kn(),
    h = ag(),
    y = md(n, hd(o), d, u === "path"),
    m = JSON.stringify(y);
  return (
    j.useEffect(() => {
      h(JSON.parse(m), { replace: l, state: i, relative: u });
    }, [h, m, u, l, i]),
    null
  );
}
function ug(n) {
  return A_(n.context);
}
function ka(n) {
  Pe(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function V_({
  basename: n = "/",
  children: l = null,
  location: i,
  navigationType: u = "POP",
  navigator: c,
  static: o = !1,
}) {
  Pe(
    !Sr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = n.replace(/^\/*/, "/"),
    h = j.useMemo(
      () => ({ basename: d, navigator: c, static: o, future: {} }),
      [d, c, o]
    );
  typeof i == "string" && (i = br(i));
  let {
      pathname: y = "/",
      search: m = "",
      hash: v = "",
      state: x = null,
      key: b = "default",
    } = i,
    E = j.useMemo(() => {
      let w = ua(y, d);
      return w == null
        ? null
        : {
            location: { pathname: w, search: m, hash: v, state: x, key: b },
            navigationType: u,
          };
    }, [d, y, m, v, x, b, u]);
  return (
    bn(
      E != null,
      `<Router basename="${d}"> is not able to match the URL "${y}${m}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    E == null
      ? null
      : j.createElement(
          xn.Provider,
          { value: h },
          j.createElement(eu.Provider, { children: l, value: E })
        )
  );
}
function H_({ children: n, location: l }) {
  return R_(Jf(n), l);
}
function Jf(n, l = []) {
  let i = [];
  return (
    j.Children.forEach(n, (u, c) => {
      if (!j.isValidElement(u)) return;
      let o = [...l, c];
      if (u.type === j.Fragment) {
        i.push.apply(i, Jf(u.props.children, o));
        return;
      }
      Pe(
        u.type === ka,
        `[${
          typeof u.type == "string" ? u.type : u.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Pe(
          !u.props.index || !u.props.children,
          "An index route cannot have child routes."
        );
      let d = {
        id: u.props.id || o.join("-"),
        caseSensitive: u.props.caseSensitive,
        element: u.props.element,
        Component: u.props.Component,
        index: u.props.index,
        path: u.props.path,
        loader: u.props.loader,
        action: u.props.action,
        hydrateFallbackElement: u.props.hydrateFallbackElement,
        HydrateFallback: u.props.HydrateFallback,
        errorElement: u.props.errorElement,
        ErrorBoundary: u.props.ErrorBoundary,
        hasErrorBoundary:
          u.props.hasErrorBoundary === !0 ||
          u.props.ErrorBoundary != null ||
          u.props.errorElement != null,
        shouldRevalidate: u.props.shouldRevalidate,
        handle: u.props.handle,
        lazy: u.props.lazy,
      };
      u.props.children && (d.children = Jf(u.props.children, o)), i.push(d);
    }),
    i
  );
}
var Cs = "get",
  Ms = "application/x-www-form-urlencoded";
function Is(n) {
  return n != null && typeof n.tagName == "string";
}
function Z_(n) {
  return Is(n) && n.tagName.toLowerCase() === "button";
}
function Q_(n) {
  return Is(n) && n.tagName.toLowerCase() === "form";
}
function Y_(n) {
  return Is(n) && n.tagName.toLowerCase() === "input";
}
function G_(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function X_(n, l) {
  return n.button === 0 && (!l || l === "_self") && !G_(n);
}
var xs = null;
function K_() {
  if (xs === null)
    try {
      new FormData(document.createElement("form"), 0), (xs = !1);
    } catch {
      xs = !0;
    }
  return xs;
}
var $_ = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Nf(n) {
  return n != null && !$_.has(n)
    ? (bn(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ms}"`
      ),
      null)
    : n;
}
function F_(n, l) {
  let i, u, c, o, d;
  if (Q_(n)) {
    let h = n.getAttribute("action");
    (u = h ? ua(h, l) : null),
      (i = n.getAttribute("method") || Cs),
      (c = Nf(n.getAttribute("enctype")) || Ms),
      (o = new FormData(n));
  } else if (Z_(n) || (Y_(n) && (n.type === "submit" || n.type === "image"))) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = n.getAttribute("formaction") || h.getAttribute("action");
    if (
      ((u = y ? ua(y, l) : null),
      (i = n.getAttribute("formmethod") || h.getAttribute("method") || Cs),
      (c =
        Nf(n.getAttribute("formenctype")) ||
        Nf(h.getAttribute("enctype")) ||
        Ms),
      (o = new FormData(h, n)),
      !K_())
    ) {
      let { name: m, type: v, value: x } = n;
      if (v === "image") {
        let b = m ? `${m}.` : "";
        o.append(`${b}x`, "0"), o.append(`${b}y`, "0");
      } else m && o.append(m, x);
    }
  } else {
    if (Is(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (i = Cs), (u = null), (c = Ms), (d = n);
  }
  return (
    o && c === "text/plain" && ((d = o), (o = void 0)),
    { action: u, method: i.toLowerCase(), encType: c, formData: o, body: d }
  );
}
function gd(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
async function J_(n, l) {
  if (n.id in l) return l[n.id];
  try {
    let i = await import(n.module);
    return (l[n.id] = i), i;
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function P_(n) {
  return n == null
    ? !1
    : n.href == null
    ? n.rel === "preload" &&
      typeof n.imageSrcSet == "string" &&
      typeof n.imageSizes == "string"
    : typeof n.rel == "string" && typeof n.href == "string";
}
async function W_(n, l, i) {
  let u = await Promise.all(
    n.map(async (c) => {
      let o = l.routes[c.route.id];
      if (o) {
        let d = await J_(o, i);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return n2(
    u
      .flat(1)
      .filter(P_)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" }
      )
  );
}
function Hp(n, l, i, u, c, o) {
  let d = (y, m) => (i[m] ? y.route.id !== i[m].route.id : !0),
    h = (y, m) => {
      var v;
      return (
        i[m].pathname !== y.pathname ||
        (((v = i[m].route.path) == null ? void 0 : v.endsWith("*")) &&
          i[m].params["*"] !== y.params["*"])
      );
    };
  return o === "assets"
    ? l.filter((y, m) => d(y, m) || h(y, m))
    : o === "data"
    ? l.filter((y, m) => {
        var x;
        let v = u.routes[y.route.id];
        if (!v || !v.hasLoader) return !1;
        if (d(y, m) || h(y, m)) return !0;
        if (y.route.shouldRevalidate) {
          let b = y.route.shouldRevalidate({
            currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
            currentParams: ((x = i[0]) == null ? void 0 : x.params) || {},
            nextUrl: new URL(n, window.origin),
            nextParams: y.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof b == "boolean") return b;
        }
        return !0;
      })
    : [];
}
function I_(n, l, { includeHydrateFallback: i } = {}) {
  return e2(
    n
      .map((u) => {
        let c = l.routes[u.route.id];
        if (!c) return [];
        let o = [c.module];
        return (
          c.clientActionModule && (o = o.concat(c.clientActionModule)),
          c.clientLoaderModule && (o = o.concat(c.clientLoaderModule)),
          i &&
            c.hydrateFallbackModule &&
            (o = o.concat(c.hydrateFallbackModule)),
          c.imports && (o = o.concat(c.imports)),
          o
        );
      })
      .flat(1)
  );
}
function e2(n) {
  return [...new Set(n)];
}
function t2(n) {
  let l = {},
    i = Object.keys(n).sort();
  for (let u of i) l[u] = n[u];
  return l;
}
function n2(n, l) {
  let i = new Set();
  return (
    new Set(l),
    n.reduce((u, c) => {
      let o = JSON.stringify(t2(c));
      return i.has(o) || (i.add(o), u.push({ key: o, link: c })), u;
    }, [])
  );
}
function a2(n, l) {
  let i =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : n;
  return (
    i.pathname === "/"
      ? (i.pathname = "_root.data")
      : l && ua(i.pathname, l) === "/"
      ? (i.pathname = `${l.replace(/\/$/, "")}/_root.data`)
      : (i.pathname = `${i.pathname.replace(/\/$/, "")}.data`),
    i
  );
}
function sg() {
  let n = j.useContext(_r);
  return (
    gd(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    n
  );
}
function l2() {
  let n = j.useContext(Ws);
  return (
    gd(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    n
  );
}
var bd = j.createContext(void 0);
bd.displayName = "FrameworkContext";
function cg() {
  let n = j.useContext(bd);
  return (
    gd(n, "You must render this element inside a <HydratedRouter> element"), n
  );
}
function r2(n, l) {
  let i = j.useContext(bd),
    [u, c] = j.useState(!1),
    [o, d] = j.useState(!1),
    {
      onFocus: h,
      onBlur: y,
      onMouseEnter: m,
      onMouseLeave: v,
      onTouchStart: x,
    } = l,
    b = j.useRef(null);
  j.useEffect(() => {
    if ((n === "render" && d(!0), n === "viewport")) {
      let N = (A) => {
          A.forEach((k) => {
            d(k.isIntersecting);
          });
        },
        U = new IntersectionObserver(N, { threshold: 0.5 });
      return (
        b.current && U.observe(b.current),
        () => {
          U.disconnect();
        }
      );
    }
  }, [n]),
    j.useEffect(() => {
      if (u) {
        let N = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(N);
        };
      }
    }, [u]);
  let E = () => {
      c(!0);
    },
    w = () => {
      c(!1), d(!1);
    };
  return i
    ? n !== "intent"
      ? [o, b, {}]
      : [
          o,
          b,
          {
            onFocus: _i(h, E),
            onBlur: _i(y, w),
            onMouseEnter: _i(m, E),
            onMouseLeave: _i(v, w),
            onTouchStart: _i(x, E),
          },
        ]
    : [!1, b, {}];
}
function _i(n, l) {
  return (i) => {
    n && n(i), i.defaultPrevented || l(i);
  };
}
function i2({ page: n, ...l }) {
  let { router: i } = sg(),
    u = j.useMemo(() => Jv(i.routes, n, i.basename), [i.routes, n, i.basename]);
  return u ? j.createElement(s2, { page: n, matches: u, ...l }) : null;
}
function u2(n) {
  let { manifest: l, routeModules: i } = cg(),
    [u, c] = j.useState([]);
  return (
    j.useEffect(() => {
      let o = !1;
      return (
        W_(n, l, i).then((d) => {
          o || c(d);
        }),
        () => {
          o = !0;
        }
      );
    }, [n, l, i]),
    u
  );
}
function s2({ page: n, matches: l, ...i }) {
  let u = kn(),
    { manifest: c, routeModules: o } = cg(),
    { basename: d } = sg(),
    { loaderData: h, matches: y } = l2(),
    m = j.useMemo(() => Hp(n, l, y, c, u, "data"), [n, l, y, c, u]),
    v = j.useMemo(() => Hp(n, l, y, c, u, "assets"), [n, l, y, c, u]),
    x = j.useMemo(() => {
      if (n === u.pathname + u.search + u.hash) return [];
      let w = new Set(),
        N = !1;
      if (
        (l.forEach((A) => {
          var _;
          let k = c.routes[A.route.id];
          !k ||
            !k.hasLoader ||
            ((!m.some((S) => S.route.id === A.route.id) &&
              A.route.id in h &&
              (_ = o[A.route.id]) != null &&
              _.shouldRevalidate) ||
            k.hasClientLoader
              ? (N = !0)
              : w.add(A.route.id));
        }),
        w.size === 0)
      )
        return [];
      let U = a2(n, d);
      return (
        N &&
          w.size > 0 &&
          U.searchParams.set(
            "_routes",
            l
              .filter((A) => w.has(A.route.id))
              .map((A) => A.route.id)
              .join(",")
          ),
        [U.pathname + U.search]
      );
    }, [d, h, u, c, m, l, n, o]),
    b = j.useMemo(() => I_(v, c), [v, c]),
    E = u2(v);
  return j.createElement(
    j.Fragment,
    null,
    x.map((w) =>
      j.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...i,
      })
    ),
    b.map((w) =>
      j.createElement("link", { key: w, rel: "modulepreload", href: w, ...i })
    ),
    E.map(({ key: w, link: N }) => j.createElement("link", { key: w, ...N }))
  );
}
function c2(...n) {
  return (l) => {
    n.forEach((i) => {
      typeof i == "function" ? i(l) : i != null && (i.current = l);
    });
  };
}
var og =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  og && (window.__reactRouterVersion = "7.5.0");
} catch {}
function o2({ basename: n, children: l, window: i }) {
  let u = j.useRef();
  u.current == null && (u.current = Pb({ window: i, v5Compat: !0 }));
  let c = u.current,
    [o, d] = j.useState({ action: c.action, location: c.location }),
    h = j.useCallback(
      (y) => {
        j.startTransition(() => d(y));
      },
      [d]
    );
  return (
    j.useLayoutEffect(() => c.listen(h), [c, h]),
    j.createElement(V_, {
      basename: n,
      children: l,
      location: o.location,
      navigationType: o.action,
      navigator: c,
    })
  );
}
var fg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ec = j.forwardRef(function (
    {
      onClick: l,
      discover: i = "render",
      prefetch: u = "none",
      relative: c,
      reloadDocument: o,
      replace: d,
      state: h,
      target: y,
      to: m,
      preventScrollReset: v,
      viewTransition: x,
      ...b
    },
    E
  ) {
    let { basename: w } = j.useContext(xn),
      N = typeof m == "string" && fg.test(m),
      U,
      A = !1;
    if (typeof m == "string" && N && ((U = m), og))
      try {
        let M = new URL(window.location.href),
          B = m.startsWith("//") ? new URL(M.protocol + m) : new URL(m),
          G = ua(B.pathname, w);
        B.origin === M.origin && G != null
          ? (m = G + B.search + B.hash)
          : (A = !0);
      } catch {
        bn(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let k = E_(m, { relative: c }),
      [_, S, R] = r2(u, b),
      X = h2(m, {
        replace: d,
        state: h,
        target: y,
        preventScrollReset: v,
        relative: c,
        viewTransition: x,
      });
    function q(M) {
      l && l(M), M.defaultPrevented || X(M);
    }
    let T = j.createElement("a", {
      ...b,
      ...R,
      href: U || k,
      onClick: A || o ? l : q,
      ref: c2(E, S),
      target: y,
      "data-discover": !N && i === "render" ? "true" : void 0,
    });
    return _ && !N
      ? j.createElement(j.Fragment, null, T, j.createElement(i2, { page: k }))
      : T;
  });
ec.displayName = "Link";
var dg = j.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: i = !1,
    className: u = "",
    end: c = !1,
    style: o,
    to: d,
    viewTransition: h,
    children: y,
    ...m
  },
  v
) {
  let x = tu(d, { relative: m.relative }),
    b = kn(),
    E = j.useContext(Ws),
    { navigator: w, basename: N } = j.useContext(xn),
    U = E != null && g2(x) && h === !0,
    A = w.encodeLocation ? w.encodeLocation(x).pathname : x.pathname,
    k = b.pathname,
    _ =
      E && E.navigation && E.navigation.location
        ? E.navigation.location.pathname
        : null;
  i ||
    ((k = k.toLowerCase()),
    (_ = _ ? _.toLowerCase() : null),
    (A = A.toLowerCase())),
    _ && N && (_ = ua(_, N) || _);
  const S = A !== "/" && A.endsWith("/") ? A.length - 1 : A.length;
  let R = k === A || (!c && k.startsWith(A) && k.charAt(S) === "/"),
    X =
      _ != null &&
      (_ === A || (!c && _.startsWith(A) && _.charAt(A.length) === "/")),
    q = { isActive: R, isPending: X, isTransitioning: U },
    T = R ? l : void 0,
    M;
  typeof u == "function"
    ? (M = u(q))
    : (M = [
        u,
        R ? "active" : null,
        X ? "pending" : null,
        U ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let B = typeof o == "function" ? o(q) : o;
  return j.createElement(
    ec,
    {
      ...m,
      "aria-current": T,
      className: M,
      ref: v,
      style: B,
      to: d,
      viewTransition: h,
    },
    typeof y == "function" ? y(q) : y
  );
});
dg.displayName = "NavLink";
var f2 = j.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: l,
      navigate: i,
      reloadDocument: u,
      replace: c,
      state: o,
      method: d = Cs,
      action: h,
      onSubmit: y,
      relative: m,
      preventScrollReset: v,
      viewTransition: x,
      ...b
    },
    E
  ) => {
    let w = p2(),
      N = v2(h, { relative: m }),
      U = d.toLowerCase() === "get" ? "get" : "post",
      A = typeof h == "string" && fg.test(h),
      k = (_) => {
        if ((y && y(_), _.defaultPrevented)) return;
        _.preventDefault();
        let S = _.nativeEvent.submitter,
          R = (S == null ? void 0 : S.getAttribute("formmethod")) || d;
        w(S || _.currentTarget, {
          fetcherKey: l,
          method: R,
          navigate: i,
          replace: c,
          state: o,
          relative: m,
          preventScrollReset: v,
          viewTransition: x,
        });
      };
    return j.createElement("form", {
      ref: E,
      method: U,
      action: N,
      onSubmit: u ? y : k,
      ...b,
      "data-discover": !A && n === "render" ? "true" : void 0,
    });
  }
);
f2.displayName = "Form";
function d2(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function hg(n) {
  let l = j.useContext(_r);
  return Pe(l, d2(n)), l;
}
function h2(
  n,
  {
    target: l,
    replace: i,
    state: u,
    preventScrollReset: c,
    relative: o,
    viewTransition: d,
  } = {}
) {
  let h = ag(),
    y = kn(),
    m = tu(n, { relative: o });
  return j.useCallback(
    (v) => {
      if (X_(v, l)) {
        v.preventDefault();
        let x = i !== void 0 ? i : zi(y) === zi(m);
        h(n, {
          replace: x,
          state: u,
          preventScrollReset: c,
          relative: o,
          viewTransition: d,
        });
      }
    },
    [y, h, m, i, u, l, n, c, o, d]
  );
}
var m2 = 0,
  y2 = () => `__${String(++m2)}__`;
function p2() {
  let { router: n } = hg("useSubmit"),
    { basename: l } = j.useContext(xn),
    i = k_();
  return j.useCallback(
    async (u, c = {}) => {
      let { action: o, method: d, encType: h, formData: y, body: m } = F_(u, l);
      if (c.navigate === !1) {
        let v = c.fetcherKey || y2();
        await n.fetch(v, i, c.action || o, {
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || d,
          formEncType: c.encType || h,
          flushSync: c.flushSync,
        });
      } else
        await n.navigate(c.action || o, {
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || d,
          formEncType: c.encType || h,
          replace: c.replace,
          state: c.state,
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [n, l, i]
  );
}
function v2(n, { relative: l } = {}) {
  let { basename: i } = j.useContext(xn),
    u = j.useContext(En);
  Pe(u, "useFormAction must be used inside a RouteContext");
  let [c] = u.matches.slice(-1),
    o = { ...tu(n || ".", { relative: l }) },
    d = kn();
  if (n == null) {
    o.search = d.search;
    let h = new URLSearchParams(o.search),
      y = h.getAll("index");
    if (y.some((v) => v === "")) {
      h.delete("index"),
        y.filter((x) => x).forEach((x) => h.append("index", x));
      let v = h.toString();
      o.search = v ? `?${v}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      c.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (o.pathname = o.pathname === "/" ? i : ia([i, o.pathname])),
    zi(o)
  );
}
function g2(n, l = {}) {
  let i = j.useContext(eg);
  Pe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: u } = hg("useViewTransitionState"),
    c = tu(n, { relative: l.relative });
  if (!i.isTransitioning) return !1;
  let o = ua(i.currentLocation.pathname, u) || i.currentLocation.pathname,
    d = ua(i.nextLocation.pathname, u) || i.nextLocation.pathname;
  return Ds(c.pathname, d) != null || Ds(c.pathname, o) != null;
}
new TextEncoder();
var mg = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Zp = gt.createContext && gt.createContext(mg),
  b2 = ["attr", "size", "title"];
function _2(n, l) {
  if (n == null) return {};
  var i = S2(n, l),
    u,
    c;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    for (c = 0; c < o.length; c++)
      (u = o[c]),
        !(l.indexOf(u) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(n, u) &&
          (i[u] = n[u]);
  }
  return i;
}
function S2(n, l) {
  if (n == null) return {};
  var i = {};
  for (var u in n)
    if (Object.prototype.hasOwnProperty.call(n, u)) {
      if (l.indexOf(u) >= 0) continue;
      i[u] = n[u];
    }
  return i;
}
function js() {
  return (
    (js = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var l = 1; l < arguments.length; l++) {
            var i = arguments[l];
            for (var u in i)
              Object.prototype.hasOwnProperty.call(i, u) && (n[u] = i[u]);
          }
          return n;
        }),
    js.apply(this, arguments)
  );
}
function Qp(n, l) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(n);
    l &&
      (u = u.filter(function (c) {
        return Object.getOwnPropertyDescriptor(n, c).enumerable;
      })),
      i.push.apply(i, u);
  }
  return i;
}
function zs(n) {
  for (var l = 1; l < arguments.length; l++) {
    var i = arguments[l] != null ? arguments[l] : {};
    l % 2
      ? Qp(Object(i), !0).forEach(function (u) {
          x2(n, u, i[u]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i))
      : Qp(Object(i)).forEach(function (u) {
          Object.defineProperty(n, u, Object.getOwnPropertyDescriptor(i, u));
        });
  }
  return n;
}
function x2(n, l, i) {
  return (
    (l = E2(l)),
    l in n
      ? Object.defineProperty(n, l, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (n[l] = i),
    n
  );
}
function E2(n) {
  var l = w2(n, "string");
  return typeof l == "symbol" ? l : l + "";
}
function w2(n, l) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var u = i.call(n, l);
    if (typeof u != "object") return u;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (l === "string" ? String : Number)(n);
}
function yg(n) {
  return (
    n &&
    n.map((l, i) =>
      gt.createElement(l.tag, zs({ key: i }, l.attr), yg(l.child))
    )
  );
}
function at(n) {
  return (l) =>
    gt.createElement(T2, js({ attr: zs({}, n.attr) }, l), yg(n.child));
}
function T2(n) {
  var l = (i) => {
    var { attr: u, size: c, title: o } = n,
      d = _2(n, b2),
      h = c || i.size || "1em",
      y;
    return (
      i.className && (y = i.className),
      n.className && (y = (y ? y + " " : "") + n.className),
      gt.createElement(
        "svg",
        js(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          i.attr,
          u,
          d,
          {
            className: y,
            style: zs(zs({ color: n.color || i.color }, i.style), n.style),
            height: h,
            width: h,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        o && gt.createElement("title", null, o),
        n.children
      )
    );
  };
  return Zp !== void 0
    ? gt.createElement(Zp.Consumer, null, (i) => l(i))
    : l(mg);
}
function A2(n) {
  return at({
    attr: { viewBox: "0 0 15 15", fill: "none" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z",
          fill: "currentColor",
        },
        child: [],
      },
    ],
  })(n);
}
var Df = { exports: {} },
  jf = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yp;
function R2() {
  if (Yp) return jf;
  Yp = 1;
  var n = Ps();
  function l(y, m) {
    return (y === m && (y !== 0 || 1 / y === 1 / m)) || (y !== y && m !== m);
  }
  var i = typeof Object.is == "function" ? Object.is : l,
    u = n.useSyncExternalStore,
    c = n.useRef,
    o = n.useEffect,
    d = n.useMemo,
    h = n.useDebugValue;
  return (
    (jf.useSyncExternalStoreWithSelector = function (y, m, v, x, b) {
      var E = c(null);
      if (E.current === null) {
        var w = { hasValue: !1, value: null };
        E.current = w;
      } else w = E.current;
      E = d(
        function () {
          function U(R) {
            if (!A) {
              if (((A = !0), (k = R), (R = x(R)), b !== void 0 && w.hasValue)) {
                var X = w.value;
                if (b(X, R)) return (_ = X);
              }
              return (_ = R);
            }
            if (((X = _), i(k, R))) return X;
            var q = x(R);
            return b !== void 0 && b(X, q) ? ((k = R), X) : ((k = R), (_ = q));
          }
          var A = !1,
            k,
            _,
            S = v === void 0 ? null : v;
          return [
            function () {
              return U(m());
            },
            S === null
              ? void 0
              : function () {
                  return U(S());
                },
          ];
        },
        [m, v, x, b]
      );
      var N = u(y, E[0], E[1]);
      return (
        o(
          function () {
            (w.hasValue = !0), (w.value = N);
          },
          [N]
        ),
        h(N),
        N
      );
    }),
    jf
  );
}
var Gp;
function O2() {
  return Gp || ((Gp = 1), (Df.exports = R2())), Df.exports;
}
var C2 = O2();
function pg(n) {
  n();
}
function M2() {
  let n = null,
    l = null;
  return {
    clear() {
      (n = null), (l = null);
    },
    notify() {
      pg(() => {
        let i = n;
        for (; i; ) i.callback(), (i = i.next);
      });
    },
    get() {
      const i = [];
      let u = n;
      for (; u; ) i.push(u), (u = u.next);
      return i;
    },
    subscribe(i) {
      let u = !0;
      const c = (l = { callback: i, next: null, prev: l });
      return (
        c.prev ? (c.prev.next = c) : (n = c),
        function () {
          !u ||
            n === null ||
            ((u = !1),
            c.next ? (c.next.prev = c.prev) : (l = c.prev),
            c.prev ? (c.prev.next = c.next) : (n = c.next));
        }
      );
    },
  };
}
var Xp = { notify() {}, get: () => [] };
function N2(n, l) {
  let i,
    u = Xp,
    c = 0,
    o = !1;
  function d(N) {
    v();
    const U = u.subscribe(N);
    let A = !1;
    return () => {
      A || ((A = !0), U(), x());
    };
  }
  function h() {
    u.notify();
  }
  function y() {
    w.onStateChange && w.onStateChange();
  }
  function m() {
    return o;
  }
  function v() {
    c++, i || ((i = n.subscribe(y)), (u = M2()));
  }
  function x() {
    c--, i && c === 0 && (i(), (i = void 0), u.clear(), (u = Xp));
  }
  function b() {
    o || ((o = !0), v());
  }
  function E() {
    o && ((o = !1), x());
  }
  const w = {
    addNestedSub: d,
    notifyNestedSubs: h,
    handleChangeWrapper: y,
    isSubscribed: m,
    trySubscribe: b,
    tryUnsubscribe: E,
    getListeners: () => u,
  };
  return w;
}
var D2 = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  j2 = D2(),
  z2 = () => typeof navigator < "u" && navigator.product === "ReactNative",
  U2 = z2(),
  k2 = () => (j2 || U2 ? j.useLayoutEffect : j.useEffect),
  L2 = k2();
function Kp(n, l) {
  return n === l ? n !== 0 || l !== 0 || 1 / n === 1 / l : n !== n && l !== l;
}
function Ci(n, l) {
  if (Kp(n, l)) return !0;
  if (typeof n != "object" || n === null || typeof l != "object" || l === null)
    return !1;
  const i = Object.keys(n),
    u = Object.keys(l);
  if (i.length !== u.length) return !1;
  for (let c = 0; c < i.length; c++)
    if (!Object.prototype.hasOwnProperty.call(l, i[c]) || !Kp(n[i[c]], l[i[c]]))
      return !1;
  return !0;
}
var zf = Symbol.for("react-redux-context"),
  Uf = typeof globalThis < "u" ? globalThis : {};
function q2() {
  if (!j.createContext) return {};
  const n = Uf[zf] ?? (Uf[zf] = new Map());
  let l = n.get(j.createContext);
  return l || ((l = j.createContext(null)), n.set(j.createContext, l)), l;
}
var qa = q2();
function B2(n) {
  const { children: l, context: i, serverState: u, store: c } = n,
    o = j.useMemo(() => {
      const y = N2(c);
      return {
        store: c,
        subscription: y,
        getServerState: u ? () => u : void 0,
      };
    }, [c, u]),
    d = j.useMemo(() => c.getState(), [c]);
  L2(() => {
    const { subscription: y } = o;
    return (
      (y.onStateChange = y.notifyNestedSubs),
      y.trySubscribe(),
      d !== c.getState() && y.notifyNestedSubs(),
      () => {
        y.tryUnsubscribe(), (y.onStateChange = void 0);
      }
    );
  }, [o, d]);
  const h = i || qa;
  return j.createElement(h.Provider, { value: o }, l);
}
var V2 = B2;
function _d(n = qa) {
  return function () {
    return j.useContext(n);
  };
}
var vg = _d();
function gg(n = qa) {
  const l = n === qa ? vg : _d(n),
    i = () => {
      const { store: u } = l();
      return u;
    };
  return Object.assign(i, { withTypes: () => i }), i;
}
var bg = gg();
function H2(n = qa) {
  const l = n === qa ? bg : gg(n),
    i = () => l().dispatch;
  return Object.assign(i, { withTypes: () => i }), i;
}
var nu = H2(),
  Z2 = (n, l) => n === l;
function Q2(n = qa) {
  const l = n === qa ? vg : _d(n),
    i = (u, c = {}) => {
      const { equalityFn: o = Z2 } =
          typeof c == "function" ? { equalityFn: c } : c,
        d = l(),
        { store: h, subscription: y, getServerState: m } = d;
      j.useRef(!0);
      const v = j.useCallback(
          {
            [u.name](b) {
              return u(b);
            },
          }[u.name],
          [u]
        ),
        x = C2.useSyncExternalStoreWithSelector(
          y.addNestedSub,
          h.getState,
          m || h.getState,
          v,
          o
        );
      return j.useDebugValue(x), x;
    };
  return Object.assign(i, { withTypes: () => i }), i;
}
var au = Q2(),
  Y2 = pg;
function G2(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z",
        },
        child: [],
      },
    ],
  })(n);
}
function X2(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z",
        },
        child: [],
      },
    ],
  })(n);
}
function wt(n) {
  return `Minified Redux error #${n}; visit https://redux.js.org/Errors?code=${n} for the full message or use the non-minified dev environment for full errors. `;
}
var K2 = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  $p = K2,
  kf = () => Math.random().toString(36).substring(7).split("").join("."),
  $2 = {
    INIT: `@@redux/INIT${kf()}`,
    REPLACE: `@@redux/REPLACE${kf()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${kf()}`,
  },
  Us = $2;
function Ba(n) {
  if (typeof n != "object" || n === null) return !1;
  let l = n;
  for (; Object.getPrototypeOf(l) !== null; ) l = Object.getPrototypeOf(l);
  return Object.getPrototypeOf(n) === l || Object.getPrototypeOf(n) === null;
}
function _g(n, l, i) {
  if (typeof n != "function") throw new Error(wt(2));
  if (
    (typeof l == "function" && typeof i == "function") ||
    (typeof i == "function" && typeof arguments[3] == "function")
  )
    throw new Error(wt(0));
  if (
    (typeof l == "function" && typeof i > "u" && ((i = l), (l = void 0)),
    typeof i < "u")
  ) {
    if (typeof i != "function") throw new Error(wt(1));
    return i(_g)(n, l);
  }
  let u = n,
    c = l,
    o = new Map(),
    d = o,
    h = 0,
    y = !1;
  function m() {
    d === o &&
      ((d = new Map()),
      o.forEach((U, A) => {
        d.set(A, U);
      }));
  }
  function v() {
    if (y) throw new Error(wt(3));
    return c;
  }
  function x(U) {
    if (typeof U != "function") throw new Error(wt(4));
    if (y) throw new Error(wt(5));
    let A = !0;
    m();
    const k = h++;
    return (
      d.set(k, U),
      function () {
        if (A) {
          if (y) throw new Error(wt(6));
          (A = !1), m(), d.delete(k), (o = null);
        }
      }
    );
  }
  function b(U) {
    if (!Ba(U)) throw new Error(wt(7));
    if (typeof U.type > "u") throw new Error(wt(8));
    if (typeof U.type != "string") throw new Error(wt(17));
    if (y) throw new Error(wt(9));
    try {
      (y = !0), (c = u(c, U));
    } finally {
      y = !1;
    }
    return (
      (o = d).forEach((k) => {
        k();
      }),
      U
    );
  }
  function E(U) {
    if (typeof U != "function") throw new Error(wt(10));
    (u = U), b({ type: Us.REPLACE });
  }
  function w() {
    const U = x;
    return {
      subscribe(A) {
        if (typeof A != "object" || A === null) throw new Error(wt(11));
        function k() {
          const S = A;
          S.next && S.next(v());
        }
        return k(), { unsubscribe: U(k) };
      },
      [$p]() {
        return this;
      },
    };
  }
  return (
    b({ type: Us.INIT }),
    { dispatch: b, subscribe: x, getState: v, replaceReducer: E, [$p]: w }
  );
}
function F2(n) {
  Object.keys(n).forEach((l) => {
    const i = n[l];
    if (typeof i(void 0, { type: Us.INIT }) > "u") throw new Error(wt(12));
    if (typeof i(void 0, { type: Us.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(wt(13));
  });
}
function Sg(n) {
  const l = Object.keys(n),
    i = {};
  for (let o = 0; o < l.length; o++) {
    const d = l[o];
    typeof n[d] == "function" && (i[d] = n[d]);
  }
  const u = Object.keys(i);
  let c;
  try {
    F2(i);
  } catch (o) {
    c = o;
  }
  return function (d = {}, h) {
    if (c) throw c;
    let y = !1;
    const m = {};
    for (let v = 0; v < u.length; v++) {
      const x = u[v],
        b = i[x],
        E = d[x],
        w = b(E, h);
      if (typeof w > "u") throw (h && h.type, new Error(wt(14)));
      (m[x] = w), (y = y || w !== E);
    }
    return (y = y || u.length !== Object.keys(d).length), y ? m : d;
  };
}
function ks(...n) {
  return n.length === 0
    ? (l) => l
    : n.length === 1
    ? n[0]
    : n.reduce(
        (l, i) =>
          (...u) =>
            l(i(...u))
      );
}
function J2(...n) {
  return (l) => (i, u) => {
    const c = l(i, u);
    let o = () => {
      throw new Error(wt(15));
    };
    const d = { getState: c.getState, dispatch: (y, ...m) => o(y, ...m) },
      h = n.map((y) => y(d));
    return (o = ks(...h)(c.dispatch)), { ...c, dispatch: o };
  };
}
function xg(n) {
  return Ba(n) && "type" in n && typeof n.type == "string";
}
var Sd = Symbol.for("immer-nothing"),
  Mi = Symbol.for("immer-draftable"),
  Ht = Symbol.for("immer-state");
function Tt(n, ...l) {
  throw new Error(
    `[Immer] minified error nr: ${n}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var yl = Object.getPrototypeOf;
function jn(n) {
  return !!n && !!n[Ht];
}
function _n(n) {
  var l;
  return n
    ? Eg(n) ||
        Array.isArray(n) ||
        !!n[Mi] ||
        !!((l = n.constructor) != null && l[Mi]) ||
        lu(n) ||
        ru(n)
    : !1;
}
var P2 = Object.prototype.constructor.toString();
function Eg(n) {
  if (!n || typeof n != "object") return !1;
  const l = yl(n);
  if (l === null) return !0;
  const i = Object.hasOwnProperty.call(l, "constructor") && l.constructor;
  return i === Object
    ? !0
    : typeof i == "function" && Function.toString.call(i) === P2;
}
function W2(n) {
  return jn(n) || Tt(15, n), n[Ht].base_;
}
function Ui(n, l) {
  pl(n) === 0
    ? Reflect.ownKeys(n).forEach((i) => {
        l(i, n[i], n);
      })
    : n.forEach((i, u) => l(u, i, n));
}
function pl(n) {
  const l = n[Ht];
  return l ? l.type_ : Array.isArray(n) ? 1 : lu(n) ? 2 : ru(n) ? 3 : 0;
}
function ki(n, l) {
  return pl(n) === 2 ? n.has(l) : Object.prototype.hasOwnProperty.call(n, l);
}
function Lf(n, l) {
  return pl(n) === 2 ? n.get(l) : n[l];
}
function wg(n, l, i) {
  const u = pl(n);
  u === 2 ? n.set(l, i) : u === 3 ? n.add(i) : (n[l] = i);
}
function I2(n, l) {
  return n === l ? n !== 0 || 1 / n === 1 / l : n !== n && l !== l;
}
function lu(n) {
  return n instanceof Map;
}
function ru(n) {
  return n instanceof Set;
}
function dl(n) {
  return n.copy_ || n.base_;
}
function Pf(n, l) {
  if (lu(n)) return new Map(n);
  if (ru(n)) return new Set(n);
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  const i = Eg(n);
  if (l === !0 || (l === "class_only" && !i)) {
    const u = Object.getOwnPropertyDescriptors(n);
    delete u[Ht];
    let c = Reflect.ownKeys(u);
    for (let o = 0; o < c.length; o++) {
      const d = c[o],
        h = u[d];
      h.writable === !1 && ((h.writable = !0), (h.configurable = !0)),
        (h.get || h.set) &&
          (u[d] = {
            configurable: !0,
            writable: !0,
            enumerable: h.enumerable,
            value: n[d],
          });
    }
    return Object.create(yl(n), u);
  } else {
    const u = yl(n);
    if (u !== null && i) return { ...n };
    const c = Object.create(u);
    return Object.assign(c, n);
  }
}
function xd(n, l = !1) {
  return (
    tc(n) ||
      jn(n) ||
      !_n(n) ||
      (pl(n) > 1 && (n.set = n.add = n.clear = n.delete = eS),
      Object.freeze(n),
      l && Object.entries(n).forEach(([i, u]) => xd(u, !0))),
    n
  );
}
function eS() {
  Tt(2);
}
function tc(n) {
  return Object.isFrozen(n);
}
var Wf = {};
function vl(n) {
  const l = Wf[n];
  return l || Tt(0, n), l;
}
function tS(n, l) {
  Wf[n] || (Wf[n] = l);
}
var Li;
function Tg() {
  return Li;
}
function nS(n, l) {
  return {
    drafts_: [],
    parent_: n,
    immer_: l,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function Fp(n, l) {
  l &&
    (vl("Patches"),
    (n.patches_ = []),
    (n.inversePatches_ = []),
    (n.patchListener_ = l));
}
function If(n) {
  ed(n), n.drafts_.forEach(aS), (n.drafts_ = null);
}
function ed(n) {
  n === Li && (Li = n.parent_);
}
function Jp(n) {
  return (Li = nS(Li, n));
}
function aS(n) {
  const l = n[Ht];
  l.type_ === 0 || l.type_ === 1 ? l.revoke_() : (l.revoked_ = !0);
}
function Pp(n, l) {
  l.unfinalizedDrafts_ = l.drafts_.length;
  const i = l.drafts_[0];
  return (
    n !== void 0 && n !== i
      ? (i[Ht].modified_ && (If(l), Tt(4)),
        _n(n) && ((n = Ls(l, n)), l.parent_ || qs(l, n)),
        l.patches_ &&
          vl("Patches").generateReplacementPatches_(
            i[Ht].base_,
            n,
            l.patches_,
            l.inversePatches_
          ))
      : (n = Ls(l, i, [])),
    If(l),
    l.patches_ && l.patchListener_(l.patches_, l.inversePatches_),
    n !== Sd ? n : void 0
  );
}
function Ls(n, l, i) {
  if (tc(l)) return l;
  const u = l[Ht];
  if (!u) return Ui(l, (c, o) => Wp(n, u, l, c, o, i)), l;
  if (u.scope_ !== n) return l;
  if (!u.modified_) return qs(n, u.base_, !0), u.base_;
  if (!u.finalized_) {
    (u.finalized_ = !0), u.scope_.unfinalizedDrafts_--;
    const c = u.copy_;
    let o = c,
      d = !1;
    u.type_ === 3 && ((o = new Set(c)), c.clear(), (d = !0)),
      Ui(o, (h, y) => Wp(n, u, c, h, y, i, d)),
      qs(n, c, !1),
      i &&
        n.patches_ &&
        vl("Patches").generatePatches_(u, i, n.patches_, n.inversePatches_);
  }
  return u.copy_;
}
function Wp(n, l, i, u, c, o, d) {
  if (jn(c)) {
    const h =
        o && l && l.type_ !== 3 && !ki(l.assigned_, u) ? o.concat(u) : void 0,
      y = Ls(n, c, h);
    if ((wg(i, u, y), jn(y))) n.canAutoFreeze_ = !1;
    else return;
  } else d && i.add(c);
  if (_n(c) && !tc(c)) {
    if (!n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1) return;
    Ls(n, c),
      (!l || !l.scope_.parent_) &&
        typeof u != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(i, u) &&
        qs(n, c);
  }
}
function qs(n, l, i = !1) {
  !n.parent_ && n.immer_.autoFreeze_ && n.canAutoFreeze_ && xd(l, i);
}
function lS(n, l) {
  const i = Array.isArray(n),
    u = {
      type_: i ? 1 : 0,
      scope_: l ? l.scope_ : Tg(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: l,
      base_: n,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let c = u,
    o = Ed;
  i && ((c = [u]), (o = qi));
  const { revoke: d, proxy: h } = Proxy.revocable(c, o);
  return (u.draft_ = h), (u.revoke_ = d), h;
}
var Ed = {
    get(n, l) {
      if (l === Ht) return n;
      const i = dl(n);
      if (!ki(i, l)) return rS(n, i, l);
      const u = i[l];
      return n.finalized_ || !_n(u)
        ? u
        : u === qf(n.base_, l)
        ? (Bf(n), (n.copy_[l] = nd(u, n)))
        : u;
    },
    has(n, l) {
      return l in dl(n);
    },
    ownKeys(n) {
      return Reflect.ownKeys(dl(n));
    },
    set(n, l, i) {
      const u = Ag(dl(n), l);
      if (u != null && u.set) return u.set.call(n.draft_, i), !0;
      if (!n.modified_) {
        const c = qf(dl(n), l),
          o = c == null ? void 0 : c[Ht];
        if (o && o.base_ === i)
          return (n.copy_[l] = i), (n.assigned_[l] = !1), !0;
        if (I2(i, c) && (i !== void 0 || ki(n.base_, l))) return !0;
        Bf(n), td(n);
      }
      return (
        (n.copy_[l] === i && (i !== void 0 || l in n.copy_)) ||
          (Number.isNaN(i) && Number.isNaN(n.copy_[l])) ||
          ((n.copy_[l] = i), (n.assigned_[l] = !0)),
        !0
      );
    },
    deleteProperty(n, l) {
      return (
        qf(n.base_, l) !== void 0 || l in n.base_
          ? ((n.assigned_[l] = !1), Bf(n), td(n))
          : delete n.assigned_[l],
        n.copy_ && delete n.copy_[l],
        !0
      );
    },
    getOwnPropertyDescriptor(n, l) {
      const i = dl(n),
        u = Reflect.getOwnPropertyDescriptor(i, l);
      return (
        u && {
          writable: !0,
          configurable: n.type_ !== 1 || l !== "length",
          enumerable: u.enumerable,
          value: i[l],
        }
      );
    },
    defineProperty() {
      Tt(11);
    },
    getPrototypeOf(n) {
      return yl(n.base_);
    },
    setPrototypeOf() {
      Tt(12);
    },
  },
  qi = {};
Ui(Ed, (n, l) => {
  qi[n] = function () {
    return (arguments[0] = arguments[0][0]), l.apply(this, arguments);
  };
});
qi.deleteProperty = function (n, l) {
  return qi.set.call(this, n, l, void 0);
};
qi.set = function (n, l, i) {
  return Ed.set.call(this, n[0], l, i, n[0]);
};
function qf(n, l) {
  const i = n[Ht];
  return (i ? dl(i) : n)[l];
}
function rS(n, l, i) {
  var c;
  const u = Ag(l, i);
  return u
    ? "value" in u
      ? u.value
      : (c = u.get) == null
      ? void 0
      : c.call(n.draft_)
    : void 0;
}
function Ag(n, l) {
  if (!(l in n)) return;
  let i = yl(n);
  for (; i; ) {
    const u = Object.getOwnPropertyDescriptor(i, l);
    if (u) return u;
    i = yl(i);
  }
}
function td(n) {
  n.modified_ || ((n.modified_ = !0), n.parent_ && td(n.parent_));
}
function Bf(n) {
  n.copy_ || (n.copy_ = Pf(n.base_, n.scope_.immer_.useStrictShallowCopy_));
}
var iS = class {
  constructor(n) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (l, i, u) => {
        if (typeof l == "function" && typeof i != "function") {
          const o = i;
          i = l;
          const d = this;
          return function (y = o, ...m) {
            return d.produce(y, (v) => i.call(this, v, ...m));
          };
        }
        typeof i != "function" && Tt(6),
          u !== void 0 && typeof u != "function" && Tt(7);
        let c;
        if (_n(l)) {
          const o = Jp(this),
            d = nd(l, void 0);
          let h = !0;
          try {
            (c = i(d)), (h = !1);
          } finally {
            h ? If(o) : ed(o);
          }
          return Fp(o, u), Pp(c, o);
        } else if (!l || typeof l != "object") {
          if (
            ((c = i(l)),
            c === void 0 && (c = l),
            c === Sd && (c = void 0),
            this.autoFreeze_ && xd(c, !0),
            u)
          ) {
            const o = [],
              d = [];
            vl("Patches").generateReplacementPatches_(l, c, o, d), u(o, d);
          }
          return c;
        } else Tt(1, l);
      }),
      (this.produceWithPatches = (l, i) => {
        if (typeof l == "function")
          return (d, ...h) => this.produceWithPatches(d, (y) => l(y, ...h));
        let u, c;
        return [
          this.produce(l, i, (d, h) => {
            (u = d), (c = h);
          }),
          u,
          c,
        ];
      }),
      typeof (n == null ? void 0 : n.autoFreeze) == "boolean" &&
        this.setAutoFreeze(n.autoFreeze),
      typeof (n == null ? void 0 : n.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(n.useStrictShallowCopy);
  }
  createDraft(n) {
    _n(n) || Tt(8), jn(n) && (n = uS(n));
    const l = Jp(this),
      i = nd(n, void 0);
    return (i[Ht].isManual_ = !0), ed(l), i;
  }
  finishDraft(n, l) {
    const i = n && n[Ht];
    (!i || !i.isManual_) && Tt(9);
    const { scope_: u } = i;
    return Fp(u, l), Pp(void 0, u);
  }
  setAutoFreeze(n) {
    this.autoFreeze_ = n;
  }
  setUseStrictShallowCopy(n) {
    this.useStrictShallowCopy_ = n;
  }
  applyPatches(n, l) {
    let i;
    for (i = l.length - 1; i >= 0; i--) {
      const c = l[i];
      if (c.path.length === 0 && c.op === "replace") {
        n = c.value;
        break;
      }
    }
    i > -1 && (l = l.slice(i + 1));
    const u = vl("Patches").applyPatches_;
    return jn(n) ? u(n, l) : this.produce(n, (c) => u(c, l));
  }
};
function nd(n, l) {
  const i = lu(n)
    ? vl("MapSet").proxyMap_(n, l)
    : ru(n)
    ? vl("MapSet").proxySet_(n, l)
    : lS(n, l);
  return (l ? l.scope_ : Tg()).drafts_.push(i), i;
}
function uS(n) {
  return jn(n) || Tt(10, n), Rg(n);
}
function Rg(n) {
  if (!_n(n) || tc(n)) return n;
  const l = n[Ht];
  let i;
  if (l) {
    if (!l.modified_) return l.base_;
    (l.finalized_ = !0), (i = Pf(n, l.scope_.immer_.useStrictShallowCopy_));
  } else i = Pf(n, !0);
  return (
    Ui(i, (u, c) => {
      wg(i, u, Rg(c));
    }),
    l && (l.finalized_ = !1),
    i
  );
}
function sS() {
  const l = "replace",
    i = "add",
    u = "remove";
  function c(b, E, w, N) {
    switch (b.type_) {
      case 0:
      case 2:
        return d(b, E, w, N);
      case 1:
        return o(b, E, w, N);
      case 3:
        return h(b, E, w, N);
    }
  }
  function o(b, E, w, N) {
    let { base_: U, assigned_: A } = b,
      k = b.copy_;
    k.length < U.length && (([U, k] = [k, U]), ([w, N] = [N, w]));
    for (let _ = 0; _ < U.length; _++)
      if (A[_] && k[_] !== U[_]) {
        const S = E.concat([_]);
        w.push({ op: l, path: S, value: x(k[_]) }),
          N.push({ op: l, path: S, value: x(U[_]) });
      }
    for (let _ = U.length; _ < k.length; _++) {
      const S = E.concat([_]);
      w.push({ op: i, path: S, value: x(k[_]) });
    }
    for (let _ = k.length - 1; U.length <= _; --_) {
      const S = E.concat([_]);
      N.push({ op: u, path: S });
    }
  }
  function d(b, E, w, N) {
    const { base_: U, copy_: A } = b;
    Ui(b.assigned_, (k, _) => {
      const S = Lf(U, k),
        R = Lf(A, k),
        X = _ ? (ki(U, k) ? l : i) : u;
      if (S === R && X === l) return;
      const q = E.concat(k);
      w.push(X === u ? { op: X, path: q } : { op: X, path: q, value: R }),
        N.push(
          X === i
            ? { op: u, path: q }
            : X === u
            ? { op: i, path: q, value: x(S) }
            : { op: l, path: q, value: x(S) }
        );
    });
  }
  function h(b, E, w, N) {
    let { base_: U, copy_: A } = b,
      k = 0;
    U.forEach((_) => {
      if (!A.has(_)) {
        const S = E.concat([k]);
        w.push({ op: u, path: S, value: _ }),
          N.unshift({ op: i, path: S, value: _ });
      }
      k++;
    }),
      (k = 0),
      A.forEach((_) => {
        if (!U.has(_)) {
          const S = E.concat([k]);
          w.push({ op: i, path: S, value: _ }),
            N.unshift({ op: u, path: S, value: _ });
        }
        k++;
      });
  }
  function y(b, E, w, N) {
    w.push({ op: l, path: [], value: E === Sd ? void 0 : E }),
      N.push({ op: l, path: [], value: b });
  }
  function m(b, E) {
    return (
      E.forEach((w) => {
        const { path: N, op: U } = w;
        let A = b;
        for (let R = 0; R < N.length - 1; R++) {
          const X = pl(A);
          let q = N[R];
          typeof q != "string" && typeof q != "number" && (q = "" + q),
            (X === 0 || X === 1) &&
              (q === "__proto__" || q === "constructor") &&
              Tt(19),
            typeof A == "function" && q === "prototype" && Tt(19),
            (A = Lf(A, q)),
            typeof A != "object" && Tt(18, N.join("/"));
        }
        const k = pl(A),
          _ = v(w.value),
          S = N[N.length - 1];
        switch (U) {
          case l:
            switch (k) {
              case 2:
                return A.set(S, _);
              case 3:
                Tt(16);
              default:
                return (A[S] = _);
            }
          case i:
            switch (k) {
              case 1:
                return S === "-" ? A.push(_) : A.splice(S, 0, _);
              case 2:
                return A.set(S, _);
              case 3:
                return A.add(_);
              default:
                return (A[S] = _);
            }
          case u:
            switch (k) {
              case 1:
                return A.splice(S, 1);
              case 2:
                return A.delete(S);
              case 3:
                return A.delete(w.value);
              default:
                return delete A[S];
            }
          default:
            Tt(17, U);
        }
      }),
      b
    );
  }
  function v(b) {
    if (!_n(b)) return b;
    if (Array.isArray(b)) return b.map(v);
    if (lu(b))
      return new Map(Array.from(b.entries()).map(([w, N]) => [w, v(N)]));
    if (ru(b)) return new Set(Array.from(b).map(v));
    const E = Object.create(yl(b));
    for (const w in b) E[w] = v(b[w]);
    return ki(b, Mi) && (E[Mi] = b[Mi]), E;
  }
  function x(b) {
    return jn(b) ? v(b) : b;
  }
  tS("Patches", {
    applyPatches_: m,
    generatePatches_: c,
    generateReplacementPatches_: y,
  });
}
var Wt = new iS(),
  iu = Wt.produce,
  Og = Wt.produceWithPatches.bind(Wt);
Wt.setAutoFreeze.bind(Wt);
Wt.setUseStrictShallowCopy.bind(Wt);
var Ip = Wt.applyPatches.bind(Wt);
Wt.createDraft.bind(Wt);
Wt.finishDraft.bind(Wt);
function cS(n, l = `expected a function, instead received ${typeof n}`) {
  if (typeof n != "function") throw new TypeError(l);
}
function oS(n, l = `expected an object, instead received ${typeof n}`) {
  if (typeof n != "object") throw new TypeError(l);
}
function fS(
  n,
  l = "expected all items to be functions, instead received the following types: "
) {
  if (!n.every((i) => typeof i == "function")) {
    const i = n
      .map((u) =>
        typeof u == "function" ? `function ${u.name || "unnamed"}()` : typeof u
      )
      .join(", ");
    throw new TypeError(`${l}[${i}]`);
  }
}
var ev = (n) => (Array.isArray(n) ? n : [n]);
function dS(n) {
  const l = Array.isArray(n[0]) ? n[0] : n;
  return (
    fS(
      l,
      "createSelector expects all input-selectors to be functions, but received the following types: "
    ),
    l
  );
}
function hS(n, l) {
  const i = [],
    { length: u } = n;
  for (let c = 0; c < u; c++) i.push(n[c].apply(null, l));
  return i;
}
var mS = class {
    constructor(n) {
      this.value = n;
    }
    deref() {
      return this.value;
    }
  },
  yS = typeof WeakRef < "u" ? WeakRef : mS,
  pS = 0,
  tv = 1;
function Es() {
  return { s: pS, v: void 0, o: null, p: null };
}
function Bs(n, l = {}) {
  let i = Es();
  const { resultEqualityCheck: u } = l;
  let c,
    o = 0;
  function d() {
    var x;
    let h = i;
    const { length: y } = arguments;
    for (let b = 0, E = y; b < E; b++) {
      const w = arguments[b];
      if (typeof w == "function" || (typeof w == "object" && w !== null)) {
        let N = h.o;
        N === null && (h.o = N = new WeakMap());
        const U = N.get(w);
        U === void 0 ? ((h = Es()), N.set(w, h)) : (h = U);
      } else {
        let N = h.p;
        N === null && (h.p = N = new Map());
        const U = N.get(w);
        U === void 0 ? ((h = Es()), N.set(w, h)) : (h = U);
      }
    }
    const m = h;
    let v;
    if (h.s === tv) v = h.v;
    else if (((v = n.apply(null, arguments)), o++, u)) {
      const b =
        ((x = c == null ? void 0 : c.deref) == null ? void 0 : x.call(c)) ?? c;
      b != null && u(b, v) && ((v = b), o !== 0 && o--),
        (c =
          (typeof v == "object" && v !== null) || typeof v == "function"
            ? new yS(v)
            : v);
    }
    return (m.s = tv), (m.v = v), v;
  }
  return (
    (d.clearCache = () => {
      (i = Es()), d.resetResultsCount();
    }),
    (d.resultsCount = () => o),
    (d.resetResultsCount = () => {
      o = 0;
    }),
    d
  );
}
function vS(n, ...l) {
  const i = typeof n == "function" ? { memoize: n, memoizeOptions: l } : n,
    u = (...c) => {
      let o = 0,
        d = 0,
        h,
        y = {},
        m = c.pop();
      typeof m == "object" && ((y = m), (m = c.pop())),
        cS(
          m,
          `createSelector expects an output function after the inputs, but received: [${typeof m}]`
        );
      const v = { ...i, ...y },
        {
          memoize: x,
          memoizeOptions: b = [],
          argsMemoize: E = Bs,
          argsMemoizeOptions: w = [],
        } = v,
        N = ev(b),
        U = ev(w),
        A = dS(c),
        k = x(function () {
          return o++, m.apply(null, arguments);
        }, ...N),
        _ = E(function () {
          d++;
          const R = hS(A, arguments);
          return (h = k.apply(null, R)), h;
        }, ...U);
      return Object.assign(_, {
        resultFunc: m,
        memoizedResultFunc: k,
        dependencies: A,
        dependencyRecomputations: () => d,
        resetDependencyRecomputations: () => {
          d = 0;
        },
        lastResult: () => h,
        recomputations: () => o,
        resetRecomputations: () => {
          o = 0;
        },
        memoize: x,
        argsMemoize: E,
      });
    };
  return Object.assign(u, { withTypes: () => u }), u;
}
var wd = vS(Bs),
  gS = Object.assign(
    (n, l = wd) => {
      oS(
        n,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof n}`
      );
      const i = Object.keys(n),
        u = i.map((o) => n[o]);
      return l(u, (...o) => o.reduce((d, h, y) => ((d[i[y]] = h), d), {}));
    },
    { withTypes: () => gS }
  );
function Cg(n) {
  return ({ dispatch: i, getState: u }) =>
    (c) =>
    (o) =>
      typeof o == "function" ? o(i, u, n) : c(o);
}
var bS = Cg(),
  _S = Cg,
  SS =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? ks
              : ks.apply(null, arguments);
        },
  xS = (n) => n && typeof n.match == "function";
function pn(n, l) {
  function i(...u) {
    if (l) {
      let c = l(...u);
      if (!c) throw new Error(vn(0));
      return {
        type: n,
        payload: c.payload,
        ...("meta" in c && { meta: c.meta }),
        ...("error" in c && { error: c.error }),
      };
    }
    return { type: n, payload: u[0] };
  }
  return (
    (i.toString = () => `${n}`),
    (i.type = n),
    (i.match = (u) => xg(u) && u.type === n),
    i
  );
}
var Mg = class Ai extends Array {
  constructor(...l) {
    super(...l), Object.setPrototypeOf(this, Ai.prototype);
  }
  static get [Symbol.species]() {
    return Ai;
  }
  concat(...l) {
    return super.concat.apply(this, l);
  }
  prepend(...l) {
    return l.length === 1 && Array.isArray(l[0])
      ? new Ai(...l[0].concat(this))
      : new Ai(...l.concat(this));
  }
};
function nv(n) {
  return _n(n) ? iu(n, () => {}) : n;
}
function av(n, l, i) {
  return n.has(l) ? n.get(l) : n.set(l, i(l)).get(l);
}
function ES(n) {
  return typeof n == "boolean";
}
var wS = () =>
    function (l) {
      const {
        thunk: i = !0,
        immutableCheck: u = !0,
        serializableCheck: c = !0,
        actionCreatorCheck: o = !0,
      } = l ?? {};
      let d = new Mg();
      return i && (ES(i) ? d.push(bS) : d.push(_S(i.extraArgument))), d;
    },
  nc = "RTK_autoBatch",
  Si = () => (n) => ({ payload: n, meta: { [nc]: !0 } }),
  lv = (n) => (l) => {
    setTimeout(l, n);
  },
  TS =
    (n = { type: "raf" }) =>
    (l) =>
    (...i) => {
      const u = l(...i);
      let c = !0,
        o = !1,
        d = !1;
      const h = new Set(),
        y =
          n.type === "tick"
            ? queueMicrotask
            : n.type === "raf"
            ? typeof window < "u" && window.requestAnimationFrame
              ? window.requestAnimationFrame
              : lv(10)
            : n.type === "callback"
            ? n.queueNotification
            : lv(n.timeout),
        m = () => {
          (d = !1), o && ((o = !1), h.forEach((v) => v()));
        };
      return Object.assign({}, u, {
        subscribe(v) {
          const x = () => c && v(),
            b = u.subscribe(x);
          return (
            h.add(v),
            () => {
              b(), h.delete(v);
            }
          );
        },
        dispatch(v) {
          var x;
          try {
            return (
              (c = !((x = v == null ? void 0 : v.meta) != null && x[nc])),
              (o = !c),
              o && (d || ((d = !0), y(m))),
              u.dispatch(v)
            );
          } finally {
            c = !0;
          }
        },
      });
    },
  AS = (n) =>
    function (i) {
      const { autoBatch: u = !0 } = i ?? {};
      let c = new Mg(n);
      return u && c.push(TS(typeof u == "object" ? u : void 0)), c;
    };
function RS(n) {
  const l = wS(),
    {
      reducer: i = void 0,
      middleware: u,
      devTools: c = !0,
      preloadedState: o = void 0,
      enhancers: d = void 0,
    } = n || {};
  let h;
  if (typeof i == "function") h = i;
  else if (Ba(i)) h = Sg(i);
  else throw new Error(vn(1));
  let y;
  typeof u == "function" ? (y = u(l)) : (y = l());
  let m = ks;
  c && (m = SS({ trace: !1, ...(typeof c == "object" && c) }));
  const v = J2(...y),
    x = AS(v);
  let b = typeof d == "function" ? d(x) : x();
  const E = m(...b);
  return _g(h, o, E);
}
function Ng(n) {
  const l = {},
    i = [];
  let u;
  const c = {
    addCase(o, d) {
      const h = typeof o == "string" ? o : o.type;
      if (!h) throw new Error(vn(28));
      if (h in l) throw new Error(vn(29));
      return (l[h] = d), c;
    },
    addMatcher(o, d) {
      return i.push({ matcher: o, reducer: d }), c;
    },
    addDefaultCase(o) {
      return (u = o), c;
    },
  };
  return n(c), [l, i, u];
}
function OS(n) {
  return typeof n == "function";
}
function CS(n, l) {
  let [i, u, c] = Ng(l),
    o;
  if (OS(n)) o = () => nv(n());
  else {
    const h = nv(n);
    o = () => h;
  }
  function d(h = o(), y) {
    let m = [
      i[y.type],
      ...u.filter(({ matcher: v }) => v(y)).map(({ reducer: v }) => v),
    ];
    return (
      m.filter((v) => !!v).length === 0 && (m = [c]),
      m.reduce((v, x) => {
        if (x)
          if (jn(v)) {
            const E = x(v, y);
            return E === void 0 ? v : E;
          } else {
            if (_n(v)) return iu(v, (b) => x(b, y));
            {
              const b = x(v, y);
              if (b === void 0) {
                if (v === null) return v;
                throw Error(
                  "A case reducer on a non-draftable value must not return undefined"
                );
              }
              return b;
            }
          }
        return v;
      }, h)
    );
  }
  return (d.getInitialState = o), d;
}
var Dg = (n, l) => (xS(n) ? n.match(l) : n(l));
function sa(...n) {
  return (l) => n.some((i) => Dg(i, l));
}
function Ni(...n) {
  return (l) => n.every((i) => Dg(i, l));
}
function ac(n, l) {
  if (!n || !n.meta) return !1;
  const i = typeof n.meta.requestId == "string",
    u = l.indexOf(n.meta.requestStatus) > -1;
  return i && u;
}
function uu(n) {
  return (
    typeof n[0] == "function" &&
    "pending" in n[0] &&
    "fulfilled" in n[0] &&
    "rejected" in n[0]
  );
}
function Td(...n) {
  return n.length === 0
    ? (l) => ac(l, ["pending"])
    : uu(n)
    ? sa(...n.map((l) => l.pending))
    : Td()(n[0]);
}
function yr(...n) {
  return n.length === 0
    ? (l) => ac(l, ["rejected"])
    : uu(n)
    ? sa(...n.map((l) => l.rejected))
    : yr()(n[0]);
}
function lc(...n) {
  const l = (i) => i && i.meta && i.meta.rejectedWithValue;
  return n.length === 0
    ? Ni(yr(...n), l)
    : uu(n)
    ? Ni(yr(...n), l)
    : lc()(n[0]);
}
function Va(...n) {
  return n.length === 0
    ? (l) => ac(l, ["fulfilled"])
    : uu(n)
    ? sa(...n.map((l) => l.fulfilled))
    : Va()(n[0]);
}
function ad(...n) {
  return n.length === 0
    ? (l) => ac(l, ["pending", "fulfilled", "rejected"])
    : uu(n)
    ? sa(...n.flatMap((l) => [l.pending, l.rejected, l.fulfilled]))
    : ad()(n[0]);
}
var MS = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  Ad = (n = 21) => {
    let l = "",
      i = n;
    for (; i--; ) l += MS[(Math.random() * 64) | 0];
    return l;
  },
  NS = ["name", "message", "stack", "code"],
  Vf = class {
    constructor(n, l) {
      Ef(this, "_type");
      (this.payload = n), (this.meta = l);
    }
  },
  rv = class {
    constructor(n, l) {
      Ef(this, "_type");
      (this.payload = n), (this.meta = l);
    }
  },
  DS = (n) => {
    if (typeof n == "object" && n !== null) {
      const l = {};
      for (const i of NS) typeof n[i] == "string" && (l[i] = n[i]);
      return l;
    }
    return { message: String(n) };
  },
  iv = "External signal was aborted",
  uv = (() => {
    function n(l, i, u) {
      const c = pn(l + "/fulfilled", (y, m, v, x) => ({
          payload: y,
          meta: {
            ...(x || {}),
            arg: v,
            requestId: m,
            requestStatus: "fulfilled",
          },
        })),
        o = pn(l + "/pending", (y, m, v) => ({
          payload: void 0,
          meta: {
            ...(v || {}),
            arg: m,
            requestId: y,
            requestStatus: "pending",
          },
        })),
        d = pn(l + "/rejected", (y, m, v, x, b) => ({
          payload: x,
          error: ((u && u.serializeError) || DS)(y || "Rejected"),
          meta: {
            ...(b || {}),
            arg: v,
            requestId: m,
            rejectedWithValue: !!x,
            requestStatus: "rejected",
            aborted: (y == null ? void 0 : y.name) === "AbortError",
            condition: (y == null ? void 0 : y.name) === "ConditionError",
          },
        }));
      function h(y, { signal: m } = {}) {
        return (v, x, b) => {
          const E = u != null && u.idGenerator ? u.idGenerator(y) : Ad(),
            w = new AbortController();
          let N, U;
          function A(_) {
            (U = _), w.abort();
          }
          m &&
            (m.aborted
              ? A(iv)
              : m.addEventListener("abort", () => A(iv), { once: !0 }));
          const k = (async function () {
            var R, X;
            let _;
            try {
              let q =
                (R = u == null ? void 0 : u.condition) == null
                  ? void 0
                  : R.call(u, y, { getState: x, extra: b });
              if ((zS(q) && (q = await q), q === !1 || w.signal.aborted))
                throw {
                  name: "ConditionError",
                  message: "Aborted due to condition callback returning false.",
                };
              const T = new Promise((M, B) => {
                (N = () => {
                  B({ name: "AbortError", message: U || "Aborted" });
                }),
                  w.signal.addEventListener("abort", N);
              });
              v(
                o(
                  E,
                  y,
                  (X = u == null ? void 0 : u.getPendingMeta) == null
                    ? void 0
                    : X.call(
                        u,
                        { requestId: E, arg: y },
                        { getState: x, extra: b }
                      )
                )
              ),
                (_ = await Promise.race([
                  T,
                  Promise.resolve(
                    i(y, {
                      dispatch: v,
                      getState: x,
                      extra: b,
                      requestId: E,
                      signal: w.signal,
                      abort: A,
                      rejectWithValue: (M, B) => new Vf(M, B),
                      fulfillWithValue: (M, B) => new rv(M, B),
                    })
                  ).then((M) => {
                    if (M instanceof Vf) throw M;
                    return M instanceof rv
                      ? c(M.payload, E, y, M.meta)
                      : c(M, E, y);
                  }),
                ]));
            } catch (q) {
              _ =
                q instanceof Vf ? d(null, E, y, q.payload, q.meta) : d(q, E, y);
            } finally {
              N && w.signal.removeEventListener("abort", N);
            }
            return (
              (u &&
                !u.dispatchConditionRejection &&
                d.match(_) &&
                _.meta.condition) ||
                v(_),
              _
            );
          })();
          return Object.assign(k, {
            abort: A,
            requestId: E,
            arg: y,
            unwrap() {
              return k.then(jS);
            },
          });
        };
      }
      return Object.assign(h, {
        pending: o,
        rejected: d,
        fulfilled: c,
        settled: sa(d, c),
        typePrefix: l,
      });
    }
    return (n.withTypes = () => n), n;
  })();
function jS(n) {
  if (n.meta && n.meta.rejectedWithValue) throw n.payload;
  if (n.error) throw n.error;
  return n.payload;
}
function zS(n) {
  return n !== null && typeof n == "object" && typeof n.then == "function";
}
var US = Symbol.for("rtk-slice-createasyncthunk");
function kS(n, l) {
  return `${n}/${l}`;
}
function LS({ creators: n } = {}) {
  var i;
  const l = (i = n == null ? void 0 : n.asyncThunk) == null ? void 0 : i[US];
  return function (c) {
    const { name: o, reducerPath: d = o } = c;
    if (!o) throw new Error(vn(11));
    const h =
        (typeof c.reducers == "function" ? c.reducers(BS()) : c.reducers) || {},
      y = Object.keys(h),
      m = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      v = {
        addCase(_, S) {
          const R = typeof _ == "string" ? _ : _.type;
          if (!R) throw new Error(vn(12));
          if (R in m.sliceCaseReducersByType) throw new Error(vn(13));
          return (m.sliceCaseReducersByType[R] = S), v;
        },
        addMatcher(_, S) {
          return m.sliceMatchers.push({ matcher: _, reducer: S }), v;
        },
        exposeAction(_, S) {
          return (m.actionCreators[_] = S), v;
        },
        exposeCaseReducer(_, S) {
          return (m.sliceCaseReducersByName[_] = S), v;
        },
      };
    y.forEach((_) => {
      const S = h[_],
        R = {
          reducerName: _,
          type: kS(o, _),
          createNotation: typeof c.reducers == "function",
        };
      HS(S) ? QS(R, S, v, l) : VS(R, S, v);
    });
    function x() {
      const [_ = {}, S = [], R = void 0] =
          typeof c.extraReducers == "function"
            ? Ng(c.extraReducers)
            : [c.extraReducers],
        X = { ..._, ...m.sliceCaseReducersByType };
      return CS(c.initialState, (q) => {
        for (let T in X) q.addCase(T, X[T]);
        for (let T of m.sliceMatchers) q.addMatcher(T.matcher, T.reducer);
        for (let T of S) q.addMatcher(T.matcher, T.reducer);
        R && q.addDefaultCase(R);
      });
    }
    const b = (_) => _,
      E = new Map();
    let w;
    function N(_, S) {
      return w || (w = x()), w(_, S);
    }
    function U() {
      return w || (w = x()), w.getInitialState();
    }
    function A(_, S = !1) {
      function R(q) {
        let T = q[_];
        return typeof T > "u" && S && (T = U()), T;
      }
      function X(q = b) {
        const T = av(E, S, () => new WeakMap());
        return av(T, q, () => {
          const M = {};
          for (const [B, G] of Object.entries(c.selectors ?? {}))
            M[B] = qS(G, q, U, S);
          return M;
        });
      }
      return {
        reducerPath: _,
        getSelectors: X,
        get selectors() {
          return X(R);
        },
        selectSlice: R,
      };
    }
    const k = {
      name: o,
      reducer: N,
      actions: m.actionCreators,
      caseReducers: m.sliceCaseReducersByName,
      getInitialState: U,
      ...A(d),
      injectInto(_, { reducerPath: S, ...R } = {}) {
        const X = S ?? d;
        return (
          _.inject({ reducerPath: X, reducer: N }, R), { ...k, ...A(X, !0) }
        );
      },
    };
    return k;
  };
}
function qS(n, l, i, u) {
  function c(o, ...d) {
    let h = l(o);
    return typeof h > "u" && u && (h = i()), n(h, ...d);
  }
  return (c.unwrapped = n), c;
}
var aa = LS();
function BS() {
  function n(l, i) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: l, ...i };
  }
  return (
    (n.withTypes = () => n),
    {
      reducer(l) {
        return Object.assign(
          {
            [l.name](...i) {
              return l(...i);
            },
          }[l.name],
          { _reducerDefinitionType: "reducer" }
        );
      },
      preparedReducer(l, i) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: l,
          reducer: i,
        };
      },
      asyncThunk: n,
    }
  );
}
function VS({ type: n, reducerName: l, createNotation: i }, u, c) {
  let o, d;
  if ("reducer" in u) {
    if (i && !ZS(u)) throw new Error(vn(17));
    (o = u.reducer), (d = u.prepare);
  } else o = u;
  c.addCase(n, o)
    .exposeCaseReducer(l, o)
    .exposeAction(l, d ? pn(n, d) : pn(n));
}
function HS(n) {
  return n._reducerDefinitionType === "asyncThunk";
}
function ZS(n) {
  return n._reducerDefinitionType === "reducerWithPrepare";
}
function QS({ type: n, reducerName: l }, i, u, c) {
  if (!c) throw new Error(vn(18));
  const {
      payloadCreator: o,
      fulfilled: d,
      pending: h,
      rejected: y,
      settled: m,
      options: v,
    } = i,
    x = c(n, o, v);
  u.exposeAction(l, x),
    d && u.addCase(x.fulfilled, d),
    h && u.addCase(x.pending, h),
    y && u.addCase(x.rejected, y),
    m && u.addMatcher(x.settled, m),
    u.exposeCaseReducer(l, {
      fulfilled: d || ws,
      pending: h || ws,
      rejected: y || ws,
      settled: m || ws,
    });
}
function ws() {}
function vn(n) {
  return `Minified Redux Toolkit error #${n}; visit https://redux-toolkit.js.org/Errors?code=${n} for the full message or use the non-minified dev environment for full errors. `;
}
const YS = { isSideOpen: !1 },
  jg = aa({
    name: "sidebar",
    initialState: YS,
    reducers: {
      setIsSideOpen: (n, l) => {
        n.isSideOpen = l.payload;
      },
      toggleSide: (n) => {
        n.isSideOpen = !n.isSideOpen;
      },
    },
  }),
  { setIsSideOpen: sv, toggleSide: GS } = jg.actions,
  zg = (n) => n.sidebar,
  XS = jg.reducer,
  KS = () => {
    const n = nu(),
      l = au(zg).isSideOpen;
    return Z.jsx("div", {
      className:
        "w-full border-b-[3px] border-blue-600 sticky top-0 h-[80px] z__header bg-[#000]",
      children: Z.jsxs("div", {
        className:
          "w-full h-full items-center grid grid-cols-2 pl-3 pr-4 sm:pr-8",
        children: [
          Z.jsx(ec, {
            to: "/",
            className: "txt__6 text-blue-600 w-fit",
            children: "PERN__BOOK",
          }),
          Z.jsx("div", {
            className: "w-full flex justify-end txt__col",
            children: Z.jsx("button", {
              onClick: () => n(GS()),
              children: l
                ? Z.jsx(G2, { className: "icon__close" })
                : Z.jsx(A2, { className: "icon__lg icon__logic" }),
            }),
          }),
        ],
      }),
    });
  },
  Ug = ({ el: n, handleSideClick: l }) =>
    Z.jsxs(dg, {
      onClick: l,
      to: n.path,
      className:
        "w-fit flex justify-start gap-5 group el__after_below items-center nav_link",
      children: [
        Z.jsx(n.icon, { className: "icon__with_txt icon__md" }),
        Z.jsx("span", {
          className: "txt__2 el__flow group-hover:text-blue-600",
          children: n.label,
        }),
      ],
    });
function $S(n) {
  return at({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z",
        },
        child: [],
      },
    ],
  })(n);
}
function FS(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z",
        },
        child: [],
      },
    ],
  })(n);
}
function JS(n) {
  return at({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z",
        },
        child: [],
      },
    ],
  })(n);
}
function kg(n) {
  return at({
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z",
        },
        child: [],
      },
    ],
  })(n);
}
function Lg(n) {
  return at({
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",
        },
        child: [],
      },
    ],
  })(n);
}
function PS(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z",
        },
        child: [],
      },
    ],
  })(n);
}
function WS(n) {
  return at({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M635.7 167.2L556.1 31.7c-8.8-15-28.3-20.1-43.5-11.5l-69 39.1L503.3 161c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L416 75l-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L333.2 122 278 153.3 337.8 255c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-59.7-101.7-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-27.9-47.5-55.2 31.3 59.7 101.7c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L84.9 262.9l-69 39.1C.7 310.7-4.6 329.8 4.2 344.8l79.6 135.6c8.8 15 28.3 20.1 43.5 11.5L624.1 210c15.2-8.6 20.4-27.8 11.6-42.8z",
        },
        child: [],
      },
    ],
  })(n);
}
function IS(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z",
        },
        child: [],
      },
    ],
  })(n);
}
const ex = ({ isDropOpen: n, setIsDropOpen: l, el: i }) =>
    Z.jsxs("div", {
      onClick: () => l(!n),
      className: "w-full grid grid-cols-[1fr_50px] group cursor-pointer",
      children: [
        Z.jsxs("div", {
          className: "w-fit flex gap-5 justify-start items-center",
          children: [
            Z.jsx(i.icon, { className: "icon__md icon__with_txt" }),
            Z.jsx("span", {
              className: "txt__2 group-hover:text-blue-600 el__flow",
              children: i.label,
            }),
          ],
        }),
        Z.jsx(JS, {
          className: `icon__md icon__with_txt justify-self-end ${
            n ? "rotate-180" : ""
          } `,
        }),
      ],
    }),
  Et = [];
for (let n = 0; n < 256; ++n) Et.push((n + 256).toString(16).slice(1));
function tx(n, l = 0) {
  return (
    Et[n[l + 0]] +
    Et[n[l + 1]] +
    Et[n[l + 2]] +
    Et[n[l + 3]] +
    "-" +
    Et[n[l + 4]] +
    Et[n[l + 5]] +
    "-" +
    Et[n[l + 6]] +
    Et[n[l + 7]] +
    "-" +
    Et[n[l + 8]] +
    Et[n[l + 9]] +
    "-" +
    Et[n[l + 10]] +
    Et[n[l + 11]] +
    Et[n[l + 12]] +
    Et[n[l + 13]] +
    Et[n[l + 14]] +
    Et[n[l + 15]]
  ).toLowerCase();
}
let Hf;
const nx = new Uint8Array(16);
function ax() {
  if (!Hf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    Hf = crypto.getRandomValues.bind(crypto);
  }
  return Hf(nx);
}
const lx =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  cv = { randomUUID: lx };
function cn(n, l, i) {
  var c;
  if (cv.randomUUID && !n) return cv.randomUUID();
  n = n || {};
  const u = n.random ?? ((c = n.rng) == null ? void 0 : c.call(n)) ?? ax();
  if (u.length < 16) throw new Error("Random bytes length must be >= 16");
  return (u[6] = (u[6] & 15) | 64), (u[8] = (u[8] & 63) | 128), tx(u);
}
function rx(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "4" }, child: [] },
      {
        tag: "path",
        attr: { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" },
        child: [],
      },
    ],
  })(n);
}
function ix(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" },
        child: [],
      },
      {
        tag: "line",
        attr: { x1: "12", x2: "12.01", y1: "17", y2: "17" },
        child: [],
      },
    ],
  })(n);
}
function ux(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "7", cy: "12", r: "3" }, child: [] },
      { tag: "path", attr: { d: "M10 9v6" }, child: [] },
      { tag: "circle", attr: { cx: "17", cy: "12", r: "3" }, child: [] },
      { tag: "path", attr: { d: "M14 7v8" }, child: [] },
    ],
  })(n);
}
function sx(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "m3 15 4-8 4 8" }, child: [] },
      { tag: "path", attr: { d: "M4 13h6" }, child: [] },
      {
        tag: "path",
        attr: { d: "M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4" },
        child: [],
      },
    ],
  })(n);
}
function cx(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M11.5 15H7a4 4 0 0 0-4 4v2" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        },
        child: [],
      },
      { tag: "circle", attr: { cx: "10", cy: "7", r: "4" }, child: [] },
    ],
  })(n);
}
function ox(n) {
  return at({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M8 10v-7l-2 2" }, child: [] },
      {
        tag: "path",
        attr: { d: "M6 16a2 2 0 1 1 4 0c0 .591 -.601 1.46 -1 2l-3 3h4" },
        child: [],
      },
      {
        tag: "path",
        attr: { d: "M15 14a2 2 0 1 0 2 -2a2 2 0 1 0 -2 -2" },
        child: [],
      },
      { tag: "path", attr: { d: "M6.5 10h3" }, child: [] },
    ],
  })(n);
}
function fx(n) {
  return at({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z",
        },
        child: [],
      },
    ],
  })(n);
}
var qg = ((n) => (
  (n.REGISTER = "/auth/register"),
  (n.LOGIN = "/auth/login"),
  (n.FORGOT_PASSWORD = "/auth/forgot-pwd"),
  (n.VERIFY_EMAIL = "/auth/verify-account"),
  n
))(qg || {});
const Bg = [
    { label: "Register", path: "/auth/register", icon: cx },
    { label: "Login", path: "/auth/login", icon: fx },
    { label: "Verify email", path: "/auth/verify-account", icon: IS },
    { label: "Recover account", path: "/auth/forgot-pwd", icon: PS },
  ],
  dx = { field: "email", label: "Email", type: "email" },
  Vg = [
    { field: "firstName", label: "First Name", place: "Your First Name..." },
    { field: "lastName", label: "Last Name", place: "Your Last Name..." },
    dx,
  ].map((n) => ({ ...n, id: cn() })),
  hx = { field: "password", label: "Password", type: "password" },
  mx = {
    field: "confirmPassword",
    label: "Confirm Password",
    place: "Confirm Your Password...",
    type: "password",
  },
  Hg = [hx, mx].map((n) => ({ ...n, id: cn() })),
  yx = [Vg.map((n) => n.field), [...Hg.map((n) => n.field), "terms"]],
  px = "abcdefghilmopqzwyx"
    .split("")
    .flatMap((n) => [n.toUpperCase(), n])
    .concat("0123456789".split(""))
    .concat("~!@#$%^&*()_-=+{}[].?,'".split("")),
  Zf = [
    { reg: /(?=.*[A-Z])/, icon: sx },
    { reg: /(?=.*[a-z])/, icon: ux },
    { reg: /(?=.*\d)/, icon: ox },
    { reg: /(?=.*[\W_])/, icon: rx },
    { reg: /.{8,}/, icon: WS },
  ].map((n) => ({ ...n, id: cn() })),
  [vx, gx, bx, _x] = Bg,
  Sx = [gx, bx].map((n, l) => ({
    ...n,
    msg: l ? "Email did not arrive ?" : "Already have an' account ?",
    msgBold: l ? "Recover account" : "Login",
    id: cn(),
  })),
  xx = [vx, _x].map((n, l) => ({
    ...n,
    msg: l ? "Forgot password ?" : "Don't have an' account ?",
    msgBold: l ? "Resend email" : "Register",
    id: cn(),
  }));
function Ex(n) {
  return at({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z",
        },
        child: [],
      },
    ],
  })(n);
}
function wx(n) {
  return at({
    attr: { viewBox: "0 0 24 24", fill: "currentColor" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M3 4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509ZM5 5V19H19V5H5ZM7.97216 18.1808C7.35347 17.9129 6.76719 17.5843 6.22083 17.2024C7.46773 15.2753 9.63602 14 12.1022 14C14.5015 14 16.6189 15.2071 17.8801 17.0472C17.3438 17.4436 16.7664 17.7877 16.1555 18.0718C15.2472 16.8166 13.77 16 12.1022 16C10.3865 16 8.87271 16.8641 7.97216 18.1808ZM12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13ZM12 11C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.1716 8 10.5 8.67157 10.5 9.5C10.5 10.3284 11.1716 11 12 11Z",
        },
        child: [],
      },
    ],
  })(n);
}
const Tx = [
    { label: "Home", path: "/", icon: Ex },
    { label: "Books", path: "to-do", icon: $S },
  ].map((n) => ({ ...n, id: cn() })),
  Ax = [...Bg].map((n) => ({ ...n, id: cn() })),
  Rx = { label: "Account", icon: wx },
  Ox = ({ handleSideClick: n }) => {
    const [l, i] = j.useState(!1);
    return Z.jsxs("div", {
      className: "w-full grid gap-5",
      children: [
        Z.jsx(ex, { isDropOpen: l, setIsDropOpen: i, el: Rx }),
        Z.jsx("div", {
          className: `w-full grid el__flow ${
            l
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } `,
          children: Z.jsx("div", {
            className: `grid gap-5 el__flow ${l ? "" : "-translate-y-[50px]"}`,
            children: Ax.map((u) =>
              Z.jsx(Ug, { el: u, handleSideClick: n }, u.id)
            ),
          }),
        }),
      ],
    });
  },
  Cx = () => {
    const n = j.useRef(null),
      l = nu(),
      i = au(zg).isSideOpen;
    j.useEffect(() => {
      const c = (o) => {
        n.current && !n.current.contains(o.target) && l(sv(!1));
      };
      return (
        document.addEventListener("mousedown", c),
        () => {
          document.removeEventListener("mousedown", c);
        }
      );
    }, [l]);
    const u = () => l(sv(!1));
    return Z.jsxs(Z.Fragment, {
      children: [
        Z.jsx("div", {
          className: `w-full z__sidebar_bg inset-0 bg-black/50 ${
            i ? "fixed" : "hidden"
          }`,
        }),
        Z.jsx("div", {
          ref: n,
          className: `fixed top-[80px] bottom-0 right-0 w-[300px] sm:w-[500px] bg-[#000]  border-l-[3px] border-blue-600 transition-all duration-500 z__sidebar txt__col overflow-y-auto scrollbar__y scrollbar__app ${
            i ? "opacity-100" : "opacity-0 translate-x-full"
          } `,
          children: Z.jsx("div", {
            className: "max-w-full relative grid gap-4",
            children: Z.jsxs("div", {
              className: "grid gap-5 px-5 pt-5",
              children: [
                Tx.map((c) => Z.jsx(Ug, { el: c, handleSideClick: u }, c.id)),
                Z.jsx(Ox, { handleSideClick: u }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  Mx = "/assets/1-CdRvRdCC.avif",
  Nx = "/assets/2-B834IbOU.avif",
  Dx = "/assets/3-CCwT6JH8.avif",
  jx = "/assets/4-Bo6LHwuz.avif",
  zx = "/assets/5-BOqO4lNR.avif",
  Zg = [Mx, Nx, Dx, jx, zx].flatMap((n) => [
    { src: n, id: cn() },
    { src: n, id: cn() },
  ]),
  Ux = "_btn__hero_xn05h_2",
  ov = { btn__hero: Ux },
  fv = { md: 768, lg: 1024 },
  dv = Zg.length,
  hv = () =>
    window.innerWidth >= fv.lg ? 350 : window.innerWidth >= fv.md ? 300 : 200,
  kx = () => {
    const [n, l] = j.useState(0),
      [i, u] = j.useState(hv()),
      c = j.useRef(!1);
    j.useEffect(() => {
      const y = () => u(hv());
      return (
        window.addEventListener("resize", y),
        () => window.removeEventListener("resize", y)
      );
    }, []);
    const o = () => {
        (c.current = !0), setTimeout(() => (c.current = !1), 1e3);
      },
      d = j.useCallback(() => l((y) => (y === dv - 1 ? 0 : y + 1)), []),
      h = () => {
        o(), l((y) => (y === 0 ? dv - 1 : y - 1));
      };
    return (
      j.useEffect(() => {
        const y = setInterval(() => {
          c.current || d();
        }, 1250);
        return () => clearInterval(y);
      }, [d]),
      Z.jsx("div", {
        className: "w-full flex px-10",
        children: Z.jsxs("div", {
          className: "w-full grid txt__col mt-10 relative",
          children: [
            Z.jsx("button", {
              onClick: h,
              className: `${ov.btn__hero} group -left-[20px]`,
              children: Z.jsx(kg, { className: "icon__md icon__with_txt" }),
            }),
            Z.jsx("div", {
              className:
                "w-full flex gap-[25px] overflow-hidden p-5 el__border_md",
              children: Z.jsx("div", {
                className: "flex gap-[25px] transition-all duration-500",
                style: { transform: `translateX(-${n * (i + 25)}px)` },
                children: Zg.map((y, m) =>
                  Z.jsx(
                    "div",
                    {
                      className: "rounded-xl overflow-hidden",
                      style: { width: i, height: i },
                      children: Z.jsx("img", {
                        src: y.src,
                        alt: `img__${m}`,
                        className: "w-full h-full",
                      }),
                    },
                    y.id
                  )
                ),
              }),
            }),
            Z.jsx("button", {
              onClick: () => {
                o(), d();
              },
              className: `${ov.btn__hero} -right-[20px] group`,
              children: Z.jsx(Lg, { className: "icon__md icon__with_txt" }),
            }),
          ],
        }),
      })
    );
  },
  Lx = /^\/[/]*$/,
  mv = /^[a-zA-ZÀ-ÿ`'-\s]+$/,
  Qg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;
var fr = ((n) => ((n.OK = "SUCCESS"), (n.ERR = "ERROR"), (n.INFO = "INFO"), n))(
  fr || {}
);
const qx = { isToastPrev: !1, isToast: !1, toast: null },
  Yg = aa({
    name: "toast",
    initialState: qx,
    reducers: {
      openToast: (n, l) => {
        (n.isToastPrev = n.isToast), (n.isToast = !0), (n.toast = l.payload);
      },
      closeToast: (n) => {
        (n.isToastPrev = !1), (n.isToast = !1);
      },
      reopenToast: (n) => {
        (n.isToastPrev = !1), (n.isToast = !0);
      },
    },
  }),
  { openToast: Bx, closeToast: yv, reopenToast: Vx } = Yg.actions,
  Hx = (n) => n.toast,
  Zx = Yg.reducer,
  Qx = () => {
    var E;
    const n = j.useRef(null),
      l = j.useRef(null),
      i = j.useRef(null),
      u = j.useRef(!1),
      c = au(Hx),
      { toast: o, isToast: d, isToastPrev: h } = c,
      y = nu(),
      m = j.useCallback(() => {
        n.current.classList.remove("toast__out"),
          l.current.classList.remove("el__timer_toast"),
          requestAnimationFrame(() => {
            var w, N;
            (w = n == null ? void 0 : n.current) == null ||
              w.classList.add("toast__in"),
              (N = l == null ? void 0 : l.current) == null ||
                N.classList.add("el__timer_toast");
          }),
          (i.current = setTimeout(() => {
            clearTimeout(i.current),
              (i.current = null),
              (u.current = !0),
              y(yv());
          }, 3e3));
      }, [y]),
      v = j.useCallback(() => {
        var w;
        (u.current = !1),
          (w = n == null ? void 0 : n.current) == null ||
            w.classList.remove("toast__in"),
          clearTimeout(i.current),
          (i.current = null),
          requestAnimationFrame(() => {
            var N;
            (N = n == null ? void 0 : n.current) == null ||
              N.classList.add("toast__out");
          });
      }, []),
      x = j.useCallback(() => {
        var w;
        (w = n == null ? void 0 : n.current) == null ||
          w.classList.remove("toast__in"),
          requestAnimationFrame(() => {
            var N;
            (N = n == null ? void 0 : n.current) == null ||
              N.classList.add("toast__out");
          }),
          clearTimeout(i.current),
          (i.current = null),
          setTimeout(() => {
            y(Vx());
          }, 300);
      }, [y]);
    j.useEffect(() => {
      (() => {
        !n || !l || (d && h ? x() : d && !h ? m() : !d && u.current && v());
      })();
    }, [d, m, v, x, h]),
      j.useEffect(() => {}, []);
    const b = () => {
      (u.current = !0), y(yv());
    };
    return Z.jsx("div", {
      ref: n,
      className: `z__toast fixed top-5 right-5 border-[3px] bg-[#000] rounded-xl w-fit min-w-[300px] sm:min-w-[450px] max-w-[80vw] sm:max-w-[500px] md:max-w-[600px] el__toast_container overflow-hidden ${
        (o == null ? void 0 : o.type) === fr.OK
          ? "border-green-600"
          : "border-red-600"
      }`,
      style: { transform: "translateX(150%)", opacity: 0 },
      children: Z.jsxs("div", {
        className: "w-full grid justify-items-start relative pb-2",
        children: [
          Z.jsx("div", {
            className: `w-full flex justify-start pt-[4px] px-8 ${
              (o == null ? void 0 : o.type) === fr.OK
                ? "text-green-600"
                : "text-red-600"
            }`,
            children: Z.jsx("span", {
              className: "txt__4",
              children: o == null ? void 0 : o.type,
            }),
          }),
          Z.jsx("div", {
            className: `absolute top-0 bottom-0 left-0 min-w-[10px] min-h-[120%] ${
              (o == null ? void 0 : o.type) === fr.OK
                ? "bg-green-600"
                : "bg-red-600"
            }`,
          }),
          Z.jsx("button", {
            onClick: b,
            className:
              "appearance-none top-[4px] right-[4px] absolute btn__toast",
            children: Z.jsx(X2, { className: "icon__md text-red-600" }),
          }),
          Z.jsx("div", {
            className: "w-full flex justify-start txt__col py-1 px-8",
            children: Z.jsx("span", {
              className: "txt__3",
              children:
                (E = o == null ? void 0 : o.msg) == null
                  ? void 0
                  : E.toUpperCase(),
            }),
          }),
          Z.jsx("div", {
            ref: l,
            className: `absolute left-0 bottom-0 h-[3px] ${
              (o == null ? void 0 : o.type) === fr.OK
                ? "bg-green-600"
                : "bg-red-600"
            }`,
            style: { width: "100%" },
          }),
        ],
      }),
    });
  },
  Yx = () =>
    Z.jsx("div", { className: "w-full border-t-[3px] border-blue-600" }),
  Gx = () => {
    const n = kn().pathname;
    return Z.jsxs("div", {
      className: "w-full min-h-screen bg-neutral-950 flex flex-col relative",
      children: [
        Z.jsx(KS, {}),
        Z.jsx(Qx, {}),
        Lx.test(n) && Z.jsx(kx, {}),
        Z.jsx(Cx, {}),
        Z.jsx("div", {
          className: "w-full px-5 sm:px-10 pt-6 pb-[100px] flex justify-center",
          children: Z.jsx(ug, {}),
        }),
        Z.jsx(Yx, {}),
      ],
    });
  },
  Xx = { isLogged: !!sessionStorage.getItem("accessToken") },
  Gg = aa({
    name: "auth",
    initialState: Xx,
    reducers: {
      login(n) {
        n.isLogged = !0;
      },
      logout(n) {
        n.isLogged = !1;
      },
    },
  }),
  { login: $4, logout: F4 } = Gg.actions,
  Kx = (n) => n.auth,
  $x = Gg.reducer,
  Fx = () =>
    au(Kx).isLogged ? Z.jsx(ig, { to: "/", replace: !0 }) : Z.jsx(ug, {}),
  Jx = ({ title: n }) =>
    Z.jsx("div", {
      className: "w-full flex justify-center txt__col",
      children: Z.jsx("h1", { className: "txt__5", children: n }),
    }),
  Px = "_btn__swapper_cnlnc_2",
  pv = { btn__swapper: Px },
  Wx = ({
    currForm: n,
    setCurrForm: l,
    totLen: i,
    children: u,
    isNextDisabled: c,
  }) =>
    Z.jsxs("div", {
      className: "w-full grid grid-cols-[50px_1fr_50px] items-center",
      children: [
        Z.jsx("button", {
          onClick: () => n && l(n - 1),
          disabled: !n,
          className: `justify-self-start ${n ? "group" : ""} ${
            pv.btn__swapper
          }`,
          children: Z.jsx(kg, { className: "icon__sm icon__with_txt" }),
        }),
        n === i - 1 && u
          ? Z.jsx("div", {
              className: `w-full justify-center sm:col-span-1 ${
                n === i - 1 ? "col-span-2 sm:col-span-1" : ""
              }`,
              children: u,
            })
          : Z.jsx("div", {}),
        n === i - 1
          ? null
          : Z.jsx("button", {
              disabled: c,
              onClick: () => n < i - 1 && l(n + 1),
              className: `justify-self-end ${c ? "" : "group"} ${
                pv.btn__swapper
              }`,
              children: Z.jsx(Lg, { className: "icon__sm icon__with_txt" }),
            }),
      ],
    }),
  Ix = "_check__terms_1yd5n_1",
  e3 = "_checky_1yd5n_9",
  Qf = { check__terms: Ix, checky: e3 },
  Xg = (n, l) => {
    var o;
    const [i, u] = j.useState(null),
      c = (o = n == null ? void 0 : n[l]) == null ? void 0 : o.message;
    return (
      j.useEffect(() => {
        c && !i && u(c);
      }, [c, i, n]),
      { prevErr: i }
    );
  },
  t3 = ({ setValue: n, watch: l, errors: i }) => {
    var d, h;
    const u = j.useRef(null),
      { prevErr: c } = Xg(i, "terms");
    j.useEffect(() => {
      const y = (m) => {
        u.current &&
          u.current &&
          u.current.contains(m.target) &&
          (u.current.classList.remove(Qf.checky),
          requestAnimationFrame(() => {
            var v;
            (v = u.current) == null || v.classList.add(Qf.checky);
          }));
      };
      return (
        document.addEventListener("click", y),
        () => document.removeEventListener("click", y)
      );
    }, []);
    const o = l("terms");
    return Z.jsxs("div", {
      className: "w-fit flex items-center justify-start gap-5 relative",
      children: [
        Z.jsx("div", {
          onClick: () => n("terms", !l("terms"), { shouldValidate: !0 }),
          ref: u,
          className: `min-w-[30px] min-h-[30px] rounded-xl relative el__flow cursor-pointer ${Qf.check__terms}`,
          style: {
            "--check-color":
              typeof o == "object" ? "#2563eb" : o ? "#16a34a" : "#dc2626",
          },
          children: Z.jsx("div", {
            className: `absolute border-l-[4px] border-b-[4px] h-5 w-10 border-green-600 -top-[12px] left-0 -rotate-45 transition-all duration-150 delay-75 ${
              o ? "scale-100" : "scale-0"
            }`,
          }),
        }),
        Z.jsx("span", {
          className: "txt__2",
          children: "I agree terms and conditions",
        }),
        Z.jsx("div", {
          className: `absolute -bottom-[150%] left-0 transition-all duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-60 ${
            (d = i == null ? void 0 : i.terms) != null && d.message
              ? "translate-y-0 opacity-100"
              : "translate-y-[200%] opacity-0"
          }`,
          children:
            ((h = i == null ? void 0 : i.terms) == null ? void 0 : h.message) ||
            c,
        }),
      ],
    });
  },
  n3 = ({ currForm: n, totLen: l }) => {
    const [i] = j.useState(Array.from({ length: l }, () => cn()));
    return Z.jsx("div", {
      className: "w-full grid max-w-[600px]",
      children: Z.jsxs("div", {
        className: "w-full relative flex justify-between",
        children: [
          Z.jsx("div", {
            className: `absolute border-[3px] border-blue-600 top-1/4\r
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500`,
          }),
          Z.jsx("div", {
            className: `absolute border-[3px] border-blue-600 bg-blue-600 top-1/4
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500`,
            style: { width: `${(100 / l) * (n + 1)}%` },
          }),
          i.map((u, c) =>
            Z.jsx(
              "div",
              {
                className: "w-full flex z-30 justify-end",
                children: Z.jsx("div", {
                  className: `border-[3px]  rounded-full h-[45px] w-[45px] flex justify-center items-center transition-all duration-500 txt__col ${
                    c === n ? "scale-[1.35]" : ""
                  } ${
                    n >= c
                      ? "bg-blue-600 border-[whitesmoke]"
                      : "border-blue-600 bg-neutral-950"
                  }`,
                  children:
                    c + 1 === l
                      ? Z.jsx(FS, { className: "min-w-[25px] min-h-[25px]" })
                      : Z.jsx("span", {
                          className: `${c === n ? "txt__4" : "txt__3"}`,
                          children: c + 1,
                        }),
                }),
              },
              u
            )
          ),
        ],
      }),
    });
  },
  a3 = () => {
    const [n] = j.useState(Array.from({ length: 4 }, () => cn()));
    return Z.jsx("div", {
      className: "w-full flex justify-center gap-[15px] items-center",
      children: n.map((l, i) =>
        Z.jsx("div", {
          id: l,
          className:
            "min-w-[35px] min-h-[35px] bg-blue-600 rounded-full el__spinner_btn",
          style: { "--delay_spinner_btn": i * 0.25 + "s" },
        })
      ),
    });
  },
  l3 = (n, l) => Math.random() * (l - n) + n,
  r3 = (n) => {
    let l = n.length - 1;
    do {
      const i = Math.floor(Math.random() * (l + 1));
      ([n[l], n[i]] = [n[i], n[l]]), l--;
    } while (l > 0);
    return n;
  },
  vv = () => l3(-1200, 1200),
  i3 = ({
    isPending: n,
    label: l,
    type: i = "submit",
    Icon: u,
    isDisabled: c,
  }) => {
    const o = j.useRef(null),
      [d] = j.useState(Array.from({ length: 30 }, () => cn()));
    return (
      j.useEffect(() => {
        const h = (y) => {
          if (o.current && o.current.contains(y.target)) {
            let m = 0;
            do {
              const v = document.getElementById(d[m]);
              if (!v) {
                m++;
                continue;
              }
              v.classList.remove("el__bubble"),
                requestAnimationFrame(() => v.classList.add("el__bubble")),
                m++;
            } while (m < d.length);
          }
        };
        return (
          document.addEventListener("mousedown", h),
          () => document.removeEventListener("mousedown", h)
        );
      }, [d]),
      n
        ? Z.jsx(a3, {})
        : Z.jsxs("button", {
            type: i,
            ref: o,
            disabled: c,
            className:
              "appearance-none w-full el__border_sm py-2 px-10 flex justify-center items-center disabled:opacity-50 btn__container",
            children: [
              d.map((h, y) =>
                Z.jsx(
                  "div",
                  {
                    id: h,
                    className: `absolute bottom-1/2 rounded-full pointer-events-none ${
                      y % 2 === 0
                        ? "w-[8px] h-[8px] border-2 border-blue-600"
                        : "h-[5px] w-[5px] bg-blue-600"
                    } `,
                    style: {
                      left: "50%",
                      top: "50%",
                      translate: "-50% -50%",
                      "--pos": `${vv()}%, ${vv()}%`,
                      transform: "scale(0)",
                      opacity: "0",
                    },
                  },
                  h
                )
              ),
              Z.jsxs("div", {
                className: "w-full flex justify-center items-center gap-5",
                children: [
                  u && Z.jsx(u, { className: "icon__sm" }),
                  Z.jsx("span", { className: "txt__3", children: l }),
                ],
              }),
            ],
          })
    );
  };
var Be;
(function (n) {
  n.assertEqual = (c) => c;
  function l(c) {}
  n.assertIs = l;
  function i(c) {
    throw new Error();
  }
  (n.assertNever = i),
    (n.arrayToEnum = (c) => {
      const o = {};
      for (const d of c) o[d] = d;
      return o;
    }),
    (n.getValidEnumValues = (c) => {
      const o = n.objectKeys(c).filter((h) => typeof c[c[h]] != "number"),
        d = {};
      for (const h of o) d[h] = c[h];
      return n.objectValues(d);
    }),
    (n.objectValues = (c) =>
      n.objectKeys(c).map(function (o) {
        return c[o];
      })),
    (n.objectKeys =
      typeof Object.keys == "function"
        ? (c) => Object.keys(c)
        : (c) => {
            const o = [];
            for (const d in c)
              Object.prototype.hasOwnProperty.call(c, d) && o.push(d);
            return o;
          }),
    (n.find = (c, o) => {
      for (const d of c) if (o(d)) return d;
    }),
    (n.isInteger =
      typeof Number.isInteger == "function"
        ? (c) => Number.isInteger(c)
        : (c) => typeof c == "number" && isFinite(c) && Math.floor(c) === c);
  function u(c, o = " | ") {
    return c.map((d) => (typeof d == "string" ? `'${d}'` : d)).join(o);
  }
  (n.joinValues = u),
    (n.jsonStringifyReplacer = (c, o) =>
      typeof o == "bigint" ? o.toString() : o);
})(Be || (Be = {}));
var ld;
(function (n) {
  n.mergeShapes = (l, i) => ({ ...l, ...i });
})(ld || (ld = {}));
const ve = Be.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  la = (n) => {
    switch (typeof n) {
      case "undefined":
        return ve.undefined;
      case "string":
        return ve.string;
      case "number":
        return isNaN(n) ? ve.nan : ve.number;
      case "boolean":
        return ve.boolean;
      case "function":
        return ve.function;
      case "bigint":
        return ve.bigint;
      case "symbol":
        return ve.symbol;
      case "object":
        return Array.isArray(n)
          ? ve.array
          : n === null
          ? ve.null
          : n.then &&
            typeof n.then == "function" &&
            n.catch &&
            typeof n.catch == "function"
          ? ve.promise
          : typeof Map < "u" && n instanceof Map
          ? ve.map
          : typeof Set < "u" && n instanceof Set
          ? ve.set
          : typeof Date < "u" && n instanceof Date
          ? ve.date
          : ve.object;
      default:
        return ve.unknown;
    }
  },
  ce = Be.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  u3 = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class Pt extends Error {
  get errors() {
    return this.issues;
  }
  constructor(l) {
    super(),
      (this.issues = []),
      (this.addIssue = (u) => {
        this.issues = [...this.issues, u];
      }),
      (this.addIssues = (u = []) => {
        this.issues = [...this.issues, ...u];
      });
    const i = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, i)
      : (this.__proto__ = i),
      (this.name = "ZodError"),
      (this.issues = l);
  }
  format(l) {
    const i =
        l ||
        function (o) {
          return o.message;
        },
      u = { _errors: [] },
      c = (o) => {
        for (const d of o.issues)
          if (d.code === "invalid_union") d.unionErrors.map(c);
          else if (d.code === "invalid_return_type") c(d.returnTypeError);
          else if (d.code === "invalid_arguments") c(d.argumentsError);
          else if (d.path.length === 0) u._errors.push(i(d));
          else {
            let h = u,
              y = 0;
            for (; y < d.path.length; ) {
              const m = d.path[y];
              y === d.path.length - 1
                ? ((h[m] = h[m] || { _errors: [] }), h[m]._errors.push(i(d)))
                : (h[m] = h[m] || { _errors: [] }),
                (h = h[m]),
                y++;
            }
          }
      };
    return c(this), u;
  }
  static assert(l) {
    if (!(l instanceof Pt)) throw new Error(`Not a ZodError: ${l}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Be.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(l = (i) => i.message) {
    const i = {},
      u = [];
    for (const c of this.issues)
      c.path.length > 0
        ? ((i[c.path[0]] = i[c.path[0]] || []), i[c.path[0]].push(l(c)))
        : u.push(l(c));
    return { formErrors: u, fieldErrors: i };
  }
  get formErrors() {
    return this.flatten();
  }
}
Pt.create = (n) => new Pt(n);
const pr = (n, l) => {
  let i;
  switch (n.code) {
    case ce.invalid_type:
      n.received === ve.undefined
        ? (i = "Required")
        : (i = `Expected ${n.expected}, received ${n.received}`);
      break;
    case ce.invalid_literal:
      i = `Invalid literal value, expected ${JSON.stringify(
        n.expected,
        Be.jsonStringifyReplacer
      )}`;
      break;
    case ce.unrecognized_keys:
      i = `Unrecognized key(s) in object: ${Be.joinValues(n.keys, ", ")}`;
      break;
    case ce.invalid_union:
      i = "Invalid input";
      break;
    case ce.invalid_union_discriminator:
      i = `Invalid discriminator value. Expected ${Be.joinValues(n.options)}`;
      break;
    case ce.invalid_enum_value:
      i = `Invalid enum value. Expected ${Be.joinValues(
        n.options
      )}, received '${n.received}'`;
      break;
    case ce.invalid_arguments:
      i = "Invalid function arguments";
      break;
    case ce.invalid_return_type:
      i = "Invalid function return type";
      break;
    case ce.invalid_date:
      i = "Invalid date";
      break;
    case ce.invalid_string:
      typeof n.validation == "object"
        ? "includes" in n.validation
          ? ((i = `Invalid input: must include "${n.validation.includes}"`),
            typeof n.validation.position == "number" &&
              (i = `${i} at one or more positions greater than or equal to ${n.validation.position}`))
          : "startsWith" in n.validation
          ? (i = `Invalid input: must start with "${n.validation.startsWith}"`)
          : "endsWith" in n.validation
          ? (i = `Invalid input: must end with "${n.validation.endsWith}"`)
          : Be.assertNever(n.validation)
        : n.validation !== "regex"
        ? (i = `Invalid ${n.validation}`)
        : (i = "Invalid");
      break;
    case ce.too_small:
      n.type === "array"
        ? (i = `Array must contain ${
            n.exact ? "exactly" : n.inclusive ? "at least" : "more than"
          } ${n.minimum} element(s)`)
        : n.type === "string"
        ? (i = `String must contain ${
            n.exact ? "exactly" : n.inclusive ? "at least" : "over"
          } ${n.minimum} character(s)`)
        : n.type === "number"
        ? (i = `Number must be ${
            n.exact
              ? "exactly equal to "
              : n.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${n.minimum}`)
        : n.type === "date"
        ? (i = `Date must be ${
            n.exact
              ? "exactly equal to "
              : n.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${new Date(Number(n.minimum))}`)
        : (i = "Invalid input");
      break;
    case ce.too_big:
      n.type === "array"
        ? (i = `Array must contain ${
            n.exact ? "exactly" : n.inclusive ? "at most" : "less than"
          } ${n.maximum} element(s)`)
        : n.type === "string"
        ? (i = `String must contain ${
            n.exact ? "exactly" : n.inclusive ? "at most" : "under"
          } ${n.maximum} character(s)`)
        : n.type === "number"
        ? (i = `Number must be ${
            n.exact
              ? "exactly"
              : n.inclusive
              ? "less than or equal to"
              : "less than"
          } ${n.maximum}`)
        : n.type === "bigint"
        ? (i = `BigInt must be ${
            n.exact
              ? "exactly"
              : n.inclusive
              ? "less than or equal to"
              : "less than"
          } ${n.maximum}`)
        : n.type === "date"
        ? (i = `Date must be ${
            n.exact
              ? "exactly"
              : n.inclusive
              ? "smaller than or equal to"
              : "smaller than"
          } ${new Date(Number(n.maximum))}`)
        : (i = "Invalid input");
      break;
    case ce.custom:
      i = "Invalid input";
      break;
    case ce.invalid_intersection_types:
      i = "Intersection results could not be merged";
      break;
    case ce.not_multiple_of:
      i = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case ce.not_finite:
      i = "Number must be finite";
      break;
    default:
      (i = l.defaultError), Be.assertNever(n);
  }
  return { message: i };
};
let Kg = pr;
function s3(n) {
  Kg = n;
}
function Vs() {
  return Kg;
}
const Hs = (n) => {
    const { data: l, path: i, errorMaps: u, issueData: c } = n,
      o = [...i, ...(c.path || [])],
      d = { ...c, path: o };
    if (c.message !== void 0) return { ...c, path: o, message: c.message };
    let h = "";
    const y = u
      .filter((m) => !!m)
      .slice()
      .reverse();
    for (const m of y) h = m(d, { data: l, defaultError: h }).message;
    return { ...c, path: o, message: h };
  },
  c3 = [];
function me(n, l) {
  const i = Vs(),
    u = Hs({
      issueData: l,
      data: n.data,
      path: n.path,
      errorMaps: [
        n.common.contextualErrorMap,
        n.schemaErrorMap,
        i,
        i === pr ? void 0 : pr,
      ].filter((c) => !!c),
    });
  n.common.issues.push(u);
}
class Mt {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(l, i) {
    const u = [];
    for (const c of i) {
      if (c.status === "aborted") return Re;
      c.status === "dirty" && l.dirty(), u.push(c.value);
    }
    return { status: l.value, value: u };
  }
  static async mergeObjectAsync(l, i) {
    const u = [];
    for (const c of i) {
      const o = await c.key,
        d = await c.value;
      u.push({ key: o, value: d });
    }
    return Mt.mergeObjectSync(l, u);
  }
  static mergeObjectSync(l, i) {
    const u = {};
    for (const c of i) {
      const { key: o, value: d } = c;
      if (o.status === "aborted" || d.status === "aborted") return Re;
      o.status === "dirty" && l.dirty(),
        d.status === "dirty" && l.dirty(),
        o.value !== "__proto__" &&
          (typeof d.value < "u" || c.alwaysSet) &&
          (u[o.value] = d.value);
    }
    return { status: l.value, value: u };
  }
}
const Re = Object.freeze({ status: "aborted" }),
  dr = (n) => ({ status: "dirty", value: n }),
  zt = (n) => ({ status: "valid", value: n }),
  rd = (n) => n.status === "aborted",
  id = (n) => n.status === "dirty",
  gl = (n) => n.status === "valid",
  Bi = (n) => typeof Promise < "u" && n instanceof Promise;
function Zs(n, l, i, u) {
  if (typeof l == "function" ? n !== l || !0 : !l.has(n))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it"
    );
  return l.get(n);
}
function $g(n, l, i, u, c) {
  if (typeof l == "function" ? n !== l || !0 : !l.has(n))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it"
    );
  return l.set(n, i), i;
}
var Se;
(function (n) {
  (n.errToObj = (l) => (typeof l == "string" ? { message: l } : l || {})),
    (n.toString = (l) =>
      typeof l == "string" ? l : l == null ? void 0 : l.message);
})(Se || (Se = {}));
var Ri, Oi;
class zn {
  constructor(l, i, u, c) {
    (this._cachedPath = []),
      (this.parent = l),
      (this.data = i),
      (this._path = u),
      (this._key = c);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const gv = (n, l) => {
  if (gl(l)) return { success: !0, data: l.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const i = new Pt(n.common.issues);
      return (this._error = i), this._error;
    },
  };
};
function Ce(n) {
  if (!n) return {};
  const {
    errorMap: l,
    invalid_type_error: i,
    required_error: u,
    description: c,
  } = n;
  if (l && (i || u))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  return l
    ? { errorMap: l, description: c }
    : {
        errorMap: (d, h) => {
          var y, m;
          const { message: v } = n;
          return d.code === "invalid_enum_value"
            ? { message: v ?? h.defaultError }
            : typeof h.data > "u"
            ? {
                message:
                  (y = v ?? u) !== null && y !== void 0 ? y : h.defaultError,
              }
            : d.code !== "invalid_type"
            ? { message: h.defaultError }
            : {
                message:
                  (m = v ?? i) !== null && m !== void 0 ? m : h.defaultError,
              };
        },
        description: c,
      };
}
class De {
  get description() {
    return this._def.description;
  }
  _getType(l) {
    return la(l.data);
  }
  _getOrReturnCtx(l, i) {
    return (
      i || {
        common: l.parent.common,
        data: l.data,
        parsedType: la(l.data),
        schemaErrorMap: this._def.errorMap,
        path: l.path,
        parent: l.parent,
      }
    );
  }
  _processInputParams(l) {
    return {
      status: new Mt(),
      ctx: {
        common: l.parent.common,
        data: l.data,
        parsedType: la(l.data),
        schemaErrorMap: this._def.errorMap,
        path: l.path,
        parent: l.parent,
      },
    };
  }
  _parseSync(l) {
    const i = this._parse(l);
    if (Bi(i)) throw new Error("Synchronous parse encountered promise.");
    return i;
  }
  _parseAsync(l) {
    const i = this._parse(l);
    return Promise.resolve(i);
  }
  parse(l, i) {
    const u = this.safeParse(l, i);
    if (u.success) return u.data;
    throw u.error;
  }
  safeParse(l, i) {
    var u;
    const c = {
        common: {
          issues: [],
          async:
            (u = i == null ? void 0 : i.async) !== null && u !== void 0
              ? u
              : !1,
          contextualErrorMap: i == null ? void 0 : i.errorMap,
        },
        path: (i == null ? void 0 : i.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: l,
        parsedType: la(l),
      },
      o = this._parseSync({ data: l, path: c.path, parent: c });
    return gv(c, o);
  }
  "~validate"(l) {
    var i, u;
    const c = {
      common: { issues: [], async: !!this["~standard"].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: l,
      parsedType: la(l),
    };
    if (!this["~standard"].async)
      try {
        const o = this._parseSync({ data: l, path: [], parent: c });
        return gl(o) ? { value: o.value } : { issues: c.common.issues };
      } catch (o) {
        !(
          (u =
            (i = o == null ? void 0 : o.message) === null || i === void 0
              ? void 0
              : i.toLowerCase()) === null || u === void 0
        ) &&
          u.includes("encountered") &&
          (this["~standard"].async = !0),
          (c.common = { issues: [], async: !0 });
      }
    return this._parseAsync({ data: l, path: [], parent: c }).then((o) =>
      gl(o) ? { value: o.value } : { issues: c.common.issues }
    );
  }
  async parseAsync(l, i) {
    const u = await this.safeParseAsync(l, i);
    if (u.success) return u.data;
    throw u.error;
  }
  async safeParseAsync(l, i) {
    const u = {
        common: {
          issues: [],
          contextualErrorMap: i == null ? void 0 : i.errorMap,
          async: !0,
        },
        path: (i == null ? void 0 : i.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: l,
        parsedType: la(l),
      },
      c = this._parse({ data: l, path: u.path, parent: u }),
      o = await (Bi(c) ? c : Promise.resolve(c));
    return gv(u, o);
  }
  refine(l, i) {
    const u = (c) =>
      typeof i == "string" || typeof i > "u"
        ? { message: i }
        : typeof i == "function"
        ? i(c)
        : i;
    return this._refinement((c, o) => {
      const d = l(c),
        h = () => o.addIssue({ code: ce.custom, ...u(c) });
      return typeof Promise < "u" && d instanceof Promise
        ? d.then((y) => (y ? !0 : (h(), !1)))
        : d
        ? !0
        : (h(), !1);
    });
  }
  refinement(l, i) {
    return this._refinement((u, c) =>
      l(u) ? !0 : (c.addIssue(typeof i == "function" ? i(u, c) : i), !1)
    );
  }
  _refinement(l) {
    return new Sn({
      schema: this,
      typeName: Te.ZodEffects,
      effect: { type: "refinement", refinement: l },
    });
  }
  superRefine(l) {
    return this._refinement(l);
  }
  constructor(l) {
    (this.spa = this.safeParseAsync),
      (this._def = l),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: (i) => this["~validate"](i),
      });
  }
  optional() {
    return Dn.create(this, this._def);
  }
  nullable() {
    return Ya.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return gn.create(this);
  }
  promise() {
    return gr.create(this, this._def);
  }
  or(l) {
    return Qi.create([this, l], this._def);
  }
  and(l) {
    return Yi.create(this, l, this._def);
  }
  transform(l) {
    return new Sn({
      ...Ce(this._def),
      schema: this,
      typeName: Te.ZodEffects,
      effect: { type: "transform", transform: l },
    });
  }
  default(l) {
    const i = typeof l == "function" ? l : () => l;
    return new Fi({
      ...Ce(this._def),
      innerType: this,
      defaultValue: i,
      typeName: Te.ZodDefault,
    });
  }
  brand() {
    return new Rd({ typeName: Te.ZodBranded, type: this, ...Ce(this._def) });
  }
  catch(l) {
    const i = typeof l == "function" ? l : () => l;
    return new Ji({
      ...Ce(this._def),
      innerType: this,
      catchValue: i,
      typeName: Te.ZodCatch,
    });
  }
  describe(l) {
    const i = this.constructor;
    return new i({ ...this._def, description: l });
  }
  pipe(l) {
    return su.create(this, l);
  }
  readonly() {
    return Pi.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const o3 = /^c[^\s-]{8,}$/i,
  f3 = /^[0-9a-z]+$/,
  d3 = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  h3 =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  m3 = /^[a-z0-9_-]{21}$/i,
  y3 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  p3 =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  v3 =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  g3 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Yf;
const b3 =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  _3 =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  S3 =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  x3 =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  E3 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  w3 = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Fg =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  T3 = new RegExp(`^${Fg}$`);
function Jg(n) {
  let l = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return (
    n.precision
      ? (l = `${l}\\.\\d{${n.precision}}`)
      : n.precision == null && (l = `${l}(\\.\\d+)?`),
    l
  );
}
function A3(n) {
  return new RegExp(`^${Jg(n)}$`);
}
function Pg(n) {
  let l = `${Fg}T${Jg(n)}`;
  const i = [];
  return (
    i.push(n.local ? "Z?" : "Z"),
    n.offset && i.push("([+-]\\d{2}:?\\d{2})"),
    (l = `${l}(${i.join("|")})`),
    new RegExp(`^${l}$`)
  );
}
function R3(n, l) {
  return !!(
    ((l === "v4" || !l) && b3.test(n)) ||
    ((l === "v6" || !l) && S3.test(n))
  );
}
function O3(n, l) {
  if (!y3.test(n)) return !1;
  try {
    const [i] = n.split("."),
      u = i
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(i.length + ((4 - (i.length % 4)) % 4), "="),
      c = JSON.parse(atob(u));
    return !(
      typeof c != "object" ||
      c === null ||
      !c.typ ||
      !c.alg ||
      (l && c.alg !== l)
    );
  } catch {
    return !1;
  }
}
function C3(n, l) {
  return !!(
    ((l === "v4" || !l) && _3.test(n)) ||
    ((l === "v6" || !l) && x3.test(n))
  );
}
class yn extends De {
  _parse(l) {
    if (
      (this._def.coerce && (l.data = String(l.data)),
      this._getType(l) !== ve.string)
    ) {
      const o = this._getOrReturnCtx(l);
      return (
        me(o, {
          code: ce.invalid_type,
          expected: ve.string,
          received: o.parsedType,
        }),
        Re
      );
    }
    const u = new Mt();
    let c;
    for (const o of this._def.checks)
      if (o.kind === "min")
        l.data.length < o.value &&
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            code: ce.too_small,
            minimum: o.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "max")
        l.data.length > o.value &&
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            code: ce.too_big,
            maximum: o.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "length") {
        const d = l.data.length > o.value,
          h = l.data.length < o.value;
        (d || h) &&
          ((c = this._getOrReturnCtx(l, c)),
          d
            ? me(c, {
                code: ce.too_big,
                maximum: o.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: o.message,
              })
            : h &&
              me(c, {
                code: ce.too_small,
                minimum: o.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: o.message,
              }),
          u.dirty());
      } else if (o.kind === "email")
        v3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "email",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "emoji")
        Yf || (Yf = new RegExp(g3, "u")),
          Yf.test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "emoji",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty());
      else if (o.kind === "uuid")
        h3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "uuid",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "nanoid")
        m3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "nanoid",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "cuid")
        o3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "cuid",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "cuid2")
        f3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "cuid2",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "ulid")
        d3.test(l.data) ||
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            validation: "ulid",
            code: ce.invalid_string,
            message: o.message,
          }),
          u.dirty());
      else if (o.kind === "url")
        try {
          new URL(l.data);
        } catch {
          (c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "url",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty();
        }
      else
        o.kind === "regex"
          ? ((o.regex.lastIndex = 0),
            o.regex.test(l.data) ||
              ((c = this._getOrReturnCtx(l, c)),
              me(c, {
                validation: "regex",
                code: ce.invalid_string,
                message: o.message,
              }),
              u.dirty()))
          : o.kind === "trim"
          ? (l.data = l.data.trim())
          : o.kind === "includes"
          ? l.data.includes(o.value, o.position) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: { includes: o.value, position: o.position },
              message: o.message,
            }),
            u.dirty())
          : o.kind === "toLowerCase"
          ? (l.data = l.data.toLowerCase())
          : o.kind === "toUpperCase"
          ? (l.data = l.data.toUpperCase())
          : o.kind === "startsWith"
          ? l.data.startsWith(o.value) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: { startsWith: o.value },
              message: o.message,
            }),
            u.dirty())
          : o.kind === "endsWith"
          ? l.data.endsWith(o.value) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: { endsWith: o.value },
              message: o.message,
            }),
            u.dirty())
          : o.kind === "datetime"
          ? Pg(o).test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: "datetime",
              message: o.message,
            }),
            u.dirty())
          : o.kind === "date"
          ? T3.test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: "date",
              message: o.message,
            }),
            u.dirty())
          : o.kind === "time"
          ? A3(o).test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              code: ce.invalid_string,
              validation: "time",
              message: o.message,
            }),
            u.dirty())
          : o.kind === "duration"
          ? p3.test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "duration",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : o.kind === "ip"
          ? R3(l.data, o.version) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "ip",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : o.kind === "jwt"
          ? O3(l.data, o.alg) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "jwt",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : o.kind === "cidr"
          ? C3(l.data, o.version) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "cidr",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : o.kind === "base64"
          ? E3.test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "base64",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : o.kind === "base64url"
          ? w3.test(l.data) ||
            ((c = this._getOrReturnCtx(l, c)),
            me(c, {
              validation: "base64url",
              code: ce.invalid_string,
              message: o.message,
            }),
            u.dirty())
          : Be.assertNever(o);
    return { status: u.value, value: l.data };
  }
  _regex(l, i, u) {
    return this.refinement((c) => l.test(c), {
      validation: i,
      code: ce.invalid_string,
      ...Se.errToObj(u),
    });
  }
  _addCheck(l) {
    return new yn({ ...this._def, checks: [...this._def.checks, l] });
  }
  email(l) {
    return this._addCheck({ kind: "email", ...Se.errToObj(l) });
  }
  url(l) {
    return this._addCheck({ kind: "url", ...Se.errToObj(l) });
  }
  emoji(l) {
    return this._addCheck({ kind: "emoji", ...Se.errToObj(l) });
  }
  uuid(l) {
    return this._addCheck({ kind: "uuid", ...Se.errToObj(l) });
  }
  nanoid(l) {
    return this._addCheck({ kind: "nanoid", ...Se.errToObj(l) });
  }
  cuid(l) {
    return this._addCheck({ kind: "cuid", ...Se.errToObj(l) });
  }
  cuid2(l) {
    return this._addCheck({ kind: "cuid2", ...Se.errToObj(l) });
  }
  ulid(l) {
    return this._addCheck({ kind: "ulid", ...Se.errToObj(l) });
  }
  base64(l) {
    return this._addCheck({ kind: "base64", ...Se.errToObj(l) });
  }
  base64url(l) {
    return this._addCheck({ kind: "base64url", ...Se.errToObj(l) });
  }
  jwt(l) {
    return this._addCheck({ kind: "jwt", ...Se.errToObj(l) });
  }
  ip(l) {
    return this._addCheck({ kind: "ip", ...Se.errToObj(l) });
  }
  cidr(l) {
    return this._addCheck({ kind: "cidr", ...Se.errToObj(l) });
  }
  datetime(l) {
    var i, u;
    return typeof l == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          local: !1,
          message: l,
        })
      : this._addCheck({
          kind: "datetime",
          precision:
            typeof (l == null ? void 0 : l.precision) > "u"
              ? null
              : l == null
              ? void 0
              : l.precision,
          offset:
            (i = l == null ? void 0 : l.offset) !== null && i !== void 0
              ? i
              : !1,
          local:
            (u = l == null ? void 0 : l.local) !== null && u !== void 0
              ? u
              : !1,
          ...Se.errToObj(l == null ? void 0 : l.message),
        });
  }
  date(l) {
    return this._addCheck({ kind: "date", message: l });
  }
  time(l) {
    return typeof l == "string"
      ? this._addCheck({ kind: "time", precision: null, message: l })
      : this._addCheck({
          kind: "time",
          precision:
            typeof (l == null ? void 0 : l.precision) > "u"
              ? null
              : l == null
              ? void 0
              : l.precision,
          ...Se.errToObj(l == null ? void 0 : l.message),
        });
  }
  duration(l) {
    return this._addCheck({ kind: "duration", ...Se.errToObj(l) });
  }
  regex(l, i) {
    return this._addCheck({ kind: "regex", regex: l, ...Se.errToObj(i) });
  }
  includes(l, i) {
    return this._addCheck({
      kind: "includes",
      value: l,
      position: i == null ? void 0 : i.position,
      ...Se.errToObj(i == null ? void 0 : i.message),
    });
  }
  startsWith(l, i) {
    return this._addCheck({ kind: "startsWith", value: l, ...Se.errToObj(i) });
  }
  endsWith(l, i) {
    return this._addCheck({ kind: "endsWith", value: l, ...Se.errToObj(i) });
  }
  min(l, i) {
    return this._addCheck({ kind: "min", value: l, ...Se.errToObj(i) });
  }
  max(l, i) {
    return this._addCheck({ kind: "max", value: l, ...Se.errToObj(i) });
  }
  length(l, i) {
    return this._addCheck({ kind: "length", value: l, ...Se.errToObj(i) });
  }
  nonempty(l) {
    return this.min(1, Se.errToObj(l));
  }
  trim() {
    return new yn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new yn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new yn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((l) => l.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((l) => l.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((l) => l.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((l) => l.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((l) => l.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((l) => l.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((l) => l.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((l) => l.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((l) => l.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((l) => l.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((l) => l.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((l) => l.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((l) => l.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((l) => l.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((l) => l.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((l) => l.kind === "base64url");
  }
  get minLength() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "min" && (l === null || i.value > l) && (l = i.value);
    return l;
  }
  get maxLength() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "max" && (l === null || i.value < l) && (l = i.value);
    return l;
  }
}
yn.create = (n) => {
  var l;
  return new yn({
    checks: [],
    typeName: Te.ZodString,
    coerce:
      (l = n == null ? void 0 : n.coerce) !== null && l !== void 0 ? l : !1,
    ...Ce(n),
  });
};
function M3(n, l) {
  const i = (n.toString().split(".")[1] || "").length,
    u = (l.toString().split(".")[1] || "").length,
    c = i > u ? i : u,
    o = parseInt(n.toFixed(c).replace(".", "")),
    d = parseInt(l.toFixed(c).replace(".", ""));
  return (o % d) / Math.pow(10, c);
}
class Ha extends De {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(l) {
    if (
      (this._def.coerce && (l.data = Number(l.data)),
      this._getType(l) !== ve.number)
    ) {
      const o = this._getOrReturnCtx(l);
      return (
        me(o, {
          code: ce.invalid_type,
          expected: ve.number,
          received: o.parsedType,
        }),
        Re
      );
    }
    let u;
    const c = new Mt();
    for (const o of this._def.checks)
      o.kind === "int"
        ? Be.isInteger(l.data) ||
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.invalid_type,
            expected: "integer",
            received: "float",
            message: o.message,
          }),
          c.dirty())
        : o.kind === "min"
        ? (o.inclusive ? l.data < o.value : l.data <= o.value) &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.too_small,
            minimum: o.value,
            type: "number",
            inclusive: o.inclusive,
            exact: !1,
            message: o.message,
          }),
          c.dirty())
        : o.kind === "max"
        ? (o.inclusive ? l.data > o.value : l.data >= o.value) &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.too_big,
            maximum: o.value,
            type: "number",
            inclusive: o.inclusive,
            exact: !1,
            message: o.message,
          }),
          c.dirty())
        : o.kind === "multipleOf"
        ? M3(l.data, o.value) !== 0 &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.not_multiple_of,
            multipleOf: o.value,
            message: o.message,
          }),
          c.dirty())
        : o.kind === "finite"
        ? Number.isFinite(l.data) ||
          ((u = this._getOrReturnCtx(l, u)),
          me(u, { code: ce.not_finite, message: o.message }),
          c.dirty())
        : Be.assertNever(o);
    return { status: c.value, value: l.data };
  }
  gte(l, i) {
    return this.setLimit("min", l, !0, Se.toString(i));
  }
  gt(l, i) {
    return this.setLimit("min", l, !1, Se.toString(i));
  }
  lte(l, i) {
    return this.setLimit("max", l, !0, Se.toString(i));
  }
  lt(l, i) {
    return this.setLimit("max", l, !1, Se.toString(i));
  }
  setLimit(l, i, u, c) {
    return new Ha({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: l, value: i, inclusive: u, message: Se.toString(c) },
      ],
    });
  }
  _addCheck(l) {
    return new Ha({ ...this._def, checks: [...this._def.checks, l] });
  }
  int(l) {
    return this._addCheck({ kind: "int", message: Se.toString(l) });
  }
  positive(l) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Se.toString(l),
    });
  }
  negative(l) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Se.toString(l),
    });
  }
  nonpositive(l) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Se.toString(l),
    });
  }
  nonnegative(l) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Se.toString(l),
    });
  }
  multipleOf(l, i) {
    return this._addCheck({
      kind: "multipleOf",
      value: l,
      message: Se.toString(i),
    });
  }
  finite(l) {
    return this._addCheck({ kind: "finite", message: Se.toString(l) });
  }
  safe(l) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Se.toString(l),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Se.toString(l),
    });
  }
  get minValue() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "min" && (l === null || i.value > l) && (l = i.value);
    return l;
  }
  get maxValue() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "max" && (l === null || i.value < l) && (l = i.value);
    return l;
  }
  get isInt() {
    return !!this._def.checks.find(
      (l) =>
        l.kind === "int" || (l.kind === "multipleOf" && Be.isInteger(l.value))
    );
  }
  get isFinite() {
    let l = null,
      i = null;
    for (const u of this._def.checks) {
      if (u.kind === "finite" || u.kind === "int" || u.kind === "multipleOf")
        return !0;
      u.kind === "min"
        ? (i === null || u.value > i) && (i = u.value)
        : u.kind === "max" && (l === null || u.value < l) && (l = u.value);
    }
    return Number.isFinite(i) && Number.isFinite(l);
  }
}
Ha.create = (n) =>
  new Ha({
    checks: [],
    typeName: Te.ZodNumber,
    coerce: (n == null ? void 0 : n.coerce) || !1,
    ...Ce(n),
  });
class Za extends De {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(l) {
    if (this._def.coerce)
      try {
        l.data = BigInt(l.data);
      } catch {
        return this._getInvalidInput(l);
      }
    if (this._getType(l) !== ve.bigint) return this._getInvalidInput(l);
    let u;
    const c = new Mt();
    for (const o of this._def.checks)
      o.kind === "min"
        ? (o.inclusive ? l.data < o.value : l.data <= o.value) &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.too_small,
            type: "bigint",
            minimum: o.value,
            inclusive: o.inclusive,
            message: o.message,
          }),
          c.dirty())
        : o.kind === "max"
        ? (o.inclusive ? l.data > o.value : l.data >= o.value) &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.too_big,
            type: "bigint",
            maximum: o.value,
            inclusive: o.inclusive,
            message: o.message,
          }),
          c.dirty())
        : o.kind === "multipleOf"
        ? l.data % o.value !== BigInt(0) &&
          ((u = this._getOrReturnCtx(l, u)),
          me(u, {
            code: ce.not_multiple_of,
            multipleOf: o.value,
            message: o.message,
          }),
          c.dirty())
        : Be.assertNever(o);
    return { status: c.value, value: l.data };
  }
  _getInvalidInput(l) {
    const i = this._getOrReturnCtx(l);
    return (
      me(i, {
        code: ce.invalid_type,
        expected: ve.bigint,
        received: i.parsedType,
      }),
      Re
    );
  }
  gte(l, i) {
    return this.setLimit("min", l, !0, Se.toString(i));
  }
  gt(l, i) {
    return this.setLimit("min", l, !1, Se.toString(i));
  }
  lte(l, i) {
    return this.setLimit("max", l, !0, Se.toString(i));
  }
  lt(l, i) {
    return this.setLimit("max", l, !1, Se.toString(i));
  }
  setLimit(l, i, u, c) {
    return new Za({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: l, value: i, inclusive: u, message: Se.toString(c) },
      ],
    });
  }
  _addCheck(l) {
    return new Za({ ...this._def, checks: [...this._def.checks, l] });
  }
  positive(l) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Se.toString(l),
    });
  }
  negative(l) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Se.toString(l),
    });
  }
  nonpositive(l) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Se.toString(l),
    });
  }
  nonnegative(l) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Se.toString(l),
    });
  }
  multipleOf(l, i) {
    return this._addCheck({
      kind: "multipleOf",
      value: l,
      message: Se.toString(i),
    });
  }
  get minValue() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "min" && (l === null || i.value > l) && (l = i.value);
    return l;
  }
  get maxValue() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "max" && (l === null || i.value < l) && (l = i.value);
    return l;
  }
}
Za.create = (n) => {
  var l;
  return new Za({
    checks: [],
    typeName: Te.ZodBigInt,
    coerce:
      (l = n == null ? void 0 : n.coerce) !== null && l !== void 0 ? l : !1,
    ...Ce(n),
  });
};
class Vi extends De {
  _parse(l) {
    if (
      (this._def.coerce && (l.data = !!l.data), this._getType(l) !== ve.boolean)
    ) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.boolean,
          received: u.parsedType,
        }),
        Re
      );
    }
    return zt(l.data);
  }
}
Vi.create = (n) =>
  new Vi({
    typeName: Te.ZodBoolean,
    coerce: (n == null ? void 0 : n.coerce) || !1,
    ...Ce(n),
  });
class bl extends De {
  _parse(l) {
    if (
      (this._def.coerce && (l.data = new Date(l.data)),
      this._getType(l) !== ve.date)
    ) {
      const o = this._getOrReturnCtx(l);
      return (
        me(o, {
          code: ce.invalid_type,
          expected: ve.date,
          received: o.parsedType,
        }),
        Re
      );
    }
    if (isNaN(l.data.getTime())) {
      const o = this._getOrReturnCtx(l);
      return me(o, { code: ce.invalid_date }), Re;
    }
    const u = new Mt();
    let c;
    for (const o of this._def.checks)
      o.kind === "min"
        ? l.data.getTime() < o.value &&
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            code: ce.too_small,
            message: o.message,
            inclusive: !0,
            exact: !1,
            minimum: o.value,
            type: "date",
          }),
          u.dirty())
        : o.kind === "max"
        ? l.data.getTime() > o.value &&
          ((c = this._getOrReturnCtx(l, c)),
          me(c, {
            code: ce.too_big,
            message: o.message,
            inclusive: !0,
            exact: !1,
            maximum: o.value,
            type: "date",
          }),
          u.dirty())
        : Be.assertNever(o);
    return { status: u.value, value: new Date(l.data.getTime()) };
  }
  _addCheck(l) {
    return new bl({ ...this._def, checks: [...this._def.checks, l] });
  }
  min(l, i) {
    return this._addCheck({
      kind: "min",
      value: l.getTime(),
      message: Se.toString(i),
    });
  }
  max(l, i) {
    return this._addCheck({
      kind: "max",
      value: l.getTime(),
      message: Se.toString(i),
    });
  }
  get minDate() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "min" && (l === null || i.value > l) && (l = i.value);
    return l != null ? new Date(l) : null;
  }
  get maxDate() {
    let l = null;
    for (const i of this._def.checks)
      i.kind === "max" && (l === null || i.value < l) && (l = i.value);
    return l != null ? new Date(l) : null;
  }
}
bl.create = (n) =>
  new bl({
    checks: [],
    coerce: (n == null ? void 0 : n.coerce) || !1,
    typeName: Te.ZodDate,
    ...Ce(n),
  });
class Qs extends De {
  _parse(l) {
    if (this._getType(l) !== ve.symbol) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.symbol,
          received: u.parsedType,
        }),
        Re
      );
    }
    return zt(l.data);
  }
}
Qs.create = (n) => new Qs({ typeName: Te.ZodSymbol, ...Ce(n) });
class Hi extends De {
  _parse(l) {
    if (this._getType(l) !== ve.undefined) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.undefined,
          received: u.parsedType,
        }),
        Re
      );
    }
    return zt(l.data);
  }
}
Hi.create = (n) => new Hi({ typeName: Te.ZodUndefined, ...Ce(n) });
class Zi extends De {
  _parse(l) {
    if (this._getType(l) !== ve.null) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.null,
          received: u.parsedType,
        }),
        Re
      );
    }
    return zt(l.data);
  }
}
Zi.create = (n) => new Zi({ typeName: Te.ZodNull, ...Ce(n) });
class vr extends De {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(l) {
    return zt(l.data);
  }
}
vr.create = (n) => new vr({ typeName: Te.ZodAny, ...Ce(n) });
class ml extends De {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(l) {
    return zt(l.data);
  }
}
ml.create = (n) => new ml({ typeName: Te.ZodUnknown, ...Ce(n) });
class ca extends De {
  _parse(l) {
    const i = this._getOrReturnCtx(l);
    return (
      me(i, {
        code: ce.invalid_type,
        expected: ve.never,
        received: i.parsedType,
      }),
      Re
    );
  }
}
ca.create = (n) => new ca({ typeName: Te.ZodNever, ...Ce(n) });
class Ys extends De {
  _parse(l) {
    if (this._getType(l) !== ve.undefined) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.void,
          received: u.parsedType,
        }),
        Re
      );
    }
    return zt(l.data);
  }
}
Ys.create = (n) => new Ys({ typeName: Te.ZodVoid, ...Ce(n) });
class gn extends De {
  _parse(l) {
    const { ctx: i, status: u } = this._processInputParams(l),
      c = this._def;
    if (i.parsedType !== ve.array)
      return (
        me(i, {
          code: ce.invalid_type,
          expected: ve.array,
          received: i.parsedType,
        }),
        Re
      );
    if (c.exactLength !== null) {
      const d = i.data.length > c.exactLength.value,
        h = i.data.length < c.exactLength.value;
      (d || h) &&
        (me(i, {
          code: d ? ce.too_big : ce.too_small,
          minimum: h ? c.exactLength.value : void 0,
          maximum: d ? c.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: c.exactLength.message,
        }),
        u.dirty());
    }
    if (
      (c.minLength !== null &&
        i.data.length < c.minLength.value &&
        (me(i, {
          code: ce.too_small,
          minimum: c.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: c.minLength.message,
        }),
        u.dirty()),
      c.maxLength !== null &&
        i.data.length > c.maxLength.value &&
        (me(i, {
          code: ce.too_big,
          maximum: c.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: c.maxLength.message,
        }),
        u.dirty()),
      i.common.async)
    )
      return Promise.all(
        [...i.data].map((d, h) => c.type._parseAsync(new zn(i, d, i.path, h)))
      ).then((d) => Mt.mergeArray(u, d));
    const o = [...i.data].map((d, h) =>
      c.type._parseSync(new zn(i, d, i.path, h))
    );
    return Mt.mergeArray(u, o);
  }
  get element() {
    return this._def.type;
  }
  min(l, i) {
    return new gn({
      ...this._def,
      minLength: { value: l, message: Se.toString(i) },
    });
  }
  max(l, i) {
    return new gn({
      ...this._def,
      maxLength: { value: l, message: Se.toString(i) },
    });
  }
  length(l, i) {
    return new gn({
      ...this._def,
      exactLength: { value: l, message: Se.toString(i) },
    });
  }
  nonempty(l) {
    return this.min(1, l);
  }
}
gn.create = (n, l) =>
  new gn({
    type: n,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: Te.ZodArray,
    ...Ce(l),
  });
function or(n) {
  if (n instanceof Ie) {
    const l = {};
    for (const i in n.shape) {
      const u = n.shape[i];
      l[i] = Dn.create(or(u));
    }
    return new Ie({ ...n._def, shape: () => l });
  } else
    return n instanceof gn
      ? new gn({ ...n._def, type: or(n.element) })
      : n instanceof Dn
      ? Dn.create(or(n.unwrap()))
      : n instanceof Ya
      ? Ya.create(or(n.unwrap()))
      : n instanceof Un
      ? Un.create(n.items.map((l) => or(l)))
      : n;
}
class Ie extends De {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const l = this._def.shape(),
      i = Be.objectKeys(l);
    return (this._cached = { shape: l, keys: i });
  }
  _parse(l) {
    if (this._getType(l) !== ve.object) {
      const m = this._getOrReturnCtx(l);
      return (
        me(m, {
          code: ce.invalid_type,
          expected: ve.object,
          received: m.parsedType,
        }),
        Re
      );
    }
    const { status: u, ctx: c } = this._processInputParams(l),
      { shape: o, keys: d } = this._getCached(),
      h = [];
    if (
      !(this._def.catchall instanceof ca && this._def.unknownKeys === "strip")
    )
      for (const m in c.data) d.includes(m) || h.push(m);
    const y = [];
    for (const m of d) {
      const v = o[m],
        x = c.data[m];
      y.push({
        key: { status: "valid", value: m },
        value: v._parse(new zn(c, x, c.path, m)),
        alwaysSet: m in c.data,
      });
    }
    if (this._def.catchall instanceof ca) {
      const m = this._def.unknownKeys;
      if (m === "passthrough")
        for (const v of h)
          y.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: c.data[v] },
          });
      else if (m === "strict")
        h.length > 0 &&
          (me(c, { code: ce.unrecognized_keys, keys: h }), u.dirty());
      else if (m !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const m = this._def.catchall;
      for (const v of h) {
        const x = c.data[v];
        y.push({
          key: { status: "valid", value: v },
          value: m._parse(new zn(c, x, c.path, v)),
          alwaysSet: v in c.data,
        });
      }
    }
    return c.common.async
      ? Promise.resolve()
          .then(async () => {
            const m = [];
            for (const v of y) {
              const x = await v.key,
                b = await v.value;
              m.push({ key: x, value: b, alwaysSet: v.alwaysSet });
            }
            return m;
          })
          .then((m) => Mt.mergeObjectSync(u, m))
      : Mt.mergeObjectSync(u, y);
  }
  get shape() {
    return this._def.shape();
  }
  strict(l) {
    return (
      Se.errToObj,
      new Ie({
        ...this._def,
        unknownKeys: "strict",
        ...(l !== void 0
          ? {
              errorMap: (i, u) => {
                var c, o, d, h;
                const y =
                  (d =
                    (o = (c = this._def).errorMap) === null || o === void 0
                      ? void 0
                      : o.call(c, i, u).message) !== null && d !== void 0
                    ? d
                    : u.defaultError;
                return i.code === "unrecognized_keys"
                  ? {
                      message:
                        (h = Se.errToObj(l).message) !== null && h !== void 0
                          ? h
                          : y,
                    }
                  : { message: y };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new Ie({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new Ie({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(l) {
    return new Ie({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...l }),
    });
  }
  merge(l) {
    return new Ie({
      unknownKeys: l._def.unknownKeys,
      catchall: l._def.catchall,
      shape: () => ({ ...this._def.shape(), ...l._def.shape() }),
      typeName: Te.ZodObject,
    });
  }
  setKey(l, i) {
    return this.augment({ [l]: i });
  }
  catchall(l) {
    return new Ie({ ...this._def, catchall: l });
  }
  pick(l) {
    const i = {};
    return (
      Be.objectKeys(l).forEach((u) => {
        l[u] && this.shape[u] && (i[u] = this.shape[u]);
      }),
      new Ie({ ...this._def, shape: () => i })
    );
  }
  omit(l) {
    const i = {};
    return (
      Be.objectKeys(this.shape).forEach((u) => {
        l[u] || (i[u] = this.shape[u]);
      }),
      new Ie({ ...this._def, shape: () => i })
    );
  }
  deepPartial() {
    return or(this);
  }
  partial(l) {
    const i = {};
    return (
      Be.objectKeys(this.shape).forEach((u) => {
        const c = this.shape[u];
        l && !l[u] ? (i[u] = c) : (i[u] = c.optional());
      }),
      new Ie({ ...this._def, shape: () => i })
    );
  }
  required(l) {
    const i = {};
    return (
      Be.objectKeys(this.shape).forEach((u) => {
        if (l && !l[u]) i[u] = this.shape[u];
        else {
          let o = this.shape[u];
          for (; o instanceof Dn; ) o = o._def.innerType;
          i[u] = o;
        }
      }),
      new Ie({ ...this._def, shape: () => i })
    );
  }
  keyof() {
    return Wg(Be.objectKeys(this.shape));
  }
}
Ie.create = (n, l) =>
  new Ie({
    shape: () => n,
    unknownKeys: "strip",
    catchall: ca.create(),
    typeName: Te.ZodObject,
    ...Ce(l),
  });
Ie.strictCreate = (n, l) =>
  new Ie({
    shape: () => n,
    unknownKeys: "strict",
    catchall: ca.create(),
    typeName: Te.ZodObject,
    ...Ce(l),
  });
Ie.lazycreate = (n, l) =>
  new Ie({
    shape: n,
    unknownKeys: "strip",
    catchall: ca.create(),
    typeName: Te.ZodObject,
    ...Ce(l),
  });
class Qi extends De {
  _parse(l) {
    const { ctx: i } = this._processInputParams(l),
      u = this._def.options;
    function c(o) {
      for (const h of o) if (h.result.status === "valid") return h.result;
      for (const h of o)
        if (h.result.status === "dirty")
          return i.common.issues.push(...h.ctx.common.issues), h.result;
      const d = o.map((h) => new Pt(h.ctx.common.issues));
      return me(i, { code: ce.invalid_union, unionErrors: d }), Re;
    }
    if (i.common.async)
      return Promise.all(
        u.map(async (o) => {
          const d = { ...i, common: { ...i.common, issues: [] }, parent: null };
          return {
            result: await o._parseAsync({
              data: i.data,
              path: i.path,
              parent: d,
            }),
            ctx: d,
          };
        })
      ).then(c);
    {
      let o;
      const d = [];
      for (const y of u) {
        const m = { ...i, common: { ...i.common, issues: [] }, parent: null },
          v = y._parseSync({ data: i.data, path: i.path, parent: m });
        if (v.status === "valid") return v;
        v.status === "dirty" && !o && (o = { result: v, ctx: m }),
          m.common.issues.length && d.push(m.common.issues);
      }
      if (o) return i.common.issues.push(...o.ctx.common.issues), o.result;
      const h = d.map((y) => new Pt(y));
      return me(i, { code: ce.invalid_union, unionErrors: h }), Re;
    }
  }
  get options() {
    return this._def.options;
  }
}
Qi.create = (n, l) => new Qi({ options: n, typeName: Te.ZodUnion, ...Ce(l) });
const na = (n) =>
  n instanceof Xi
    ? na(n.schema)
    : n instanceof Sn
    ? na(n.innerType())
    : n instanceof Ki
    ? [n.value]
    : n instanceof Qa
    ? n.options
    : n instanceof $i
    ? Be.objectValues(n.enum)
    : n instanceof Fi
    ? na(n._def.innerType)
    : n instanceof Hi
    ? [void 0]
    : n instanceof Zi
    ? [null]
    : n instanceof Dn
    ? [void 0, ...na(n.unwrap())]
    : n instanceof Ya
    ? [null, ...na(n.unwrap())]
    : n instanceof Rd || n instanceof Pi
    ? na(n.unwrap())
    : n instanceof Ji
    ? na(n._def.innerType)
    : [];
class rc extends De {
  _parse(l) {
    const { ctx: i } = this._processInputParams(l);
    if (i.parsedType !== ve.object)
      return (
        me(i, {
          code: ce.invalid_type,
          expected: ve.object,
          received: i.parsedType,
        }),
        Re
      );
    const u = this.discriminator,
      c = i.data[u],
      o = this.optionsMap.get(c);
    return o
      ? i.common.async
        ? o._parseAsync({ data: i.data, path: i.path, parent: i })
        : o._parseSync({ data: i.data, path: i.path, parent: i })
      : (me(i, {
          code: ce.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [u],
        }),
        Re);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(l, i, u) {
    const c = new Map();
    for (const o of i) {
      const d = na(o.shape[l]);
      if (!d.length)
        throw new Error(
          `A discriminator value for key \`${l}\` could not be extracted from all schema options`
        );
      for (const h of d) {
        if (c.has(h))
          throw new Error(
            `Discriminator property ${String(l)} has duplicate value ${String(
              h
            )}`
          );
        c.set(h, o);
      }
    }
    return new rc({
      typeName: Te.ZodDiscriminatedUnion,
      discriminator: l,
      options: i,
      optionsMap: c,
      ...Ce(u),
    });
  }
}
function ud(n, l) {
  const i = la(n),
    u = la(l);
  if (n === l) return { valid: !0, data: n };
  if (i === ve.object && u === ve.object) {
    const c = Be.objectKeys(l),
      o = Be.objectKeys(n).filter((h) => c.indexOf(h) !== -1),
      d = { ...n, ...l };
    for (const h of o) {
      const y = ud(n[h], l[h]);
      if (!y.valid) return { valid: !1 };
      d[h] = y.data;
    }
    return { valid: !0, data: d };
  } else if (i === ve.array && u === ve.array) {
    if (n.length !== l.length) return { valid: !1 };
    const c = [];
    for (let o = 0; o < n.length; o++) {
      const d = n[o],
        h = l[o],
        y = ud(d, h);
      if (!y.valid) return { valid: !1 };
      c.push(y.data);
    }
    return { valid: !0, data: c };
  } else
    return i === ve.date && u === ve.date && +n == +l
      ? { valid: !0, data: n }
      : { valid: !1 };
}
class Yi extends De {
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l),
      c = (o, d) => {
        if (rd(o) || rd(d)) return Re;
        const h = ud(o.value, d.value);
        return h.valid
          ? ((id(o) || id(d)) && i.dirty(), { status: i.value, value: h.data })
          : (me(u, { code: ce.invalid_intersection_types }), Re);
      };
    return u.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: u.data, path: u.path, parent: u }),
          this._def.right._parseAsync({
            data: u.data,
            path: u.path,
            parent: u,
          }),
        ]).then(([o, d]) => c(o, d))
      : c(
          this._def.left._parseSync({ data: u.data, path: u.path, parent: u }),
          this._def.right._parseSync({ data: u.data, path: u.path, parent: u })
        );
  }
}
Yi.create = (n, l, i) =>
  new Yi({ left: n, right: l, typeName: Te.ZodIntersection, ...Ce(i) });
class Un extends De {
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l);
    if (u.parsedType !== ve.array)
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.array,
          received: u.parsedType,
        }),
        Re
      );
    if (u.data.length < this._def.items.length)
      return (
        me(u, {
          code: ce.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        Re
      );
    !this._def.rest &&
      u.data.length > this._def.items.length &&
      (me(u, {
        code: ce.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      i.dirty());
    const o = [...u.data]
      .map((d, h) => {
        const y = this._def.items[h] || this._def.rest;
        return y ? y._parse(new zn(u, d, u.path, h)) : null;
      })
      .filter((d) => !!d);
    return u.common.async
      ? Promise.all(o).then((d) => Mt.mergeArray(i, d))
      : Mt.mergeArray(i, o);
  }
  get items() {
    return this._def.items;
  }
  rest(l) {
    return new Un({ ...this._def, rest: l });
  }
}
Un.create = (n, l) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Un({ items: n, typeName: Te.ZodTuple, rest: null, ...Ce(l) });
};
class Gi extends De {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l);
    if (u.parsedType !== ve.object)
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.object,
          received: u.parsedType,
        }),
        Re
      );
    const c = [],
      o = this._def.keyType,
      d = this._def.valueType;
    for (const h in u.data)
      c.push({
        key: o._parse(new zn(u, h, u.path, h)),
        value: d._parse(new zn(u, u.data[h], u.path, h)),
        alwaysSet: h in u.data,
      });
    return u.common.async
      ? Mt.mergeObjectAsync(i, c)
      : Mt.mergeObjectSync(i, c);
  }
  get element() {
    return this._def.valueType;
  }
  static create(l, i, u) {
    return i instanceof De
      ? new Gi({ keyType: l, valueType: i, typeName: Te.ZodRecord, ...Ce(u) })
      : new Gi({
          keyType: yn.create(),
          valueType: l,
          typeName: Te.ZodRecord,
          ...Ce(i),
        });
  }
}
class Gs extends De {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l);
    if (u.parsedType !== ve.map)
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.map,
          received: u.parsedType,
        }),
        Re
      );
    const c = this._def.keyType,
      o = this._def.valueType,
      d = [...u.data.entries()].map(([h, y], m) => ({
        key: c._parse(new zn(u, h, u.path, [m, "key"])),
        value: o._parse(new zn(u, y, u.path, [m, "value"])),
      }));
    if (u.common.async) {
      const h = new Map();
      return Promise.resolve().then(async () => {
        for (const y of d) {
          const m = await y.key,
            v = await y.value;
          if (m.status === "aborted" || v.status === "aborted") return Re;
          (m.status === "dirty" || v.status === "dirty") && i.dirty(),
            h.set(m.value, v.value);
        }
        return { status: i.value, value: h };
      });
    } else {
      const h = new Map();
      for (const y of d) {
        const m = y.key,
          v = y.value;
        if (m.status === "aborted" || v.status === "aborted") return Re;
        (m.status === "dirty" || v.status === "dirty") && i.dirty(),
          h.set(m.value, v.value);
      }
      return { status: i.value, value: h };
    }
  }
}
Gs.create = (n, l, i) =>
  new Gs({ valueType: l, keyType: n, typeName: Te.ZodMap, ...Ce(i) });
class _l extends De {
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l);
    if (u.parsedType !== ve.set)
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.set,
          received: u.parsedType,
        }),
        Re
      );
    const c = this._def;
    c.minSize !== null &&
      u.data.size < c.minSize.value &&
      (me(u, {
        code: ce.too_small,
        minimum: c.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: c.minSize.message,
      }),
      i.dirty()),
      c.maxSize !== null &&
        u.data.size > c.maxSize.value &&
        (me(u, {
          code: ce.too_big,
          maximum: c.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: c.maxSize.message,
        }),
        i.dirty());
    const o = this._def.valueType;
    function d(y) {
      const m = new Set();
      for (const v of y) {
        if (v.status === "aborted") return Re;
        v.status === "dirty" && i.dirty(), m.add(v.value);
      }
      return { status: i.value, value: m };
    }
    const h = [...u.data.values()].map((y, m) =>
      o._parse(new zn(u, y, u.path, m))
    );
    return u.common.async ? Promise.all(h).then((y) => d(y)) : d(h);
  }
  min(l, i) {
    return new _l({
      ...this._def,
      minSize: { value: l, message: Se.toString(i) },
    });
  }
  max(l, i) {
    return new _l({
      ...this._def,
      maxSize: { value: l, message: Se.toString(i) },
    });
  }
  size(l, i) {
    return this.min(l, i).max(l, i);
  }
  nonempty(l) {
    return this.min(1, l);
  }
}
_l.create = (n, l) =>
  new _l({
    valueType: n,
    minSize: null,
    maxSize: null,
    typeName: Te.ZodSet,
    ...Ce(l),
  });
class hr extends De {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(l) {
    const { ctx: i } = this._processInputParams(l);
    if (i.parsedType !== ve.function)
      return (
        me(i, {
          code: ce.invalid_type,
          expected: ve.function,
          received: i.parsedType,
        }),
        Re
      );
    function u(h, y) {
      return Hs({
        data: h,
        path: i.path,
        errorMaps: [
          i.common.contextualErrorMap,
          i.schemaErrorMap,
          Vs(),
          pr,
        ].filter((m) => !!m),
        issueData: { code: ce.invalid_arguments, argumentsError: y },
      });
    }
    function c(h, y) {
      return Hs({
        data: h,
        path: i.path,
        errorMaps: [
          i.common.contextualErrorMap,
          i.schemaErrorMap,
          Vs(),
          pr,
        ].filter((m) => !!m),
        issueData: { code: ce.invalid_return_type, returnTypeError: y },
      });
    }
    const o = { errorMap: i.common.contextualErrorMap },
      d = i.data;
    if (this._def.returns instanceof gr) {
      const h = this;
      return zt(async function (...y) {
        const m = new Pt([]),
          v = await h._def.args.parseAsync(y, o).catch((E) => {
            throw (m.addIssue(u(y, E)), m);
          }),
          x = await Reflect.apply(d, this, v);
        return await h._def.returns._def.type.parseAsync(x, o).catch((E) => {
          throw (m.addIssue(c(x, E)), m);
        });
      });
    } else {
      const h = this;
      return zt(function (...y) {
        const m = h._def.args.safeParse(y, o);
        if (!m.success) throw new Pt([u(y, m.error)]);
        const v = Reflect.apply(d, this, m.data),
          x = h._def.returns.safeParse(v, o);
        if (!x.success) throw new Pt([c(v, x.error)]);
        return x.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...l) {
    return new hr({ ...this._def, args: Un.create(l).rest(ml.create()) });
  }
  returns(l) {
    return new hr({ ...this._def, returns: l });
  }
  implement(l) {
    return this.parse(l);
  }
  strictImplement(l) {
    return this.parse(l);
  }
  static create(l, i, u) {
    return new hr({
      args: l || Un.create([]).rest(ml.create()),
      returns: i || ml.create(),
      typeName: Te.ZodFunction,
      ...Ce(u),
    });
  }
}
class Xi extends De {
  get schema() {
    return this._def.getter();
  }
  _parse(l) {
    const { ctx: i } = this._processInputParams(l);
    return this._def.getter()._parse({ data: i.data, path: i.path, parent: i });
  }
}
Xi.create = (n, l) => new Xi({ getter: n, typeName: Te.ZodLazy, ...Ce(l) });
class Ki extends De {
  _parse(l) {
    if (l.data !== this._def.value) {
      const i = this._getOrReturnCtx(l);
      return (
        me(i, {
          received: i.data,
          code: ce.invalid_literal,
          expected: this._def.value,
        }),
        Re
      );
    }
    return { status: "valid", value: l.data };
  }
  get value() {
    return this._def.value;
  }
}
Ki.create = (n, l) => new Ki({ value: n, typeName: Te.ZodLiteral, ...Ce(l) });
function Wg(n, l) {
  return new Qa({ values: n, typeName: Te.ZodEnum, ...Ce(l) });
}
class Qa extends De {
  constructor() {
    super(...arguments), Ri.set(this, void 0);
  }
  _parse(l) {
    if (typeof l.data != "string") {
      const i = this._getOrReturnCtx(l),
        u = this._def.values;
      return (
        me(i, {
          expected: Be.joinValues(u),
          received: i.parsedType,
          code: ce.invalid_type,
        }),
        Re
      );
    }
    if (
      (Zs(this, Ri) || $g(this, Ri, new Set(this._def.values)),
      !Zs(this, Ri).has(l.data))
    ) {
      const i = this._getOrReturnCtx(l),
        u = this._def.values;
      return (
        me(i, { received: i.data, code: ce.invalid_enum_value, options: u }), Re
      );
    }
    return zt(l.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const l = {};
    for (const i of this._def.values) l[i] = i;
    return l;
  }
  get Values() {
    const l = {};
    for (const i of this._def.values) l[i] = i;
    return l;
  }
  get Enum() {
    const l = {};
    for (const i of this._def.values) l[i] = i;
    return l;
  }
  extract(l, i = this._def) {
    return Qa.create(l, { ...this._def, ...i });
  }
  exclude(l, i = this._def) {
    return Qa.create(
      this.options.filter((u) => !l.includes(u)),
      { ...this._def, ...i }
    );
  }
}
Ri = new WeakMap();
Qa.create = Wg;
class $i extends De {
  constructor() {
    super(...arguments), Oi.set(this, void 0);
  }
  _parse(l) {
    const i = Be.getValidEnumValues(this._def.values),
      u = this._getOrReturnCtx(l);
    if (u.parsedType !== ve.string && u.parsedType !== ve.number) {
      const c = Be.objectValues(i);
      return (
        me(u, {
          expected: Be.joinValues(c),
          received: u.parsedType,
          code: ce.invalid_type,
        }),
        Re
      );
    }
    if (
      (Zs(this, Oi) ||
        $g(this, Oi, new Set(Be.getValidEnumValues(this._def.values))),
      !Zs(this, Oi).has(l.data))
    ) {
      const c = Be.objectValues(i);
      return (
        me(u, { received: u.data, code: ce.invalid_enum_value, options: c }), Re
      );
    }
    return zt(l.data);
  }
  get enum() {
    return this._def.values;
  }
}
Oi = new WeakMap();
$i.create = (n, l) =>
  new $i({ values: n, typeName: Te.ZodNativeEnum, ...Ce(l) });
class gr extends De {
  unwrap() {
    return this._def.type;
  }
  _parse(l) {
    const { ctx: i } = this._processInputParams(l);
    if (i.parsedType !== ve.promise && i.common.async === !1)
      return (
        me(i, {
          code: ce.invalid_type,
          expected: ve.promise,
          received: i.parsedType,
        }),
        Re
      );
    const u = i.parsedType === ve.promise ? i.data : Promise.resolve(i.data);
    return zt(
      u.then((c) =>
        this._def.type.parseAsync(c, {
          path: i.path,
          errorMap: i.common.contextualErrorMap,
        })
      )
    );
  }
}
gr.create = (n, l) => new gr({ type: n, typeName: Te.ZodPromise, ...Ce(l) });
class Sn extends De {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === Te.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l),
      c = this._def.effect || null,
      o = {
        addIssue: (d) => {
          me(u, d), d.fatal ? i.abort() : i.dirty();
        },
        get path() {
          return u.path;
        },
      };
    if (((o.addIssue = o.addIssue.bind(o)), c.type === "preprocess")) {
      const d = c.transform(u.data, o);
      if (u.common.async)
        return Promise.resolve(d).then(async (h) => {
          if (i.value === "aborted") return Re;
          const y = await this._def.schema._parseAsync({
            data: h,
            path: u.path,
            parent: u,
          });
          return y.status === "aborted"
            ? Re
            : y.status === "dirty" || i.value === "dirty"
            ? dr(y.value)
            : y;
        });
      {
        if (i.value === "aborted") return Re;
        const h = this._def.schema._parseSync({
          data: d,
          path: u.path,
          parent: u,
        });
        return h.status === "aborted"
          ? Re
          : h.status === "dirty" || i.value === "dirty"
          ? dr(h.value)
          : h;
      }
    }
    if (c.type === "refinement") {
      const d = (h) => {
        const y = c.refinement(h, o);
        if (u.common.async) return Promise.resolve(y);
        if (y instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return h;
      };
      if (u.common.async === !1) {
        const h = this._def.schema._parseSync({
          data: u.data,
          path: u.path,
          parent: u,
        });
        return h.status === "aborted"
          ? Re
          : (h.status === "dirty" && i.dirty(),
            d(h.value),
            { status: i.value, value: h.value });
      } else
        return this._def.schema
          ._parseAsync({ data: u.data, path: u.path, parent: u })
          .then((h) =>
            h.status === "aborted"
              ? Re
              : (h.status === "dirty" && i.dirty(),
                d(h.value).then(() => ({ status: i.value, value: h.value })))
          );
    }
    if (c.type === "transform")
      if (u.common.async === !1) {
        const d = this._def.schema._parseSync({
          data: u.data,
          path: u.path,
          parent: u,
        });
        if (!gl(d)) return d;
        const h = c.transform(d.value, o);
        if (h instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return { status: i.value, value: h };
      } else
        return this._def.schema
          ._parseAsync({ data: u.data, path: u.path, parent: u })
          .then((d) =>
            gl(d)
              ? Promise.resolve(c.transform(d.value, o)).then((h) => ({
                  status: i.value,
                  value: h,
                }))
              : d
          );
    Be.assertNever(c);
  }
}
Sn.create = (n, l, i) =>
  new Sn({ schema: n, typeName: Te.ZodEffects, effect: l, ...Ce(i) });
Sn.createWithPreprocess = (n, l, i) =>
  new Sn({
    schema: l,
    effect: { type: "preprocess", transform: n },
    typeName: Te.ZodEffects,
    ...Ce(i),
  });
class Dn extends De {
  _parse(l) {
    return this._getType(l) === ve.undefined
      ? zt(void 0)
      : this._def.innerType._parse(l);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Dn.create = (n, l) =>
  new Dn({ innerType: n, typeName: Te.ZodOptional, ...Ce(l) });
class Ya extends De {
  _parse(l) {
    return this._getType(l) === ve.null
      ? zt(null)
      : this._def.innerType._parse(l);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ya.create = (n, l) =>
  new Ya({ innerType: n, typeName: Te.ZodNullable, ...Ce(l) });
class Fi extends De {
  _parse(l) {
    const { ctx: i } = this._processInputParams(l);
    let u = i.data;
    return (
      i.parsedType === ve.undefined && (u = this._def.defaultValue()),
      this._def.innerType._parse({ data: u, path: i.path, parent: i })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Fi.create = (n, l) =>
  new Fi({
    innerType: n,
    typeName: Te.ZodDefault,
    defaultValue: typeof l.default == "function" ? l.default : () => l.default,
    ...Ce(l),
  });
class Ji extends De {
  _parse(l) {
    const { ctx: i } = this._processInputParams(l),
      u = { ...i, common: { ...i.common, issues: [] } },
      c = this._def.innerType._parse({
        data: u.data,
        path: u.path,
        parent: { ...u },
      });
    return Bi(c)
      ? c.then((o) => ({
          status: "valid",
          value:
            o.status === "valid"
              ? o.value
              : this._def.catchValue({
                  get error() {
                    return new Pt(u.common.issues);
                  },
                  input: u.data,
                }),
        }))
      : {
          status: "valid",
          value:
            c.status === "valid"
              ? c.value
              : this._def.catchValue({
                  get error() {
                    return new Pt(u.common.issues);
                  },
                  input: u.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ji.create = (n, l) =>
  new Ji({
    innerType: n,
    typeName: Te.ZodCatch,
    catchValue: typeof l.catch == "function" ? l.catch : () => l.catch,
    ...Ce(l),
  });
class Xs extends De {
  _parse(l) {
    if (this._getType(l) !== ve.nan) {
      const u = this._getOrReturnCtx(l);
      return (
        me(u, {
          code: ce.invalid_type,
          expected: ve.nan,
          received: u.parsedType,
        }),
        Re
      );
    }
    return { status: "valid", value: l.data };
  }
}
Xs.create = (n) => new Xs({ typeName: Te.ZodNaN, ...Ce(n) });
const N3 = Symbol("zod_brand");
class Rd extends De {
  _parse(l) {
    const { ctx: i } = this._processInputParams(l),
      u = i.data;
    return this._def.type._parse({ data: u, path: i.path, parent: i });
  }
  unwrap() {
    return this._def.type;
  }
}
class su extends De {
  _parse(l) {
    const { status: i, ctx: u } = this._processInputParams(l);
    if (u.common.async)
      return (async () => {
        const o = await this._def.in._parseAsync({
          data: u.data,
          path: u.path,
          parent: u,
        });
        return o.status === "aborted"
          ? Re
          : o.status === "dirty"
          ? (i.dirty(), dr(o.value))
          : this._def.out._parseAsync({
              data: o.value,
              path: u.path,
              parent: u,
            });
      })();
    {
      const c = this._def.in._parseSync({
        data: u.data,
        path: u.path,
        parent: u,
      });
      return c.status === "aborted"
        ? Re
        : c.status === "dirty"
        ? (i.dirty(), { status: "dirty", value: c.value })
        : this._def.out._parseSync({ data: c.value, path: u.path, parent: u });
    }
  }
  static create(l, i) {
    return new su({ in: l, out: i, typeName: Te.ZodPipeline });
  }
}
class Pi extends De {
  _parse(l) {
    const i = this._def.innerType._parse(l),
      u = (c) => (gl(c) && (c.value = Object.freeze(c.value)), c);
    return Bi(i) ? i.then((c) => u(c)) : u(i);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Pi.create = (n, l) =>
  new Pi({ innerType: n, typeName: Te.ZodReadonly, ...Ce(l) });
function bv(n, l) {
  const i =
    typeof n == "function" ? n(l) : typeof n == "string" ? { message: n } : n;
  return typeof i == "string" ? { message: i } : i;
}
function Ig(n, l = {}, i) {
  return n
    ? vr.create().superRefine((u, c) => {
        var o, d;
        const h = n(u);
        if (h instanceof Promise)
          return h.then((y) => {
            var m, v;
            if (!y) {
              const x = bv(l, u),
                b =
                  (v = (m = x.fatal) !== null && m !== void 0 ? m : i) !==
                    null && v !== void 0
                    ? v
                    : !0;
              c.addIssue({ code: "custom", ...x, fatal: b });
            }
          });
        if (!h) {
          const y = bv(l, u),
            m =
              (d = (o = y.fatal) !== null && o !== void 0 ? o : i) !== null &&
              d !== void 0
                ? d
                : !0;
          c.addIssue({ code: "custom", ...y, fatal: m });
        }
      })
    : vr.create();
}
const D3 = { object: Ie.lazycreate };
var Te;
(function (n) {
  (n.ZodString = "ZodString"),
    (n.ZodNumber = "ZodNumber"),
    (n.ZodNaN = "ZodNaN"),
    (n.ZodBigInt = "ZodBigInt"),
    (n.ZodBoolean = "ZodBoolean"),
    (n.ZodDate = "ZodDate"),
    (n.ZodSymbol = "ZodSymbol"),
    (n.ZodUndefined = "ZodUndefined"),
    (n.ZodNull = "ZodNull"),
    (n.ZodAny = "ZodAny"),
    (n.ZodUnknown = "ZodUnknown"),
    (n.ZodNever = "ZodNever"),
    (n.ZodVoid = "ZodVoid"),
    (n.ZodArray = "ZodArray"),
    (n.ZodObject = "ZodObject"),
    (n.ZodUnion = "ZodUnion"),
    (n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (n.ZodIntersection = "ZodIntersection"),
    (n.ZodTuple = "ZodTuple"),
    (n.ZodRecord = "ZodRecord"),
    (n.ZodMap = "ZodMap"),
    (n.ZodSet = "ZodSet"),
    (n.ZodFunction = "ZodFunction"),
    (n.ZodLazy = "ZodLazy"),
    (n.ZodLiteral = "ZodLiteral"),
    (n.ZodEnum = "ZodEnum"),
    (n.ZodEffects = "ZodEffects"),
    (n.ZodNativeEnum = "ZodNativeEnum"),
    (n.ZodOptional = "ZodOptional"),
    (n.ZodNullable = "ZodNullable"),
    (n.ZodDefault = "ZodDefault"),
    (n.ZodCatch = "ZodCatch"),
    (n.ZodPromise = "ZodPromise"),
    (n.ZodBranded = "ZodBranded"),
    (n.ZodPipeline = "ZodPipeline"),
    (n.ZodReadonly = "ZodReadonly");
})(Te || (Te = {}));
const j3 = (n, l = { message: `Input not instance of ${n.name}` }) =>
    Ig((i) => i instanceof n, l),
  e0 = yn.create,
  t0 = Ha.create,
  z3 = Xs.create,
  U3 = Za.create,
  n0 = Vi.create,
  k3 = bl.create,
  L3 = Qs.create,
  q3 = Hi.create,
  B3 = Zi.create,
  V3 = vr.create,
  H3 = ml.create,
  Z3 = ca.create,
  Q3 = Ys.create,
  Y3 = gn.create,
  G3 = Ie.create,
  X3 = Ie.strictCreate,
  K3 = Qi.create,
  $3 = rc.create,
  F3 = Yi.create,
  J3 = Un.create,
  P3 = Gi.create,
  W3 = Gs.create,
  I3 = _l.create,
  eE = hr.create,
  tE = Xi.create,
  nE = Ki.create,
  aE = Qa.create,
  lE = $i.create,
  rE = gr.create,
  _v = Sn.create,
  iE = Dn.create,
  uE = Ya.create,
  sE = Sn.createWithPreprocess,
  cE = su.create,
  oE = () => e0().optional(),
  fE = () => t0().optional(),
  dE = () => n0().optional(),
  hE = {
    string: (n) => yn.create({ ...n, coerce: !0 }),
    number: (n) => Ha.create({ ...n, coerce: !0 }),
    boolean: (n) => Vi.create({ ...n, coerce: !0 }),
    bigint: (n) => Za.create({ ...n, coerce: !0 }),
    date: (n) => bl.create({ ...n, coerce: !0 }),
  },
  mE = Re;
var fl = Object.freeze({
    __proto__: null,
    defaultErrorMap: pr,
    setErrorMap: s3,
    getErrorMap: Vs,
    makeIssue: Hs,
    EMPTY_PATH: c3,
    addIssueToContext: me,
    ParseStatus: Mt,
    INVALID: Re,
    DIRTY: dr,
    OK: zt,
    isAborted: rd,
    isDirty: id,
    isValid: gl,
    isAsync: Bi,
    get util() {
      return Be;
    },
    get objectUtil() {
      return ld;
    },
    ZodParsedType: ve,
    getParsedType: la,
    ZodType: De,
    datetimeRegex: Pg,
    ZodString: yn,
    ZodNumber: Ha,
    ZodBigInt: Za,
    ZodBoolean: Vi,
    ZodDate: bl,
    ZodSymbol: Qs,
    ZodUndefined: Hi,
    ZodNull: Zi,
    ZodAny: vr,
    ZodUnknown: ml,
    ZodNever: ca,
    ZodVoid: Ys,
    ZodArray: gn,
    ZodObject: Ie,
    ZodUnion: Qi,
    ZodDiscriminatedUnion: rc,
    ZodIntersection: Yi,
    ZodTuple: Un,
    ZodRecord: Gi,
    ZodMap: Gs,
    ZodSet: _l,
    ZodFunction: hr,
    ZodLazy: Xi,
    ZodLiteral: Ki,
    ZodEnum: Qa,
    ZodNativeEnum: $i,
    ZodPromise: gr,
    ZodEffects: Sn,
    ZodTransformer: Sn,
    ZodOptional: Dn,
    ZodNullable: Ya,
    ZodDefault: Fi,
    ZodCatch: Ji,
    ZodNaN: Xs,
    BRAND: N3,
    ZodBranded: Rd,
    ZodPipeline: su,
    ZodReadonly: Pi,
    custom: Ig,
    Schema: De,
    ZodSchema: De,
    late: D3,
    get ZodFirstPartyTypeKind() {
      return Te;
    },
    coerce: hE,
    any: V3,
    array: Y3,
    bigint: U3,
    boolean: n0,
    date: k3,
    discriminatedUnion: $3,
    effect: _v,
    enum: aE,
    function: eE,
    instanceof: j3,
    intersection: F3,
    lazy: tE,
    literal: nE,
    map: W3,
    nan: z3,
    nativeEnum: lE,
    never: Z3,
    null: B3,
    nullable: uE,
    number: t0,
    object: G3,
    oboolean: dE,
    onumber: fE,
    optional: iE,
    ostring: oE,
    pipeline: cE,
    preprocess: sE,
    promise: rE,
    record: P3,
    set: I3,
    strictObject: X3,
    string: e0,
    symbol: L3,
    transformer: _v,
    tuple: J3,
    undefined: q3,
    union: K3,
    unknown: H3,
    void: Q3,
    NEVER: mE,
    ZodIssueCode: ce,
    quotelessJson: u3,
    ZodError: Pt,
  }),
  cu = (n) => n.type === "checkbox",
  hl = (n) => n instanceof Date,
  jt = (n) => n == null;
const a0 = (n) => typeof n == "object";
var it = (n) => !jt(n) && !Array.isArray(n) && a0(n) && !hl(n),
  yE = (n) =>
    it(n) && n.target ? (cu(n.target) ? n.target.checked : n.target.value) : n,
  pE = (n) => n.substring(0, n.search(/\.\d+(\.|$)/)) || n,
  vE = (n, l) => n.has(pE(l)),
  gE = (n) => {
    const l = n.constructor && n.constructor.prototype;
    return it(l) && l.hasOwnProperty("isPrototypeOf");
  },
  Od =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function Ct(n) {
  let l;
  const i = Array.isArray(n),
    u = typeof FileList < "u" ? n instanceof FileList : !1;
  if (n instanceof Date) l = new Date(n);
  else if (n instanceof Set) l = new Set(n);
  else if (!(Od && (n instanceof Blob || u)) && (i || it(n)))
    if (((l = i ? [] : {}), !i && !gE(n))) l = n;
    else for (const c in n) n.hasOwnProperty(c) && (l[c] = Ct(n[c]));
  else return n;
  return l;
}
var ic = (n) => (Array.isArray(n) ? n.filter(Boolean) : []),
  ct = (n) => n === void 0,
  _e = (n, l, i) => {
    if (!l || !it(n)) return i;
    const u = ic(l.split(/[,[\].]+?/)).reduce((c, o) => (jt(c) ? c : c[o]), n);
    return ct(u) || u === n ? (ct(n[l]) ? i : n[l]) : u;
  },
  Mn = (n) => typeof n == "boolean",
  Cd = (n) => /^\w*$/.test(n),
  l0 = (n) => ic(n.replace(/["|']|\]/g, "").split(/\.|\[/)),
  Ke = (n, l, i) => {
    let u = -1;
    const c = Cd(l) ? [l] : l0(l),
      o = c.length,
      d = o - 1;
    for (; ++u < o; ) {
      const h = c[u];
      let y = i;
      if (u !== d) {
        const m = n[h];
        y = it(m) || Array.isArray(m) ? m : isNaN(+c[u + 1]) ? {} : [];
      }
      if (h === "__proto__" || h === "constructor" || h === "prototype") return;
      (n[h] = y), (n = n[h]);
    }
  };
const Sv = { BLUR: "blur", FOCUS_OUT: "focusout" },
  hn = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  ea = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  };
gt.createContext(null);
var bE = (n, l, i, u = !0) => {
    const c = { defaultValues: l._defaultValues };
    for (const o in n)
      Object.defineProperty(c, o, {
        get: () => {
          const d = o;
          return (
            l._proxyFormState[d] !== hn.all &&
              (l._proxyFormState[d] = !u || hn.all),
            n[d]
          );
        },
      });
    return c;
  },
  Nn = (n) => typeof n == "string",
  _E = (n, l, i, u, c) =>
    Nn(n)
      ? (u && l.watch.add(n), _e(i, n, c))
      : Array.isArray(n)
      ? n.map((o) => (u && l.watch.add(o), _e(i, o)))
      : (u && (l.watchAll = !0), i),
  r0 = (n, l, i, u, c) =>
    l
      ? {
          ...i[n],
          types: { ...(i[n] && i[n].types ? i[n].types : {}), [u]: c || !0 },
        }
      : {},
  Di = (n) => (Array.isArray(n) ? n : [n]),
  xv = () => {
    let n = [];
    return {
      get observers() {
        return n;
      },
      next: (c) => {
        for (const o of n) o.next && o.next(c);
      },
      subscribe: (c) => (
        n.push(c),
        {
          unsubscribe: () => {
            n = n.filter((o) => o !== c);
          },
        }
      ),
      unsubscribe: () => {
        n = [];
      },
    };
  },
  sd = (n) => jt(n) || !a0(n);
function La(n, l) {
  if (sd(n) || sd(l)) return n === l;
  if (hl(n) && hl(l)) return n.getTime() === l.getTime();
  const i = Object.keys(n),
    u = Object.keys(l);
  if (i.length !== u.length) return !1;
  for (const c of i) {
    const o = n[c];
    if (!u.includes(c)) return !1;
    if (c !== "ref") {
      const d = l[c];
      if (
        (hl(o) && hl(d)) ||
        (it(o) && it(d)) ||
        (Array.isArray(o) && Array.isArray(d))
          ? !La(o, d)
          : o !== d
      )
        return !1;
    }
  }
  return !0;
}
var Dt = (n) => it(n) && !Object.keys(n).length,
  Md = (n) => n.type === "file",
  mn = (n) => typeof n == "function",
  Ks = (n) => {
    if (!Od) return !1;
    const l = n ? n.ownerDocument : 0;
    return (
      n instanceof
      (l && l.defaultView ? l.defaultView.HTMLElement : HTMLElement)
    );
  },
  i0 = (n) => n.type === "select-multiple",
  Nd = (n) => n.type === "radio",
  SE = (n) => Nd(n) || cu(n),
  Gf = (n) => Ks(n) && n.isConnected;
function xE(n, l) {
  const i = l.slice(0, -1).length;
  let u = 0;
  for (; u < i; ) n = ct(n) ? u++ : n[l[u++]];
  return n;
}
function EE(n) {
  for (const l in n) if (n.hasOwnProperty(l) && !ct(n[l])) return !1;
  return !0;
}
function dt(n, l) {
  const i = Array.isArray(l) ? l : Cd(l) ? [l] : l0(l),
    u = i.length === 1 ? n : xE(n, i),
    c = i.length - 1,
    o = i[c];
  return (
    u && delete u[o],
    c !== 0 &&
      ((it(u) && Dt(u)) || (Array.isArray(u) && EE(u))) &&
      dt(n, i.slice(0, -1)),
    n
  );
}
var u0 = (n) => {
  for (const l in n) if (mn(n[l])) return !0;
  return !1;
};
function $s(n, l = {}) {
  const i = Array.isArray(n);
  if (it(n) || i)
    for (const u in n)
      Array.isArray(n[u]) || (it(n[u]) && !u0(n[u]))
        ? ((l[u] = Array.isArray(n[u]) ? [] : {}), $s(n[u], l[u]))
        : jt(n[u]) || (l[u] = !0);
  return l;
}
function s0(n, l, i) {
  const u = Array.isArray(n);
  if (it(n) || u)
    for (const c in n)
      Array.isArray(n[c]) || (it(n[c]) && !u0(n[c]))
        ? ct(l) || sd(i[c])
          ? (i[c] = Array.isArray(n[c]) ? $s(n[c], []) : { ...$s(n[c]) })
          : s0(n[c], jt(l) ? {} : l[c], i[c])
        : (i[c] = !La(n[c], l[c]));
  return i;
}
var xi = (n, l) => s0(n, l, $s(l));
const Ev = { value: !1, isValid: !1 },
  wv = { value: !0, isValid: !0 };
var c0 = (n) => {
    if (Array.isArray(n)) {
      if (n.length > 1) {
        const l = n
          .filter((i) => i && i.checked && !i.disabled)
          .map((i) => i.value);
        return { value: l, isValid: !!l.length };
      }
      return n[0].checked && !n[0].disabled
        ? n[0].attributes && !ct(n[0].attributes.value)
          ? ct(n[0].value) || n[0].value === ""
            ? wv
            : { value: n[0].value, isValid: !0 }
          : wv
        : Ev;
    }
    return Ev;
  },
  o0 = (n, { valueAsNumber: l, valueAsDate: i, setValueAs: u }) =>
    ct(n)
      ? n
      : l
      ? n === ""
        ? NaN
        : n && +n
      : i && Nn(n)
      ? new Date(n)
      : u
      ? u(n)
      : n;
const Tv = { isValid: !1, value: null };
var f0 = (n) =>
  Array.isArray(n)
    ? n.reduce(
        (l, i) =>
          i && i.checked && !i.disabled ? { isValid: !0, value: i.value } : l,
        Tv
      )
    : Tv;
function Av(n) {
  const l = n.ref;
  return Md(l)
    ? l.files
    : Nd(l)
    ? f0(n.refs).value
    : i0(l)
    ? [...l.selectedOptions].map(({ value: i }) => i)
    : cu(l)
    ? c0(n.refs).value
    : o0(ct(l.value) ? n.ref.value : l.value, n);
}
var wE = (n, l, i, u) => {
    const c = {};
    for (const o of n) {
      const d = _e(l, o);
      d && Ke(c, o, d._f);
    }
    return {
      criteriaMode: i,
      names: [...n],
      fields: c,
      shouldUseNativeValidation: u,
    };
  },
  Fs = (n) => n instanceof RegExp,
  Ei = (n) =>
    ct(n)
      ? n
      : Fs(n)
      ? n.source
      : it(n)
      ? Fs(n.value)
        ? n.value.source
        : n.value
      : n,
  Rv = (n) => ({
    isOnSubmit: !n || n === hn.onSubmit,
    isOnBlur: n === hn.onBlur,
    isOnChange: n === hn.onChange,
    isOnAll: n === hn.all,
    isOnTouch: n === hn.onTouched,
  });
const Ov = "AsyncFunction";
var TE = (n) =>
    !!n &&
    !!n.validate &&
    !!(
      (mn(n.validate) && n.validate.constructor.name === Ov) ||
      (it(n.validate) &&
        Object.values(n.validate).find((l) => l.constructor.name === Ov))
    ),
  AE = (n) =>
    n.mount &&
    (n.required ||
      n.min ||
      n.max ||
      n.maxLength ||
      n.minLength ||
      n.pattern ||
      n.validate),
  Cv = (n, l, i) =>
    !i &&
    (l.watchAll ||
      l.watch.has(n) ||
      [...l.watch].some(
        (u) => n.startsWith(u) && /^\.\w+/.test(n.slice(u.length))
      ));
const ji = (n, l, i, u) => {
  for (const c of i || Object.keys(n)) {
    const o = _e(n, c);
    if (o) {
      const { _f: d, ...h } = o;
      if (d) {
        if (d.refs && d.refs[0] && l(d.refs[0], c) && !u) return !0;
        if (d.ref && l(d.ref, d.name) && !u) return !0;
        if (ji(h, l)) break;
      } else if (it(h) && ji(h, l)) break;
    }
  }
};
function Mv(n, l, i) {
  const u = _e(n, i);
  if (u || Cd(i)) return { error: u, name: i };
  const c = i.split(".");
  for (; c.length; ) {
    const o = c.join("."),
      d = _e(l, o),
      h = _e(n, o);
    if (d && !Array.isArray(d) && i !== o) return { name: i };
    if (h && h.type) return { name: o, error: h };
    c.pop();
  }
  return { name: i };
}
var RE = (n, l, i, u) => {
    i(n);
    const { name: c, ...o } = n;
    return (
      Dt(o) ||
      Object.keys(o).length >= Object.keys(l).length ||
      Object.keys(o).find((d) => l[d] === (!u || hn.all))
    );
  },
  OE = (n, l, i) =>
    !n ||
    !l ||
    n === l ||
    Di(n).some((u) => u && (i ? u === l : u.startsWith(l) || l.startsWith(u))),
  CE = (n, l, i, u, c) =>
    c.isOnAll
      ? !1
      : !i && c.isOnTouch
      ? !(l || n)
      : (i ? u.isOnBlur : c.isOnBlur)
      ? !n
      : (i ? u.isOnChange : c.isOnChange)
      ? n
      : !0,
  ME = (n, l) => !ic(_e(n, l)).length && dt(n, l),
  NE = (n, l, i) => {
    const u = Di(_e(n, i));
    return Ke(u, "root", l[i]), Ke(n, i, u), n;
  },
  Ns = (n) => Nn(n);
function Nv(n, l, i = "validate") {
  if (Ns(n) || (Array.isArray(n) && n.every(Ns)) || (Mn(n) && !n))
    return { type: i, message: Ns(n) ? n : "", ref: l };
}
var sr = (n) => (it(n) && !Fs(n) ? n : { value: n, message: "" }),
  Dv = async (n, l, i, u, c, o) => {
    const {
        ref: d,
        refs: h,
        required: y,
        maxLength: m,
        minLength: v,
        min: x,
        max: b,
        pattern: E,
        validate: w,
        name: N,
        valueAsNumber: U,
        mount: A,
      } = n._f,
      k = _e(i, N);
    if (!A || l.has(N)) return {};
    const _ = h ? h[0] : d,
      S = (V) => {
        c &&
          _.reportValidity &&
          (_.setCustomValidity(Mn(V) ? "" : V || ""), _.reportValidity());
      },
      R = {},
      X = Nd(d),
      q = cu(d),
      T = X || q,
      M =
        ((U || Md(d)) && ct(d.value) && ct(k)) ||
        (Ks(d) && d.value === "") ||
        k === "" ||
        (Array.isArray(k) && !k.length),
      B = r0.bind(null, N, u, R),
      G = (V, I, re, se = ea.maxLength, D = ea.minLength) => {
        const J = V ? I : re;
        R[N] = { type: V ? se : D, message: J, ref: d, ...B(V ? se : D, J) };
      };
    if (
      o
        ? !Array.isArray(k) || !k.length
        : y &&
          ((!T && (M || jt(k))) ||
            (Mn(k) && !k) ||
            (q && !c0(h).isValid) ||
            (X && !f0(h).isValid))
    ) {
      const { value: V, message: I } = Ns(y)
        ? { value: !!y, message: y }
        : sr(y);
      if (
        V &&
        ((R[N] = {
          type: ea.required,
          message: I,
          ref: _,
          ...B(ea.required, I),
        }),
        !u)
      )
        return S(I), R;
    }
    if (!M && (!jt(x) || !jt(b))) {
      let V, I;
      const re = sr(b),
        se = sr(x);
      if (!jt(k) && !isNaN(k)) {
        const D = d.valueAsNumber || (k && +k);
        jt(re.value) || (V = D > re.value), jt(se.value) || (I = D < se.value);
      } else {
        const D = d.valueAsDate || new Date(k),
          J = (O) => new Date(new Date().toDateString() + " " + O),
          le = d.type == "time",
          ge = d.type == "week";
        Nn(re.value) &&
          k &&
          (V = le
            ? J(k) > J(re.value)
            : ge
            ? k > re.value
            : D > new Date(re.value)),
          Nn(se.value) &&
            k &&
            (I = le
              ? J(k) < J(se.value)
              : ge
              ? k < se.value
              : D < new Date(se.value));
      }
      if ((V || I) && (G(!!V, re.message, se.message, ea.max, ea.min), !u))
        return S(R[N].message), R;
    }
    if ((m || v) && !M && (Nn(k) || (o && Array.isArray(k)))) {
      const V = sr(m),
        I = sr(v),
        re = !jt(V.value) && k.length > +V.value,
        se = !jt(I.value) && k.length < +I.value;
      if ((re || se) && (G(re, V.message, I.message), !u))
        return S(R[N].message), R;
    }
    if (E && !M && Nn(k)) {
      const { value: V, message: I } = sr(E);
      if (
        Fs(V) &&
        !k.match(V) &&
        ((R[N] = { type: ea.pattern, message: I, ref: d, ...B(ea.pattern, I) }),
        !u)
      )
        return S(I), R;
    }
    if (w) {
      if (mn(w)) {
        const V = await w(k, i),
          I = Nv(V, _);
        if (I && ((R[N] = { ...I, ...B(ea.validate, I.message) }), !u))
          return S(I.message), R;
      } else if (it(w)) {
        let V = {};
        for (const I in w) {
          if (!Dt(V) && !u) break;
          const re = Nv(await w[I](k, i), _, I);
          re &&
            ((V = { ...re, ...B(I, re.message) }),
            S(re.message),
            u && (R[N] = V));
        }
        if (!Dt(V) && ((R[N] = { ref: _, ...V }), !u)) return R;
      }
    }
    return S(!0), R;
  };
const DE = {
  mode: hn.onSubmit,
  reValidateMode: hn.onChange,
  shouldFocusError: !0,
};
function jE(n = {}) {
  let l = { ...DE, ...n },
    i = {
      submitCount: 0,
      isDirty: !1,
      isLoading: mn(l.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: l.errors || {},
      disabled: l.disabled || !1,
    };
  const u = {};
  let c =
      it(l.defaultValues) || it(l.values)
        ? Ct(l.values || l.defaultValues) || {}
        : {},
    o = l.shouldUnregister ? {} : Ct(c),
    d = { action: !1, mount: !1, watch: !1 },
    h = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    y,
    m = 0;
  const v = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1,
  };
  let x = { ...v };
  const b = { array: xv(), state: xv() },
    E = Rv(l.mode),
    w = Rv(l.reValidateMode),
    N = l.criteriaMode === hn.all,
    U = (z) => ($) => {
      clearTimeout(m), (m = setTimeout(z, $));
    },
    A = async (z) => {
      if (!l.disabled && (v.isValid || x.isValid || z)) {
        const $ = l.resolver ? Dt((await M()).errors) : await G(u, !0);
        $ !== i.isValid && b.state.next({ isValid: $ });
      }
    },
    k = (z, $) => {
      !l.disabled &&
        (v.isValidating ||
          v.validatingFields ||
          x.isValidating ||
          x.validatingFields) &&
        ((z || Array.from(h.mount)).forEach((ee) => {
          ee &&
            ($ ? Ke(i.validatingFields, ee, $) : dt(i.validatingFields, ee));
        }),
        b.state.next({
          validatingFields: i.validatingFields,
          isValidating: !Dt(i.validatingFields),
        }));
    },
    _ = (z, $ = [], ee, pe, fe = !0, ue = !0) => {
      if (pe && ee && !l.disabled) {
        if (((d.action = !0), ue && Array.isArray(_e(u, z)))) {
          const ye = ee(_e(u, z), pe.argA, pe.argB);
          fe && Ke(u, z, ye);
        }
        if (ue && Array.isArray(_e(i.errors, z))) {
          const ye = ee(_e(i.errors, z), pe.argA, pe.argB);
          fe && Ke(i.errors, z, ye), ME(i.errors, z);
        }
        if (
          (v.touchedFields || x.touchedFields) &&
          ue &&
          Array.isArray(_e(i.touchedFields, z))
        ) {
          const ye = ee(_e(i.touchedFields, z), pe.argA, pe.argB);
          fe && Ke(i.touchedFields, z, ye);
        }
        (v.dirtyFields || x.dirtyFields) && (i.dirtyFields = xi(c, o)),
          b.state.next({
            name: z,
            isDirty: I(z, $),
            dirtyFields: i.dirtyFields,
            errors: i.errors,
            isValid: i.isValid,
          });
      } else Ke(o, z, $);
    },
    S = (z, $) => {
      Ke(i.errors, z, $), b.state.next({ errors: i.errors });
    },
    R = (z) => {
      (i.errors = z), b.state.next({ errors: i.errors, isValid: !1 });
    },
    X = (z, $, ee, pe) => {
      const fe = _e(u, z);
      if (fe) {
        const ue = _e(o, z, ct(ee) ? _e(c, z) : ee);
        ct(ue) || (pe && pe.defaultChecked) || $
          ? Ke(o, z, $ ? ue : Av(fe._f))
          : D(z, ue),
          d.mount && A();
      }
    },
    q = (z, $, ee, pe, fe) => {
      let ue = !1,
        ye = !1;
      const Oe = { name: z };
      if (!l.disabled) {
        if (!ee || pe) {
          (v.isDirty || x.isDirty) &&
            ((ye = i.isDirty),
            (i.isDirty = Oe.isDirty = I()),
            (ue = ye !== Oe.isDirty));
          const et = La(_e(c, z), $);
          (ye = !!_e(i.dirtyFields, z)),
            et ? dt(i.dirtyFields, z) : Ke(i.dirtyFields, z, !0),
            (Oe.dirtyFields = i.dirtyFields),
            (ue = ue || ((v.dirtyFields || x.dirtyFields) && ye !== !et));
        }
        if (ee) {
          const et = _e(i.touchedFields, z);
          et ||
            (Ke(i.touchedFields, z, ee),
            (Oe.touchedFields = i.touchedFields),
            (ue = ue || ((v.touchedFields || x.touchedFields) && et !== ee)));
        }
        ue && fe && b.state.next(Oe);
      }
      return ue ? Oe : {};
    },
    T = (z, $, ee, pe) => {
      const fe = _e(i.errors, z),
        ue = (v.isValid || x.isValid) && Mn($) && i.isValid !== $;
      if (
        (l.delayError && ee
          ? ((y = U(() => S(z, ee))), y(l.delayError))
          : (clearTimeout(m),
            (y = null),
            ee ? Ke(i.errors, z, ee) : dt(i.errors, z)),
        (ee ? !La(fe, ee) : fe) || !Dt(pe) || ue)
      ) {
        const ye = {
          ...pe,
          ...(ue && Mn($) ? { isValid: $ } : {}),
          errors: i.errors,
          name: z,
        };
        (i = { ...i, ...ye }), b.state.next(ye);
      }
    },
    M = async (z) => {
      k(z, !0);
      const $ = await l.resolver(
        o,
        l.context,
        wE(z || h.mount, u, l.criteriaMode, l.shouldUseNativeValidation)
      );
      return k(z), $;
    },
    B = async (z) => {
      const { errors: $ } = await M(z);
      if (z)
        for (const ee of z) {
          const pe = _e($, ee);
          pe ? Ke(i.errors, ee, pe) : dt(i.errors, ee);
        }
      else i.errors = $;
      return $;
    },
    G = async (z, $, ee = { valid: !0 }) => {
      for (const pe in z) {
        const fe = z[pe];
        if (fe) {
          const { _f: ue, ...ye } = fe;
          if (ue) {
            const Oe = h.array.has(ue.name),
              et = fe._f && TE(fe._f);
            et && v.validatingFields && k([pe], !0);
            const ht = await Dv(
              fe,
              h.disabled,
              o,
              N,
              l.shouldUseNativeValidation && !$,
              Oe
            );
            if (
              (et && v.validatingFields && k([pe]),
              ht[ue.name] && ((ee.valid = !1), $))
            )
              break;
            !$ &&
              (_e(ht, ue.name)
                ? Oe
                  ? NE(i.errors, ht, ue.name)
                  : Ke(i.errors, ue.name, ht[ue.name])
                : dt(i.errors, ue.name));
          }
          !Dt(ye) && (await G(ye, $, ee));
        }
      }
      return ee.valid;
    },
    V = () => {
      for (const z of h.unMount) {
        const $ = _e(u, z);
        $ &&
          ($._f.refs ? $._f.refs.every((ee) => !Gf(ee)) : !Gf($._f.ref)) &&
          bt(z);
      }
      h.unMount = new Set();
    },
    I = (z, $) => !l.disabled && (z && $ && Ke(o, z, $), !La(ne(), c)),
    re = (z, $, ee) =>
      _E(
        z,
        h,
        { ...(d.mount ? o : ct($) ? c : Nn(z) ? { [z]: $ } : $) },
        ee,
        $
      ),
    se = (z) =>
      ic(_e(d.mount ? o : c, z, l.shouldUnregister ? _e(c, z, []) : [])),
    D = (z, $, ee = {}) => {
      const pe = _e(u, z);
      let fe = $;
      if (pe) {
        const ue = pe._f;
        ue &&
          (!ue.disabled && Ke(o, z, o0($, ue)),
          (fe = Ks(ue.ref) && jt($) ? "" : $),
          i0(ue.ref)
            ? [...ue.ref.options].forEach(
                (ye) => (ye.selected = fe.includes(ye.value))
              )
            : ue.refs
            ? cu(ue.ref)
              ? ue.refs.length > 1
                ? ue.refs.forEach(
                    (ye) =>
                      (!ye.defaultChecked || !ye.disabled) &&
                      (ye.checked = Array.isArray(fe)
                        ? !!fe.find((Oe) => Oe === ye.value)
                        : fe === ye.value)
                  )
                : ue.refs[0] && (ue.refs[0].checked = !!fe)
              : ue.refs.forEach((ye) => (ye.checked = ye.value === fe))
            : Md(ue.ref)
            ? (ue.ref.value = "")
            : ((ue.ref.value = fe),
              ue.ref.type || b.state.next({ name: z, values: Ct(o) })));
      }
      (ee.shouldDirty || ee.shouldTouch) &&
        q(z, fe, ee.shouldTouch, ee.shouldDirty, !0),
        ee.shouldValidate && P(z);
    },
    J = (z, $, ee) => {
      for (const pe in $) {
        const fe = $[pe],
          ue = `${z}.${pe}`,
          ye = _e(u, ue);
        (h.array.has(z) || it(fe) || (ye && !ye._f)) && !hl(fe)
          ? J(ue, fe, ee)
          : D(ue, fe, ee);
      }
    },
    le = (z, $, ee = {}) => {
      const pe = _e(u, z),
        fe = h.array.has(z),
        ue = Ct($);
      Ke(o, z, ue),
        fe
          ? (b.array.next({ name: z, values: Ct(o) }),
            (v.isDirty || v.dirtyFields || x.isDirty || x.dirtyFields) &&
              ee.shouldDirty &&
              b.state.next({
                name: z,
                dirtyFields: xi(c, o),
                isDirty: I(z, ue),
              }))
          : pe && !pe._f && !jt(ue)
          ? J(z, ue, ee)
          : D(z, ue, ee),
        Cv(z, h) && b.state.next({ ...i }),
        b.state.next({ name: d.mount ? z : void 0, values: Ct(o) });
    },
    ge = async (z) => {
      d.mount = !0;
      const $ = z.target;
      let ee = $.name,
        pe = !0;
      const fe = _e(u, ee),
        ue = (ye) => {
          pe =
            Number.isNaN(ye) ||
            (hl(ye) && isNaN(ye.getTime())) ||
            La(ye, _e(o, ee, ye));
        };
      if (fe) {
        let ye, Oe;
        const et = $.type ? Av(fe._f) : yE(z),
          ht = z.type === Sv.BLUR || z.type === Sv.FOCUS_OUT,
          cc =
            (!AE(fe._f) && !l.resolver && !_e(i.errors, ee) && !fe._f.deps) ||
            CE(ht, _e(i.touchedFields, ee), i.isSubmitted, w, E),
          fa = Cv(ee, h, ht);
        Ke(o, ee, et),
          ht
            ? (fe._f.onBlur && fe._f.onBlur(z), y && y(0))
            : fe._f.onChange && fe._f.onChange(z);
        const da = q(ee, et, ht),
          qn = !Dt(da) || fa;
        if (
          (!ht && b.state.next({ name: ee, type: z.type, values: Ct(o) }), cc)
        )
          return (
            (v.isValid || x.isValid) &&
              (l.mode === "onBlur" ? ht && A() : ht || A()),
            qn && b.state.next({ name: ee, ...(fa ? {} : da) })
          );
        if ((!ht && fa && b.state.next({ ...i }), l.resolver)) {
          const { errors: Xa } = await M([ee]);
          if ((ue(et), pe)) {
            const Ka = Mv(i.errors, u, ee),
              fu = Mv(Xa, u, Ka.name || ee);
            (ye = fu.error), (ee = fu.name), (Oe = Dt(Xa));
          }
        } else
          k([ee], !0),
            (ye = (await Dv(fe, h.disabled, o, N, l.shouldUseNativeValidation))[
              ee
            ]),
            k([ee]),
            ue(et),
            pe &&
              (ye
                ? (Oe = !1)
                : (v.isValid || x.isValid) && (Oe = await G(u, !0)));
        pe && (fe._f.deps && P(fe._f.deps), T(ee, Oe, ye, da));
      }
    },
    O = (z, $) => {
      if (_e(i.errors, $) && z.focus) return z.focus(), 1;
    },
    P = async (z, $ = {}) => {
      let ee, pe;
      const fe = Di(z);
      if (l.resolver) {
        const ue = await B(ct(z) ? z : fe);
        (ee = Dt(ue)), (pe = z ? !fe.some((ye) => _e(ue, ye)) : ee);
      } else
        z
          ? ((pe = (
              await Promise.all(
                fe.map(async (ue) => {
                  const ye = _e(u, ue);
                  return await G(ye && ye._f ? { [ue]: ye } : ye);
                })
              )
            ).every(Boolean)),
            !(!pe && !i.isValid) && A())
          : (pe = ee = await G(u));
      return (
        b.state.next({
          ...(!Nn(z) || ((v.isValid || x.isValid) && ee !== i.isValid)
            ? {}
            : { name: z }),
          ...(l.resolver || !z ? { isValid: ee } : {}),
          errors: i.errors,
        }),
        $.shouldFocus && !pe && ji(u, O, z ? fe : h.mount),
        pe
      );
    },
    ne = (z) => {
      const $ = { ...(d.mount ? o : c) };
      return ct(z) ? $ : Nn(z) ? _e($, z) : z.map((ee) => _e($, ee));
    },
    ie = (z, $) => ({
      invalid: !!_e(($ || i).errors, z),
      isDirty: !!_e(($ || i).dirtyFields, z),
      error: _e(($ || i).errors, z),
      isValidating: !!_e(i.validatingFields, z),
      isTouched: !!_e(($ || i).touchedFields, z),
    }),
    oe = (z) => {
      z && Di(z).forEach(($) => dt(i.errors, $)),
        b.state.next({ errors: z ? i.errors : {} });
    },
    he = (z, $, ee) => {
      const pe = (_e(u, z, { _f: {} })._f || {}).ref,
        fe = _e(i.errors, z) || {},
        { ref: ue, message: ye, type: Oe, ...et } = fe;
      Ke(i.errors, z, { ...et, ...$, ref: pe }),
        b.state.next({ name: z, errors: i.errors, isValid: !1 }),
        ee && ee.shouldFocus && pe && pe.focus && pe.focus();
    },
    de = (z, $) =>
      mn(z)
        ? b.state.subscribe({ next: (ee) => z(re(void 0, $), ee) })
        : re(z, $, !0),
    Ue = (z) =>
      b.state.subscribe({
        next: ($) => {
          OE(z.name, $.name, z.exact) &&
            RE($, z.formState || v, ou, z.reRenderRoot) &&
            z.callback({ values: { ...o }, ...i, ...$ });
        },
      }).unsubscribe,
    Me = (z) => (
      (d.mount = !0), (x = { ...x, ...z.formState }), Ue({ ...z, formState: x })
    ),
    bt = (z, $ = {}) => {
      for (const ee of z ? Di(z) : h.mount)
        h.mount.delete(ee),
          h.array.delete(ee),
          $.keepValue || (dt(u, ee), dt(o, ee)),
          !$.keepError && dt(i.errors, ee),
          !$.keepDirty && dt(i.dirtyFields, ee),
          !$.keepTouched && dt(i.touchedFields, ee),
          !$.keepIsValidating && dt(i.validatingFields, ee),
          !l.shouldUnregister && !$.keepDefaultValue && dt(c, ee);
      b.state.next({ values: Ct(o) }),
        b.state.next({ ...i, ...($.keepDirty ? { isDirty: I() } : {}) }),
        !$.keepIsValid && A();
    },
    Ut = ({ disabled: z, name: $ }) => {
      ((Mn(z) && d.mount) || z || h.disabled.has($)) &&
        (z ? h.disabled.add($) : h.disabled.delete($));
    },
    Zt = (z, $ = {}) => {
      let ee = _e(u, z);
      const pe = Mn($.disabled) || Mn(l.disabled);
      return (
        Ke(u, z, {
          ...(ee || {}),
          _f: {
            ...(ee && ee._f ? ee._f : { ref: { name: z } }),
            name: z,
            mount: !0,
            ...$,
          },
        }),
        h.mount.add(z),
        ee
          ? Ut({ disabled: Mn($.disabled) ? $.disabled : l.disabled, name: z })
          : X(z, !0, $.value),
        {
          ...(pe ? { disabled: $.disabled || l.disabled } : {}),
          ...(l.progressive
            ? {
                required: !!$.required,
                min: Ei($.min),
                max: Ei($.max),
                minLength: Ei($.minLength),
                maxLength: Ei($.maxLength),
                pattern: Ei($.pattern),
              }
            : {}),
          name: z,
          onChange: ge,
          onBlur: ge,
          ref: (fe) => {
            if (fe) {
              Zt(z, $), (ee = _e(u, z));
              const ue =
                  (ct(fe.value) &&
                    fe.querySelectorAll &&
                    fe.querySelectorAll("input,select,textarea")[0]) ||
                  fe,
                ye = SE(ue),
                Oe = ee._f.refs || [];
              if (ye ? Oe.find((et) => et === ue) : ue === ee._f.ref) return;
              Ke(u, z, {
                _f: {
                  ...ee._f,
                  ...(ye
                    ? {
                        refs: [
                          ...Oe.filter(Gf),
                          ue,
                          ...(Array.isArray(_e(c, z)) ? [{}] : []),
                        ],
                        ref: { type: ue.type, name: z },
                      }
                    : { ref: ue }),
                },
              }),
                X(z, !1, void 0, ue);
            } else
              (ee = _e(u, z, {})),
                ee._f && (ee._f.mount = !1),
                (l.shouldUnregister || $.shouldUnregister) &&
                  !(vE(h.array, z) && d.action) &&
                  h.unMount.add(z);
          },
        }
      );
    },
    wn = () => l.shouldFocusError && ji(u, O, h.mount),
    Ln = (z) => {
      Mn(z) &&
        (b.state.next({ disabled: z }),
        ji(
          u,
          ($, ee) => {
            const pe = _e(u, ee);
            pe &&
              (($.disabled = pe._f.disabled || z),
              Array.isArray(pe._f.refs) &&
                pe._f.refs.forEach((fe) => {
                  fe.disabled = pe._f.disabled || z;
                }));
          },
          0,
          !1
        ));
    },
    oa = (z, $) => async (ee) => {
      let pe;
      ee &&
        (ee.preventDefault && ee.preventDefault(), ee.persist && ee.persist());
      let fe = Ct(o);
      if ((b.state.next({ isSubmitting: !0 }), l.resolver)) {
        const { errors: ue, values: ye } = await M();
        (i.errors = ue), (fe = ye);
      } else await G(u);
      if (h.disabled.size) for (const ue of h.disabled) Ke(fe, ue, void 0);
      if ((dt(i.errors, "root"), Dt(i.errors))) {
        b.state.next({ errors: {} });
        try {
          await z(fe, ee);
        } catch (ue) {
          pe = ue;
        }
      } else $ && (await $({ ...i.errors }, ee)), wn(), setTimeout(wn);
      if (
        (b.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: Dt(i.errors) && !pe,
          submitCount: i.submitCount + 1,
          errors: i.errors,
        }),
        pe)
      )
        throw pe;
    },
    Sl = (z, $ = {}) => {
      _e(u, z) &&
        (ct($.defaultValue)
          ? le(z, Ct(_e(c, z)))
          : (le(z, $.defaultValue), Ke(c, z, Ct($.defaultValue))),
        $.keepTouched || dt(i.touchedFields, z),
        $.keepDirty ||
          (dt(i.dirtyFields, z),
          (i.isDirty = $.defaultValue ? I(z, Ct(_e(c, z))) : I())),
        $.keepError || (dt(i.errors, z), v.isValid && A()),
        b.state.next({ ...i }));
    },
    xl = (z, $ = {}) => {
      const ee = z ? Ct(z) : c,
        pe = Ct(ee),
        fe = Dt(z),
        ue = fe ? c : pe;
      if (($.keepDefaultValues || (c = ee), !$.keepValues)) {
        if ($.keepDirtyValues) {
          const ye = new Set([...h.mount, ...Object.keys(xi(c, o))]);
          for (const Oe of Array.from(ye))
            _e(i.dirtyFields, Oe) ? Ke(ue, Oe, _e(o, Oe)) : le(Oe, _e(ue, Oe));
        } else {
          if (Od && ct(z))
            for (const ye of h.mount) {
              const Oe = _e(u, ye);
              if (Oe && Oe._f) {
                const et = Array.isArray(Oe._f.refs)
                  ? Oe._f.refs[0]
                  : Oe._f.ref;
                if (Ks(et)) {
                  const ht = et.closest("form");
                  if (ht) {
                    ht.reset();
                    break;
                  }
                }
              }
            }
          for (const ye of h.mount) le(ye, _e(ue, ye));
        }
        (o = Ct(ue)),
          b.array.next({ values: { ...ue } }),
          b.state.next({ values: { ...ue } });
      }
      (h = {
        mount: $.keepDirtyValues ? h.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (d.mount = !v.isValid || !!$.keepIsValid || !!$.keepDirtyValues),
        (d.watch = !!l.shouldUnregister),
        b.state.next({
          submitCount: $.keepSubmitCount ? i.submitCount : 0,
          isDirty: fe
            ? !1
            : $.keepDirty
            ? i.isDirty
            : !!($.keepDefaultValues && !La(z, c)),
          isSubmitted: $.keepIsSubmitted ? i.isSubmitted : !1,
          dirtyFields: fe
            ? {}
            : $.keepDirtyValues
            ? $.keepDefaultValues && o
              ? xi(c, o)
              : i.dirtyFields
            : $.keepDefaultValues && z
            ? xi(c, z)
            : $.keepDirty
            ? i.dirtyFields
            : {},
          touchedFields: $.keepTouched ? i.touchedFields : {},
          errors: $.keepErrors ? i.errors : {},
          isSubmitSuccessful: $.keepIsSubmitSuccessful
            ? i.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        });
    },
    Qt = (z, $) => xl(mn(z) ? z(o) : z, $),
    uc = (z, $ = {}) => {
      const ee = _e(u, z),
        pe = ee && ee._f;
      if (pe) {
        const fe = pe.refs ? pe.refs[0] : pe.ref;
        fe.focus &&
          (fe.focus(), $.shouldSelect && mn(fe.select) && fe.select());
      }
    },
    ou = (z) => {
      i = { ...i, ...z };
    },
    Ga = {
      control: {
        register: Zt,
        unregister: bt,
        getFieldState: ie,
        handleSubmit: oa,
        setError: he,
        _subscribe: Ue,
        _runSchema: M,
        _getWatch: re,
        _getDirty: I,
        _setValid: A,
        _setFieldArray: _,
        _setDisabledField: Ut,
        _setErrors: R,
        _getFieldArray: se,
        _reset: xl,
        _resetDefaultValues: () =>
          mn(l.defaultValues) &&
          l.defaultValues().then((z) => {
            Qt(z, l.resetOptions), b.state.next({ isLoading: !1 });
          }),
        _removeUnmounted: V,
        _disableForm: Ln,
        _subjects: b,
        _proxyFormState: v,
        get _fields() {
          return u;
        },
        get _formValues() {
          return o;
        },
        get _state() {
          return d;
        },
        set _state(z) {
          d = z;
        },
        get _defaultValues() {
          return c;
        },
        get _names() {
          return h;
        },
        set _names(z) {
          h = z;
        },
        get _formState() {
          return i;
        },
        get _options() {
          return l;
        },
        set _options(z) {
          l = { ...l, ...z };
        },
      },
      subscribe: Me,
      trigger: P,
      register: Zt,
      handleSubmit: oa,
      watch: de,
      setValue: le,
      getValues: ne,
      reset: Qt,
      resetField: Sl,
      clearErrors: oe,
      unregister: bt,
      setError: he,
      setFocus: uc,
      getFieldState: ie,
    };
  return { ...Ga, formControl: Ga };
}
function zE(n = {}) {
  const l = gt.useRef(void 0),
    i = gt.useRef(void 0),
    [u, c] = gt.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: mn(n.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: n.errors || {},
      disabled: n.disabled || !1,
      defaultValues: mn(n.defaultValues) ? void 0 : n.defaultValues,
    });
  l.current ||
    ((l.current = { ...(n.formControl ? n.formControl : jE(n)), formState: u }),
    n.formControl &&
      n.defaultValues &&
      !mn(n.defaultValues) &&
      n.formControl.reset(n.defaultValues, n.resetOptions));
  const o = l.current.control;
  return (
    (o._options = n),
    gt.useLayoutEffect(
      () =>
        o._subscribe({
          formState: o._proxyFormState,
          callback: () => c({ ...o._formState }),
          reRenderRoot: !0,
        }),
      [o]
    ),
    gt.useEffect(() => o._disableForm(n.disabled), [o, n.disabled]),
    gt.useEffect(() => {
      if (o._proxyFormState.isDirty) {
        const d = o._getDirty();
        d !== u.isDirty && o._subjects.state.next({ isDirty: d });
      }
    }, [o, u.isDirty]),
    gt.useEffect(() => {
      n.values && !La(n.values, i.current)
        ? (o._reset(n.values, o._options.resetOptions),
          (i.current = n.values),
          c((d) => ({ ...d })))
        : o._resetDefaultValues();
    }, [n.values, o]),
    gt.useEffect(() => {
      n.errors && !Dt(n.errors) && o._setErrors(n.errors);
    }, [n.errors, o]),
    gt.useEffect(() => {
      o._state.mount || (o._setValid(), (o._state.mount = !0)),
        o._state.watch &&
          ((o._state.watch = !1), o._subjects.state.next({ ...o._formState })),
        o._removeUnmounted();
    }),
    gt.useEffect(() => {
      n.shouldUnregister && o._subjects.state.next({ values: o._getWatch() });
    }, [n.shouldUnregister, o]),
    (l.current.formState = bE(u, o)),
    l.current
  );
}
const jv = (n, l, i) => {
    if (n && "reportValidity" in n) {
      const u = _e(i, l);
      n.setCustomValidity((u && u.message) || ""), n.reportValidity();
    }
  },
  d0 = (n, l) => {
    for (const i in l.fields) {
      const u = l.fields[i];
      u && u.ref && "reportValidity" in u.ref
        ? jv(u.ref, i, n)
        : u && u.refs && u.refs.forEach((c) => jv(c, i, n));
    }
  },
  UE = (n, l) => {
    l.shouldUseNativeValidation && d0(n, l);
    const i = {};
    for (const u in n) {
      const c = _e(l.fields, u),
        o = Object.assign(n[u] || {}, { ref: c && c.ref });
      if (kE(l.names || Object.keys(n), u)) {
        const d = Object.assign({}, _e(i, u));
        Ke(d, "root", o), Ke(i, u, d);
      } else Ke(i, u, o);
    }
    return i;
  },
  kE = (n, l) => {
    const i = zv(l);
    return n.some((u) => zv(u).match(`^${i}\\.\\d+`));
  };
function zv(n) {
  return n.replace(/\]|\[/g, "");
}
function LE(n, l) {
  for (var i = {}; n.length; ) {
    var u = n[0],
      c = u.code,
      o = u.message,
      d = u.path.join(".");
    if (!i[d])
      if ("unionErrors" in u) {
        var h = u.unionErrors[0].errors[0];
        i[d] = { message: h.message, type: h.code };
      } else i[d] = { message: o, type: c };
    if (
      ("unionErrors" in u &&
        u.unionErrors.forEach(function (v) {
          return v.errors.forEach(function (x) {
            return n.push(x);
          });
        }),
      l)
    ) {
      var y = i[d].types,
        m = y && y[u.code];
      i[d] = r0(d, l, i, c, m ? [].concat(m, u.message) : u.message);
    }
    n.shift();
  }
  return i;
}
function qE(n, l, i) {
  return (
    i === void 0 && (i = {}),
    function (u, c, o) {
      try {
        return Promise.resolve(
          (function (d, h) {
            try {
              var y = Promise.resolve(
                n[i.mode === "sync" ? "parse" : "parseAsync"](u, l)
              ).then(function (m) {
                return (
                  o.shouldUseNativeValidation && d0({}, o),
                  { errors: {}, values: i.raw ? Object.assign({}, u) : m }
                );
              });
            } catch (m) {
              return h(m);
            }
            return y && y.then ? y.then(void 0, h) : y;
          })(0, function (d) {
            if (
              (function (h) {
                return Array.isArray(h == null ? void 0 : h.errors);
              })(d)
            )
              return {
                values: {},
                errors: UE(
                  LE(
                    d.errors,
                    !o.shouldUseNativeValidation && o.criteriaMode === "all"
                  ),
                  o
                ),
              };
            throw d;
          })
        );
      } catch (d) {
        return Promise.reject(d);
      }
    }
  );
}
const BE = (n) => !!Object.keys(n ?? {}).length,
  VE = (n, l) => {
    var c;
    let i = !0,
      u = l.length - 1;
    do {
      const o = l[u];
      if ((c = n[o]) != null && c.message) {
        i = !1;
        break;
      }
      u--;
    } while (u >= 0);
    return i;
  },
  HE = ({ txt: n }) => {
    const l = j.useRef(null),
      i = j.useRef(null);
    j.useEffect(() => {
      const c = (o) => {
        l.current &&
          i.current &&
          l.current.contains(o.target) &&
          (i.current.classList.remove("el__tooltip"),
          requestAnimationFrame(() => {
            var d;
            return (d = i == null ? void 0 : i.current) == null
              ? void 0
              : d.classList.add("el__tooltip");
          }));
      };
      return (
        document.addEventListener("mousedown", c),
        () => document.removeEventListener("mousedown", c)
      );
    }, []);
    const u = async () => {
      try {
        await navigator.clipboard.writeText(n);
      } catch (c) {
        console.log(c);
      }
    };
    return Z.jsxs("button", {
      onClick: u,
      type: "button",
      ref: l,
      className: "relative w-full flex justify-start",
      children: [
        n &&
          Z.jsx("div", {
            className:
              "el__cpy_txt appearance-none el__border_sm py-1 px-5 cursor-pointer",
            children: Z.jsx("span", { className: "txt__2", children: n }),
          }),
        Z.jsx("div", {
          ref: i,
          className:
            "absolute el__border_sm -top-[120%] py-1 px-5 z-60 bg-[#000] left-0 min-w-[200px] flex justify-center tooltip pointer-events-none",
          style: { opacity: "0", transform: "translateY(50px)" },
          children: Z.jsx("span", {
            className: "txt__1",
            children: "Copied to clipboard",
          }),
        }),
      ],
    });
  },
  ZE = () => {
    const [n, l] = j.useState(""),
      i = (c) => {
        let h = 0;
        const y = new Uint8Array(16);
        let m = "";
        for (; !Qg.test(m) && h < 100; ) {
          window.crypto.getRandomValues(y);
          const v = [];
          let x = 15;
          do {
            const b = y[x] % c.length;
            (v[x] = c[b]), x--;
          } while (x >= 0);
          (m = v.join("")), h++;
        }
        return h < 100 ? m : "";
      },
      u = () => {
        const c = r3(px),
          o = i(c);
        l(o);
      };
    return Z.jsxs("div", {
      className: "w-full grid gap-y-3 sm:grid-cols-2",
      children: [
        Z.jsxs("button", {
          type: "button",
          onClick: u,
          className:
            "w-fit flex items-center justify-start gap-5 cursor-pointer el__after_below el__flow hover:text-blue-600 appearance-none",
          children: [
            Z.jsx(ix, { className: "icon__md" }),
            Z.jsx("span", {
              className: "txt__2",
              children: "Generate password",
            }),
          ],
        }),
        Z.jsx(HE, { txt: n }),
      ],
    });
  },
  QE = () => {
    const [n, l] = j.useState(!0),
      [i, u] = j.useState(!0);
    return {
      mainPwd: {
        isPwd: n,
        handleClick: () => {
          i || u(!0), l((h) => !h);
        },
      },
      confirmPwd: {
        isPwd: i,
        handleClick: () => {
          n || l(!0), u((h) => !h);
        },
      },
      closeAllPwd: () => {
        l(!0), u(!0);
      },
    };
  },
  h0 = ({ errors: n, el: l }) => {
    var u, c;
    const { prevErr: i } = Xg(n, l.field);
    return Z.jsx("div", {
      className: `absolute top-[2.5%] right-0 transition-all pointer-events-none duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-40 ${
        (u = n[l.field]) != null && u.message
          ? "translate-y-0 opacity-100"
          : "translate-y-[200%] opacity-0"
      }`,
      children: Z.jsx("span", {
        className: "txt__1",
        children: ((c = n[l.field]) == null ? void 0 : c.message) ?? i,
      }),
    });
  },
  YE = ({ el: n, register: l, errors: i }) =>
    Z.jsx("div", {
      className: "w-full grid",
      children: Z.jsxs("label", {
        className: "grid w-full gap-2 relative",
        children: [
          Z.jsx("span", { className: "txt__2", children: n.label }),
          Z.jsx("input", {
            type: n.type ?? "text",
            placeholder: n.place ?? `Your ${n.label}...`,
            className: "input__base txt__2",
            ...l(n.field),
          }),
          Z.jsx(h0, { errors: i, el: n }),
        ],
      }),
    });
function GE(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256.1 144.8c56.2 0 101.9 45.3 101.9 101.1 0 13.1-2.6 25.5-7.3 37l59.5 59c30.8-25.5 55-58.4 69.9-96-35.3-88.7-122.3-151.6-224.2-151.6-28.5 0-55.8 5.1-81.1 14.1l44 43.7c11.6-4.6 24.1-7.3 37.3-7.3zM52.4 89.7l46.5 46.1 9.4 9.3c-33.9 26-60.4 60.8-76.3 100.8 35.2 88.7 122.2 151.6 224.1 151.6 31.6 0 61.7-6.1 89.2-17l8.6 8.5 59.7 59 25.9-25.7L78.2 64 52.4 89.7zM165 201.4l31.6 31.3c-1 4.2-1.6 8.7-1.6 13.1 0 33.5 27.3 60.6 61.1 60.6 4.5 0 9-.6 13.2-1.6l31.6 31.3c-13.6 6.7-28.7 10.7-44.8 10.7-56.2 0-101.9-45.3-101.9-101.1 0-15.8 4.1-30.7 10.8-44.3zm87.8-15.7l64.2 63.7.4-3.2c0-33.5-27.3-60.6-61.1-60.6l-3.5.1z",
        },
        child: [],
      },
    ],
  })(n);
}
function XE(n) {
  return at({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 105c-101.8 0-188.4 62.4-224 151 35.6 88.6 122.2 151 224 151s188.4-62.4 224-151c-35.6-88.6-122.2-151-224-151zm0 251.7c-56 0-101.8-45.3-101.8-100.7S200 155.3 256 155.3 357.8 200.6 357.8 256 312 356.7 256 356.7zm0-161.1c-33.6 0-61.1 27.2-61.1 60.4s27.5 60.4 61.1 60.4 61.1-27.2 61.1-60.4-27.5-60.4-61.1-60.4z",
        },
        child: [],
      },
    ],
  })(n);
}
const m0 = ({
    el: n,
    register: l,
    errors: i,
    isPwd: u,
    handleClick: c,
    setFocus: o,
  }) =>
    Z.jsx("div", {
      className: "w-full grid",
      children: Z.jsxs("label", {
        className: "grid w-full gap-2 relative",
        children: [
          Z.jsx("span", { className: "txt__2", children: n.label }),
          Z.jsxs("div", {
            className: "w-full flex relative",
            children: [
              Z.jsx("input", {
                type: u ? "password" : "text",
                placeholder: n.place ?? `Your ${n.label}...`,
                className: "input__icon txt__2",
                ...l(n.field),
                onFocus: () => (o == null ? void 0 : o(!0)),
                onBlur: () => {
                  o == null || o(!1);
                },
              }),
              Z.jsx("button", {
                onClick: c,
                type: "button",
                className:
                  "absolute top-1/2 -translate-y-1/2 right-[20px] btn__pwd",
                children: u
                  ? Z.jsx(GE, { className: "icon__sm" })
                  : Z.jsx(XE, { className: "icon__sm" }),
              }),
            ],
          }),
          Z.jsx(h0, { errors: i, el: n }),
        ],
      }),
    }),
  Uv = ({ children: n, min: l }) =>
    Z.jsx("div", {
      className: "max-w-full justify-items-center gap-y-5",
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${l}px, 1fr))`,
      },
      children: n,
    }),
  KE = ({ pwd: n, focus: l }) => {
    const i = j.useMemo(
      () => Zf.reduce((u, c) => u && c.reg.test(n ?? ""), !0),
      [n]
    );
    return Z.jsxs("div", {
      className: `w-full grid gap-y-5 absolute border-2 border-blue-600 z-60 bg-[#000] p-3 rounded-xl left-0 top-[120%] pointer-events-none el__flow ${
        l && !i ? "" : "translate-y-full opacity-0"
      }`,
      children: [
        Z.jsx(Uv, {
          min: 50,
          children: Zf.slice(0, 3).map((u) =>
            Z.jsx(
              "div",
              {
                className: `border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${
                  typeof n == "object"
                    ? "text-blue-600 border-blue-600"
                    : u.reg.test(n)
                    ? "text-green-600 border-border-green-600"
                    : "text-red-600 border-red-600"
                }`,
                children: Z.jsx(u.icon, { className: "icon__sm" }),
              },
              u.id
            )
          ),
        }),
        Z.jsx(Uv, {
          min: 100,
          children: Zf.slice(3, 5).map((u, c, o) =>
            Z.jsxs(
              "div",
              {
                className: `border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${
                  c === o.length - 1 ? "px-4 justify-self-center" : ""
                } ${
                  typeof n == "object"
                    ? "text-blue-600 border-blue-600"
                    : u.reg.test(n)
                    ? "text-green-600 border-border-green-600"
                    : "text-red-600 border-red-600"
                }`,
                children: [
                  Z.jsx(u.icon, { className: "icon__sm" }),
                  c === o.length - 1
                    ? Z.jsxs("div", {
                        className: "w-full flex gap-2",
                        children: [
                          Z.jsx("span", {
                            className: "txt__2",
                            children: (n == null ? void 0 : n.length) ?? 0,
                          }),
                          Z.jsx("span", { className: "txt__2", children: "/" }),
                          Z.jsx("span", { className: "txt__2", children: "8" }),
                        ],
                      })
                    : null,
                ],
              },
              u.id
            )
          ),
        }),
      ],
    });
  },
  $E = ({ register: n, errors: l, mainPwd: i, pwd: u, el: c }) => {
    const [o, d] = j.useState(!1);
    return Z.jsxs("div", {
      className: "w-full relative",
      children: [
        Z.jsx(m0, { el: c, register: n, errors: l, ...i, setFocus: d }),
        Z.jsx(KE, { pwd: u, focus: o }),
      ],
    });
  },
  FE = () => {
    const l = kn().pathname === qg.REGISTER ? Sx : xx;
    return Z.jsx("div", {
      className:
        "w-full txt__col grid gap-y-5 md:grid-cols-2 justify-items-center",
      children: l.map((i) =>
        Z.jsxs(
          "div",
          {
            className: "w-fit flex items-center justify-start gap-5  group",
            children: [
              Z.jsx(i.icon, { className: "icon__sm" }),
              Z.jsxs("div", {
                className: "w-full flex items-center gap-3",
                children: [
                  Z.jsx("span", { className: "txt__1", children: i.msg }),
                  Z.jsx(ec, {
                    to: i.path,
                    className:
                      "txt__2 el__flow hover:text-blue-600 el__after_below",
                    children: i.msgBold,
                  }),
                ],
              }),
            ],
          },
          i.id
        )
      ),
    });
  },
  JE = fl
    .object({
      firstName: fl
        .string()
        .min(1, "First Name is required")
        .max(30, "First Name must be less than 30 characters")
        .regex(mv, "Invalid First Name format"),
      lastName: fl
        .string()
        .min(1, "Last Name is required")
        .max(30, "First Name must be less than 30 characters")
        .regex(mv, "Invalid Last Name format"),
      email: fl
        .string()
        .min(1, "Email is required")
        .email("Invalid Email Format"),
      password: fl
        .string()
        .min(1, "Password is required")
        .max(30, "Password too long")
        .regex(Qg, "Invalid password format")
        .nullable(),
      confirmPassword: fl.string().min(1, "You must confirm your password"),
      terms: fl.boolean().nullable(),
    })
    .refine((n) => n.confirmPassword === n.password, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
    .refine((n) => n.email !== n.password, {
      message: "Email and Password must be different",
      path: ["password"],
    })
    .refine((n) => n.terms, {
      message: "You must accept the terms",
      path: ["terms"],
    }),
  PE = () => {
    const [n, l] = j.useState(0),
      [i, u] = j.useState(!0),
      c = nu(),
      {
        register: o,
        formState: { errors: d },
        watch: h,
        setValue: y,
        handleSubmit: m,
      } = zE({
        mode: "onChange",
        resolver: qE(JE),
        defaultValues: {
          firstName: "sss",
          lastName: "ss",
          email: "Matveevalexander470@gmail.com",
          password: "@2}mX_}^]3#lA^w5",
          confirmPassword: "@2}mX_}^]3#lA^w5",
          terms: !0,
        },
      }),
      v = m((k) => {
        console.log(k), c(Bx({ type: fr.OK, msg: "Registration successful" }));
      }),
      { mainPwd: x, confirmPwd: b, closeAllPwd: E } = QE(),
      w = j.useMemo(() => BE(d), [d]),
      N = h();
    j.useEffect(() => {
      (() => {
        const _ = yx[n];
        let S = VE(d, _);
        if (S) {
          for (const R in N)
            if (
              _.includes(R) &&
              (typeof N[R] == "string" ? !N[R].trim() : !N[R])
            ) {
              S = !1;
              break;
            }
        }
        !S && !i ? u(!0) : S && i && u(!1);
      })();
    }, [n, d, i, N]);
    const U = j.useCallback(
        (k) => {
          E(), l(k);
        },
        [E]
      ),
      A = h("password");
    return (
      console.log(i),
      console.log(w),
      Z.jsxs("div", {
        className: "w-full grid justify-items-center gap-10",
        children: [
          Z.jsx(n3, { currForm: n, totLen: 2 }),
          Z.jsxs("form", {
            onSubmit: v,
            className:
              "flex flex-col justify-center  p-6 el__border_md max-w-[500px] sm:max-w-[600px] txt__col overflow-hidden",
            children: [
              Z.jsxs("div", {
                className: `w-[200%] flex transition-all duration-500 ${
                  n
                    ? "max-h-[350px] min-h-[350px]"
                    : "max-h-[300px] min-h-[300px]"
                }`,
                style: { transform: `translateX(-${n * 50}%)` },
                children: [
                  Z.jsx("div", {
                    className: `w-full grid gap-5 items-start h-fit el__flow ${
                      n ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`,
                    children: Vg.map((k) =>
                      Z.jsx(YE, { el: k, register: o, errors: d }, k.id)
                    ),
                  }),
                  Z.jsxs("div", {
                    className: `w-full grid gap-5 items-start h-fit el__flow ${
                      n ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`,
                    children: [
                      Hg.map((k, _) =>
                        _
                          ? Z.jsx(
                              m0,
                              { el: k, register: o, errors: d, ...b },
                              k.id
                            )
                          : Z.jsx(
                              $E,
                              {
                                mainPwd: x,
                                pwd: A,
                                register: o,
                                errors: d,
                                el: k,
                              },
                              k.id
                            )
                      ),
                      Z.jsx(ZE, {}),
                      Z.jsx(t3, { setValue: y, watch: h, errors: d }),
                    ],
                  }),
                ],
              }),
              Z.jsx(Wx, {
                currForm: n,
                setCurrForm: U,
                totLen: 2,
                isNextDisabled: i,
                children: Z.jsx("div", {
                  className: "max-w-[250px] justify-self-center",
                  children: Z.jsx(i3, {
                    isPending: !1,
                    isDisabled: w || i,
                    label: "Register",
                  }),
                }),
              }),
            ],
          }),
          Z.jsx(FE, {}),
        ],
      })
    );
  },
  WE = () =>
    Z.jsxs("div", {
      className: "w-full grid justify-items-center gap-5",
      children: [Z.jsx(Jx, { title: "Register" }), Z.jsx(PE, {})],
    }),
  IE = () => Z.jsx("div", { children: "LoginPage" }),
  e4 = () => Z.jsx("div", { children: "VerifyEmailPage" }),
  t4 = () => Z.jsx("div", { children: "ForgotPwdPage" }),
  n4 = () =>
    Z.jsxs(H_, {
      children: [
        Z.jsx(ka, {
          path: "/",
          element: Z.jsx(Gx, {}),
          children: Z.jsxs(ka, {
            path: "auth",
            element: Z.jsx(Fx, {}),
            children: [
              Z.jsx(ka, { path: "register", element: Z.jsx(WE, {}) }),
              Z.jsx(ka, { path: "login", element: Z.jsx(IE, {}) }),
              Z.jsx(ka, { path: "verify-account", element: Z.jsx(e4, {}) }),
              Z.jsx(ka, { path: "forgot-pwd", element: Z.jsx(t4, {}) }),
            ],
          }),
        }),
        Z.jsx(ka, { path: "*", element: Z.jsx(ig, { to: "/", replace: !0 }) }),
      ],
    });
var y0 = ((n) => (
  (n.uninitialized = "uninitialized"),
  (n.pending = "pending"),
  (n.fulfilled = "fulfilled"),
  (n.rejected = "rejected"),
  n
))(y0 || {});
function kv(n) {
  return {
    status: n,
    isUninitialized: n === "uninitialized",
    isLoading: n === "pending",
    isSuccess: n === "fulfilled",
    isError: n === "rejected",
  };
}
var Lv = Ba;
function p0(n, l) {
  if (n === l || !((Lv(n) && Lv(l)) || (Array.isArray(n) && Array.isArray(l))))
    return l;
  const i = Object.keys(l),
    u = Object.keys(n);
  let c = i.length === u.length;
  const o = Array.isArray(l) ? [] : {};
  for (const d of i) (o[d] = p0(n[d], l[d])), c && (c = n[d] === o[d]);
  return c ? n : o;
}
function mr(n) {
  let l = 0;
  for (const i in n) l++;
  return l;
}
var qv = (n) => [].concat(...n);
function a4(n) {
  return new RegExp("(^|:)//").test(n);
}
function l4() {
  return typeof document > "u" ? !0 : document.visibilityState !== "hidden";
}
function Js(n) {
  return n != null;
}
function r4() {
  return typeof navigator > "u" || navigator.onLine === void 0
    ? !0
    : navigator.onLine;
}
var i4 = (n) => n.replace(/\/$/, ""),
  u4 = (n) => n.replace(/^\//, "");
function s4(n, l) {
  if (!n) return l;
  if (!l) return n;
  if (a4(l)) return l;
  const i = n.endsWith("/") || !l.startsWith("?") ? "/" : "";
  return (n = i4(n)), (l = u4(l)), `${n}${i}${l}`;
}
function c4(n, l, i) {
  return n.has(l) ? n.get(l) : n.set(l, i).get(l);
}
var Bv = (...n) => fetch(...n),
  o4 = (n) => n.status >= 200 && n.status <= 299,
  f4 = (n) => /ion\/(vnd\.api\+)?json/.test(n.get("content-type") || "");
function Vv(n) {
  if (!Ba(n)) return n;
  const l = { ...n };
  for (const [i, u] of Object.entries(l)) u === void 0 && delete l[i];
  return l;
}
function d4({
  baseUrl: n,
  prepareHeaders: l = (x) => x,
  fetchFn: i = Bv,
  paramsSerializer: u,
  isJsonContentType: c = f4,
  jsonContentType: o = "application/json",
  jsonReplacer: d,
  timeout: h,
  responseHandler: y,
  validateStatus: m,
  ...v
} = {}) {
  return (
    typeof fetch > "u" &&
      i === Bv &&
      console.warn(
        "Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."
      ),
    async (b, E, w) => {
      const { getState: N, extra: U, endpoint: A, forced: k, type: _ } = E;
      let S,
        {
          url: R,
          headers: X = new Headers(v.headers),
          params: q = void 0,
          responseHandler: T = y ?? "json",
          validateStatus: M = m ?? o4,
          timeout: B = h,
          ...G
        } = typeof b == "string" ? { url: b } : b,
        V,
        I = E.signal;
      B &&
        ((V = new AbortController()),
        E.signal.addEventListener("abort", V.abort),
        (I = V.signal));
      let re = { ...v, signal: I, ...G };
      (X = new Headers(Vv(X))),
        (re.headers =
          (await l(X, {
            getState: N,
            arg: b,
            extra: U,
            endpoint: A,
            forced: k,
            type: _,
            extraOptions: w,
          })) || X);
      const se = (oe) =>
        typeof oe == "object" &&
        (Ba(oe) || Array.isArray(oe) || typeof oe.toJSON == "function");
      if (
        (!re.headers.has("content-type") &&
          se(re.body) &&
          re.headers.set("content-type", o),
        se(re.body) && c(re.headers) && (re.body = JSON.stringify(re.body, d)),
        q)
      ) {
        const oe = ~R.indexOf("?") ? "&" : "?",
          he = u ? u(q) : new URLSearchParams(Vv(q));
        R += oe + he;
      }
      R = s4(n, R);
      const D = new Request(R, re);
      S = { request: new Request(R, re) };
      let le,
        ge = !1,
        O =
          V &&
          setTimeout(() => {
            (ge = !0), V.abort();
          }, B);
      try {
        le = await i(D);
      } catch (oe) {
        return {
          error: {
            status: ge ? "TIMEOUT_ERROR" : "FETCH_ERROR",
            error: String(oe),
          },
          meta: S,
        };
      } finally {
        O && clearTimeout(O),
          V == null || V.signal.removeEventListener("abort", V.abort);
      }
      const P = le.clone();
      S.response = P;
      let ne,
        ie = "";
      try {
        let oe;
        if (
          (await Promise.all([
            x(le, T).then(
              (he) => (ne = he),
              (he) => (oe = he)
            ),
            P.text().then(
              (he) => (ie = he),
              () => {}
            ),
          ]),
          oe)
        )
          throw oe;
      } catch (oe) {
        return {
          error: {
            status: "PARSING_ERROR",
            originalStatus: le.status,
            data: ie,
            error: String(oe),
          },
          meta: S,
        };
      }
      return M(le, ne)
        ? { data: ne, meta: S }
        : { error: { status: le.status, data: ne }, meta: S };
    }
  );
  async function x(b, E) {
    if (typeof E == "function") return E(b);
    if (
      (E === "content-type" && (E = c(b.headers) ? "json" : "text"),
      E === "json")
    ) {
      const w = await b.text();
      return w.length ? JSON.parse(w) : null;
    }
    return b.text();
  }
}
var Hv = class {
    constructor(n, l = void 0) {
      (this.value = n), (this.meta = l);
    }
  },
  Dd = pn("__rtkq/focused"),
  v0 = pn("__rtkq/unfocused"),
  jd = pn("__rtkq/online"),
  g0 = pn("__rtkq/offline");
function zd(n) {
  return n.type === "query";
}
function h4(n) {
  return n.type === "mutation";
}
function Ud(n) {
  return n.type === "infinitequery";
}
function kd(n, l, i, u, c, o) {
  return m4(n)
    ? n(l, i, u, c).filter(Js).map(cd).map(o)
    : Array.isArray(n)
    ? n.map(cd).map(o)
    : [];
}
function m4(n) {
  return typeof n == "function";
}
function cd(n) {
  return typeof n == "string" ? { type: n } : n;
}
function y4(n, l) {
  return n.catch(l);
}
var Wi = Symbol("forceQueryFn"),
  od = (n) => typeof n[Wi] == "function";
function p4({
  serializeQueryArgs: n,
  queryThunk: l,
  infiniteQueryThunk: i,
  mutationThunk: u,
  api: c,
  context: o,
}) {
  const d = new Map(),
    h = new Map(),
    {
      unsubscribeQueryResult: y,
      removeMutationResult: m,
      updateSubscriptionOptions: v,
    } = c.internalActions;
  return {
    buildInitiateQuery: U,
    buildInitiateInfiniteQuery: A,
    buildInitiateMutation: k,
    getRunningQueryThunk: x,
    getRunningMutationThunk: b,
    getRunningQueriesThunk: E,
    getRunningMutationsThunk: w,
  };
  function x(_, S) {
    return (R) => {
      var T;
      const X = o.endpointDefinitions[_],
        q = n({ queryArgs: S, endpointDefinition: X, endpointName: _ });
      return (T = d.get(R)) == null ? void 0 : T[q];
    };
  }
  function b(_, S) {
    return (R) => {
      var X;
      return (X = h.get(R)) == null ? void 0 : X[S];
    };
  }
  function E() {
    return (_) => Object.values(d.get(_) || {}).filter(Js);
  }
  function w() {
    return (_) => Object.values(h.get(_) || {}).filter(Js);
  }
  function N(_, S) {
    const R =
      (
        X,
        {
          subscribe: q = !0,
          forceRefetch: T,
          subscriptionOptions: M,
          [Wi]: B,
          ...G
        } = {}
      ) =>
      (V, I) => {
        var de;
        const re = n({ queryArgs: X, endpointDefinition: S, endpointName: _ });
        let se;
        const D = {
          ...G,
          type: "query",
          subscribe: q,
          forceRefetch: T,
          subscriptionOptions: M,
          endpointName: _,
          originalArgs: X,
          queryCacheKey: re,
          [Wi]: B,
        };
        if (zd(S)) se = l(D);
        else {
          const { direction: Ue, initialPageParam: Me } = G;
          se = i({ ...D, direction: Ue, initialPageParam: Me });
        }
        const J = c.endpoints[_].select(X),
          le = V(se),
          ge = J(I()),
          { requestId: O, abort: P } = le,
          ne = ge.requestId !== O,
          ie = (de = d.get(V)) == null ? void 0 : de[re],
          oe = () => J(I()),
          he = Object.assign(
            B
              ? le.then(oe)
              : ne && !ie
              ? Promise.resolve(ge)
              : Promise.all([ie, le]).then(oe),
            {
              arg: X,
              requestId: O,
              subscriptionOptions: M,
              queryCacheKey: re,
              abort: P,
              async unwrap() {
                const Ue = await he;
                if (Ue.isError) throw Ue.error;
                return Ue.data;
              },
              refetch: () => V(R(X, { subscribe: !1, forceRefetch: !0 })),
              unsubscribe() {
                q && V(y({ queryCacheKey: re, requestId: O }));
              },
              updateSubscriptionOptions(Ue) {
                (he.subscriptionOptions = Ue),
                  V(
                    v({
                      endpointName: _,
                      requestId: O,
                      queryCacheKey: re,
                      options: Ue,
                    })
                  );
              },
            }
          );
        if (!ie && !ne && !B) {
          const Ue = c4(d, V, {});
          (Ue[re] = he),
            he.then(() => {
              delete Ue[re], mr(Ue) || d.delete(V);
            });
        }
        return he;
      };
    return R;
  }
  function U(_, S) {
    return N(_, S);
  }
  function A(_, S) {
    return N(_, S);
  }
  function k(_) {
    return (S, { track: R = !0, fixedCacheKey: X } = {}) =>
      (q, T) => {
        const M = u({
            type: "mutation",
            endpointName: _,
            originalArgs: S,
            track: R,
            fixedCacheKey: X,
          }),
          B = q(M),
          { requestId: G, abort: V, unwrap: I } = B,
          re = y4(
            B.unwrap().then((le) => ({ data: le })),
            (le) => ({ error: le })
          ),
          se = () => {
            q(m({ requestId: G, fixedCacheKey: X }));
          },
          D = Object.assign(re, {
            arg: B.arg,
            requestId: G,
            abort: V,
            unwrap: I,
            reset: se,
          }),
          J = h.get(q) || {};
        return (
          h.set(q, J),
          (J[G] = D),
          D.then(() => {
            delete J[G], mr(J) || h.delete(q);
          }),
          X &&
            ((J[X] = D),
            D.then(() => {
              J[X] === D && (delete J[X], mr(J) || h.delete(q));
            })),
          D
        );
      };
  }
}
function v4(n) {
  return n;
}
var Ts = (n = {}) => ({ ...n, [nc]: !0 });
function g4({
  reducerPath: n,
  baseQuery: l,
  context: { endpointDefinitions: i },
  serializeQueryArgs: u,
  api: c,
  assertTagType: o,
  selectors: d,
}) {
  const h = (T, M, B, G) => (V, I) => {
    const re = i[T],
      se = u({ queryArgs: M, endpointDefinition: re, endpointName: T });
    if (
      (V(
        c.internalActions.queryResultPatched({ queryCacheKey: se, patches: B })
      ),
      !G)
    )
      return;
    const D = c.endpoints[T].select(M)(I()),
      J = kd(re.providesTags, D.data, void 0, M, {}, o);
    V(
      c.internalActions.updateProvidedBy({ queryCacheKey: se, providedTags: J })
    );
  };
  function y(T, M, B = 0) {
    const G = [M, ...T];
    return B && G.length > B ? G.slice(0, -1) : G;
  }
  function m(T, M, B = 0) {
    const G = [...T, M];
    return B && G.length > B ? G.slice(1) : G;
  }
  const v =
      (T, M, B, G = !0) =>
      (V, I) => {
        const se = c.endpoints[T].select(M)(I()),
          D = {
            patches: [],
            inversePatches: [],
            undo: () => V(c.util.patchQueryData(T, M, D.inversePatches, G)),
          };
        if (se.status === "uninitialized") return D;
        let J;
        if ("data" in se)
          if (_n(se.data)) {
            const [le, ge, O] = Og(se.data, B);
            D.patches.push(...ge), D.inversePatches.push(...O), (J = le);
          } else
            (J = B(se.data)),
              D.patches.push({ op: "replace", path: [], value: J }),
              D.inversePatches.push({
                op: "replace",
                path: [],
                value: se.data,
              });
        return (
          D.patches.length === 0 ||
            V(c.util.patchQueryData(T, M, D.patches, G)),
          D
        );
      },
    x = (T, M, B) => (G) =>
      G(
        c.endpoints[T].initiate(M, {
          subscribe: !1,
          forceRefetch: !0,
          [Wi]: () => ({ data: B }),
        })
      ),
    b = (T, M) => (T.query && T[M] ? T[M] : v4),
    E = async (
      T,
      {
        signal: M,
        abort: B,
        rejectWithValue: G,
        fulfillWithValue: V,
        dispatch: I,
        getState: re,
        extra: se,
      }
    ) => {
      var J;
      const D = i[T.endpointName];
      try {
        let le = b(D, "transformResponse");
        const ge = {
            signal: M,
            abort: B,
            dispatch: I,
            getState: re,
            extra: se,
            endpoint: T.endpointName,
            type: T.type,
            forced: T.type === "query" ? w(T, re()) : void 0,
            queryCacheKey: T.type === "query" ? T.queryCacheKey : void 0,
          },
          O = T.type === "query" ? T[Wi] : void 0;
        let P;
        const ne = async (oe, he, de, Ue) => {
          if (he == null && oe.pages.length)
            return Promise.resolve({ data: oe });
          const Me = { queryArg: T.originalArgs, pageParam: he },
            bt = await ie(Me),
            Ut = Ue ? y : m;
          return {
            data: {
              pages: Ut(oe.pages, bt.data, de),
              pageParams: Ut(oe.pageParams, he, de),
            },
          };
        };
        async function ie(oe) {
          let he;
          const { extraOptions: de } = D;
          if (
            (O
              ? (he = O())
              : D.query
              ? (he = await l(D.query(oe), ge, de))
              : (he = await D.queryFn(oe, ge, de, (Me) => l(Me, ge, de))),
            typeof process < "u",
            he.error)
          )
            throw new Hv(he.error, he.meta);
          const Ue = await le(he.data, he.meta, oe);
          return { ...he, data: Ue };
        }
        if (T.type === "query" && "infiniteQueryOptions" in D) {
          const { infiniteQueryOptions: oe } = D,
            { maxPages: he = 1 / 0 } = oe;
          let de;
          const Ue = { pages: [], pageParams: [] },
            Me =
              (J = d.selectQueryEntry(re(), T.queryCacheKey)) == null
                ? void 0
                : J.data,
            Ut = (w(T, re()) && !T.direction) || !Me ? Ue : Me;
          if ("direction" in T && T.direction && Ut.pages.length) {
            const Zt = T.direction === "backward",
              Ln = (Zt ? b0 : fd)(oe, Ut);
            de = await ne(Ut, Ln, he, Zt);
          } else {
            const { initialPageParam: Zt = oe.initialPageParam } = T,
              wn = (Me == null ? void 0 : Me.pageParams) ?? [],
              Ln = wn[0] ?? Zt,
              oa = wn.length;
            (de = await ne(Ut, Ln, he)), O && (de = { data: de.data.pages[0] });
            for (let Sl = 1; Sl < oa; Sl++) {
              const xl = fd(oe, de.data);
              de = await ne(de.data, xl, he);
            }
          }
          P = de;
        } else P = await ie(T.originalArgs);
        return V(
          P.data,
          Ts({ fulfilledTimeStamp: Date.now(), baseQueryMeta: P.meta })
        );
      } catch (le) {
        let ge = le;
        if (ge instanceof Hv) {
          let O = b(D, "transformErrorResponse");
          try {
            return G(
              await O(ge.value, ge.meta, T.originalArgs),
              Ts({ baseQueryMeta: ge.meta })
            );
          } catch (P) {
            ge = P;
          }
        }
        throw (console.error(ge), ge);
      }
    };
  function w(T, M) {
    const B = d.selectQueryEntry(M, T.queryCacheKey),
      G = d.selectConfig(M).refetchOnMountOrArgChange,
      V = B == null ? void 0 : B.fulfilledTimeStamp,
      I = T.forceRefetch ?? (T.subscribe && G);
    return I ? I === !0 || (Number(new Date()) - Number(V)) / 1e3 >= I : !1;
  }
  const N = () =>
      uv(`${n}/executeQuery`, E, {
        getPendingMeta({ arg: M }) {
          const B = i[M.endpointName];
          return Ts({
            startedTimeStamp: Date.now(),
            ...(Ud(B) ? { direction: M.direction } : {}),
          });
        },
        condition(M, { getState: B }) {
          var le;
          const G = B(),
            V = d.selectQueryEntry(G, M.queryCacheKey),
            I = V == null ? void 0 : V.fulfilledTimeStamp,
            re = M.originalArgs,
            se = V == null ? void 0 : V.originalArgs,
            D = i[M.endpointName],
            J = M.direction;
          return od(M)
            ? !0
            : (V == null ? void 0 : V.status) === "pending"
            ? !1
            : w(M, G) ||
              (zd(D) &&
                (le = D == null ? void 0 : D.forceRefetch) != null &&
                le.call(D, {
                  currentArg: re,
                  previousArg: se,
                  endpointState: V,
                  state: G,
                }))
            ? !0
            : !(I && !J);
        },
        dispatchConditionRejection: !0,
      }),
    U = N(),
    A = N(),
    k = uv(`${n}/executeMutation`, E, {
      getPendingMeta() {
        return Ts({ startedTimeStamp: Date.now() });
      },
    }),
    _ = (T) => "force" in T,
    S = (T) => "ifOlderThan" in T,
    R = (T, M, B) => (G, V) => {
      const I = _(B) && B.force,
        re = S(B) && B.ifOlderThan,
        se = (J = !0) => {
          const le = { forceRefetch: J, isPrefetch: !0 };
          return c.endpoints[T].initiate(M, le);
        },
        D = c.endpoints[T].select(M)(V());
      if (I) G(se());
      else if (re) {
        const J = D == null ? void 0 : D.fulfilledTimeStamp;
        if (!J) {
          G(se());
          return;
        }
        (Number(new Date()) - Number(new Date(J))) / 1e3 >= re && G(se());
      } else G(se(!1));
    };
  function X(T) {
    return (M) => {
      var B, G;
      return (
        ((G = (B = M == null ? void 0 : M.meta) == null ? void 0 : B.arg) ==
        null
          ? void 0
          : G.endpointName) === T
      );
    };
  }
  function q(T, M) {
    return {
      matchPending: Ni(Td(T), X(M)),
      matchFulfilled: Ni(Va(T), X(M)),
      matchRejected: Ni(yr(T), X(M)),
    };
  }
  return {
    queryThunk: U,
    mutationThunk: k,
    infiniteQueryThunk: A,
    prefetch: R,
    updateQueryData: v,
    upsertQueryData: x,
    patchQueryData: h,
    buildMatchThunkActions: q,
  };
}
function fd(n, { pages: l, pageParams: i }) {
  const u = l.length - 1;
  return n.getNextPageParam(l[u], l, i[u], i);
}
function b0(n, { pages: l, pageParams: i }) {
  var u;
  return (u = n.getPreviousPageParam) == null
    ? void 0
    : u.call(n, l[0], l, i[0], i);
}
function _0(n, l, i, u) {
  return kd(
    i[n.meta.arg.endpointName][l],
    Va(n) ? n.payload : void 0,
    lc(n) ? n.payload : void 0,
    n.meta.arg.originalArgs,
    "baseQueryMeta" in n.meta ? n.meta.baseQueryMeta : void 0,
    u
  );
}
function As(n, l, i) {
  const u = n[l];
  u && i(u);
}
function Ii(n) {
  return ("arg" in n ? n.arg.fixedCacheKey : n.fixedCacheKey) ?? n.requestId;
}
function Zv(n, l, i) {
  const u = n[Ii(l)];
  u && i(u);
}
var wi = {};
function b4({
  reducerPath: n,
  queryThunk: l,
  mutationThunk: i,
  serializeQueryArgs: u,
  context: {
    endpointDefinitions: c,
    apiUid: o,
    extractRehydrationInfo: d,
    hasRehydrationInfo: h,
  },
  assertTagType: y,
  config: m,
}) {
  const v = pn(`${n}/resetApiState`);
  function x(q, T, M, B) {
    var G;
    q[(G = T.queryCacheKey)] ??
      (q[G] = { status: "uninitialized", endpointName: T.endpointName }),
      As(q, T.queryCacheKey, (V) => {
        (V.status = "pending"),
          (V.requestId = M && V.requestId ? V.requestId : B.requestId),
          T.originalArgs !== void 0 && (V.originalArgs = T.originalArgs),
          (V.startedTimeStamp = B.startedTimeStamp);
        const I = c[B.arg.endpointName];
        Ud(I) && "direction" in T && (V.direction = T.direction);
      });
  }
  function b(q, T, M, B) {
    As(q, T.arg.queryCacheKey, (G) => {
      if (G.requestId !== T.requestId && !B) return;
      const { merge: V } = c[T.arg.endpointName];
      if (((G.status = "fulfilled"), V))
        if (G.data !== void 0) {
          const {
            fulfilledTimeStamp: I,
            arg: re,
            baseQueryMeta: se,
            requestId: D,
          } = T;
          let J = iu(G.data, (le) =>
            V(le, M, {
              arg: re.originalArgs,
              baseQueryMeta: se,
              fulfilledTimeStamp: I,
              requestId: D,
            })
          );
          G.data = J;
        } else G.data = M;
      else
        G.data =
          c[T.arg.endpointName].structuralSharing ?? !0
            ? p0(jn(G.data) ? W2(G.data) : G.data, M)
            : M;
      delete G.error, (G.fulfilledTimeStamp = T.fulfilledTimeStamp);
    });
  }
  const E = aa({
      name: `${n}/queries`,
      initialState: wi,
      reducers: {
        removeQueryResult: {
          reducer(q, { payload: { queryCacheKey: T } }) {
            delete q[T];
          },
          prepare: Si(),
        },
        cacheEntriesUpserted: {
          reducer(q, T) {
            for (const M of T.payload) {
              const { queryDescription: B, value: G } = M;
              x(q, B, !0, {
                arg: B,
                requestId: T.meta.requestId,
                startedTimeStamp: T.meta.timestamp,
              }),
                b(
                  q,
                  {
                    arg: B,
                    requestId: T.meta.requestId,
                    fulfilledTimeStamp: T.meta.timestamp,
                    baseQueryMeta: {},
                  },
                  G,
                  !0
                );
            }
          },
          prepare: (q) => ({
            payload: q.map((B) => {
              const { endpointName: G, arg: V, value: I } = B,
                re = c[G];
              return {
                queryDescription: {
                  type: "query",
                  endpointName: G,
                  originalArgs: B.arg,
                  queryCacheKey: u({
                    queryArgs: V,
                    endpointDefinition: re,
                    endpointName: G,
                  }),
                },
                value: I,
              };
            }),
            meta: { [nc]: !0, requestId: Ad(), timestamp: Date.now() },
          }),
        },
        queryResultPatched: {
          reducer(q, { payload: { queryCacheKey: T, patches: M } }) {
            As(q, T, (B) => {
              B.data = Ip(B.data, M.concat());
            });
          },
          prepare: Si(),
        },
      },
      extraReducers(q) {
        q.addCase(l.pending, (T, { meta: M, meta: { arg: B } }) => {
          const G = od(B);
          x(T, B, G, M);
        })
          .addCase(l.fulfilled, (T, { meta: M, payload: B }) => {
            const G = od(M.arg);
            b(T, M, B, G);
          })
          .addCase(
            l.rejected,
            (
              T,
              {
                meta: { condition: M, arg: B, requestId: G },
                error: V,
                payload: I,
              }
            ) => {
              As(T, B.queryCacheKey, (re) => {
                if (!M) {
                  if (re.requestId !== G) return;
                  (re.status = "rejected"), (re.error = I ?? V);
                }
              });
            }
          )
          .addMatcher(h, (T, M) => {
            const { queries: B } = d(M);
            for (const [G, V] of Object.entries(B))
              ((V == null ? void 0 : V.status) === "fulfilled" ||
                (V == null ? void 0 : V.status) === "rejected") &&
                (T[G] = V);
          });
      },
    }),
    w = aa({
      name: `${n}/mutations`,
      initialState: wi,
      reducers: {
        removeMutationResult: {
          reducer(q, { payload: T }) {
            const M = Ii(T);
            M in q && delete q[M];
          },
          prepare: Si(),
        },
      },
      extraReducers(q) {
        q.addCase(
          i.pending,
          (
            T,
            { meta: M, meta: { requestId: B, arg: G, startedTimeStamp: V } }
          ) => {
            G.track &&
              (T[Ii(M)] = {
                requestId: B,
                status: "pending",
                endpointName: G.endpointName,
                startedTimeStamp: V,
              });
          }
        )
          .addCase(i.fulfilled, (T, { payload: M, meta: B }) => {
            B.arg.track &&
              Zv(T, B, (G) => {
                G.requestId === B.requestId &&
                  ((G.status = "fulfilled"),
                  (G.data = M),
                  (G.fulfilledTimeStamp = B.fulfilledTimeStamp));
              });
          })
          .addCase(i.rejected, (T, { payload: M, error: B, meta: G }) => {
            G.arg.track &&
              Zv(T, G, (V) => {
                V.requestId === G.requestId &&
                  ((V.status = "rejected"), (V.error = M ?? B));
              });
          })
          .addMatcher(h, (T, M) => {
            const { mutations: B } = d(M);
            for (const [G, V] of Object.entries(B))
              ((V == null ? void 0 : V.status) === "fulfilled" ||
                (V == null ? void 0 : V.status) === "rejected") &&
                G !== (V == null ? void 0 : V.requestId) &&
                (T[G] = V);
          });
      },
    }),
    N = aa({
      name: `${n}/invalidation`,
      initialState: wi,
      reducers: {
        updateProvidedBy: {
          reducer(q, T) {
            var G, V;
            const { queryCacheKey: M, providedTags: B } = T.payload;
            for (const I of Object.values(q))
              for (const re of Object.values(I)) {
                const se = re.indexOf(M);
                se !== -1 && re.splice(se, 1);
              }
            for (const { type: I, id: re } of B) {
              const se =
                (G = q[I] ?? (q[I] = {}))[
                  (V = re || "__internal_without_id")
                ] ?? (G[V] = []);
              se.includes(M) || se.push(M);
            }
          },
          prepare: Si(),
        },
      },
      extraReducers(q) {
        q.addCase(
          E.actions.removeQueryResult,
          (T, { payload: { queryCacheKey: M } }) => {
            for (const B of Object.values(T))
              for (const G of Object.values(B)) {
                const V = G.indexOf(M);
                V !== -1 && G.splice(V, 1);
              }
          }
        )
          .addMatcher(h, (T, M) => {
            var G, V;
            const { provided: B } = d(M);
            for (const [I, re] of Object.entries(B))
              for (const [se, D] of Object.entries(re)) {
                const J =
                  (G = T[I] ?? (T[I] = {}))[
                    (V = se || "__internal_without_id")
                  ] ?? (G[V] = []);
                for (const le of D) J.includes(le) || J.push(le);
              }
          })
          .addMatcher(sa(Va(l), lc(l)), (T, M) => {
            U(T, M);
          })
          .addMatcher(E.actions.cacheEntriesUpserted.match, (T, M) => {
            for (const { queryDescription: B, value: G } of M.payload)
              U(T, {
                type: "UNKNOWN",
                payload: G,
                meta: {
                  requestStatus: "fulfilled",
                  requestId: "UNKNOWN",
                  arg: B,
                },
              });
          });
      },
    });
  function U(q, T) {
    const M = _0(T, "providesTags", c, y),
      { queryCacheKey: B } = T.meta.arg;
    N.caseReducers.updateProvidedBy(
      q,
      N.actions.updateProvidedBy({ queryCacheKey: B, providedTags: M })
    );
  }
  const A = aa({
      name: `${n}/subscriptions`,
      initialState: wi,
      reducers: {
        updateSubscriptionOptions(q, T) {},
        unsubscribeQueryResult(q, T) {},
        internal_getRTKQSubscriptions() {},
      },
    }),
    k = aa({
      name: `${n}/internalSubscriptions`,
      initialState: wi,
      reducers: {
        subscriptionsUpdated: {
          reducer(q, T) {
            return Ip(q, T.payload);
          },
          prepare: Si(),
        },
      },
    }),
    _ = aa({
      name: `${n}/config`,
      initialState: {
        online: r4(),
        focused: l4(),
        middlewareRegistered: !1,
        ...m,
      },
      reducers: {
        middlewareRegistered(q, { payload: T }) {
          q.middlewareRegistered =
            q.middlewareRegistered === "conflict" || o !== T ? "conflict" : !0;
        },
      },
      extraReducers: (q) => {
        q.addCase(jd, (T) => {
          T.online = !0;
        })
          .addCase(g0, (T) => {
            T.online = !1;
          })
          .addCase(Dd, (T) => {
            T.focused = !0;
          })
          .addCase(v0, (T) => {
            T.focused = !1;
          })
          .addMatcher(h, (T) => ({ ...T }));
      },
    }),
    S = Sg({
      queries: E.reducer,
      mutations: w.reducer,
      provided: N.reducer,
      subscriptions: k.reducer,
      config: _.reducer,
    }),
    R = (q, T) => S(v.match(T) ? void 0 : q, T),
    X = {
      ..._.actions,
      ...E.actions,
      ...A.actions,
      ...k.actions,
      ...w.actions,
      ...N.actions,
      resetApiState: v,
    };
  return { reducer: R, actions: X };
}
var ra = Symbol.for("RTKQ/skipToken"),
  S0 = { status: "uninitialized" },
  Qv = iu(S0, () => {}),
  Yv = iu(S0, () => {});
function _4({ serializeQueryArgs: n, reducerPath: l, createSelector: i }) {
  const u = (_) => Qv,
    c = (_) => Yv;
  return {
    buildQuerySelector: b,
    buildInfiniteQuerySelector: E,
    buildMutationSelector: w,
    selectInvalidatedBy: N,
    selectCachedArgsForQuery: U,
    selectApiState: d,
    selectQueries: h,
    selectMutations: m,
    selectQueryEntry: y,
    selectConfig: v,
  };
  function o(_) {
    return { ..._, ...kv(_.status) };
  }
  function d(_) {
    return _[l];
  }
  function h(_) {
    var S;
    return (S = d(_)) == null ? void 0 : S.queries;
  }
  function y(_, S) {
    var R;
    return (R = h(_)) == null ? void 0 : R[S];
  }
  function m(_) {
    var S;
    return (S = d(_)) == null ? void 0 : S.mutations;
  }
  function v(_) {
    var S;
    return (S = d(_)) == null ? void 0 : S.config;
  }
  function x(_, S, R) {
    return (X) => {
      if (X === ra) return i(u, R);
      const q = n({ queryArgs: X, endpointDefinition: S, endpointName: _ });
      return i((M) => y(M, q) ?? Qv, R);
    };
  }
  function b(_, S) {
    return x(_, S, o);
  }
  function E(_, S) {
    const { infiniteQueryOptions: R } = S;
    function X(q) {
      const T = { ...q, ...kv(q.status) },
        { isLoading: M, isError: B, direction: G } = T,
        V = G === "forward",
        I = G === "backward";
      return {
        ...T,
        hasNextPage: A(R, T.data),
        hasPreviousPage: k(R, T.data),
        isFetchingNextPage: M && V,
        isFetchingPreviousPage: M && I,
        isFetchNextPageError: B && V,
        isFetchPreviousPageError: B && I,
      };
    }
    return x(_, S, X);
  }
  function w() {
    return (_) => {
      let S;
      return (
        typeof _ == "object" ? (S = Ii(_) ?? ra) : (S = _),
        i(
          S === ra
            ? c
            : (q) => {
                var T, M;
                return (
                  ((M = (T = d(q)) == null ? void 0 : T.mutations) == null
                    ? void 0
                    : M[S]) ?? Yv
                );
              },
          o
        )
      );
    };
  }
  function N(_, S) {
    const R = _[l],
      X = new Set();
    for (const q of S.filter(Js).map(cd)) {
      const T = R.provided[q.type];
      if (!T) continue;
      let M = (q.id !== void 0 ? T[q.id] : qv(Object.values(T))) ?? [];
      for (const B of M) X.add(B);
    }
    return qv(
      Array.from(X.values()).map((q) => {
        const T = R.queries[q];
        return T
          ? [
              {
                queryCacheKey: q,
                endpointName: T.endpointName,
                originalArgs: T.originalArgs,
              },
            ]
          : [];
      })
    );
  }
  function U(_, S) {
    return Object.values(h(_))
      .filter(
        (R) =>
          (R == null ? void 0 : R.endpointName) === S &&
          R.status !== "uninitialized"
      )
      .map((R) => R.originalArgs);
  }
  function A(_, S) {
    return S ? fd(_, S) != null : !1;
  }
  function k(_, S) {
    return !S || !_.getPreviousPageParam ? !1 : b0(_, S) != null;
  }
}
var cr = WeakMap ? new WeakMap() : void 0,
  dd = ({ endpointName: n, queryArgs: l }) => {
    let i = "";
    const u = cr == null ? void 0 : cr.get(l);
    if (typeof u == "string") i = u;
    else {
      const c = JSON.stringify(
        l,
        (o, d) => (
          (d = typeof d == "bigint" ? { $bigint: d.toString() } : d),
          (d = Ba(d)
            ? Object.keys(d)
                .sort()
                .reduce((h, y) => ((h[y] = d[y]), h), {})
            : d),
          d
        )
      );
      Ba(l) && (cr == null || cr.set(l, c)), (i = c);
    }
    return `${n}(${i})`;
  };
function x0(...n) {
  return function (i) {
    const u = Bs((m) => {
        var v;
        return (v = i.extractRehydrationInfo) == null
          ? void 0
          : v.call(i, m, { reducerPath: i.reducerPath ?? "api" });
      }),
      c = {
        reducerPath: "api",
        keepUnusedDataFor: 60,
        refetchOnMountOrArgChange: !1,
        refetchOnFocus: !1,
        refetchOnReconnect: !1,
        invalidationBehavior: "delayed",
        ...i,
        extractRehydrationInfo: u,
        serializeQueryArgs(m) {
          let v = dd;
          if ("serializeQueryArgs" in m.endpointDefinition) {
            const x = m.endpointDefinition.serializeQueryArgs;
            v = (b) => {
              const E = x(b);
              return typeof E == "string" ? E : dd({ ...b, queryArgs: E });
            };
          } else i.serializeQueryArgs && (v = i.serializeQueryArgs);
          return v(m);
        },
        tagTypes: [...(i.tagTypes || [])],
      },
      o = {
        endpointDefinitions: {},
        batch(m) {
          m();
        },
        apiUid: Ad(),
        extractRehydrationInfo: u,
        hasRehydrationInfo: Bs((m) => u(m) != null),
      },
      d = {
        injectEndpoints: y,
        enhanceEndpoints({ addTagTypes: m, endpoints: v }) {
          if (m)
            for (const x of m) c.tagTypes.includes(x) || c.tagTypes.push(x);
          if (v)
            for (const [x, b] of Object.entries(v))
              typeof b == "function"
                ? b(o.endpointDefinitions[x])
                : Object.assign(o.endpointDefinitions[x] || {}, b);
          return d;
        },
      },
      h = n.map((m) => m.init(d, c, o));
    function y(m) {
      const v = m.endpoints({
        query: (x) => ({ ...x, type: "query" }),
        mutation: (x) => ({ ...x, type: "mutation" }),
        infiniteQuery: (x) => ({ ...x, type: "infinitequery" }),
      });
      for (const [x, b] of Object.entries(v)) {
        if (m.overrideExisting !== !0 && x in o.endpointDefinitions) {
          if (m.overrideExisting === "throw") throw new Error(vn(39));
          continue;
        }
        o.endpointDefinitions[x] = b;
        for (const E of h) E.injectEndpoint(x, b);
      }
      return d;
    }
    return d.injectEndpoints({ endpoints: i.endpoints });
  };
}
function ta(n, ...l) {
  return Object.assign(n, ...l);
}
var S4 = ({ api: n, queryThunk: l, internalState: i }) => {
  const u = `${n.reducerPath}/subscriptions`;
  let c = null,
    o = null;
  const { updateSubscriptionOptions: d, unsubscribeQueryResult: h } =
      n.internalActions,
    y = (E, w) => {
      var U, A, k;
      if (d.match(w)) {
        const { queryCacheKey: _, requestId: S, options: R } = w.payload;
        return (
          (U = E == null ? void 0 : E[_]) != null && U[S] && (E[_][S] = R), !0
        );
      }
      if (h.match(w)) {
        const { queryCacheKey: _, requestId: S } = w.payload;
        return E[_] && delete E[_][S], !0;
      }
      if (n.internalActions.removeQueryResult.match(w))
        return delete E[w.payload.queryCacheKey], !0;
      if (l.pending.match(w)) {
        const {
            meta: { arg: _, requestId: S },
          } = w,
          R = E[(A = _.queryCacheKey)] ?? (E[A] = {});
        return (
          (R[`${S}_running`] = {}),
          _.subscribe && (R[S] = _.subscriptionOptions ?? R[S] ?? {}),
          !0
        );
      }
      let N = !1;
      if (l.fulfilled.match(w) || l.rejected.match(w)) {
        const _ = E[w.meta.arg.queryCacheKey] || {},
          S = `${w.meta.requestId}_running`;
        N || (N = !!_[S]), delete _[S];
      }
      if (l.rejected.match(w)) {
        const {
          meta: { condition: _, arg: S, requestId: R },
        } = w;
        if (_ && S.subscribe) {
          const X = E[(k = S.queryCacheKey)] ?? (E[k] = {});
          (X[R] = S.subscriptionOptions ?? X[R] ?? {}), (N = !0);
        }
      }
      return N;
    },
    m = () => i.currentSubscriptions,
    b = {
      getSubscriptions: m,
      getSubscriptionCount: (E) => {
        const N = m()[E] ?? {};
        return mr(N);
      },
      isRequestSubscribed: (E, w) => {
        var U;
        const N = m();
        return !!((U = N == null ? void 0 : N[E]) != null && U[w]);
      },
    };
  return (E, w) => {
    if (
      (c || (c = JSON.parse(JSON.stringify(i.currentSubscriptions))),
      n.util.resetApiState.match(E))
    )
      return (c = i.currentSubscriptions = {}), (o = null), [!0, !1];
    if (n.internalActions.internal_getRTKQSubscriptions.match(E))
      return [!1, b];
    const N = y(i.currentSubscriptions, E);
    let U = !0;
    if (N) {
      o ||
        (o = setTimeout(() => {
          const _ = JSON.parse(JSON.stringify(i.currentSubscriptions)),
            [, S] = Og(c, () => _);
          w.next(n.internalActions.subscriptionsUpdated(S)),
            (c = _),
            (o = null);
        }, 500));
      const A = typeof E.type == "string" && !!E.type.startsWith(u),
        k = l.rejected.match(E) && E.meta.condition && !!E.meta.arg.subscribe;
      U = !A && !k;
    }
    return [U, !1];
  };
};
function x4(n) {
  for (const l in n) return !1;
  return !0;
}
var E4 = 2147483647 / 1e3 - 1,
  w4 = ({
    reducerPath: n,
    api: l,
    queryThunk: i,
    context: u,
    internalState: c,
    selectors: { selectQueryEntry: o, selectConfig: d },
  }) => {
    const {
        removeQueryResult: h,
        unsubscribeQueryResult: y,
        cacheEntriesUpserted: m,
      } = l.internalActions,
      v = sa(y.match, i.fulfilled, i.rejected, m.match);
    function x(U) {
      const A = c.currentSubscriptions[U];
      return !!A && !x4(A);
    }
    const b = {},
      E = (U, A, k) => {
        const _ = A.getState(),
          S = d(_);
        if (v(U)) {
          let R;
          if (m.match(U))
            R = U.payload.map((X) => X.queryDescription.queryCacheKey);
          else {
            const { queryCacheKey: X } = y.match(U) ? U.payload : U.meta.arg;
            R = [X];
          }
          w(R, A, S);
        }
        if (l.util.resetApiState.match(U))
          for (const [R, X] of Object.entries(b))
            X && clearTimeout(X), delete b[R];
        if (u.hasRehydrationInfo(U)) {
          const { queries: R } = u.extractRehydrationInfo(U);
          w(Object.keys(R), A, S);
        }
      };
    function w(U, A, k) {
      const _ = A.getState();
      for (const S of U) {
        const R = o(_, S);
        N(S, R == null ? void 0 : R.endpointName, A, k);
      }
    }
    function N(U, A, k, _) {
      const S = u.endpointDefinitions[A],
        R = (S == null ? void 0 : S.keepUnusedDataFor) ?? _.keepUnusedDataFor;
      if (R === 1 / 0) return;
      const X = Math.max(0, Math.min(R, E4));
      if (!x(U)) {
        const q = b[U];
        q && clearTimeout(q),
          (b[U] = setTimeout(() => {
            x(U) || k.dispatch(h({ queryCacheKey: U })), delete b[U];
          }, X * 1e3));
      }
    }
    return E;
  },
  Gv = new Error("Promise never resolved before cacheEntryRemoved."),
  T4 = ({
    api: n,
    reducerPath: l,
    context: i,
    queryThunk: u,
    mutationThunk: c,
    internalState: o,
    selectors: { selectQueryEntry: d, selectApiState: h },
  }) => {
    const y = ad(u),
      m = ad(c),
      v = Va(u, c),
      x = {};
    function b(A, k, _) {
      const S = x[A];
      S != null &&
        S.valueResolved &&
        (S.valueResolved({ data: k, meta: _ }), delete S.valueResolved);
    }
    function E(A) {
      const k = x[A];
      k && (delete x[A], k.cacheEntryRemoved());
    }
    const w = (A, k, _) => {
      const S = N(A);
      function R(X, q, T, M) {
        const B = d(_, q),
          G = d(k.getState(), q);
        !B && G && U(X, M, q, k, T);
      }
      if (u.pending.match(A))
        R(
          A.meta.arg.endpointName,
          S,
          A.meta.requestId,
          A.meta.arg.originalArgs
        );
      else if (n.internalActions.cacheEntriesUpserted.match(A))
        for (const { queryDescription: X, value: q } of A.payload) {
          const { endpointName: T, originalArgs: M, queryCacheKey: B } = X;
          R(T, B, A.meta.requestId, M), b(B, q, {});
        }
      else if (c.pending.match(A))
        k.getState()[l].mutations[S] &&
          U(
            A.meta.arg.endpointName,
            A.meta.arg.originalArgs,
            S,
            k,
            A.meta.requestId
          );
      else if (v(A)) b(S, A.payload, A.meta.baseQueryMeta);
      else if (
        n.internalActions.removeQueryResult.match(A) ||
        n.internalActions.removeMutationResult.match(A)
      )
        E(S);
      else if (n.util.resetApiState.match(A))
        for (const X of Object.keys(x)) E(X);
    };
    function N(A) {
      return y(A)
        ? A.meta.arg.queryCacheKey
        : m(A)
        ? A.meta.arg.fixedCacheKey ?? A.meta.requestId
        : n.internalActions.removeQueryResult.match(A)
        ? A.payload.queryCacheKey
        : n.internalActions.removeMutationResult.match(A)
        ? Ii(A.payload)
        : "";
    }
    function U(A, k, _, S, R) {
      const X = i.endpointDefinitions[A],
        q = X == null ? void 0 : X.onCacheEntryAdded;
      if (!q) return;
      const T = {},
        M = new Promise((se) => {
          T.cacheEntryRemoved = se;
        }),
        B = Promise.race([
          new Promise((se) => {
            T.valueResolved = se;
          }),
          M.then(() => {
            throw Gv;
          }),
        ]);
      B.catch(() => {}), (x[_] = T);
      const G = n.endpoints[A].select(X.type === "query" ? k : _),
        V = S.dispatch((se, D, J) => J),
        I = {
          ...S,
          getCacheEntry: () => G(S.getState()),
          requestId: R,
          extra: V,
          updateCachedData:
            X.type === "query"
              ? (se) => S.dispatch(n.util.updateQueryData(A, k, se))
              : void 0,
          cacheDataLoaded: B,
          cacheEntryRemoved: M,
        },
        re = q(k, I);
      Promise.resolve(re).catch((se) => {
        if (se !== Gv) throw se;
      });
    }
    return w;
  },
  A4 =
    ({ api: n, context: { apiUid: l }, reducerPath: i }) =>
    (u, c) => {
      n.util.resetApiState.match(u) &&
        c.dispatch(n.internalActions.middlewareRegistered(l));
    },
  R4 = ({
    reducerPath: n,
    context: l,
    context: { endpointDefinitions: i },
    mutationThunk: u,
    queryThunk: c,
    api: o,
    assertTagType: d,
    refetchQuery: h,
    internalState: y,
  }) => {
    const { removeQueryResult: m } = o.internalActions,
      v = sa(Va(u), lc(u)),
      x = sa(Va(u, c), yr(u, c));
    let b = [];
    const E = (U, A) => {
      v(U)
        ? N(_0(U, "invalidatesTags", i, d), A)
        : x(U)
        ? N([], A)
        : o.util.invalidateTags.match(U) &&
          N(kd(U.payload, void 0, void 0, void 0, void 0, d), A);
    };
    function w(U) {
      var _;
      const { queries: A, mutations: k } = U;
      for (const S of [A, k])
        for (const R in S)
          if (((_ = S[R]) == null ? void 0 : _.status) === "pending") return !0;
      return !1;
    }
    function N(U, A) {
      const k = A.getState(),
        _ = k[n];
      if ((b.push(...U), _.config.invalidationBehavior === "delayed" && w(_)))
        return;
      const S = b;
      if (((b = []), S.length === 0)) return;
      const R = o.util.selectInvalidatedBy(k, S);
      l.batch(() => {
        const X = Array.from(R.values());
        for (const { queryCacheKey: q } of X) {
          const T = _.queries[q],
            M = y.currentSubscriptions[q] ?? {};
          T &&
            (mr(M) === 0
              ? A.dispatch(m({ queryCacheKey: q }))
              : T.status !== "uninitialized" && A.dispatch(h(T)));
        }
      });
    }
    return E;
  },
  O4 = ({
    reducerPath: n,
    queryThunk: l,
    api: i,
    refetchQuery: u,
    internalState: c,
  }) => {
    const o = {},
      d = (b, E) => {
        (i.internalActions.updateSubscriptionOptions.match(b) ||
          i.internalActions.unsubscribeQueryResult.match(b)) &&
          y(b.payload, E),
          (l.pending.match(b) || (l.rejected.match(b) && b.meta.condition)) &&
            y(b.meta.arg, E),
          (l.fulfilled.match(b) ||
            (l.rejected.match(b) && !b.meta.condition)) &&
            h(b.meta.arg, E),
          i.util.resetApiState.match(b) && v();
      };
    function h({ queryCacheKey: b }, E) {
      const w = E.getState()[n],
        N = w.queries[b],
        U = c.currentSubscriptions[b];
      if (!N || N.status === "uninitialized") return;
      const { lowestPollingInterval: A, skipPollingIfUnfocused: k } = x(U);
      if (!Number.isFinite(A)) return;
      const _ = o[b];
      _ != null && _.timeout && (clearTimeout(_.timeout), (_.timeout = void 0));
      const S = Date.now() + A;
      o[b] = {
        nextPollTimestamp: S,
        pollingInterval: A,
        timeout: setTimeout(() => {
          (w.config.focused || !k) && E.dispatch(u(N)),
            h({ queryCacheKey: b }, E);
        }, A),
      };
    }
    function y({ queryCacheKey: b }, E) {
      const N = E.getState()[n].queries[b],
        U = c.currentSubscriptions[b];
      if (!N || N.status === "uninitialized") return;
      const { lowestPollingInterval: A } = x(U);
      if (!Number.isFinite(A)) {
        m(b);
        return;
      }
      const k = o[b],
        _ = Date.now() + A;
      (!k || _ < k.nextPollTimestamp) && h({ queryCacheKey: b }, E);
    }
    function m(b) {
      const E = o[b];
      E != null && E.timeout && clearTimeout(E.timeout), delete o[b];
    }
    function v() {
      for (const b of Object.keys(o)) m(b);
    }
    function x(b = {}) {
      let E = !1,
        w = Number.POSITIVE_INFINITY;
      for (let N in b)
        b[N].pollingInterval &&
          ((w = Math.min(b[N].pollingInterval, w)),
          (E = b[N].skipPollingIfUnfocused || E));
      return { lowestPollingInterval: w, skipPollingIfUnfocused: E };
    }
    return d;
  },
  C4 = ({ api: n, context: l, queryThunk: i, mutationThunk: u }) => {
    const c = Td(i, u),
      o = yr(i, u),
      d = Va(i, u),
      h = {};
    return (m, v) => {
      var x, b;
      if (c(m)) {
        const {
            requestId: E,
            arg: { endpointName: w, originalArgs: N },
          } = m.meta,
          U = l.endpointDefinitions[w],
          A = U == null ? void 0 : U.onQueryStarted;
        if (A) {
          const k = {},
            _ = new Promise((q, T) => {
              (k.resolve = q), (k.reject = T);
            });
          _.catch(() => {}), (h[E] = k);
          const S = n.endpoints[w].select(U.type === "query" ? N : E),
            R = v.dispatch((q, T, M) => M),
            X = {
              ...v,
              getCacheEntry: () => S(v.getState()),
              requestId: E,
              extra: R,
              updateCachedData:
                U.type === "query"
                  ? (q) => v.dispatch(n.util.updateQueryData(w, N, q))
                  : void 0,
              queryFulfilled: _,
            };
          A(N, X);
        }
      } else if (d(m)) {
        const { requestId: E, baseQueryMeta: w } = m.meta;
        (x = h[E]) == null || x.resolve({ data: m.payload, meta: w }),
          delete h[E];
      } else if (o(m)) {
        const { requestId: E, rejectedWithValue: w, baseQueryMeta: N } = m.meta;
        (b = h[E]) == null ||
          b.reject({
            error: m.payload ?? m.error,
            isUnhandledError: !w,
            meta: N,
          }),
          delete h[E];
      }
    };
  },
  M4 = ({
    reducerPath: n,
    context: l,
    api: i,
    refetchQuery: u,
    internalState: c,
  }) => {
    const { removeQueryResult: o } = i.internalActions,
      d = (y, m) => {
        Dd.match(y) && h(m, "refetchOnFocus"),
          jd.match(y) && h(m, "refetchOnReconnect");
      };
    function h(y, m) {
      const v = y.getState()[n],
        x = v.queries,
        b = c.currentSubscriptions;
      l.batch(() => {
        for (const E of Object.keys(b)) {
          const w = x[E],
            N = b[E];
          if (!N || !w) continue;
          (Object.values(N).some((A) => A[m] === !0) ||
            (Object.values(N).every((A) => A[m] === void 0) && v.config[m])) &&
            (mr(N) === 0
              ? y.dispatch(o({ queryCacheKey: E }))
              : w.status !== "uninitialized" && y.dispatch(u(w)));
        }
      });
    }
    return d;
  };
function N4(n) {
  const { reducerPath: l, queryThunk: i, api: u, context: c } = n,
    { apiUid: o } = c,
    d = { invalidateTags: pn(`${l}/invalidateTags`) },
    h = (x) => x.type.startsWith(`${l}/`),
    y = [A4, w4, R4, O4, T4, C4];
  return {
    middleware: (x) => {
      let b = !1;
      const w = {
          ...n,
          internalState: { currentSubscriptions: {} },
          refetchQuery: v,
          isThisApiSliceAction: h,
        },
        N = y.map((k) => k(w)),
        U = S4(w),
        A = M4(w);
      return (k) => (_) => {
        if (!xg(_)) return k(_);
        b || ((b = !0), x.dispatch(u.internalActions.middlewareRegistered(o)));
        const S = { ...x, next: k },
          R = x.getState(),
          [X, q] = U(_, S, R);
        let T;
        if (
          (X ? (T = k(_)) : (T = q),
          x.getState()[l] && (A(_, S, R), h(_) || c.hasRehydrationInfo(_)))
        )
          for (const M of N) M(_, S, R);
        return T;
      };
    },
    actions: d,
  };
  function v(x) {
    return n.api.endpoints[x.endpointName].initiate(x.originalArgs, {
      subscribe: !1,
      forceRefetch: !0,
    });
  }
}
var Xv = Symbol(),
  E0 = ({ createSelector: n = wd } = {}) => ({
    name: Xv,
    init(
      l,
      {
        baseQuery: i,
        tagTypes: u,
        reducerPath: c,
        serializeQueryArgs: o,
        keepUnusedDataFor: d,
        refetchOnMountOrArgChange: h,
        refetchOnFocus: y,
        refetchOnReconnect: m,
        invalidationBehavior: v,
      },
      x
    ) {
      sS();
      const b = (ne) => ne;
      Object.assign(l, {
        reducerPath: c,
        endpoints: {},
        internalActions: {
          onOnline: jd,
          onOffline: g0,
          onFocus: Dd,
          onFocusLost: v0,
        },
        util: {},
      });
      const E = _4({
          serializeQueryArgs: o,
          reducerPath: c,
          createSelector: n,
        }),
        {
          selectInvalidatedBy: w,
          selectCachedArgsForQuery: N,
          buildQuerySelector: U,
          buildInfiniteQuerySelector: A,
          buildMutationSelector: k,
        } = E;
      ta(l.util, { selectInvalidatedBy: w, selectCachedArgsForQuery: N });
      const {
          queryThunk: _,
          infiniteQueryThunk: S,
          mutationThunk: R,
          patchQueryData: X,
          updateQueryData: q,
          upsertQueryData: T,
          prefetch: M,
          buildMatchThunkActions: B,
        } = g4({
          baseQuery: i,
          reducerPath: c,
          context: x,
          api: l,
          serializeQueryArgs: o,
          assertTagType: b,
          selectors: E,
        }),
        { reducer: G, actions: V } = b4({
          context: x,
          queryThunk: _,
          mutationThunk: R,
          serializeQueryArgs: o,
          reducerPath: c,
          assertTagType: b,
          config: {
            refetchOnFocus: y,
            refetchOnReconnect: m,
            refetchOnMountOrArgChange: h,
            keepUnusedDataFor: d,
            reducerPath: c,
            invalidationBehavior: v,
          },
        });
      ta(l.util, {
        patchQueryData: X,
        updateQueryData: q,
        upsertQueryData: T,
        prefetch: M,
        resetApiState: V.resetApiState,
        upsertQueryEntries: V.cacheEntriesUpserted,
      }),
        ta(l.internalActions, V);
      const { middleware: I, actions: re } = N4({
        reducerPath: c,
        context: x,
        queryThunk: _,
        mutationThunk: R,
        infiniteQueryThunk: S,
        api: l,
        assertTagType: b,
        selectors: E,
      });
      ta(l.util, re), ta(l, { reducer: G, middleware: I });
      const {
        buildInitiateQuery: se,
        buildInitiateInfiniteQuery: D,
        buildInitiateMutation: J,
        getRunningMutationThunk: le,
        getRunningMutationsThunk: ge,
        getRunningQueriesThunk: O,
        getRunningQueryThunk: P,
      } = p4({
        queryThunk: _,
        mutationThunk: R,
        infiniteQueryThunk: S,
        api: l,
        serializeQueryArgs: o,
        context: x,
      });
      return (
        ta(l.util, {
          getRunningMutationThunk: le,
          getRunningMutationsThunk: ge,
          getRunningQueryThunk: P,
          getRunningQueriesThunk: O,
        }),
        {
          name: Xv,
          injectEndpoint(ne, ie) {
            var de;
            const he = (de = l.endpoints)[ne] ?? (de[ne] = {});
            zd(ie) &&
              ta(
                he,
                { name: ne, select: U(ne, ie), initiate: se(ne, ie) },
                B(_, ne)
              ),
              h4(ie) &&
                ta(he, { name: ne, select: k(), initiate: J(ne) }, B(R, ne)),
              Ud(ie) &&
                ta(
                  he,
                  { name: ne, select: A(ne, ie), initiate: D(ne, ie) },
                  B(_, ne)
                );
          },
        }
      );
    },
  });
E0();
function Rs(n) {
  return n.replace(n[0], n[0].toUpperCase());
}
function D4(n) {
  return n.type === "query";
}
function j4(n) {
  return n.type === "mutation";
}
function w0(n) {
  return n.type === "infinitequery";
}
function Ti(n, ...l) {
  return Object.assign(n, ...l);
}
var Xf = Symbol();
function Kv(n, l, i, u) {
  const c = j.useMemo(
      () => ({
        queryArgs: n,
        serialized:
          typeof n == "object"
            ? l({ queryArgs: n, endpointDefinition: i, endpointName: u })
            : n,
      }),
      [n, l, i, u]
    ),
    o = j.useRef(c);
  return (
    j.useEffect(() => {
      o.current.serialized !== c.serialized && (o.current = c);
    }, [c]),
    o.current.serialized === c.serialized ? o.current.queryArgs : n
  );
}
function Os(n) {
  const l = j.useRef(n);
  return (
    j.useEffect(() => {
      Ci(l.current, n) || (l.current = n);
    }, [n]),
    Ci(l.current, n) ? l.current : n
  );
}
var z4 = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  U4 = z4(),
  k4 = () => typeof navigator < "u" && navigator.product === "ReactNative",
  L4 = k4(),
  q4 = () => (U4 || L4 ? j.useLayoutEffect : j.useEffect),
  B4 = q4(),
  $v = (n) =>
    n.isUninitialized
      ? {
          ...n,
          isUninitialized: !1,
          isFetching: !0,
          isLoading: n.data === void 0,
          status: y0.pending,
        }
      : n;
function Kf(n, ...l) {
  const i = {};
  return (
    l.forEach((u) => {
      i[u] = n[u];
    }),
    i
  );
}
var $f = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function V4({
  api: n,
  moduleOptions: {
    batch: l,
    hooks: { useDispatch: i, useSelector: u, useStore: c },
    unstable__sideEffectsInRender: o,
    createSelector: d,
  },
  serializeQueryArgs: h,
  context: y,
}) {
  const m = o ? (S) => S() : j.useEffect;
  return {
    buildQueryHooks: A,
    buildInfiniteQueryHooks: k,
    buildMutationHook: _,
    usePrefetch: b,
  };
  function v(S, R, X) {
    if (R != null && R.endpointName && S.isUninitialized) {
      const { endpointName: V } = R,
        I = y.endpointDefinitions[V];
      X !== ra &&
        h({
          queryArgs: R.originalArgs,
          endpointDefinition: I,
          endpointName: V,
        }) === h({ queryArgs: X, endpointDefinition: I, endpointName: V }) &&
        (R = void 0);
    }
    let q = S.isSuccess ? S.data : R == null ? void 0 : R.data;
    q === void 0 && (q = S.data);
    const T = q !== void 0,
      M = S.isLoading,
      B = (!R || R.isLoading || R.isUninitialized) && !T && M,
      G =
        S.isSuccess ||
        (T && ((M && !(R != null && R.isError)) || S.isUninitialized));
    return {
      ...S,
      data: q,
      currentData: S.data,
      isFetching: M,
      isLoading: B,
      isSuccess: G,
    };
  }
  function x(S, R, X) {
    if (R != null && R.endpointName && S.isUninitialized) {
      const { endpointName: V } = R,
        I = y.endpointDefinitions[V];
      h({
        queryArgs: R.originalArgs,
        endpointDefinition: I,
        endpointName: V,
      }) === h({ queryArgs: X, endpointDefinition: I, endpointName: V }) &&
        (R = void 0);
    }
    let q = S.isSuccess ? S.data : R == null ? void 0 : R.data;
    q === void 0 && (q = S.data);
    const T = q !== void 0,
      M = S.isLoading,
      B = (!R || R.isLoading || R.isUninitialized) && !T && M,
      G = S.isSuccess || (M && T);
    return {
      ...S,
      data: q,
      currentData: S.data,
      isFetching: M,
      isLoading: B,
      isSuccess: G,
    };
  }
  function b(S, R) {
    const X = i(),
      q = Os(R);
    return j.useCallback(
      (T, M) => X(n.util.prefetch(S, T, { ...q, ...M })),
      [S, X, q]
    );
  }
  function E(
    S,
    R,
    {
      refetchOnReconnect: X,
      refetchOnFocus: q,
      refetchOnMountOrArgChange: T,
      skip: M = !1,
      pollingInterval: B = 0,
      skipPollingIfUnfocused: G = !1,
      ...V
    } = {}
  ) {
    const { initiate: I } = n.endpoints[S],
      re = i(),
      se = j.useRef(void 0);
    if (!se.current) {
      const de = re(n.internalActions.internal_getRTKQSubscriptions());
      se.current = de;
    }
    const D = Kv(M ? ra : R, dd, y.endpointDefinitions[S], S),
      J = Os({
        refetchOnReconnect: X,
        refetchOnFocus: q,
        pollingInterval: B,
        skipPollingIfUnfocused: G,
      }),
      le = j.useRef(!1),
      ge = V.initialPageParam,
      O = Os(ge),
      P = j.useRef(void 0);
    let { queryCacheKey: ne, requestId: ie } = P.current || {},
      oe = !1;
    ne && ie && (oe = se.current.isRequestSubscribed(ne, ie));
    const he = !oe && le.current;
    return (
      m(() => {
        le.current = oe;
      }),
      m(() => {
        he && (P.current = void 0);
      }, [he]),
      m(() => {
        var Me;
        const de = P.current;
        if (D === ra) {
          de == null || de.unsubscribe(), (P.current = void 0);
          return;
        }
        const Ue = (Me = P.current) == null ? void 0 : Me.subscriptionOptions;
        if (!de || de.arg !== D) {
          de == null || de.unsubscribe();
          const bt = re(
            I(D, {
              subscriptionOptions: J,
              forceRefetch: T,
              ...(w0(y.endpointDefinitions[S]) ? { initialPageParam: O } : {}),
            })
          );
          P.current = bt;
        } else J !== Ue && de.updateSubscriptionOptions(J);
      }, [re, I, T, D, J, he, O, S]),
      [P, re, I, J]
    );
  }
  function w(S, R) {
    return (q, { skip: T = !1, selectFromResult: M } = {}) => {
      const { select: B } = n.endpoints[S],
        G = Kv(T ? ra : q, h, y.endpointDefinitions[S], S),
        V = j.useRef(void 0),
        I = j.useMemo(
          () =>
            d([B(G), (le, ge) => ge, (le) => G], R, {
              memoizeOptions: { resultEqualityCheck: Ci },
            }),
          [B, G]
        ),
        re = j.useMemo(
          () =>
            M
              ? d([I], M, { devModeChecks: { identityFunctionCheck: "never" } })
              : I,
          [I, M]
        ),
        se = u((le) => re(le, V.current), Ci),
        D = c(),
        J = I(D.getState(), V.current);
      return (
        B4(() => {
          V.current = J;
        }, [J]),
        se
      );
    };
  }
  function N(S) {
    j.useEffect(
      () => () => {
        var R, X;
        (X = (R = S.current) == null ? void 0 : R.unsubscribe) == null ||
          X.call(R),
          (S.current = void 0);
      },
      [S]
    );
  }
  function U(S) {
    if (!S.current) throw new Error(vn(38));
    return S.current.refetch();
  }
  function A(S) {
    const R = (T, M = {}) => {
        const [B] = E(S, T, M);
        return N(B), j.useMemo(() => ({ refetch: () => U(B) }), [B]);
      },
      X = ({
        refetchOnReconnect: T,
        refetchOnFocus: M,
        pollingInterval: B = 0,
        skipPollingIfUnfocused: G = !1,
      } = {}) => {
        const { initiate: V } = n.endpoints[S],
          I = i(),
          [re, se] = j.useState(Xf),
          D = j.useRef(void 0),
          J = Os({
            refetchOnReconnect: T,
            refetchOnFocus: M,
            pollingInterval: B,
            skipPollingIfUnfocused: G,
          });
        m(() => {
          var ne, ie;
          const P = (ne = D.current) == null ? void 0 : ne.subscriptionOptions;
          J !== P &&
            ((ie = D.current) == null || ie.updateSubscriptionOptions(J));
        }, [J]);
        const le = j.useRef(J);
        m(() => {
          le.current = J;
        }, [J]);
        const ge = j.useCallback(
            function (P, ne = !1) {
              let ie;
              return (
                l(() => {
                  var oe;
                  (oe = D.current) == null || oe.unsubscribe(),
                    (D.current = ie =
                      I(
                        V(P, {
                          subscriptionOptions: le.current,
                          forceRefetch: !ne,
                        })
                      )),
                    se(P);
                }),
                ie
              );
            },
            [I, V]
          ),
          O = j.useCallback(() => {
            var P, ne;
            (P = D.current) != null &&
              P.queryCacheKey &&
              I(
                n.internalActions.removeQueryResult({
                  queryCacheKey:
                    (ne = D.current) == null ? void 0 : ne.queryCacheKey,
                })
              );
          }, [I]);
        return (
          j.useEffect(
            () => () => {
              var P;
              (P = D == null ? void 0 : D.current) == null || P.unsubscribe();
            },
            []
          ),
          j.useEffect(() => {
            re !== Xf && !D.current && ge(re, !0);
          }, [re, ge]),
          j.useMemo(() => [ge, re, { reset: O }], [ge, re, O])
        );
      },
      q = w(S, v);
    return {
      useQueryState: q,
      useQuerySubscription: R,
      useLazyQuerySubscription: X,
      useLazyQuery(T) {
        const [M, B, { reset: G }] = X(T),
          V = q(B, { ...T, skip: B === Xf }),
          I = j.useMemo(() => ({ lastArg: B }), [B]);
        return j.useMemo(() => [M, { ...V, reset: G }, I], [M, V, G, I]);
      },
      useQuery(T, M) {
        const B = R(T, M),
          G = q(T, {
            selectFromResult: T === ra || (M != null && M.skip) ? void 0 : $v,
            ...M,
          }),
          V = Kf(G, ...$f);
        return j.useDebugValue(V), j.useMemo(() => ({ ...G, ...B }), [G, B]);
      },
    };
  }
  function k(S) {
    const R = (q, T = {}) => {
        const [M, B, G, V] = E(S, q, T),
          I = j.useRef(V);
        m(() => {
          I.current = V;
        }, [V]);
        const re = j.useCallback(
          function (se, D) {
            let J;
            return (
              l(() => {
                var le;
                (le = M.current) == null || le.unsubscribe(),
                  (M.current = J =
                    B(G(se, { subscriptionOptions: I.current, direction: D })));
              }),
              J
            );
          },
          [M, B, G]
        );
        return (
          N(M),
          j.useMemo(
            () => ({
              trigger: re,
              refetch: () => U(M),
              fetchNextPage: () => re(q, "forward"),
              fetchPreviousPage: () => re(q, "backward"),
            }),
            [M, re, q]
          )
        );
      },
      X = w(S, x);
    return {
      useInfiniteQueryState: X,
      useInfiniteQuerySubscription: R,
      useInfiniteQuery(q, T) {
        const { refetch: M, fetchNextPage: B, fetchPreviousPage: G } = R(q, T),
          V = X(q, {
            selectFromResult: q === ra || (T != null && T.skip) ? void 0 : $v,
            ...T,
          }),
          I = Kf(V, ...$f, "hasNextPage", "hasPreviousPage");
        return (
          j.useDebugValue(I),
          j.useMemo(
            () => ({
              ...V,
              fetchNextPage: B,
              fetchPreviousPage: G,
              refetch: M,
            }),
            [V, B, G, M]
          )
        );
      },
    };
  }
  function _(S) {
    return ({ selectFromResult: R, fixedCacheKey: X } = {}) => {
      const { select: q, initiate: T } = n.endpoints[S],
        M = i(),
        [B, G] = j.useState();
      j.useEffect(
        () => () => {
          (B != null && B.arg.fixedCacheKey) || B == null || B.reset();
        },
        [B]
      );
      const V = j.useCallback(
          function (P) {
            const ne = M(T(P, { fixedCacheKey: X }));
            return G(ne), ne;
          },
          [M, T, X]
        ),
        { requestId: I } = B || {},
        re = j.useMemo(
          () =>
            q({
              fixedCacheKey: X,
              requestId: B == null ? void 0 : B.requestId,
            }),
          [X, B, q]
        ),
        se = j.useMemo(() => (R ? d([re], R) : re), [R, re]),
        D = u(se, Ci),
        J = X == null ? (B == null ? void 0 : B.arg.originalArgs) : void 0,
        le = j.useCallback(() => {
          l(() => {
            B && G(void 0),
              X &&
                M(
                  n.internalActions.removeMutationResult({
                    requestId: I,
                    fixedCacheKey: X,
                  })
                );
          });
        }, [M, X, B, I]),
        ge = Kf(D, ...$f, "endpointName");
      j.useDebugValue(ge);
      const O = j.useMemo(
        () => ({ ...D, originalArgs: J, reset: le }),
        [D, J, le]
      );
      return j.useMemo(() => [V, O], [V, O]);
    };
  }
}
var H4 = Symbol(),
  Z4 = ({
    batch: n = Y2,
    hooks: l = { useDispatch: nu, useSelector: au, useStore: bg },
    createSelector: i = wd,
    unstable__sideEffectsInRender: u = !1,
    ...c
  } = {}) => ({
    name: H4,
    init(o, { serializeQueryArgs: d }, h) {
      const y = o,
        {
          buildQueryHooks: m,
          buildInfiniteQueryHooks: v,
          buildMutationHook: x,
          usePrefetch: b,
        } = V4({
          api: o,
          moduleOptions: {
            batch: n,
            hooks: l,
            unstable__sideEffectsInRender: u,
            createSelector: i,
          },
          serializeQueryArgs: d,
          context: h,
        });
      return (
        Ti(y, { usePrefetch: b }),
        Ti(h, { batch: n }),
        {
          injectEndpoint(E, w) {
            if (D4(w)) {
              const {
                useQuery: N,
                useLazyQuery: U,
                useLazyQuerySubscription: A,
                useQueryState: k,
                useQuerySubscription: _,
              } = m(E);
              Ti(y.endpoints[E], {
                useQuery: N,
                useLazyQuery: U,
                useLazyQuerySubscription: A,
                useQueryState: k,
                useQuerySubscription: _,
              }),
                (o[`use${Rs(E)}Query`] = N),
                (o[`useLazy${Rs(E)}Query`] = U);
            }
            if (j4(w)) {
              const N = x(E);
              Ti(y.endpoints[E], { useMutation: N }),
                (o[`use${Rs(E)}Mutation`] = N);
            } else if (w0(w)) {
              const {
                useInfiniteQuery: N,
                useInfiniteQuerySubscription: U,
                useInfiniteQueryState: A,
              } = v(E);
              Ti(y.endpoints[E], {
                useInfiniteQuery: N,
                useInfiniteQuerySubscription: U,
                useInfiniteQueryState: A,
              }),
                (o[`use${Rs(E)}InfiniteQuery`] = N);
            }
          },
        }
      );
    },
  }),
  Q4 = x0(E0(), Z4());
const Y4 = "development",
  G4 = d4({
    baseUrl: Y4 ? "http://localhost:3000/api/v1" : "/api/v1",
    credentials: "include",
  }),
  Fv = Q4({
    baseQuery: G4,
    tagTypes: [],
    reducerPath: "appAPI",
    endpoints: () => ({}),
  }),
  X4 = RS({
    reducer: { appAPI: Fv.reducer, sidebar: XS, auth: $x, toast: Zx },
    middleware: (n) => n().concat(Fv.middleware),
  });
Fb.createRoot(document.getElementById("root")).render(
  Z.jsx(j.StrictMode, {
    children: Z.jsx(V2, {
      store: X4,
      children: Z.jsx(o2, { children: Z.jsx(n4, {}) }),
    }),
  })
);
