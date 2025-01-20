const Rotation = {
    'Bounty': [
        "Data/maps/Bounty/canal_grande.csv",
        "Data/maps/Bounty/hideout.csv",
        "Data/maps/Bounty/shooting_star.csv",
        "Data/maps/Bounty/snake_praire.csv"
    ],
    'Brawlball': [
        "Data/maps/Brawlball/center_stage.csv",
        "Data/maps/Brawlball/pinball.csv",
        "Data/maps/Brawlball/sneaky_fields.csv",
        "Data/maps/Brawlball/triple_dribble.csv"
    ],
    'Gemgrab': [
        "Data/maps/Gemgrab/hard_rock.csv",
        "Data/maps/Gemgrab/last_stop.csv",
        "Data/maps/Gemgrab/swoosh.csv",
        "Data/maps/Gemgrab/undermine.csv"
    ],
    'Heist': [
        "Data/maps/Heist/bridge.csv",
        "Data/maps/Heist/hot_potato.csv",
        "Data/maps/Heist/kaboom_canyon.csv",
        "Data/maps/Heist/safe_zone.csv"
    ],
    'HotZone': [
        "Data/maps/HotZone/dueling_beetles.csv",
        "Data/maps/HotZone/open_business.csv",
        "Data/maps/HotZone/parallel_plays.csv",
        "Data/maps/HotZone/ring_of_fire.csv"
    ],
    'Knockout': [
        "Data/maps/Knockout/belles_rock.csv",
        "Data/maps/Knockout/flaring_phoenix.csv",
        "Data/maps/Knockout/goldarm_gulch.csv",
        "Data/maps/Knockout/out_in_the_open.csv"
    ]
}
const Mode = ['Bounty', 'Brawlball', 'Gemgrab', 'Heist', 'HotZone', 'Knockout'];
const bttns = document.querySelectorAll('.map');
const BrawlerChangeLog = document.getElementById('links'),
    EnemyBrawlerChangeLog = document.getElementById('enemyLinks'),
    firsteamPlacer = document.getElementById('frstpickedplace-team'),
    scndteamPlacer = document.getElementById('scndpickedplace-team'),
    WinChancePlacer = document.getElementById('winchance-place'),
    Reco = document.getElementById('reco-place'),
    RecoH3 = document.getElementById('recoh3'),
    UnReco = document.getElementById('unreco-place'),
    UnRecoH3 = document.getElementById('unrecoh3');
const picked = {
    map: [],
    banned: [],
    team: [],
    enemy: [],
    winrate1: [],
    winrate2: []
};
const brawlist = [];

function collectUniqueValues(arr) {
    console.log(arr);
    var countofValue = {};
    arr.forEach(row => {
        team = row.Team;
        team1 = row.tm1;
        team2 = row.tm2;
        Team = [team, team1, team2];

        for (i in Team) {
            if (countofValue[Team[i]] != undefined) {
                ++countofValue[Team[i]];
            } else {
                countofValue[Team[i]] = 1;
            }
        }
    });
    console.log(countofValue);
    return {
        pool: Object.keys(countofValue),
        count: countofValue,
    };
}

function FilterPicked(arr, obj) {
    return arr.reduce((accum, item) => {
        if (item.Team === obj || item.tm1 === obj || item.tm2 === obj) {
            accum.push(item);
        }
        return accum;
    }, []);
}

function FilterBanned(arr, obj) {
    return arr.reduce((accum, item) => {
        if (!(item.Team === obj || item.tm1 === obj || item.tm2 === obj)) {
            accum.push(item);
        }
        return accum;
    }, []);
}

function toDel(sortarr, todelete) {
    let i = 0;
    return sortarr.reduce((accum, item) => {
        i++;
        if (item[1] >= todelete) {
            accum.push(item[0]);
        } else if (todelete === 0 && i > 2){
            accum.push(item[0]);
        }
        return accum
    }, []);
}

function getFileUrl(key) {
    let saved = key;
    key = Math.round((key + 1) / 4 - 0.6);
    let mode = Mode[key];
    let map = (saved - key * 4);
    return Rotation[mode][map];
}

