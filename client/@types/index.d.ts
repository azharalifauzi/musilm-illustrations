declare module '*.svg' {
  const content: string;
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  export default content;
}
