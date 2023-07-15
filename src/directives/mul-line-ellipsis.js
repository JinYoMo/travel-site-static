export default {
  mulLineEllipsis: {
    inserted(el, binding) {
      const {text, line} = binding.value;
      el.innerHTML = handleEllipsisWithMulLine(el, text, line);
    },
    componentUpdated(el, binding) {
      const {text, line} = binding.value;
      el.innerHTML = handleEllipsisWithMulLine(el, text, line);
    }
  }
}

function handleEllipsisWithMulLine(dom, text, line) {
  const width = dom.offsetWidth;
  const fontSize = parseFloat(window.getComputedStyle(dom).fontSize);
  const numPerLine = Math.floor(width / fontSize);
  const max = line * numPerLine;
  if (text && text.length > max) {
    return text.slice(0, max - 3) + '...';
  } else {
    return text;
  }
}
