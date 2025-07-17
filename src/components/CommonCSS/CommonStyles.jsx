export  const dropdownStyles = {
  control: (base) => ({
    ...base,
    boxShadow: "none",   
    backgroundColor: "white",
    padding: "0px",
    height: "0px",
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
