export function hasStructuredTextContent(field) {
  return field?.value?.document?.children?.some((child) =>
    child.children?.some((subChild) => subChild.value !== '')
  );
}
