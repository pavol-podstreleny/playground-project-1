export function paginate<T>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T[] {
  if (pageNumber === 0 || pageNumber > Math.ceil(items.length / pageSize)) {
    console.warn(
      "Page number can not be <= 0 or Page number can not be > number of pages"
    );
    return items;
  }
  const startIndex = (pageNumber - 1) * pageSize;
  const pagedItems = [];
  for (let i = startIndex; i < startIndex + pageSize && i < items.length; i++) {
    pagedItems.push(items[i]);
  }
  return pagedItems;
}
