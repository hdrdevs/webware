import "./styles/image.css";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { Widget, WidgetTypes, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { decode } from "html-entities";

export class Image extends Widget {
    imageContainer: Widget;
    image: Widget;
    constructor(id: string, src: string = "", parent: Widget | null = null) {
        super(id, "div", parent);

        this.imageContainer = new Widget(id + ".imageContainer", "div", this);
        this.imageContainer.addClass("WUIImageContainer");

        this.image = new Widget(id + ".image", "img", this.imageContainer);
        this.image.setType(WidgetTypes.CUSTOM);
        this.image.getBody().setAttribute("src", src);
    }

    public render(): void {
        super.render();

        this.imageContainer.setX(0);
        this.imageContainer.setY(0);
        this.imageContainer.setWH(this.getW(), this.getH());
    }

    public fillWidth(): void {
        this.image.addClass("WUIImageFillWidth");
    }

    public fillHeight(): void {
        this.image.addClass("WUIImageFillHeight");
    }

    public setAlternateText(text: string): void {
        this.image.getBody().setAttribute("alt", text);
    }

    public setImageUrl(url: string): void {
        this.image.getBody().setAttribute("src", url);
    }

    public getImageUrl(): string | null {
        return this.image.getBody().getAttribute("src");
    }

    public getAlternateText(): string | null {
        return this.image.getBody().getAttribute("alt");
    }
}

export type wImageProps = WidgetProps & {
    src: string;
    alt?: string | null;
    fillWidth?: boolean | null;
    fillHeight?: boolean | null;
    width?: number | null;
    height?: number | null;
};

export const WImage = (props: wImageProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-image
            w-src={props.src}
            w-alt={props.alt}
            w-fill-width={props.fillWidth}
            w-fill-height={props.fillHeight}
            w-width={props.width}
            w-height={props.height}
        ></div>,
        props
    );
};

export function createImage(id: string, content: any, parent: Widget | null = null): Image {
    const dataSrc = content.getAttribute("w-src");
    const dataAlt = content.getAttribute("w-alt");
    const dataFillWidth = content.getAttribute("w-fill-width");
    const dataFillHeight = content.getAttribute("w-fill-height");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    let newImage = new Image(id, decode(dataSrc), parent);

    if (dataAlt) {
        newImage.setAlternateText(dataAlt);
    }

    if (dataFillWidth) {
        newImage.fillWidth();
    }

    if (dataFillHeight) {
        newImage.fillHeight();
    }

    if (dataWidth) {
        newImage.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newImage.setInitialH(dataHeight);
    }

    return newImage;
}
