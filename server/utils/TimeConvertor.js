class TimeConvertor {

    millisToMinAndSec(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' min.';
    }

    millisToSec(millis) {
        // toFixed(3) вернет 0.300; toFixed(1) вернет 0.3
        var seconds = (millis / 1000).toFixed(3);
        return seconds + ' sec.';
    }

}

module.exports = new TimeConvertor()