const { assert } = require('chai');
const { refineTitle } = require('../utils/movie');

it('Should handle other types with empty string', () => {
  assert.equal(refineTitle(null), '');
  assert.equal(refineTitle(undefined), '');
  assert.equal(refineTitle(''), '');
});

it('Should fix notations at the end of title with abbreviations', () => {
  assert.equal(refineTitle('De Lego Film 2 (Nederlandse versie)'), 'De Lego Film 2 (NL)');
  assert.equal(refineTitle('De Lego Film 2 (NEDERLANDSE VERSIE)'), 'De Lego Film 2 (NL)');
  assert.equal(refineTitle('The Lego Movie 2 (Originele versie)'), 'The Lego Movie 2 (OV)');
  assert.equal(refineTitle('The Lego Movie 2 (ORIGINELE VERSIE)'), 'The Lego Movie 2 (OV)');
  assert.equal(refineTitle('Dragon Ball Super: Broly (Engels)'), 'Dragon Ball Super: Broly (OV)');
  assert.equal(refineTitle('Dragon Ball Super: Broly (ENGELS)'), 'Dragon Ball Super: Broly (OV)');
});

it('Should fix notations in front of title with abbreviations', () => {
  assert.equal(refineTitle('Oscar Night: The Favourite'), 'The Favourite');
  assert.equal(refineTitle('OSCAR NIGHT: The Favourite'), 'The Favourite');
  assert.equal(refineTitle('Oscar Night: Green Book'), 'Green Book');
  assert.equal(refineTitle('OSCAR NIGHT: Green Book'), 'Green Book');
});

it('Remove unnecessary notations at the end of title', () => {
  assert.equal(refineTitle('Alita: Battle Angel (2D)'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Alita: Battle Angel (3D)'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Alita: Battle Angel 2D'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Alita: Battle Angel 3D'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Alita: Battle Angel 2d'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Alita: Battle Angel 3d'), 'Alita: Battle Angel');
  assert.equal(refineTitle('Captain Marvel 3D Dolby Atmos'), 'Captain Marvel');
  assert.equal(refineTitle('Captain Marvel 3D DOLBY ATMOS'), 'Captain Marvel');
  assert.equal(refineTitle('Star Trek: Beyond Dolby Atmos'), 'Star Trek: Beyond');
  assert.equal(refineTitle('Star Trek: Beyond DOLBY ATMOS'), 'Star Trek: Beyond');
});
