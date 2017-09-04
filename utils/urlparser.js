function Urlparser(href) {
    this.href = href;

    this._split = function() {
        return this.href.split('/');
    };

    this.isTrakt = function() {
        return this.href.includes('trakt.tv');
    };

    this.hasDotExtension = function() {
        var split = this._split();
        return split[split.length - 1].includes('.');
    }
}

module.exports = Urlparser;