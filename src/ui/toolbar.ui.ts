import { IWidget } from "src/interfaces/widget.interface";
import { Widget, WidgetTypes } from "./widget.ui";
import { IconButton } from "./IconButton.ui";

export type ToolbarOrientationTypes = "horizontal" | "vertical";
const TOOLBAR_SIZE = 40;
const TOOLBAR_BUTTON_SIZE = 20;

export class Toolbar extends Widget {
    orientation: ToolbarOrientationTypes;
    items: Map<string, IWidget>;
    size: number; //Indica el alto o ancho de la toolbar.

    itemsContainer: Widget;
    btnLeft: IconButton;
    btnRight: IconButton;

    constructor(id: string, parent: Widget | null = null, orientationType: ToolbarOrientationTypes = "horizontal") {
        super(id, "div", parent);
        this.orientation = orientationType;
        this.size = TOOLBAR_SIZE;
        this.items = new Map<string, IWidget>();

        this.itemsContainer = new Widget(this.id + ".itemsContainer", "div", this);
        this.itemsContainer.setType(WidgetTypes.CUSTOM);
        this.itemsContainer.getBody().style.position = "absolute";
        this.itemsContainer.getBody().style.overflow = "hidden";

        this.setType(WidgetTypes.FILL);
        this.getBody().style.overflow = "hidden";

        this.btnLeft = new IconButton(this.id + ".btnLeft", "arrow_left");
        this.btnLeft.setType(WidgetTypes.CUSTOM);
        this.btnLeft.getBody().style.position = "absolute";
        this.btnLeft.setW(TOOLBAR_BUTTON_SIZE);
        this.btnLeft.setH(TOOLBAR_SIZE);
        this.addChild(this.btnLeft);

        this.btnRight = new IconButton(this.id + ".btnRight", "arrow_right");
        this.btnRight.setType(WidgetTypes.CUSTOM);
        this.btnRight.getBody().style.position = "absolute";
        this.btnRight.setW(TOOLBAR_BUTTON_SIZE);
        this.btnRight.setH(TOOLBAR_SIZE);
        this.addChild(this.btnRight);

        this.btnLeft.subscribe({
            event: "click",
            then: () => {
                this.itemsContainer.getBody().scrollLeft -= TOOLBAR_SIZE;
            },
        });

        this.btnRight.subscribe({
            event: "click",
            then: () => {
                this.itemsContainer.getBody().scrollLeft += TOOLBAR_SIZE;
            },
        });
    }

    /**
     * Set the orientation of the toolbar.
     *
     * @param {ToolbarOrientationTypes} orientationType - the type of orientation to set
     * @return {void}
     */
    public setOrientation(orientationType: ToolbarOrientationTypes, size: number = TOOLBAR_SIZE): void {
        this.orientation = orientationType;
        this.size = size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    /**
     * Adds an item to the collection.
     *
     * @param {string} id - The ID of the item.
     * @param {IWidget} widget - The widget to be added.
     */
    addItem(id: string, widget: IWidget) {
        widget.setParent(this.itemsContainer);

        widget.setType(WidgetTypes.CUSTOM);

        if (this.orientation === "vertical") {
            widget.setW(this.size);
        } else {
            widget.setH(this.size);
        }

        this.items.set(id, widget);
    }

    public init(): void {
        super.init();
    }

    public getFullSize(): number {
        //Devuelve el tamaño que tiene la toolbar para mostrar todos los botones.
        let size = 0;
        for (const item of this.items.values()) {
            size += item.getW();
        }
        return size;
    }

    public render(): void {
        const fullSize = this.getFullSize();
        const availableSize = this.getW();

        if (fullSize > availableSize) {
            this.btnLeft.setVisible(true);
            this.btnRight.setVisible(true);

            this.itemsContainer.setY(0);
            this.itemsContainer.setX(TOOLBAR_BUTTON_SIZE);
            this.itemsContainer.setW(availableSize - TOOLBAR_BUTTON_SIZE * 2);
            this.itemsContainer.setH(TOOLBAR_SIZE);

            this.btnLeft.setX(0);
            this.btnRight.setX(availableSize - TOOLBAR_BUTTON_SIZE);
        } else {
            this.btnLeft.setVisible(false);
            this.btnRight.setVisible(false);
            this.itemsContainer.setY(0);
            this.itemsContainer.setX(0);
            this.itemsContainer.setW(fullSize);
            this.itemsContainer.setH(TOOLBAR_SIZE);
        }

        let currentPosition: number = 0;

        for (const item of this.items.values()) {
            if (this.orientation === "vertical") {
                item.setY(currentPosition);
                currentPosition += item.getH();
                item.setX(0);
            } else {
                item.setX(currentPosition);
                item.setY(0);
                currentPosition += item.getW();
            }
            item.render();
        }

        super.render();
    }
}
