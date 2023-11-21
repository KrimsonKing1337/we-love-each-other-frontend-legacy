function replaceMetaRefresh({ value, contents }) {
  const defaultValue = '<meta http-equiv="refresh" content="30">';

  const contentsReplaced = contents.replace(
    defaultValue,
    `<meta http-equiv="refresh" content="${value}">`
  );

  return contentsReplaced;
}

module.exports = { replaceMetaRefresh };
