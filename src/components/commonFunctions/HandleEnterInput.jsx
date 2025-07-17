export const handleEnterKeyDown = (e, skipInput = "none") => {
  if (e.key === "Enter") {
    !e.target.tagName === "BUTTON" && e.preventDefault();
    const inputs = Array.from(
      document.querySelectorAll("input:not([disabled])")
    );
    const nextElement = document.querySelectorAll("button");
    console.log(inputs, nextElement, e.target.tagName === "BUTTON");

    const activeInput = document.activeElement;
    const currentIndex = inputs.findIndex((input) => input === activeInput);

    if (
      activeInput &&
      activeInput.hasAttribute("required") &&
      activeInput.value != undefined &&
      activeInput.value != "" &&
      activeInput.value != null &&
      currentIndex >= 0 &&
      skipInput == "none" &&
      inputs[currentIndex + 1]
    ) {
      inputs[currentIndex + 1]?.id
        ? document.getElementById(inputs[currentIndex + 1]?.id)?.focus()
        : document
            .querySelector(`[name="${inputs[currentIndex + 1]?.name}"]`)
            .focus();
      // document.getElementsByName(inputs[currentIndex + 1]?.name)?.focus();
    } else if (nextElement && !inputs[currentIndex + 1]) {
      document.getElementById(nextElement[0]?.id)?.focus();
    }
  }
};
