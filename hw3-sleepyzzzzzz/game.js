'use strict';

let info = $("#info");
let manualpage = $("#manualpage");
let board = $("#board");
let scorehistory = $("#scorehistory");
let failboard = $("#fail");
let pages = [info, manualpage, board, scorehistory, failboard];

let listscores = $("#scorelist");
let rotateboard = $("#rotate");
let inballs = $("#inballs");
let scorepauselist = [];
let level = 1;
let speed = 50;
let ninballs = 10;
let background = "";
let intervalID;
let deg = 0;
let udeg = [];
let score = 0;
let npause = 0;
let pass = false;
let fail = false;
let pause = false;
let clockwise = 1;

$("#start").click(function() {
    displaypage(board);
    start();
});

$("#manual").click(function() {
    displaypage(manualpage);
});

$("#statistic").click(function() {
    displaypage(scorehistory);
    displayscores();
});

$("#statistic1").click(function() {
    displaypage(scorehistory);
    displayscores();
});

$("#main").click(function() {
    displaypage(info);
    reset();
});

$("#back").click(function() {
    displaypage(info);
    reset();
});

$("#back1").click(function() {
    displaypage(info);
    reset();
})

$("#restart").click(function() {
    displaypage(board);
    start();
});

$("#restart1").click(function() {
    displaypage(board);
    start();
});

$("#clickarea").click(function() {
    if (!fail && !pause) {
        stick();
        record(score, npause);
        setTimeout(function() {
            pass = passlevel();
        }, 300);
    }
});

$("#pause").click(function() {
    if ($("#pause").html() == "PAUSE") {
        if (intervalID != null) {
            clearInterval(intervalID);
        }
        $("#pause").html("RESUME");
        pause = true;
        npause += 1;
        $("#pausenum").html(npause);
        record(score, npause);
    } else if ($("#pause").html() == "RESUME") {
        $("#pause").html("PAUSE");
        pause = false;
        boardrotate();
    }

});

function setupboard() {
    $("#number").html(level);
    $("#score").html(score);
    $("#pausenum").html(npause);
    background = changecolor();
    board.css("background", background);
    var circle = $("<div id='circle'></div>");
    rotateboard.append(circle);
    for (var i = 0; i < 360; i += 72) {
        var line = $("<div class='line'></div>");
        var ball = $("<div class='ball'></div>");
        var degs = Math.floor(Math.random() * 55 + i + 15);
        line.css("transform", "rotate(" + degs + "deg)");
        line.append(ball);
        rotateboard.append(line);
        for (var j = -8; j < 9; j++) {
            udeg.push(degs + j);
        }
    }
    createinballs(ninballs);
}

function boardrotate() {
    if (intervalID != null) {
        clearInterval(intervalID);
    }
    intervalID = setInterval(function() {
        if (deg > 360) {
            deg = -1;
        } else if (deg < 0) {
            deg = 361
        }
        deg += 1 * clockwise;
        rotateboard.css("transform", "rotate(" + deg + "deg)");
    }, speed);
}

function createinballs(num) {
    var top = 10;
    for (var i = 0; i < num; i++) {
        var n = ninballs - 1 - i;
        var ballin = $("<div class='ballin' id='" + n + "'></div>");
        var nball = $("<span class='nball'>" + n + "</span>");
        ballin.css("margin-top", top + (i * 36) + "px");
        ballin.append(nball);
        inballs.append(ballin);
    }
}

function stick() {
    var nballs = $("#inballs").children(".ballin").length;
    if (!fail) {
        var cur_deg = 180 - deg;
        if (cur_deg < 0) {
            cur_deg += 360;
        }
        if (!udeg.includes(cur_deg)) {
            hitwheel(cur_deg);
            for (var i = -8; i < 9; i++) {
                udeg.push(cur_deg + i);
            }
            score += 1;
            $("#score").html(score);
        } else {
            fail = true;
            clearInterval(intervalID);
            setTimeout(function() {
                faillevel();
            }, 300);
            hitwheel(cur_deg);
            scorepauselist.push([score, npause]);
        }
    }
}

function passlevel() {
    var nballs = $("#inballs").children(".ballin").length;
    if (nballs == 0) {
        nextlevel();
        return true;
    } else {
        return false;
    }
}

function nextlevel() {
    level += 1;
    pass = false;
    fail = false;
    rotateboard.empty();
    inballs.empty();
    udeg = [];
    clockwise = 1;
    if (level % 2 == 0) {
        changeninballs();
        setupboard();
        if (level % 3 == 0) {
            clockwise = -1;
        }
    } else if (level % 3 == 0) {
    	clockwise = -1;
        setupboard();
    } else {
        speed -= 10;
        setupboard();
        changespeed(speed);
    }
    changecolor();
}

