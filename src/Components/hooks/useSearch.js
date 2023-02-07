import { useState, useEffect } from "react";
import tlGroups from "../../Data/Group";
import fakeBoardData from "../../Data/Item";
export default function useSearch() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setItems(tlGroups);
    setGroups(fakeBoardData);
  }, []);

  useEffect(() => {
    let filteredResource = [];
    let filteredItems = fakeBoardData.filter((item) => {
      return (
        item.content.includes(search) ||
        item.group.includes(search.toUpperCase())
      );
    });

    filteredItems.forEach((element) => {
      if (!filteredResource.includes(element.group))
        filteredResource.push(element.group);
    });

    let filteredGroup = tlGroups.filter((group) => {
      return filteredResource.includes(group.content);
    });

    setItems(filteredItems);

    filteredGroup.length === 0 ? setGroups([]) : setGroups(filteredGroup);
  }, [search]);

  function handleChange(event) {
    const { value } = event.target;
    setSearch(() => value);
  }

  return { items, groups, search, handleChange };
}
