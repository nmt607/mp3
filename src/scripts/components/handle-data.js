const songsAPI = 'http://localhost:3000/songs'
const header = $('.header--js')
const songName = $('.header__top-desc--js')
const cd = $('.header__body-cd-thumb--js')
const btnPlay = $('.header__bottom-control-item-play--js')
const progressBar = $('.header__bottom-progress--js')
const progressItem = $('.header__bottom-progress-item--js')
const btnNext = $('.header__bottom-control-item-next--js')
const btnPrev = $('.header__bottom-control-item-prev--js')
const btnRepeat = $('.header__bottom-control-item-repeat--js')
const bntRandom = $('.header__bottom-control-item-random--js')
const audio = $("#audio")
const wrapSongs = $('.media-songs__list--js')
const cdthumbRotate = document.querySelector('.header__body-cd-thumb--js').animate([
    { transform: 'rotate(360deg)' }
], {
    duration: 10000,
    iterations: Infinity,
})
let isPlaying = false
let isRandom = false
let isRepeat = false
function setConfig(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
$(document).ready(function () {
    $("html, body").animate({ scrollTop: 0 }, 100);
});
function start() {
    getSongs(musicFunction)
}
start()

// music function
function musicFunction(songs) {
    renderSongList(songs)
    loadFirstSong(songs)
    selectSong(songs)
    nextSong(songs)
    prevSong(songs)
    randomSong()
    repeatSong()

}


// audio event
audio.on('play', function () {
    isPlaying = true
    btnPlay.addClass('playing')
    cdthumbRotate.play()
})
audio.on('pause', function () {
    isPlaying = false
    btnPlay.removeClass('playing')
    cdthumbRotate.pause()
})
audio.on('timeupdate', function () {
    if (isPlaying) {
        let currentProgress = audio[0].currentTime / audio[0].duration
        progressItem.attr('aria-valuenow', currentProgress)
        progressItem.css('width', `${currentProgress * 100}%`)
    }
})
audio.on('ended', function () {
    if (isRepeat) {
        audio[0].play()
    } else {
        btnNext.trigger('click')
    }
})
// loading
function loadFirstSong(songs) {
    const fistSong = songs[0]
    songName.html(fistSong.name)
    cd.css('background-image', `url(${fistSong.image})`)
    audio.attr('src', fistSong.path)
}

function loadSong(songs, id) {
    const selectedSong = songs.find((item) => {
        return item.id == id
    })
    songName.html(selectedSong.name)
    cd.css('background-image', 'url(' + selectedSong.image + ')')
    audio.attr('src', selectedSong.path)
}

// rendering
function renderSongList(songs) {
    var htmls = []
    htmls = songs.map((item, index) => {
        if (index == 0) {
            return `<li class="media-songs__item media media-songs__item--js mb-4 active" data-id="${item.id}">
                    <img class="media-songs__item-img" src="${item.image}" onerror="this.onerror=null; this.src='./assets/img/default-img-song.jpg'" class="mr-3"
                        alt="img-${item.id}">
                    <div class="media-songs__item-body media-body">
                        <h5 class="media-songs__item-title mt-0 mb-1">${item.name}</h5>
                        <p class="media-songs__item-author">
                            ${item.singer}
                        </p>
                    </div>
                    <div class="media-songs__item-option">
                        <i class="fa fa-ellipsis-h"></i>
                    </div>
                </li>`
        }
        return `<li class="media-songs__item media-songs__item--js media mb-4" data-id="${item.id}">
                    <img class="media-songs__item-img" src="${item.image}" onerror="this.onerror=null; this.src='./assets/img/default-img-song.jpg'" class="mr-3"
                        alt="img-${item.id}">
                    <div class="media-songs__item-body media-body">
                        <h5 class="media-songs__item-title mt-0 mb-1">${item.name}</h5>
                        <p class="media-songs__item-author">
                            ${item.singer}
                        </p>
                    </div>
                    <div class="media-songs__item-option">
                        <i class="fa fa-ellipsis-h"></i>
                    </div>
                </li>`
    })
    wrapSongs.html(htmls.join(""))
}

// selecting
function selectSong(songs) {
    const songItem = $('.media-songs__item--js')
    songItem.each((index, item) => {
        $(item).on('click', function (e) {
            if ($(e.target).parent().hasClass('media-songs__item-option')) {
                alert('Chưa thêm chức năng')
            } else {
                //change active
                songItem.each((index, item) => {
                    $(item).removeClass('active')
                })
                $(this).addClass('active')
                // render selected song
                const id = $(this).attr('data-id')
                loadSong(songs, id)
                //autoplay after selected
                if (isPlaying) {
                    audio[0].play()
                } else {
                    audio[0].play()
                    isPlaying = true
                    btnPlay.addClass('playing')
                }
                // reset cdthumb
                cdthumbRotate.currentTime = 0
            }
        })
    })
}

// play
btnPlay.on('click', function () {
    if (isPlaying) {
        audio[0].pause()
    } else {
        audio[0].play()
    }
})

// seek
progressBar.on('click', function (e) {
    // change width progress item when click
    const progressPositon = progressBar.offset().left
    const positonClick = e.clientX - progressPositon
    progressItem.attr('aria-valuenow', positonClick / progressBar.width() * 100)
    progressItem.css('width', `${positonClick / progressBar.width() * 100}%`)
    // change current time and update time
    const seekTime = Math.floor(progressItem.attr('aria-valuenow') / 100 * audio[0].duration)
    audio[0].currentTime = seekTime
    // autoplay after seek
    if (isPlaying) {
        audio[0].play()
    } else {
        audio[0].play()
        isPlaying = true
        btnPlay.addClass('playing')
    }
})

//next and previouse
function nextSong(songs) {
    const songItem = $('.media-songs__item--js')
    btnNext.on('click', function () {
        const songPlayingID = $('.media-songs__item--js.active').attr('data-id')
        if (isRandom) {
            let idRadom = ''
            do {
                idRadom = Math.floor(Math.random() * songs.length)
            } while (idRadom == songPlayingID)

            loadSong(songs, idRadom)
            songItem.each((index, item) => {
                $(item).removeClass('active')
                $(`.media-songs__item--js[data-id="${idRadom}"`).addClass('active')
            })
            audio[0].play()
        } else {
            const songNextID = Number(songPlayingID == songs.length - 1 ? -1 : songPlayingID) + 1
            loadSong(songs, songNextID)
            songItem.each((index, item) => {
                $(item).removeClass('active')
                $(`.media-songs__item--js[data-id="${songNextID}"`).addClass('active')
            })
            audio[0].play()
        }
        scrollToActiveSong()
    })
}
function prevSong(songs) {
    const songItem = $('.media-songs__item--js')
    btnPrev.on('click', function () {
        const songPlayingID = $('.media-songs__item--js.active').attr('data-id')
        if (isRandom) {
            let idRadom = ''
            do {
                idRadom = Math.floor(Math.random() * songs.length)
            } while (idRadom == songPlayingID)

            loadSong(songs, idRadom)
            songItem.each((index, item) => {
                $(item).removeClass('active')
                $(`.media-songs__item--js[data-id="${idRadom}"`).addClass('active')
            })
            audio[0].play()
        } else {
            const songPrevID = Number(songPlayingID == 0 ? songs.length : songPlayingID) - 1
            loadSong(songs, songPrevID)
            songItem.each((index, item) => {
                $(item).removeClass('active')
                $(`.media-songs__item--js[data-id="${songPrevID}"`).addClass('active')
            })
            audio[0].play()
        }
        scrollToActiveSong()
    })
}

// random
function randomSong() {
    isRandomStorage = localStorage.getItem('isRandom')
    if (isRandomStorage != null) {
        isRandom = (isRandomStorage == 'true')
    }
    bntRandom.toggleClass('active', isRandom)
    bntRandom.on('click', function () {
        isRandom = !isRandom
        bntRandom.toggleClass('active', isRandom)
        setConfig('isRandom', isRandom)
    })
}

// repeat
function repeatSong() {
    isRepeatStorage = localStorage.getItem('isRepeat')
    if (isRepeatStorage != null) {
        isRepeat = (isRepeatStorage == 'true')
    }
    btnRepeat.toggleClass('active', isRepeat)
    btnRepeat.on('click', function () {

        isRepeat = !isRepeat
        btnRepeat.toggleClass('active', isRepeat)
        setConfig('isRepeat', isRepeat)
    })
}

// scroll to active song
function scrollToActiveSong() {
    const changeSong = $('.media-songs__item--js.active')
    const bottomVal = $(window).height()
    const topVal = header.outerHeight()
    const songPosition = changeSong.offset().top + changeSong.outerHeight(true)
    const songViewPosition = changeSong.offset().top - $(window).scrollTop()

    if (songPosition > bottomVal) {
        $(window).scrollTop(songPosition - bottomVal)
    } else if (songViewPosition < topVal) {
        $(window).scrollTop(topVal - songViewPosition)
    }
}
// function call API and send request
function getSongs(callback) {
    fetch(songsAPI)
        .then((res) => {
            return res.json()
        })
        .then(callback)
}

function getSongById(id, callback) {
    fetch(songsAPI + "/" + id)
        .then((res) => {
            return res.json()
        })
        .then(callback)
}

// animate
cdthumbRotate.pause()



