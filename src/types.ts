export type Tool = "brush" | "select" | "eraser" | "picker" | "rect" | "ellipse" | "line";

export type Selection = {
    x: number;
    y: number;
    width: number;
    height: number;
};