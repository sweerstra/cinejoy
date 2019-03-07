const request = require('../data');

exports.getScores = async title => {
  const refinedtitle = refineTitleForUrl(title);

  if (!refinedtitle) {
    throw new Error(`Invalid or unknown title ${title} was provided`);
  }

  const url = `https://www.rottentomatoes.com/m/${refinedtitle}`;

  console.log(url);

  try {
    const html = await request.getParsedHtml(url);

    const panel = html('#js-tomatometer-overlay');

    console.log(panel.html());

    const [
      criticsAverage,
      criticsCount,
      criticsFreshCount,
      criticsRottenCount,
      audienceAverage,
    ] = panel
      .find('.mop-ratings-wrap__score-details span[id]')
      .map(function () {
        console.log(html(this).html());
        return html(this).text().trim();
      }).get();

    const criticsScore = panel.find('#js-popover-tomatometer-score').text().trim();
    const audienceScore = panel.find('.mop-ratings-wrap__percentage--audience').text().trim();

    const audienceCount = panel.find('.mop-ratings-wrap__review-totals small').next().text().trim();

    return {
      critics: {
        score: criticsScore,
        average: criticsAverage,
        count: criticsCount,
        freshCount: criticsFreshCount,
        rottenCount: criticsRottenCount
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
