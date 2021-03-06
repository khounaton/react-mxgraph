import * as React from "react";

import {
  IMenuContext,
  MenuContext,
  MenuItemContext,
} from "../context/MenuContext";

import {
  withNameProps,
} from "./WithNameProps";

export class Menu extends React.PureComponent<{name: string}> {
  public menu: Array<{
    menuItemType: string;
    text?: string;
  }>;
  constructor(props: {name: string}) {
    super(props);
    this.menu = [];
  }

  public render(): React.ReactNode {
    return (
      <MenuItemContext.Provider value={{enabled: true, addItem: this.addItem}}>
        {this.props.children}
        <MenuContext.Consumer>{(context: IMenuContext) => {
          const { setMenu } = context;
          setMenu(this.props.name, this.menu);
          return null;
        }}
        </MenuContext.Consumer>
      </MenuItemContext.Provider>
    );
  }

  private readonly addItem = (name: string, text: string): void => {
    this.menu = this.menu.concat({menuItemType: name, text });
  }
}

export const VertexMenu = withNameProps(Menu, "vertex");
export const EdgeMenu = withNameProps(Menu, "edge");
export const CanvasMenu = withNameProps(Menu, "canvas");
