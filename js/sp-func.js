/**
 * @desc sp公用方法集
 * @author blryli
 * @date  2017-12-20 14:48:39
 */

(function(e) {
  var o = {
    navClick: function() {
      //监听点击区域是否在nav内
      $(document).on("click", function(e) {
        if (
          !$(e.target).hasClass("nav") &&
          !$(e.target).hasClass("sp-menu-icon")
        ) {
          $("#nav").removeClass("open");
        }
      });
      //手机端nav点击展开
      if ($(document).width() < 768) {
        $("#openNav").click(function() {
          $("#nav").addClass("open");
        });
      }
    },
    //banner轮播组件
    blCarousel: function(banner, bannerArr, cutArr, type, outTime) {
      let num = 0;
      let interval;
      let len = bannerArr.length;
      //图片按钮切换
      cutArr
        .bind(type, function() {
          var _this = $(this);
          _this
            .addClass("is-active")
            .siblings()
            .removeClass("is-active");
          num = _this.prevAll().length;
          bannerArr
            .eq(num)
            .addClass("is-active")
            .siblings()
            .removeClass("is-active");
          if (num > 0) {
            bannerArr
              .eq(num)
              .prev()
              .addClass("is-animating")
              .siblings()
              .removeClass("is-animating");
          } else {
            bannerArr
              .eq(len - 1)
              .addClass("is-animating")
              .siblings()
              .removeClass("is-animating");
          }
        })
        .eq(num)
        .trigger(type);
      //图片轮播
      let timer = function() {
        num = (num + 1) % len;
        cutArr.eq(num).triggerHandler(type);
      };
      banner
        .bind("mouseover", function(e) {
          SPFunc.inNode(banner, e) && clearInterval(interval);
        })
        .bind("mouseout", function() {
          interval = setInterval(timer, outTime);
        })
        .trigger("mouseout");
    },
    //判断鼠标是否在节点内
    inNode: (parentNode, node) => {
      let x = node.pageX,
        y = node.pageY;
      var y1 = parentNode.offset().top; //parentNode上面两个的点的y值
      var y2 = y1 + parentNode.height(); //parentNode下面两个点的y值
      var x1 = parentNode.offset().left; //parentNode左边两个的点的x值
      var x2 = x1 + parentNode.width(); //parentNode右边两个点的x的值
      if (x < x1 || x > x2 || y < y1 || y > y2) {
        return false;
      } else {
        return true;
      }
    },
    //选项卡
    toggleTab: function(Tab, type, content) {
      let num = 0;
      Tab.bind(type, function() {
        var _this = $(this);
        _this
          .addClass("active")
          .siblings()
          .removeClass("active");
        if (content) {
          num = _this.prevAll().length;
          content
            .eq(num)
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      });
    },
    //移入移出目标对象添加删除类
    mouseenterAR: function(obj, target) {
      obj
        .bind("mouseover", function() {
          target.addClass("active");
        })
        .bind("mouseout", function() {
          target.removeClass("active");
        });
    },
    //checked 全选取消
    checkedClick: function(checkObj, checkAll) {
      let arr;
      let checkList = checkObj.find(".icheckbox_square-green");
      let checkId = $("#check");

      function isCheck(obj) {
        let check = obj.find(".check").is(":checked");
        arr = [];
        check ? obj.addClass("active") : obj.removeClass("active");
        checkObj.find(".check").each(function(index, el) {
          if ($(el).is(":checked")) {
            arr.push(index);
          }
        });
        arr.length == checkList.length
          ? checkId.prop("checked", true)
          : checkId.prop("checked", false);
        checkId.is(":checked")
          ? checkAll.addClass("active")
          : checkAll.removeClass("active");
        console.log("arr>>" + arr);
      }
      //点击全选
      checkId.click(function() {
        arr = [];
        checkList.each(function(i, d) {
          let check = $(d).find(".check");
          if (checkId.is(":checked")) {
            checkAll.addClass("active");
            $(d).addClass("active");
            check.prop("checked", true);
            arr.push(i);
          } else {
            checkAll.removeClass("active");
            $(d).removeClass("active");
            check.prop("checked", false);
          }
        });
        console.log("arr>>" + arr);
      });
      //点击单选
      checkList.each(function() {
        $(this).click(function() {
          isCheck($(this));
        });
      });
    },
    //单选按钮组
    onceCheck: function(obj, clas) {
      clas = clas ? clas : "active";
      obj.each((i, d) => {
        $(d).click(function() {
          if (
            !$(d)
              .parent()
              .hasClass(clas)
          ) {
            obj.each((ind, dat) => {
              $(dat).prop("checked", false);
              $(dat)
                .parent()
                .removeClass(clas);
            });
            $(d).prop("checked", true);
            $(d)
              .parent()
              .addClass(clas);
          }
        });
      });
    },
    //点击窗口关闭弹窗
    clickClose: function(obj, targ, id) {
      $(document).bind("click", function(e) {
        let target = $(e.target);
        if (
          e.target.id == obj ||
          e.target.id == targ ||
          e.target.id == "prevYear" ||
          e.target.id == "prevMonth" ||
          e.target.id == "nextMonth" ||
          e.target.id == "nextYear"
        )
          return;
        if (id.css("display") == "block") {
          id.removeClass("active");
        }
      });
    },
    //记住密码选框
    inputChecked: function(obj, type, other) {
      if (!other) {
        obj.bind(type, function() {
          obj.find(".check").is(":checked")
            ? obj.addClass("active")
            : obj.removeClass("active");
        });
      } else {
        other.bind(type, function() {
          obj.find(".check").is(":checked")
            ? obj.addClass("active")
            : obj.removeClass("active");
        });
      }
    },
    //验证是否为空
    VerifyEmpty: function(obj, objerro) {
      for (var k in this.addGuige) {
        if (obj[k] == "") {
          objerro = obj[k] + "不能为空！";
          return;
        } else {
          objerro = "";
        }
      }
    },
    //获取url数据
    getRequest: function() {
      let url = location.search, //获取url中"?"符后的字串
        data = "";
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("=");
        data = strs[0] == "name" ? strs[1] : "";
        return data;
      }
    },
    //当前页面登陆/退出
    inLogin: function() {
      if (name != "undefined" && name != "") {
        $(".login").addClass("in");
        $("#userName").html(name);
      } else {
        $(".login").removeClass("in");
        $("#userName").html("");
      }
      $("#loginOut").click(function() {
        $("#userName").html("");
        $(".login").removeClass("in");
        window.open(window.location.pathname, "_self");
      });
    },
    //盒子内跳转页面
    cutHtml: function(CObj, MObj, page) {
      CObj.click(function() {
        MObj.load(page);
      });
    },
    //消息提示弹窗
    spAlert: function(self, msg) {
      self.$alert(msg, {
        showConfirmButton: false,
        closeOnClickModal: true,
        type: "warning"
      });
    },
    //打开loding层
    spLoading: function(self) {
      return self.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    }
  };
  e.SPFunc = o;
})(window);
