import FontProps from "./fontProps";

export interface Picture {
    uid?: string;
    filePath?: string;
    title?: string;
    font?: any
    base64?: string;
    withBorder?: boolean | true;
}

export default Picture;