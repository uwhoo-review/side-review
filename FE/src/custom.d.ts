declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.otf";

declare module "*.style.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.css";
