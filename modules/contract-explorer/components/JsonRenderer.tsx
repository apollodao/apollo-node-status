import ReactJson, { ThemeKeys } from "react-json-view";

export const JsonRenderer = ({
  content,
  theme,
}: {
  content: object;
  theme: ThemeKeys;
}) => {
  return <ReactJson src={content} theme={theme} />;
};

export default JsonRenderer;
