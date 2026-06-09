function isRidiculoWord(part) {
  return /^rid[ií]culo$/iu.test(part);
}

export function renderBrandText(text) {
  if (typeof text !== 'string') return text;

  return text.split(/(Rid[ií]culo)/giu).map((part, index) => {
    if (!isRidiculoWord(part)) return part;

    return (
      <em className="brand-inline" key={`${part}-${index}`}>
        {part}
      </em>
    );
  });
}
