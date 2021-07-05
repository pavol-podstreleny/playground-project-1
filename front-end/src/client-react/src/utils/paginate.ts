export function paginate<T>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  const pagedItems = [];
  for (let i = startIndex; i < startIndex + pageSize && i < items.length; i++) {
    pagedItems.push(items[i]);
  }
  return pagedItems;
}
