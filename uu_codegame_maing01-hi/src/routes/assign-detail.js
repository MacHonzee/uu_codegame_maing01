//@@viewOn:imports
import { createComponent, useEffect, useRoute } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";
import RouteBar from "../core/route-bar";
import AssignmentBody from "../bricks/assignment-body";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Css = {
  Well: () =>
    Config.Css.css({
      textAlign: "center",
      minHeight: "100%"
    })
};

const AssignDetail = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AssignDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [params,] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <RouteBar/>
        <UU5.Bricks.Well className={Css.Well()}>

          <AssignmentBody name={"Assignment"}/>

        </UU5.Bricks.Well>
      </>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AssignDetail };
export default AssignDetail;
//@@viewOff:exports
