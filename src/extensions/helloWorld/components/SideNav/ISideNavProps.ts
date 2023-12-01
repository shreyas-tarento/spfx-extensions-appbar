import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
export interface MenuItemProps {
  id: Number;
  label: string;
  link: string;
  iconName: string;
}
export default interface ISideNavProps {
  context: ApplicationCustomizerContext;
}
