(function(undefined) {
    var _global;
    //工具函数
    //配置合并
    function extend(def, opt, override) {
        for (var k in opt) {
            if (opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
                def[k] = opt[k];
            }
        }
        return def;
    }
    //日期格式化
    function formartDate(y, m, d, symbol) {
        symbol = symbol || "-";
        m = m.toString()[1] ? m : "0" + m;
        d = d.toString()[1] ? d : "0" + d;
        return y + symbol + m + symbol + d;
    }
    //带数字的日期格式化
    function formartMonth(y, m, yVal, mVal) {
        yVal = "年";
        mVal = "月";
        m = m.toString()[1] ? m : "0" + m;
        if (m <= 12) {
            return y + yVal + m + mVal;
        } else if (m > 12) {
            m = m % 12;
            y += 1;
            return y + yVal + m + mVal;
        }
    }

    function Schedule(opt, isAnimate) {
        var def = {},
            isAnimate = false,
            opt = extend(def, opt, true),
            saleData = opt.saleData ? opt.saleData : "",
            isCurDate = opt.isCurDate != false ? true : false,
            curDate = opt.date ? new Date(opt.date) : new Date(),
            year = curDate.getFullYear(),
            month = curDate.getMonth(),
            day = curDate.getDate(),
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth(),
            currentDay = curDate.getDate(),
            selectedDate = "",
            el = document.querySelector(opt.el) || document.querySelector("body"),
            _this = this;
        var bindEvent = function() {
            el.addEventListener(
                "click",
                function(e) {
                    if (isAnimate) return;

                    //点击日期框获取日期
                    if (e.target.className.indexOf("click-box") > -1) {
                        getDays(e.target.parentNode);
                    } else {
                        getDays(e.target);
                    }

                    function getDays(eNode) {
                        if (eNode.className.indexOf("currentDate") > -1) {
                            selectedDate = eNode.getAttribute("data-date");
                            mouth = selectedDate.split('-')[1];
                            day = selectedDate.split('-')[2];
                            render();
                            let weight;
                            if (el.querySelector(".selected-style").querySelector(".min-unit")) {
                                weight = el.querySelector(".selected-style").querySelector(".min-unit").innerHTML;
                            }
                            opt.clickCb && opt.clickCb(year, mouth, day, weight);
                        }
                    }
                    if (el == document.getElementById('sp-data-box2') || e.target.querySelector('.selected-style')) return;
                    //选中时间动画
                    let countValue = el.querySelector(".selected-style"),
                        clonedNode = countValue.cloneNode(true), // 克隆节点 
                        starX = countValue.getBoundingClientRect().left,
                        starY = countValue.getBoundingClientRect().top,
                        cutData = document.getElementById('cutData'),
                        endX = cutData.getBoundingClientRect().left,
                        endY = cutData.getBoundingClientRect().top;
                    clonedNode.setAttribute("id", "clone-node"); //添加ID
                    countValue.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点 
                    clonedNode.style.left = starX + 'px';
                    clonedNode.style.top = starY + 'px';
                    isAnimate = true;
                    $(clonedNode).animate({ left: endX + 50 + 'px', top: endY + 12 + 'px', width: '10px', height: '8px' }, 800, function() {
                        $(this).css({ display: "none" });
                        //赋值
                        if (countValue && document.getElementById("min-money")) {
                            document.getElementById("min-money").innerHTML = countValue.querySelector(".count").innerHTML;
                            document.getElementById("par-money").innerHTML = countValue.querySelector(".count").getAttribute("data-par");
                            document.getElementById("min-money-unit").innerHTML = "/" + countValue.querySelector(".unit").innerHTML;
                            document.getElementById("par-money-unit").innerHTML = "/" + countValue.querySelector(".unit").innerHTML;
                            document.getElementById("weight-unit").innerHTML = countValue.querySelector(".unit").innerHTML;
                        }
                        isAnimate = false;
                    });
                },
                false
            );
        };
        var init = function() {
            var scheduleHd =
                '<ul class="schedule-hd ul-box calendar-show">' +
                '<li class="check-mounth active" id="now-month">' +
                formartMonth(year, month + 1) +
                "</li>" +
                "</ul>";
            var scheduleWeek =
                '<ul class="week-ul ul-box">' +
                "<li>日</li>" +
                "<li>一</li>" +
                "<li>二</li>" +
                "<li>三</li>" +
                "<li>四</li>" +
                "<li>五</li>" +
                "<li>六</li>" +
                "</ul>";
            var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
            el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
            bindEvent();
            render();
        };
        var render = function() {
            var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
                stWeek = new Date(year, month, currentDay).getDay(), //当天是周几
                eleTemp = [],
                startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
                arr = [],
                kuayue = false,
                starday = startWeek;
            for (var i = currentDay - stWeek; i < 35 + currentDay - stWeek; i++) {
                var nowDate = i < starday + fullDay ? formartDate(year, month + 1, i + 1 - starday, "-") : formartDate(year, month + 2, i + 1 - (starday + fullDay), "-"),
                    addClass = "",
                    index = "";
                startWeek = i < startWeek + fullDay ? startWeek : startWeek + fullDay;
                selectedDate == nowDate && (addClass = "selected-style"); //选中日期
                if (formartDate(currentYear, currentMonth + 1, currentDay, '-') == nowDate) { //当天
                    addClass = 'today-flag';
                    selectedDate == nowDate && (addClass = "today-flag selected-style");
                    if (month + 1 != nowDate.split('-')[1]) {
                        selectedDate == nowDate && (addClass = "today-flag monthClass selected-style");
                    }
                }
                if (month + 1 != nowDate.split('-')[1]) { //跨月
                    kuayue = true;
                    addClass = "monthClass";
                    selectedDate == nowDate && (addClass = "monthClass selected-style");
                }
                if (isCurDate) {
                    for (let j = 0; j < saleData.length; j++) {
                        let unit = saleData[j].unit == "kg" ? saleData[j].unit : "cbm";
                        if (saleData[j].data == nowDate) {
                            if (i + 1 - starday >= currentDay) { //大于等于当天时间
                                eleTemp.push(
                                    '<li class="current-month" ><div data-date=' +
                                    nowDate +
                                    ' class="currentDate dayStyle ' +
                                    addClass +
                                    '"><span class="data">' +
                                    (i + 1 - startWeek) +
                                    '</span><div class="number">余' +
                                    '<span class="min-unit">' +
                                    saleData[j].count +
                                    "</span>" +
                                    '</div><div class="money">' +
                                    '¥<span class="count" data-par=' + saleData[j].par + '>' +
                                    saleData[j].money +
                                    "</span>/" +
                                    '<span class="unit">' +
                                    unit +
                                    "</span></div>" +
                                    '<span class="tag-box"></span><div class="click-box"></div>' +
                                    "</div></li>"
                                );
                                index = i;
                            }
                        }
                    }
                    if (i != index) {
                        eleTemp.push(
                            '<li class="noCurrent-month" ><div class="noCurrentDate dayStyle ' +
                            addClass +
                            '"><span>' +
                            (i + 1 - startWeek) +
                            "</span></div></li>"
                        );
                    }
                } else {
                    for (let j = 0; j < saleData.length; j++) {
                        if (saleData[j].data == nowDate) {
                            if (i + 1 - starday >= currentDay) { //大于等于当天时间
                                eleTemp.push(
                                    '<li class="current-month" ><span data-date=' +
                                    nowDate +
                                    ' class="currentDate dayStyle sp-data-color ' +
                                    addClass +
                                    '">' +
                                    (i + 1 - startWeek) +
                                    "</span></li>"
                                );
                                index = i;
                            }
                        }
                    }
                    if (i != index) {
                        eleTemp.push(
                            '<li class="noCurrent-month" ><span class="dayStyle ' + addClass + '">' +
                            (i + 1 - startWeek) +
                            "</span></li>"
                        );
                    }
                }
            }
            el.querySelector(".schedule-bd").innerHTML = eleTemp.join("");
            //跨月 显示下月月份
            el.querySelector(".monthClass").classList.add('first-monthClass');
            let nextYue = document.createElement("span"),
                kuayueHtml = el.querySelector(".first-monthClass").innerHTML;
            nextYue.setAttribute("class", "nextYue");
            nextYue.innerHTML = kuayueHtml == 1 ? (month + 2 + '月') : (month + 2 + '月1');
            el.querySelector(".monthClass").appendChild(nextYue);
            if (el.querySelector(".today-flag").querySelector('.data')) {
                el.querySelector(".today-flag").querySelector('.data').innerHTML = '今天';
            } else {
                el.querySelector(".today-flag").innerHTML = '今天';
            }
            // 添加标签
            if (document.querySelector("#sp-data-box")) {
                let array = document.querySelector("#sp-data-box").getElementsByClassName("currentDate");
                for (let index = 0; index < saleData.length; index++) {
                    for (let i = 0; i < array.length; i++) {
                        let newHot = document.createElement("span"),
                            newDuo = document.createElement("span"),
                            newShao = document.createElement("span");
                        newHot.setAttribute("class", "tag hot");
                        newHot.innerHTML = "热";
                        newShao.setAttribute("class", "tag");
                        newShao.innerHTML = "少";
                        newDuo.setAttribute("class", "tag more");
                        newDuo.innerHTML = "多";
                        if (array[i].getAttribute("data-date") == saleData[index].data) {
                            if (saleData[index].more) {
                                array[i].querySelector(".tag-box").appendChild(newDuo);
                            } else {
                                array[i].querySelector(".tag-box").appendChild(newShao);
                            }
                            if (saleData[index].hot) {
                                array[i].querySelector(".tag-box").appendChild(newHot);
                            }
                        }
                    }
                }
            }
        };
        init();
    }
    //将插件暴露给全局对象
    _global = (function() {
        return this || (0, eval)("this");
    })();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Schedule;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return Schedule;
        });
    } else {
        !("Schedule" in _global) && (_global.Schedule = Schedule);
    }
})()