import React from "react";
import { TimelineComponent } from "../components/";
import { SeachComponent } from "../components/";
import { options } from "../helper/options";
import useSearch from "../hooks/useSearch";

export function TimelineContainer() {
  const { items, groups, search, handleChange } = useSearch();

  const timelineTable =
    groups.length === 0 ? (
      "Not Found"
    ) : (
      <TimelineComponent options={options} groups={groups} items={items} />
    );

  return (
    <div>
      <SeachComponent
        type="text"
        name="name"
        placeholder="Quick Seach"
        value={search}
        onChange={handleChange}
      >
        Search for trucks or orders
      </SeachComponent>
      {timelineTable}
    </div>
  );
}
