type ClassName = { readonly [key: string]: string };

declare module "*.module.css" {
  const ClassNames: ClassName;
  export default ClassNames;
}