function addImages(a) {
    const indexes = [];
    a.forEach(arr => {
        const ArrFormed = arr.querySelectorAll('span > a');
        indexes.push(ArrFormed);
    })
    indexes.flat();
    console.log(indexes);


    indexes.forEach((index) => {
        for (let i = 0; i < (index.length); i++) {


            const item = index[i].textContent.toLowerCase().replace(/\s|\.|&/g, '_');
            const imageUrl = `https://media.brawltime.ninja/brawlers/${item}/avatar.png?size=160`;
            //const imageUrl = `./Data/brawlers/${item}.png`;
            //fetch(imageUrl)
            //    .then(resp => resp.blob())
            //    .then(blobobject => {
            //        const blob = window.URL.createObjectURL(blobobject);
            //        const anchor = document.createElement('a');
            //        anchor.style.display = 'none';
            //        anchor.href = blob;
            //        anchor.download = item;
            //        document.body.appendChild(anchor);
            //        anchor.click();
            //        window.URL.revokeObjectURL(blob);
            //        console.log(item + ' downloaded!');
            //    })
            //    .catch(() => console.log('An error in downloadin gthe file sorry'));

            if (item.indexOf('%') !== -1) {
                return 0;
            } else {
                index[i].insertAdjacentHTML('beforeend', `<img class="brawler-img" src="${imageUrl}">`);
            }


        }
    });
}

function createList(el, target, aug, conv) {
    if (!conv || conv == undefined) {

        console.log('pisya');
        console.log(el, target, conv);

        resetElement(el, target);
    } else if (conv || conv == undefined) {
        if (Array.isArray(el) && Array.isArray(target)) {

            console.log('pisyapopa');
            console.log(el, typeof target);

            if (el.length = target.length) {
                for (i in target) {
                    for (key in aug) {
                        el[i] = el[i].filter(brawler => brawler !== aug[key]);
                    }
                    console.log(el[i]);
                    resetElement(el[i], target[i]);
                }
            } else {
                return console.log(el, target + 'Ошибка с размером входных данных, не совпадает количество элементов и целей');
            }
        } else {
            el = collectUniqueValues(el).pool
            for (key in aug) {
                el = el.filter(brawler => brawler !== aug[key]);
            }
            console.log(el);
            console.log('kaki');

            resetElement(el, target);
        }
    }
}

function resetElement(element, target) {
    target.innerHTML = '';
    element.forEach((link) => {
        doElement(link, target)
    });
}

function doElement(text, target) {
    let li = document.createElement('span');
    li.innerHTML = `<a class="brawlerbtn">${text}</a>`;
    target.appendChild(li);
}

function compareWinRate(a, b) {
    if (parseFloat(a['Win Rate']) > parseFloat(b['Win Rate'])) {
        return -1;
    } else if (parseFloat(a['Win Rate']) < parseFloat(b['Win Rate'])) {
        return 1;
    }
    return 0;
}

function compareSmthng(a, b) {
    if (parseFloat(a[1]) > parseFloat(b[1])) {
        return -1;
    } else if (parseFloat(a[1]) < parseFloat(b[1])) {
        return 1;
    }
    return 0;
}

function comparePicks(a, b) {
    if (parseFloat(a['Picks Recorded']) > parseFloat(b['Picks Recorded'])) {
        return -1;
    } else if (parseFloat(a['Picks Recorded']) < parseFloat(b['Picks Recorded'])) {
        return 1;
    }
    return 0;
}

function saveStat(tm, Tm, i, targ) {
    if (picked[tm[0]][2] !== undefined && i[2] > 9) {
        let wr = 0;
        wr = Tm[0]['Win Rate'];
        picked[tm[1]].push(wr);
        resetElement(picked[tm[0]].concat((picked[tm[1]][0] * 100).toFixed(2) + '%'), targ);
    }
    else {
        resetElement(picked[tm[0]], targ);
    }
}

function createStats(pick, data, edata, i) {
    let map = pick.map[0].split("/").pop().split(".")[0],
        frstTm = data,
        scndTm = edata;

    WinChance = frstTm[0]['Win Rate'] * (1.001 - scndTm[0]['Win Rate']),
        theirWinChance = scndTm[0]['Win Rate'] * (1.001 - frstTm[0]['Win Rate']),
        winch = WinChance;
    saveStat(['team', 'winrate1'], frstTm, i, firsteamPlacer);
    saveStat(['enemy', 'winrate2'], scndTm, i, scndteamPlacer);

    if (picked.enemy[2] !== undefined) {
        resetElement([(winch * 100).toFixed(2) + '%'], WinChancePlacer);
    }
}

