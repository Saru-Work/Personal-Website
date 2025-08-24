(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) t(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const o of n.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && t(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function t(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = r(i);
    fetch(i.href, n);
  }
})();
function Hc(a, e) {
  for (var r = 0; r < e.length; r++) {
    var t = e[r];
    (t.enumerable = t.enumerable || !1),
      (t.configurable = !0),
      "value" in t && (t.writable = !0),
      Object.defineProperty(a, t.key, t);
  }
}
function Uc(a, e, r) {
  return e && Hc(a.prototype, e), a;
}
/*!
 * ScrollSmoother 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Ne,
  Do,
  zt,
  ri,
  Nn,
  $r,
  Ti,
  Tl,
  me,
  Or,
  Oo,
  Sl,
  Cl,
  Pl,
  kl,
  Iu = function () {
    return typeof window < "u";
  },
  $u = function () {
    return Ne || (Iu() && (Ne = window.gsap) && Ne.registerPlugin && Ne);
  },
  Gc = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Zr = function (e) {
    return me.maxScroll(e || zt);
  },
  qc = function (e, r) {
    var t = e.parentNode || Nn,
      i = e.getBoundingClientRect(),
      n = t.getBoundingClientRect(),
      o = n.top - i.top,
      s = n.bottom - i.bottom,
      u = (Math.abs(o) > Math.abs(s) ? o : s) / (1 - r),
      f = -u * r,
      c,
      h;
    return (
      u > 0 &&
        ((c = n.height / (zt.innerHeight + n.height)),
        (h =
          c === 0.5
            ? n.height * 2
            : Math.min(n.height, Math.abs((-u * c) / (2 * c - 1))) *
              2 *
              (r || 1)),
        (f += r ? -h * r : -h / 2),
        (u += h)),
      { change: u, offset: f }
    );
  },
  Kc = function (e) {
    var r = ri.querySelector(".ScrollSmoother-wrapper");
    return (
      r ||
        ((r = ri.createElement("div")),
        r.classList.add("ScrollSmoother-wrapper"),
        e.parentNode.insertBefore(r, e),
        r.appendChild(e)),
      r
    );
  },
  Bi = (function () {
    function a(e) {
      var r = this;
      Do ||
        a.register(Ne) ||
        console.warn("Please gsap.registerPlugin(ScrollSmoother)"),
        (e = this.vars = e || {}),
        Or && Or.kill(),
        (Or = this),
        Pl(this);
      var t = e,
        i = t.smoothTouch,
        n = t.onUpdate,
        o = t.onStop,
        s = t.smooth,
        u = t.onFocusIn,
        f = t.normalizeScroll,
        c = t.wholePixels,
        h,
        d,
        l,
        _,
        p,
        m,
        T,
        S,
        M,
        w,
        v,
        O,
        P,
        k,
        R = this,
        L = e.effectsPrefix || "",
        Y = me.getScrollFunc(zt),
        A =
          me.isTouch === 1
            ? i === !0
              ? 0.8
              : parseFloat(i) || 0
            : s === 0 || s === !1
            ? 0
            : parseFloat(s) || 0.8,
        F = (A && +e.speed) || 1,
        V = 0,
        J = 0,
        U = 1,
        X = Sl(0),
        oe = function () {
          return X.update(-V);
        },
        te = { y: 0 },
        y = function () {
          return (h.style.overflow = "visible");
        },
        Z,
        ee = function (b) {
          b.update();
          var z = b.getTween();
          z && (z.pause(), (z._time = z._dur), (z._tTime = z._tDur)),
            (Z = !1),
            b.animation.progress(b.progress, !0);
        },
        fe = function (b, z) {
          ((b !== V && !w) || z) &&
            (c && (b = Math.round(b)),
            A &&
              ((h.style.transform =
                "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                b +
                ", 0, 1)"),
              (h._gsap.y = b + "px")),
            (J = b - V),
            (V = b),
            me.isUpdating || a.isRefreshing || me.update());
        },
        ie = function (b) {
          return arguments.length
            ? (b < 0 && (b = 0),
              (te.y = -b),
              (Z = !0),
              w ? (V = -b) : fe(-b),
              me.isRefreshing ? _.update() : Y(b / F),
              this)
            : -V;
        },
        Be =
          typeof ResizeObserver < "u" &&
          e.autoResize !== !1 &&
          new ResizeObserver(function () {
            if (!me.isRefreshing) {
              var B = Zr(d) * F;
              B < -V && ie(B), kl.restart(!0);
            }
          }),
        De,
        Ie = function (b) {
          (d.scrollTop = 0),
            !(
              (b.target.contains && b.target.contains(d)) ||
              (u && u(r, b) === !1)
            ) &&
              (me.isInViewport(b.target) ||
                b.target === De ||
                r.scrollTo(b.target, !1, "center center"),
              (De = b.target));
        },
        be = function (b, z) {
          if (b < z.start) return b;
          var G = isNaN(z.ratio) ? 1 : z.ratio,
            se = z.end - z.start,
            le = b - z.start,
            _e = z.offset || 0,
            Oe = z.pins || [],
            ae = Oe.offset || 0,
            Ae =
              (z._startClamp && z.start <= 0) || (z.pins && z.pins.offset)
                ? 0
                : z._endClamp && z.end === Zr()
                ? 1
                : 0.5;
          return (
            Oe.forEach(function (Ee) {
              (se -= Ee.distance), Ee.nativeStart <= b && (le -= Ee.distance);
            }),
            ae && (le *= (se - ae / G) / se),
            b + (le - _e * Ae) / G - le
          );
        },
        je = function B(b, z, G) {
          G || (b.pins.length = b.pins.offset = 0);
          var se = b.pins,
            le = b.markers,
            _e,
            Oe,
            ae,
            Ae,
            Ee,
            ge,
            et,
            K;
          for (et = 0; et < z.length; et++)
            if (
              ((K = z[et]),
              b.trigger &&
                K.trigger &&
                b !== K &&
                (K.trigger === b.trigger ||
                  K.pinnedContainer === b.trigger ||
                  b.trigger.contains(K.trigger)) &&
                ((Ee = K._startNative || K._startClamp || K.start),
                (ge = K._endNative || K._endClamp || K.end),
                (ae = be(Ee, b)),
                (Ae = K.pin && ge > 0 ? ae + (ge - Ee) : be(ge, b)),
                K.setPositions(
                  ae,
                  Ae,
                  !0,
                  (K._startClamp ? Math.max(0, ae) : ae) - Ee
                ),
                K.markerStart &&
                  le.push(
                    Ne.quickSetter([K.markerStart, K.markerEnd], "y", "px")
                  ),
                K.pin && K.end > 0 && !G))
            ) {
              if (
                ((_e = K.end - K.start),
                (Oe = b._startClamp && K.start < 0),
                Oe)
              ) {
                if (b.start > 0) {
                  b.setPositions(0, b.end + (b._startNative - b.start), !0),
                    B(b, z);
                  return;
                }
                (_e += K.start), (se.offset = -K.start);
              }
              se.push({
                start: K.start,
                nativeStart: Ee,
                end: K.end,
                distance: _e,
                trig: K,
              }),
                b.setPositions(b.start, b.end + (Oe ? -K.start : _e), !0);
            }
        },
        ot = function (b, z) {
          p.forEach(function (G) {
            return je(G, b, z);
          });
        },
        Ye = function () {
          (Nn = ri.documentElement),
            ($r = ri.body),
            y(),
            requestAnimationFrame(y),
            p &&
              (me.getAll().forEach(function (b) {
                (b._startNative = b.start), (b._endNative = b.end);
              }),
              p.forEach(function (b) {
                var z = b._startClamp || b.start,
                  G = b.autoSpeed
                    ? Math.min(Zr(), b.end)
                    : z + Math.abs((b.end - z) / b.ratio),
                  se = G - b.end;
                if (((z -= se / 2), (G -= se / 2), z > G)) {
                  var le = z;
                  (z = G), (G = le);
                }
                b._startClamp && z < 0
                  ? ((G = b.ratio < 0 ? Zr() : b.end / b.ratio),
                    (se = G - b.end),
                    (z = 0))
                  : (b.ratio < 0 || (b._endClamp && G >= Zr())) &&
                    ((G = Zr()),
                    (z =
                      b.ratio < 0 || b.ratio > 1
                        ? 0
                        : G - (G - b.start) / b.ratio),
                    (se = (G - z) * b.ratio - (b.end - b.start))),
                  (b.offset = se || 1e-4),
                  (b.pins.length = b.pins.offset = 0),
                  b.setPositions(z, G, !0);
              }),
              ot(me.sort())),
            X.reset();
        },
        Ue = function () {
          return me.addEventListener("refresh", Ye);
        },
        de = function () {
          return (
            p &&
            p.forEach(function (b) {
              return b.vars.onRefresh(b);
            })
          );
        },
        pe = function () {
          return (
            p &&
              p.forEach(function (b) {
                return b.vars.onRefreshInit(b);
              }),
            de
          );
        },
        ue = function (b, z, G, se) {
          return function () {
            var le = typeof z == "function" ? z(G, se) : z;
            le ||
              le === 0 ||
              (le =
                se.getAttribute("data-" + L + b) || (b === "speed" ? 1 : 0)),
              se.setAttribute("data-" + L + b, le);
            var _e = (le + "").substr(0, 6) === "clamp(";
            return { clamp: _e, value: _e ? le.substr(6, le.length - 7) : le };
          };
        },
        _t = function (b, z, G, se, le) {
          le = (typeof le == "function" ? le(se, b) : le) || 0;
          var _e = ue("speed", z, se, b),
            Oe = ue("lag", G, se, b),
            ae = Ne.getProperty(b, "y"),
            Ae = b._gsap,
            Ee,
            ge,
            et,
            K,
            ur,
            vt,
            gt = [],
            Ft = function () {
              (z = _e()),
                (G = parseFloat(Oe().value)),
                (Ee = parseFloat(z.value) || 1),
                (et = z.value === "auto"),
                (ur =
                  et || (ge && ge._startClamp && ge.start <= 0) || gt.offset
                    ? 0
                    : ge && ge._endClamp && ge.end === Zr()
                    ? 1
                    : 0.5),
                K && K.kill(),
                (K =
                  G &&
                  Ne.to(b, { ease: Oo, overwrite: !1, y: "+=0", duration: G })),
                ge && ((ge.ratio = Ee), (ge.autoSpeed = et));
            },
            Ht = function () {
              (Ae.y = ae + "px"), Ae.renderTransform(1), Ft();
            },
            wt = [],
            ne = 0,
            kt = function (Ce) {
              if (et) {
                Ht();
                var Xe = qc(b, Tl(0, 1, -Ce.start / (Ce.end - Ce.start)));
                (ne = Xe.change), (vt = Xe.offset);
              } else
                (vt = gt.offset || 0),
                  (ne = (Ce.end - Ce.start - vt) * (1 - Ee));
              gt.forEach(function (Et) {
                return (ne -= Et.distance * (1 - Ee));
              }),
                (Ce.offset = ne || 0.001),
                Ce.vars.onUpdate(Ce),
                K && K.progress(1);
            };
          return (
            Ft(),
            (Ee !== 1 || et || K) &&
              ((ge = me.create({
                trigger: et ? b.parentNode : b,
                start: function () {
                  return z.clamp
                    ? "clamp(top bottom+=" + le + ")"
                    : "top bottom+=" + le;
                },
                end: function () {
                  return z.value < 0
                    ? "max"
                    : z.clamp
                    ? "clamp(bottom top-=" + le + ")"
                    : "bottom top-=" + le;
                },
                scroller: d,
                scrub: !0,
                refreshPriority: -999,
                onRefreshInit: Ht,
                onRefresh: kt,
                onKill: function (Ce) {
                  var Xe = p.indexOf(Ce);
                  Xe >= 0 && p.splice(Xe, 1), Ht();
                },
                onUpdate: function (Ce) {
                  var Xe = ae + ne * (Ce.progress - ur),
                    Et = gt.length,
                    q = 0,
                    g,
                    N,
                    x;
                  if (Ce.offset) {
                    if (Et) {
                      for (N = -V, x = Ce.end; Et--; ) {
                        if (
                          ((g = gt[Et]),
                          g.trig.isActive || (N >= g.start && N <= g.end))
                        ) {
                          K &&
                            ((g.trig.progress +=
                              g.trig.direction < 0 ? 0.001 : -0.001),
                            g.trig.update(0, 0, 1),
                            K.resetTo("y", parseFloat(Ae.y), -J, !0),
                            U && K.progress(1));
                          return;
                        }
                        N > g.end && (q += g.distance), (x -= g.distance);
                      }
                      Xe =
                        ae +
                        q +
                        ne *
                          ((Ne.utils.clamp(Ce.start, Ce.end, N) -
                            Ce.start -
                            q) /
                            (x - Ce.start) -
                            ur);
                    }
                    wt.length &&
                      !et &&
                      wt.forEach(function (E) {
                        return E(Xe - q);
                      }),
                      (Xe = Gc(Xe + vt)),
                      K
                        ? (K.resetTo("y", Xe, -J, !0), U && K.progress(1))
                        : ((Ae.y = Xe + "px"), Ae.renderTransform(1));
                  }
                },
              })),
              kt(ge),
              (Ne.core.getCache(ge.trigger).stRevert = pe),
              (ge.startY = ae),
              (ge.pins = gt),
              (ge.markers = wt),
              (ge.ratio = Ee),
              (ge.autoSpeed = et),
              (b.style.willChange = "transform")),
            ge
          );
        };
      Ue(),
        me.addEventListener("killAll", Ue),
        Ne.delayedCall(0.5, function () {
          return (U = 0);
        }),
        (this.scrollTop = ie),
        (this.scrollTo = function (B, b, z) {
          var G = Ne.utils.clamp(
            0,
            Zr(),
            isNaN(B) ? r.offset(B, z, !!b && !w) : +B
          );
          b
            ? w
              ? Ne.to(r, {
                  duration: A,
                  scrollTop: G,
                  overwrite: "auto",
                  ease: Oo,
                })
              : Y(G)
            : ie(G);
        }),
        (this.offset = function (B, b, z) {
          B = Ti(B)[0];
          var G = B.style.cssText,
            se = me.create({ trigger: B, start: b || "top top" }),
            le;
          return (
            p && (U ? me.refresh() : ot([se], !0)),
            (le = se.start / (z ? F : 1)),
            se.kill(!1),
            (B.style.cssText = G),
            (Ne.core.getCache(B).uncache = 1),
            le
          );
        });
      function C() {
        return (
          (l = h.clientHeight),
          (h.style.overflow = "visible"),
          ($r.style.height = zt.innerHeight + (l - zt.innerHeight) / F + "px"),
          l - zt.innerHeight
        );
      }
      (this.content = function (B) {
        if (arguments.length) {
          var b =
            Ti(B || "#smooth-content")[0] ||
            console.warn("ScrollSmoother needs a valid content element.") ||
            $r.children[0];
          return (
            b !== h &&
              ((h = b),
              (M = h.getAttribute("style") || ""),
              Be && Be.observe(h),
              Ne.set(h, {
                overflow: "visible",
                width: "100%",
                boxSizing: "border-box",
                y: "+=0",
              }),
              A || Ne.set(h, { clearProps: "transform" })),
            this
          );
        }
        return h;
      }),
        (this.wrapper = function (B) {
          return arguments.length
            ? ((d = Ti(B || "#smooth-wrapper")[0] || Kc(h)),
              (S = d.getAttribute("style") || ""),
              C(),
              Ne.set(
                d,
                A
                  ? {
                      overflow: "hidden",
                      position: "fixed",
                      height: "100%",
                      width: "100%",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }
                  : {
                      overflow: "visible",
                      position: "relative",
                      width: "100%",
                      height: "auto",
                      top: "auto",
                      bottom: "auto",
                      left: "auto",
                      right: "auto",
                    }
              ),
              this)
            : d;
        }),
        (this.effects = function (B, b) {
          var z;
          if ((p || (p = []), !B)) return p.slice(0);
          (B = Ti(B)),
            B.forEach(function (Ee) {
              for (var ge = p.length; ge--; )
                p[ge].trigger === Ee && p[ge].kill();
            }),
            (b = b || {});
          var G = b,
            se = G.speed,
            le = G.lag,
            _e = G.effectsPadding,
            Oe = [],
            ae,
            Ae;
          for (ae = 0; ae < B.length; ae++)
            (Ae = _t(B[ae], se, le, ae, _e)), Ae && Oe.push(Ae);
          return (
            (z = p).push.apply(z, Oe), b.refresh !== !1 && me.refresh(), Oe
          );
        }),
        (this.sections = function (B, b) {
          var z;
          if ((m || (m = []), !B)) return m.slice(0);
          var G = Ti(B).map(function (se) {
            return me.create({
              trigger: se,
              start: "top 120%",
              end: "bottom -20%",
              onToggle: function (_e) {
                (se.style.opacity = _e.isActive ? "1" : "0"),
                  (se.style.pointerEvents = _e.isActive ? "all" : "none");
              },
            });
          });
          return b && b.add ? (z = m).push.apply(z, G) : (m = G.slice(0)), G;
        }),
        this.content(e.content),
        this.wrapper(e.wrapper),
        (this.render = function (B) {
          return fe(B || B === 0 ? B : V);
        }),
        (this.getVelocity = function () {
          return X.getVelocity(-V);
        }),
        me.scrollerProxy(d, {
          scrollTop: ie,
          scrollHeight: function () {
            return C() && $r.scrollHeight;
          },
          fixedMarkers: e.fixedMarkers !== !1 && !!A,
          content: h,
          getBoundingClientRect: function () {
            return {
              top: 0,
              left: 0,
              width: zt.innerWidth,
              height: zt.innerHeight,
            };
          },
        }),
        me.defaults({ scroller: d });
      var ze = me.getAll().filter(function (B) {
        return B.scroller === zt || B.scroller === d;
      });
      ze.forEach(function (B) {
        return B.revert(!0, !0);
      }),
        (_ = me.create({
          animation: Ne.fromTo(
            te,
            {
              y: function () {
                return (k = 0), 0;
              },
            },
            {
              y: function () {
                return (k = 1), -C();
              },
              immediateRender: !1,
              ease: "none",
              data: "ScrollSmoother",
              duration: 100,
              onUpdate: function () {
                if (k) {
                  var b = Z;
                  b && (ee(_), (te.y = V)), fe(te.y, b), oe(), n && !w && n(R);
                }
              },
            }
          ),
          onRefreshInit: function (b) {
            if (!a.isRefreshing) {
              if (((a.isRefreshing = !0), p)) {
                var z = me.getAll().filter(function (se) {
                  return !!se.pin;
                });
                p.forEach(function (se) {
                  se.vars.pinnedContainer ||
                    z.forEach(function (le) {
                      if (le.pin.contains(se.trigger)) {
                        var _e = se.vars;
                        (_e.pinnedContainer = le.pin),
                          (se.vars = null),
                          se.init(_e, se.animation);
                      }
                    });
                });
              }
              var G = b.getTween();
              (P = G && G._end > G._dp._time),
                (O = V),
                (te.y = 0),
                A &&
                  (me.isTouch === 1 && (d.style.position = "absolute"),
                  (d.scrollTop = 0),
                  me.isTouch === 1 && (d.style.position = "fixed"));
            }
          },
          onRefresh: function (b) {
            b.animation.invalidate(),
              b.setPositions(b.start, C() / F),
              P || ee(b),
              (te.y = -Y() * F),
              fe(te.y),
              U ||
                (P && (Z = !1),
                b.animation.progress(Ne.utils.clamp(0, 1, O / F / -b.end))),
              P && ((b.progress -= 0.001), b.update()),
              (a.isRefreshing = !1);
          },
          id: "ScrollSmoother",
          scroller: zt,
          invalidateOnRefresh: !0,
          start: 0,
          refreshPriority: -9999,
          end: function () {
            return C() / F;
          },
          onScrubComplete: function () {
            X.reset(), o && o(r);
          },
          scrub: A || !0,
        })),
        (this.smooth = function (B) {
          return (
            arguments.length &&
              ((A = B || 0), (F = (A && +e.speed) || 1), _.scrubDuration(B)),
            _.getTween() ? _.getTween().duration() : 0
          );
        }),
        _.getTween() && (_.getTween().vars.ease = e.ease || Oo),
        (this.scrollTrigger = _),
        e.effects &&
          this.effects(
            e.effects === !0
              ? "[data-" + L + "speed], [data-" + L + "lag]"
              : e.effects,
            { effectsPadding: e.effectsPadding, refresh: !1 }
          ),
        e.sections &&
          this.sections(e.sections === !0 ? "[data-section]" : e.sections),
        ze.forEach(function (B) {
          (B.vars.scroller = d), B.revert(!1, !0), B.init(B.vars, B.animation);
        }),
        (this.paused = function (B, b) {
          return arguments.length
            ? (!!w !== B &&
                (B
                  ? (_.getTween() && _.getTween().pause(),
                    Y(-V / F),
                    X.reset(),
                    (v = me.normalizeScroll()),
                    v && v.disable(),
                    (w = me.observe({
                      preventDefault: !0,
                      type: "wheel,touch,scroll",
                      debounce: !1,
                      allowClicks: !0,
                      onChangeY: function () {
                        return ie(-V);
                      },
                    })),
                    (w.nested = Cl(Nn, "wheel,touch,scroll", !0, b !== !1)))
                  : (w.nested.kill(),
                    w.kill(),
                    (w = 0),
                    v && v.enable(),
                    (_.progress = (-V / F - _.start) / (_.end - _.start)),
                    ee(_))),
              this)
            : !!w;
        }),
        (this.kill = this.revert =
          function () {
            r.paused(!1), ee(_), _.kill();
            for (var B = (p || []).concat(m || []), b = B.length; b--; )
              B[b].kill();
            me.scrollerProxy(d),
              me.removeEventListener("killAll", Ue),
              me.removeEventListener("refresh", Ye),
              (d.style.cssText = S),
              (h.style.cssText = M);
            var z = me.defaults({});
            z && z.scroller === d && me.defaults({ scroller: zt }),
              r.normalizer && me.normalizeScroll(!1),
              clearInterval(T),
              (Or = null),
              Be && Be.disconnect(),
              $r.style.removeProperty("height"),
              zt.removeEventListener("focusin", Ie);
          }),
        (this.refresh = function (B, b) {
          return _.refresh(B, b);
        }),
        f &&
          (this.normalizer = me.normalizeScroll(
            f === !0 ? { debounce: !0, content: !A && h } : f
          )),
        me.config(e),
        "scrollBehavior" in zt.getComputedStyle($r) &&
          Ne.set([$r, Nn], { scrollBehavior: "auto" }),
        zt.addEventListener("focusin", Ie),
        (T = setInterval(oe, 250)),
        ri.readyState === "loading" ||
          requestAnimationFrame(function () {
            return me.refresh();
          });
    }
    return (
      (a.register = function (r) {
        return (
          Do ||
            ((Ne = r || $u()),
            Iu() &&
              window.document &&
              ((zt = window),
              (ri = document),
              (Nn = ri.documentElement),
              ($r = ri.body)),
            Ne &&
              ((Ti = Ne.utils.toArray),
              (Tl = Ne.utils.clamp),
              (Oo = Ne.parseEase("expo")),
              (Pl = Ne.core.context || function () {}),
              (me = Ne.core.globals().ScrollTrigger),
              Ne.core.globals("ScrollSmoother", a),
              $r &&
                me &&
                ((kl = Ne.delayedCall(0.2, function () {
                  return me.isRefreshing || (Or && Or.refresh());
                }).pause()),
                (Sl = me.core._getVelocityProp),
                (Cl = me.core._inputObserver),
                (a.refresh = me.refresh),
                (Do = 1)))),
          Do
        );
      }),
      Uc(a, [
        {
          key: "progress",
          get: function () {
            return this.scrollTrigger
              ? this.scrollTrigger.animation._time / 100
              : 0;
          },
        },
      ]),
      a
    );
  })();
Bi.version = "3.13.0";
Bi.create = function (a) {
  return Or && a && Or.content() === Ti(a.content)[0] ? Or : new Bi(a);
};
Bi.get = function () {
  return Or;
};
$u() && Ne.registerPlugin(Bi);
function Qc(a, e) {
  for (var r = 0; r < e.length; r++) {
    var t = e[r];
    (t.enumerable = t.enumerable || !1),
      (t.configurable = !0),
      "value" in t && (t.writable = !0),
      Object.defineProperty(a, t.key, t);
  }
}
function jc(a, e, r) {
  return e && Qc(a.prototype, e), a;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Ct,
  Go,
  rr,
  ni,
  oi,
  un,
  zu,
  Si,
  qn,
  Bu,
  Vr,
  vr,
  Yu,
  Xu = function () {
    return (
      Ct ||
      (typeof window < "u" && (Ct = window.gsap) && Ct.registerPlugin && Ct)
    );
  },
  Wu = 1,
  nn = [],
  ve = [],
  Fr = [],
  Kn = Date.now,
  Zs = function (e, r) {
    return r;
  },
  Zc = function () {
    var e = qn.core,
      r = e.bridge || {},
      t = e._scrollers,
      i = e._proxies;
    t.push.apply(t, ve),
      i.push.apply(i, Fr),
      (ve = t),
      (Fr = i),
      (Zs = function (o, s) {
        return r[o](s);
      });
  },
  fi = function (e, r) {
    return ~Fr.indexOf(e) && Fr[Fr.indexOf(e) + 1][r];
  },
  Qn = function (e) {
    return !!~Bu.indexOf(e);
  },
  $t = function (e, r, t, i, n) {
    return e.addEventListener(r, t, { passive: i !== !1, capture: !!n });
  },
  It = function (e, r, t, i) {
    return e.removeEventListener(r, t, !!i);
  },
  Ro = "scrollLeft",
  Ao = "scrollTop",
  Js = function () {
    return (Vr && Vr.isPressed) || ve.cache++;
  },
  os = function (e, r) {
    var t = function i(n) {
      if (n || n === 0) {
        Wu && (rr.history.scrollRestoration = "manual");
        var o = Vr && Vr.isPressed;
        (n = i.v = Math.round(n) || (Vr && Vr.iOS ? 1 : 0)),
          e(n),
          (i.cacheID = ve.cache),
          o && Zs("ss", n);
      } else
        (r || ve.cache !== i.cacheID || Zs("ref")) &&
          ((i.cacheID = ve.cache), (i.v = e()));
      return i.v + i.offset;
    };
    return (t.offset = 0), e && t;
  },
  Wt = {
    s: Ro,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: os(function (a) {
      return arguments.length
        ? rr.scrollTo(a, pt.sc())
        : rr.pageXOffset || ni[Ro] || oi[Ro] || un[Ro] || 0;
    }),
  },
  pt = {
    s: Ao,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: Wt,
    sc: os(function (a) {
      return arguments.length
        ? rr.scrollTo(Wt.sc(), a)
        : rr.pageYOffset || ni[Ao] || oi[Ao] || un[Ao] || 0;
    }),
  },
  Ut = function (e, r) {
    return (
      ((r && r._ctx && r._ctx.selector) || Ct.utils.toArray)(e)[0] ||
      (typeof e == "string" && Ct.config().nullTargetWarn !== !1
        ? console.warn("Element not found:", e)
        : null)
    );
  },
  Jc = function (e, r) {
    for (var t = r.length; t--; ) if (r[t] === e || r[t].contains(e)) return !0;
    return !1;
  },
  pi = function (e, r) {
    var t = r.s,
      i = r.sc;
    Qn(e) && (e = ni.scrollingElement || oi);
    var n = ve.indexOf(e),
      o = i === pt.sc ? 1 : 2;
    !~n && (n = ve.push(e) - 1), ve[n + o] || $t(e, "scroll", Js);
    var s = ve[n + o],
      u =
        s ||
        (ve[n + o] =
          os(fi(e, t), !0) ||
          (Qn(e)
            ? i
            : os(function (f) {
                return arguments.length ? (e[t] = f) : e[t];
              })));
    return (
      (u.target = e),
      s || (u.smooth = Ct.getProperty(e, "scrollBehavior") === "smooth"),
      u
    );
  },
  ea = function (e, r, t) {
    var i = e,
      n = e,
      o = Kn(),
      s = o,
      u = r || 50,
      f = Math.max(500, u * 3),
      c = function (_, p) {
        var m = Kn();
        p || m - o > u
          ? ((n = i), (i = _), (s = o), (o = m))
          : t
          ? (i += _)
          : (i = n + ((_ - n) / (m - s)) * (o - s));
      },
      h = function () {
        (n = i = t ? 0 : i), (s = o = 0);
      },
      d = function (_) {
        var p = s,
          m = n,
          T = Kn();
        return (
          (_ || _ === 0) && _ !== i && c(_),
          o === s || T - s > f
            ? 0
            : ((i + (t ? m : -m)) / ((t ? T : o) - p)) * 1e3
        );
      };
    return { update: c, reset: h, getVelocity: d };
  },
  Dn = function (e, r) {
    return (
      r && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  },
  El = function (e) {
    var r = Math.max.apply(Math, e),
      t = Math.min.apply(Math, e);
    return Math.abs(r) >= Math.abs(t) ? r : t;
  },
  Vu = function () {
    (qn = Ct.core.globals().ScrollTrigger), qn && qn.core && Zc();
  },
  Hu = function (e) {
    return (
      (Ct = e || Xu()),
      !Go &&
        Ct &&
        typeof document < "u" &&
        document.body &&
        ((rr = window),
        (ni = document),
        (oi = ni.documentElement),
        (un = ni.body),
        (Bu = [rr, ni, oi, un]),
        Ct.utils.clamp,
        (Yu = Ct.core.context || function () {}),
        (Si = "onpointerenter" in un ? "pointer" : "mouse"),
        (zu = it.isTouch =
          rr.matchMedia &&
          rr.matchMedia("(hover: none), (pointer: coarse)").matches
            ? 1
            : "ontouchstart" in rr ||
              navigator.maxTouchPoints > 0 ||
              navigator.msMaxTouchPoints > 0
            ? 2
            : 0),
        (vr = it.eventTypes =
          (
            "ontouchstart" in oi
              ? "touchstart,touchmove,touchcancel,touchend"
              : "onpointerdown" in oi
              ? "pointerdown,pointermove,pointercancel,pointerup"
              : "mousedown,mousemove,mouseup,mouseup"
          ).split(",")),
        setTimeout(function () {
          return (Wu = 0);
        }, 500),
        Vu(),
        (Go = 1)),
      Go
    );
  };
Wt.op = pt;
ve.cache = 0;
var it = (function () {
  function a(r) {
    this.init(r);
  }
  var e = a.prototype;
  return (
    (e.init = function (t) {
      Go || Hu(Ct) || console.warn("Please gsap.registerPlugin(Observer)"),
        qn || Vu();
      var i = t.tolerance,
        n = t.dragMinimum,
        o = t.type,
        s = t.target,
        u = t.lineHeight,
        f = t.debounce,
        c = t.preventDefault,
        h = t.onStop,
        d = t.onStopDelay,
        l = t.ignore,
        _ = t.wheelSpeed,
        p = t.event,
        m = t.onDragStart,
        T = t.onDragEnd,
        S = t.onDrag,
        M = t.onPress,
        w = t.onRelease,
        v = t.onRight,
        O = t.onLeft,
        P = t.onUp,
        k = t.onDown,
        R = t.onChangeX,
        L = t.onChangeY,
        Y = t.onChange,
        A = t.onToggleX,
        F = t.onToggleY,
        V = t.onHover,
        J = t.onHoverEnd,
        U = t.onMove,
        X = t.ignoreCheck,
        oe = t.isNormalizer,
        te = t.onGestureStart,
        y = t.onGestureEnd,
        Z = t.onWheel,
        ee = t.onEnable,
        fe = t.onDisable,
        ie = t.onClick,
        Be = t.scrollSpeed,
        De = t.capture,
        Ie = t.allowClicks,
        be = t.lockAxis,
        je = t.onLockAxis;
      (this.target = s = Ut(s) || oi),
        (this.vars = t),
        l && (l = Ct.utils.toArray(l)),
        (i = i || 1e-9),
        (n = n || 0),
        (_ = _ || 1),
        (Be = Be || 1),
        (o = o || "wheel,touch,pointer"),
        (f = f !== !1),
        u || (u = parseFloat(rr.getComputedStyle(un).lineHeight) || 22);
      var ot,
        Ye,
        Ue,
        de,
        pe,
        ue,
        _t,
        C = this,
        ze = 0,
        B = 0,
        b = t.passive || (!c && t.passive !== !1),
        z = pi(s, Wt),
        G = pi(s, pt),
        se = z(),
        le = G(),
        _e =
          ~o.indexOf("touch") &&
          !~o.indexOf("pointer") &&
          vr[0] === "pointerdown",
        Oe = Qn(s),
        ae = s.ownerDocument || ni,
        Ae = [0, 0, 0],
        Ee = [0, 0, 0],
        ge = 0,
        et = function () {
          return (ge = Kn());
        },
        K = function (E, $) {
          return (
            ((C.event = E) && l && Jc(E.target, l)) ||
            ($ && _e && E.pointerType !== "touch") ||
            (X && X(E, $))
          );
        },
        ur = function () {
          C._vx.reset(), C._vy.reset(), Ye.pause(), h && h(C);
        },
        vt = function () {
          var E = (C.deltaX = El(Ae)),
            $ = (C.deltaY = El(Ee)),
            D = Math.abs(E) >= i,
            W = Math.abs($) >= i;
          Y && (D || W) && Y(C, E, $, Ae, Ee),
            D &&
              (v && C.deltaX > 0 && v(C),
              O && C.deltaX < 0 && O(C),
              R && R(C),
              A && C.deltaX < 0 != ze < 0 && A(C),
              (ze = C.deltaX),
              (Ae[0] = Ae[1] = Ae[2] = 0)),
            W &&
              (k && C.deltaY > 0 && k(C),
              P && C.deltaY < 0 && P(C),
              L && L(C),
              F && C.deltaY < 0 != B < 0 && F(C),
              (B = C.deltaY),
              (Ee[0] = Ee[1] = Ee[2] = 0)),
            (de || Ue) &&
              (U && U(C),
              Ue && (m && Ue === 1 && m(C), S && S(C), (Ue = 0)),
              (de = !1)),
            ue && !(ue = !1) && je && je(C),
            pe && (Z(C), (pe = !1)),
            (ot = 0);
        },
        gt = function (E, $, D) {
          (Ae[D] += E),
            (Ee[D] += $),
            C._vx.update(E),
            C._vy.update($),
            f ? ot || (ot = requestAnimationFrame(vt)) : vt();
        },
        Ft = function (E, $) {
          be &&
            !_t &&
            ((C.axis = _t = Math.abs(E) > Math.abs($) ? "x" : "y"), (ue = !0)),
            _t !== "y" && ((Ae[2] += E), C._vx.update(E, !0)),
            _t !== "x" && ((Ee[2] += $), C._vy.update($, !0)),
            f ? ot || (ot = requestAnimationFrame(vt)) : vt();
        },
        Ht = function (E) {
          if (!K(E, 1)) {
            E = Dn(E, c);
            var $ = E.clientX,
              D = E.clientY,
              W = $ - C.x,
              I = D - C.y,
              H = C.isDragging;
            (C.x = $),
              (C.y = D),
              (H ||
                ((W || I) &&
                  (Math.abs(C.startX - $) >= n ||
                    Math.abs(C.startY - D) >= n))) &&
                ((Ue = H ? 2 : 1), H || (C.isDragging = !0), Ft(W, I));
          }
        },
        wt = (C.onPress = function (x) {
          K(x, 1) ||
            (x && x.button) ||
            ((C.axis = _t = null),
            Ye.pause(),
            (C.isPressed = !0),
            (x = Dn(x)),
            (ze = B = 0),
            (C.startX = C.x = x.clientX),
            (C.startY = C.y = x.clientY),
            C._vx.reset(),
            C._vy.reset(),
            $t(oe ? s : ae, vr[1], Ht, b, !0),
            (C.deltaX = C.deltaY = 0),
            M && M(C));
        }),
        ne = (C.onRelease = function (x) {
          if (!K(x, 1)) {
            It(oe ? s : ae, vr[1], Ht, !0);
            var E = !isNaN(C.y - C.startY),
              $ = C.isDragging,
              D =
                $ &&
                (Math.abs(C.x - C.startX) > 3 || Math.abs(C.y - C.startY) > 3),
              W = Dn(x);
            !D &&
              E &&
              (C._vx.reset(),
              C._vy.reset(),
              c &&
                Ie &&
                Ct.delayedCall(0.08, function () {
                  if (Kn() - ge > 300 && !x.defaultPrevented) {
                    if (x.target.click) x.target.click();
                    else if (ae.createEvent) {
                      var I = ae.createEvent("MouseEvents");
                      I.initMouseEvent(
                        "click",
                        !0,
                        !0,
                        rr,
                        1,
                        W.screenX,
                        W.screenY,
                        W.clientX,
                        W.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        x.target.dispatchEvent(I);
                    }
                  }
                })),
              (C.isDragging = C.isGesturing = C.isPressed = !1),
              h && $ && !oe && Ye.restart(!0),
              Ue && vt(),
              T && $ && T(C),
              w && w(C, D);
          }
        }),
        kt = function (E) {
          return (
            E.touches &&
            E.touches.length > 1 &&
            (C.isGesturing = !0) &&
            te(E, C.isDragging)
          );
        },
        Le = function () {
          return (C.isGesturing = !1) || y(C);
        },
        Ce = function (E) {
          if (!K(E)) {
            var $ = z(),
              D = G();
            gt(($ - se) * Be, (D - le) * Be, 1),
              (se = $),
              (le = D),
              h && Ye.restart(!0);
          }
        },
        Xe = function (E) {
          if (!K(E)) {
            (E = Dn(E, c)), Z && (pe = !0);
            var $ =
              (E.deltaMode === 1 ? u : E.deltaMode === 2 ? rr.innerHeight : 1) *
              _;
            gt(E.deltaX * $, E.deltaY * $, 0), h && !oe && Ye.restart(!0);
          }
        },
        Et = function (E) {
          if (!K(E)) {
            var $ = E.clientX,
              D = E.clientY,
              W = $ - C.x,
              I = D - C.y;
            (C.x = $),
              (C.y = D),
              (de = !0),
              h && Ye.restart(!0),
              (W || I) && Ft(W, I);
          }
        },
        q = function (E) {
          (C.event = E), V(C);
        },
        g = function (E) {
          (C.event = E), J(C);
        },
        N = function (E) {
          return K(E) || (Dn(E, c) && ie(C));
        };
      (Ye = C._dc = Ct.delayedCall(d || 0.25, ur).pause()),
        (C.deltaX = C.deltaY = 0),
        (C._vx = ea(0, 50, !0)),
        (C._vy = ea(0, 50, !0)),
        (C.scrollX = z),
        (C.scrollY = G),
        (C.isDragging = C.isGesturing = C.isPressed = !1),
        Yu(this),
        (C.enable = function (x) {
          return (
            C.isEnabled ||
              ($t(Oe ? ae : s, "scroll", Js),
              o.indexOf("scroll") >= 0 && $t(Oe ? ae : s, "scroll", Ce, b, De),
              o.indexOf("wheel") >= 0 && $t(s, "wheel", Xe, b, De),
              ((o.indexOf("touch") >= 0 && zu) || o.indexOf("pointer") >= 0) &&
                ($t(s, vr[0], wt, b, De),
                $t(ae, vr[2], ne),
                $t(ae, vr[3], ne),
                Ie && $t(s, "click", et, !0, !0),
                ie && $t(s, "click", N),
                te && $t(ae, "gesturestart", kt),
                y && $t(ae, "gestureend", Le),
                V && $t(s, Si + "enter", q),
                J && $t(s, Si + "leave", g),
                U && $t(s, Si + "move", Et)),
              (C.isEnabled = !0),
              (C.isDragging = C.isGesturing = C.isPressed = de = Ue = !1),
              C._vx.reset(),
              C._vy.reset(),
              (se = z()),
              (le = G()),
              x && x.type && wt(x),
              ee && ee(C)),
            C
          );
        }),
        (C.disable = function () {
          C.isEnabled &&
            (nn.filter(function (x) {
              return x !== C && Qn(x.target);
            }).length || It(Oe ? ae : s, "scroll", Js),
            C.isPressed &&
              (C._vx.reset(), C._vy.reset(), It(oe ? s : ae, vr[1], Ht, !0)),
            It(Oe ? ae : s, "scroll", Ce, De),
            It(s, "wheel", Xe, De),
            It(s, vr[0], wt, De),
            It(ae, vr[2], ne),
            It(ae, vr[3], ne),
            It(s, "click", et, !0),
            It(s, "click", N),
            It(ae, "gesturestart", kt),
            It(ae, "gestureend", Le),
            It(s, Si + "enter", q),
            It(s, Si + "leave", g),
            It(s, Si + "move", Et),
            (C.isEnabled = C.isPressed = C.isDragging = !1),
            fe && fe(C));
        }),
        (C.kill = C.revert =
          function () {
            C.disable();
            var x = nn.indexOf(C);
            x >= 0 && nn.splice(x, 1), Vr === C && (Vr = 0);
          }),
        nn.push(C),
        oe && Qn(s) && (Vr = C),
        C.enable(p);
    }),
    jc(a, [
      {
        key: "velocityX",
        get: function () {
          return this._vx.getVelocity();
        },
      },
      {
        key: "velocityY",
        get: function () {
          return this._vy.getVelocity();
        },
      },
    ]),
    a
  );
})();
it.version = "3.13.0";
it.create = function (a) {
  return new it(a);
};
it.register = Hu;
it.getAll = function () {
  return nn.slice();
};
it.getById = function (a) {
  return nn.filter(function (e) {
    return e.vars.id === a;
  })[0];
};
Xu() && Ct.registerPlugin(it);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Q,
  en,
  xe,
  Ge,
  tr,
  Fe,
  Xa,
  ss,
  ho,
  jn,
  Fn,
  Lo,
  Ot,
  bs,
  ta,
  Yt,
  Ml,
  Dl,
  tn,
  Uu,
  Es,
  Gu,
  Bt,
  ra,
  qu,
  Ku,
  ti,
  ia,
  Wa,
  fn,
  Va,
  as,
  na,
  Ms,
  No = 1,
  Rt = Date.now,
  Ds = Rt(),
  xr = 0,
  In = 0,
  Ol = function (e, r, t) {
    var i = Jt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
    return (t["_" + r + "Clamp"] = i), i ? e.substr(6, e.length - 7) : e;
  },
  Rl = function (e, r) {
    return r && (!Jt(e) || e.substr(0, 6) !== "clamp(")
      ? "clamp(" + e + ")"
      : e;
  },
  eh = function a() {
    return In && requestAnimationFrame(a);
  },
  Al = function () {
    return (bs = 1);
  },
  Ll = function () {
    return (bs = 0);
  },
  Mr = function (e) {
    return e;
  },
  $n = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Qu = function () {
    return typeof window < "u";
  },
  ju = function () {
    return Q || (Qu() && (Q = window.gsap) && Q.registerPlugin && Q);
  },
  Yi = function (e) {
    return !!~Xa.indexOf(e);
  },
  Zu = function (e) {
    return (
      (e === "Height" ? Va : xe["inner" + e]) ||
      tr["client" + e] ||
      Fe["client" + e]
    );
  },
  Ju = function (e) {
    return (
      fi(e, "getBoundingClientRect") ||
      (Yi(e)
        ? function () {
            return (Zo.width = xe.innerWidth), (Zo.height = Va), Zo;
          }
        : function () {
            return Wr(e);
          })
    );
  },
  th = function (e, r, t) {
    var i = t.d,
      n = t.d2,
      o = t.a;
    return (o = fi(e, "getBoundingClientRect"))
      ? function () {
          return o()[i];
        }
      : function () {
          return (r ? Zu(n) : e["client" + n]) || 0;
        };
  },
  rh = function (e, r) {
    return !r || ~Fr.indexOf(e)
      ? Ju(e)
      : function () {
          return Zo;
        };
  },
  Lr = function (e, r) {
    var t = r.s,
      i = r.d2,
      n = r.d,
      o = r.a;
    return Math.max(
      0,
      (t = "scroll" + i) && (o = fi(e, t))
        ? o() - Ju(e)()[n]
        : Yi(e)
        ? (tr[t] || Fe[t]) - Zu(i)
        : e[t] - e["offset" + i]
    );
  },
  Fo = function (e, r) {
    for (var t = 0; t < tn.length; t += 3)
      (!r || ~r.indexOf(tn[t + 1])) && e(tn[t], tn[t + 1], tn[t + 2]);
  },
  Jt = function (e) {
    return typeof e == "string";
  },
  At = function (e) {
    return typeof e == "function";
  },
  zn = function (e) {
    return typeof e == "number";
  },
  Ci = function (e) {
    return typeof e == "object";
  },
  On = function (e, r, t) {
    return e && e.progress(r ? 0 : 1) && t && e.pause();
  },
  Os = function (e, r) {
    if (e.enabled) {
      var t = e._ctx
        ? e._ctx.add(function () {
            return r(e);
          })
        : r(e);
      t && t.totalTime && (e.callbackAnimation = t);
    }
  },
  Gi = Math.abs,
  ef = "left",
  tf = "top",
  Ha = "right",
  Ua = "bottom",
  Di = "width",
  Oi = "height",
  Zn = "Right",
  Jn = "Left",
  eo = "Top",
  to = "Bottom",
  at = "padding",
  pr = "margin",
  vn = "Width",
  Ga = "Height",
  ct = "px",
  _r = function (e) {
    return xe.getComputedStyle(e);
  },
  ih = function (e) {
    var r = _r(e).position;
    e.style.position = r === "absolute" || r === "fixed" ? r : "relative";
  },
  Nl = function (e, r) {
    for (var t in r) t in e || (e[t] = r[t]);
    return e;
  },
  Wr = function (e, r) {
    var t =
        r &&
        _r(e)[ta] !== "matrix(1, 0, 0, 1, 0, 0)" &&
        Q.to(e, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
        }).progress(1),
      i = e.getBoundingClientRect();
    return t && t.progress(0).kill(), i;
  },
  ls = function (e, r) {
    var t = r.d2;
    return e["offset" + t] || e["client" + t] || 0;
  },
  rf = function (e) {
    var r = [],
      t = e.labels,
      i = e.duration(),
      n;
    for (n in t) r.push(t[n] / i);
    return r;
  },
  nh = function (e) {
    return function (r) {
      return Q.utils.snap(rf(e), r);
    };
  },
  qa = function (e) {
    var r = Q.utils.snap(e),
      t =
        Array.isArray(e) &&
        e.slice(0).sort(function (i, n) {
          return i - n;
        });
    return t
      ? function (i, n, o) {
          o === void 0 && (o = 0.001);
          var s;
          if (!n) return r(i);
          if (n > 0) {
            for (i -= o, s = 0; s < t.length; s++) if (t[s] >= i) return t[s];
            return t[s - 1];
          } else for (s = t.length, i += o; s--; ) if (t[s] <= i) return t[s];
          return t[0];
        }
      : function (i, n, o) {
          o === void 0 && (o = 0.001);
          var s = r(i);
          return !n || Math.abs(s - i) < o || s - i < 0 == n < 0
            ? s
            : r(n < 0 ? i - e : i + e);
        };
  },
  oh = function (e) {
    return function (r, t) {
      return qa(rf(e))(r, t.direction);
    };
  },
  Io = function (e, r, t, i) {
    return t.split(",").forEach(function (n) {
      return e(r, n, i);
    });
  },
  yt = function (e, r, t, i, n) {
    return e.addEventListener(r, t, { passive: !i, capture: !!n });
  },
  mt = function (e, r, t, i) {
    return e.removeEventListener(r, t, !!i);
  },
  $o = function (e, r, t) {
    (t = t && t.wheelHandler), t && (e(r, "wheel", t), e(r, "touchmove", t));
  },
  Fl = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal",
  },
  zo = { toggleActions: "play", anticipatePin: 0 },
  us = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  qo = function (e, r) {
    if (Jt(e)) {
      var t = e.indexOf("="),
        i = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
      ~t && (e.indexOf("%") > t && (i *= r / 100), (e = e.substr(0, t - 1))),
        (e =
          i +
          (e in us
            ? us[e] * r
            : ~e.indexOf("%")
            ? (parseFloat(e) * r) / 100
            : parseFloat(e) || 0));
    }
    return e;
  },
  Bo = function (e, r, t, i, n, o, s, u) {
    var f = n.startColor,
      c = n.endColor,
      h = n.fontSize,
      d = n.indent,
      l = n.fontWeight,
      _ = Ge.createElement("div"),
      p = Yi(t) || fi(t, "pinType") === "fixed",
      m = e.indexOf("scroller") !== -1,
      T = p ? Fe : t,
      S = e.indexOf("start") !== -1,
      M = S ? f : c,
      w =
        "border-color:" +
        M +
        ";font-size:" +
        h +
        ";color:" +
        M +
        ";font-weight:" +
        l +
        ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return (
      (w += "position:" + ((m || u) && p ? "fixed;" : "absolute;")),
      (m || u || !p) &&
        (w += (i === pt ? Ha : Ua) + ":" + (o + parseFloat(d)) + "px;"),
      s &&
        (w +=
          "box-sizing:border-box;text-align:left;width:" +
          s.offsetWidth +
          "px;"),
      (_._isStart = S),
      _.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")),
      (_.style.cssText = w),
      (_.innerText = r || r === 0 ? e + "-" + r : e),
      T.children[0] ? T.insertBefore(_, T.children[0]) : T.appendChild(_),
      (_._offset = _["offset" + i.op.d2]),
      Ko(_, 0, i, S),
      _
    );
  },
  Ko = function (e, r, t, i) {
    var n = { display: "block" },
      o = t[i ? "os2" : "p2"],
      s = t[i ? "p2" : "os2"];
    (e._isFlipped = i),
      (n[t.a + "Percent"] = i ? -100 : 0),
      (n[t.a] = i ? "1px" : 0),
      (n["border" + o + vn] = 1),
      (n["border" + s + vn] = 0),
      (n[t.p] = r + "px"),
      Q.set(e, n);
  },
  ye = [],
  oa = {},
  po,
  Il = function () {
    return Rt() - xr > 34 && (po || (po = requestAnimationFrame(qr)));
  },
  qi = function () {
    (!Bt || !Bt.isPressed || Bt.startX > Fe.clientWidth) &&
      (ve.cache++,
      Bt ? po || (po = requestAnimationFrame(qr)) : qr(),
      xr || Wi("scrollStart"),
      (xr = Rt()));
  },
  Rs = function () {
    (Ku = xe.innerWidth), (qu = xe.innerHeight);
  },
  Bn = function (e) {
    ve.cache++,
      (e === !0 ||
        (!Ot &&
          !Gu &&
          !Ge.fullscreenElement &&
          !Ge.webkitFullscreenElement &&
          (!ra ||
            Ku !== xe.innerWidth ||
            Math.abs(xe.innerHeight - qu) > xe.innerHeight * 0.25))) &&
        ss.restart(!0);
  },
  Xi = {},
  sh = [],
  nf = function a() {
    return mt(we, "scrollEnd", a) || Ei(!0);
  },
  Wi = function (e) {
    return (
      (Xi[e] &&
        Xi[e].map(function (r) {
          return r();
        })) ||
      sh
    );
  },
  Zt = [],
  of = function (e) {
    for (var r = 0; r < Zt.length; r += 5)
      (!e || (Zt[r + 4] && Zt[r + 4].query === e)) &&
        ((Zt[r].style.cssText = Zt[r + 1]),
        Zt[r].getBBox && Zt[r].setAttribute("transform", Zt[r + 2] || ""),
        (Zt[r + 3].uncache = 1));
  },
  Ka = function (e, r) {
    var t;
    for (Yt = 0; Yt < ye.length; Yt++)
      (t = ye[Yt]),
        t && (!r || t._ctx === r) && (e ? t.kill(1) : t.revert(!0, !0));
    (as = !0), r && of(r), r || Wi("revert");
  },
  sf = function (e, r) {
    ve.cache++,
      (r || !Xt) &&
        ve.forEach(function (t) {
          return At(t) && t.cacheID++ && (t.rec = 0);
        }),
      Jt(e) && (xe.history.scrollRestoration = Wa = e);
  },
  Xt,
  Ri = 0,
  $l,
  ah = function () {
    if ($l !== Ri) {
      var e = ($l = Ri);
      requestAnimationFrame(function () {
        return e === Ri && Ei(!0);
      });
    }
  },
  af = function () {
    Fe.appendChild(fn),
      (Va = (!Bt && fn.offsetHeight) || xe.innerHeight),
      Fe.removeChild(fn);
  },
  zl = function (e) {
    return ho(
      ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
    ).forEach(function (r) {
      return (r.style.display = e ? "none" : "block");
    });
  },
  Ei = function (e, r) {
    if (
      ((tr = Ge.documentElement),
      (Fe = Ge.body),
      (Xa = [xe, Ge, tr, Fe]),
      xr && !e && !as)
    ) {
      yt(we, "scrollEnd", nf);
      return;
    }
    af(),
      (Xt = we.isRefreshing = !0),
      ve.forEach(function (i) {
        return At(i) && ++i.cacheID && (i.rec = i());
      });
    var t = Wi("refreshInit");
    Uu && we.sort(),
      r || Ka(),
      ve.forEach(function (i) {
        At(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
      }),
      ye.slice(0).forEach(function (i) {
        return i.refresh();
      }),
      (as = !1),
      ye.forEach(function (i) {
        if (i._subPinOffset && i.pin) {
          var n = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
            o = i.pin[n];
          i.revert(!0, 1), i.adjustPinSpacing(i.pin[n] - o), i.refresh();
        }
      }),
      (na = 1),
      zl(!0),
      ye.forEach(function (i) {
        var n = Lr(i.scroller, i._dir),
          o = i.vars.end === "max" || (i._endClamp && i.end > n),
          s = i._startClamp && i.start >= n;
        (o || s) &&
          i.setPositions(
            s ? n - 1 : i.start,
            o ? Math.max(s ? n : i.start + 1, n) : i.end,
            !0
          );
      }),
      zl(!1),
      (na = 0),
      t.forEach(function (i) {
        return i && i.render && i.render(-1);
      }),
      ve.forEach(function (i) {
        At(i) &&
          (i.smooth &&
            requestAnimationFrame(function () {
              return (i.target.style.scrollBehavior = "smooth");
            }),
          i.rec && i(i.rec));
      }),
      sf(Wa, 1),
      ss.pause(),
      Ri++,
      (Xt = 2),
      qr(2),
      ye.forEach(function (i) {
        return At(i.vars.onRefresh) && i.vars.onRefresh(i);
      }),
      (Xt = we.isRefreshing = !1),
      Wi("refresh");
  },
  sa = 0,
  Qo = 1,
  ro,
  qr = function (e) {
    if (e === 2 || (!Xt && !as)) {
      (we.isUpdating = !0), ro && ro.update(0);
      var r = ye.length,
        t = Rt(),
        i = t - Ds >= 50,
        n = r && ye[0].scroll();
      if (
        ((Qo = sa > n ? -1 : 1),
        Xt || (sa = n),
        i &&
          (xr && !bs && t - xr > 200 && ((xr = 0), Wi("scrollEnd")),
          (Fn = Ds),
          (Ds = t)),
        Qo < 0)
      ) {
        for (Yt = r; Yt-- > 0; ) ye[Yt] && ye[Yt].update(0, i);
        Qo = 1;
      } else for (Yt = 0; Yt < r; Yt++) ye[Yt] && ye[Yt].update(0, i);
      we.isUpdating = !1;
    }
    po = 0;
  },
  aa = [
    ef,
    tf,
    Ua,
    Ha,
    pr + to,
    pr + Zn,
    pr + eo,
    pr + Jn,
    "display",
    "flexShrink",
    "float",
    "zIndex",
    "gridColumnStart",
    "gridColumnEnd",
    "gridRowStart",
    "gridRowEnd",
    "gridArea",
    "justifySelf",
    "alignSelf",
    "placeSelf",
    "order",
  ],
  jo = aa.concat([
    Di,
    Oi,
    "boxSizing",
    "max" + vn,
    "max" + Ga,
    "position",
    pr,
    at,
    at + eo,
    at + Zn,
    at + to,
    at + Jn,
  ]),
  lh = function (e, r, t) {
    cn(t);
    var i = e._gsap;
    if (i.spacerIsNative) cn(i.spacerState);
    else if (e._gsap.swappedIn) {
      var n = r.parentNode;
      n && (n.insertBefore(e, r), n.removeChild(r));
    }
    e._gsap.swappedIn = !1;
  },
  As = function (e, r, t, i) {
    if (!e._gsap.swappedIn) {
      for (var n = aa.length, o = r.style, s = e.style, u; n--; )
        (u = aa[n]), (o[u] = t[u]);
      (o.position = t.position === "absolute" ? "absolute" : "relative"),
        t.display === "inline" && (o.display = "inline-block"),
        (s[Ua] = s[Ha] = "auto"),
        (o.flexBasis = t.flexBasis || "auto"),
        (o.overflow = "visible"),
        (o.boxSizing = "border-box"),
        (o[Di] = ls(e, Wt) + ct),
        (o[Oi] = ls(e, pt) + ct),
        (o[at] = s[pr] = s[tf] = s[ef] = "0"),
        cn(i),
        (s[Di] = s["max" + vn] = t[Di]),
        (s[Oi] = s["max" + Ga] = t[Oi]),
        (s[at] = t[at]),
        e.parentNode !== r &&
          (e.parentNode.insertBefore(r, e), r.appendChild(e)),
        (e._gsap.swappedIn = !0);
    }
  },
  uh = /([A-Z])/g,
  cn = function (e) {
    if (e) {
      var r = e.t.style,
        t = e.length,
        i = 0,
        n,
        o;
      for ((e.t._gsap || Q.core.getCache(e.t)).uncache = 1; i < t; i += 2)
        (o = e[i + 1]),
          (n = e[i]),
          o
            ? (r[n] = o)
            : r[n] && r.removeProperty(n.replace(uh, "-$1").toLowerCase());
    }
  },
  Yo = function (e) {
    for (var r = jo.length, t = e.style, i = [], n = 0; n < r; n++)
      i.push(jo[n], t[jo[n]]);
    return (i.t = e), i;
  },
  fh = function (e, r, t) {
    for (var i = [], n = e.length, o = t ? 8 : 0, s; o < n; o += 2)
      (s = e[o]), i.push(s, s in r ? r[s] : e[o + 1]);
    return (i.t = e.t), i;
  },
  Zo = { left: 0, top: 0 },
  Bl = function (e, r, t, i, n, o, s, u, f, c, h, d, l, _) {
    At(e) && (e = e(u)),
      Jt(e) &&
        e.substr(0, 3) === "max" &&
        (e = d + (e.charAt(4) === "=" ? qo("0" + e.substr(3), t) : 0));
    var p = l ? l.time() : 0,
      m,
      T,
      S;
    if ((l && l.seek(0), isNaN(e) || (e = +e), zn(e)))
      l &&
        (e = Q.utils.mapRange(
          l.scrollTrigger.start,
          l.scrollTrigger.end,
          0,
          d,
          e
        )),
        s && Ko(s, t, i, !0);
    else {
      At(r) && (r = r(u));
      var M = (e || "0").split(" "),
        w,
        v,
        O,
        P;
      (S = Ut(r, u) || Fe),
        (w = Wr(S) || {}),
        (!w || (!w.left && !w.top)) &&
          _r(S).display === "none" &&
          ((P = S.style.display),
          (S.style.display = "block"),
          (w = Wr(S)),
          P ? (S.style.display = P) : S.style.removeProperty("display")),
        (v = qo(M[0], w[i.d])),
        (O = qo(M[1] || "0", t)),
        (e = w[i.p] - f[i.p] - c + v + n - O),
        s && Ko(s, O, i, t - O < 20 || (s._isStart && O > 20)),
        (t -= t - O);
    }
    if ((_ && ((u[_] = e || -0.001), e < 0 && (e = 0)), o)) {
      var k = e + t,
        R = o._isStart;
      (m = "scroll" + i.d2),
        Ko(
          o,
          k,
          i,
          (R && k > 20) ||
            (!R && (h ? Math.max(Fe[m], tr[m]) : o.parentNode[m]) <= k + 1)
        ),
        h &&
          ((f = Wr(s)),
          h && (o.style[i.op.p] = f[i.op.p] - i.op.m - o._offset + ct));
    }
    return (
      l &&
        S &&
        ((m = Wr(S)),
        l.seek(d),
        (T = Wr(S)),
        (l._caScrollDist = m[i.p] - T[i.p]),
        (e = (e / l._caScrollDist) * d)),
      l && l.seek(p),
      l ? e : Math.round(e)
    );
  },
  ch = /(webkit|moz|length|cssText|inset)/i,
  Yl = function (e, r, t, i) {
    if (e.parentNode !== r) {
      var n = e.style,
        o,
        s;
      if (r === Fe) {
        (e._stOrig = n.cssText), (s = _r(e));
        for (o in s)
          !+o &&
            !ch.test(o) &&
            s[o] &&
            typeof n[o] == "string" &&
            o !== "0" &&
            (n[o] = s[o]);
        (n.top = t), (n.left = i);
      } else n.cssText = e._stOrig;
      (Q.core.getCache(e).uncache = 1), r.appendChild(e);
    }
  },
  lf = function (e, r, t) {
    var i = r,
      n = i;
    return function (o) {
      var s = Math.round(e());
      return (
        s !== i &&
          s !== n &&
          Math.abs(s - i) > 3 &&
          Math.abs(s - n) > 3 &&
          ((o = s), t && t()),
        (n = i),
        (i = Math.round(o)),
        i
      );
    };
  },
  Xo = function (e, r, t) {
    var i = {};
    (i[r.p] = "+=" + t), Q.set(e, i);
  },
  Xl = function (e, r) {
    var t = pi(e, r),
      i = "_scroll" + r.p2,
      n = function o(s, u, f, c, h) {
        var d = o.tween,
          l = u.onComplete,
          _ = {};
        f = f || t();
        var p = lf(t, f, function () {
          d.kill(), (o.tween = 0);
        });
        return (
          (h = (c && h) || 0),
          (c = c || s - f),
          d && d.kill(),
          (u[i] = s),
          (u.inherit = !1),
          (u.modifiers = _),
          (_[i] = function () {
            return p(f + c * d.ratio + h * d.ratio * d.ratio);
          }),
          (u.onUpdate = function () {
            ve.cache++, o.tween && qr();
          }),
          (u.onComplete = function () {
            (o.tween = 0), l && l.call(d);
          }),
          (d = o.tween = Q.to(e, u)),
          d
        );
      };
    return (
      (e[i] = t),
      (t.wheelHandler = function () {
        return n.tween && n.tween.kill() && (n.tween = 0);
      }),
      yt(e, "wheel", t.wheelHandler),
      we.isTouch && yt(e, "touchmove", t.wheelHandler),
      n
    );
  },
  we = (function () {
    function a(r, t) {
      en ||
        a.register(Q) ||
        console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        ia(this),
        this.init(r, t);
    }
    var e = a.prototype;
    return (
      (e.init = function (t, i) {
        if (
          ((this.progress = this.start = 0),
          this.vars && this.kill(!0, !0),
          !In)
        ) {
          this.update = this.refresh = this.kill = Mr;
          return;
        }
        t = Nl(Jt(t) || zn(t) || t.nodeType ? { trigger: t } : t, zo);
        var n = t,
          o = n.onUpdate,
          s = n.toggleClass,
          u = n.id,
          f = n.onToggle,
          c = n.onRefresh,
          h = n.scrub,
          d = n.trigger,
          l = n.pin,
          _ = n.pinSpacing,
          p = n.invalidateOnRefresh,
          m = n.anticipatePin,
          T = n.onScrubComplete,
          S = n.onSnapComplete,
          M = n.once,
          w = n.snap,
          v = n.pinReparent,
          O = n.pinSpacer,
          P = n.containerAnimation,
          k = n.fastScrollEnd,
          R = n.preventOverlaps,
          L =
            t.horizontal || (t.containerAnimation && t.horizontal !== !1)
              ? Wt
              : pt,
          Y = !h && h !== 0,
          A = Ut(t.scroller || xe),
          F = Q.core.getCache(A),
          V = Yi(A),
          J =
            ("pinType" in t
              ? t.pinType
              : fi(A, "pinType") || (V && "fixed")) === "fixed",
          U = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
          X = Y && t.toggleActions.split(" "),
          oe = "markers" in t ? t.markers : zo.markers,
          te = V ? 0 : parseFloat(_r(A)["border" + L.p2 + vn]) || 0,
          y = this,
          Z =
            t.onRefreshInit &&
            function () {
              return t.onRefreshInit(y);
            },
          ee = th(A, V, L),
          fe = rh(A, V),
          ie = 0,
          Be = 0,
          De = 0,
          Ie = pi(A, L),
          be,
          je,
          ot,
          Ye,
          Ue,
          de,
          pe,
          ue,
          _t,
          C,
          ze,
          B,
          b,
          z,
          G,
          se,
          le,
          _e,
          Oe,
          ae,
          Ae,
          Ee,
          ge,
          et,
          K,
          ur,
          vt,
          gt,
          Ft,
          Ht,
          wt,
          ne,
          kt,
          Le,
          Ce,
          Xe,
          Et,
          q,
          g;
        if (
          ((y._startClamp = y._endClamp = !1),
          (y._dir = L),
          (m *= 45),
          (y.scroller = A),
          (y.scroll = P ? P.time.bind(P) : Ie),
          (Ye = Ie()),
          (y.vars = t),
          (i = i || t.animation),
          "refreshPriority" in t &&
            ((Uu = 1), t.refreshPriority === -9999 && (ro = y)),
          (F.tweenScroll = F.tweenScroll || {
            top: Xl(A, pt),
            left: Xl(A, Wt),
          }),
          (y.tweenTo = be = F.tweenScroll[L.p]),
          (y.scrubDuration = function (D) {
            (kt = zn(D) && D),
              kt
                ? ne
                  ? ne.duration(D)
                  : (ne = Q.to(i, {
                      ease: "expo",
                      totalProgress: "+=0",
                      inherit: !1,
                      duration: kt,
                      paused: !0,
                      onComplete: function () {
                        return T && T(y);
                      },
                    }))
                : (ne && ne.progress(1).kill(), (ne = 0));
          }),
          i &&
            ((i.vars.lazy = !1),
            (i._initted && !y.isReverted) ||
              (i.vars.immediateRender !== !1 &&
                t.immediateRender !== !1 &&
                i.duration() &&
                i.render(0, !0, !0)),
            (y.animation = i.pause()),
            (i.scrollTrigger = y),
            y.scrubDuration(h),
            (Ht = 0),
            u || (u = i.vars.id)),
          w &&
            ((!Ci(w) || w.push) && (w = { snapTo: w }),
            "scrollBehavior" in Fe.style &&
              Q.set(V ? [Fe, tr] : A, { scrollBehavior: "auto" }),
            ve.forEach(function (D) {
              return (
                At(D) &&
                D.target === (V ? Ge.scrollingElement || tr : A) &&
                (D.smooth = !1)
              );
            }),
            (ot = At(w.snapTo)
              ? w.snapTo
              : w.snapTo === "labels"
              ? nh(i)
              : w.snapTo === "labelsDirectional"
              ? oh(i)
              : w.directional !== !1
              ? function (D, W) {
                  return qa(w.snapTo)(D, Rt() - Be < 500 ? 0 : W.direction);
                }
              : Q.utils.snap(w.snapTo)),
            (Le = w.duration || { min: 0.1, max: 2 }),
            (Le = Ci(Le) ? jn(Le.min, Le.max) : jn(Le, Le)),
            (Ce = Q.delayedCall(w.delay || kt / 2 || 0.1, function () {
              var D = Ie(),
                W = Rt() - Be < 500,
                I = be.tween;
              if (
                (W || Math.abs(y.getVelocity()) < 10) &&
                !I &&
                !bs &&
                ie !== D
              ) {
                var H = (D - de) / z,
                  re = i && !Y ? i.totalProgress() : H,
                  j = W ? 0 : ((re - wt) / (Rt() - Fn)) * 1e3 || 0,
                  he = Q.utils.clamp(-H, 1 - H, (Gi(j / 2) * j) / 0.185),
                  Me = H + (w.inertia === !1 ? 0 : he),
                  Re,
                  Te,
                  Se = w,
                  $e = Se.onStart,
                  ce = Se.onInterrupt,
                  bt = Se.onComplete;
                if (
                  ((Re = ot(Me, y)),
                  zn(Re) || (Re = Me),
                  (Te = Math.max(0, Math.round(de + Re * z))),
                  D <= pe && D >= de && Te !== D)
                ) {
                  if (I && !I._initted && I.data <= Gi(Te - D)) return;
                  w.inertia === !1 && (he = Re - H),
                    be(
                      Te,
                      {
                        duration: Le(
                          Gi(
                            (Math.max(Gi(Me - re), Gi(Re - re)) * 0.185) /
                              j /
                              0.05 || 0
                          )
                        ),
                        ease: w.ease || "power3",
                        data: Gi(Te - D),
                        onInterrupt: function () {
                          return Ce.restart(!0) && ce && ce(y);
                        },
                        onComplete: function () {
                          y.update(),
                            (ie = Ie()),
                            i &&
                              !Y &&
                              (ne
                                ? ne.resetTo(
                                    "totalProgress",
                                    Re,
                                    i._tTime / i._tDur
                                  )
                                : i.progress(Re)),
                            (Ht = wt =
                              i && !Y ? i.totalProgress() : y.progress),
                            S && S(y),
                            bt && bt(y);
                        },
                      },
                      D,
                      he * z,
                      Te - D - he * z
                    ),
                    $e && $e(y, be.tween);
                }
              } else y.isActive && ie !== D && Ce.restart(!0);
            }).pause())),
          u && (oa[u] = y),
          (d = y.trigger = Ut(d || (l !== !0 && l))),
          (g = d && d._gsap && d._gsap.stRevert),
          g && (g = g(y)),
          (l = l === !0 ? d : Ut(l)),
          Jt(s) && (s = { targets: d, className: s }),
          l &&
            (_ === !1 ||
              _ === pr ||
              (_ =
                !_ &&
                l.parentNode &&
                l.parentNode.style &&
                _r(l.parentNode).display === "flex"
                  ? !1
                  : at),
            (y.pin = l),
            (je = Q.core.getCache(l)),
            je.spacer
              ? (G = je.pinState)
              : (O &&
                  ((O = Ut(O)),
                  O && !O.nodeType && (O = O.current || O.nativeElement),
                  (je.spacerIsNative = !!O),
                  O && (je.spacerState = Yo(O))),
                (je.spacer = _e = O || Ge.createElement("div")),
                _e.classList.add("pin-spacer"),
                u && _e.classList.add("pin-spacer-" + u),
                (je.pinState = G = Yo(l))),
            t.force3D !== !1 && Q.set(l, { force3D: !0 }),
            (y.spacer = _e = je.spacer),
            (Ft = _r(l)),
            (et = Ft[_ + L.os2]),
            (ae = Q.getProperty(l)),
            (Ae = Q.quickSetter(l, L.a, ct)),
            As(l, _e, Ft),
            (le = Yo(l))),
          oe)
        ) {
          (B = Ci(oe) ? Nl(oe, Fl) : Fl),
            (C = Bo("scroller-start", u, A, L, B, 0)),
            (ze = Bo("scroller-end", u, A, L, B, 0, C)),
            (Oe = C["offset" + L.op.d2]);
          var N = Ut(fi(A, "content") || A);
          (ue = this.markerStart = Bo("start", u, N, L, B, Oe, 0, P)),
            (_t = this.markerEnd = Bo("end", u, N, L, B, Oe, 0, P)),
            P && (q = Q.quickSetter([ue, _t], L.a, ct)),
            !J &&
              !(Fr.length && fi(A, "fixedMarkers") === !0) &&
              (ih(V ? Fe : A),
              Q.set([C, ze], { force3D: !0 }),
              (ur = Q.quickSetter(C, L.a, ct)),
              (gt = Q.quickSetter(ze, L.a, ct)));
        }
        if (P) {
          var x = P.vars.onUpdate,
            E = P.vars.onUpdateParams;
          P.eventCallback("onUpdate", function () {
            y.update(0, 0, 1), x && x.apply(P, E || []);
          });
        }
        if (
          ((y.previous = function () {
            return ye[ye.indexOf(y) - 1];
          }),
          (y.next = function () {
            return ye[ye.indexOf(y) + 1];
          }),
          (y.revert = function (D, W) {
            if (!W) return y.kill(!0);
            var I = D !== !1 || !y.enabled,
              H = Ot;
            I !== y.isReverted &&
              (I &&
                ((Xe = Math.max(Ie(), y.scroll.rec || 0)),
                (De = y.progress),
                (Et = i && i.progress())),
              ue &&
                [ue, _t, C, ze].forEach(function (re) {
                  return (re.style.display = I ? "none" : "block");
                }),
              I && ((Ot = y), y.update(I)),
              l &&
                (!v || !y.isActive) &&
                (I ? lh(l, _e, G) : As(l, _e, _r(l), K)),
              I || y.update(I),
              (Ot = H),
              (y.isReverted = I));
          }),
          (y.refresh = function (D, W, I, H) {
            if (!((Ot || !y.enabled) && !W)) {
              if (l && D && xr) {
                yt(a, "scrollEnd", nf);
                return;
              }
              !Xt && Z && Z(y),
                (Ot = y),
                be.tween && !I && (be.tween.kill(), (be.tween = 0)),
                ne && ne.pause(),
                p &&
                  i &&
                  (i.revert({ kill: !1 }).invalidate(),
                  i.getChildren &&
                    i.getChildren(!0, !0, !1).forEach(function (jr) {
                      return jr.vars.immediateRender && jr.render(0, !0, !0);
                    })),
                y.isReverted || y.revert(!0, !0),
                (y._subPinOffset = !1);
              var re = ee(),
                j = fe(),
                he = P ? P.duration() : Lr(A, L),
                Me = z <= 0.01 || !z,
                Re = 0,
                Te = H || 0,
                Se = Ci(I) ? I.end : t.end,
                $e = t.endTrigger || d,
                ce = Ci(I)
                  ? I.start
                  : t.start || (t.start === 0 || !d ? 0 : l ? "0 0" : "0 100%"),
                bt = (y.pinnedContainer =
                  t.pinnedContainer && Ut(t.pinnedContainer, y)),
                Ze = (d && Math.max(0, ye.indexOf(y))) || 0,
                Tt = Ze,
                St,
                Mt,
                yi,
                Eo,
                Dt,
                ft,
                kr,
                ks,
                bl,
                En,
                Er,
                Mn,
                Mo;
              for (
                oe &&
                Ci(I) &&
                ((Mn = Q.getProperty(C, L.p)), (Mo = Q.getProperty(ze, L.p)));
                Tt-- > 0;

              )
                (ft = ye[Tt]),
                  ft.end || ft.refresh(0, 1) || (Ot = y),
                  (kr = ft.pin),
                  kr &&
                    (kr === d || kr === l || kr === bt) &&
                    !ft.isReverted &&
                    (En || (En = []), En.unshift(ft), ft.revert(!0, !0)),
                  ft !== ye[Tt] && (Ze--, Tt--);
              for (
                At(ce) && (ce = ce(y)),
                  ce = Ol(ce, "start", y),
                  de =
                    Bl(
                      ce,
                      d,
                      re,
                      L,
                      Ie(),
                      ue,
                      C,
                      y,
                      j,
                      te,
                      J,
                      he,
                      P,
                      y._startClamp && "_startClamp"
                    ) || (l ? -0.001 : 0),
                  At(Se) && (Se = Se(y)),
                  Jt(Se) &&
                    !Se.indexOf("+=") &&
                    (~Se.indexOf(" ")
                      ? (Se = (Jt(ce) ? ce.split(" ")[0] : "") + Se)
                      : ((Re = qo(Se.substr(2), re)),
                        (Se = Jt(ce)
                          ? ce
                          : (P
                              ? Q.utils.mapRange(
                                  0,
                                  P.duration(),
                                  P.scrollTrigger.start,
                                  P.scrollTrigger.end,
                                  de
                                )
                              : de) + Re),
                        ($e = d))),
                  Se = Ol(Se, "end", y),
                  pe =
                    Math.max(
                      de,
                      Bl(
                        Se || ($e ? "100% 0" : he),
                        $e,
                        re,
                        L,
                        Ie() + Re,
                        _t,
                        ze,
                        y,
                        j,
                        te,
                        J,
                        he,
                        P,
                        y._endClamp && "_endClamp"
                      )
                    ) || -0.001,
                  Re = 0,
                  Tt = Ze;
                Tt--;

              )
                (ft = ye[Tt]),
                  (kr = ft.pin),
                  kr &&
                    ft.start - ft._pinPush <= de &&
                    !P &&
                    ft.end > 0 &&
                    ((St =
                      ft.end -
                      (y._startClamp ? Math.max(0, ft.start) : ft.start)),
                    ((kr === d && ft.start - ft._pinPush < de) || kr === bt) &&
                      isNaN(ce) &&
                      (Re += St * (1 - ft.progress)),
                    kr === l && (Te += St));
              if (
                ((de += Re),
                (pe += Re),
                y._startClamp && (y._startClamp += Re),
                y._endClamp &&
                  !Xt &&
                  ((y._endClamp = pe || -0.001), (pe = Math.min(pe, Lr(A, L)))),
                (z = pe - de || ((de -= 0.01) && 0.001)),
                Me && (De = Q.utils.clamp(0, 1, Q.utils.normalize(de, pe, Xe))),
                (y._pinPush = Te),
                ue &&
                  Re &&
                  ((St = {}),
                  (St[L.a] = "+=" + Re),
                  bt && (St[L.p] = "-=" + Ie()),
                  Q.set([ue, _t], St)),
                l && !(na && y.end >= Lr(A, L)))
              )
                (St = _r(l)),
                  (Eo = L === pt),
                  (yi = Ie()),
                  (Ee = parseFloat(ae(L.a)) + Te),
                  !he &&
                    pe > 1 &&
                    ((Er = (V ? Ge.scrollingElement || tr : A).style),
                    (Er = {
                      style: Er,
                      value: Er["overflow" + L.a.toUpperCase()],
                    }),
                    V &&
                      _r(Fe)["overflow" + L.a.toUpperCase()] !== "scroll" &&
                      (Er.style["overflow" + L.a.toUpperCase()] = "scroll")),
                  As(l, _e, St),
                  (le = Yo(l)),
                  (Mt = Wr(l, !0)),
                  (ks = J && pi(A, Eo ? Wt : pt)()),
                  _
                    ? ((K = [_ + L.os2, z + Te + ct]),
                      (K.t = _e),
                      (Tt = _ === at ? ls(l, L) + z + Te : 0),
                      Tt &&
                        (K.push(L.d, Tt + ct),
                        _e.style.flexBasis !== "auto" &&
                          (_e.style.flexBasis = Tt + ct)),
                      cn(K),
                      bt &&
                        ye.forEach(function (jr) {
                          jr.pin === bt &&
                            jr.vars.pinSpacing !== !1 &&
                            (jr._subPinOffset = !0);
                        }),
                      J && Ie(Xe))
                    : ((Tt = ls(l, L)),
                      Tt &&
                        _e.style.flexBasis !== "auto" &&
                        (_e.style.flexBasis = Tt + ct)),
                  J &&
                    ((Dt = {
                      top: Mt.top + (Eo ? yi - de : ks) + ct,
                      left: Mt.left + (Eo ? ks : yi - de) + ct,
                      boxSizing: "border-box",
                      position: "fixed",
                    }),
                    (Dt[Di] = Dt["max" + vn] = Math.ceil(Mt.width) + ct),
                    (Dt[Oi] = Dt["max" + Ga] = Math.ceil(Mt.height) + ct),
                    (Dt[pr] =
                      Dt[pr + eo] =
                      Dt[pr + Zn] =
                      Dt[pr + to] =
                      Dt[pr + Jn] =
                        "0"),
                    (Dt[at] = St[at]),
                    (Dt[at + eo] = St[at + eo]),
                    (Dt[at + Zn] = St[at + Zn]),
                    (Dt[at + to] = St[at + to]),
                    (Dt[at + Jn] = St[at + Jn]),
                    (se = fh(G, Dt, v)),
                    Xt && Ie(0)),
                  i
                    ? ((bl = i._initted),
                      Es(1),
                      i.render(i.duration(), !0, !0),
                      (ge = ae(L.a) - Ee + z + Te),
                      (vt = Math.abs(z - ge) > 1),
                      J && vt && se.splice(se.length - 2, 2),
                      i.render(0, !0, !0),
                      bl || i.invalidate(!0),
                      i.parent || i.totalTime(i.totalTime()),
                      Es(0))
                    : (ge = z),
                  Er &&
                    (Er.value
                      ? (Er.style["overflow" + L.a.toUpperCase()] = Er.value)
                      : Er.style.removeProperty("overflow-" + L.a));
              else if (d && Ie() && !P)
                for (Mt = d.parentNode; Mt && Mt !== Fe; )
                  Mt._pinOffset &&
                    ((de -= Mt._pinOffset), (pe -= Mt._pinOffset)),
                    (Mt = Mt.parentNode);
              En &&
                En.forEach(function (jr) {
                  return jr.revert(!1, !0);
                }),
                (y.start = de),
                (y.end = pe),
                (Ye = Ue = Xt ? Xe : Ie()),
                !P && !Xt && (Ye < Xe && Ie(Xe), (y.scroll.rec = 0)),
                y.revert(!1, !0),
                (Be = Rt()),
                Ce && ((ie = -1), Ce.restart(!0)),
                (Ot = 0),
                i &&
                  Y &&
                  (i._initted || Et) &&
                  i.progress() !== Et &&
                  i.progress(Et || 0, !0).render(i.time(), !0, !0),
                (Me || De !== y.progress || P || p || (i && !i._initted)) &&
                  (i &&
                    !Y &&
                    (i._initted || De || i.vars.immediateRender !== !1) &&
                    i.totalProgress(
                      P && de < -0.001 && !De
                        ? Q.utils.normalize(de, pe, 0)
                        : De,
                      !0
                    ),
                  (y.progress = Me || (Ye - de) / z === De ? 0 : De)),
                l && _ && (_e._pinOffset = Math.round(y.progress * ge)),
                ne && ne.invalidate(),
                isNaN(Mn) ||
                  ((Mn -= Q.getProperty(C, L.p)),
                  (Mo -= Q.getProperty(ze, L.p)),
                  Xo(C, L, Mn),
                  Xo(ue, L, Mn - (H || 0)),
                  Xo(ze, L, Mo),
                  Xo(_t, L, Mo - (H || 0))),
                Me && !Xt && y.update(),
                c && !Xt && !b && ((b = !0), c(y), (b = !1));
            }
          }),
          (y.getVelocity = function () {
            return ((Ie() - Ue) / (Rt() - Fn)) * 1e3 || 0;
          }),
          (y.endAnimation = function () {
            On(y.callbackAnimation),
              i &&
                (ne
                  ? ne.progress(1)
                  : i.paused()
                  ? Y || On(i, y.direction < 0, 1)
                  : On(i, i.reversed()));
          }),
          (y.labelToScroll = function (D) {
            return (
              (i &&
                i.labels &&
                (de || y.refresh() || de) + (i.labels[D] / i.duration()) * z) ||
              0
            );
          }),
          (y.getTrailing = function (D) {
            var W = ye.indexOf(y),
              I = y.direction > 0 ? ye.slice(0, W).reverse() : ye.slice(W + 1);
            return (
              Jt(D)
                ? I.filter(function (H) {
                    return H.vars.preventOverlaps === D;
                  })
                : I
            ).filter(function (H) {
              return y.direction > 0 ? H.end <= de : H.start >= pe;
            });
          }),
          (y.update = function (D, W, I) {
            if (!(P && !I && !D)) {
              var H = Xt === !0 ? Xe : y.scroll(),
                re = D ? 0 : (H - de) / z,
                j = re < 0 ? 0 : re > 1 ? 1 : re || 0,
                he = y.progress,
                Me,
                Re,
                Te,
                Se,
                $e,
                ce,
                bt,
                Ze;
              if (
                (W &&
                  ((Ue = Ye),
                  (Ye = P ? Ie() : H),
                  w && ((wt = Ht), (Ht = i && !Y ? i.totalProgress() : j))),
                m &&
                  l &&
                  !Ot &&
                  !No &&
                  xr &&
                  (!j && de < H + ((H - Ue) / (Rt() - Fn)) * m
                    ? (j = 1e-4)
                    : j === 1 &&
                      pe > H + ((H - Ue) / (Rt() - Fn)) * m &&
                      (j = 0.9999)),
                j !== he && y.enabled)
              ) {
                if (
                  ((Me = y.isActive = !!j && j < 1),
                  (Re = !!he && he < 1),
                  (ce = Me !== Re),
                  ($e = ce || !!j != !!he),
                  (y.direction = j > he ? 1 : -1),
                  (y.progress = j),
                  $e &&
                    !Ot &&
                    ((Te = j && !he ? 0 : j === 1 ? 1 : he === 1 ? 2 : 3),
                    Y &&
                      ((Se =
                        (!ce && X[Te + 1] !== "none" && X[Te + 1]) || X[Te]),
                      (Ze =
                        i &&
                        (Se === "complete" || Se === "reset" || Se in i)))),
                  R &&
                    (ce || Ze) &&
                    (Ze || h || !i) &&
                    (At(R)
                      ? R(y)
                      : y.getTrailing(R).forEach(function (yi) {
                          return yi.endAnimation();
                        })),
                  Y ||
                    (ne && !Ot && !No
                      ? (ne._dp._time - ne._start !== ne._time &&
                          ne.render(ne._dp._time - ne._start),
                        ne.resetTo
                          ? ne.resetTo("totalProgress", j, i._tTime / i._tDur)
                          : ((ne.vars.totalProgress = j),
                            ne.invalidate().restart()))
                      : i && i.totalProgress(j, !!(Ot && (Be || D)))),
                  l)
                ) {
                  if ((D && _ && (_e.style[_ + L.os2] = et), !J))
                    Ae($n(Ee + ge * j));
                  else if ($e) {
                    if (
                      ((bt = !D && j > he && pe + 1 > H && H + 1 >= Lr(A, L)),
                      v)
                    )
                      if (!D && (Me || bt)) {
                        var Tt = Wr(l, !0),
                          St = H - de;
                        Yl(
                          l,
                          Fe,
                          Tt.top + (L === pt ? St : 0) + ct,
                          Tt.left + (L === pt ? 0 : St) + ct
                        );
                      } else Yl(l, _e);
                    cn(Me || bt ? se : le),
                      (vt && j < 1 && Me) || Ae(Ee + (j === 1 && !bt ? ge : 0));
                  }
                }
                w && !be.tween && !Ot && !No && Ce.restart(!0),
                  s &&
                    (ce || (M && j && (j < 1 || !Ms))) &&
                    ho(s.targets).forEach(function (yi) {
                      return yi.classList[Me || M ? "add" : "remove"](
                        s.className
                      );
                    }),
                  o && !Y && !D && o(y),
                  $e && !Ot
                    ? (Y &&
                        (Ze &&
                          (Se === "complete"
                            ? i.pause().totalProgress(1)
                            : Se === "reset"
                            ? i.restart(!0).pause()
                            : Se === "restart"
                            ? i.restart(!0)
                            : i[Se]()),
                        o && o(y)),
                      (ce || !Ms) &&
                        (f && ce && Os(y, f),
                        U[Te] && Os(y, U[Te]),
                        M && (j === 1 ? y.kill(!1, 1) : (U[Te] = 0)),
                        ce || ((Te = j === 1 ? 1 : 3), U[Te] && Os(y, U[Te]))),
                      k &&
                        !Me &&
                        Math.abs(y.getVelocity()) > (zn(k) ? k : 2500) &&
                        (On(y.callbackAnimation),
                        ne
                          ? ne.progress(1)
                          : On(i, Se === "reverse" ? 1 : !j, 1)))
                    : Y && o && !Ot && o(y);
              }
              if (gt) {
                var Mt = P ? (H / P.duration()) * (P._caScrollDist || 0) : H;
                ur(Mt + (C._isFlipped ? 1 : 0)), gt(Mt);
              }
              q && q((-H / P.duration()) * (P._caScrollDist || 0));
            }
          }),
          (y.enable = function (D, W) {
            y.enabled ||
              ((y.enabled = !0),
              yt(A, "resize", Bn),
              V || yt(A, "scroll", qi),
              Z && yt(a, "refreshInit", Z),
              D !== !1 && ((y.progress = De = 0), (Ye = Ue = ie = Ie())),
              W !== !1 && y.refresh());
          }),
          (y.getTween = function (D) {
            return D && be ? be.tween : ne;
          }),
          (y.setPositions = function (D, W, I, H) {
            if (P) {
              var re = P.scrollTrigger,
                j = P.duration(),
                he = re.end - re.start;
              (D = re.start + (he * D) / j), (W = re.start + (he * W) / j);
            }
            y.refresh(
              !1,
              !1,
              {
                start: Rl(D, I && !!y._startClamp),
                end: Rl(W, I && !!y._endClamp),
              },
              H
            ),
              y.update();
          }),
          (y.adjustPinSpacing = function (D) {
            if (K && D) {
              var W = K.indexOf(L.d) + 1;
              (K[W] = parseFloat(K[W]) + D + ct),
                (K[1] = parseFloat(K[1]) + D + ct),
                cn(K);
            }
          }),
          (y.disable = function (D, W) {
            if (
              y.enabled &&
              (D !== !1 && y.revert(!0, !0),
              (y.enabled = y.isActive = !1),
              W || (ne && ne.pause()),
              (Xe = 0),
              je && (je.uncache = 1),
              Z && mt(a, "refreshInit", Z),
              Ce && (Ce.pause(), be.tween && be.tween.kill() && (be.tween = 0)),
              !V)
            ) {
              for (var I = ye.length; I--; )
                if (ye[I].scroller === A && ye[I] !== y) return;
              mt(A, "resize", Bn), V || mt(A, "scroll", qi);
            }
          }),
          (y.kill = function (D, W) {
            y.disable(D, W), ne && !W && ne.kill(), u && delete oa[u];
            var I = ye.indexOf(y);
            I >= 0 && ye.splice(I, 1),
              I === Yt && Qo > 0 && Yt--,
              (I = 0),
              ye.forEach(function (H) {
                return H.scroller === y.scroller && (I = 1);
              }),
              I || Xt || (y.scroll.rec = 0),
              i &&
                ((i.scrollTrigger = null),
                D && i.revert({ kill: !1 }),
                W || i.kill()),
              ue &&
                [ue, _t, C, ze].forEach(function (H) {
                  return H.parentNode && H.parentNode.removeChild(H);
                }),
              ro === y && (ro = 0),
              l &&
                (je && (je.uncache = 1),
                (I = 0),
                ye.forEach(function (H) {
                  return H.pin === l && I++;
                }),
                I || (je.spacer = 0)),
              t.onKill && t.onKill(y);
          }),
          ye.push(y),
          y.enable(!1, !1),
          g && g(y),
          i && i.add && !z)
        ) {
          var $ = y.update;
          (y.update = function () {
            (y.update = $), ve.cache++, de || pe || y.refresh();
          }),
            Q.delayedCall(0.01, y.update),
            (z = 0.01),
            (de = pe = 0);
        } else y.refresh();
        l && ah();
      }),
      (a.register = function (t) {
        return (
          en ||
            ((Q = t || ju()), Qu() && window.document && a.enable(), (en = In)),
          en
        );
      }),
      (a.defaults = function (t) {
        if (t) for (var i in t) zo[i] = t[i];
        return zo;
      }),
      (a.disable = function (t, i) {
        (In = 0),
          ye.forEach(function (o) {
            return o[i ? "kill" : "disable"](t);
          }),
          mt(xe, "wheel", qi),
          mt(Ge, "scroll", qi),
          clearInterval(Lo),
          mt(Ge, "touchcancel", Mr),
          mt(Fe, "touchstart", Mr),
          Io(mt, Ge, "pointerdown,touchstart,mousedown", Al),
          Io(mt, Ge, "pointerup,touchend,mouseup", Ll),
          ss.kill(),
          Fo(mt);
        for (var n = 0; n < ve.length; n += 3)
          $o(mt, ve[n], ve[n + 1]), $o(mt, ve[n], ve[n + 2]);
      }),
      (a.enable = function () {
        if (
          ((xe = window),
          (Ge = document),
          (tr = Ge.documentElement),
          (Fe = Ge.body),
          Q &&
            ((ho = Q.utils.toArray),
            (jn = Q.utils.clamp),
            (ia = Q.core.context || Mr),
            (Es = Q.core.suppressOverwrites || Mr),
            (Wa = xe.history.scrollRestoration || "auto"),
            (sa = xe.pageYOffset || 0),
            Q.core.globals("ScrollTrigger", a),
            Fe))
        ) {
          (In = 1),
            (fn = document.createElement("div")),
            (fn.style.height = "100vh"),
            (fn.style.position = "absolute"),
            af(),
            eh(),
            it.register(Q),
            (a.isTouch = it.isTouch),
            (ti =
              it.isTouch &&
              /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            (ra = it.isTouch === 1),
            yt(xe, "wheel", qi),
            (Xa = [xe, Ge, tr, Fe]),
            Q.matchMedia
              ? ((a.matchMedia = function (f) {
                  var c = Q.matchMedia(),
                    h;
                  for (h in f) c.add(h, f[h]);
                  return c;
                }),
                Q.addEventListener("matchMediaInit", function () {
                  return Ka();
                }),
                Q.addEventListener("matchMediaRevert", function () {
                  return of();
                }),
                Q.addEventListener("matchMedia", function () {
                  Ei(0, 1), Wi("matchMedia");
                }),
                Q.matchMedia().add("(orientation: portrait)", function () {
                  return Rs(), Rs;
                }))
              : console.warn("Requires GSAP 3.11.0 or later"),
            Rs(),
            yt(Ge, "scroll", qi);
          var t = Fe.hasAttribute("style"),
            i = Fe.style,
            n = i.borderTopStyle,
            o = Q.core.Animation.prototype,
            s,
            u;
          for (
            o.revert ||
              Object.defineProperty(o, "revert", {
                value: function () {
                  return this.time(-0.01, !0);
                },
              }),
              i.borderTopStyle = "solid",
              s = Wr(Fe),
              pt.m = Math.round(s.top + pt.sc()) || 0,
              Wt.m = Math.round(s.left + Wt.sc()) || 0,
              n ? (i.borderTopStyle = n) : i.removeProperty("border-top-style"),
              t || (Fe.setAttribute("style", ""), Fe.removeAttribute("style")),
              Lo = setInterval(Il, 250),
              Q.delayedCall(0.5, function () {
                return (No = 0);
              }),
              yt(Ge, "touchcancel", Mr),
              yt(Fe, "touchstart", Mr),
              Io(yt, Ge, "pointerdown,touchstart,mousedown", Al),
              Io(yt, Ge, "pointerup,touchend,mouseup", Ll),
              ta = Q.utils.checkPrefix("transform"),
              jo.push(ta),
              en = Rt(),
              ss = Q.delayedCall(0.2, Ei).pause(),
              tn = [
                Ge,
                "visibilitychange",
                function () {
                  var f = xe.innerWidth,
                    c = xe.innerHeight;
                  Ge.hidden
                    ? ((Ml = f), (Dl = c))
                    : (Ml !== f || Dl !== c) && Bn();
                },
                Ge,
                "DOMContentLoaded",
                Ei,
                xe,
                "load",
                Ei,
                xe,
                "resize",
                Bn,
              ],
              Fo(yt),
              ye.forEach(function (f) {
                return f.enable(0, 1);
              }),
              u = 0;
            u < ve.length;
            u += 3
          )
            $o(mt, ve[u], ve[u + 1]), $o(mt, ve[u], ve[u + 2]);
        }
      }),
      (a.config = function (t) {
        "limitCallbacks" in t && (Ms = !!t.limitCallbacks);
        var i = t.syncInterval;
        (i && clearInterval(Lo)) || ((Lo = i) && setInterval(Il, i)),
          "ignoreMobileResize" in t &&
            (ra = a.isTouch === 1 && t.ignoreMobileResize),
          "autoRefreshEvents" in t &&
            (Fo(mt) || Fo(yt, t.autoRefreshEvents || "none"),
            (Gu = (t.autoRefreshEvents + "").indexOf("resize") === -1));
      }),
      (a.scrollerProxy = function (t, i) {
        var n = Ut(t),
          o = ve.indexOf(n),
          s = Yi(n);
        ~o && ve.splice(o, s ? 6 : 2),
          i && (s ? Fr.unshift(xe, i, Fe, i, tr, i) : Fr.unshift(n, i));
      }),
      (a.clearMatchMedia = function (t) {
        ye.forEach(function (i) {
          return i._ctx && i._ctx.query === t && i._ctx.kill(!0, !0);
        });
      }),
      (a.isInViewport = function (t, i, n) {
        var o = (Jt(t) ? Ut(t) : t).getBoundingClientRect(),
          s = o[n ? Di : Oi] * i || 0;
        return n
          ? o.right - s > 0 && o.left + s < xe.innerWidth
          : o.bottom - s > 0 && o.top + s < xe.innerHeight;
      }),
      (a.positionInViewport = function (t, i, n) {
        Jt(t) && (t = Ut(t));
        var o = t.getBoundingClientRect(),
          s = o[n ? Di : Oi],
          u =
            i == null
              ? s / 2
              : i in us
              ? us[i] * s
              : ~i.indexOf("%")
              ? (parseFloat(i) * s) / 100
              : parseFloat(i) || 0;
        return n ? (o.left + u) / xe.innerWidth : (o.top + u) / xe.innerHeight;
      }),
      (a.killAll = function (t) {
        if (
          (ye.slice(0).forEach(function (n) {
            return n.vars.id !== "ScrollSmoother" && n.kill();
          }),
          t !== !0)
        ) {
          var i = Xi.killAll || [];
          (Xi = {}),
            i.forEach(function (n) {
              return n();
            });
        }
      }),
      a
    );
  })();
we.version = "3.13.0";
we.saveStyles = function (a) {
  return a
    ? ho(a).forEach(function (e) {
        if (e && e.style) {
          var r = Zt.indexOf(e);
          r >= 0 && Zt.splice(r, 5),
            Zt.push(
              e,
              e.style.cssText,
              e.getBBox && e.getAttribute("transform"),
              Q.core.getCache(e),
              ia()
            );
        }
      })
    : Zt;
};
we.revert = function (a, e) {
  return Ka(!a, e);
};
we.create = function (a, e) {
  return new we(a, e);
};
we.refresh = function (a) {
  return a ? Bn(!0) : (en || we.register()) && Ei(!0);
};
we.update = function (a) {
  return ++ve.cache && qr(a === !0 ? 2 : 0);
};
we.clearScrollMemory = sf;
we.maxScroll = function (a, e) {
  return Lr(a, e ? Wt : pt);
};
we.getScrollFunc = function (a, e) {
  return pi(Ut(a), e ? Wt : pt);
};
we.getById = function (a) {
  return oa[a];
};
we.getAll = function () {
  return ye.filter(function (a) {
    return a.vars.id !== "ScrollSmoother";
  });
};
we.isScrolling = function () {
  return !!xr;
};
we.snapDirectional = qa;
we.addEventListener = function (a, e) {
  var r = Xi[a] || (Xi[a] = []);
  ~r.indexOf(e) || r.push(e);
};
we.removeEventListener = function (a, e) {
  var r = Xi[a],
    t = r && r.indexOf(e);
  t >= 0 && r.splice(t, 1);
};
we.batch = function (a, e) {
  var r = [],
    t = {},
    i = e.interval || 0.016,
    n = e.batchMax || 1e9,
    o = function (f, c) {
      var h = [],
        d = [],
        l = Q.delayedCall(i, function () {
          c(h, d), (h = []), (d = []);
        }).pause();
      return function (_) {
        h.length || l.restart(!0),
          h.push(_.trigger),
          d.push(_),
          n <= h.length && l.progress(1);
      };
    },
    s;
  for (s in e)
    t[s] =
      s.substr(0, 2) === "on" && At(e[s]) && s !== "onRefreshInit"
        ? o(s, e[s])
        : e[s];
  return (
    At(n) &&
      ((n = n()),
      yt(we, "refresh", function () {
        return (n = e.batchMax());
      })),
    ho(a).forEach(function (u) {
      var f = {};
      for (s in t) f[s] = t[s];
      (f.trigger = u), r.push(we.create(f));
    }),
    r
  );
};
var Wl = function (e, r, t, i) {
    return (
      r > i ? e(i) : r < 0 && e(0),
      t > i ? (i - r) / (t - r) : t < 0 ? r / (r - t) : 1
    );
  },
  Ls = function a(e, r) {
    r === !0
      ? e.style.removeProperty("touch-action")
      : (e.style.touchAction =
          r === !0
            ? "auto"
            : r
            ? "pan-" + r + (it.isTouch ? " pinch-zoom" : "")
            : "none"),
      e === tr && a(Fe, r);
  },
  Wo = { auto: 1, scroll: 1 },
  hh = function (e) {
    var r = e.event,
      t = e.target,
      i = e.axis,
      n = (r.changedTouches ? r.changedTouches[0] : r).target,
      o = n._gsap || Q.core.getCache(n),
      s = Rt(),
      u;
    if (!o._isScrollT || s - o._isScrollT > 2e3) {
      for (
        ;
        n &&
        n !== Fe &&
        ((n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth) ||
          !(Wo[(u = _r(n)).overflowY] || Wo[u.overflowX]));

      )
        n = n.parentNode;
      (o._isScroll =
        n &&
        n !== t &&
        !Yi(n) &&
        (Wo[(u = _r(n)).overflowY] || Wo[u.overflowX])),
        (o._isScrollT = s);
    }
    (o._isScroll || i === "x") && (r.stopPropagation(), (r._gsapAllow = !0));
  },
  uf = function (e, r, t, i) {
    return it.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: r,
      onWheel: (i = i && hh),
      onPress: i,
      onDrag: i,
      onScroll: i,
      onEnable: function () {
        return t && yt(Ge, it.eventTypes[0], Hl, !1, !0);
      },
      onDisable: function () {
        return mt(Ge, it.eventTypes[0], Hl, !0);
      },
    });
  },
  dh = /(input|label|select|textarea)/i,
  Vl,
  Hl = function (e) {
    var r = dh.test(e.target.tagName);
    (r || Vl) && ((e._gsapAllow = !0), (Vl = r));
  },
  ph = function (e) {
    Ci(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = "wheel,touch"),
      (e.debounce = !!e.debounce),
      (e.id = e.id || "normalizer");
    var r = e,
      t = r.normalizeScrollX,
      i = r.momentum,
      n = r.allowNestedScroll,
      o = r.onRelease,
      s,
      u,
      f = Ut(e.target) || tr,
      c = Q.core.globals().ScrollSmoother,
      h = c && c.get(),
      d =
        ti &&
        ((e.content && Ut(e.content)) ||
          (h && e.content !== !1 && !h.smooth() && h.content())),
      l = pi(f, pt),
      _ = pi(f, Wt),
      p = 1,
      m =
        (it.isTouch && xe.visualViewport
          ? xe.visualViewport.scale * xe.visualViewport.width
          : xe.outerWidth) / xe.innerWidth,
      T = 0,
      S = At(i)
        ? function () {
            return i(s);
          }
        : function () {
            return i || 2.8;
          },
      M,
      w,
      v = uf(f, e.type, !0, n),
      O = function () {
        return (w = !1);
      },
      P = Mr,
      k = Mr,
      R = function () {
        (u = Lr(f, pt)),
          (k = jn(ti ? 1 : 0, u)),
          t && (P = jn(0, Lr(f, Wt))),
          (M = Ri);
      },
      L = function () {
        (d._gsap.y = $n(parseFloat(d._gsap.y) + l.offset) + "px"),
          (d.style.transform =
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
            parseFloat(d._gsap.y) +
            ", 0, 1)"),
          (l.offset = l.cacheID = 0);
      },
      Y = function () {
        if (w) {
          requestAnimationFrame(O);
          var oe = $n(s.deltaY / 2),
            te = k(l.v - oe);
          if (d && te !== l.v + l.offset) {
            l.offset = te - l.v;
            var y = $n((parseFloat(d && d._gsap.y) || 0) - l.offset);
            (d.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
              y +
              ", 0, 1)"),
              (d._gsap.y = y + "px"),
              (l.cacheID = ve.cache),
              qr();
          }
          return !0;
        }
        l.offset && L(), (w = !0);
      },
      A,
      F,
      V,
      J,
      U = function () {
        R(),
          A.isActive() &&
            A.vars.scrollY > u &&
            (l() > u ? A.progress(1) && l(u) : A.resetTo("scrollY", u));
      };
    return (
      d && Q.set(d, { y: "+=0" }),
      (e.ignoreCheck = function (X) {
        return (
          (ti && X.type === "touchmove" && Y()) ||
          (p > 1.05 && X.type !== "touchstart") ||
          s.isGesturing ||
          (X.touches && X.touches.length > 1)
        );
      }),
      (e.onPress = function () {
        w = !1;
        var X = p;
        (p = $n(((xe.visualViewport && xe.visualViewport.scale) || 1) / m)),
          A.pause(),
          X !== p && Ls(f, p > 1.01 ? !0 : t ? !1 : "x"),
          (F = _()),
          (V = l()),
          R(),
          (M = Ri);
      }),
      (e.onRelease = e.onGestureStart =
        function (X, oe) {
          if ((l.offset && L(), !oe)) J.restart(!0);
          else {
            ve.cache++;
            var te = S(),
              y,
              Z;
            t &&
              ((y = _()),
              (Z = y + (te * 0.05 * -X.velocityX) / 0.227),
              (te *= Wl(_, y, Z, Lr(f, Wt))),
              (A.vars.scrollX = P(Z))),
              (y = l()),
              (Z = y + (te * 0.05 * -X.velocityY) / 0.227),
              (te *= Wl(l, y, Z, Lr(f, pt))),
              (A.vars.scrollY = k(Z)),
              A.invalidate().duration(te).play(0.01),
              ((ti && A.vars.scrollY >= u) || y >= u - 1) &&
                Q.to({}, { onUpdate: U, duration: te });
          }
          o && o(X);
        }),
      (e.onWheel = function () {
        A._ts && A.pause(), Rt() - T > 1e3 && ((M = 0), (T = Rt()));
      }),
      (e.onChange = function (X, oe, te, y, Z) {
        if (
          (Ri !== M && R(),
          oe && t && _(P(y[2] === oe ? F + (X.startX - X.x) : _() + oe - y[1])),
          te)
        ) {
          l.offset && L();
          var ee = Z[2] === te,
            fe = ee ? V + X.startY - X.y : l() + te - Z[1],
            ie = k(fe);
          ee && fe !== ie && (V += ie - fe), l(ie);
        }
        (te || oe) && qr();
      }),
      (e.onEnable = function () {
        Ls(f, t ? !1 : "x"),
          we.addEventListener("refresh", U),
          yt(xe, "resize", U),
          l.smooth &&
            ((l.target.style.scrollBehavior = "auto"),
            (l.smooth = _.smooth = !1)),
          v.enable();
      }),
      (e.onDisable = function () {
        Ls(f, !0),
          mt(xe, "resize", U),
          we.removeEventListener("refresh", U),
          v.kill();
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (s = new it(e)),
      (s.iOS = ti),
      ti && !l() && l(1),
      ti && Q.ticker.add(Mr),
      (J = s._dc),
      (A = Q.to(s, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: lf(l, l(), function () {
            return A.pause();
          }),
        },
        onUpdate: qr,
        onComplete: J.vars.onComplete,
      })),
      s
    );
  };
we.sort = function (a) {
  if (At(a)) return ye.sort(a);
  var e = xe.pageYOffset || 0;
  return (
    we.getAll().forEach(function (r) {
      return (r._sortY = r.trigger
        ? e + r.trigger.getBoundingClientRect().top
        : r.start + xe.innerHeight);
    }),
    ye.sort(
      a ||
        function (r, t) {
          return (
            (r.vars.refreshPriority || 0) * -1e6 +
            (r.vars.containerAnimation ? 1e6 : r._sortY) -
            ((t.vars.containerAnimation ? 1e6 : t._sortY) +
              (t.vars.refreshPriority || 0) * -1e6)
          );
        }
    )
  );
};
we.observe = function (a) {
  return new it(a);
};
we.normalizeScroll = function (a) {
  if (typeof a > "u") return Bt;
  if (a === !0 && Bt) return Bt.enable();
  if (a === !1) {
    Bt && Bt.kill(), (Bt = a);
    return;
  }
  var e = a instanceof it ? a : ph(a);
  return Bt && Bt.target === e.target && Bt.kill(), Yi(e.target) && (Bt = e), e;
};
we.core = {
  _getVelocityProp: ea,
  _inputObserver: uf,
  _scrollers: ve,
  _proxies: Fr,
  bridge: {
    ss: function () {
      xr || Wi("scrollStart"), (xr = Rt());
    },
    ref: function () {
      return Ot;
    },
  },
};
ju() && Q.registerPlugin(we);
function Br(a) {
  if (a === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return a;
}
function ff(a, e) {
  (a.prototype = Object.create(e.prototype)),
    (a.prototype.constructor = a),
    (a.__proto__ = e);
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var sr = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: { lineHeight: "" },
  },
  wn = { duration: 0.5, overwrite: !1, delay: 0 },
  Qa,
  Pt,
  qe,
  gr = 1e8,
  He = 1 / gr,
  la = Math.PI * 2,
  _h = la / 4,
  gh = 0,
  cf = Math.sqrt,
  mh = Math.cos,
  yh = Math.sin,
  xt = function (e) {
    return typeof e == "string";
  },
  Je = function (e) {
    return typeof e == "function";
  },
  Kr = function (e) {
    return typeof e == "number";
  },
  ja = function (e) {
    return typeof e > "u";
  },
  Ir = function (e) {
    return typeof e == "object";
  },
  Gt = function (e) {
    return e !== !1;
  },
  Za = function () {
    return typeof window < "u";
  },
  Vo = function (e) {
    return Je(e) || xt(e);
  },
  hf =
    (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
  Nt = Array.isArray,
  ua = /(?:-?\.?\d|\.)+/gi,
  df = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  on = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  Ns = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  pf = /[+-]=-?[.\d]+/,
  _f = /[^,'"\[\]\s]+/gi,
  xh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  Ke,
  Dr,
  fa,
  Ja,
  ar = {},
  fs = {},
  gf,
  mf = function (e) {
    return (fs = bn(e, ar)) && jt;
  },
  el = function (e, r) {
    return console.warn(
      "Invalid property",
      e,
      "set to",
      r,
      "Missing plugin? gsap.registerPlugin()"
    );
  },
  _o = function (e, r) {
    return !r && console.warn(e);
  },
  yf = function (e, r) {
    return (e && (ar[e] = r) && fs && (fs[e] = r)) || ar;
  },
  go = function () {
    return 0;
  },
  vh = { suppressEvents: !0, isStart: !0, kill: !1 },
  Jo = { suppressEvents: !0, kill: !1 },
  wh = { suppressEvents: !0 },
  tl = {},
  ci = [],
  ca = {},
  xf,
  er = {},
  Fs = {},
  Ul = 30,
  es = [],
  rl = "",
  il = function (e) {
    var r = e[0],
      t,
      i;
    if ((Ir(r) || Je(r) || (e = [e]), !(t = (r._gsap || {}).harness))) {
      for (i = es.length; i-- && !es[i].targetTest(r); );
      t = es[i];
    }
    for (i = e.length; i--; )
      (e[i] && (e[i]._gsap || (e[i]._gsap = new Wf(e[i], t)))) ||
        e.splice(i, 1);
    return e;
  },
  Ai = function (e) {
    return e._gsap || il(mr(e))[0]._gsap;
  },
  vf = function (e, r, t) {
    return (t = e[r]) && Je(t)
      ? e[r]()
      : (ja(t) && e.getAttribute && e.getAttribute(r)) || t;
  },
  qt = function (e, r) {
    return (e = e.split(",")).forEach(r) || e;
  },
  rt = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  ut = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  hn = function (e, r) {
    var t = r.charAt(0),
      i = parseFloat(r.substr(2));
    return (
      (e = parseFloat(e)),
      t === "+" ? e + i : t === "-" ? e - i : t === "*" ? e * i : e / i
    );
  },
  bh = function (e, r) {
    for (var t = r.length, i = 0; e.indexOf(r[i]) < 0 && ++i < t; );
    return i < t;
  },
  cs = function () {
    var e = ci.length,
      r = ci.slice(0),
      t,
      i;
    for (ca = {}, ci.length = 0, t = 0; t < e; t++)
      (i = r[t]),
        i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
  },
  nl = function (e) {
    return !!(e._initted || e._startAt || e.add);
  },
  wf = function (e, r, t, i) {
    ci.length && !Pt && cs(),
      e.render(r, t, !!(Pt && r < 0 && nl(e))),
      ci.length && !Pt && cs();
  },
  bf = function (e) {
    var r = parseFloat(e);
    return (r || r === 0) && (e + "").match(_f).length < 2
      ? r
      : xt(e)
      ? e.trim()
      : e;
  },
  Tf = function (e) {
    return e;
  },
  lr = function (e, r) {
    for (var t in r) t in e || (e[t] = r[t]);
    return e;
  },
  Th = function (e) {
    return function (r, t) {
      for (var i in t)
        i in r || (i === "duration" && e) || i === "ease" || (r[i] = t[i]);
    };
  },
  bn = function (e, r) {
    for (var t in r) e[t] = r[t];
    return e;
  },
  Gl = function a(e, r) {
    for (var t in r)
      t !== "__proto__" &&
        t !== "constructor" &&
        t !== "prototype" &&
        (e[t] = Ir(r[t]) ? a(e[t] || (e[t] = {}), r[t]) : r[t]);
    return e;
  },
  hs = function (e, r) {
    var t = {},
      i;
    for (i in e) i in r || (t[i] = e[i]);
    return t;
  },
  io = function (e) {
    var r = e.parent || Ke,
      t = e.keyframes ? Th(Nt(e.keyframes)) : lr;
    if (Gt(e.inherit))
      for (; r; ) t(e, r.vars.defaults), (r = r.parent || r._dp);
    return e;
  },
  Sh = function (e, r) {
    for (var t = e.length, i = t === r.length; i && t-- && e[t] === r[t]; );
    return t < 0;
  },
  Sf = function (e, r, t, i, n) {
    var o = e[i],
      s;
    if (n) for (s = r[n]; o && o[n] > s; ) o = o._prev;
    return (
      o ? ((r._next = o._next), (o._next = r)) : ((r._next = e[t]), (e[t] = r)),
      r._next ? (r._next._prev = r) : (e[i] = r),
      (r._prev = o),
      (r.parent = r._dp = e),
      r
    );
  },
  Ts = function (e, r, t, i) {
    t === void 0 && (t = "_first"), i === void 0 && (i = "_last");
    var n = r._prev,
      o = r._next;
    n ? (n._next = o) : e[t] === r && (e[t] = o),
      o ? (o._prev = n) : e[i] === r && (e[i] = n),
      (r._next = r._prev = r.parent = null);
  },
  _i = function (e, r) {
    e.parent &&
      (!r || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0);
  },
  Li = function (e, r) {
    if (e && (!r || r._end > e._dur || r._start < 0))
      for (var t = e; t; ) (t._dirty = 1), (t = t.parent);
    return e;
  },
  Ch = function (e) {
    for (var r = e.parent; r && r.parent; )
      (r._dirty = 1), r.totalDuration(), (r = r.parent);
    return e;
  },
  ha = function (e, r, t, i) {
    return (
      e._startAt &&
      (Pt
        ? e._startAt.revert(Jo)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(r, !0, i))
    );
  },
  Ph = function a(e) {
    return !e || (e._ts && a(e.parent));
  },
  ql = function (e) {
    return e._repeat ? Tn(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  Tn = function (e, r) {
    var t = Math.floor((e = ut(e / r)));
    return e && t === e ? t - 1 : t;
  },
  ds = function (e, r) {
    return (
      (e - r._start) * r._ts +
      (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur)
    );
  },
  Ss = function (e) {
    return (e._end = ut(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || He) || 0)
    ));
  },
  Cs = function (e, r) {
    var t = e._dp;
    return (
      t &&
        t.smoothChildTiming &&
        e._ts &&
        ((e._start = ut(
          t._time -
            (e._ts > 0
              ? r / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)
        )),
        Ss(e),
        t._dirty || Li(t, e)),
      e
    );
  },
  Cf = function (e, r) {
    var t;
    if (
      ((r._time ||
        (!r._dur && r._initted) ||
        (r._start < e._time && (r._dur || !r.add))) &&
        ((t = ds(e.rawTime(), r)),
        (!r._dur || Co(0, r.totalDuration(), t) - r._tTime > He) &&
          r.render(t, !0)),
      Li(e, r)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (t = e; t._dp; )
          t.rawTime() >= 0 && t.totalTime(t._tTime), (t = t._dp);
      e._zTime = -He;
    }
  },
  Ar = function (e, r, t, i) {
    return (
      r.parent && _i(r),
      (r._start = ut(
        (Kr(t) ? t : t || e !== Ke ? hr(e, t, r) : e._time) + r._delay
      )),
      (r._end = ut(
        r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)
      )),
      Sf(e, r, "_first", "_last", e._sort ? "_start" : 0),
      da(r) || (e._recent = r),
      i || Cf(e, r),
      e._ts < 0 && Cs(e, e._tTime),
      e
    );
  },
  Pf = function (e, r) {
    return (
      (ar.ScrollTrigger || el("scrollTrigger", r)) &&
      ar.ScrollTrigger.create(r, e)
    );
  },
  kf = function (e, r, t, i, n) {
    if ((sl(e, r, n), !e._initted)) return 1;
    if (
      !t &&
      e._pt &&
      !Pt &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      xf !== ir.frame
    )
      return ci.push(e), (e._lazy = [n, i]), 1;
  },
  kh = function a(e) {
    var r = e.parent;
    return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || a(r));
  },
  da = function (e) {
    var r = e.data;
    return r === "isFromStart" || r === "isStart";
  },
  Eh = function (e, r, t, i) {
    var n = e.ratio,
      o =
        r < 0 ||
        (!r &&
          ((!e._start && kh(e) && !(!e._initted && da(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !da(e))))
          ? 0
          : 1,
      s = e._rDelay,
      u = 0,
      f,
      c,
      h;
    if (
      (s &&
        e._repeat &&
        ((u = Co(0, e._tDur, r)),
        (c = Tn(u, s)),
        e._yoyo && c & 1 && (o = 1 - o),
        c !== Tn(e._tTime, s) &&
          ((n = 1 - o), e.vars.repeatRefresh && e._initted && e.invalidate())),
      o !== n || Pt || i || e._zTime === He || (!r && e._zTime))
    ) {
      if (!e._initted && kf(e, r, i, t, u)) return;
      for (
        h = e._zTime,
          e._zTime = r || (t ? He : 0),
          t || (t = r && !h),
          e.ratio = o,
          e._from && (o = 1 - o),
          e._time = 0,
          e._tTime = u,
          f = e._pt;
        f;

      )
        f.r(o, f.d), (f = f._next);
      r < 0 && ha(e, r, t, !0),
        e._onUpdate && !t && or(e, "onUpdate"),
        u && e._repeat && !t && e.parent && or(e, "onRepeat"),
        (r >= e._tDur || r < 0) &&
          e.ratio === o &&
          (o && _i(e, 1),
          !t &&
            !Pt &&
            (or(e, o ? "onComplete" : "onReverseComplete", !0),
            e._prom && e._prom()));
    } else e._zTime || (e._zTime = r);
  },
  Mh = function (e, r, t) {
    var i;
    if (t > r)
      for (i = e._first; i && i._start <= t; ) {
        if (i.data === "isPause" && i._start > r) return i;
        i = i._next;
      }
    else
      for (i = e._last; i && i._start >= t; ) {
        if (i.data === "isPause" && i._start < r) return i;
        i = i._prev;
      }
  },
  Sn = function (e, r, t, i) {
    var n = e._repeat,
      o = ut(r) || 0,
      s = e._tTime / e._tDur;
    return (
      s && !i && (e._time *= o / e._dur),
      (e._dur = o),
      (e._tDur = n ? (n < 0 ? 1e10 : ut(o * (n + 1) + e._rDelay * n)) : o),
      s > 0 && !i && Cs(e, (e._tTime = e._tDur * s)),
      e.parent && Ss(e),
      t || Li(e.parent, e),
      e
    );
  },
  Kl = function (e) {
    return e instanceof Vt ? Li(e) : Sn(e, e._dur);
  },
  Dh = { _start: 0, endTime: go, totalDuration: go },
  hr = function a(e, r, t) {
    var i = e.labels,
      n = e._recent || Dh,
      o = e.duration() >= gr ? n.endTime(!1) : e._dur,
      s,
      u,
      f;
    return xt(r) && (isNaN(r) || r in i)
      ? ((u = r.charAt(0)),
        (f = r.substr(-1) === "%"),
        (s = r.indexOf("=")),
        u === "<" || u === ">"
          ? (s >= 0 && (r = r.replace(/=/, "")),
            (u === "<" ? n._start : n.endTime(n._repeat >= 0)) +
              (parseFloat(r.substr(1)) || 0) *
                (f ? (s < 0 ? n : t).totalDuration() / 100 : 1))
          : s < 0
          ? (r in i || (i[r] = o), i[r])
          : ((u = parseFloat(r.charAt(s - 1) + r.substr(s + 1))),
            f && t && (u = (u / 100) * (Nt(t) ? t[0] : t).totalDuration()),
            s > 1 ? a(e, r.substr(0, s - 1), t) + u : o + u))
      : r == null
      ? o
      : +r;
  },
  no = function (e, r, t) {
    var i = Kr(r[1]),
      n = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      o = r[n],
      s,
      u;
    if ((i && (o.duration = r[1]), (o.parent = t), e)) {
      for (s = o, u = t; u && !("immediateRender" in s); )
        (s = u.vars.defaults || {}), (u = Gt(u.vars.inherit) && u.parent);
      (o.immediateRender = Gt(s.immediateRender)),
        e < 2 ? (o.runBackwards = 1) : (o.startAt = r[n - 1]);
    }
    return new lt(r[0], o, r[n + 1]);
  },
  mi = function (e, r) {
    return e || e === 0 ? r(e) : r;
  },
  Co = function (e, r, t) {
    return t < e ? e : t > r ? r : t;
  },
  Lt = function (e, r) {
    return !xt(e) || !(r = xh.exec(e)) ? "" : r[1];
  },
  Oh = function (e, r, t) {
    return mi(t, function (i) {
      return Co(e, r, i);
    });
  },
  pa = [].slice,
  Ef = function (e, r) {
    return (
      e &&
      Ir(e) &&
      "length" in e &&
      ((!r && !e.length) || (e.length - 1 in e && Ir(e[0]))) &&
      !e.nodeType &&
      e !== Dr
    );
  },
  Rh = function (e, r, t) {
    return (
      t === void 0 && (t = []),
      e.forEach(function (i) {
        var n;
        return (xt(i) && !r) || Ef(i, 1)
          ? (n = t).push.apply(n, mr(i))
          : t.push(i);
      }) || t
    );
  },
  mr = function (e, r, t) {
    return qe && !r && qe.selector
      ? qe.selector(e)
      : xt(e) && !t && (fa || !Cn())
      ? pa.call((r || Ja).querySelectorAll(e), 0)
      : Nt(e)
      ? Rh(e, t)
      : Ef(e)
      ? pa.call(e, 0)
      : e
      ? [e]
      : [];
  },
  _a = function (e) {
    return (
      (e = mr(e)[0] || _o("Invalid scope") || {}),
      function (r) {
        var t = e.current || e.nativeElement || e;
        return mr(
          r,
          t.querySelectorAll
            ? t
            : t === e
            ? _o("Invalid scope") || Ja.createElement("div")
            : e
        );
      }
    );
  },
  Mf = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  Df = function (e) {
    if (Je(e)) return e;
    var r = Ir(e) ? e : { each: e },
      t = Ni(r.ease),
      i = r.from || 0,
      n = parseFloat(r.base) || 0,
      o = {},
      s = i > 0 && i < 1,
      u = isNaN(i) || s,
      f = r.axis,
      c = i,
      h = i;
    return (
      xt(i)
        ? (c = h = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
        : !s && u && ((c = i[0]), (h = i[1])),
      function (d, l, _) {
        var p = (_ || r).length,
          m = o[p],
          T,
          S,
          M,
          w,
          v,
          O,
          P,
          k,
          R;
        if (!m) {
          if (((R = r.grid === "auto" ? 0 : (r.grid || [1, gr])[1]), !R)) {
            for (
              P = -gr;
              P < (P = _[R++].getBoundingClientRect().left) && R < p;

            );
            R < p && R--;
          }
          for (
            m = o[p] = [],
              T = u ? Math.min(R, p) * c - 0.5 : i % R,
              S = R === gr ? 0 : u ? (p * h) / R - 0.5 : (i / R) | 0,
              P = 0,
              k = gr,
              O = 0;
            O < p;
            O++
          )
            (M = (O % R) - T),
              (w = S - ((O / R) | 0)),
              (m[O] = v = f ? Math.abs(f === "y" ? w : M) : cf(M * M + w * w)),
              v > P && (P = v),
              v < k && (k = v);
          i === "random" && Mf(m),
            (m.max = P - k),
            (m.min = k),
            (m.v = p =
              (parseFloat(r.amount) ||
                parseFloat(r.each) *
                  (R > p
                    ? p - 1
                    : f
                    ? f === "y"
                      ? p / R
                      : R
                    : Math.max(R, p / R)) ||
                0) * (i === "edges" ? -1 : 1)),
            (m.b = p < 0 ? n - p : n),
            (m.u = Lt(r.amount || r.each) || 0),
            (t = t && p < 0 ? Bf(t) : t);
        }
        return (
          (p = (m[d] - m.min) / m.max || 0),
          ut(m.b + (t ? t(p) : p) * m.v) + m.u
        );
      }
    );
  },
  ga = function (e) {
    var r = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function (t) {
      var i = ut(Math.round(parseFloat(t) / e) * e * r);
      return (i - (i % 1)) / r + (Kr(t) ? 0 : Lt(t));
    };
  },
  Of = function (e, r) {
    var t = Nt(e),
      i,
      n;
    return (
      !t &&
        Ir(e) &&
        ((i = t = e.radius || gr),
        e.values
          ? ((e = mr(e.values)), (n = !Kr(e[0])) && (i *= i))
          : (e = ga(e.increment))),
      mi(
        r,
        t
          ? Je(e)
            ? function (o) {
                return (n = e(o)), Math.abs(n - o) <= i ? n : o;
              }
            : function (o) {
                for (
                  var s = parseFloat(n ? o.x : o),
                    u = parseFloat(n ? o.y : 0),
                    f = gr,
                    c = 0,
                    h = e.length,
                    d,
                    l;
                  h--;

                )
                  n
                    ? ((d = e[h].x - s), (l = e[h].y - u), (d = d * d + l * l))
                    : (d = Math.abs(e[h] - s)),
                    d < f && ((f = d), (c = h));
                return (
                  (c = !i || f <= i ? e[c] : o),
                  n || c === o || Kr(o) ? c : c + Lt(o)
                );
              }
          : ga(e)
      )
    );
  },
  Rf = function (e, r, t, i) {
    return mi(Nt(e) ? !r : t === !0 ? !!(t = 0) : !i, function () {
      return Nt(e)
        ? e[~~(Math.random() * e.length)]
        : (t = t || 1e-5) &&
            (i = t < 1 ? Math.pow(10, (t + "").length - 2) : 1) &&
            Math.floor(
              Math.round((e - t / 2 + Math.random() * (r - e + t * 0.99)) / t) *
                t *
                i
            ) / i;
    });
  },
  Ah = function () {
    for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
      r[t] = arguments[t];
    return function (i) {
      return r.reduce(function (n, o) {
        return o(n);
      }, i);
    };
  },
  Lh = function (e, r) {
    return function (t) {
      return e(parseFloat(t)) + (r || Lt(t));
    };
  },
  Nh = function (e, r, t) {
    return Lf(e, r, 0, 1, t);
  },
  Af = function (e, r, t) {
    return mi(t, function (i) {
      return e[~~r(i)];
    });
  },
  Fh = function a(e, r, t) {
    var i = r - e;
    return Nt(e)
      ? Af(e, a(0, e.length), r)
      : mi(t, function (n) {
          return ((i + ((n - e) % i)) % i) + e;
        });
  },
  Ih = function a(e, r, t) {
    var i = r - e,
      n = i * 2;
    return Nt(e)
      ? Af(e, a(0, e.length - 1), r)
      : mi(t, function (o) {
          return (o = (n + ((o - e) % n)) % n || 0), e + (o > i ? n - o : o);
        });
  },
  mo = function (e) {
    for (var r = 0, t = "", i, n, o, s; ~(i = e.indexOf("random(", r)); )
      (o = e.indexOf(")", i)),
        (s = e.charAt(i + 7) === "["),
        (n = e.substr(i + 7, o - i - 7).match(s ? _f : ua)),
        (t +=
          e.substr(r, i - r) + Rf(s ? n : +n[0], s ? 0 : +n[1], +n[2] || 1e-5)),
        (r = o + 1);
    return t + e.substr(r, e.length - r);
  },
  Lf = function (e, r, t, i, n) {
    var o = r - e,
      s = i - t;
    return mi(n, function (u) {
      return t + (((u - e) / o) * s || 0);
    });
  },
  $h = function a(e, r, t, i) {
    var n = isNaN(e + r)
      ? 0
      : function (l) {
          return (1 - l) * e + l * r;
        };
    if (!n) {
      var o = xt(e),
        s = {},
        u,
        f,
        c,
        h,
        d;
      if ((t === !0 && (i = 1) && (t = null), o))
        (e = { p: e }), (r = { p: r });
      else if (Nt(e) && !Nt(r)) {
        for (c = [], h = e.length, d = h - 2, f = 1; f < h; f++)
          c.push(a(e[f - 1], e[f]));
        h--,
          (n = function (_) {
            _ *= h;
            var p = Math.min(d, ~~_);
            return c[p](_ - p);
          }),
          (t = r);
      } else i || (e = bn(Nt(e) ? [] : {}, e));
      if (!c) {
        for (u in r) ol.call(s, e, u, "get", r[u]);
        n = function (_) {
          return ul(_, s) || (o ? e.p : e);
        };
      }
    }
    return mi(t, n);
  },
  Ql = function (e, r, t) {
    var i = e.labels,
      n = gr,
      o,
      s,
      u;
    for (o in i)
      (s = i[o] - r),
        s < 0 == !!t && s && n > (s = Math.abs(s)) && ((u = o), (n = s));
    return u;
  },
  or = function (e, r, t) {
    var i = e.vars,
      n = i[r],
      o = qe,
      s = e._ctx,
      u,
      f,
      c;
    if (n)
      return (
        (u = i[r + "Params"]),
        (f = i.callbackScope || e),
        t && ci.length && cs(),
        s && (qe = s),
        (c = u ? n.apply(f, u) : n.call(f)),
        (qe = o),
        c
      );
  },
  Yn = function (e) {
    return (
      _i(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!Pt),
      e.progress() < 1 && or(e, "onInterrupt"),
      e
    );
  },
  sn,
  Nf = [],
  Ff = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), Za() || e.headless)) {
        var r = e.name,
          t = Je(e),
          i =
            r && !t && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          n = {
            init: go,
            render: ul,
            add: ol,
            kill: ed,
            modifier: Jh,
            rawVars: 0,
          },
          o = {
            targetTest: 0,
            get: 0,
            getSetter: ll,
            aliases: {},
            register: 0,
          };
        if ((Cn(), e !== i)) {
          if (er[r]) return;
          lr(i, lr(hs(e, n), o)),
            bn(i.prototype, bn(n, hs(e, o))),
            (er[(i.prop = r)] = i),
            e.targetTest && (es.push(i), (tl[r] = 1)),
            (r =
              (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) +
              "Plugin");
        }
        yf(r, i), e.register && e.register(jt, i, Kt);
      } else Nf.push(e);
  },
  We = 255,
  Xn = {
    aqua: [0, We, We],
    lime: [0, We, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, We],
    navy: [0, 0, 128],
    white: [We, We, We],
    olive: [128, 128, 0],
    yellow: [We, We, 0],
    orange: [We, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [We, 0, 0],
    pink: [We, 192, 203],
    cyan: [0, We, We],
    transparent: [We, We, We, 0],
  },
  Is = function (e, r, t) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? r + (t - r) * e * 6
        : e < 0.5
        ? t
        : e * 3 < 2
        ? r + (t - r) * (2 / 3 - e) * 6
        : r) *
        We +
        0.5) |
        0
    );
  },
  If = function (e, r, t) {
    var i = e ? (Kr(e) ? [e >> 16, (e >> 8) & We, e & We] : 0) : Xn.black,
      n,
      o,
      s,
      u,
      f,
      c,
      h,
      d,
      l,
      _;
    if (!i) {
      if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Xn[e]))
        i = Xn[e];
      else if (e.charAt(0) === "#") {
        if (
          (e.length < 6 &&
            ((n = e.charAt(1)),
            (o = e.charAt(2)),
            (s = e.charAt(3)),
            (e =
              "#" +
              n +
              n +
              o +
              o +
              s +
              s +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
          e.length === 9)
        )
          return (
            (i = parseInt(e.substr(1, 6), 16)),
            [i >> 16, (i >> 8) & We, i & We, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (i = [e >> 16, (e >> 8) & We, e & We]);
      } else if (e.substr(0, 3) === "hsl") {
        if (((i = _ = e.match(ua)), !r))
          (u = (+i[0] % 360) / 360),
            (f = +i[1] / 100),
            (c = +i[2] / 100),
            (o = c <= 0.5 ? c * (f + 1) : c + f - c * f),
            (n = c * 2 - o),
            i.length > 3 && (i[3] *= 1),
            (i[0] = Is(u + 1 / 3, n, o)),
            (i[1] = Is(u, n, o)),
            (i[2] = Is(u - 1 / 3, n, o));
        else if (~e.indexOf("="))
          return (i = e.match(df)), t && i.length < 4 && (i[3] = 1), i;
      } else i = e.match(ua) || Xn.transparent;
      i = i.map(Number);
    }
    return (
      r &&
        !_ &&
        ((n = i[0] / We),
        (o = i[1] / We),
        (s = i[2] / We),
        (h = Math.max(n, o, s)),
        (d = Math.min(n, o, s)),
        (c = (h + d) / 2),
        h === d
          ? (u = f = 0)
          : ((l = h - d),
            (f = c > 0.5 ? l / (2 - h - d) : l / (h + d)),
            (u =
              h === n
                ? (o - s) / l + (o < s ? 6 : 0)
                : h === o
                ? (s - n) / l + 2
                : (n - o) / l + 4),
            (u *= 60)),
        (i[0] = ~~(u + 0.5)),
        (i[1] = ~~(f * 100 + 0.5)),
        (i[2] = ~~(c * 100 + 0.5))),
      t && i.length < 4 && (i[3] = 1),
      i
    );
  },
  $f = function (e) {
    var r = [],
      t = [],
      i = -1;
    return (
      e.split(hi).forEach(function (n) {
        var o = n.match(on) || [];
        r.push.apply(r, o), t.push((i += o.length + 1));
      }),
      (r.c = t),
      r
    );
  },
  jl = function (e, r, t) {
    var i = "",
      n = (e + i).match(hi),
      o = r ? "hsla(" : "rgba(",
      s = 0,
      u,
      f,
      c,
      h;
    if (!n) return e;
    if (
      ((n = n.map(function (d) {
        return (
          (d = If(d, r, 1)) &&
          o +
            (r ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) +
            ")"
        );
      })),
      t && ((c = $f(e)), (u = t.c), u.join(i) !== c.c.join(i)))
    )
      for (f = e.replace(hi, "1").split(on), h = f.length - 1; s < h; s++)
        i +=
          f[s] +
          (~u.indexOf(s)
            ? n.shift() || o + "0,0,0,0)"
            : (c.length ? c : n.length ? n : t).shift());
    if (!f)
      for (f = e.split(hi), h = f.length - 1; s < h; s++) i += f[s] + n[s];
    return i + f[h];
  },
  hi = (function () {
    var a =
        "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      e;
    for (e in Xn) a += "|" + e + "\\b";
    return new RegExp(a + ")", "gi");
  })(),
  zh = /hsl[a]?\(/,
  zf = function (e) {
    var r = e.join(" "),
      t;
    if (((hi.lastIndex = 0), hi.test(r)))
      return (
        (t = zh.test(r)),
        (e[1] = jl(e[1], t)),
        (e[0] = jl(e[0], t, $f(e[1]))),
        !0
      );
  },
  yo,
  ir = (function () {
    var a = Date.now,
      e = 500,
      r = 33,
      t = a(),
      i = t,
      n = 1e3 / 240,
      o = n,
      s = [],
      u,
      f,
      c,
      h,
      d,
      l,
      _ = function p(m) {
        var T = a() - i,
          S = m === !0,
          M,
          w,
          v,
          O;
        if (
          ((T > e || T < 0) && (t += T - r),
          (i += T),
          (v = i - t),
          (M = v - o),
          (M > 0 || S) &&
            ((O = ++h.frame),
            (d = v - h.time * 1e3),
            (h.time = v = v / 1e3),
            (o += M + (M >= n ? 4 : n - M)),
            (w = 1)),
          S || (u = f(p)),
          w)
        )
          for (l = 0; l < s.length; l++) s[l](v, d, O, m);
      };
    return (
      (h = {
        time: 0,
        frame: 0,
        tick: function () {
          _(!0);
        },
        deltaRatio: function (m) {
          return d / (1e3 / (m || 60));
        },
        wake: function () {
          gf &&
            (!fa &&
              Za() &&
              ((Dr = fa = window),
              (Ja = Dr.document || {}),
              (ar.gsap = jt),
              (Dr.gsapVersions || (Dr.gsapVersions = [])).push(jt.version),
              mf(fs || Dr.GreenSockGlobals || (!Dr.gsap && Dr) || {}),
              Nf.forEach(Ff)),
            (c = typeof requestAnimationFrame < "u" && requestAnimationFrame),
            u && h.sleep(),
            (f =
              c ||
              function (m) {
                return setTimeout(m, (o - h.time * 1e3 + 1) | 0);
              }),
            (yo = 1),
            _(2));
        },
        sleep: function () {
          (c ? cancelAnimationFrame : clearTimeout)(u), (yo = 0), (f = go);
        },
        lagSmoothing: function (m, T) {
          (e = m || 1 / 0), (r = Math.min(T || 33, e));
        },
        fps: function (m) {
          (n = 1e3 / (m || 240)), (o = h.time * 1e3 + n);
        },
        add: function (m, T, S) {
          var M = T
            ? function (w, v, O, P) {
                m(w, v, O, P), h.remove(M);
              }
            : m;
          return h.remove(m), s[S ? "unshift" : "push"](M), Cn(), M;
        },
        remove: function (m, T) {
          ~(T = s.indexOf(m)) && s.splice(T, 1) && l >= T && l--;
        },
        _listeners: s,
      }),
      h
    );
  })(),
  Cn = function () {
    return !yo && ir.wake();
  },
  ke = {},
  Bh = /^[\d.\-M][\d.\-,\s]/,
  Yh = /["']/g,
  Xh = function (e) {
    for (
      var r = {},
        t = e.substr(1, e.length - 3).split(":"),
        i = t[0],
        n = 1,
        o = t.length,
        s,
        u,
        f;
      n < o;
      n++
    )
      (u = t[n]),
        (s = n !== o - 1 ? u.lastIndexOf(",") : u.length),
        (f = u.substr(0, s)),
        (r[i] = isNaN(f) ? f.replace(Yh, "").trim() : +f),
        (i = u.substr(s + 1).trim());
    return r;
  },
  Wh = function (e) {
    var r = e.indexOf("(") + 1,
      t = e.indexOf(")"),
      i = e.indexOf("(", r);
    return e.substring(r, ~i && i < t ? e.indexOf(")", t + 1) : t);
  },
  Vh = function (e) {
    var r = (e + "").split("("),
      t = ke[r[0]];
    return t && r.length > 1 && t.config
      ? t.config.apply(
          null,
          ~e.indexOf("{") ? [Xh(r[1])] : Wh(e).split(",").map(bf)
        )
      : ke._CE && Bh.test(e)
      ? ke._CE("", e)
      : t;
  },
  Bf = function (e) {
    return function (r) {
      return 1 - e(1 - r);
    };
  },
  Yf = function a(e, r) {
    for (var t = e._first, i; t; )
      t instanceof Vt
        ? a(t, r)
        : t.vars.yoyoEase &&
          (!t._yoyo || !t._repeat) &&
          t._yoyo !== r &&
          (t.timeline
            ? a(t.timeline, r)
            : ((i = t._ease),
              (t._ease = t._yEase),
              (t._yEase = i),
              (t._yoyo = r))),
        (t = t._next);
  },
  Ni = function (e, r) {
    return (e && (Je(e) ? e : ke[e] || Vh(e))) || r;
  },
  Ui = function (e, r, t, i) {
    t === void 0 &&
      (t = function (u) {
        return 1 - r(1 - u);
      }),
      i === void 0 &&
        (i = function (u) {
          return u < 0.5 ? r(u * 2) / 2 : 1 - r((1 - u) * 2) / 2;
        });
    var n = { easeIn: r, easeOut: t, easeInOut: i },
      o;
    return (
      qt(e, function (s) {
        (ke[s] = ar[s] = n), (ke[(o = s.toLowerCase())] = t);
        for (var u in n)
          ke[
            o + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")
          ] = ke[s + "." + u] = n[u];
      }),
      n
    );
  },
  Xf = function (e) {
    return function (r) {
      return r < 0.5 ? (1 - e(1 - r * 2)) / 2 : 0.5 + e((r - 0.5) * 2) / 2;
    };
  },
  $s = function a(e, r, t) {
    var i = r >= 1 ? r : 1,
      n = (t || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
      o = (n / la) * (Math.asin(1 / i) || 0),
      s = function (c) {
        return c === 1 ? 1 : i * Math.pow(2, -10 * c) * yh((c - o) * n) + 1;
      },
      u =
        e === "out"
          ? s
          : e === "in"
          ? function (f) {
              return 1 - s(1 - f);
            }
          : Xf(s);
    return (
      (n = la / n),
      (u.config = function (f, c) {
        return a(e, f, c);
      }),
      u
    );
  },
  zs = function a(e, r) {
    r === void 0 && (r = 1.70158);
    var t = function (o) {
        return o ? --o * o * ((r + 1) * o + r) + 1 : 0;
      },
      i =
        e === "out"
          ? t
          : e === "in"
          ? function (n) {
              return 1 - t(1 - n);
            }
          : Xf(t);
    return (
      (i.config = function (n) {
        return a(e, n);
      }),
      i
    );
  };
qt("Linear,Quad,Cubic,Quart,Quint,Strong", function (a, e) {
  var r = e < 5 ? e + 1 : e;
  Ui(
    a + ",Power" + (r - 1),
    e
      ? function (t) {
          return Math.pow(t, r);
        }
      : function (t) {
          return t;
        },
    function (t) {
      return 1 - Math.pow(1 - t, r);
    },
    function (t) {
      return t < 0.5
        ? Math.pow(t * 2, r) / 2
        : 1 - Math.pow((1 - t) * 2, r) / 2;
    }
  );
});
ke.Linear.easeNone = ke.none = ke.Linear.easeIn;
Ui("Elastic", $s("in"), $s("out"), $s());
(function (a, e) {
  var r = 1 / e,
    t = 2 * r,
    i = 2.5 * r,
    n = function (s) {
      return s < r
        ? a * s * s
        : s < t
        ? a * Math.pow(s - 1.5 / e, 2) + 0.75
        : s < i
        ? a * (s -= 2.25 / e) * s + 0.9375
        : a * Math.pow(s - 2.625 / e, 2) + 0.984375;
    };
  Ui(
    "Bounce",
    function (o) {
      return 1 - n(1 - o);
    },
    n
  );
})(7.5625, 2.75);
Ui("Expo", function (a) {
  return Math.pow(2, 10 * (a - 1)) * a + a * a * a * a * a * a * (1 - a);
});
Ui("Circ", function (a) {
  return -(cf(1 - a * a) - 1);
});
Ui("Sine", function (a) {
  return a === 1 ? 1 : -mh(a * _h) + 1;
});
Ui("Back", zs("in"), zs("out"), zs());
ke.SteppedEase =
  ke.steps =
  ar.SteppedEase =
    {
      config: function (e, r) {
        e === void 0 && (e = 1);
        var t = 1 / e,
          i = e + (r ? 0 : 1),
          n = r ? 1 : 0,
          o = 1 - He;
        return function (s) {
          return (((i * Co(0, o, s)) | 0) + n) * t;
        };
      },
    };
wn.ease = ke["quad.out"];
qt(
  "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
  function (a) {
    return (rl += a + "," + a + "Params,");
  }
);
var Wf = function (e, r) {
    (this.id = gh++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = r),
      (this.get = r ? r.get : vf),
      (this.set = r ? r.getSetter : ll);
  },
  xo = (function () {
    function a(r) {
      (this.vars = r),
        (this._delay = +r.delay || 0),
        (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) &&
          ((this._rDelay = r.repeatDelay || 0),
          (this._yoyo = !!r.yoyo || !!r.yoyoEase)),
        (this._ts = 1),
        Sn(this, +r.duration, 1, 1),
        (this.data = r.data),
        qe && ((this._ctx = qe), qe.data.push(this)),
        yo || ir.wake();
    }
    var e = a.prototype;
    return (
      (e.delay = function (t) {
        return t || t === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (e.duration = function (t) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
            )
          : this.totalDuration() && this._dur;
      }),
      (e.totalDuration = function (t) {
        return arguments.length
          ? ((this._dirty = 0),
            Sn(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (t, i) {
        if ((Cn(), !arguments.length)) return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
          for (Cs(this, t), !n._dp || n.parent || Cf(n, this); n && n.parent; )
            n.parent._time !==
              n._start +
                (n._ts >= 0
                  ? n._tTime / n._ts
                  : (n.totalDuration() - n._tTime) / -n._ts) &&
              n.totalTime(n._tTime, !0),
              (n = n.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && t < this._tDur) ||
              (this._ts < 0 && t > 0) ||
              (!this._tDur && !t)) &&
            Ar(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== t ||
            (!this._dur && !i) ||
            (this._initted && Math.abs(this._zTime) === He) ||
            (!t && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = t), wf(this, t, i)),
          this
        );
      }),
      (e.time = function (t, i) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + ql(this)) %
                (this._dur + this._rDelay) || (t ? this._dur : 0),
              i
            )
          : this._time;
      }),
      (e.totalProgress = function (t, i) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * t, i)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.rawTime() >= 0 && this._initted
          ? 1
          : 0;
      }),
      (e.progress = function (t, i) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - t : t) +
                ql(this),
              i
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.rawTime() > 0
          ? 1
          : 0;
      }),
      (e.iteration = function (t, i) {
        var n = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * n, i)
          : this._repeat
          ? Tn(this._tTime, n) + 1
          : 1;
      }),
      (e.timeScale = function (t, i) {
        if (!arguments.length) return this._rts === -He ? 0 : this._rts;
        if (this._rts === t) return this;
        var n =
          this.parent && this._ts ? ds(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +t || 0),
          (this._ts = this._ps || t === -He ? 0 : this._rts),
          this.totalTime(
            Co(-Math.abs(this._delay), this.totalDuration(), n),
            i !== !1
          ),
          Ss(this),
          Ch(this)
        );
      }),
      (e.paused = function (t) {
        return arguments.length
          ? (this._ps !== t &&
              ((this._ps = t),
              t
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Cn(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== He &&
                      (this._tTime -= He)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (t) {
        if (arguments.length) {
          this._start = t;
          var i = this.parent || this._dp;
          return (
            i && (i._sort || !this.parent) && Ar(i, this, t - this._delay), this
          );
        }
        return this._start;
      }),
      (e.endTime = function (t) {
        return (
          this._start +
          (Gt(t) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (e.rawTime = function (t) {
        var i = this.parent || this._dp;
        return i
          ? t &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? ds(i.rawTime(t), this)
            : this._tTime
          : this._tTime;
      }),
      (e.revert = function (t) {
        t === void 0 && (t = wh);
        var i = Pt;
        return (
          (Pt = t),
          nl(this) &&
            (this.timeline && this.timeline.revert(t),
            this.totalTime(-0.01, t.suppressEvents)),
          this.data !== "nested" && t.kill !== !1 && this.kill(),
          (Pt = i),
          this
        );
      }),
      (e.globalTime = function (t) {
        for (var i = this, n = arguments.length ? t : i.rawTime(); i; )
          (n = i._start + n / (Math.abs(i._ts) || 1)), (i = i._dp);
        return !this.parent && this._sat ? this._sat.globalTime(t) : n;
      }),
      (e.repeat = function (t) {
        return arguments.length
          ? ((this._repeat = t === 1 / 0 ? -2 : t), Kl(this))
          : this._repeat === -2
          ? 1 / 0
          : this._repeat;
      }),
      (e.repeatDelay = function (t) {
        if (arguments.length) {
          var i = this._time;
          return (this._rDelay = t), Kl(this), i ? this.time(i) : this;
        }
        return this._rDelay;
      }),
      (e.yoyo = function (t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (e.seek = function (t, i) {
        return this.totalTime(hr(this, t), Gt(i));
      }),
      (e.restart = function (t, i) {
        return (
          this.play().totalTime(t ? -this._delay : 0, Gt(i)),
          this._dur || (this._zTime = -He),
          this
        );
      }),
      (e.play = function (t, i) {
        return t != null && this.seek(t, i), this.reversed(!1).paused(!1);
      }),
      (e.reverse = function (t, i) {
        return (
          t != null && this.seek(t || this.totalDuration(), i),
          this.reversed(!0).paused(!1)
        );
      }),
      (e.pause = function (t, i) {
        return t != null && this.seek(t, i), this.paused(!0);
      }),
      (e.resume = function () {
        return this.paused(!1);
      }),
      (e.reversed = function (t) {
        return arguments.length
          ? (!!t !== this.reversed() &&
              this.timeScale(-this._rts || (t ? -He : 0)),
            this)
          : this._rts < 0;
      }),
      (e.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -He), this;
      }),
      (e.isActive = function () {
        var t = this.parent || this._dp,
          i = this._start,
          n;
        return !!(
          !t ||
          (this._ts &&
            this._initted &&
            t.isActive() &&
            (n = t.rawTime(!0)) >= i &&
            n < this.endTime(!0) - He)
        );
      }),
      (e.eventCallback = function (t, i, n) {
        var o = this.vars;
        return arguments.length > 1
          ? (i
              ? ((o[t] = i),
                n && (o[t + "Params"] = n),
                t === "onUpdate" && (this._onUpdate = i))
              : delete o[t],
            this)
          : o[t];
      }),
      (e.then = function (t) {
        var i = this;
        return new Promise(function (n) {
          var o = Je(t) ? t : Tf,
            s = function () {
              var f = i.then;
              (i.then = null),
                Je(o) && (o = o(i)) && (o.then || o === i) && (i.then = f),
                n(o),
                (i.then = f);
            };
          (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
          (!i._tTime && i._ts < 0)
            ? s()
            : (i._prom = s);
        });
      }),
      (e.kill = function () {
        Yn(this);
      }),
      a
    );
  })();
lr(xo.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -He,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var Vt = (function (a) {
  ff(e, a);
  function e(t, i) {
    var n;
    return (
      t === void 0 && (t = {}),
      (n = a.call(this, t) || this),
      (n.labels = {}),
      (n.smoothChildTiming = !!t.smoothChildTiming),
      (n.autoRemoveChildren = !!t.autoRemoveChildren),
      (n._sort = Gt(t.sortChildren)),
      Ke && Ar(t.parent || Ke, Br(n), i),
      t.reversed && n.reverse(),
      t.paused && n.paused(!0),
      t.scrollTrigger && Pf(Br(n), t.scrollTrigger),
      n
    );
  }
  var r = e.prototype;
  return (
    (r.to = function (i, n, o) {
      return no(0, arguments, this), this;
    }),
    (r.from = function (i, n, o) {
      return no(1, arguments, this), this;
    }),
    (r.fromTo = function (i, n, o, s) {
      return no(2, arguments, this), this;
    }),
    (r.set = function (i, n, o) {
      return (
        (n.duration = 0),
        (n.parent = this),
        io(n).repeatDelay || (n.repeat = 0),
        (n.immediateRender = !!n.immediateRender),
        new lt(i, n, hr(this, o), 1),
        this
      );
    }),
    (r.call = function (i, n, o) {
      return Ar(this, lt.delayedCall(0, i, n), o);
    }),
    (r.staggerTo = function (i, n, o, s, u, f, c) {
      return (
        (o.duration = n),
        (o.stagger = o.stagger || s),
        (o.onComplete = f),
        (o.onCompleteParams = c),
        (o.parent = this),
        new lt(i, o, hr(this, u)),
        this
      );
    }),
    (r.staggerFrom = function (i, n, o, s, u, f, c) {
      return (
        (o.runBackwards = 1),
        (io(o).immediateRender = Gt(o.immediateRender)),
        this.staggerTo(i, n, o, s, u, f, c)
      );
    }),
    (r.staggerFromTo = function (i, n, o, s, u, f, c, h) {
      return (
        (s.startAt = o),
        (io(s).immediateRender = Gt(s.immediateRender)),
        this.staggerTo(i, n, s, u, f, c, h)
      );
    }),
    (r.render = function (i, n, o) {
      var s = this._time,
        u = this._dirty ? this.totalDuration() : this._tDur,
        f = this._dur,
        c = i <= 0 ? 0 : ut(i),
        h = this._zTime < 0 != i < 0 && (this._initted || !f),
        d,
        l,
        _,
        p,
        m,
        T,
        S,
        M,
        w,
        v,
        O,
        P;
      if (
        (this !== Ke && c > u && i >= 0 && (c = u), c !== this._tTime || o || h)
      ) {
        if (
          (s !== this._time &&
            f &&
            ((c += this._time - s), (i += this._time - s)),
          (d = c),
          (w = this._start),
          (M = this._ts),
          (T = !M),
          h && (f || (s = this._zTime), (i || !n) && (this._zTime = i)),
          this._repeat)
        ) {
          if (
            ((O = this._yoyo),
            (m = f + this._rDelay),
            this._repeat < -1 && i < 0)
          )
            return this.totalTime(m * 100 + i, n, o);
          if (
            ((d = ut(c % m)),
            c === u
              ? ((p = this._repeat), (d = f))
              : ((v = ut(c / m)),
                (p = ~~v),
                p && p === v && ((d = f), p--),
                d > f && (d = f)),
            (v = Tn(this._tTime, m)),
            !s &&
              this._tTime &&
              v !== p &&
              this._tTime - v * m - this._dur <= 0 &&
              (v = p),
            O && p & 1 && ((d = f - d), (P = 1)),
            p !== v && !this._lock)
          ) {
            var k = O && v & 1,
              R = k === (O && p & 1);
            if (
              (p < v && (k = !k),
              (s = k ? 0 : c % f ? f : c),
              (this._lock = 1),
              (this.render(s || (P ? 0 : ut(p * m)), n, !f)._lock = 0),
              (this._tTime = c),
              !n && this.parent && or(this, "onRepeat"),
              this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1),
              (s && s !== this._time) ||
                T !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((f = this._dur),
              (u = this._tDur),
              R &&
                ((this._lock = 2),
                (s = k ? f : -1e-4),
                this.render(s, !0),
                this.vars.repeatRefresh && !P && this.invalidate()),
              (this._lock = 0),
              !this._ts && !T)
            )
              return this;
            Yf(this, P);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((S = Mh(this, ut(s), ut(d))), S && (c -= d - (d = S._start))),
          (this._tTime = c),
          (this._time = d),
          (this._act = !M),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = i),
            (s = 0)),
          !s && c && !n && !v && (or(this, "onStart"), this._tTime !== c))
        )
          return this;
        if (d >= s && i >= 0)
          for (l = this._first; l; ) {
            if (
              ((_ = l._next), (l._act || d >= l._start) && l._ts && S !== l)
            ) {
              if (l.parent !== this) return this.render(i, n, o);
              if (
                (l.render(
                  l._ts > 0
                    ? (d - l._start) * l._ts
                    : (l._dirty ? l.totalDuration() : l._tDur) +
                        (d - l._start) * l._ts,
                  n,
                  o
                ),
                d !== this._time || (!this._ts && !T))
              ) {
                (S = 0), _ && (c += this._zTime = -He);
                break;
              }
            }
            l = _;
          }
        else {
          l = this._last;
          for (var L = i < 0 ? i : d; l; ) {
            if (((_ = l._prev), (l._act || L <= l._end) && l._ts && S !== l)) {
              if (l.parent !== this) return this.render(i, n, o);
              if (
                (l.render(
                  l._ts > 0
                    ? (L - l._start) * l._ts
                    : (l._dirty ? l.totalDuration() : l._tDur) +
                        (L - l._start) * l._ts,
                  n,
                  o || (Pt && nl(l))
                ),
                d !== this._time || (!this._ts && !T))
              ) {
                (S = 0), _ && (c += this._zTime = L ? -He : He);
                break;
              }
            }
            l = _;
          }
        }
        if (
          S &&
          !n &&
          (this.pause(),
          (S.render(d >= s ? 0 : -He)._zTime = d >= s ? 1 : -1),
          this._ts)
        )
          return (this._start = w), Ss(this), this.render(i, n, o);
        this._onUpdate && !n && or(this, "onUpdate", !0),
          ((c === u && this._tTime >= this.totalDuration()) || (!c && s)) &&
            (w === this._start || Math.abs(M) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((i || !f) &&
                ((c === u && this._ts > 0) || (!c && this._ts < 0)) &&
                _i(this, 1),
              !n &&
                !(i < 0 && !s) &&
                (c || s || !u) &&
                (or(
                  this,
                  c === u && i >= 0 ? "onComplete" : "onReverseComplete",
                  !0
                ),
                this._prom &&
                  !(c < u && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (r.add = function (i, n) {
      var o = this;
      if ((Kr(n) || (n = hr(this, n, i)), !(i instanceof xo))) {
        if (Nt(i))
          return (
            i.forEach(function (s) {
              return o.add(s, n);
            }),
            this
          );
        if (xt(i)) return this.addLabel(i, n);
        if (Je(i)) i = lt.delayedCall(0, i);
        else return this;
      }
      return this !== i ? Ar(this, i, n) : this;
    }),
    (r.getChildren = function (i, n, o, s) {
      i === void 0 && (i = !0),
        n === void 0 && (n = !0),
        o === void 0 && (o = !0),
        s === void 0 && (s = -gr);
      for (var u = [], f = this._first; f; )
        f._start >= s &&
          (f instanceof lt
            ? n && u.push(f)
            : (o && u.push(f), i && u.push.apply(u, f.getChildren(!0, n, o)))),
          (f = f._next);
      return u;
    }),
    (r.getById = function (i) {
      for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
        if (n[o].vars.id === i) return n[o];
    }),
    (r.remove = function (i) {
      return xt(i)
        ? this.removeLabel(i)
        : Je(i)
        ? this.killTweensOf(i)
        : (i.parent === this && Ts(this, i),
          i === this._recent && (this._recent = this._last),
          Li(this));
    }),
    (r.totalTime = function (i, n) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = ut(
              ir.time -
                (this._ts > 0
                  ? i / this._ts
                  : (this.totalDuration() - i) / -this._ts)
            )),
          a.prototype.totalTime.call(this, i, n),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (r.addLabel = function (i, n) {
      return (this.labels[i] = hr(this, n)), this;
    }),
    (r.removeLabel = function (i) {
      return delete this.labels[i], this;
    }),
    (r.addPause = function (i, n, o) {
      var s = lt.delayedCall(0, n || go, o);
      return (
        (s.data = "isPause"), (this._hasPause = 1), Ar(this, s, hr(this, i))
      );
    }),
    (r.removePause = function (i) {
      var n = this._first;
      for (i = hr(this, i); n; )
        n._start === i && n.data === "isPause" && _i(n), (n = n._next);
    }),
    (r.killTweensOf = function (i, n, o) {
      for (var s = this.getTweensOf(i, o), u = s.length; u--; )
        si !== s[u] && s[u].kill(i, n);
      return this;
    }),
    (r.getTweensOf = function (i, n) {
      for (var o = [], s = mr(i), u = this._first, f = Kr(n), c; u; )
        u instanceof lt
          ? bh(u._targets, s) &&
            (f
              ? (!si || (u._initted && u._ts)) &&
                u.globalTime(0) <= n &&
                u.globalTime(u.totalDuration()) > n
              : !n || u.isActive()) &&
            o.push(u)
          : (c = u.getTweensOf(s, n)).length && o.push.apply(o, c),
          (u = u._next);
      return o;
    }),
    (r.tweenTo = function (i, n) {
      n = n || {};
      var o = this,
        s = hr(o, i),
        u = n,
        f = u.startAt,
        c = u.onStart,
        h = u.onStartParams,
        d = u.immediateRender,
        l,
        _ = lt.to(
          o,
          lr(
            {
              ease: n.ease || "none",
              lazy: !1,
              immediateRender: !1,
              time: s,
              overwrite: "auto",
              duration:
                n.duration ||
                Math.abs(
                  (s - (f && "time" in f ? f.time : o._time)) / o.timeScale()
                ) ||
                He,
              onStart: function () {
                if ((o.pause(), !l)) {
                  var m =
                    n.duration ||
                    Math.abs(
                      (s - (f && "time" in f ? f.time : o._time)) /
                        o.timeScale()
                    );
                  _._dur !== m && Sn(_, m, 0, 1).render(_._time, !0, !0),
                    (l = 1);
                }
                c && c.apply(_, h || []);
              },
            },
            n
          )
        );
      return d ? _.render(0) : _;
    }),
    (r.tweenFromTo = function (i, n, o) {
      return this.tweenTo(n, lr({ startAt: { time: hr(this, i) } }, o));
    }),
    (r.recent = function () {
      return this._recent;
    }),
    (r.nextLabel = function (i) {
      return i === void 0 && (i = this._time), Ql(this, hr(this, i));
    }),
    (r.previousLabel = function (i) {
      return i === void 0 && (i = this._time), Ql(this, hr(this, i), 1);
    }),
    (r.currentLabel = function (i) {
      return arguments.length
        ? this.seek(i, !0)
        : this.previousLabel(this._time + He);
    }),
    (r.shiftChildren = function (i, n, o) {
      o === void 0 && (o = 0);
      for (var s = this._first, u = this.labels, f; s; )
        s._start >= o && ((s._start += i), (s._end += i)), (s = s._next);
      if (n) for (f in u) u[f] >= o && (u[f] += i);
      return Li(this);
    }),
    (r.invalidate = function (i) {
      var n = this._first;
      for (this._lock = 0; n; ) n.invalidate(i), (n = n._next);
      return a.prototype.invalidate.call(this, i);
    }),
    (r.clear = function (i) {
      i === void 0 && (i = !0);
      for (var n = this._first, o; n; ) (o = n._next), this.remove(n), (n = o);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        i && (this.labels = {}),
        Li(this)
      );
    }),
    (r.totalDuration = function (i) {
      var n = 0,
        o = this,
        s = o._last,
        u = gr,
        f,
        c,
        h;
      if (arguments.length)
        return o.timeScale(
          (o._repeat < 0 ? o.duration() : o.totalDuration()) /
            (o.reversed() ? -i : i)
        );
      if (o._dirty) {
        for (h = o.parent; s; )
          (f = s._prev),
            s._dirty && s.totalDuration(),
            (c = s._start),
            c > u && o._sort && s._ts && !o._lock
              ? ((o._lock = 1), (Ar(o, s, c - s._delay, 1)._lock = 0))
              : (u = c),
            c < 0 &&
              s._ts &&
              ((n -= c),
              ((!h && !o._dp) || (h && h.smoothChildTiming)) &&
                ((o._start += c / o._ts), (o._time -= c), (o._tTime -= c)),
              o.shiftChildren(-c, !1, -1 / 0),
              (u = 0)),
            s._end > n && s._ts && (n = s._end),
            (s = f);
        Sn(o, o === Ke && o._time > n ? o._time : n, 1, 1), (o._dirty = 0);
      }
      return o._tDur;
    }),
    (e.updateRoot = function (i) {
      if ((Ke._ts && (wf(Ke, ds(i, Ke)), (xf = ir.frame)), ir.frame >= Ul)) {
        Ul += sr.autoSleep || 120;
        var n = Ke._first;
        if ((!n || !n._ts) && sr.autoSleep && ir._listeners.length < 2) {
          for (; n && !n._ts; ) n = n._next;
          n || ir.sleep();
        }
      }
    }),
    e
  );
})(xo);
lr(Vt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var Hh = function (e, r, t, i, n, o, s) {
    var u = new Kt(this._pt, e, r, 0, 1, Kf, null, n),
      f = 0,
      c = 0,
      h,
      d,
      l,
      _,
      p,
      m,
      T,
      S;
    for (
      u.b = t,
        u.e = i,
        t += "",
        i += "",
        (T = ~i.indexOf("random(")) && (i = mo(i)),
        o && ((S = [t, i]), o(S, e, r), (t = S[0]), (i = S[1])),
        d = t.match(Ns) || [];
      (h = Ns.exec(i));

    )
      (_ = h[0]),
        (p = i.substring(f, h.index)),
        l ? (l = (l + 1) % 5) : p.substr(-5) === "rgba(" && (l = 1),
        _ !== d[c++] &&
          ((m = parseFloat(d[c - 1]) || 0),
          (u._pt = {
            _next: u._pt,
            p: p || c === 1 ? p : ",",
            s: m,
            c: _.charAt(1) === "=" ? hn(m, _) - m : parseFloat(_) - m,
            m: l && l < 4 ? Math.round : 0,
          }),
          (f = Ns.lastIndex));
    return (
      (u.c = f < i.length ? i.substring(f, i.length) : ""),
      (u.fp = s),
      (pf.test(i) || T) && (u.e = 0),
      (this._pt = u),
      u
    );
  },
  ol = function (e, r, t, i, n, o, s, u, f, c) {
    Je(i) && (i = i(n || 0, e, o));
    var h = e[r],
      d =
        t !== "get"
          ? t
          : Je(h)
          ? f
            ? e[
                r.indexOf("set") || !Je(e["get" + r.substr(3)])
                  ? r
                  : "get" + r.substr(3)
              ](f)
            : e[r]()
          : h,
      l = Je(h) ? (f ? Qh : Gf) : al,
      _;
    if (
      (xt(i) &&
        (~i.indexOf("random(") && (i = mo(i)),
        i.charAt(1) === "=" &&
          ((_ = hn(d, i) + (Lt(d) || 0)), (_ || _ === 0) && (i = _))),
      !c || d !== i || ma)
    )
      return !isNaN(d * i) && i !== ""
        ? ((_ = new Kt(
            this._pt,
            e,
            r,
            +d || 0,
            i - (d || 0),
            typeof h == "boolean" ? Zh : qf,
            0,
            l
          )),
          f && (_.fp = f),
          s && _.modifier(s, this, e),
          (this._pt = _))
        : (!h && !(r in e) && el(r, i),
          Hh.call(this, e, r, d, i, l, u || sr.stringFilter, f));
  },
  Uh = function (e, r, t, i, n) {
    if (
      (Je(e) && (e = oo(e, n, r, t, i)),
      !Ir(e) || (e.style && e.nodeType) || Nt(e) || hf(e))
    )
      return xt(e) ? oo(e, n, r, t, i) : e;
    var o = {},
      s;
    for (s in e) o[s] = oo(e[s], n, r, t, i);
    return o;
  },
  Vf = function (e, r, t, i, n, o) {
    var s, u, f, c;
    if (
      er[e] &&
      (s = new er[e]()).init(
        n,
        s.rawVars ? r[e] : Uh(r[e], i, n, o, t),
        t,
        i,
        o
      ) !== !1 &&
      ((t._pt = u = new Kt(t._pt, n, e, 0, 1, s.render, s, 0, s.priority)),
      t !== sn)
    )
      for (f = t._ptLookup[t._targets.indexOf(n)], c = s._props.length; c--; )
        f[s._props[c]] = u;
    return s;
  },
  si,
  ma,
  sl = function a(e, r, t) {
    var i = e.vars,
      n = i.ease,
      o = i.startAt,
      s = i.immediateRender,
      u = i.lazy,
      f = i.onUpdate,
      c = i.runBackwards,
      h = i.yoyoEase,
      d = i.keyframes,
      l = i.autoRevert,
      _ = e._dur,
      p = e._startAt,
      m = e._targets,
      T = e.parent,
      S = T && T.data === "nested" ? T.vars.targets : m,
      M = e._overwrite === "auto" && !Qa,
      w = e.timeline,
      v,
      O,
      P,
      k,
      R,
      L,
      Y,
      A,
      F,
      V,
      J,
      U,
      X;
    if (
      (w && (!d || !n) && (n = "none"),
      (e._ease = Ni(n, wn.ease)),
      (e._yEase = h ? Bf(Ni(h === !0 ? n : h, wn.ease)) : 0),
      h &&
        e._yoyo &&
        !e._repeat &&
        ((h = e._yEase), (e._yEase = e._ease), (e._ease = h)),
      (e._from = !w && !!i.runBackwards),
      !w || (d && !i.stagger))
    ) {
      if (
        ((A = m[0] ? Ai(m[0]).harness : 0),
        (U = A && i[A.prop]),
        (v = hs(i, tl)),
        p &&
          (p._zTime < 0 && p.progress(1),
          r < 0 && c && s && !l ? p.render(-1, !0) : p.revert(c && _ ? Jo : vh),
          (p._lazy = 0)),
        o)
      ) {
        if (
          (_i(
            (e._startAt = lt.set(
              m,
              lr(
                {
                  data: "isStart",
                  overwrite: !1,
                  parent: T,
                  immediateRender: !0,
                  lazy: !p && Gt(u),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    f &&
                    function () {
                      return or(e, "onUpdate");
                    },
                  stagger: 0,
                },
                o
              )
            ))
          ),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          r < 0 && (Pt || (!s && !l)) && e._startAt.revert(Jo),
          s && _ && r <= 0 && t <= 0)
        ) {
          r && (e._zTime = r);
          return;
        }
      } else if (c && _ && !p) {
        if (
          (r && (s = !1),
          (P = lr(
            {
              overwrite: !1,
              data: "isFromStart",
              lazy: s && !p && Gt(u),
              immediateRender: s,
              stagger: 0,
              parent: T,
            },
            v
          )),
          U && (P[A.prop] = U),
          _i((e._startAt = lt.set(m, P))),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          r < 0 && (Pt ? e._startAt.revert(Jo) : e._startAt.render(-1, !0)),
          (e._zTime = r),
          !s)
        )
          a(e._startAt, He, He);
        else if (!r) return;
      }
      for (
        e._pt = e._ptCache = 0, u = (_ && Gt(u)) || (u && !_), O = 0;
        O < m.length;
        O++
      ) {
        if (
          ((R = m[O]),
          (Y = R._gsap || il(m)[O]._gsap),
          (e._ptLookup[O] = V = {}),
          ca[Y.id] && ci.length && cs(),
          (J = S === m ? O : S.indexOf(R)),
          A &&
            (F = new A()).init(R, U || v, e, J, S) !== !1 &&
            ((e._pt = k =
              new Kt(e._pt, R, F.name, 0, 1, F.render, F, 0, F.priority)),
            F._props.forEach(function (oe) {
              V[oe] = k;
            }),
            F.priority && (L = 1)),
          !A || U)
        )
          for (P in v)
            er[P] && (F = Vf(P, v, e, J, R, S))
              ? F.priority && (L = 1)
              : (V[P] = k =
                  ol.call(e, R, P, "get", v[P], J, S, 0, i.stringFilter));
        e._op && e._op[O] && e.kill(R, e._op[O]),
          M &&
            e._pt &&
            ((si = e),
            Ke.killTweensOf(R, V, e.globalTime(r)),
            (X = !e.parent),
            (si = 0)),
          e._pt && u && (ca[Y.id] = 1);
      }
      L && Qf(e), e._onInit && e._onInit(e);
    }
    (e._onUpdate = f),
      (e._initted = (!e._op || e._pt) && !X),
      d && r <= 0 && w.render(gr, !0, !0);
  },
  Gh = function (e, r, t, i, n, o, s, u) {
    var f = ((e._pt && e._ptCache) || (e._ptCache = {}))[r],
      c,
      h,
      d,
      l;
    if (!f)
      for (
        f = e._ptCache[r] = [], d = e._ptLookup, l = e._targets.length;
        l--;

      ) {
        if (((c = d[l][r]), c && c.d && c.d._pt))
          for (c = c.d._pt; c && c.p !== r && c.fp !== r; ) c = c._next;
        if (!c)
          return (
            (ma = 1),
            (e.vars[r] = "+=0"),
            sl(e, s),
            (ma = 0),
            u ? _o(r + " not eligible for reset") : 1
          );
        f.push(c);
      }
    for (l = f.length; l--; )
      (h = f[l]),
        (c = h._pt || h),
        (c.s = (i || i === 0) && !n ? i : c.s + (i || 0) + o * c.c),
        (c.c = t - c.s),
        h.e && (h.e = rt(t) + Lt(h.e)),
        h.b && (h.b = c.s + Lt(h.b));
  },
  qh = function (e, r) {
    var t = e[0] ? Ai(e[0]).harness : 0,
      i = t && t.aliases,
      n,
      o,
      s,
      u;
    if (!i) return r;
    n = bn({}, r);
    for (o in i)
      if (o in n) for (u = i[o].split(","), s = u.length; s--; ) n[u[s]] = n[o];
    return n;
  },
  Kh = function (e, r, t, i) {
    var n = r.ease || i || "power1.inOut",
      o,
      s;
    if (Nt(r))
      (s = t[e] || (t[e] = [])),
        r.forEach(function (u, f) {
          return s.push({ t: (f / (r.length - 1)) * 100, v: u, e: n });
        });
    else
      for (o in r)
        (s = t[o] || (t[o] = [])),
          o === "ease" || s.push({ t: parseFloat(e), v: r[o], e: n });
  },
  oo = function (e, r, t, i, n) {
    return Je(e)
      ? e.call(r, t, i, n)
      : xt(e) && ~e.indexOf("random(")
      ? mo(e)
      : e;
  },
  Hf = rl + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
  Uf = {};
qt(Hf + ",id,stagger,delay,duration,paused,scrollTrigger", function (a) {
  return (Uf[a] = 1);
});
var lt = (function (a) {
  ff(e, a);
  function e(t, i, n, o) {
    var s;
    typeof i == "number" && ((n.duration = i), (i = n), (n = null)),
      (s = a.call(this, o ? i : io(i)) || this);
    var u = s.vars,
      f = u.duration,
      c = u.delay,
      h = u.immediateRender,
      d = u.stagger,
      l = u.overwrite,
      _ = u.keyframes,
      p = u.defaults,
      m = u.scrollTrigger,
      T = u.yoyoEase,
      S = i.parent || Ke,
      M = (Nt(t) || hf(t) ? Kr(t[0]) : "length" in i) ? [t] : mr(t),
      w,
      v,
      O,
      P,
      k,
      R,
      L,
      Y;
    if (
      ((s._targets = M.length
        ? il(M)
        : _o(
            "GSAP target " + t + " not found. https://gsap.com",
            !sr.nullTargetWarn
          ) || []),
      (s._ptLookup = []),
      (s._overwrite = l),
      _ || d || Vo(f) || Vo(c))
    ) {
      if (
        ((i = s.vars),
        (w = s.timeline =
          new Vt({
            data: "nested",
            defaults: p || {},
            targets: S && S.data === "nested" ? S.vars.targets : M,
          })),
        w.kill(),
        (w.parent = w._dp = Br(s)),
        (w._start = 0),
        d || Vo(f) || Vo(c))
      ) {
        if (((P = M.length), (L = d && Df(d)), Ir(d)))
          for (k in d) ~Hf.indexOf(k) && (Y || (Y = {}), (Y[k] = d[k]));
        for (v = 0; v < P; v++)
          (O = hs(i, Uf)),
            (O.stagger = 0),
            T && (O.yoyoEase = T),
            Y && bn(O, Y),
            (R = M[v]),
            (O.duration = +oo(f, Br(s), v, R, M)),
            (O.delay = (+oo(c, Br(s), v, R, M) || 0) - s._delay),
            !d &&
              P === 1 &&
              O.delay &&
              ((s._delay = c = O.delay), (s._start += c), (O.delay = 0)),
            w.to(R, O, L ? L(v, R, M) : 0),
            (w._ease = ke.none);
        w.duration() ? (f = c = 0) : (s.timeline = 0);
      } else if (_) {
        io(lr(w.vars.defaults, { ease: "none" })),
          (w._ease = Ni(_.ease || i.ease || "none"));
        var A = 0,
          F,
          V,
          J;
        if (Nt(_))
          _.forEach(function (U) {
            return w.to(M, U, ">");
          }),
            w.duration();
        else {
          O = {};
          for (k in _)
            k === "ease" || k === "easeEach" || Kh(k, _[k], O, _.easeEach);
          for (k in O)
            for (
              F = O[k].sort(function (U, X) {
                return U.t - X.t;
              }),
                A = 0,
                v = 0;
              v < F.length;
              v++
            )
              (V = F[v]),
                (J = {
                  ease: V.e,
                  duration: ((V.t - (v ? F[v - 1].t : 0)) / 100) * f,
                }),
                (J[k] = V.v),
                w.to(M, J, A),
                (A += J.duration);
          w.duration() < f && w.to({}, { duration: f - w.duration() });
        }
      }
      f || s.duration((f = w.duration()));
    } else s.timeline = 0;
    return (
      l === !0 && !Qa && ((si = Br(s)), Ke.killTweensOf(M), (si = 0)),
      Ar(S, Br(s), n),
      i.reversed && s.reverse(),
      i.paused && s.paused(!0),
      (h ||
        (!f &&
          !_ &&
          s._start === ut(S._time) &&
          Gt(h) &&
          Ph(Br(s)) &&
          S.data !== "nested")) &&
        ((s._tTime = -He), s.render(Math.max(0, -c) || 0)),
      m && Pf(Br(s), m),
      s
    );
  }
  var r = e.prototype;
  return (
    (r.render = function (i, n, o) {
      var s = this._time,
        u = this._tDur,
        f = this._dur,
        c = i < 0,
        h = i > u - He && !c ? u : i < He ? 0 : i,
        d,
        l,
        _,
        p,
        m,
        T,
        S,
        M,
        w;
      if (!f) Eh(this, i, n, o);
      else if (
        h !== this._tTime ||
        !i ||
        o ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== c) ||
        this._lazy
      ) {
        if (((d = h), (M = this.timeline), this._repeat)) {
          if (((p = f + this._rDelay), this._repeat < -1 && c))
            return this.totalTime(p * 100 + i, n, o);
          if (
            ((d = ut(h % p)),
            h === u
              ? ((_ = this._repeat), (d = f))
              : ((m = ut(h / p)),
                (_ = ~~m),
                _ && _ === m ? ((d = f), _--) : d > f && (d = f)),
            (T = this._yoyo && _ & 1),
            T && ((w = this._yEase), (d = f - d)),
            (m = Tn(this._tTime, p)),
            d === s && !o && this._initted && _ === m)
          )
            return (this._tTime = h), this;
          _ !== m &&
            (M && this._yEase && Yf(M, T),
            this.vars.repeatRefresh &&
              !T &&
              !this._lock &&
              d !== p &&
              this._initted &&
              ((this._lock = o = 1),
              (this.render(ut(p * _), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (kf(this, c ? i : d, o, n, h)) return (this._tTime = 0), this;
          if (s !== this._time && !(o && this.vars.repeatRefresh && _ !== m))
            return this;
          if (f !== this._dur) return this.render(i, n, o);
        }
        if (
          ((this._tTime = h),
          (this._time = d),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = S = (w || this._ease)(d / f)),
          this._from && (this.ratio = S = 1 - S),
          !s && h && !n && !m && (or(this, "onStart"), this._tTime !== h))
        )
          return this;
        for (l = this._pt; l; ) l.r(S, l.d), (l = l._next);
        (M && M.render(i < 0 ? i : M._dur * M._ease(d / this._dur), n, o)) ||
          (this._startAt && (this._zTime = i)),
          this._onUpdate &&
            !n &&
            (c && ha(this, i, n, o), or(this, "onUpdate")),
          this._repeat &&
            _ !== m &&
            this.vars.onRepeat &&
            !n &&
            this.parent &&
            or(this, "onRepeat"),
          (h === this._tDur || !h) &&
            this._tTime === h &&
            (c && !this._onUpdate && ha(this, i, !0, !0),
            (i || !f) &&
              ((h === this._tDur && this._ts > 0) || (!h && this._ts < 0)) &&
              _i(this, 1),
            !n &&
              !(c && !s) &&
              (h || s || T) &&
              (or(this, h === u ? "onComplete" : "onReverseComplete", !0),
              this._prom && !(h < u && this.timeScale() > 0) && this._prom()));
      }
      return this;
    }),
    (r.targets = function () {
      return this._targets;
    }),
    (r.invalidate = function (i) {
      return (
        (!i || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(i),
        a.prototype.invalidate.call(this, i)
      );
    }),
    (r.resetTo = function (i, n, o, s, u) {
      yo || ir.wake(), this._ts || this.play();
      var f = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        c;
      return (
        this._initted || sl(this, f),
        (c = this._ease(f / this._dur)),
        Gh(this, i, n, o, s, c, f, u)
          ? this.resetTo(i, n, o, s, 1)
          : (Cs(this, 0),
            this.parent ||
              Sf(
                this._dp,
                this,
                "_first",
                "_last",
                this._dp._sort ? "_start" : 0
              ),
            this.render(0))
      );
    }),
    (r.kill = function (i, n) {
      if ((n === void 0 && (n = "all"), !i && (!n || n === "all")))
        return (
          (this._lazy = this._pt = 0),
          this.parent
            ? Yn(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!Pt),
          this
        );
      if (this.timeline) {
        var o = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(i, n, si && si.vars.overwrite !== !0)
            ._first || Yn(this),
          this.parent &&
            o !== this.timeline.totalDuration() &&
            Sn(this, (this._dur * this.timeline._tDur) / o, 0, 1),
          this
        );
      }
      var s = this._targets,
        u = i ? mr(i) : s,
        f = this._ptLookup,
        c = this._pt,
        h,
        d,
        l,
        _,
        p,
        m,
        T;
      if ((!n || n === "all") && Sh(s, u))
        return n === "all" && (this._pt = 0), Yn(this);
      for (
        h = this._op = this._op || [],
          n !== "all" &&
            (xt(n) &&
              ((p = {}),
              qt(n, function (S) {
                return (p[S] = 1);
              }),
              (n = p)),
            (n = qh(s, n))),
          T = s.length;
        T--;

      )
        if (~u.indexOf(s[T])) {
          (d = f[T]),
            n === "all"
              ? ((h[T] = n), (_ = d), (l = {}))
              : ((l = h[T] = h[T] || {}), (_ = n));
          for (p in _)
            (m = d && d[p]),
              m &&
                ((!("kill" in m.d) || m.d.kill(p) === !0) && Ts(this, m, "_pt"),
                delete d[p]),
              l !== "all" && (l[p] = 1);
        }
      return this._initted && !this._pt && c && Yn(this), this;
    }),
    (e.to = function (i, n) {
      return new e(i, n, arguments[2]);
    }),
    (e.from = function (i, n) {
      return no(1, arguments);
    }),
    (e.delayedCall = function (i, n, o, s) {
      return new e(n, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: i,
        onComplete: n,
        onReverseComplete: n,
        onCompleteParams: o,
        onReverseCompleteParams: o,
        callbackScope: s,
      });
    }),
    (e.fromTo = function (i, n, o) {
      return no(2, arguments);
    }),
    (e.set = function (i, n) {
      return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new e(i, n);
    }),
    (e.killTweensOf = function (i, n, o) {
      return Ke.killTweensOf(i, n, o);
    }),
    e
  );
})(xo);
lr(lt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
qt("staggerTo,staggerFrom,staggerFromTo", function (a) {
  lt[a] = function () {
    var e = new Vt(),
      r = pa.call(arguments, 0);
    return r.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), e[a].apply(e, r);
  };
});
var al = function (e, r, t) {
    return (e[r] = t);
  },
  Gf = function (e, r, t) {
    return e[r](t);
  },
  Qh = function (e, r, t, i) {
    return e[r](i.fp, t);
  },
  jh = function (e, r, t) {
    return e.setAttribute(r, t);
  },
  ll = function (e, r) {
    return Je(e[r]) ? Gf : ja(e[r]) && e.setAttribute ? jh : al;
  },
  qf = function (e, r) {
    return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r);
  },
  Zh = function (e, r) {
    return r.set(r.t, r.p, !!(r.s + r.c * e), r);
  },
  Kf = function (e, r) {
    var t = r._pt,
      i = "";
    if (!e && r.b) i = r.b;
    else if (e === 1 && r.e) i = r.e;
    else {
      for (; t; )
        (i =
          t.p +
          (t.m ? t.m(t.s + t.c * e) : Math.round((t.s + t.c * e) * 1e4) / 1e4) +
          i),
          (t = t._next);
      i += r.c;
    }
    r.set(r.t, r.p, i, r);
  },
  ul = function (e, r) {
    for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next);
  },
  Jh = function (e, r, t, i) {
    for (var n = this._pt, o; n; )
      (o = n._next), n.p === i && n.modifier(e, r, t), (n = o);
  },
  ed = function (e) {
    for (var r = this._pt, t, i; r; )
      (i = r._next),
        (r.p === e && !r.op) || r.op === e
          ? Ts(this, r, "_pt")
          : r.dep || (t = 1),
        (r = i);
    return !t;
  },
  td = function (e, r, t, i) {
    i.mSet(e, r, i.m.call(i.tween, t, i.mt), i);
  },
  Qf = function (e) {
    for (var r = e._pt, t, i, n, o; r; ) {
      for (t = r._next, i = n; i && i.pr > r.pr; ) i = i._next;
      (r._prev = i ? i._prev : o) ? (r._prev._next = r) : (n = r),
        (r._next = i) ? (i._prev = r) : (o = r),
        (r = t);
    }
    e._pt = n;
  },
  Kt = (function () {
    function a(r, t, i, n, o, s, u, f, c) {
      (this.t = t),
        (this.s = n),
        (this.c = o),
        (this.p = i),
        (this.r = s || qf),
        (this.d = u || this),
        (this.set = f || al),
        (this.pr = c || 0),
        (this._next = r),
        r && (r._prev = this);
    }
    var e = a.prototype;
    return (
      (e.modifier = function (t, i, n) {
        (this.mSet = this.mSet || this.set),
          (this.set = td),
          (this.m = t),
          (this.mt = n),
          (this.tween = i);
      }),
      a
    );
  })();
qt(
  rl +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
  function (a) {
    return (tl[a] = 1);
  }
);
ar.TweenMax = ar.TweenLite = lt;
ar.TimelineLite = ar.TimelineMax = Vt;
Ke = new Vt({
  sortChildren: !1,
  defaults: wn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0,
});
sr.stringFilter = zf;
var Fi = [],
  ts = {},
  rd = [],
  Zl = 0,
  id = 0,
  Bs = function (e) {
    return (ts[e] || rd).map(function (r) {
      return r();
    });
  },
  ya = function () {
    var e = Date.now(),
      r = [];
    e - Zl > 2 &&
      (Bs("matchMediaInit"),
      Fi.forEach(function (t) {
        var i = t.queries,
          n = t.conditions,
          o,
          s,
          u,
          f;
        for (s in i)
          (o = Dr.matchMedia(i[s]).matches),
            o && (u = 1),
            o !== n[s] && ((n[s] = o), (f = 1));
        f && (t.revert(), u && r.push(t));
      }),
      Bs("matchMediaRevert"),
      r.forEach(function (t) {
        return t.onMatch(t, function (i) {
          return t.add(null, i);
        });
      }),
      (Zl = e),
      Bs("matchMedia"));
  },
  jf = (function () {
    function a(r, t) {
      (this.selector = t && _a(t)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = id++),
        r && this.add(r);
    }
    var e = a.prototype;
    return (
      (e.add = function (t, i, n) {
        Je(t) && ((n = i), (i = t), (t = Je));
        var o = this,
          s = function () {
            var f = qe,
              c = o.selector,
              h;
            return (
              f && f !== o && f.data.push(o),
              n && (o.selector = _a(n)),
              (qe = o),
              (h = i.apply(o, arguments)),
              Je(h) && o._r.push(h),
              (qe = f),
              (o.selector = c),
              (o.isReverted = !1),
              h
            );
          };
        return (
          (o.last = s),
          t === Je
            ? s(o, function (u) {
                return o.add(null, u);
              })
            : t
            ? (o[t] = s)
            : s
        );
      }),
      (e.ignore = function (t) {
        var i = qe;
        (qe = null), t(this), (qe = i);
      }),
      (e.getTweens = function () {
        var t = [];
        return (
          this.data.forEach(function (i) {
            return i instanceof a
              ? t.push.apply(t, i.getTweens())
              : i instanceof lt &&
                  !(i.parent && i.parent.data === "nested") &&
                  t.push(i);
          }),
          t
        );
      }),
      (e.clear = function () {
        this._r.length = this.data.length = 0;
      }),
      (e.kill = function (t, i) {
        var n = this;
        if (
          (t
            ? (function () {
                for (var s = n.getTweens(), u = n.data.length, f; u--; )
                  (f = n.data[u]),
                    f.data === "isFlip" &&
                      (f.revert(),
                      f.getChildren(!0, !0, !1).forEach(function (c) {
                        return s.splice(s.indexOf(c), 1);
                      }));
                for (
                  s
                    .map(function (c) {
                      return {
                        g:
                          c._dur ||
                          c._delay ||
                          (c._sat && !c._sat.vars.immediateRender)
                            ? c.globalTime(0)
                            : -1 / 0,
                        t: c,
                      };
                    })
                    .sort(function (c, h) {
                      return h.g - c.g || -1 / 0;
                    })
                    .forEach(function (c) {
                      return c.t.revert(t);
                    }),
                    u = n.data.length;
                  u--;

                )
                  (f = n.data[u]),
                    f instanceof Vt
                      ? f.data !== "nested" &&
                        (f.scrollTrigger && f.scrollTrigger.revert(), f.kill())
                      : !(f instanceof lt) && f.revert && f.revert(t);
                n._r.forEach(function (c) {
                  return c(t, n);
                }),
                  (n.isReverted = !0);
              })()
            : this.data.forEach(function (s) {
                return s.kill && s.kill();
              }),
          this.clear(),
          i)
        )
          for (var o = Fi.length; o--; )
            Fi[o].id === this.id && Fi.splice(o, 1);
      }),
      (e.revert = function (t) {
        this.kill(t || {});
      }),
      a
    );
  })(),
  nd = (function () {
    function a(r) {
      (this.contexts = []), (this.scope = r), qe && qe.data.push(this);
    }
    var e = a.prototype;
    return (
      (e.add = function (t, i, n) {
        Ir(t) || (t = { matches: t });
        var o = new jf(0, n || this.scope),
          s = (o.conditions = {}),
          u,
          f,
          c;
        qe && !o.selector && (o.selector = qe.selector),
          this.contexts.push(o),
          (i = o.add("onMatch", i)),
          (o.queries = t);
        for (f in t)
          f === "all"
            ? (c = 1)
            : ((u = Dr.matchMedia(t[f])),
              u &&
                (Fi.indexOf(o) < 0 && Fi.push(o),
                (s[f] = u.matches) && (c = 1),
                u.addListener
                  ? u.addListener(ya)
                  : u.addEventListener("change", ya)));
        return (
          c &&
            i(o, function (h) {
              return o.add(null, h);
            }),
          this
        );
      }),
      (e.revert = function (t) {
        this.kill(t || {});
      }),
      (e.kill = function (t) {
        this.contexts.forEach(function (i) {
          return i.kill(t, !0);
        });
      }),
      a
    );
  })(),
  ps = {
    registerPlugin: function () {
      for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
        r[t] = arguments[t];
      r.forEach(function (i) {
        return Ff(i);
      });
    },
    timeline: function (e) {
      return new Vt(e);
    },
    getTweensOf: function (e, r) {
      return Ke.getTweensOf(e, r);
    },
    getProperty: function (e, r, t, i) {
      xt(e) && (e = mr(e)[0]);
      var n = Ai(e || {}).get,
        o = t ? Tf : bf;
      return (
        t === "native" && (t = ""),
        e &&
          (r
            ? o(((er[r] && er[r].get) || n)(e, r, t, i))
            : function (s, u, f) {
                return o(((er[s] && er[s].get) || n)(e, s, u, f));
              })
      );
    },
    quickSetter: function (e, r, t) {
      if (((e = mr(e)), e.length > 1)) {
        var i = e.map(function (c) {
            return jt.quickSetter(c, r, t);
          }),
          n = i.length;
        return function (c) {
          for (var h = n; h--; ) i[h](c);
        };
      }
      e = e[0] || {};
      var o = er[r],
        s = Ai(e),
        u = (s.harness && (s.harness.aliases || {})[r]) || r,
        f = o
          ? function (c) {
              var h = new o();
              (sn._pt = 0),
                h.init(e, t ? c + t : c, sn, 0, [e]),
                h.render(1, h),
                sn._pt && ul(1, sn);
            }
          : s.set(e, u);
      return o
        ? f
        : function (c) {
            return f(e, u, t ? c + t : c, s, 1);
          };
    },
    quickTo: function (e, r, t) {
      var i,
        n = jt.to(
          e,
          lr(
            ((i = {}), (i[r] = "+=0.1"), (i.paused = !0), (i.stagger = 0), i),
            t || {}
          )
        ),
        o = function (u, f, c) {
          return n.resetTo(r, u, f, c);
        };
      return (o.tween = n), o;
    },
    isTweening: function (e) {
      return Ke.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = Ni(e.ease, wn.ease)), Gl(wn, e || {});
    },
    config: function (e) {
      return Gl(sr, e || {});
    },
    registerEffect: function (e) {
      var r = e.name,
        t = e.effect,
        i = e.plugins,
        n = e.defaults,
        o = e.extendTimeline;
      (i || "").split(",").forEach(function (s) {
        return (
          s && !er[s] && !ar[s] && _o(r + " effect requires " + s + " plugin.")
        );
      }),
        (Fs[r] = function (s, u, f) {
          return t(mr(s), lr(u || {}, n), f);
        }),
        o &&
          (Vt.prototype[r] = function (s, u, f) {
            return this.add(Fs[r](s, Ir(u) ? u : (f = u) && {}, this), f);
          });
    },
    registerEase: function (e, r) {
      ke[e] = Ni(r);
    },
    parseEase: function (e, r) {
      return arguments.length ? Ni(e, r) : ke;
    },
    getById: function (e) {
      return Ke.getById(e);
    },
    exportRoot: function (e, r) {
      e === void 0 && (e = {});
      var t = new Vt(e),
        i,
        n;
      for (
        t.smoothChildTiming = Gt(e.smoothChildTiming),
          Ke.remove(t),
          t._dp = 0,
          t._time = t._tTime = Ke._time,
          i = Ke._first;
        i;

      )
        (n = i._next),
          (r ||
            !(
              !i._dur &&
              i instanceof lt &&
              i.vars.onComplete === i._targets[0]
            )) &&
            Ar(t, i, i._start - i._delay),
          (i = n);
      return Ar(Ke, t, 0), t;
    },
    context: function (e, r) {
      return e ? new jf(e, r) : qe;
    },
    matchMedia: function (e) {
      return new nd(e);
    },
    matchMediaRefresh: function () {
      return (
        Fi.forEach(function (e) {
          var r = e.conditions,
            t,
            i;
          for (i in r) r[i] && ((r[i] = !1), (t = 1));
          t && e.revert();
        }) || ya()
      );
    },
    addEventListener: function (e, r) {
      var t = ts[e] || (ts[e] = []);
      ~t.indexOf(r) || t.push(r);
    },
    removeEventListener: function (e, r) {
      var t = ts[e],
        i = t && t.indexOf(r);
      i >= 0 && t.splice(i, 1);
    },
    utils: {
      wrap: Fh,
      wrapYoyo: Ih,
      distribute: Df,
      random: Rf,
      snap: Of,
      normalize: Nh,
      getUnit: Lt,
      clamp: Oh,
      splitColor: If,
      toArray: mr,
      selector: _a,
      mapRange: Lf,
      pipe: Ah,
      unitize: Lh,
      interpolate: $h,
      shuffle: Mf,
    },
    install: mf,
    effects: Fs,
    ticker: ir,
    updateRoot: Vt.updateRoot,
    plugins: er,
    globalTimeline: Ke,
    core: {
      PropTween: Kt,
      globals: yf,
      Tween: lt,
      Timeline: Vt,
      Animation: xo,
      getCache: Ai,
      _removeLinkedListItem: Ts,
      reverting: function () {
        return Pt;
      },
      context: function (e) {
        return e && qe && (qe.data.push(e), (e._ctx = qe)), qe;
      },
      suppressOverwrites: function (e) {
        return (Qa = e);
      },
    },
  };
qt("to,from,fromTo,delayedCall,set,killTweensOf", function (a) {
  return (ps[a] = lt[a]);
});
ir.add(Vt.updateRoot);
sn = ps.to({}, { duration: 0 });
var od = function (e, r) {
    for (var t = e._pt; t && t.p !== r && t.op !== r && t.fp !== r; )
      t = t._next;
    return t;
  },
  sd = function (e, r) {
    var t = e._targets,
      i,
      n,
      o;
    for (i in r)
      for (n = t.length; n--; )
        (o = e._ptLookup[n][i]),
          o &&
            (o = o.d) &&
            (o._pt && (o = od(o, i)),
            o && o.modifier && o.modifier(r[i], e, t[n], i));
  },
  Ys = function (e, r) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (i, n, o) {
        o._onInit = function (s) {
          var u, f;
          if (
            (xt(n) &&
              ((u = {}),
              qt(n, function (c) {
                return (u[c] = 1);
              }),
              (n = u)),
            r)
          ) {
            u = {};
            for (f in n) u[f] = r(n[f]);
            n = u;
          }
          sd(s, n);
        };
      },
    };
  },
  jt =
    ps.registerPlugin(
      {
        name: "attr",
        init: function (e, r, t, i, n) {
          var o, s, u;
          this.tween = t;
          for (o in r)
            (u = e.getAttribute(o) || ""),
              (s = this.add(
                e,
                "setAttribute",
                (u || 0) + "",
                r[o],
                i,
                n,
                0,
                0,
                o
              )),
              (s.op = o),
              (s.b = u),
              this._props.push(o);
        },
        render: function (e, r) {
          for (var t = r._pt; t; )
            Pt ? t.set(t.t, t.p, t.b, t) : t.r(e, t.d), (t = t._next);
        },
      },
      {
        name: "endArray",
        headless: 1,
        init: function (e, r) {
          for (var t = r.length; t--; )
            this.add(e, t, e[t] || 0, r[t], 0, 0, 0, 0, 0, 1);
        },
      },
      Ys("roundProps", ga),
      Ys("modifiers"),
      Ys("snap", Of)
    ) || ps;
lt.version = Vt.version = jt.version = "3.13.0";
gf = 1;
Za() && Cn();
ke.Power0;
ke.Power1;
ke.Power2;
ke.Power3;
ke.Power4;
ke.Linear;
ke.Quad;
ke.Cubic;
ke.Quart;
ke.Quint;
ke.Strong;
ke.Elastic;
ke.Back;
ke.SteppedEase;
ke.Bounce;
ke.Sine;
ke.Expo;
ke.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Jl,
  ai,
  dn,
  fl,
  Mi,
  eu,
  cl,
  ad = function () {
    return typeof window < "u";
  },
  Qr = {},
  Pi = 180 / Math.PI,
  pn = Math.PI / 180,
  Ki = Math.atan2,
  tu = 1e8,
  hl = /([A-Z])/g,
  ld = /(left|right|width|margin|padding|x)/i,
  ud = /[\s,\(]\S/,
  Nr = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity",
  },
  xa = function (e, r) {
    return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
  },
  fd = function (e, r) {
    return r.set(
      r.t,
      r.p,
      e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u,
      r
    );
  },
  cd = function (e, r) {
    return r.set(
      r.t,
      r.p,
      e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b,
      r
    );
  },
  hd = function (e, r) {
    var t = r.s + r.c * e;
    r.set(r.t, r.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + r.u, r);
  },
  Zf = function (e, r) {
    return r.set(r.t, r.p, e ? r.e : r.b, r);
  },
  Jf = function (e, r) {
    return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r);
  },
  dd = function (e, r, t) {
    return (e.style[r] = t);
  },
  pd = function (e, r, t) {
    return e.style.setProperty(r, t);
  },
  _d = function (e, r, t) {
    return (e._gsap[r] = t);
  },
  gd = function (e, r, t) {
    return (e._gsap.scaleX = e._gsap.scaleY = t);
  },
  md = function (e, r, t, i, n) {
    var o = e._gsap;
    (o.scaleX = o.scaleY = t), o.renderTransform(n, o);
  },
  yd = function (e, r, t, i, n) {
    var o = e._gsap;
    (o[r] = t), o.renderTransform(n, o);
  },
  Qe = "transform",
  Qt = Qe + "Origin",
  xd = function a(e, r) {
    var t = this,
      i = this.target,
      n = i.style,
      o = i._gsap;
    if (e in Qr && n) {
      if (((this.tfm = this.tfm || {}), e !== "transform"))
        (e = Nr[e] || e),
          ~e.indexOf(",")
            ? e.split(",").forEach(function (s) {
                return (t.tfm[s] = Yr(i, s));
              })
            : (this.tfm[e] = o.x ? o[e] : Yr(i, e)),
          e === Qt && (this.tfm.zOrigin = o.zOrigin);
      else
        return Nr.transform.split(",").forEach(function (s) {
          return a.call(t, s, r);
        });
      if (this.props.indexOf(Qe) >= 0) return;
      o.svg &&
        ((this.svgo = i.getAttribute("data-svg-origin")),
        this.props.push(Qt, r, "")),
        (e = Qe);
    }
    (n || r) && this.props.push(e, r, n[e]);
  },
  ec = function (e) {
    e.translate &&
      (e.removeProperty("translate"),
      e.removeProperty("scale"),
      e.removeProperty("rotate"));
  },
  vd = function () {
    var e = this.props,
      r = this.target,
      t = r.style,
      i = r._gsap,
      n,
      o;
    for (n = 0; n < e.length; n += 3)
      e[n + 1]
        ? e[n + 1] === 2
          ? r[e[n]](e[n + 2])
          : (r[e[n]] = e[n + 2])
        : e[n + 2]
        ? (t[e[n]] = e[n + 2])
        : t.removeProperty(
            e[n].substr(0, 2) === "--"
              ? e[n]
              : e[n].replace(hl, "-$1").toLowerCase()
          );
    if (this.tfm) {
      for (o in this.tfm) i[o] = this.tfm[o];
      i.svg &&
        (i.renderTransform(),
        r.setAttribute("data-svg-origin", this.svgo || "")),
        (n = cl()),
        (!n || !n.isStart) &&
          !t[Qe] &&
          (ec(t),
          i.zOrigin &&
            t[Qt] &&
            ((t[Qt] += " " + i.zOrigin + "px"),
            (i.zOrigin = 0),
            i.renderTransform()),
          (i.uncache = 1));
    }
  },
  tc = function (e, r) {
    var t = { target: e, props: [], revert: vd, save: xd };
    return (
      e._gsap || jt.core.getCache(e),
      r &&
        e.style &&
        e.nodeType &&
        r.split(",").forEach(function (i) {
          return t.save(i);
        }),
      t
    );
  },
  rc,
  va = function (e, r) {
    var t = ai.createElementNS
      ? ai.createElementNS(
          (r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          e
        )
      : ai.createElement(e);
    return t && t.style ? t : ai.createElement(e);
  },
  yr = function a(e, r, t) {
    var i = getComputedStyle(e);
    return (
      i[r] ||
      i.getPropertyValue(r.replace(hl, "-$1").toLowerCase()) ||
      i.getPropertyValue(r) ||
      (!t && a(e, Pn(r) || r, 1)) ||
      ""
    );
  },
  ru = "O,Moz,ms,Ms,Webkit".split(","),
  Pn = function (e, r, t) {
    var i = r || Mi,
      n = i.style,
      o = 5;
    if (e in n && !t) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      o-- && !(ru[o] + e in n);

    );
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? ru[o] : "") + e;
  },
  wa = function () {
    ad() &&
      window.document &&
      ((Jl = window),
      (ai = Jl.document),
      (dn = ai.documentElement),
      (Mi = va("div") || { style: {} }),
      va("div"),
      (Qe = Pn(Qe)),
      (Qt = Qe + "Origin"),
      (Mi.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (rc = !!Pn("perspective")),
      (cl = jt.core.reverting),
      (fl = 1));
  },
  iu = function (e) {
    var r = e.ownerSVGElement,
      t = va(
        "svg",
        (r && r.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"
      ),
      i = e.cloneNode(!0),
      n;
    (i.style.display = "block"), t.appendChild(i), dn.appendChild(t);
    try {
      n = i.getBBox();
    } catch {}
    return t.removeChild(i), dn.removeChild(t), n;
  },
  nu = function (e, r) {
    for (var t = r.length; t--; )
      if (e.hasAttribute(r[t])) return e.getAttribute(r[t]);
  },
  ic = function (e) {
    var r, t;
    try {
      r = e.getBBox();
    } catch {
      (r = iu(e)), (t = 1);
    }
    return (
      (r && (r.width || r.height)) || t || (r = iu(e)),
      r && !r.width && !r.x && !r.y
        ? {
            x: +nu(e, ["x", "cx", "x1"]) || 0,
            y: +nu(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
        : r
    );
  },
  nc = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ic(e));
  },
  Vi = function (e, r) {
    if (r) {
      var t = e.style,
        i;
      r in Qr && r !== Qt && (r = Qe),
        t.removeProperty
          ? ((i = r.substr(0, 2)),
            (i === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r),
            t.removeProperty(
              i === "--" ? r : r.replace(hl, "-$1").toLowerCase()
            ))
          : t.removeAttribute(r);
    }
  },
  li = function (e, r, t, i, n, o) {
    var s = new Kt(e._pt, r, t, 0, 1, o ? Jf : Zf);
    return (e._pt = s), (s.b = i), (s.e = n), e._props.push(t), s;
  },
  ou = { deg: 1, rad: 1, turn: 1 },
  wd = { grid: 1, flex: 1 },
  gi = function a(e, r, t, i) {
    var n = parseFloat(t) || 0,
      o = (t + "").trim().substr((n + "").length) || "px",
      s = Mi.style,
      u = ld.test(r),
      f = e.tagName.toLowerCase() === "svg",
      c = (f ? "client" : "offset") + (u ? "Width" : "Height"),
      h = 100,
      d = i === "px",
      l = i === "%",
      _,
      p,
      m,
      T;
    if (i === o || !n || ou[i] || ou[o]) return n;
    if (
      (o !== "px" && !d && (n = a(e, r, t, "px")),
      (T = e.getCTM && nc(e)),
      (l || o === "%") && (Qr[r] || ~r.indexOf("adius")))
    )
      return (
        (_ = T ? e.getBBox()[u ? "width" : "height"] : e[c]),
        rt(l ? (n / _) * h : (n / 100) * _)
      );
    if (
      ((s[u ? "width" : "height"] = h + (d ? o : i)),
      (p =
        (i !== "rem" && ~r.indexOf("adius")) ||
        (i === "em" && e.appendChild && !f)
          ? e
          : e.parentNode),
      T && (p = (e.ownerSVGElement || {}).parentNode),
      (!p || p === ai || !p.appendChild) && (p = ai.body),
      (m = p._gsap),
      m && l && m.width && u && m.time === ir.time && !m.uncache)
    )
      return rt((n / m.width) * h);
    if (l && (r === "height" || r === "width")) {
      var S = e.style[r];
      (e.style[r] = h + i), (_ = e[c]), S ? (e.style[r] = S) : Vi(e, r);
    } else
      (l || o === "%") &&
        !wd[yr(p, "display")] &&
        (s.position = yr(e, "position")),
        p === e && (s.position = "static"),
        p.appendChild(Mi),
        (_ = Mi[c]),
        p.removeChild(Mi),
        (s.position = "absolute");
    return (
      u && l && ((m = Ai(p)), (m.time = ir.time), (m.width = p[c])),
      rt(d ? (_ * n) / h : _ && n ? (h / _) * n : 0)
    );
  },
  Yr = function (e, r, t, i) {
    var n;
    return (
      fl || wa(),
      r in Nr &&
        r !== "transform" &&
        ((r = Nr[r]), ~r.indexOf(",") && (r = r.split(",")[0])),
      Qr[r] && r !== "transform"
        ? ((n = wo(e, i)),
          (n =
            r !== "transformOrigin"
              ? n[r]
              : n.svg
              ? n.origin
              : gs(yr(e, Qt)) + " " + n.zOrigin + "px"))
        : ((n = e.style[r]),
          (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) &&
            (n =
              (_s[r] && _s[r](e, r, t)) ||
              yr(e, r) ||
              vf(e, r) ||
              (r === "opacity" ? 1 : 0))),
      t && !~(n + "").trim().indexOf(" ") ? gi(e, r, n, t) + t : n
    );
  },
  bd = function (e, r, t, i) {
    if (!t || t === "none") {
      var n = Pn(r, e, 1),
        o = n && yr(e, n, 1);
      o && o !== t
        ? ((r = n), (t = o))
        : r === "borderColor" && (t = yr(e, "borderTopColor"));
    }
    var s = new Kt(this._pt, e.style, r, 0, 1, Kf),
      u = 0,
      f = 0,
      c,
      h,
      d,
      l,
      _,
      p,
      m,
      T,
      S,
      M,
      w,
      v;
    if (
      ((s.b = t),
      (s.e = i),
      (t += ""),
      (i += ""),
      i.substring(0, 6) === "var(--" &&
        (i = yr(e, i.substring(4, i.indexOf(")")))),
      i === "auto" &&
        ((p = e.style[r]),
        (e.style[r] = i),
        (i = yr(e, r) || i),
        p ? (e.style[r] = p) : Vi(e, r)),
      (c = [t, i]),
      zf(c),
      (t = c[0]),
      (i = c[1]),
      (d = t.match(on) || []),
      (v = i.match(on) || []),
      v.length)
    ) {
      for (; (h = on.exec(i)); )
        (m = h[0]),
          (S = i.substring(u, h.index)),
          _
            ? (_ = (_ + 1) % 5)
            : (S.substr(-5) === "rgba(" || S.substr(-5) === "hsla(") && (_ = 1),
          m !== (p = d[f++] || "") &&
            ((l = parseFloat(p) || 0),
            (w = p.substr((l + "").length)),
            m.charAt(1) === "=" && (m = hn(l, m) + w),
            (T = parseFloat(m)),
            (M = m.substr((T + "").length)),
            (u = on.lastIndex - M.length),
            M ||
              ((M = M || sr.units[r] || w),
              u === i.length && ((i += M), (s.e += M))),
            w !== M && (l = gi(e, r, p, M) || 0),
            (s._pt = {
              _next: s._pt,
              p: S || f === 1 ? S : ",",
              s: l,
              c: T - l,
              m: (_ && _ < 4) || r === "zIndex" ? Math.round : 0,
            }));
      s.c = u < i.length ? i.substring(u, i.length) : "";
    } else s.r = r === "display" && i === "none" ? Jf : Zf;
    return pf.test(i) && (s.e = 0), (this._pt = s), s;
  },
  su = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
  Td = function (e) {
    var r = e.split(" "),
      t = r[0],
      i = r[1] || "50%";
    return (
      (t === "top" || t === "bottom" || i === "left" || i === "right") &&
        ((e = t), (t = i), (i = e)),
      (r[0] = su[t] || t),
      (r[1] = su[i] || i),
      r.join(" ")
    );
  },
  Sd = function (e, r) {
    if (r.tween && r.tween._time === r.tween._dur) {
      var t = r.t,
        i = t.style,
        n = r.u,
        o = t._gsap,
        s,
        u,
        f;
      if (n === "all" || n === !0) (i.cssText = ""), (u = 1);
      else
        for (n = n.split(","), f = n.length; --f > -1; )
          (s = n[f]),
            Qr[s] && ((u = 1), (s = s === "transformOrigin" ? Qt : Qe)),
            Vi(t, s);
      u &&
        (Vi(t, Qe),
        o &&
          (o.svg && t.removeAttribute("transform"),
          (i.scale = i.rotate = i.translate = "none"),
          wo(t, 1),
          (o.uncache = 1),
          ec(i)));
    }
  },
  _s = {
    clearProps: function (e, r, t, i, n) {
      if (n.data !== "isFromStart") {
        var o = (e._pt = new Kt(e._pt, r, t, 0, 0, Sd));
        return (o.u = i), (o.pr = -10), (o.tween = n), e._props.push(t), 1;
      }
    },
  },
  vo = [1, 0, 0, 1, 0, 0],
  oc = {},
  sc = function (e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
  },
  au = function (e) {
    var r = yr(e, Qe);
    return sc(r) ? vo : r.substr(7).match(df).map(rt);
  },
  dl = function (e, r) {
    var t = e._gsap || Ai(e),
      i = e.style,
      n = au(e),
      o,
      s,
      u,
      f;
    return t.svg && e.getAttribute("transform")
      ? ((u = e.transform.baseVal.consolidate().matrix),
        (n = [u.a, u.b, u.c, u.d, u.e, u.f]),
        n.join(",") === "1,0,0,1,0,0" ? vo : n)
      : (n === vo &&
          !e.offsetParent &&
          e !== dn &&
          !t.svg &&
          ((u = i.display),
          (i.display = "block"),
          (o = e.parentNode),
          (!o || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((f = 1), (s = e.nextElementSibling), dn.appendChild(e)),
          (n = au(e)),
          u ? (i.display = u) : Vi(e, "display"),
          f &&
            (s
              ? o.insertBefore(e, s)
              : o
              ? o.appendChild(e)
              : dn.removeChild(e))),
        r && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
  },
  ba = function (e, r, t, i, n, o) {
    var s = e._gsap,
      u = n || dl(e, !0),
      f = s.xOrigin || 0,
      c = s.yOrigin || 0,
      h = s.xOffset || 0,
      d = s.yOffset || 0,
      l = u[0],
      _ = u[1],
      p = u[2],
      m = u[3],
      T = u[4],
      S = u[5],
      M = r.split(" "),
      w = parseFloat(M[0]) || 0,
      v = parseFloat(M[1]) || 0,
      O,
      P,
      k,
      R;
    t
      ? u !== vo &&
        (P = l * m - _ * p) &&
        ((k = w * (m / P) + v * (-p / P) + (p * S - m * T) / P),
        (R = w * (-_ / P) + v * (l / P) - (l * S - _ * T) / P),
        (w = k),
        (v = R))
      : ((O = ic(e)),
        (w = O.x + (~M[0].indexOf("%") ? (w / 100) * O.width : w)),
        (v = O.y + (~(M[1] || M[0]).indexOf("%") ? (v / 100) * O.height : v))),
      i || (i !== !1 && s.smooth)
        ? ((T = w - f),
          (S = v - c),
          (s.xOffset = h + (T * l + S * p) - T),
          (s.yOffset = d + (T * _ + S * m) - S))
        : (s.xOffset = s.yOffset = 0),
      (s.xOrigin = w),
      (s.yOrigin = v),
      (s.smooth = !!i),
      (s.origin = r),
      (s.originIsAbsolute = !!t),
      (e.style[Qt] = "0px 0px"),
      o &&
        (li(o, s, "xOrigin", f, w),
        li(o, s, "yOrigin", c, v),
        li(o, s, "xOffset", h, s.xOffset),
        li(o, s, "yOffset", d, s.yOffset)),
      e.setAttribute("data-svg-origin", w + " " + v);
  },
  wo = function (e, r) {
    var t = e._gsap || new Wf(e);
    if ("x" in t && !r && !t.uncache) return t;
    var i = e.style,
      n = t.scaleX < 0,
      o = "px",
      s = "deg",
      u = getComputedStyle(e),
      f = yr(e, Qt) || "0",
      c,
      h,
      d,
      l,
      _,
      p,
      m,
      T,
      S,
      M,
      w,
      v,
      O,
      P,
      k,
      R,
      L,
      Y,
      A,
      F,
      V,
      J,
      U,
      X,
      oe,
      te,
      y,
      Z,
      ee,
      fe,
      ie,
      Be;
    return (
      (c = h = d = p = m = T = S = M = w = 0),
      (l = _ = 1),
      (t.svg = !!(e.getCTM && nc(e))),
      u.translate &&
        ((u.translate !== "none" ||
          u.scale !== "none" ||
          u.rotate !== "none") &&
          (i[Qe] =
            (u.translate !== "none"
              ? "translate3d(" +
                (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                ") "
              : "") +
            (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") +
            (u.scale !== "none"
              ? "scale(" + u.scale.split(" ").join(",") + ") "
              : "") +
            (u[Qe] !== "none" ? u[Qe] : "")),
        (i.scale = i.rotate = i.translate = "none")),
      (P = dl(e, t.svg)),
      t.svg &&
        (t.uncache
          ? ((oe = e.getBBox()),
            (f = t.xOrigin - oe.x + "px " + (t.yOrigin - oe.y) + "px"),
            (X = ""))
          : (X = !r && e.getAttribute("data-svg-origin")),
        ba(e, X || f, !!X || t.originIsAbsolute, t.smooth !== !1, P)),
      (v = t.xOrigin || 0),
      (O = t.yOrigin || 0),
      P !== vo &&
        ((Y = P[0]),
        (A = P[1]),
        (F = P[2]),
        (V = P[3]),
        (c = J = P[4]),
        (h = U = P[5]),
        P.length === 6
          ? ((l = Math.sqrt(Y * Y + A * A)),
            (_ = Math.sqrt(V * V + F * F)),
            (p = Y || A ? Ki(A, Y) * Pi : 0),
            (S = F || V ? Ki(F, V) * Pi + p : 0),
            S && (_ *= Math.abs(Math.cos(S * pn))),
            t.svg && ((c -= v - (v * Y + O * F)), (h -= O - (v * A + O * V))))
          : ((Be = P[6]),
            (fe = P[7]),
            (y = P[8]),
            (Z = P[9]),
            (ee = P[10]),
            (ie = P[11]),
            (c = P[12]),
            (h = P[13]),
            (d = P[14]),
            (k = Ki(Be, ee)),
            (m = k * Pi),
            k &&
              ((R = Math.cos(-k)),
              (L = Math.sin(-k)),
              (X = J * R + y * L),
              (oe = U * R + Z * L),
              (te = Be * R + ee * L),
              (y = J * -L + y * R),
              (Z = U * -L + Z * R),
              (ee = Be * -L + ee * R),
              (ie = fe * -L + ie * R),
              (J = X),
              (U = oe),
              (Be = te)),
            (k = Ki(-F, ee)),
            (T = k * Pi),
            k &&
              ((R = Math.cos(-k)),
              (L = Math.sin(-k)),
              (X = Y * R - y * L),
              (oe = A * R - Z * L),
              (te = F * R - ee * L),
              (ie = V * L + ie * R),
              (Y = X),
              (A = oe),
              (F = te)),
            (k = Ki(A, Y)),
            (p = k * Pi),
            k &&
              ((R = Math.cos(k)),
              (L = Math.sin(k)),
              (X = Y * R + A * L),
              (oe = J * R + U * L),
              (A = A * R - Y * L),
              (U = U * R - J * L),
              (Y = X),
              (J = oe)),
            m &&
              Math.abs(m) + Math.abs(p) > 359.9 &&
              ((m = p = 0), (T = 180 - T)),
            (l = rt(Math.sqrt(Y * Y + A * A + F * F))),
            (_ = rt(Math.sqrt(U * U + Be * Be))),
            (k = Ki(J, U)),
            (S = Math.abs(k) > 2e-4 ? k * Pi : 0),
            (w = ie ? 1 / (ie < 0 ? -ie : ie) : 0)),
        t.svg &&
          ((X = e.getAttribute("transform")),
          (t.forceCSS = e.setAttribute("transform", "") || !sc(yr(e, Qe))),
          X && e.setAttribute("transform", X))),
      Math.abs(S) > 90 &&
        Math.abs(S) < 270 &&
        (n
          ? ((l *= -1), (S += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
          : ((_ *= -1), (S += S <= 0 ? 180 : -180))),
      (r = r || t.uncache),
      (t.x =
        c -
        ((t.xPercent =
          c &&
          ((!r && t.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0)))
          ? (e.offsetWidth * t.xPercent) / 100
          : 0) +
        o),
      (t.y =
        h -
        ((t.yPercent =
          h &&
          ((!r && t.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
          ? (e.offsetHeight * t.yPercent) / 100
          : 0) +
        o),
      (t.z = d + o),
      (t.scaleX = rt(l)),
      (t.scaleY = rt(_)),
      (t.rotation = rt(p) + s),
      (t.rotationX = rt(m) + s),
      (t.rotationY = rt(T) + s),
      (t.skewX = S + s),
      (t.skewY = M + s),
      (t.transformPerspective = w + o),
      (t.zOrigin = parseFloat(f.split(" ")[2]) || (!r && t.zOrigin) || 0) &&
        (i[Qt] = gs(f)),
      (t.xOffset = t.yOffset = 0),
      (t.force3D = sr.force3D),
      (t.renderTransform = t.svg ? Pd : rc ? ac : Cd),
      (t.uncache = 0),
      t
    );
  },
  gs = function (e) {
    return (e = e.split(" "))[0] + " " + e[1];
  },
  Xs = function (e, r, t) {
    var i = Lt(r);
    return rt(parseFloat(r) + parseFloat(gi(e, "x", t + "px", i))) + i;
  },
  Cd = function (e, r) {
    (r.z = "0px"),
      (r.rotationY = r.rotationX = "0deg"),
      (r.force3D = 0),
      ac(e, r);
  },
  xi = "0deg",
  Rn = "0px",
  vi = ") ",
  ac = function (e, r) {
    var t = r || this,
      i = t.xPercent,
      n = t.yPercent,
      o = t.x,
      s = t.y,
      u = t.z,
      f = t.rotation,
      c = t.rotationY,
      h = t.rotationX,
      d = t.skewX,
      l = t.skewY,
      _ = t.scaleX,
      p = t.scaleY,
      m = t.transformPerspective,
      T = t.force3D,
      S = t.target,
      M = t.zOrigin,
      w = "",
      v = (T === "auto" && e && e !== 1) || T === !0;
    if (M && (h !== xi || c !== xi)) {
      var O = parseFloat(c) * pn,
        P = Math.sin(O),
        k = Math.cos(O),
        R;
      (O = parseFloat(h) * pn),
        (R = Math.cos(O)),
        (o = Xs(S, o, P * R * -M)),
        (s = Xs(S, s, -Math.sin(O) * -M)),
        (u = Xs(S, u, k * R * -M + M));
    }
    m !== Rn && (w += "perspective(" + m + vi),
      (i || n) && (w += "translate(" + i + "%, " + n + "%) "),
      (v || o !== Rn || s !== Rn || u !== Rn) &&
        (w +=
          u !== Rn || v
            ? "translate3d(" + o + ", " + s + ", " + u + ") "
            : "translate(" + o + ", " + s + vi),
      f !== xi && (w += "rotate(" + f + vi),
      c !== xi && (w += "rotateY(" + c + vi),
      h !== xi && (w += "rotateX(" + h + vi),
      (d !== xi || l !== xi) && (w += "skew(" + d + ", " + l + vi),
      (_ !== 1 || p !== 1) && (w += "scale(" + _ + ", " + p + vi),
      (S.style[Qe] = w || "translate(0, 0)");
  },
  Pd = function (e, r) {
    var t = r || this,
      i = t.xPercent,
      n = t.yPercent,
      o = t.x,
      s = t.y,
      u = t.rotation,
      f = t.skewX,
      c = t.skewY,
      h = t.scaleX,
      d = t.scaleY,
      l = t.target,
      _ = t.xOrigin,
      p = t.yOrigin,
      m = t.xOffset,
      T = t.yOffset,
      S = t.forceCSS,
      M = parseFloat(o),
      w = parseFloat(s),
      v,
      O,
      P,
      k,
      R;
    (u = parseFloat(u)),
      (f = parseFloat(f)),
      (c = parseFloat(c)),
      c && ((c = parseFloat(c)), (f += c), (u += c)),
      u || f
        ? ((u *= pn),
          (f *= pn),
          (v = Math.cos(u) * h),
          (O = Math.sin(u) * h),
          (P = Math.sin(u - f) * -d),
          (k = Math.cos(u - f) * d),
          f &&
            ((c *= pn),
            (R = Math.tan(f - c)),
            (R = Math.sqrt(1 + R * R)),
            (P *= R),
            (k *= R),
            c &&
              ((R = Math.tan(c)),
              (R = Math.sqrt(1 + R * R)),
              (v *= R),
              (O *= R))),
          (v = rt(v)),
          (O = rt(O)),
          (P = rt(P)),
          (k = rt(k)))
        : ((v = h), (k = d), (O = P = 0)),
      ((M && !~(o + "").indexOf("px")) || (w && !~(s + "").indexOf("px"))) &&
        ((M = gi(l, "x", o, "px")), (w = gi(l, "y", s, "px"))),
      (_ || p || m || T) &&
        ((M = rt(M + _ - (_ * v + p * P) + m)),
        (w = rt(w + p - (_ * O + p * k) + T))),
      (i || n) &&
        ((R = l.getBBox()),
        (M = rt(M + (i / 100) * R.width)),
        (w = rt(w + (n / 100) * R.height))),
      (R =
        "matrix(" + v + "," + O + "," + P + "," + k + "," + M + "," + w + ")"),
      l.setAttribute("transform", R),
      S && (l.style[Qe] = R);
  },
  kd = function (e, r, t, i, n) {
    var o = 360,
      s = xt(n),
      u = parseFloat(n) * (s && ~n.indexOf("rad") ? Pi : 1),
      f = u - i,
      c = i + f + "deg",
      h,
      d;
    return (
      s &&
        ((h = n.split("_")[1]),
        h === "short" && ((f %= o), f !== f % (o / 2) && (f += f < 0 ? o : -o)),
        h === "cw" && f < 0
          ? (f = ((f + o * tu) % o) - ~~(f / o) * o)
          : h === "ccw" && f > 0 && (f = ((f - o * tu) % o) - ~~(f / o) * o)),
      (e._pt = d = new Kt(e._pt, r, t, i, f, fd)),
      (d.e = c),
      (d.u = "deg"),
      e._props.push(t),
      d
    );
  },
  lu = function (e, r) {
    for (var t in r) e[t] = r[t];
    return e;
  },
  Ed = function (e, r, t) {
    var i = lu({}, t._gsap),
      n = "perspective,force3D,transformOrigin,svgOrigin",
      o = t.style,
      s,
      u,
      f,
      c,
      h,
      d,
      l,
      _;
    i.svg
      ? ((f = t.getAttribute("transform")),
        t.setAttribute("transform", ""),
        (o[Qe] = r),
        (s = wo(t, 1)),
        Vi(t, Qe),
        t.setAttribute("transform", f))
      : ((f = getComputedStyle(t)[Qe]),
        (o[Qe] = r),
        (s = wo(t, 1)),
        (o[Qe] = f));
    for (u in Qr)
      (f = i[u]),
        (c = s[u]),
        f !== c &&
          n.indexOf(u) < 0 &&
          ((l = Lt(f)),
          (_ = Lt(c)),
          (h = l !== _ ? gi(t, u, f, _) : parseFloat(f)),
          (d = parseFloat(c)),
          (e._pt = new Kt(e._pt, s, u, h, d - h, xa)),
          (e._pt.u = _ || 0),
          e._props.push(u));
    lu(s, i);
  };
qt("padding,margin,Width,Radius", function (a, e) {
  var r = "Top",
    t = "Right",
    i = "Bottom",
    n = "Left",
    o = (e < 3 ? [r, t, i, n] : [r + n, r + t, i + t, i + n]).map(function (s) {
      return e < 2 ? a + s : "border" + s + a;
    });
  _s[e > 1 ? "border" + a : a] = function (s, u, f, c, h) {
    var d, l;
    if (arguments.length < 4)
      return (
        (d = o.map(function (_) {
          return Yr(s, _, f);
        })),
        (l = d.join(" ")),
        l.split(d[0]).length === 5 ? d[0] : l
      );
    (d = (c + "").split(" ")),
      (l = {}),
      o.forEach(function (_, p) {
        return (l[_] = d[p] = d[p] || d[((p - 1) / 2) | 0]);
      }),
      s.init(u, l, h);
  };
});
var lc = {
  name: "css",
  register: wa,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, r, t, i, n) {
    var o = this._props,
      s = e.style,
      u = t.vars.startAt,
      f,
      c,
      h,
      d,
      l,
      _,
      p,
      m,
      T,
      S,
      M,
      w,
      v,
      O,
      P,
      k;
    fl || wa(),
      (this.styles = this.styles || tc(e)),
      (k = this.styles.props),
      (this.tween = t);
    for (p in r)
      if (p !== "autoRound" && ((c = r[p]), !(er[p] && Vf(p, r, t, i, e, n)))) {
        if (
          ((l = typeof c),
          (_ = _s[p]),
          l === "function" && ((c = c.call(t, i, e, n)), (l = typeof c)),
          l === "string" && ~c.indexOf("random(") && (c = mo(c)),
          _)
        )
          _(this, e, p, c, t) && (P = 1);
        else if (p.substr(0, 2) === "--")
          (f = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
            (c += ""),
            (hi.lastIndex = 0),
            hi.test(f) || ((m = Lt(f)), (T = Lt(c))),
            T ? m !== T && (f = gi(e, p, f, T) + T) : m && (c += m),
            this.add(s, "setProperty", f, c, i, n, 0, 0, p),
            o.push(p),
            k.push(p, 0, s[p]);
        else if (l !== "undefined") {
          if (
            (u && p in u
              ? ((f = typeof u[p] == "function" ? u[p].call(t, i, e, n) : u[p]),
                xt(f) && ~f.indexOf("random(") && (f = mo(f)),
                Lt(f + "") ||
                  f === "auto" ||
                  (f += sr.units[p] || Lt(Yr(e, p)) || ""),
                (f + "").charAt(1) === "=" && (f = Yr(e, p)))
              : (f = Yr(e, p)),
            (d = parseFloat(f)),
            (S = l === "string" && c.charAt(1) === "=" && c.substr(0, 2)),
            S && (c = c.substr(2)),
            (h = parseFloat(c)),
            p in Nr &&
              (p === "autoAlpha" &&
                (d === 1 && Yr(e, "visibility") === "hidden" && h && (d = 0),
                k.push("visibility", 0, s.visibility),
                li(
                  this,
                  s,
                  "visibility",
                  d ? "inherit" : "hidden",
                  h ? "inherit" : "hidden",
                  !h
                )),
              p !== "scale" &&
                p !== "transform" &&
                ((p = Nr[p]), ~p.indexOf(",") && (p = p.split(",")[0]))),
            (M = p in Qr),
            M)
          ) {
            if (
              (this.styles.save(p),
              l === "string" &&
                c.substring(0, 6) === "var(--" &&
                ((c = yr(e, c.substring(4, c.indexOf(")")))),
                (h = parseFloat(c))),
              w ||
                ((v = e._gsap),
                (v.renderTransform && !r.parseTransform) ||
                  wo(e, r.parseTransform),
                (O = r.smoothOrigin !== !1 && v.smooth),
                (w = this._pt =
                  new Kt(this._pt, s, Qe, 0, 1, v.renderTransform, v, 0, -1)),
                (w.dep = 1)),
              p === "scale")
            )
              (this._pt = new Kt(
                this._pt,
                v,
                "scaleY",
                v.scaleY,
                (S ? hn(v.scaleY, S + h) : h) - v.scaleY || 0,
                xa
              )),
                (this._pt.u = 0),
                o.push("scaleY", p),
                (p += "X");
            else if (p === "transformOrigin") {
              k.push(Qt, 0, s[Qt]),
                (c = Td(c)),
                v.svg
                  ? ba(e, c, 0, O, 0, this)
                  : ((T = parseFloat(c.split(" ")[2]) || 0),
                    T !== v.zOrigin && li(this, v, "zOrigin", v.zOrigin, T),
                    li(this, s, p, gs(f), gs(c)));
              continue;
            } else if (p === "svgOrigin") {
              ba(e, c, 1, O, 0, this);
              continue;
            } else if (p in oc) {
              kd(this, v, p, d, S ? hn(d, S + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              li(this, v, "smooth", v.smooth, c);
              continue;
            } else if (p === "force3D") {
              v[p] = c;
              continue;
            } else if (p === "transform") {
              Ed(this, c, e);
              continue;
            }
          } else p in s || (p = Pn(p) || p);
          if (M || ((h || h === 0) && (d || d === 0) && !ud.test(c) && p in s))
            (m = (f + "").substr((d + "").length)),
              h || (h = 0),
              (T = Lt(c) || (p in sr.units ? sr.units[p] : m)),
              m !== T && (d = gi(e, p, f, T)),
              (this._pt = new Kt(
                this._pt,
                M ? v : s,
                p,
                d,
                (S ? hn(d, S + h) : h) - d,
                !M && (T === "px" || p === "zIndex") && r.autoRound !== !1
                  ? hd
                  : xa
              )),
              (this._pt.u = T || 0),
              m !== T && T !== "%" && ((this._pt.b = f), (this._pt.r = cd));
          else if (p in s) bd.call(this, e, p, f, S ? S + c : c);
          else if (p in e) this.add(e, p, f || e[p], S ? S + c : c, i, n);
          else if (p !== "parseTransform") {
            el(p, c);
            continue;
          }
          M ||
            (p in s
              ? k.push(p, 0, s[p])
              : typeof e[p] == "function"
              ? k.push(p, 2, e[p]())
              : k.push(p, 1, f || e[p])),
            o.push(p);
        }
      }
    P && Qf(this);
  },
  render: function (e, r) {
    if (r.tween._time || !cl())
      for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next);
    else r.styles.revert();
  },
  get: Yr,
  aliases: Nr,
  getSetter: function (e, r, t) {
    var i = Nr[r];
    return (
      i && i.indexOf(",") < 0 && (r = i),
      r in Qr && r !== Qt && (e._gsap.x || Yr(e, "x"))
        ? t && eu === t
          ? r === "scale"
            ? gd
            : _d
          : (eu = t || {}) && (r === "scale" ? md : yd)
        : e.style && !ja(e.style[r])
        ? dd
        : ~r.indexOf("-")
        ? pd
        : ll(e, r)
    );
  },
  core: { _removeProperty: Vi, _getMatrix: dl },
};
jt.utils.checkPrefix = Pn;
jt.core.getStyleSaver = tc;
(function (a, e, r, t) {
  var i = qt(a + "," + e + "," + r, function (n) {
    Qr[n] = 1;
  });
  qt(e, function (n) {
    (sr.units[n] = "deg"), (oc[n] = 1);
  }),
    (Nr[i[13]] = a + "," + e),
    qt(t, function (n) {
      var o = n.split(":");
      Nr[o[1]] = i[o[0]];
    });
})(
  "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
  "rotation,rotationX,rotationY,skewX,skewY",
  "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
  "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
);
qt(
  "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
  function (a) {
    sr.units[a] = "px";
  }
);
jt.registerPlugin(lc);
var nt = jt.registerPlugin(lc) || jt;
nt.core.Tween;
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */ let An,
  Qi,
  Ta,
  Md = () => Ta || hc.register(window.gsap),
  uu = typeof Intl < "u" ? new Intl.Segmenter() : 0,
  ms = (a) =>
    typeof a == "string"
      ? ms(document.querySelectorAll(a))
      : "length" in a
      ? Array.from(a)
      : [a],
  fu = (a) => ms(a).filter((e) => e instanceof HTMLElement),
  Sa = [],
  Ws = function () {},
  Dd = /\s+/g,
  cu = new RegExp(
    "\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.",
    "gu"
  ),
  hu = { left: 0, top: 0, width: 0, height: 0 },
  du = (a, e) => {
    if (e) {
      let r = new Set(a.join("").match(e) || Sa),
        t = a.length,
        i,
        n,
        o,
        s;
      if (r.size)
        for (; --t > -1; ) {
          n = a[t];
          for (o of r)
            if (o.startsWith(n) && o.length > n.length) {
              for (
                i = 0, s = n;
                o.startsWith((s += a[t + ++i])) && s.length < o.length;

              );
              if (i && s.length === o.length) {
                (a[t] = o), a.splice(t + 1, i);
                break;
              }
            }
        }
    }
    return a;
  },
  pu = (a) =>
    window.getComputedStyle(a).display === "inline" &&
    (a.style.display = "inline-block"),
  ji = (a, e, r) =>
    e.insertBefore(typeof a == "string" ? document.createTextNode(a) : a, r),
  Ca = (a, e, r) => {
    let t = e[a + "sClass"] || "",
      { tag: i = "div", aria: n = "auto", propIndex: o = !1 } = e,
      s = a === "line" ? "block" : "inline-block",
      u = t.indexOf("++") > -1,
      f = (c) => {
        let h = document.createElement(i),
          d = r.length + 1;
        return (
          t && (h.className = t + (u ? " " + t + d : "")),
          o && h.style.setProperty("--" + a, d + ""),
          n !== "none" && h.setAttribute("aria-hidden", "true"),
          i !== "span" &&
            ((h.style.position = "relative"), (h.style.display = s)),
          (h.textContent = c),
          r.push(h),
          h
        );
      };
    return u && (t = t.replace("++", "")), (f.collection = r), f;
  },
  Od = (a, e, r, t) => {
    let i = Ca("line", r, t),
      n = window.getComputedStyle(a).textAlign || "left";
    return (o, s) => {
      let u = i("");
      for (u.style.textAlign = n, a.insertBefore(u, e[o]); o < s; o++)
        u.appendChild(e[o]);
      u.normalize();
    };
  },
  uc = (a, e, r, t, i, n, o, s, u, f) => {
    var c;
    let h = Array.from(a.childNodes),
      d = 0,
      { wordDelimiter: l, reduceWhiteSpace: _ = !0, prepareText: p } = e,
      m = a.getBoundingClientRect(),
      T = m,
      S = !_ && window.getComputedStyle(a).whiteSpace.substring(0, 3) === "pre",
      M = 0,
      w = r.collection,
      v,
      O,
      P,
      k,
      R,
      L,
      Y,
      A,
      F,
      V,
      J,
      U,
      X,
      oe,
      te,
      y,
      Z,
      ee;
    for (
      typeof l == "object"
        ? ((P = l.delimiter || l), (O = l.replaceWith || ""))
        : (O = l === "" ? "" : l || " "),
        v = O !== " ";
      d < h.length;
      d++
    )
      if (((k = h[d]), k.nodeType === 3)) {
        for (
          te = k.textContent || "",
            _
              ? (te = te.replace(Dd, " "))
              : S &&
                (te = te.replace(
                  /\n/g,
                  O +
                    `
`
                )),
            p && (te = p(te, a)),
            k.textContent = te,
            R = O || P ? te.split(P || O) : te.match(s) || Sa,
            Z = R[R.length - 1],
            A = v ? Z.slice(-1) === " " : !Z,
            Z || R.pop(),
            T = m,
            Y = v ? R[0].charAt(0) === " " : !R[0],
            Y && ji(" ", a, k),
            R[0] || R.shift(),
            du(R, u),
            (n && f) || (k.textContent = ""),
            F = 1;
          F <= R.length;
          F++
        )
          if (
            ((y = R[F - 1]),
            !_ &&
              S &&
              y.charAt(0) ===
                `
` &&
              ((c = k.previousSibling) == null || c.remove(),
              ji(document.createElement("br"), a, k),
              (y = y.slice(1))),
            !_ && y === "")
          )
            ji(O, a, k);
          else if (y === " ") a.insertBefore(document.createTextNode(" "), k);
          else {
            if (
              (v && y.charAt(0) === " " && ji(" ", a, k),
              M && F === 1 && !Y && w.indexOf(M.parentNode) > -1
                ? ((L = w[w.length - 1]),
                  L.appendChild(document.createTextNode(t ? "" : y)))
                : ((L = r(t ? "" : y)),
                  ji(L, a, k),
                  M && F === 1 && !Y && L.insertBefore(M, L.firstChild)),
              t)
            )
              for (
                J = uu
                  ? du(
                      [...uu.segment(y)].map((fe) => fe.segment),
                      u
                    )
                  : y.match(s) || Sa,
                  ee = 0;
                ee < J.length;
                ee++
              )
                L.appendChild(
                  J[ee] === " " ? document.createTextNode(" ") : t(J[ee])
                );
            if (n && f) {
              if (
                ((te = k.textContent = te.substring(y.length + 1, te.length)),
                (V = L.getBoundingClientRect()),
                V.top > T.top && V.left <= T.left)
              ) {
                for (U = a.cloneNode(), X = a.childNodes[0]; X && X !== L; )
                  (oe = X), (X = X.nextSibling), U.appendChild(oe);
                a.parentNode.insertBefore(U, a), i && pu(U);
              }
              T = V;
            }
            (F < R.length || A) &&
              ji(
                F >= R.length ? " " : v && y.slice(-1) === " " ? " " + O : O,
                a,
                k
              );
          }
        a.removeChild(k), (M = 0);
      } else
        k.nodeType === 1 &&
          (o && o.indexOf(k) > -1
            ? (w.indexOf(k.previousSibling) > -1 &&
                w[w.length - 1].appendChild(k),
              (M = k))
            : (uc(k, e, r, t, i, n, o, s, u, !0), (M = 0)),
          i && pu(k));
  };
const fc = class cc {
  constructor(e, r) {
    (this.isSplit = !1),
      Md(),
      (this.elements = fu(e)),
      (this.chars = []),
      (this.words = []),
      (this.lines = []),
      (this.masks = []),
      (this.vars = r),
      (this._split = () => this.isSplit && this.split(this.vars));
    let t = [],
      i,
      n = () => {
        let o = t.length,
          s;
        for (; o--; ) {
          s = t[o];
          let u = s.element.offsetWidth;
          if (u !== s.width) {
            (s.width = u), this._split();
            return;
          }
        }
      };
    (this._data = {
      orig: t,
      obs:
        typeof ResizeObserver < "u" &&
        new ResizeObserver(() => {
          clearTimeout(i), (i = setTimeout(n, 200));
        }),
    }),
      Ws(this),
      this.split(r);
  }
  split(e) {
    this.isSplit && this.revert(), (this.vars = e = e || this.vars || {});
    let {
        type: r = "chars,words,lines",
        aria: t = "auto",
        deepSlice: i = !0,
        smartWrap: n,
        onSplit: o,
        autoSplit: s = !1,
        specialChars: u,
        mask: f,
      } = this.vars,
      c = r.indexOf("lines") > -1,
      h = r.indexOf("chars") > -1,
      d = r.indexOf("words") > -1,
      l = h && !d && !c,
      _ = u && ("push" in u ? new RegExp("(?:" + u.join("|") + ")", "gu") : u),
      p = _ ? new RegExp(_.source + "|" + cu.source, "gu") : cu,
      m = !!e.ignore && fu(e.ignore),
      { orig: T, animTime: S, obs: M } = this._data,
      w;
    return (
      (h || d || c) &&
        (this.elements.forEach((v, O) => {
          (T[O] = {
            element: v,
            html: v.innerHTML,
            ariaL: v.getAttribute("aria-label"),
            ariaH: v.getAttribute("aria-hidden"),
          }),
            t === "auto"
              ? v.setAttribute("aria-label", (v.textContent || "").trim())
              : t === "hidden" && v.setAttribute("aria-hidden", "true");
          let P = [],
            k = [],
            R = [],
            L = h ? Ca("char", e, P) : null,
            Y = Ca("word", e, k),
            A,
            F,
            V,
            J;
          if ((uc(v, e, Y, L, l, i && (c || l), m, p, _, !1), c)) {
            let U = ms(v.childNodes),
              X = Od(v, U, e, R),
              oe,
              te = [],
              y = 0,
              Z = U.map((fe) =>
                fe.nodeType === 1 ? fe.getBoundingClientRect() : hu
              ),
              ee = hu;
            for (A = 0; A < U.length; A++)
              (oe = U[A]),
                oe.nodeType === 1 &&
                  (oe.nodeName === "BR"
                    ? (te.push(oe), X(y, A + 1), (y = A + 1), (ee = Z[y]))
                    : (A &&
                        Z[A].top > ee.top &&
                        Z[A].left <= ee.left &&
                        (X(y, A), (y = A)),
                      (ee = Z[A])));
            y < A && X(y, A),
              te.forEach((fe) => {
                var ie;
                return (ie = fe.parentNode) == null
                  ? void 0
                  : ie.removeChild(fe);
              });
          }
          if (!d) {
            for (A = 0; A < k.length; A++)
              if (
                ((F = k[A]),
                h || !F.nextSibling || F.nextSibling.nodeType !== 3)
              )
                if (n && !c) {
                  for (
                    V = document.createElement("span"),
                      V.style.whiteSpace = "nowrap";
                    F.firstChild;

                  )
                    V.appendChild(F.firstChild);
                  F.replaceWith(V);
                } else F.replaceWith(...F.childNodes);
              else
                (J = F.nextSibling),
                  J &&
                    J.nodeType === 3 &&
                    ((J.textContent =
                      (F.textContent || "") + (J.textContent || "")),
                    F.remove());
            (k.length = 0), v.normalize();
          }
          this.lines.push(...R), this.words.push(...k), this.chars.push(...P);
        }),
        f &&
          this[f] &&
          this.masks.push(
            ...this[f].map((v) => {
              let O = v.cloneNode();
              return (
                v.replaceWith(O),
                O.appendChild(v),
                v.className &&
                  (O.className = v.className.replace(/(\b\w+\b)/g, "$1-mask")),
                (O.style.overflow = "clip"),
                O
              );
            })
          )),
      (this.isSplit = !0),
      Qi &&
        (s
          ? Qi.addEventListener("loadingdone", this._split)
          : Qi.status === "loading" &&
            console.warn("SplitText called before fonts loaded")),
      (w = o && o(this)) &&
        w.totalTime &&
        (this._data.anim = S ? w.totalTime(S) : w),
      c &&
        s &&
        this.elements.forEach((v, O) => {
          (T[O].width = v.offsetWidth), M && M.observe(v);
        }),
      this
    );
  }
  revert() {
    var e, r;
    let { orig: t, anim: i, obs: n } = this._data;
    return (
      n && n.disconnect(),
      t.forEach(({ element: o, html: s, ariaL: u, ariaH: f }) => {
        (o.innerHTML = s),
          u ? o.setAttribute("aria-label", u) : o.removeAttribute("aria-label"),
          f
            ? o.setAttribute("aria-hidden", f)
            : o.removeAttribute("aria-hidden");
      }),
      (this.chars.length =
        this.words.length =
        this.lines.length =
        t.length =
        this.masks.length =
          0),
      (this.isSplit = !1),
      Qi?.removeEventListener("loadingdone", this._split),
      i && ((this._data.animTime = i.totalTime()), i.revert()),
      (r = (e = this.vars).onRevert) == null || r.call(e, this),
      this
    );
  }
  static create(e, r) {
    return new cc(e, r);
  }
  static register(e) {
    (An = An || e || window.gsap),
      An && ((ms = An.utils.toArray), (Ws = An.core.context || Ws)),
      !Ta && window.innerWidth > 0 && ((Qi = document.fonts), (Ta = !0));
  }
};
fc.version = "3.13.0";
let hc = fc;
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Hr,
  Ii,
  pl,
  Ps,
  Wn,
  rs,
  ys,
  so,
  Sr = "transform",
  Pa = Sr + "Origin",
  dc,
  pc = function (e) {
    var r = e.ownerDocument || e;
    for (
      !(Sr in e.style) &&
      ("msTransform" in e.style) &&
      ((Sr = "msTransform"), (Pa = Sr + "Origin"));
      r.parentNode && (r = r.parentNode);

    );
    if (((Ii = window), (ys = new Hi()), r)) {
      (Hr = r),
        (pl = r.documentElement),
        (Ps = r.body),
        (so = Hr.createElementNS("http://www.w3.org/2000/svg", "g")),
        (so.style.transform = "none");
      var t = r.createElement("div"),
        i = r.createElement("div"),
        n = r && (r.body || r.firstElementChild);
      n &&
        n.appendChild &&
        (n.appendChild(t),
        t.appendChild(i),
        t.setAttribute(
          "style",
          "position:static;transform:translate3d(0,0,1px)"
        ),
        (dc = i.offsetParent !== t),
        n.removeChild(t));
    }
    return r;
  },
  Rd = function (e) {
    for (var r, t; e && e !== Ps; )
      (t = e._gsap),
        t && t.uncache && t.get(e, "x"),
        t &&
          !t.scaleX &&
          !t.scaleY &&
          t.renderTransform &&
          ((t.scaleX = t.scaleY = 1e-4),
          t.renderTransform(1, t),
          r ? r.push(t) : (r = [t])),
        (e = e.parentNode);
    return r;
  },
  _c = [],
  gc = [],
  Ad = function () {
    return Ii.pageYOffset || Hr.scrollTop || pl.scrollTop || Ps.scrollTop || 0;
  },
  Ld = function () {
    return (
      Ii.pageXOffset || Hr.scrollLeft || pl.scrollLeft || Ps.scrollLeft || 0
    );
  },
  _l = function (e) {
    return (
      e.ownerSVGElement || ((e.tagName + "").toLowerCase() === "svg" ? e : null)
    );
  },
  Nd = function a(e) {
    if (Ii.getComputedStyle(e).position === "fixed") return !0;
    if (((e = e.parentNode), e && e.nodeType === 1)) return a(e);
  },
  Vs = function a(e, r) {
    if (e.parentNode && (Hr || pc(e))) {
      var t = _l(e),
        i = t
          ? t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"
          : "http://www.w3.org/1999/xhtml",
        n = t ? (r ? "rect" : "g") : "div",
        o = r !== 2 ? 0 : 100,
        s = r === 3 ? 100 : 0,
        u =
          "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        f = Hr.createElementNS
          ? Hr.createElementNS(i.replace(/^https/, "http"), n)
          : Hr.createElement(n);
      return (
        r &&
          (t
            ? (rs || (rs = a(e)),
              f.setAttribute("width", 0.01),
              f.setAttribute("height", 0.01),
              f.setAttribute("transform", "translate(" + o + "," + s + ")"),
              rs.appendChild(f))
            : (Wn || ((Wn = a(e)), (Wn.style.cssText = u)),
              (f.style.cssText =
                u +
                "width:0.1px;height:0.1px;top:" +
                s +
                "px;left:" +
                o +
                "px"),
              Wn.appendChild(f))),
        f
      );
    }
    throw "Need document and parent.";
  },
  Fd = function (e) {
    for (var r = new Hi(), t = 0; t < e.numberOfItems; t++)
      r.multiply(e.getItem(t).matrix);
    return r;
  },
  Id = function (e) {
    var r = e.getCTM(),
      t;
    return (
      r ||
        ((t = e.style[Sr]),
        (e.style[Sr] = "none"),
        e.appendChild(so),
        (r = so.getCTM()),
        e.removeChild(so),
        t
          ? (e.style[Sr] = t)
          : e.style.removeProperty(
              Sr.replace(/([A-Z])/g, "-$1").toLowerCase()
            )),
      r || ys.clone()
    );
  },
  $d = function (e, r) {
    var t = _l(e),
      i = e === t,
      n = t ? _c : gc,
      o = e.parentNode,
      s =
        o && !t && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o,
      u,
      f,
      c,
      h,
      d,
      l;
    if (e === Ii) return e;
    if (
      (n.length || n.push(Vs(e, 1), Vs(e, 2), Vs(e, 3)), (u = t ? rs : Wn), t)
    )
      i
        ? ((c = Id(e)), (h = -c.e / c.a), (d = -c.f / c.d), (f = ys))
        : e.getBBox
        ? ((c = e.getBBox()),
          (f = e.transform ? e.transform.baseVal : {}),
          (f = f.numberOfItems
            ? f.numberOfItems > 1
              ? Fd(f)
              : f.getItem(0).matrix
            : ys),
          (h = f.a * c.x + f.c * c.y),
          (d = f.b * c.x + f.d * c.y))
        : ((f = new Hi()), (h = d = 0)),
        (i ? t : o).appendChild(u),
        u.setAttribute(
          "transform",
          "matrix(" +
            f.a +
            "," +
            f.b +
            "," +
            f.c +
            "," +
            f.d +
            "," +
            (f.e + h) +
            "," +
            (f.f + d) +
            ")"
        );
    else {
      if (((h = d = 0), dc))
        for (
          f = e.offsetParent, c = e;
          c && (c = c.parentNode) && c !== f && c.parentNode;

        )
          (Ii.getComputedStyle(c)[Sr] + "").length > 4 &&
            ((h = c.offsetLeft), (d = c.offsetTop), (c = 0));
      if (
        ((l = Ii.getComputedStyle(e)),
        l.position !== "absolute" && l.position !== "fixed")
      )
        for (f = e.offsetParent; o && o !== f; )
          (h += o.scrollLeft || 0), (d += o.scrollTop || 0), (o = o.parentNode);
      (c = u.style),
        (c.top = e.offsetTop - d + "px"),
        (c.left = e.offsetLeft - h + "px"),
        (c[Sr] = l[Sr]),
        (c[Pa] = l[Pa]),
        (c.position = l.position === "fixed" ? "fixed" : "absolute"),
        s.appendChild(u);
    }
    return u;
  },
  Hs = function (e, r, t, i, n, o, s) {
    return (e.a = r), (e.b = t), (e.c = i), (e.d = n), (e.e = o), (e.f = s), e;
  },
  Hi = (function () {
    function a(r, t, i, n, o, s) {
      r === void 0 && (r = 1),
        t === void 0 && (t = 0),
        i === void 0 && (i = 0),
        n === void 0 && (n = 1),
        o === void 0 && (o = 0),
        s === void 0 && (s = 0),
        Hs(this, r, t, i, n, o, s);
    }
    var e = a.prototype;
    return (
      (e.inverse = function () {
        var t = this.a,
          i = this.b,
          n = this.c,
          o = this.d,
          s = this.e,
          u = this.f,
          f = t * o - i * n || 1e-10;
        return Hs(
          this,
          o / f,
          -i / f,
          -n / f,
          t / f,
          (n * u - o * s) / f,
          -(t * u - i * s) / f
        );
      }),
      (e.multiply = function (t) {
        var i = this.a,
          n = this.b,
          o = this.c,
          s = this.d,
          u = this.e,
          f = this.f,
          c = t.a,
          h = t.c,
          d = t.b,
          l = t.d,
          _ = t.e,
          p = t.f;
        return Hs(
          this,
          c * i + d * o,
          c * n + d * s,
          h * i + l * o,
          h * n + l * s,
          u + _ * i + p * o,
          f + _ * n + p * s
        );
      }),
      (e.clone = function () {
        return new a(this.a, this.b, this.c, this.d, this.e, this.f);
      }),
      (e.equals = function (t) {
        var i = this.a,
          n = this.b,
          o = this.c,
          s = this.d,
          u = this.e,
          f = this.f;
        return (
          i === t.a &&
          n === t.b &&
          o === t.c &&
          s === t.d &&
          u === t.e &&
          f === t.f
        );
      }),
      (e.apply = function (t, i) {
        i === void 0 && (i = {});
        var n = t.x,
          o = t.y,
          s = this.a,
          u = this.b,
          f = this.c,
          c = this.d,
          h = this.e,
          d = this.f;
        return (
          (i.x = n * s + o * f + h || 0), (i.y = n * u + o * c + d || 0), i
        );
      }),
      a
    );
  })();
function ki(a, e, r, t) {
  if (!a || !a.parentNode || (Hr || pc(a)).documentElement === a)
    return new Hi();
  var i = Rd(a),
    n = _l(a),
    o = n ? _c : gc,
    s = $d(a),
    u = o[0].getBoundingClientRect(),
    f = o[1].getBoundingClientRect(),
    c = o[2].getBoundingClientRect(),
    h = s.parentNode,
    d = Nd(a),
    l = new Hi(
      (f.left - u.left) / 100,
      (f.top - u.top) / 100,
      (c.left - u.left) / 100,
      (c.top - u.top) / 100,
      u.left + (d ? 0 : Ld()),
      u.top + (d ? 0 : Ad())
    );
  if ((h.removeChild(s), i))
    for (u = i.length; u--; )
      (f = i[u]), (f.scaleX = f.scaleY = 0), f.renderTransform(1, f);
  return e ? l.inverse() : l;
}
function _u(a) {
  if (a === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return a;
}
function zd(a, e) {
  (a.prototype = Object.create(e.prototype)),
    (a.prototype.constructor = a),
    (a.__proto__ = e);
}
var Pe,
  Ve,
  nr,
  Pr,
  Ur,
  Us,
  Xr,
  ka,
  Vn,
  ui,
  mc,
  Ea,
  bo,
  gl,
  Hn,
  wr,
  Un,
  is,
  yc,
  Ma,
  xs = 0,
  xc = function () {
    return typeof window < "u";
  },
  vc = function () {
    return Pe || (xc() && (Pe = window.gsap) && Pe.registerPlugin && Pe);
  },
  ii = function (e) {
    return typeof e == "function";
  },
  ao = function (e) {
    return typeof e == "object";
  },
  br = function (e) {
    return typeof e > "u";
  },
  ns = function () {
    return !1;
  },
  lo = "transform",
  Da = "transformOrigin",
  Jr = function (e) {
    return Math.round(e * 1e4) / 1e4;
  },
  Ln = Array.isArray,
  Ho = function (e, r) {
    var t = nr.createElementNS
      ? nr.createElementNS(
          "http://www.w3.org/1999/xhtml".replace(/^https/, "http"),
          e
        )
      : nr.createElement(e);
    return t.style ? t : nr.createElement(e);
  },
  gu = 180 / Math.PI,
  wi = 1e20,
  Bd = new Hi(),
  ei =
    Date.now ||
    function () {
      return new Date().getTime();
    },
  $i = [],
  _n = {},
  Yd = 0,
  Xd = /^(?:a|input|textarea|button|select)$/i,
  mu = 0,
  Zi = {},
  zr = {},
  wc = function (e, r) {
    var t = {},
      i;
    for (i in e) t[i] = r ? e[i] * r : e[i];
    return t;
  },
  Wd = function (e, r) {
    for (var t in r) t in e || (e[t] = r[t]);
    return e;
  },
  yu = function a(e, r) {
    for (var t = e.length, i; t--; )
      r
        ? (e[t].style.touchAction = r)
        : e[t].style.removeProperty("touch-action"),
        (i = e[t].children),
        i && i.length && a(i, r);
  },
  bc = function () {
    return $i.forEach(function (e) {
      return e();
    });
  },
  Vd = function (e) {
    $i.push(e), $i.length === 1 && Pe.ticker.add(bc);
  },
  xu = function () {
    return !$i.length && Pe.ticker.remove(bc);
  },
  vu = function (e) {
    for (var r = $i.length; r--; ) $i[r] === e && $i.splice(r, 1);
    Pe.to(xu, {
      overwrite: !0,
      delay: 15,
      duration: 0,
      onComplete: xu,
      data: "_draggable",
    });
  },
  Hd = function (e, r) {
    for (var t in r) t in e || (e[t] = r[t]);
    return e;
  },
  ht = function (e, r, t, i) {
    if (e.addEventListener) {
      var n = bo[r];
      (i = i || (mc ? { passive: !1 } : null)),
        e.addEventListener(n || r, t, i),
        n && r !== n && e.addEventListener(r, t, i);
    }
  },
  st = function (e, r, t, i) {
    if (e.removeEventListener) {
      var n = bo[r];
      e.removeEventListener(n || r, t, i),
        n && r !== n && e.removeEventListener(r, t, i);
    }
  },
  fr = function (e) {
    e.preventDefault && e.preventDefault(),
      e.preventManipulation && e.preventManipulation();
  },
  Ud = function (e, r) {
    for (var t = e.length; t--; ) if (e[t].identifier === r) return !0;
  },
  Gd = function a(e) {
    (gl = e.touches && xs < e.touches.length), st(e.target, "touchend", a);
  },
  wu = function (e) {
    (gl = e.touches && xs < e.touches.length), ht(e.target, "touchend", Gd);
  },
  gn = function (e) {
    return (
      Ve.pageYOffset ||
      e.scrollTop ||
      e.documentElement.scrollTop ||
      e.body.scrollTop ||
      0
    );
  },
  mn = function (e) {
    return (
      Ve.pageXOffset ||
      e.scrollLeft ||
      e.documentElement.scrollLeft ||
      e.body.scrollLeft ||
      0
    );
  },
  bu = function a(e, r) {
    ht(e, "scroll", r), kn(e.parentNode) || a(e.parentNode, r);
  },
  Tu = function a(e, r) {
    st(e, "scroll", r), kn(e.parentNode) || a(e.parentNode, r);
  },
  kn = function (e) {
    return (
      !e ||
      e === Pr ||
      e.nodeType === 9 ||
      e === nr.body ||
      e === Ve ||
      !e.nodeType ||
      !e.parentNode
    );
  },
  Su = function (e, r) {
    var t = r === "x" ? "Width" : "Height",
      i = "scroll" + t,
      n = "client" + t;
    return Math.max(
      0,
      kn(e)
        ? Math.max(Pr[i], Ur[i]) - (Ve["inner" + t] || Pr[n] || Ur[n])
        : e[i] - e[n]
    );
  },
  Gs = function a(e, r) {
    var t = Su(e, "x"),
      i = Su(e, "y");
    kn(e) ? (e = zr) : a(e.parentNode, r),
      (e._gsMaxScrollX = t),
      (e._gsMaxScrollY = i),
      r ||
        ((e._gsScrollX = e.scrollLeft || 0), (e._gsScrollY = e.scrollTop || 0));
  },
  qs = function (e, r, t) {
    var i = e.style;
    i &&
      (br(i[r]) && (r = Vn(r, e) || r),
      t == null
        ? i.removeProperty &&
          i.removeProperty(r.replace(/([A-Z])/g, "-$1").toLowerCase())
        : (i[r] = t));
  },
  To = function (e) {
    return Ve.getComputedStyle(
      e instanceof Element ? e : e.host || (e.parentNode || {}).host || e
    );
  },
  bi = {},
  Ji = function (e) {
    if (e === Ve)
      return (
        (bi.left = bi.top = 0),
        (bi.width = bi.right =
          Pr.clientWidth || e.innerWidth || Ur.clientWidth || 0),
        (bi.height = bi.bottom =
          (e.innerHeight || 0) - 20 < Pr.clientHeight
            ? Pr.clientHeight
            : e.innerHeight || Ur.clientHeight || 0),
        bi
      );
    var r = e.ownerDocument || nr,
      t = br(e.pageX)
        ? !e.nodeType && !br(e.left) && !br(e.top)
          ? e
          : ui(e)[0].getBoundingClientRect()
        : {
            left: e.pageX - mn(r),
            top: e.pageY - gn(r),
            right: e.pageX - mn(r) + 1,
            bottom: e.pageY - gn(r) + 1,
          };
    return (
      br(t.right) && !br(t.width)
        ? ((t.right = t.left + t.width), (t.bottom = t.top + t.height))
        : br(t.width) &&
          (t = {
            width: t.right - t.left,
            height: t.bottom - t.top,
            right: t.right,
            left: t.left,
            bottom: t.bottom,
            top: t.top,
          }),
      t
    );
  },
  tt = function (e, r, t) {
    var i = e.vars,
      n = i[t],
      o = e._listeners[r],
      s;
    return (
      ii(n) &&
        (s = n.apply(
          i.callbackScope || e,
          i[t + "Params"] || [e.pointerEvent]
        )),
      o && e.dispatchEvent(r) === !1 && (s = !1),
      s
    );
  },
  Cu = function (e, r) {
    var t = ui(e)[0],
      i,
      n,
      o;
    return !t.nodeType && t !== Ve
      ? br(e.left)
        ? ((n = e.min || e.minX || e.minRotation || 0),
          (i = e.min || e.minY || 0),
          {
            left: n,
            top: i,
            width: (e.max || e.maxX || e.maxRotation || 0) - n,
            height: (e.max || e.maxY || 0) - i,
          })
        : ((o = { x: 0, y: 0 }),
          {
            left: e.left - o.x,
            top: e.top - o.y,
            width: e.width,
            height: e.height,
          })
      : qd(t, r);
  },
  cr = {},
  qd = function (e, r) {
    r = ui(r)[0];
    var t = e.getBBox && e.ownerSVGElement,
      i = e.ownerDocument || nr,
      n,
      o,
      s,
      u,
      f,
      c,
      h,
      d,
      l,
      _,
      p,
      m,
      T;
    if (e === Ve)
      (s = gn(i)),
        (n = mn(i)),
        (o =
          n +
          (i.documentElement.clientWidth ||
            e.innerWidth ||
            i.body.clientWidth ||
            0)),
        (u =
          s +
          ((e.innerHeight || 0) - 20 < i.documentElement.clientHeight
            ? i.documentElement.clientHeight
            : e.innerHeight || i.body.clientHeight || 0));
    else {
      if (r === Ve || br(r)) return e.getBoundingClientRect();
      (n = s = 0),
        t
          ? ((_ = e.getBBox()), (p = _.width), (m = _.height))
          : (e.viewBox &&
              (_ = e.viewBox.baseVal) &&
              ((n = _.x || 0), (s = _.y || 0), (p = _.width), (m = _.height)),
            p ||
              ((T = To(e)),
              (_ = T.boxSizing === "border-box"),
              (p =
                (parseFloat(T.width) || e.clientWidth || 0) +
                (_
                  ? 0
                  : parseFloat(T.borderLeftWidth) +
                    parseFloat(T.borderRightWidth))),
              (m =
                (parseFloat(T.height) || e.clientHeight || 0) +
                (_
                  ? 0
                  : parseFloat(T.borderTopWidth) +
                    parseFloat(T.borderBottomWidth))))),
        (o = p),
        (u = m);
    }
    return e === r
      ? { left: n, top: s, width: o - n, height: u - s }
      : ((f = ki(r, !0).multiply(ki(e))),
        (c = f.apply({ x: n, y: s })),
        (h = f.apply({ x: o, y: s })),
        (d = f.apply({ x: o, y: u })),
        (l = f.apply({ x: n, y: u })),
        (n = Math.min(c.x, h.x, d.x, l.x)),
        (s = Math.min(c.y, h.y, d.y, l.y)),
        {
          left: n,
          top: s,
          width: Math.max(c.x, h.x, d.x, l.x) - n,
          height: Math.max(c.y, h.y, d.y, l.y) - s,
        });
  },
  Ks = function (e, r, t, i, n, o) {
    var s = {},
      u,
      f,
      c;
    if (r)
      if (n !== 1 && r instanceof Array) {
        if (((s.end = u = []), (c = r.length), ao(r[0])))
          for (f = 0; f < c; f++) u[f] = wc(r[f], n);
        else for (f = 0; f < c; f++) u[f] = r[f] * n;
        (t += 1.1), (i -= 1.1);
      } else
        ii(r)
          ? (s.end = function (h) {
              var d = r.call(e, h),
                l,
                _;
              if (n !== 1)
                if (ao(d)) {
                  l = {};
                  for (_ in d) l[_] = d[_] * n;
                  d = l;
                } else d *= n;
              return d;
            })
          : (s.end = r);
    return (
      (t || t === 0) && (s.max = t),
      (i || i === 0) && (s.min = i),
      o && (s.velocity = 0),
      s
    );
  },
  Kd = function a(e) {
    var r;
    return !e || !e.getAttribute || e === Ur
      ? !1
      : (r = e.getAttribute("data-clickable")) === "true" ||
        (r !== "false" &&
          (Xd.test(e.nodeName + "") ||
            e.getAttribute("contentEditable") === "true"))
      ? !0
      : a(e.parentNode);
  },
  Uo = function (e, r) {
    for (var t = e.length, i; t--; )
      (i = e[t]),
        (i.ondragstart = i.onselectstart = r ? null : ns),
        Pe.set(i, { lazy: !0, userSelect: r ? "text" : "none" });
  },
  Qd = function a(e) {
    if (To(e).position === "fixed") return !0;
    if (((e = e.parentNode), e && e.nodeType === 1)) return a(e);
  },
  Tc,
  Oa,
  jd = function (e, r) {
    (e = Pe.utils.toArray(e)[0]), (r = r || {});
    var t = document.createElement("div"),
      i = t.style,
      n = e.firstChild,
      o = 0,
      s = 0,
      u = e.scrollTop,
      f = e.scrollLeft,
      c = e.scrollWidth,
      h = e.scrollHeight,
      d = 0,
      l = 0,
      _ = 0,
      p,
      m,
      T,
      S,
      M,
      w;
    Tc && r.force3D !== !1
      ? ((M = "translate3d("), (w = "px,0px)"))
      : lo && ((M = "translate("), (w = "px)")),
      (this.scrollTop = function (v, O) {
        if (!arguments.length) return -this.top();
        this.top(-v, O);
      }),
      (this.scrollLeft = function (v, O) {
        if (!arguments.length) return -this.left();
        this.left(-v, O);
      }),
      (this.left = function (v, O) {
        if (!arguments.length) return -(e.scrollLeft + s);
        var P = e.scrollLeft - f,
          k = s;
        if ((P > 2 || P < -2) && !O) {
          (f = e.scrollLeft),
            Pe.killTweensOf(this, { left: 1, scrollLeft: 1 }),
            this.left(-f),
            r.onKill && r.onKill();
          return;
        }
        (v = -v),
          v < 0
            ? ((s = (v - 0.5) | 0), (v = 0))
            : v > l
            ? ((s = (v - l) | 0), (v = l))
            : (s = 0),
          (s || k) &&
            (this._skip || (i[lo] = M + -s + "px," + -o + w),
            s + d >= 0 && (i.paddingRight = s + d + "px")),
          (e.scrollLeft = v | 0),
          (f = e.scrollLeft);
      }),
      (this.top = function (v, O) {
        if (!arguments.length) return -(e.scrollTop + o);
        var P = e.scrollTop - u,
          k = o;
        if ((P > 2 || P < -2) && !O) {
          (u = e.scrollTop),
            Pe.killTweensOf(this, { top: 1, scrollTop: 1 }),
            this.top(-u),
            r.onKill && r.onKill();
          return;
        }
        (v = -v),
          v < 0
            ? ((o = (v - 0.5) | 0), (v = 0))
            : v > _
            ? ((o = (v - _) | 0), (v = _))
            : (o = 0),
          (o || k) && (this._skip || (i[lo] = M + -s + "px," + -o + w)),
          (e.scrollTop = v | 0),
          (u = e.scrollTop);
      }),
      (this.maxScrollTop = function () {
        return _;
      }),
      (this.maxScrollLeft = function () {
        return l;
      }),
      (this.disable = function () {
        for (n = t.firstChild; n; )
          (S = n.nextSibling), e.appendChild(n), (n = S);
        e === t.parentNode && e.removeChild(t);
      }),
      (this.enable = function () {
        if (((n = e.firstChild), n !== t)) {
          for (; n; ) (S = n.nextSibling), t.appendChild(n), (n = S);
          e.appendChild(t), this.calibrate();
        }
      }),
      (this.calibrate = function (v) {
        var O = e.clientWidth === p,
          P,
          k,
          R;
        (u = e.scrollTop),
          (f = e.scrollLeft),
          !(
            O &&
            e.clientHeight === m &&
            t.offsetHeight === T &&
            c === e.scrollWidth &&
            h === e.scrollHeight &&
            !v
          ) &&
            ((o || s) &&
              ((k = this.left()),
              (R = this.top()),
              this.left(-e.scrollLeft),
              this.top(-e.scrollTop)),
            (P = To(e)),
            (!O || v) &&
              ((i.display = "block"),
              (i.width = "auto"),
              (i.paddingRight = "0px"),
              (d = Math.max(0, e.scrollWidth - e.clientWidth)),
              d &&
                (d +=
                  parseFloat(P.paddingLeft) +
                  (Oa ? parseFloat(P.paddingRight) : 0))),
            (i.display = "inline-block"),
            (i.position = "relative"),
            (i.overflow = "visible"),
            (i.verticalAlign = "top"),
            (i.boxSizing = "content-box"),
            (i.width = "100%"),
            (i.paddingRight = d + "px"),
            Oa && (i.paddingBottom = P.paddingBottom),
            (p = e.clientWidth),
            (m = e.clientHeight),
            (c = e.scrollWidth),
            (h = e.scrollHeight),
            (l = e.scrollWidth - p),
            (_ = e.scrollHeight - m),
            (T = t.offsetHeight),
            (i.display = "block"),
            (k || R) && (this.left(k), this.top(R)));
      }),
      (this.content = t),
      (this.element = e),
      (this._skip = !1),
      this.enable();
  },
  Qs = function (e) {
    if (xc() && document.body) {
      var r = window && window.navigator;
      (Ve = window),
        (nr = document),
        (Pr = nr.documentElement),
        (Ur = nr.body),
        (Us = Ho("div")),
        (is = !!window.PointerEvent),
        (Xr = Ho("div")),
        (Xr.style.cssText =
          "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab"),
        (Un = Xr.style.cursor === "grab" ? "grab" : "move"),
        (Hn = r && r.userAgent.toLowerCase().indexOf("android") !== -1),
        (Ea =
          ("ontouchstart" in Pr && "orientation" in Ve) ||
          (r && (r.MaxTouchPoints > 0 || r.msMaxTouchPoints > 0))),
        (Oa = (function () {
          var t = Ho("div"),
            i = Ho("div"),
            n = i.style,
            o = Ur,
            s;
          return (
            (n.display = "inline-block"),
            (n.position = "relative"),
            (t.style.cssText =
              "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden"),
            t.appendChild(i),
            o.appendChild(t),
            (s = i.offsetHeight + 18 > t.scrollHeight),
            o.removeChild(t),
            s
          );
        })()),
        (bo = (function (t) {
          for (
            var i = t.split(","),
              n = (
                ("onpointerdown" in Us)
                  ? "pointerdown,pointermove,pointerup,pointercancel"
                  : ("onmspointerdown" in Us)
                  ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel"
                  : t
              ).split(","),
              o = {},
              s = 4;
            --s > -1;

          )
            (o[i[s]] = n[s]), (o[n[s]] = i[s]);
          try {
            Pr.addEventListener(
              "test",
              null,
              Object.defineProperty({}, "passive", {
                get: function () {
                  mc = 1;
                },
              })
            );
          } catch {}
          return o;
        })("touchstart,touchmove,touchend,touchcancel")),
        ht(nr, "touchcancel", ns),
        ht(Ve, "touchmove", ns),
        Ur && Ur.addEventListener("touchstart", ns),
        ht(nr, "contextmenu", function () {
          for (var t in _n) _n[t].isPressed && _n[t].endDrag();
        }),
        (Pe = ka = vc());
    }
    Pe
      ? ((wr = Pe.plugins.inertia),
        (yc = Pe.core.context || function () {}),
        (Vn = Pe.utils.checkPrefix),
        (lo = Vn(lo)),
        (Da = Vn(Da)),
        (ui = Pe.utils.toArray),
        (Ma = Pe.core.getStyleSaver),
        (Tc = !!Vn("perspective")))
      : e && console.warn("Please gsap.registerPlugin(Draggable)");
  },
  Zd = (function () {
    function a(r) {
      (this._listeners = {}), (this.target = r || this);
    }
    var e = a.prototype;
    return (
      (e.addEventListener = function (t, i) {
        var n = this._listeners[t] || (this._listeners[t] = []);
        ~n.indexOf(i) || n.push(i);
      }),
      (e.removeEventListener = function (t, i) {
        var n = this._listeners[t],
          o = n && n.indexOf(i);
        o >= 0 && n.splice(o, 1);
      }),
      (e.dispatchEvent = function (t) {
        var i = this,
          n;
        return (
          (this._listeners[t] || []).forEach(function (o) {
            return o.call(i, { type: t, target: i.target }) === !1 && (n = !1);
          }),
          n
        );
      }),
      a
    );
  })(),
  Po = (function (a) {
    zd(e, a);
    function e(r, t) {
      var i;
      (i = a.call(this) || this),
        ka || Qs(1),
        (r = ui(r)[0]),
        (i.styles = Ma && Ma(r, "transform,left,top")),
        wr || (wr = Pe.plugins.inertia),
        (i.vars = t = wc(t || {})),
        (i.target = r),
        (i.x = i.y = i.rotation = 0),
        (i.dragResistance = parseFloat(t.dragResistance) || 0),
        (i.edgeResistance = isNaN(t.edgeResistance)
          ? 1
          : parseFloat(t.edgeResistance) || 0),
        (i.lockAxis = t.lockAxis),
        (i.autoScroll = t.autoScroll || 0),
        (i.lockedAxis = null),
        (i.allowEventDefault = !!t.allowEventDefault),
        Pe.getProperty(r, "x");
      var n = (t.type || "x,y").toLowerCase(),
        o = ~n.indexOf("x") || ~n.indexOf("y"),
        s = n.indexOf("rotation") !== -1,
        u = s ? "rotation" : o ? "x" : "left",
        f = o ? "y" : "top",
        c = !!(~n.indexOf("x") || ~n.indexOf("left") || n === "scroll"),
        h = !!(~n.indexOf("y") || ~n.indexOf("top") || n === "scroll"),
        d = t.minimumMovement || 2,
        l = _u(i),
        _ = ui(t.trigger || t.handle || r),
        p = {},
        m = 0,
        T = !1,
        S = t.autoScrollMarginTop || 40,
        M = t.autoScrollMarginRight || 40,
        w = t.autoScrollMarginBottom || 40,
        v = t.autoScrollMarginLeft || 40,
        O = t.clickableTest || Kd,
        P = 0,
        k = r._gsap || Pe.core.getCache(r),
        R = Qd(r),
        L = function (g, N) {
          return parseFloat(k.get(r, g, N));
        },
        Y = r.ownerDocument || nr,
        A,
        F,
        V,
        J,
        U,
        X,
        oe,
        te,
        y,
        Z,
        ee,
        fe,
        ie,
        Be,
        De,
        Ie,
        be,
        je,
        ot,
        Ye,
        Ue,
        de,
        pe,
        ue,
        _t,
        C,
        ze,
        B,
        b,
        z,
        G,
        se,
        le,
        _e = function (g) {
          return (
            fr(g),
            g.stopImmediatePropagation && g.stopImmediatePropagation(),
            !1
          );
        },
        Oe = function q(g) {
          if (l.autoScroll && l.isDragging && (T || be)) {
            var N = r,
              x = l.autoScroll * 15,
              E,
              $,
              D,
              W,
              I,
              H,
              re,
              j;
            for (
              T = !1,
                zr.scrollTop =
                  Ve.pageYOffset != null
                    ? Ve.pageYOffset
                    : Y.documentElement.scrollTop != null
                    ? Y.documentElement.scrollTop
                    : Y.body.scrollTop,
                zr.scrollLeft =
                  Ve.pageXOffset != null
                    ? Ve.pageXOffset
                    : Y.documentElement.scrollLeft != null
                    ? Y.documentElement.scrollLeft
                    : Y.body.scrollLeft,
                W = l.pointerX - zr.scrollLeft,
                I = l.pointerY - zr.scrollTop;
              N && !$;

            )
              ($ = kn(N.parentNode)),
                (E = $ ? zr : N.parentNode),
                (D = $
                  ? {
                      bottom: Math.max(Pr.clientHeight, Ve.innerHeight || 0),
                      right: Math.max(Pr.clientWidth, Ve.innerWidth || 0),
                      left: 0,
                      top: 0,
                    }
                  : E.getBoundingClientRect()),
                (H = re = 0),
                h &&
                  ((j = E._gsMaxScrollY - E.scrollTop),
                  j < 0
                    ? (re = j)
                    : I > D.bottom - w && j
                    ? ((T = !0),
                      (re = Math.min(
                        j,
                        (x * (1 - Math.max(0, D.bottom - I) / w)) | 0
                      )))
                    : I < D.top + S &&
                      E.scrollTop &&
                      ((T = !0),
                      (re = -Math.min(
                        E.scrollTop,
                        (x * (1 - Math.max(0, I - D.top) / S)) | 0
                      ))),
                  re && (E.scrollTop += re)),
                c &&
                  ((j = E._gsMaxScrollX - E.scrollLeft),
                  j < 0
                    ? (H = j)
                    : W > D.right - M && j
                    ? ((T = !0),
                      (H = Math.min(
                        j,
                        (x * (1 - Math.max(0, D.right - W) / M)) | 0
                      )))
                    : W < D.left + v &&
                      E.scrollLeft &&
                      ((T = !0),
                      (H = -Math.min(
                        E.scrollLeft,
                        (x * (1 - Math.max(0, W - D.left) / v)) | 0
                      ))),
                  H && (E.scrollLeft += H)),
                $ &&
                  (H || re) &&
                  (Ve.scrollTo(E.scrollLeft, E.scrollTop),
                  kt(l.pointerX + H, l.pointerY + re)),
                (N = E);
          }
          if (be) {
            var he = l.x,
              Me = l.y;
            s
              ? ((l.deltaX = he - parseFloat(k.rotation)),
                (l.rotation = he),
                (k.rotation = he + "deg"),
                k.renderTransform(1, k))
              : F
              ? (h && ((l.deltaY = Me - F.top()), F.top(Me)),
                c && ((l.deltaX = he - F.left()), F.left(he)))
              : o
              ? (h && ((l.deltaY = Me - parseFloat(k.y)), (k.y = Me + "px")),
                c && ((l.deltaX = he - parseFloat(k.x)), (k.x = he + "px")),
                k.renderTransform(1, k))
              : (h &&
                  ((l.deltaY = Me - parseFloat(r.style.top || 0)),
                  (r.style.top = Me + "px")),
                c &&
                  ((l.deltaX = he - parseFloat(r.style.left || 0)),
                  (r.style.left = he + "px"))),
              te &&
                !g &&
                !B &&
                ((B = !0),
                tt(l, "drag", "onDrag") === !1 &&
                  (c && (l.x -= l.deltaX), h && (l.y -= l.deltaY), q(!0)),
                (B = !1));
          }
          be = !1;
        },
        ae = function (g, N) {
          var x = l.x,
            E = l.y,
            $,
            D;
          r._gsap || (k = Pe.core.getCache(r)),
            k.uncache && Pe.getProperty(r, "x"),
            o
              ? ((l.x = parseFloat(k.x)), (l.y = parseFloat(k.y)))
              : s
              ? (l.x = l.rotation = parseFloat(k.rotation))
              : F
              ? ((l.y = F.top()), (l.x = F.left()))
              : ((l.y = parseFloat(r.style.top || ((D = To(r)) && D.top)) || 0),
                (l.x = parseFloat(r.style.left || (D || {}).left) || 0)),
            (ot || Ye || Ue) &&
              !N &&
              (l.isDragging || l.isThrowing) &&
              (Ue &&
                ((Zi.x = l.x),
                (Zi.y = l.y),
                ($ = Ue(Zi)),
                $.x !== l.x && ((l.x = $.x), (be = !0)),
                $.y !== l.y && ((l.y = $.y), (be = !0))),
              ot &&
                (($ = ot(l.x)),
                $ !== l.x && ((l.x = $), s && (l.rotation = $), (be = !0))),
              Ye && (($ = Ye(l.y)), $ !== l.y && (l.y = $), (be = !0))),
            be && Oe(!0),
            g ||
              ((l.deltaX = l.x - x),
              (l.deltaY = l.y - E),
              tt(l, "throwupdate", "onThrowUpdate"));
        },
        Ae = function (g, N, x, E) {
          return (
            N == null && (N = -wi),
            x == null && (x = wi),
            ii(g)
              ? function ($) {
                  var D = l.isPressed ? 1 - l.edgeResistance : 1;
                  return (
                    g.call(
                      l,
                      ($ > x ? x + ($ - x) * D : $ < N ? N + ($ - N) * D : $) *
                        E
                    ) * E
                  );
                }
              : Ln(g)
              ? function ($) {
                  for (var D = g.length, W = 0, I = wi, H, re; --D > -1; )
                    (H = g[D]),
                      (re = H - $),
                      re < 0 && (re = -re),
                      re < I && H >= N && H <= x && ((W = D), (I = re));
                  return g[W];
                }
              : isNaN(g)
              ? function ($) {
                  return $;
                }
              : function () {
                  return g * E;
                }
          );
        },
        Ee = function (g, N, x, E, $, D, W) {
          return (
            (D = D && D < wi ? D * D : wi),
            ii(g)
              ? function (I) {
                  var H = l.isPressed ? 1 - l.edgeResistance : 1,
                    re = I.x,
                    j = I.y,
                    he,
                    Me,
                    Re;
                  return (
                    (I.x = re =
                      re > x
                        ? x + (re - x) * H
                        : re < N
                        ? N + (re - N) * H
                        : re),
                    (I.y = j =
                      j > $ ? $ + (j - $) * H : j < E ? E + (j - E) * H : j),
                    (he = g.call(l, I)),
                    he !== I && ((I.x = he.x), (I.y = he.y)),
                    W !== 1 && ((I.x *= W), (I.y *= W)),
                    D < wi &&
                      ((Me = I.x - re),
                      (Re = I.y - j),
                      Me * Me + Re * Re > D && ((I.x = re), (I.y = j))),
                    I
                  );
                }
              : Ln(g)
              ? function (I) {
                  for (
                    var H = g.length, re = 0, j = wi, he, Me, Re, Te;
                    --H > -1;

                  )
                    (Re = g[H]),
                      (he = Re.x - I.x),
                      (Me = Re.y - I.y),
                      (Te = he * he + Me * Me),
                      Te < j && ((re = H), (j = Te));
                  return j <= D ? g[re] : I;
                }
              : function (I) {
                  return I;
                }
          );
        },
        ge = function () {
          var g, N, x, E;
          (oe = !1),
            F
              ? (F.calibrate(),
                (l.minX = ee = -F.maxScrollLeft()),
                (l.minY = ie = -F.maxScrollTop()),
                (l.maxX = Z = l.maxY = fe = 0),
                (oe = !0))
              : t.bounds &&
                ((g = Cu(t.bounds, r.parentNode)),
                s
                  ? ((l.minX = ee = g.left),
                    (l.maxX = Z = g.left + g.width),
                    (l.minY = ie = l.maxY = fe = 0))
                  : !br(t.bounds.maxX) || !br(t.bounds.maxY)
                  ? ((g = t.bounds),
                    (l.minX = ee = g.minX),
                    (l.minY = ie = g.minY),
                    (l.maxX = Z = g.maxX),
                    (l.maxY = fe = g.maxY))
                  : ((N = Cu(r, r.parentNode)),
                    (l.minX = ee = Math.round(L(u, "px") + g.left - N.left)),
                    (l.minY = ie = Math.round(L(f, "px") + g.top - N.top)),
                    (l.maxX = Z = Math.round(ee + (g.width - N.width))),
                    (l.maxY = fe = Math.round(ie + (g.height - N.height)))),
                ee > Z && ((l.minX = Z), (l.maxX = Z = ee), (ee = l.minX)),
                ie > fe && ((l.minY = fe), (l.maxY = fe = ie), (ie = l.minY)),
                s && ((l.minRotation = ee), (l.maxRotation = Z)),
                (oe = !0)),
            t.liveSnap &&
              ((x = t.liveSnap === !0 ? t.snap || {} : t.liveSnap),
              (E = Ln(x) || ii(x)),
              s
                ? ((ot = Ae(E ? x : x.rotation, ee, Z, 1)), (Ye = null))
                : x.points
                ? (Ue = Ee(
                    E ? x : x.points,
                    ee,
                    Z,
                    ie,
                    fe,
                    x.radius,
                    F ? -1 : 1
                  ))
                : (c &&
                    (ot = Ae(
                      E ? x : x.x || x.left || x.scrollLeft,
                      ee,
                      Z,
                      F ? -1 : 1
                    )),
                  h &&
                    (Ye = Ae(
                      E ? x : x.y || x.top || x.scrollTop,
                      ie,
                      fe,
                      F ? -1 : 1
                    ))));
        },
        et = function () {
          (l.isThrowing = !1), tt(l, "throwcomplete", "onThrowComplete");
        },
        K = function () {
          l.isThrowing = !1;
        },
        ur = function (g, N) {
          var x, E, $, D;
          g && wr
            ? (g === !0 &&
                ((x = t.snap || t.liveSnap || {}),
                (E = Ln(x) || ii(x)),
                (g = {
                  resistance:
                    (t.throwResistance || t.resistance || 1e3) / (s ? 10 : 1),
                }),
                s
                  ? (g.rotation = Ks(l, E ? x : x.rotation, Z, ee, 1, N))
                  : (c &&
                      (g[u] = Ks(
                        l,
                        E ? x : x.points || x.x || x.left,
                        Z,
                        ee,
                        F ? -1 : 1,
                        N || l.lockedAxis === "x"
                      )),
                    h &&
                      (g[f] = Ks(
                        l,
                        E ? x : x.points || x.y || x.top,
                        fe,
                        ie,
                        F ? -1 : 1,
                        N || l.lockedAxis === "y"
                      )),
                    (x.points || (Ln(x) && ao(x[0]))) &&
                      ((g.linkedProps = u + "," + f), (g.radius = x.radius)))),
              (l.isThrowing = !0),
              (D = isNaN(t.overshootTolerance)
                ? t.edgeResistance === 1
                  ? 0
                  : 1 - l.edgeResistance + 0.2
                : t.overshootTolerance),
              g.duration ||
                (g.duration = {
                  max: Math.max(
                    t.minDuration || 0,
                    "maxDuration" in t ? t.maxDuration : 2
                  ),
                  min: isNaN(t.minDuration)
                    ? D === 0 || (ao(g) && g.resistance > 1e3)
                      ? 0
                      : 0.5
                    : t.minDuration,
                  overshoot: D,
                }),
              (l.tween = $ =
                Pe.to(F || r, {
                  inertia: g,
                  data: "_draggable",
                  inherit: !1,
                  onComplete: et,
                  onInterrupt: K,
                  onUpdate: t.fastMode ? tt : ae,
                  onUpdateParams: t.fastMode
                    ? [l, "onthrowupdate", "onThrowUpdate"]
                    : x && x.radius
                    ? [!1, !0]
                    : [],
                })),
              t.fastMode ||
                (F && (F._skip = !0),
                $.render(1e9, !0, !0),
                ae(!0, !0),
                (l.endX = l.x),
                (l.endY = l.y),
                s && (l.endRotation = l.x),
                $.play(0),
                ae(!0, !0),
                F && (F._skip = !1)))
            : oe && l.applyBounds();
        },
        vt = function (g) {
          var N = ue,
            x;
          (ue = ki(r.parentNode, !0)),
            g &&
              l.isPressed &&
              !ue.equals(N || new Hi()) &&
              ((x = N.inverse().apply({ x: V, y: J })),
              ue.apply(x, x),
              (V = x.x),
              (J = x.y)),
            ue.equals(Bd) && (ue = null);
        },
        gt = function () {
          var g = 1 - l.edgeResistance,
            N = R ? mn(Y) : 0,
            x = R ? gn(Y) : 0,
            E,
            $,
            D;
          o &&
            ((k.x = L(u, "px") + "px"),
            (k.y = L(f, "px") + "px"),
            k.renderTransform()),
            vt(!1),
            (cr.x = l.pointerX - N),
            (cr.y = l.pointerY - x),
            ue && ue.apply(cr, cr),
            (V = cr.x),
            (J = cr.y),
            be && (kt(l.pointerX, l.pointerY), Oe(!0)),
            (se = ki(r)),
            F
              ? (ge(), (X = F.top()), (U = F.left()))
              : (Ft() ? (ae(!0, !0), ge()) : l.applyBounds(),
                s
                  ? ((E = r.ownerSVGElement
                      ? [k.xOrigin - r.getBBox().x, k.yOrigin - r.getBBox().y]
                      : (To(r)[Da] || "0 0").split(" ")),
                    (Ie = l.rotationOrigin =
                      ki(r).apply({
                        x: parseFloat(E[0]) || 0,
                        y: parseFloat(E[1]) || 0,
                      })),
                    ae(!0, !0),
                    ($ = l.pointerX - Ie.x - N),
                    (D = Ie.y - l.pointerY + x),
                    (U = l.x),
                    (X = l.y = Math.atan2(D, $) * gu))
                  : ((X = L(f, "px")), (U = L(u, "px")))),
            oe &&
              g &&
              (U > Z
                ? (U = Z + (U - Z) / g)
                : U < ee && (U = ee - (ee - U) / g),
              s ||
                (X > fe
                  ? (X = fe + (X - fe) / g)
                  : X < ie && (X = ie - (ie - X) / g))),
            (l.startX = U = Jr(U)),
            (l.startY = X = Jr(X));
        },
        Ft = function () {
          return l.tween && l.tween.isActive();
        },
        Ht = function () {
          Xr.parentNode &&
            !Ft() &&
            !l.isDragging &&
            Xr.parentNode.removeChild(Xr);
        },
        wt = function (g, N) {
          var x;
          if (
            !A ||
            l.isPressed ||
            !g ||
            ((g.type === "mousedown" || g.type === "pointerdown") &&
              !N &&
              ei() - P < 30 &&
              bo[l.pointerEvent.type])
          ) {
            G && g && A && fr(g);
            return;
          }
          if (
            ((_t = Ft()),
            (le = !1),
            (l.pointerEvent = g),
            bo[g.type]
              ? ((pe = ~g.type.indexOf("touch")
                  ? g.currentTarget || g.target
                  : Y),
                ht(pe, "touchend", Le),
                ht(pe, "touchmove", ne),
                ht(pe, "touchcancel", Le),
                ht(Y, "touchstart", wu))
              : ((pe = null), ht(Y, "mousemove", ne)),
            (ze = null),
            (!is || !pe) &&
              (ht(Y, "mouseup", Le),
              g && g.target && ht(g.target, "mouseup", Le)),
            (de = O.call(l, g.target) && t.dragClickables === !1 && !N),
            de)
          ) {
            ht(g.target, "change", Le),
              tt(l, "pressInit", "onPressInit"),
              tt(l, "press", "onPress"),
              Uo(_, !0),
              (G = !1);
            return;
          }
          if (
            ((C =
              !pe ||
              c === h ||
              l.vars.allowNativeTouchScrolling === !1 ||
              (l.vars.allowContextMenu && g && (g.ctrlKey || g.which > 2))
                ? !1
                : c
                ? "y"
                : "x"),
            (G = !C && !l.allowEventDefault),
            G && (fr(g), ht(Ve, "touchforcechange", fr)),
            g.changedTouches
              ? ((g = Be = g.changedTouches[0]), (De = g.identifier))
              : g.pointerId
              ? (De = g.pointerId)
              : (Be = De = null),
            xs++,
            Vd(Oe),
            (J = l.pointerY = g.pageY),
            (V = l.pointerX = g.pageX),
            tt(l, "pressInit", "onPressInit"),
            (C || l.autoScroll) && Gs(r.parentNode),
            r.parentNode &&
              l.autoScroll &&
              !F &&
              !s &&
              r.parentNode._gsMaxScrollX &&
              !Xr.parentNode &&
              !r.getBBox &&
              ((Xr.style.width = r.parentNode.scrollWidth + "px"),
              r.parentNode.appendChild(Xr)),
            gt(),
            l.tween && l.tween.kill(),
            (l.isThrowing = !1),
            Pe.killTweensOf(F || r, p, !0),
            F && Pe.killTweensOf(r, { scrollTo: 1 }, !0),
            (l.tween = l.lockedAxis = null),
            (t.zIndexBoost || (!s && !F && t.zIndexBoost !== !1)) &&
              (r.style.zIndex = e.zIndex++),
            (l.isPressed = !0),
            (te = !!(t.onDrag || l._listeners.drag)),
            (y = !!(t.onMove || l._listeners.move)),
            t.cursor !== !1 || t.activeCursor)
          )
            for (x = _.length; --x > -1; )
              Pe.set(_[x], {
                cursor:
                  t.activeCursor ||
                  t.cursor ||
                  (Un === "grab" ? "grabbing" : Un),
              });
          tt(l, "press", "onPress");
        },
        ne = function (g) {
          var N = g,
            x,
            E,
            $,
            D,
            W,
            I;
          if (!A || gl || !l.isPressed || !g) {
            G && g && A && fr(g);
            return;
          }
          if (((l.pointerEvent = g), (x = g.changedTouches), x)) {
            if (((g = x[0]), g !== Be && g.identifier !== De)) {
              for (
                D = x.length;
                --D > -1 && (g = x[D]).identifier !== De && g.target !== r;

              );
              if (D < 0) return;
            }
          } else if (g.pointerId && De && g.pointerId !== De) return;
          if (
            pe &&
            C &&
            !ze &&
            ((cr.x = g.pageX - (R ? mn(Y) : 0)),
            (cr.y = g.pageY - (R ? gn(Y) : 0)),
            ue && ue.apply(cr, cr),
            (E = cr.x),
            ($ = cr.y),
            (W = Math.abs(E - V)),
            (I = Math.abs($ - J)),
            ((W !== I && (W > d || I > d)) || (Hn && C === ze)) &&
              ((ze = W > I && c ? "x" : "y"),
              C && ze !== C && ht(Ve, "touchforcechange", fr),
              l.vars.lockAxisOnTouchScroll !== !1 &&
                c &&
                h &&
                ((l.lockedAxis = ze === "x" ? "y" : "x"),
                ii(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, N)),
              Hn && C === ze))
          ) {
            Le(N);
            return;
          }
          !l.allowEventDefault &&
          (!C || (ze && C !== ze)) &&
          N.cancelable !== !1
            ? (fr(N), (G = !0))
            : G && (G = !1),
            l.autoScroll && (T = !0),
            kt(g.pageX, g.pageY, y);
        },
        kt = function (g, N, x) {
          var E = 1 - l.dragResistance,
            $ = 1 - l.edgeResistance,
            D = l.pointerX,
            W = l.pointerY,
            I = X,
            H = l.x,
            re = l.y,
            j = l.endX,
            he = l.endY,
            Me = l.endRotation,
            Re = be,
            Te,
            Se,
            $e,
            ce,
            bt,
            Ze;
          (l.pointerX = g),
            (l.pointerY = N),
            R && ((g -= mn(Y)), (N -= gn(Y))),
            s
              ? ((ce = Math.atan2(Ie.y - N, g - Ie.x) * gu),
                (bt = l.y - ce),
                bt > 180
                  ? ((X -= 360), (l.y = ce))
                  : bt < -180 && ((X += 360), (l.y = ce)),
                l.x !== U || Math.max(Math.abs(V - g), Math.abs(J - N)) > d
                  ? ((l.y = ce), ($e = U + (X - ce) * E))
                  : ($e = U))
              : (ue &&
                  ((Ze = g * ue.a + N * ue.c + ue.e),
                  (N = g * ue.b + N * ue.d + ue.f),
                  (g = Ze)),
                (Se = N - J),
                (Te = g - V),
                Se < d && Se > -d && (Se = 0),
                Te < d && Te > -d && (Te = 0),
                (l.lockAxis || l.lockedAxis) &&
                  (Te || Se) &&
                  ((Ze = l.lockedAxis),
                  Ze ||
                    ((l.lockedAxis = Ze =
                      c && Math.abs(Te) > Math.abs(Se) ? "y" : h ? "x" : null),
                    Ze &&
                      ii(l.vars.onLockAxis) &&
                      l.vars.onLockAxis.call(l, l.pointerEvent)),
                  Ze === "y" ? (Se = 0) : Ze === "x" && (Te = 0)),
                ($e = Jr(U + Te * E)),
                (ce = Jr(X + Se * E))),
            (ot || Ye || Ue) &&
              (l.x !== $e || (l.y !== ce && !s)) &&
              (Ue &&
                ((Zi.x = $e),
                (Zi.y = ce),
                (Ze = Ue(Zi)),
                ($e = Jr(Ze.x)),
                (ce = Jr(Ze.y))),
              ot && ($e = Jr(ot($e))),
              Ye && (ce = Jr(Ye(ce)))),
            oe &&
              ($e > Z
                ? ($e = Z + Math.round(($e - Z) * $))
                : $e < ee && ($e = ee + Math.round(($e - ee) * $)),
              s ||
                (ce > fe
                  ? (ce = Math.round(fe + (ce - fe) * $))
                  : ce < ie && (ce = Math.round(ie + (ce - ie) * $)))),
            (l.x !== $e || (l.y !== ce && !s)) &&
              (s
                ? ((l.endRotation = l.x = l.endX = $e), (be = !0))
                : (h && ((l.y = l.endY = ce), (be = !0)),
                  c && ((l.x = l.endX = $e), (be = !0))),
              !x || tt(l, "move", "onMove") !== !1
                ? !l.isDragging &&
                  l.isPressed &&
                  ((l.isDragging = le = !0), tt(l, "dragstart", "onDragStart"))
                : ((l.pointerX = D),
                  (l.pointerY = W),
                  (X = I),
                  (l.x = H),
                  (l.y = re),
                  (l.endX = j),
                  (l.endY = he),
                  (l.endRotation = Me),
                  (be = Re)));
        },
        Le = function q(g, N) {
          if (
            !A ||
            !l.isPressed ||
            (g &&
              De != null &&
              !N &&
              ((g.pointerId && g.pointerId !== De && g.target !== r) ||
                (g.changedTouches && !Ud(g.changedTouches, De))))
          ) {
            G && g && A && fr(g);
            return;
          }
          l.isPressed = !1;
          var x = g,
            E = l.isDragging,
            $ = l.vars.allowContextMenu && g && (g.ctrlKey || g.which > 2),
            D = Pe.delayedCall(0.001, Ht),
            W,
            I,
            H,
            re,
            j;
          if (
            (pe
              ? (st(pe, "touchend", q),
                st(pe, "touchmove", ne),
                st(pe, "touchcancel", q),
                st(Y, "touchstart", wu))
              : st(Y, "mousemove", ne),
            st(Ve, "touchforcechange", fr),
            (!is || !pe) &&
              (st(Y, "mouseup", q),
              g && g.target && st(g.target, "mouseup", q)),
            (be = !1),
            E && ((m = mu = ei()), (l.isDragging = !1)),
            vu(Oe),
            de && !$)
          ) {
            g && (st(g.target, "change", q), (l.pointerEvent = x)),
              Uo(_, !1),
              tt(l, "release", "onRelease"),
              tt(l, "click", "onClick"),
              (de = !1);
            return;
          }
          for (I = _.length; --I > -1; )
            qs(_[I], "cursor", t.cursor || (t.cursor !== !1 ? Un : null));
          if ((xs--, g)) {
            if (
              ((W = g.changedTouches),
              W && ((g = W[0]), g !== Be && g.identifier !== De))
            ) {
              for (
                I = W.length;
                --I > -1 && (g = W[I]).identifier !== De && g.target !== r;

              );
              if (I < 0 && !N) return;
            }
            (l.pointerEvent = x),
              (l.pointerX = g.pageX),
              (l.pointerY = g.pageY);
          }
          return (
            $ && x
              ? (fr(x), (G = !0), tt(l, "release", "onRelease"))
              : x && !E
              ? ((G = !1),
                _t && (t.snap || t.bounds) && ur(t.inertia || t.throwProps),
                tt(l, "release", "onRelease"),
                (!Hn || x.type !== "touchmove") &&
                  x.type.indexOf("cancel") === -1 &&
                  (tt(l, "click", "onClick"),
                  ei() - P < 300 && tt(l, "doubleclick", "onDoubleClick"),
                  (re = x.target || r),
                  (P = ei()),
                  (j = function () {
                    P !== b &&
                      l.enabled() &&
                      !l.isPressed &&
                      !x.defaultPrevented &&
                      (re.click
                        ? re.click()
                        : Y.createEvent &&
                          ((H = Y.createEvent("MouseEvents")),
                          H.initMouseEvent(
                            "click",
                            !0,
                            !0,
                            Ve,
                            1,
                            l.pointerEvent.screenX,
                            l.pointerEvent.screenY,
                            l.pointerX,
                            l.pointerY,
                            !1,
                            !1,
                            !1,
                            !1,
                            0,
                            null
                          ),
                          re.dispatchEvent(H)));
                  }),
                  !Hn && !x.defaultPrevented && Pe.delayedCall(0.05, j)))
              : (ur(t.inertia || t.throwProps),
                !l.allowEventDefault &&
                x &&
                (t.dragClickables !== !1 || !O.call(l, x.target)) &&
                E &&
                (!C || (ze && C === ze)) &&
                x.cancelable !== !1
                  ? ((G = !0), fr(x))
                  : (G = !1),
                tt(l, "release", "onRelease")),
            Ft() && D.duration(l.tween.duration()),
            E && tt(l, "dragend", "onDragEnd"),
            !0
          );
        },
        Ce = function (g) {
          if (g && l.isDragging && !F) {
            var N = g.target || r.parentNode,
              x = N.scrollLeft - N._gsScrollX,
              E = N.scrollTop - N._gsScrollY;
            (x || E) &&
              (ue
                ? ((V -= x * ue.a + E * ue.c), (J -= E * ue.d + x * ue.b))
                : ((V -= x), (J -= E)),
              (N._gsScrollX += x),
              (N._gsScrollY += E),
              kt(l.pointerX, l.pointerY));
          }
        },
        Xe = function (g) {
          var N = ei(),
            x = N - P < 100,
            E = N - m < 50,
            $ = x && b === P,
            D = l.pointerEvent && l.pointerEvent.defaultPrevented,
            W = x && z === P,
            I = g.isTrusted || (g.isTrusted == null && x && $);
          if (
            (($ || (E && l.vars.suppressClickOnDrag !== !1)) &&
              g.stopImmediatePropagation &&
              g.stopImmediatePropagation(),
            x &&
              !(l.pointerEvent && l.pointerEvent.defaultPrevented) &&
              (!$ || (I && !W)))
          ) {
            I && $ && (z = P), (b = P);
            return;
          }
          (l.isPressed || E || x) && (!I || !g.detail || !x || D) && fr(g),
            !x &&
              !E &&
              !le &&
              (g && g.target && (l.pointerEvent = g),
              tt(l, "click", "onClick"));
        },
        Et = function (g) {
          return ue
            ? {
                x: g.x * ue.a + g.y * ue.c + ue.e,
                y: g.x * ue.b + g.y * ue.d + ue.f,
              }
            : { x: g.x, y: g.y };
        };
      return (
        (je = e.get(r)),
        je && je.kill(),
        (i.startDrag = function (q, g) {
          var N, x, E, $;
          wt(q || l.pointerEvent, !0),
            g &&
              !l.hitTest(q || l.pointerEvent) &&
              ((N = Ji(q || l.pointerEvent)),
              (x = Ji(r)),
              (E = Et({ x: N.left + N.width / 2, y: N.top + N.height / 2 })),
              ($ = Et({ x: x.left + x.width / 2, y: x.top + x.height / 2 })),
              (V -= E.x - $.x),
              (J -= E.y - $.y)),
            l.isDragging ||
              ((l.isDragging = le = !0), tt(l, "dragstart", "onDragStart"));
        }),
        (i.drag = ne),
        (i.endDrag = function (q) {
          return Le(q || l.pointerEvent, !0);
        }),
        (i.timeSinceDrag = function () {
          return l.isDragging ? 0 : (ei() - m) / 1e3;
        }),
        (i.timeSinceClick = function () {
          return (ei() - P) / 1e3;
        }),
        (i.hitTest = function (q, g) {
          return e.hitTest(l.target, q, g);
        }),
        (i.getDirection = function (q, g) {
          var N =
              q === "velocity" && wr ? q : ao(q) && !s ? "element" : "start",
            x,
            E,
            $,
            D,
            W,
            I;
          return (
            N === "element" && ((W = Ji(l.target)), (I = Ji(q))),
            (x =
              N === "start"
                ? l.x - U
                : N === "velocity"
                ? wr.getVelocity(r, u)
                : W.left + W.width / 2 - (I.left + I.width / 2)),
            s
              ? x < 0
                ? "counter-clockwise"
                : "clockwise"
              : ((g = g || 2),
                (E =
                  N === "start"
                    ? l.y - X
                    : N === "velocity"
                    ? wr.getVelocity(r, f)
                    : W.top + W.height / 2 - (I.top + I.height / 2)),
                ($ = Math.abs(x / E)),
                (D = $ < 1 / g ? "" : x < 0 ? "left" : "right"),
                $ < g && (D !== "" && (D += "-"), (D += E < 0 ? "up" : "down")),
                D)
          );
        }),
        (i.applyBounds = function (q, g) {
          var N, x, E, $, D, W;
          if (q && t.bounds !== q) return (t.bounds = q), l.update(!0, g);
          if ((ae(!0), ge(), oe && !Ft())) {
            if (
              ((N = l.x),
              (x = l.y),
              N > Z ? (N = Z) : N < ee && (N = ee),
              x > fe ? (x = fe) : x < ie && (x = ie),
              (l.x !== N || l.y !== x) &&
                ((E = !0),
                (l.x = l.endX = N),
                s ? (l.endRotation = N) : (l.y = l.endY = x),
                (be = !0),
                Oe(!0),
                l.autoScroll && !l.isDragging))
            )
              for (
                Gs(r.parentNode),
                  $ = r,
                  zr.scrollTop =
                    Ve.pageYOffset != null
                      ? Ve.pageYOffset
                      : Y.documentElement.scrollTop != null
                      ? Y.documentElement.scrollTop
                      : Y.body.scrollTop,
                  zr.scrollLeft =
                    Ve.pageXOffset != null
                      ? Ve.pageXOffset
                      : Y.documentElement.scrollLeft != null
                      ? Y.documentElement.scrollLeft
                      : Y.body.scrollLeft;
                $ && !W;

              )
                (W = kn($.parentNode)),
                  (D = W ? zr : $.parentNode),
                  h &&
                    D.scrollTop > D._gsMaxScrollY &&
                    (D.scrollTop = D._gsMaxScrollY),
                  c &&
                    D.scrollLeft > D._gsMaxScrollX &&
                    (D.scrollLeft = D._gsMaxScrollX),
                  ($ = D);
            l.isThrowing &&
              (E || l.endX > Z || l.endX < ee || l.endY > fe || l.endY < ie) &&
              ur(t.inertia || t.throwProps, E);
          }
          return l;
        }),
        (i.update = function (q, g, N) {
          if (g && l.isPressed) {
            var x = ki(r),
              E = se.apply({ x: l.x - U, y: l.y - X }),
              $ = ki(r.parentNode, !0);
            $.apply({ x: x.e - E.x, y: x.f - E.y }, E),
              (l.x -= E.x - $.e),
              (l.y -= E.y - $.f),
              Oe(!0),
              gt();
          }
          var D = l.x,
            W = l.y;
          return (
            vt(!g),
            q ? l.applyBounds() : (be && N && Oe(!0), ae(!0)),
            g && (kt(l.pointerX, l.pointerY), be && Oe(!0)),
            l.isPressed &&
              !g &&
              ((c && Math.abs(D - l.x) > 0.01) ||
                (h && Math.abs(W - l.y) > 0.01 && !s)) &&
              gt(),
            l.autoScroll &&
              (Gs(r.parentNode, l.isDragging),
              (T = l.isDragging),
              Oe(!0),
              Tu(r, Ce),
              bu(r, Ce)),
            l
          );
        }),
        (i.enable = function (q) {
          var g = { lazy: !0 },
            N,
            x,
            E;
          if (
            (t.cursor !== !1 && (g.cursor = t.cursor || Un),
            Pe.utils.checkPrefix("touchCallout") && (g.touchCallout = "none"),
            q !== "soft")
          ) {
            for (
              yu(
                _,
                c === h
                  ? "none"
                  : (t.allowNativeTouchScrolling &&
                      (r.scrollHeight === r.clientHeight) ==
                        (r.scrollWidth === r.clientHeight)) ||
                    t.allowEventDefault
                  ? "manipulation"
                  : c
                  ? "pan-y"
                  : "pan-x"
              ),
                x = _.length;
              --x > -1;

            )
              (E = _[x]),
                is || ht(E, "mousedown", wt),
                ht(E, "touchstart", wt),
                ht(E, "click", Xe, !0),
                Pe.set(E, g),
                E.getBBox &&
                  E.ownerSVGElement &&
                  c !== h &&
                  Pe.set(E.ownerSVGElement, {
                    touchAction:
                      t.allowNativeTouchScrolling || t.allowEventDefault
                        ? "manipulation"
                        : c
                        ? "pan-y"
                        : "pan-x",
                  }),
                t.allowContextMenu || ht(E, "contextmenu", _e);
            Uo(_, !1);
          }
          return (
            bu(r, Ce),
            (A = !0),
            wr &&
              q !== "soft" &&
              wr.track(F || r, o ? "x,y" : s ? "rotation" : "top,left"),
            (r._gsDragID = N = r._gsDragID || "d" + Yd++),
            (_n[N] = l),
            F && (F.enable(), (F.element._gsDragID = N)),
            (t.bounds || s) && gt(),
            t.bounds && l.applyBounds(),
            l
          );
        }),
        (i.disable = function (q) {
          for (var g = l.isDragging, N = _.length, x; --N > -1; )
            qs(_[N], "cursor", null);
          if (q !== "soft") {
            for (yu(_, null), N = _.length; --N > -1; )
              (x = _[N]),
                qs(x, "touchCallout", null),
                st(x, "mousedown", wt),
                st(x, "touchstart", wt),
                st(x, "click", Xe, !0),
                st(x, "contextmenu", _e);
            Uo(_, !0),
              pe &&
                (st(pe, "touchcancel", Le),
                st(pe, "touchend", Le),
                st(pe, "touchmove", ne)),
              st(Y, "mouseup", Le),
              st(Y, "mousemove", ne);
          }
          return (
            Tu(r, Ce),
            (A = !1),
            wr &&
              q !== "soft" &&
              (wr.untrack(F || r, o ? "x,y" : s ? "rotation" : "top,left"),
              l.tween && l.tween.kill()),
            F && F.disable(),
            vu(Oe),
            (l.isDragging = l.isPressed = de = !1),
            g && tt(l, "dragend", "onDragEnd"),
            l
          );
        }),
        (i.enabled = function (q, g) {
          return arguments.length ? (q ? l.enable(g) : l.disable(g)) : A;
        }),
        (i.kill = function () {
          return (
            (l.isThrowing = !1),
            l.tween && l.tween.kill(),
            l.disable(),
            Pe.set(_, { clearProps: "userSelect" }),
            delete _n[r._gsDragID],
            l
          );
        }),
        (i.revert = function () {
          this.kill(), this.styles && this.styles.revert();
        }),
        ~n.indexOf("scroll") &&
          ((F = i.scrollProxy =
            new jd(
              r,
              Wd(
                {
                  onKill: function () {
                    l.isPressed && Le(null);
                  },
                },
                t
              )
            )),
          (r.style.overflowY = h && !Ea ? "auto" : "hidden"),
          (r.style.overflowX = c && !Ea ? "auto" : "hidden"),
          (r = F.content)),
        s ? (p.rotation = 1) : (c && (p[u] = 1), h && (p[f] = 1)),
        (k.force3D = "force3D" in t ? t.force3D : !0),
        yc(_u(i)),
        i.enable(),
        i
      );
    }
    return (
      (e.register = function (t) {
        (Pe = t), Qs();
      }),
      (e.create = function (t, i) {
        return (
          ka || Qs(!0),
          ui(t).map(function (n) {
            return new e(n, i);
          })
        );
      }),
      (e.get = function (t) {
        return _n[(ui(t)[0] || {})._gsDragID];
      }),
      (e.timeSinceDrag = function () {
        return (ei() - mu) / 1e3;
      }),
      (e.hitTest = function (t, i, n) {
        if (t === i) return !1;
        var o = Ji(t),
          s = Ji(i),
          u = o.top,
          f = o.left,
          c = o.right,
          h = o.bottom,
          d = o.width,
          l = o.height,
          _ = s.left > c || s.right < f || s.top > h || s.bottom < u,
          p,
          m,
          T;
        return _ || !n
          ? !_
          : ((T = (n + "").indexOf("%") !== -1),
            (n = parseFloat(n) || 0),
            (p = { left: Math.max(f, s.left), top: Math.max(u, s.top) }),
            (p.width = Math.min(c, s.right) - p.left),
            (p.height = Math.min(h, s.bottom) - p.top),
            p.width < 0 || p.height < 0
              ? !1
              : T
              ? ((n *= 0.01),
                (m = p.width * p.height),
                m >= d * l * n || m >= s.width * s.height * n)
              : p.width > n && p.height > n);
      }),
      e
    );
  })(Zd);
Hd(Po.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1,
});
Po.zIndex = 1e3;
Po.version = "3.13.0";
vc() && Pe.registerPlugin(Po);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Rr,
  Ra,
  uo,
  Sc,
  rn,
  an,
  Aa,
  Cc,
  Pc = function () {
    return Rr || (typeof window < "u" && (Rr = window.gsap));
  },
  La = {},
  Jd = function (e) {
    return Math.round(e * 1e4) / 1e4;
  },
  Na = function (e) {
    return Cc(e).id;
  },
  Gn = function (e) {
    return La[Na(typeof e == "string" ? uo(e)[0] : e)];
  },
  Pu = function (e) {
    var r = rn,
      t;
    if (e - Aa >= 0.05)
      for (Aa = e; r; )
        (t = r.g(r.t, r.p)),
          (t !== r.v1 || e - r.t1 > 0.2) &&
            ((r.v2 = r.v1), (r.v1 = t), (r.t2 = r.t1), (r.t1 = e)),
          (r = r._next);
  },
  ep = { deg: 360, rad: Math.PI * 2 },
  js = function () {
    (Rr = Pc()),
      Rr &&
        ((uo = Rr.utils.toArray),
        (Sc = Rr.utils.getUnit),
        (Cc = Rr.core.getCache),
        (an = Rr.ticker),
        (Ra = 1));
  },
  tp = function (e, r, t, i) {
    (this.t = e),
      (this.p = r),
      (this.g = e._gsap.get),
      (this.rCap = ep[t || Sc(this.g(e, r))]),
      (this.v1 = this.v2 = 0),
      (this.t1 = this.t2 = an.time),
      i && ((this._next = i), (i._prev = this));
  },
  ko = (function () {
    function a(r, t) {
      Ra || js(),
        (this.target = uo(r)[0]),
        (La[Na(this.target)] = this),
        (this._props = {}),
        t && this.add(t);
    }
    a.register = function (t) {
      (Rr = t), js();
    };
    var e = a.prototype;
    return (
      (e.get = function (t, i) {
        var n =
            this._props[t] || console.warn("Not tracking " + t + " velocity."),
          o,
          s,
          u;
        return (
          (o = parseFloat(i ? n.v1 : n.g(n.t, n.p))),
          (s = o - parseFloat(n.v2)),
          (u = n.rCap),
          u && ((s = s % u), s !== s % (u / 2) && (s = s < 0 ? s + u : s - u)),
          Jd(s / ((i ? n.t1 : an.time) - n.t2))
        );
      }),
      (e.getAll = function () {
        var t = {},
          i = this._props,
          n;
        for (n in i) t[n] = this.get(n);
        return t;
      }),
      (e.isTracking = function (t) {
        return t in this._props;
      }),
      (e.add = function (t, i) {
        t in this._props ||
          (rn || (an.add(Pu), (Aa = an.time)),
          (rn = this._props[t] = new tp(this.target, t, i, rn)));
      }),
      (e.remove = function (t) {
        var i = this._props[t],
          n,
          o;
        i &&
          ((n = i._prev),
          (o = i._next),
          n && (n._next = o),
          o ? (o._prev = n) : rn === i && (an.remove(Pu), (rn = 0)),
          delete this._props[t]);
      }),
      (e.kill = function (t) {
        for (var i in this._props) this.remove(i);
        t || delete La[Na(this.target)];
      }),
      (a.track = function (t, i, n) {
        Ra || js();
        for (
          var o = [],
            s = uo(t),
            u = i.split(","),
            f = (n || "").split(","),
            c = s.length,
            h,
            d;
          c--;

        ) {
          for (h = Gn(s[c]) || new a(s[c]), d = u.length; d--; )
            h.add(u[d], f[d] || f[0]);
          o.push(h);
        }
        return o;
      }),
      (a.untrack = function (t, i) {
        var n = (i || "").split(",");
        uo(t).forEach(function (o) {
          var s = Gn(o);
          s &&
            (n.length
              ? n.forEach(function (u) {
                  return s.remove(u);
                })
              : s.kill(1));
        });
      }),
      (a.isTracking = function (t, i) {
        var n = Gn(t);
        return n && n.isTracking(i);
      }),
      (a.getVelocity = function (t, i) {
        var n = Gn(t);
        return !n || !n.isTracking(i)
          ? console.warn("Not tracking velocity of " + i)
          : n.get(i);
      }),
      a
    );
  })();
ko.getByTarget = Gn;
Pc() && Rr.registerPlugin(ko);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var dt,
  kc,
  ku,
  Ec,
  Fa,
  fo,
  Mc,
  Dc,
  Oc,
  ml,
  Rc,
  co,
  Ia,
  Ac,
  vs = ko.getByTarget,
  Lc = function () {
    return (
      dt ||
      (typeof window < "u" && (dt = window.gsap) && dt.registerPlugin && dt)
    );
  },
  rp = function (e) {
    return typeof e == "string";
  },
  So = function (e) {
    return typeof e == "number";
  },
  di = function (e) {
    return typeof e == "object";
  },
  $a = function (e) {
    return typeof e == "function";
  },
  ip = 1,
  Nc = Array.isArray,
  np = function (e) {
    return e;
  },
  zi = 1e10,
  Eu = 1 / zi,
  Fc = 0.05,
  op = function (e) {
    return Math.round(e * 1e4) / 1e4;
  },
  sp = function (e, r, t) {
    for (var i in r) !(i in e) && i !== t && (e[i] = r[i]);
    return e;
  },
  ap = function a(e) {
    var r = {},
      t,
      i;
    for (t in e) r[t] = di((i = e[t])) && !Nc(i) ? a(i) : i;
    return r;
  },
  Mu = function (e, r, t, i, n) {
    var o = r.length,
      s = 0,
      u = zi,
      f,
      c,
      h,
      d;
    if (di(e)) {
      for (; o--; ) {
        (f = r[o]), (c = 0);
        for (h in e) (d = f[h] - e[h]), (c += d * d);
        c < u && ((s = o), (u = c));
      }
      if ((n || zi) < zi && n < Math.sqrt(u)) return e;
    } else
      for (; o--; )
        (f = r[o]),
          (c = f - e),
          c < 0 && (c = -c),
          c < u && f >= i && f <= t && ((s = o), (u = c));
    return r[s];
  },
  Ic = function (e, r, t, i, n, o, s) {
    if (e.end === "auto") return e;
    var u = e.end,
      f,
      c;
    if (((t = isNaN(t) ? zi : t), (i = isNaN(i) ? -zi : i), di(r))) {
      if (
        ((f = r.calculated ? r : ($a(u) ? u(r, s) : Mu(r, u, t, i, o)) || r),
        !r.calculated)
      ) {
        for (c in f) r[c] = f[c];
        r.calculated = !0;
      }
      f = f[n];
    } else f = $a(u) ? u(r, s) : Nc(u) ? Mu(r, u, t, i, o) : parseFloat(u);
    return (
      f > t ? (f = t) : f < i && (f = i),
      { max: f, min: f, unitFactor: e.unitFactor }
    );
  },
  ws = function (e, r, t) {
    return isNaN(e[r]) ? t : +e[r];
  },
  yl = function (e, r) {
    return (r * Fc * e) / ml;
  },
  Du = function (e, r, t) {
    return Math.abs(((r - e) * ml) / t / Fc);
  },
  $c = {
    resistance: 1,
    checkpoint: 1,
    preventOvershoot: 1,
    linkedProps: 1,
    radius: 1,
    duration: 1,
  },
  zc = function (e, r, t, i) {
    if (r.linkedProps) {
      var n = r.linkedProps.split(","),
        o = {},
        s,
        u,
        f,
        c,
        h,
        d;
      for (s = 0; s < n.length; s++)
        (u = n[s]),
          (f = r[u]),
          f &&
            (So(f.velocity)
              ? (c = f.velocity)
              : ((h = h || vs(e)), (c = h && h.isTracking(u) ? h.get(u) : 0)),
            (d = Math.abs(c / ws(f, "resistance", i))),
            (o[u] = parseFloat(t(e, u)) + yl(c, d)));
      return o;
    }
  },
  lp = function (e, r, t, i, n, o) {
    if (
      (t === void 0 && (t = 10),
      i === void 0 && (i = 0.2),
      n === void 0 && (n = 1),
      rp(e) && (e = Ec(e)[0]),
      !e)
    )
      return 0;
    var s = 0,
      u = zi,
      f = r.inertia || r,
      c = Oc(e).get,
      h = ws(f, "resistance", fo.resistance),
      d,
      l,
      _,
      p,
      m,
      T,
      S,
      M,
      w,
      v;
    v = zc(e, f, c, h);
    for (d in f)
      $c[d] ||
        ((l = f[d]),
        di(l) ||
          ((M = M || vs(e)),
          M && M.isTracking(d)
            ? (l = So(l) ? { velocity: l } : { velocity: M.get(d) })
            : ((p = +l || 0), (_ = Math.abs(p / h)))),
        di(l) &&
          (So(l.velocity)
            ? (p = l.velocity)
            : ((M = M || vs(e)), (p = M && M.isTracking(d) ? M.get(d) : 0)),
          (_ = Rc(i, t, Math.abs(p / ws(l, "resistance", h)))),
          (m = parseFloat(c(e, d)) || 0),
          (T = m + yl(p, _)),
          "end" in l &&
            ((l = Ic(l, v && d in v ? v : T, l.max, l.min, d, f.radius, p)),
            co === r && (co = f = ap(r)),
            (f[d] = sp(l, f[d], "end"))),
          "max" in l && T > +l.max + Eu
            ? ((w = l.unitFactor || fo.unitFactors[d] || 1),
              (S =
                (m > l.max && l.min !== l.max) || (p * w > -15 && p * w < 45)
                  ? i + (t - i) * 0.1
                  : Du(m, l.max, p)),
              S + n < u && (u = S + n))
            : "min" in l &&
              T < +l.min - Eu &&
              ((w = l.unitFactor || fo.unitFactors[d] || 1),
              (S =
                (m < l.min && l.min !== l.max) || (p * w > -45 && p * w < 15)
                  ? i + (t - i) * 0.1
                  : Du(m, l.min, p)),
              S + n < u && (u = S + n)),
          S > s && (s = S)),
        _ > s && (s = _));
    return s > u && (s = u), s > t ? t : s < i ? i : s;
  },
  Ou = function () {
    (dt = Lc()),
      dt &&
        ((ku = dt.parseEase),
        (Ec = dt.utils.toArray),
        (Mc = dt.utils.getUnit),
        (Oc = dt.core.getCache),
        (Rc = dt.utils.clamp),
        (Ia = dt.core.getStyleSaver),
        (Ac = dt.core.reverting || function () {}),
        (Fa = ku("power3")),
        (ml = Fa(0.05)),
        (Dc = dt.core.PropTween),
        dt.config({
          resistance: 100,
          unitFactors: {
            time: 1e3,
            totalTime: 1e3,
            progress: 1e3,
            totalProgress: 1e3,
          },
        }),
        (fo = dt.config()),
        dt.registerPlugin(ko),
        (kc = 1));
  },
  xl = {
    version: "3.13.0",
    name: "inertia",
    register: function (e) {
      (dt = e), Ou();
    },
    init: function (e, r, t, i, n) {
      kc || Ou();
      var o = vs(e);
      if (r === "auto") {
        if (!o) {
          console.warn(
            "No inertia tracking on " +
              e +
              ". InertiaPlugin.track(target) first."
          );
          return;
        }
        r = o.getAll();
      }
      (this.styles = Ia && typeof e.style == "object" && Ia(e)),
        (this.target = e),
        (this.tween = t),
        (co = r);
      var s = e._gsap,
        u = s.get,
        f = r.duration,
        c = di(f),
        h = r.preventOvershoot || (c && f.overshoot === 0),
        d = ws(r, "resistance", fo.resistance),
        l = So(f)
          ? f
          : lp(
              e,
              r,
              (c && f.max) || 10,
              (c && f.min) || 0.2,
              c && "overshoot" in f ? +f.overshoot : h ? 0 : 1
            ),
        _,
        p,
        m,
        T,
        S,
        M,
        w,
        v,
        O;
      (r = co), (co = 0), (O = zc(e, r, u, d));
      for (_ in r)
        $c[_] ||
          ((p = r[_]),
          $a(p) && (p = p(i, e, n)),
          So(p)
            ? (S = p)
            : di(p) && !isNaN(p.velocity)
            ? (S = +p.velocity)
            : o && o.isTracking(_)
            ? (S = o.get(_))
            : console.warn(
                "ERROR: No velocity was defined for " + e + " property: " + _
              ),
          (M = yl(S, l)),
          (v = 0),
          (m = u(e, _)),
          (T = Mc(m)),
          (m = parseFloat(m)),
          di(p) &&
            ((w = m + M),
            "end" in p &&
              (p = Ic(p, O && _ in O ? O : w, p.max, p.min, _, r.radius, S)),
            "max" in p && +p.max < w
              ? h || p.preventOvershoot
                ? (M = p.max - m)
                : (v = p.max - m - M)
              : "min" in p &&
                +p.min > w &&
                (h || p.preventOvershoot
                  ? (M = p.min - m)
                  : (v = p.min - m - M))),
          this._props.push(_),
          this.styles && this.styles.save(_),
          (this._pt = new Dc(this._pt, e, _, m, 0, np, 0, s.set(e, _, this))),
          (this._pt.u = T || 0),
          (this._pt.c1 = M),
          (this._pt.c2 = v));
      return t.duration(l), ip;
    },
    render: function (e, r) {
      var t = r._pt;
      if (((e = Fa(r.tween._time / r.tween._dur)), e || !Ac()))
        for (; t; )
          t.set(t.t, t.p, op(t.s + t.c1 * e + t.c2 * e * e) + t.u, t.d, e),
            (t = t._next);
      else r.styles.revert();
    },
  };
"track,untrack,isTracking,getVelocity,getByTarget"
  .split(",")
  .forEach(function (a) {
    return (xl[a] = ko[a]);
  });
Lc() && dt.registerPlugin(xl);
/*!
 * Physics2DPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */ var Gr,
  za,
  Bc,
  Ba,
  Yc,
  Ru = Math.PI / 180,
  Xc = function () {
    return (
      Gr ||
      (typeof window < "u" && (Gr = window.gsap) && Gr.registerPlugin && Gr)
    );
  },
  Au = function (e) {
    return Math.round(e * 1e4) / 1e4;
  },
  Lu = function (e) {
    (Gr = e || Xc()),
      za ||
        ((Bc = Gr.utils.getUnit),
        (Ba = Gr.core.getStyleSaver),
        (Yc = Gr.core.reverting || function () {}),
        (za = 1));
  },
  Nu = function (e, r, t, i, n) {
    var o = e._gsap,
      s = o.get(e, r);
    (this.p = r),
      (this.set = o.set(e, r)),
      (this.s = this.val = parseFloat(s)),
      (this.u = Bc(s) || 0),
      (this.vel = t || 0),
      (this.v = this.vel / n),
      i || i === 0
        ? ((this.acc = i), (this.a = this.acc / (n * n)))
        : (this.acc = this.a = 0);
  },
  Wc = {
    version: "3.13.0",
    name: "physics2D",
    register: Lu,
    init: function (e, r, t) {
      za || Lu();
      var i = this,
        n = +r.angle || 0,
        o = +r.velocity || 0,
        s = +r.acceleration || 0,
        u = r.xProp || "x",
        f = r.yProp || "y",
        c =
          r.accelerationAngle || r.accelerationAngle === 0
            ? +r.accelerationAngle
            : n;
      (i.styles =
        Ba &&
        Ba(
          e,
          r.xProp && r.xProp !== "x" ? r.xProp + "," + r.yProp : "transform"
        )),
        (i.target = e),
        (i.tween = t),
        (i.step = 0),
        (i.sps = 30),
        r.gravity && ((s = +r.gravity), (c = 90)),
        (n *= Ru),
        (c *= Ru),
        (i.fr = 1 - (+r.friction || 0)),
        i._props.push(u, f),
        (i.xp = new Nu(e, u, Math.cos(n) * o, Math.cos(c) * s, i.sps)),
        (i.yp = new Nu(e, f, Math.sin(n) * o, Math.sin(c) * s, i.sps)),
        (i.skipX = i.skipY = 0);
    },
    render: function (e, r) {
      var t = r.xp,
        i = r.yp,
        n = r.tween,
        o = r.target,
        s = r.step,
        u = r.sps,
        f = r.fr,
        c = r.skipX,
        h = r.skipY,
        d = n._from ? n._dur - n._time : n._time,
        l,
        _,
        p,
        m,
        T,
        S;
      if (n._time || !Yc()) {
        if (f === 1)
          (p = d * d * 0.5),
            (l = t.s + t.vel * d + t.acc * p),
            (_ = i.s + i.vel * d + i.acc * p);
        else {
          for (
            d *= u,
              m = S = (d | 0) - s,
              S < 0 &&
                ((t.v = t.vel / u),
                (i.v = i.vel / u),
                (t.val = t.s),
                (i.val = i.s),
                (r.step = 0),
                (m = S = d | 0)),
              T = (d % 1) * f;
            S--;

          )
            (t.v += t.a),
              (i.v += i.a),
              (t.v *= f),
              (i.v *= f),
              (t.val += t.v),
              (i.val += i.v);
          (l = t.val + t.v * T), (_ = i.val + i.v * T), (r.step += m);
        }
        c || t.set(o, t.p, Au(l) + t.u), h || i.set(o, i.p, Au(_) + i.u);
      } else r.styles.revert();
    },
    kill: function (e) {
      this.xp.p === e && (this.skipX = 1), this.yp.p === e && (this.skipY = 1);
    },
  };
Xc() && Gr.registerPlugin(Wc);
nt.registerPlugin(Bi, we, hc, Po, xl, Wc);
window.addEventListener("scroll", () => {});
Bi.create({ wrapper: "#wrapper", content: "#content" });
const Ya = document.querySelectorAll(".card"),
  up = Array.from(Ya)
    .reverse()
    .filter((a, e) => e != Ya.length - 1);
Ya.forEach((a, e) => {
  const r = (e * Math.random() - Math.random() * 10) % 2 ? 1 : -1;
  a.style.transform = `rotate(${
    Math.random() *
    (e * 10 - e * e - e - e * 2 * Math.random() * Math.random()) *
    r
  }deg)`;
});
nt.to(up, {
  opacity: 0.5,
  yPercent: -150,
  x: 150,
  stagger: 0.1,
  rotate: "-=10",
  scrollTrigger: { trigger: "#second", pin: !0, scrub: !0, end: "+=2000" },
});
const fp = document.querySelector("#menu-btn");
fp.addEventListener("click", () => {
  nt.timeline()
    .to("#menu", { duration: 1, css: { scale: 5, borderRadius: 0 } })
    .to("#menu", { duration: 0, css: { scale: 1 } })
    .to("#menu ul", { opacity: 1, duration: 0.5 });
});
document.getElementById("menu").addEventListener("click", (a) => {
  if (a.target.classList.contains("menu-item")) return;
  nt.timeline()
    .to("#menu", {
      duration: 0,
      css: {
        scale: 0.01,
        borderBottomLeftRadius: "60%",
        borderBottomRightRadius: "50%",
        borderTopLeftRadius: "50%",
      },
    })
    .to("#menu ul", { duration: 0, opacity: 0 });
});
document.querySelector(".imgs");
document.querySelectorAll(".admin-img");
nt.to("#first .box div p", {
  opacity: 0,
  scrollTrigger: { trigger: "#first", scrub: !0, start: "top top" },
});
let yn = 0,
  xn = 0,
  vl = 0,
  wl = 0;
nt.to("#cursor", {
  duration: 0.018,
  repeat: -1,
  onRepeat: function () {
    (yn += (vl - yn) / 8),
      (xn += (wl - xn) / 8),
      nt.set("#cursor", { css: { left: yn - 1, top: xn - 2 } });
  },
});
nt.to(".point", {
  duration: 0.018,
  repeat: -1,
  onRepeat: function () {
    (yn += (vl - yn) / 8),
      (xn += (wl - xn) / 8),
      nt.set(".point", { css: { left: yn - 1, top: xn - 2 } });
  },
});
window.addEventListener("mousemove", (a) => {
  (vl = a.clientX), (wl = a.clientY);
});
we.create({
  trigger: "#second",
  start: "top bottom",
  onEnter: () => {
    nt.to("#second", { scrollTop: 0, duration: 1.2, ease: "power2.out" });
  },
});
document.querySelectorAll(".target").forEach((a) => {
  a.addEventListener("mouseenter", () => {
    document.getElementById("cursor").classList.add("inverter"),
      nt.to("#cursor", {
        scale: 2,
        opacity: 0.7,
        duration: 0.3,
        ease: "power3.out",
      }),
      nt.to(".point", { opacity: 1 });
  }),
    a.addEventListener("mouseleave", () => {
      document.getElementById("cursor").classList.remove("inverter"),
        nt.to("#cursor", {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
    });
});
const Cr = document.getElementById("bg"),
  Tr = Cr.getContext("2d");
Cr.width = window.innerWidth;
Cr.height = window.innerHeight;
let dr = [];
const cp = 80,
  Fu = 120;
class hp {
  constructor() {
    (this.x = Math.random() * Cr.width),
      (this.y = Math.random() * Cr.height),
      (this.r = 2),
      (this.dx = nt.utils.random(-0.6, 0.6)),
      (this.dy = nt.utils.random(-0.6, 0.6));
  }
  update() {
    (this.x += this.dx),
      (this.y += this.dy),
      (this.x < 0 || this.x > Cr.width) && (this.dx *= -1),
      (this.y < 0 || this.y > Cr.height) && (this.dy *= -1);
  }
  draw() {
    Tr.beginPath(),
      Tr.arc(this.x, this.y, this.r, 0, Math.PI * 2),
      (Tr.fillStyle = "#000000"),
      Tr.fill();
  }
}
for (let a = 0; a < cp; a++) dr.push(new hp());
let ln = { x: null, y: null };
window.addEventListener("mousemove", (a) => {
  (ln.x = a.clientX), (ln.y = a.clientY);
});
function dp() {
  for (let a = 0; a < dr.length; a++)
    for (let e = a + 1; e < dr.length; e++) {
      let r = dr[a].x - dr[e].x,
        t = dr[a].y - dr[e].y,
        i = Math.sqrt(r * r + t * t);
      i < Fu &&
        ((Tr.strokeStyle = `rgba(0,0,0,${1 - i / Fu})`),
        (Tr.lineWidth = 1),
        Tr.beginPath(),
        Tr.moveTo(dr[a].x, dr[a].y),
        Tr.lineTo(dr[e].x, dr[e].y),
        Tr.stroke());
    }
}
function Vc() {
  Tr.clearRect(0, 0, Cr.width, Cr.height),
    dr.forEach((a) => {
      if ((a.update(), ln.x && ln.y)) {
        let e = ln.x - a.x,
          r = ln.y - a.y;
        Math.sqrt(e * e + r * r) < 150 &&
          ((a.x += e * 0.01), (a.y += r * 0.01));
      }
      a.draw();
    }),
    dp(),
    requestAnimationFrame(Vc);
}
Vc();
window.addEventListener("resize", () => {
  (Cr.width = window.innerWidth), (Cr.height = window.innerHeight);
});
const pp = document.querySelectorAll(
    "#second h2, #second p, #third h2, #third p, #forth h2"
  ),
  _p = new IntersectionObserver(
    (a, e) => {
      a.forEach((r) => {
        r.isIntersecting &&
          (nt.to(r.target, { opacity: 1, y: 0, duration: 1 }),
          nt.set(r.target, { opacity: 0, y: 100 }));
      });
    },
    { threshold: 0.1 }
  );
pp.forEach((a) => {
  nt.set(a, { opacity: 0, y: 100 }), _p.observe(a);
});
nt.to(".wheel", {
  rotate: 1800,
  scrollTrigger: { trigger: "body", scrub: !0 },
});
const gp = nt.timeline({
  scrollTrigger: {
    trigger: "#forth",
    scrub: !0,
    start: "top 60%",
    end: "bottom 90%",
  },
});
gp.fromTo(
  ".frontend h3,.frontend .logo-list li",
  { y: 100, opacity: 0, rotation: 15, transformOrigin: "0% 0%" },
  {
    y: 0,
    opacity: 1,
    rotation: 0,
    stagger: 0.3,
    duration: 1,
    ease: "power2.out",
  }
)
  .fromTo(
    ".backend h3,.backend .logo-list li",
    { y: 100, opacity: 0, rotation: 15, transformOrigin: "0% 0%" },
    {
      y: 0,
      opacity: 1,
      rotation: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out",
    }
  )
  .fromTo(
    ".database h3,.database .logo-list li",
    { y: 100, opacity: 0, rotation: 15, transformOrigin: "0% 0%" },
    {
      y: 0,
      opacity: 1,
      rotation: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out",
    }
  )
  .fromTo(
    ".tools h3,.tools .logo-list li",
    { y: 100, opacity: 0, rotation: 15, transformOrigin: "0% 0%" },
    {
      y: 0,
      opacity: 1,
      rotation: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out",
    }
  );
