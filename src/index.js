/**
 * 简单的手机有效性判断
 *
 * DATE: 2014.10.27
 */
(function ($, config) {
    var domSelect = "#" + (config['select'] || "mobile_area"),
        domPrefix = "#" + (config['prefix'] || "mobile_prefix"),
        domNumber = "#" + (config['number'] || "mobile_number"),
        RULE = config['rule'] || [
            {
                name   : "Mainland China",
                code   : 86,
                pattern: "^(86){0,1}1\\d{10}$",
                i18n   : {
                    zhCN: "中国大陆"
                }
            },
            {
                name   : "Hong Kong",
                code   : 852,
                pattern: "^(00){0,1}(852){1}0{0,1}[1,5,6,9](?:\\d{7}|\\d{8}|\\d{12})$",
                i18n   : {
                    zhCN: "香港"
                }
            },
            {
                name   : "Macau",
                code   : 853,
                pattern: "^(00){0,1}(853){1}6\\d{7}$",
                i18n   : {
                    zhCN: "澳门"
                }
            },
            {
                name   : "Chinese Taibei",
                code   : 886,
                pattern: "^(00){0,1}(886){1}0{0,1}[6,7,9](?:\\d{7}|\\d{8}|\\d{10})$",
                i18n   : {
                    zhCN: "台湾"
                }
            },
            {
                name   : "Korea",
                code   : 82,
                pattern: "^(00){0,1}(82){1}0{0,1}[7,1](?:\\d{8}|\\d{9})$",
                i18n   : {
                    zhCN: "韩国"
                }
            },
            {
                name   : "Japan",
                code   : 81,
                pattern: "^(00){0,1}(81){1}0{0,1}[7,8,9](?:\\d{8}|\\d{9})$",
                i18n   : {
                    zhCN: "日本"
                }
            },
            {
                name   : "America",
                code   : 1,
                pattern: "^(00){0,1}(1){1}\\d{10,12}$",
                i18n   : {
                    zhCN: "美国"
                }
            },
            {
                name   : "Canada",
                code   : 1,
                pattern: "^(00){0,1}(1){1}\\d{10}$",
                i18n   : {
                    zhCN: "加拿大"
                }
            },
            {
                name   : "UK",
                code   : 44,
                pattern: "^(00){0,1}(44){1}[347-9](\\d{8,9}|\\d{11,12})$",
                i18n   : {
                    zhCN: "英国"
                }
            },
            {
                name   : "Australia",
                code   : 61,
                pattern: "^(00){0,1}(61){1}4\\d{8,9}$",
                i18n   : {
                    zhCN: "澳大利亚"
                }
            },
            {
                name   : "Singapore",
                code   : 65,
                pattern: "^(00){0,1}(65){1}[13689]\\d{6,7}$",
                i18n   : {
                    zhCN: "新加坡"
                }
            },
            {
                name   : "Malaysia",
                code   : 60,
                pattern: "^(00){0,1}(60){1}1\\d{8}$",
                i18n   : {
                    zhCN: "马来西亚"
                }
            },
            {
                name   : "Thailand",
                code   : 66,
                pattern: "^(00){0,1}(66){1}[13456789]\\d{7,8}$",
                i18n   : {
                    zhCN: "泰国"
                }
            },
            {
                name   : "Vietnam",
                code   : 84,
                pattern: "^(00){0,1}(84){1}[1-9]\\d{6,9}$",
                i18n   : {
                    zhCN: "越南"
                }
            },
            {
                name   : "Philippines",
                code   : 63,
                pattern: "^(00){0,1}(63){1}[24579](\\d{7,9}|\\d{12})$",
                i18n   : {
                    zhCN: "菲律宾"
                }
            },
            {
                name   : "Indonesia",
                code   : 62,
                pattern: "^(00){0,1}(62){1}[2-9]\\d{7,11}$",
                i18n   : {
                    zhCN: "印度尼西亚"
                }
            },
            {
                name   : "Germany",
                code   : 49,
                pattern: "^(00){0,1}(49){1}1(\\d{5,6}|\\d{9,12})$",
                i18n   : {
                    zhCN: "德国"
                }
            },
            {
                name   : "Italy",
                code   : 39,
                pattern: "^(00){0,1}(39){1}[37]\\d{8,11}$",
                i18n   : {
                    zhCN: "意大利"
                }
            },
            {
                name   : "French",
                code   : 33,
                pattern: "^(00){0,1}(33){1}[168](\\d{5}|\\d{7,8})$",
                i18n   : {
                    zhCN: "法国"
                }
            },
            {
                name   : "Russia",
                code   : 7,
                pattern: "^(00){0,1}(7){1}[13489]\\d{9,11}$",
                i18n   : {
                    zhCN: "俄罗斯"
                }
            },
            {
                name   : "New Zealand",
                code   : 64,
                pattern: "^(00){0,1}(64){1}[278]\\d{7,9}$",
                i18n   : {
                    zhCN: "新西兰"
                }
            },
            {
                name   : "Netherlands",
                code   : 31,
                pattern: "^(00){0,1}(31){1}6\\d{8}$",
                i18n   : {
                    zhCN: "荷兰"
                }
            },
            {
                name   : "Sweden",
                code   : 46,
                pattern: "^(00){0,1}(46){1}[124-7](\\d{8}|\\d{10}|\\d{12})$",
                i18n   : {
                    zhCN: "瑞典"
                }
            },
            {
                name   : "Ukraine",
                code   : 380,
                pattern: "^(00){0,1}(380){1}[3-79]\\d{8,9}$",
                i18n   : {
                    zhCN: "乌克兰"
                }
            }
        ];


    /**
     * 模板转换函数
     * @param tpl
     * @param data
     * @returns {string|void}
     */
    function render(tpl, data) {
        if (!tpl) {
            throw "TPL IS INVALID.";
        }
        if (!data) {
            throw "DATA IS INVALID.";
        }
        return tpl.replace(/\{%(.+?)%\}/g, function (full, key) {
            if (key.indexOf('.') > -1) {
                var arr = key.split('.');
                if (arr[0]) {
                    var s = data;
                    for (var i = 0, j = arr.length; i < j; i++) {
                        if (s && (arr[i] in s)) {
                            s = s[arr[i]];
                        } else {
                            throw "DATA PROPERTY IS INVALID.";
                        }
                    }
                    return s ? s : "";
                } else {
                    throw "DATA IS INVALID.";
                }
            } else {
                return key in data ? data[key] : "";
            }
        })
    }


    /**
     * 渲染options模板
     * @returns {string}
     */
    function renderOptions() {
        var html = '',
            tpl = '<option id="{%name%}" value="{%code%}" data-rule="{%pattern%}">{%i18n.zhCN%}</option>';

        for (var i = 0; i < RULE.length; i++) {
            html += render(tpl, RULE[i]);
        }
        return html;
    }


    /**
     * 根据区域码获取规则
     * @param code
     * @returns {*}
     */
    function getRule(code) {
        for (var i = 0, j = RULE.length; i < j; i++) {
            if (RULE[i]['code'] === code) {
                return RULE[i]['pattern']
            }
        }
    }


    /**
     * 获取号码判断是否正确
     * @param content
     * @param rule
     * @returns {boolean}
     */
    function getResult(content, rule) {
        return new RegExp(rule).test(content);
    }


    /**
     * 暂时对错信息
     * @param err
     */
    function showResult(err) {
        if (err) {
            $('i.iconfont').html('&#xf00a5;');
        } else {
            $('i.iconfont').html('&#xe626;');
        }
    }


    /**
     * 事件处理
     */
    $(function () {
        var select = $(domSelect),
            prefix = $(domPrefix),
            number = $(domNumber);

        select
            .html(renderOptions())
            .on('change', function () {
                var code = parseInt($(this).val(), 10);
                if (typeof code === "number") {
                    prefix.attr('disabled', false).val('+' + code).attr('disabled', true);
                    number.attr('data-rule', getRule(code));
                } else {
                    throw "SELECT ERROR AREA.";
                }
            })
            .trigger('change');

        number
            .on('blur', function () {
                return showResult(!getResult(prefix.val().replace('+', '') + $(this).val(), $(this).data('rule')));
            })
            .on('keyup', function () {
                return showResult(!getResult(prefix.val().replace('+', '') + $(this).val(), $(this).data('rule')));
            });
    });

})(jQuery, {"select": "mobile_area", "prefix": "mobile_prefix", "number": "mobile_number"});
