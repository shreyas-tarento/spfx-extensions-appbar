import * as React from "react";
import * as ReactDom from "react-dom";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import styles from "./HelloWorldApplicationCustomizer.module.scss";
import SideNav from "./components/SideNav/SideNav";
import ISideNavProps from "./components/SideNav/ISideNavProps";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {
  private _customHeader: PlaceholderContent | undefined;
  private _customAppBar: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    initializeIcons();
    this.context.placeholderProvider.changedEvent.add(
      this,
      this.HideDefaultViews
    );
    this.context.placeholderProvider.changedEvent.add(this, this.CustomHeader);
    this.context.placeholderProvider.changedEvent.add(this, this.CustomAppBar);
    return Promise.resolve();
  }

  public HideDefaultViews() {
    //hide the default app bar
    const appBarElement: any = document.getElementById("sp-appBar");
    appBarElement.style = "display:none";
    //hide the default sharepoint header(blue heder)
    const navPlaceholder: any = document.getElementById("SuiteNavPlaceholder");
    navPlaceholder.style = "display:none";
  }


  public CustomHeader() {
    console.error("This is custom header");
    if (!this._customHeader) {
      this._customHeader = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
      if (!this._customHeader) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
      if (this.properties) {
        if (this._customHeader.domElement) {
          this._customHeader.domElement.innerHTML = `
          <div class="${styles.appHeader}">
          <H1>Header</H1>
          </div>
           `;
        }
      }
    }
  }

  private CustomAppBar(): void {
    if (!this._customAppBar) {
      this._customAppBar = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      if (!this._customAppBar) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this._customAppBar.domElement) {
        const element: React.ReactElement<ISideNavProps> = React.createElement(
          SideNav,
          {
            context: this.context,
          }
        );
        ReactDom.render(element, this._customAppBar.domElement);
      }
    }
  }

  private _onDispose(): void {
    console.log(
      "[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders."
    );
  }
}