function faillevel() {
    reset();
    displaypage(failboard);
}

function reset() {
    if (intervalID != null) {
        clearInterval(intervalID);
    }
    pass = false;
    fail = false;
    level = 1;
    deg = 0;
    speed = 50;
    ninballs = 10;
    udeg = [];
    score = 0;
    npause = 0;
    clockwise = 1;
    rotateboard.empty();
    inballs.empty();
}

function start() {
    reset();
    setupboard();
    boardrotate();
}

function hitwheel(cur_deg) {
    var nballs = $("#inballs").children(".ballin").length;
    var ballins = $("#inballs").children(".ballin").eq(0);
    var newball = $("<div class='ball'></div>");
    newball.html(ballins.html());
    var newline = $("<div class='line'></div>");
    newline.css("transform", "rotate(" + cur_deg + "deg)");
    newline.append(newball);
    rotateboard.append(newline);
    ballins.remove();
    for (var i = 0; i < nballs - 1; i++) {
        var nextballins = $("#inballs").children(".ballin").eq(i);
        nextballins.animate({ "top": "-=36px" });
    }
}

function changeninballs() {
    ninballs += 2;
}

function changespeed(newspeed) {
    if (intervalID != null) {
        clearInterval(intervalID);
    }
    if (newspeed < 5) {
        newspeed = 5;
    }
    boardrotate();
}

function changecolor() {
    var r = parseInt(Math.random() * 257).toString(16);
    var g = parseInt(Math.random() * 257).toString(16);
    var b = parseInt(Math.random() * 257).toString(16);
    var color = "#" + r + g + b;
    return color;
}

function displayscores() {
    listscores.empty();
    removeduplist();
    sortlist(scorepauselist);
    var tr = $("<tr></tr>");
    var th1 = $("<th>RANK</th>");
    var th2 = $("<th>BEST SCORE</th>");
    var th3 = $("<th>#PAUSE</th>");
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    listscores.append(tr);
    for (var i = 0; i < scorepauselist.length; i++) {
    	if (i == 20) {
    		break;
    	}
        var n = i + 1;
        var tr = $("<tr></tr>");
        var td1 = $("<td>" + n + "</td>");
        var td2 = $("<td>" + scorepauselist[i][0] + "</td>");
        var td3 = $("<td>" + scorepauselist[i][1] + "</td>");
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        if (i == 0) {
        	td1.css("color", "#FF0000");
        	td2.css("color", "#FF0000");
        	td3.css("color", "#FF0000");
        }
        else {
        	td1.css("color", "#5500DD");
        	td2.css("color", "#5500DD");
        	td3.css("color", "#5500DD");
        }
        listscores.append(tr);
    }
}

function sortlist(list) {
    list = list.sort(function(m, n) {
        if (m[0] == n[0]) {
            return m[1] - n[1];
        } else {
            return n[0] - m[0];
        }
    });
}

function removeduplist() {
    let tmp = scorepauselist;
    let tmp1 = []
    scorepauselist = [];
    tmp.forEach(function(element) {
        element = element.toString();
        if (!tmp1.includes(element)) {
            tmp1.push(element);
        }
    });
    tmp1.forEach(function(element) {
        var tmp2 = element.split(",");
        scorepauselist.push([parseInt(tmp2[0]), parseInt(tmp2[1])]);
    });
}

function displaypage(page) {
    var idx = pages.indexOf(page);
    for (var i = 0; i < pages.length; i++) {
        if (i == idx) {
            pages[i].show();
        } else {
            pages[i].hide();
        }
    }
}

function record(score, npause) {
    if (window.localStorage) {
        var best_score = parseInt(localStorage.getItem("best_score"));
        var pause_number = parseInt(localStorage.getItem("pause_number"));
        var levelno = parseInt(localStorage.getItem("level"));
        if (isNaN(best_score)) {
        	best_score = 0;
        }
        else if (isNaN(pause_number)) {
        	pause_number = 0;
        }
        else if (isNaN(levelno)) {
        	levelno = 1;
        }
        var best_score_pause = [best_score, pause_number, levelno];
        var comparelist = [];
        if (scorepauselist.length > 0) {
            sortlist(scorepauselist);
            let cur_best_score_pause = scorepauselist[0];
            cur_best_score_pause.push(level);
            comparelist = [best_score_pause, cur_best_score_pause];
        } else {
            let cur_best_score_pause = [score, npause, level];
            comparelist = [best_score_pause, cur_best_score_pause];
        }
        sortlist(comparelist);
        best_score = comparelist[0][0];
        pause_number = comparelist[0][1];
        levelno = comparelist[0][2];
        localStorage.setItem("best_score", best_score);
        localStorage.setItem("pause_number", pause_number);
        localStorage.setItem("level", levelno);
    } else {
        window.alert("No localStorage support!");
    }
}