const { nanoid } = require('nanoid');

const imgElementPlaceholder = '<img data-placeholder>';

const defaultStaticImgElement = '<img id="img-static" class="img" src="./bg.jpg" alt="">';
const defaultGifImgElement = '<img id="img-gif" class="img" src="./bg.gif" alt="">';

function replaceImgSrc({ type, contents }) {
  const imgElement = type === 'static' ? defaultStaticImgElement : defaultGifImgElement;
  const ext = type === 'static' ? 'jpg' : 'gif';
  const id = nanoid();

  const value = `bg.${ext}`;
  const replaceValue = `bg_${id}.${ext}`;

  const preparedImgElement = imgElement.replace(
    value,
    replaceValue,
  );

  const contentsReplaced = contents.toString().replace(
    imgElementPlaceholder,
    preparedImgElement,
  );

  return contentsReplaced;
}

module.exports = { replaceImgSrc };
