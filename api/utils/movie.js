exports.refineTitle = title => {
  if (!title || typeof title !== 'string') {
    return '';
  }

  const transforms = [
    [/Nederlandse Versie/i, 'NL'],
    [/Originele Versie/i, 'OV'],
    [/NL$/i, '(NL)'],
    [/OV$/i, '(OV)'],
    [/Engels/i, 'OV'],
    [/\s?2D/i, ''],
    [/\s?\([2D)]*\)/i, ''],
    [/\s?3D/i, ''],
    [/\s?\([3D)]*\)/i, ''],
    [/\s?Dolby Atmos/i, ''],
    [/Oscar Night.?\s?/i, ''],
    [/Ladies Night.?\s?/i, ''],
    [/Voorpremi[èe]re.?\s?/i, ''],
  ];

  for (const [regex, replacement] of transforms) {
    title = title.replace(regex, replacement);
  }

  return title;
};