function calcReco(Tm, place, i) {
    TmRed = [];
    unTmRed = [];
    if (i < 6 || i === undefined) {
        x = 19;
        to = 100;
        todel = 4;
        untodel = 4;
    } else if (i > 5) {
        x = 9;
        to = 75;
        todel = 3;
        untodel = 3;
    } else if (i > 7) {
        x = 9;
        to = 75;
        todel = 0;
        untodel = 0;
    } else if (i > 8) {
        x = 0;
        to = 150;
        todel = 0;
        untodel = 0;
    }
    console.log(Tm);
    
    Tm.forEach((row) => {
        if (row['Picks Recorded'] > x && row['Win Rate'] > 0.6) {
            TmRed.push(row);
        }
    })
   
    Tm.forEach((row) => {
        if (row['Picks Recorded'] > x && (row['Win Rate'] > 0.2 && row['Win Rate'] < 0.5)) {
            unTmRed.push(row);
        }
    })
    console.log(TmRed, unTmRed, 'first');
    unTmRed = unTmRed.sort(compareWinRate).slice(-80);
    TmRed = TmRed.slice(0, to).sort(compareWinRate).sort(comparePicks);
    console.log(TmRed, unTmRed, 'second');
    
    TmRed = Object.entries(collectUniqueValues(TmRed).count).sort(compareSmthng);
    unTmRed = Object.entries(collectUniqueValues(unTmRed).count).sort(compareSmthng);
    console.log(TmRed, unTmRed);
    let tr = [],
        utr = [];
    if(i < 10 || i === undefined) {
        tr = toDel(TmRed, todel);
        utr = toDel(unTmRed, untodel);
        console.log(TmRed, unTmRed);

    } else if(i > 9) {
        TmRed.forEach(it => {
            tr.push(it[0]);
        });
        unTmRed.forEach(it => {
            utr.push(it[0]);
        });
    }
    
    TmRed = tr.slice(0, 6);
    unTmRed = utr.slice(-5);
    
    const Reco = [TmRed, unTmRed];
    console.log(Reco, 'eeeeepepe', i)
    if (i < 6 || i === undefined) {
        createList(Reco[0], place[0], brawlist, false);
    } else if (i > 5){
        createList(Reco, place, brawlist, true);
    } 
    for (key in Reco) {
        Reco[key].length === 0;
    }
}

function brawlerPicked(data, unit, i, enemyData) {

    if (i[0] < 6) {
        data = FilterBanned(data, unit);

        if (picked.banned[5] !== undefined) {
            enemyData = FilterPicked(enemyData, unit);
            picked.enemy.push(unit);


        } else if (picked.banned[5] === undefined) {
            enemyData = FilterBanned(enemyData, unit);
            picked.banned.push(unit);

        }
        i[0]++;


    } else if (i[0] > 5 && i[1] === true) {
        data = FilterPicked(data, unit)
        enemyData = FilterBanned(enemyData, unit)
        picked.team.push(unit);

        if (i[2] < 8) {
            i[0] = 4;

        }
        if (data[1] === undefined) {
            i[0] = 5;

        }
    }

    brawlist.push(unit);
    createList(data, BrawlerChangeLog, brawlist, true);
    if (i[2] > 4) {
        createList(enemyData, EnemyBrawlerChangeLog, brawlist, true);
    }

    createStats(picked, data, enemyData, i);

    i[2]++;

    if ((i[2] > 6 && i[2] < 9) || i[2] > 10) {
        RecoH3.innerHTML = 'Second team best brawlers';
        calcReco(enemyData, [Reco, UnReco], i[2]);
    } else if (i[2] < 6) {
        RecoH3.innerHTML = 'Best to ban';
        calcReco(data, [Reco, UnReco], i[2]);
    } else {
        RecoH3.innerHTML = 'First team best brawlers';
        calcReco(data, [Reco, UnReco], i[2]);
    }
    addImages([BrawlerChangeLog, EnemyBrawlerChangeLog, firsteamPlacer, scndteamPlacer, Reco, UnReco]);
    if (i[2] > 12) {
        return;
    }
    document.querySelectorAll('.brawlerbtn').forEach((e) => {
        e.addEventListener('click', () => brawlerPicked(data, e.textContent, i, enemyData));
    });
}

function getFile(i) {
    let fileUrl = getFileUrl(i);
    picked.map.push(fileUrl);
    Papa.parse(fileUrl, {
        download: true,
        header: true,
        skipEmptyLines: 'greedy',
        complete: function (result) {
            data = result.data;
            brawlist.length = 0;
            for (let key in picked) {
                if (key !== 'map') {
                    picked[key].length = 0;
                }
            }
            let iter = [0, true, 0];
            let enemyData = data;
            createList(data, BrawlerChangeLog, brawlist, true);
            RecoH3.innerHTML = 'Best to ban';
            calcReco(data, [Reco, UnReco], i[2]);
            addImages([BrawlerChangeLog, EnemyBrawlerChangeLog, firsteamPlacer, scndteamPlacer, Reco, UnReco]);

            return document.querySelectorAll('.brawlerbtn').forEach((e) => {
                return e.addEventListener('click', () => brawlerPicked(data, e.textContent, iter, enemyData));
            });
        }
    })
}

bttns.forEach((e, i) => {
    e.addEventListener('click', () => getFile(i))
});