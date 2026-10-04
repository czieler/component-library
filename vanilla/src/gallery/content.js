
export const text = (tag, content, className = "") => {
  const element = document.createElement(tag);
  element.textContent = content;
  element.className = className;
  return element;
};
export const implementationDetails = (...paragraphs) => {
  const element = document.createElement("div");
  element.className = "implementation-details";
  element.append(text("strong", "Implementation details"));
  paragraphs.forEach((content) => {
    const paragraph = document.createElement("p");
    content.forEach((part) => {
      if (typeof part === "string") {
        paragraph.append(document.createTextNode(part));
      } else {
        const code = document.createElement("code");
        code.textContent = part.code;
        paragraph.append(code);
      }
    });
    element.append(paragraph);
  });
  return element;
};
