const request = require('../data');

exports.getScores = async title => {
  const refinedtitle = refineTitleForUrl(title);

  if (!refinedtitle) {
    throw new Error(`Invalid or unknown title ${title} was provided`);
  }

  const url = `https://www.rottentomatoes.com/m/${refinedtitle}`;

  try {
    const html = await request.getParsedHtml(url);

    const panel = html('#scorePanel');

    const [
      criticsScore,
      criticsAverage,
      criticsCount,
      criticsFreshCount,
      criticsRottenCount,
      topCriticsScore,
      topCriticsAverage,
      topCriticsCount,
      topCriticsFreshCount,
      topCriticsRottenCount,
      audienceScore,
      audienceAverage,
      audienceCount
    ] = panel
      .find('.meter-value, #scoreStats div, .audience-info div')
      .map(function () {
        return html(this).text().replace(/[^\d.%/]/g, '');
      }).get();

    return {
      critics: {
        score: criticsScore,
        average: criticsAverage,
        count: criticsCount,
        freshCount: criticsFreshCount,
        rottenCount: criticsRottenCount
      },
      topCritics: {
        score: topCriticsScore,
        average: topCriticsAverage,
        count: topCriticsCount,
        freshCount: topCriticsFreshCount,
        rottenCount: topCriticsRottenCount
      },
      audience: {
        score: audienceScore,
        average: audienceAverage,
        count: audienceCount
      }
    };
  } catch (e) {
    throw new Error(`No scores found for movie: ${title}`);
  }
};

function refineTitleForUrl(title) {
  if (!title || typeof title !== 'string') {
    return null;
  }

  return title.toLowerCase().split(/[\s:]+/).join('_');
}
