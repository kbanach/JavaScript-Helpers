const LOCAL_STORAGE_ITEM = '__state';

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_ITEM, serializedState);
  } catch (err) {
    console.log('Error was throw during store parsing: ', err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_ITEM);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error was throw during store reading: ', err);
    return undefined;
  }
};
