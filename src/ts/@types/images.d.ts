// keep typescript linter from complaining about image imports
declare module '*.png' {
  const path: string;
  export default path;
}
declare module '*.jpg' {
  const path: string;
  export default path;
}