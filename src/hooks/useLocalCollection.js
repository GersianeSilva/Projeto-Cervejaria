import { useState } from "react";

function useLocalCollection(collectionName, initial = []) {
  const key = `mars_${collectionName}`;
  const load = () => {
    try { return JSON.parse(localStorage.getItem(key)) || initial; } catch { return initial; }
  };
  const [data, setData] = useState(load);
 
  const save = (next) => { setData(next); localStorage.setItem(key, JSON.stringify(next)); };
 
  const add = (item) => {
    const novo = { ...item, id: Date.now().toString() };
    save([...data, novo]);
    return novo;
  };
  const update = (id, changes) => {
    save(data.map(d => d.id === id ? { ...d, ...changes } : d));
  };
  const remove = (id) => save(data.filter(d => d.id !== id));
 
  return { data, add, update, remove };
}

export default useLocalCollection;