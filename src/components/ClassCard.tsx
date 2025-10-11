import React from "react";
import type { ClassItem } from "../data/classes";

type Props = {
  item: ClassItem;
  onOpen?: (item: ClassItem) => void;
  tabIndex?: number;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

const ClassCard = React.forwardRef<HTMLButtonElement, Props>(function ClassCard(
  { item, onOpen, tabIndex = -1, onFocus, onKeyDown },
  ref
) {
  return (
    <button
      ref={ref}
      role="gridcell"
      tabIndex={tabIndex}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onClick={() => onOpen?.(item)}
      className="
        flex items-center justify-between
        rounded-2xl bg-white px-6 py-5
        border-2 border-gray-200
        shadow-sm
        transition-all duration-200 ease-in-out
        hover:border-blue-500 hover:shadow-md
        focus:outline-none focus:border-blue-500 focus:shadow-lg
      "
      aria-label={`${item.name}, Teacher ${item.teacher}, Capacity ${item.capacity}`}
    >
      {/* Left block */}
      <div className="flex flex-col items-start gap-2.5">
        <div className="text-2xl font-bold text-black leading-none">
          {item.name}
        </div>

        <div className="flex items-center gap-2.5">
          {/* <img
            src="/assets/teachericon.svg"  // ✅ make sure this is inside /public/assets
            alt=""
            aria-hidden="true"
            className="h-5 w-5"
          /> */}
          <img src="src\assets\teachericon.svg" alt="Logo" className=" w-3.5 mx-auto" draggable = "false" />
          <span className="text-lg font-medium text-black leading-none">
            {item.teacher}
          </span>
        </div>
      </div>

      {/* Divider + capacity */}
      <div className="flex items-center justify-between min-w-[60px]">
        <div className="w-px self-stretch bg-gray-300" />
        <div className="text-4xl font-bold text-blue-500 leading-none pl-6 pr-2">
          {item.capacity}
        </div>
      </div>
    </button>
  );
});

export default ClassCard;
