export function getElementWidth(
  sectionWidth,
  elementLeftMargin,
  tableColumnGapsCount,
  tableColumnsCount
) {
  return (
    (sectionWidth - elementLeftMargin * tableColumnGapsCount) /
    tableColumnsCount
  );
}

export function getElementHeight(
  elementWidth,
  elementAspectRatio,
  elementTopMargin
) {
  return elementWidth / elementAspectRatio + elementTopMargin;
}

export function getContentHeight(
  elementsTotalCount,
  elementHeight,
  tableColumnsCount
) {
  return Math.ceil(elementsTotalCount / tableColumnsCount) * elementHeight;
}

export function generateElementsForSingleRow(
  rowIndex,
  offsetFromTop,
  tableColumnsCount,
  elementsTotalCount,
  elements,
  generateElementFn
) {
  const rowOfElements = [];
  for (let colIndex = 0; colIndex < tableColumnsCount; colIndex++) {
    const elementIndex = rowIndex * tableColumnsCount + colIndex;

    if (elementIndex < elementsTotalCount) {
      const element = elements[elementIndex];
      const isRightElement = colIndex !== 0;
      rowOfElements.push(
        generateElementFn(element, elementIndex, offsetFromTop, isRightElement)
      );
    }
  }
  return rowOfElements;
}
