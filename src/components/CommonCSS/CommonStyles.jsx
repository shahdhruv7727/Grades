export const dropdownStyles = {
  control: (base) => ({
    ...base,
    boxShadow: "none",   
    backgroundColor: "white",
    padding: "2px",
    height: "46px",
    BiBorderRadius: "12px",
    border: "none",
    outline: "none",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
  }),
};
