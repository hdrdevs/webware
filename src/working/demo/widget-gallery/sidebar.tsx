import { WContainer } from "../../../ui/container.ui";
import { WIconButton } from "../../../ui/IconButton.ui";

const listOfButtons = [
    {
        id: "btnLabels",
        icon: "label",
        text: "Labels",
        link: "/working/demo/widget-gallery/labels",
    },
    {
        id: "btnTextboxes",
        icon: "input",
        text: "Textboxes",
        link: "/working/demo/widget-gallery/textboxes",
    },
    {
        id: "btnButtons",
        icon: "keyboard_command_key",
        text: "Buttons",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnContainers",
        icon: "dashboard",
        text: "Containers",
        link: "/working/demo/widget-gallery/containers",
    },
    {
        id: "btnToolbar",
        icon: "widgets",
        text: "Toolbars",
        link: "/working/demo/widget-gallery/toolbars",
    },
    {
        id: "btnDataGrid",
        icon: "view_list",
        text: "Data Grid",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnSlider",
        icon: "linear_scale",
        text: "Value Bars",
        link: "/working/demo/widget-gallery/valuebars",
    },
    {
        id: "btnTabs",
        icon: "tab",
        text: "Tabs",
        link: "/working/demo/widget-gallery/tabs",
    },
    {
        id: "btnProgressbars",
        icon: "donut_large",
        text: "Progrssbars",
        link: "/working/demo/widget-gallery/progressbar",
    },
    {
        id: "btnImages",
        icon: "image",
        text: "Images",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnIcons",
        icon: "filter_hdr",
        text: "Icons",
        link: "/working/demo/widget-gallery/icons",
    },
    {
        id: "btnDialogs",
        icon: "open_in_new_down",
        text: "Dialogs",
        link: "/working/demo/widget-gallery/dialogs",
    },
];

export const SideBar = () => {
    const sidebarButtonHeight = 50;

    return (
        <WContainer orientation="vertical" fixedSize={200} padding={10}>
            {listOfButtons.map((button) => {
                return (
                    <WIconButton
                        id={button.id}
                        icon={button.icon}
                        text={button.text}
                        fixedSize={sidebarButtonHeight}
                        onClick={() => {
                            app?.goTo(button.link);
                        }}
                    />
                );
            })}
        </WContainer>
    );
};
