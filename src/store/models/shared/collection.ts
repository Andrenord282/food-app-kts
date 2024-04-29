export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T, U>(
  elements: T[],
  getKeyForElement: (element: T) => K,
  normalize: (element: T) => U,
): CollectionModel<K, U> => {
  const collection = getInitialCollectionModel();
  elements.forEach((element) => {
    const id = getKeyForElement(element);
    collection.order.push(id);
    collection.entities[id] = normalize(element);
  });

  return collection;
};

export const normalizeArray = <T, U>(elements: T[], normalize: (element: T) => U) => {
  const array: U[] = [];
  elements.forEach((element) => {
    array.push(normalize(element));
  });

  return array;
};

export const linearizeCollection = <K extends string | number, T>(collection: CollectionModel<K, T>): T[] => {
  return collection.order.map((id) => collection.entities[id]);
};
