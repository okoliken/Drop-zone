export function parseLocation(identifier, items) {
  const result = items.find(({ id }) => id === identifier);
  // console.log(result)
  return result ? result.name : identifier;
}

export function forkName(identifier, items, key) {
  const result = items.find((item) => (item[key] || item.id) === identifier);
  return result ? result.name : identifier;
}
