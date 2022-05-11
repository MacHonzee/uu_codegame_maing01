//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import { withRoute } from "uu_plus4u5g02-app";
import Home from "./home";
import LSI from "../config/lsi";
import AssignmentView from "../bricks/assignment-view";
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
    }),
};

let Assignments = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Assignments",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const testAssignments = () => {
      let x = [];

      for (let i = 0; i < 10; i++) {
        x.push(<AssignmentView  name={"Test " + i}/>)
      }

      return x;
    }

    return (
      <>
        <RouteBar/>
        <UU5.Bricks.Well className={Css.Well()}>

          <UU5.Bricks.Header>
            <UU5.Bricks.Lsi lsi={LSI.assignments.mainHeader}/>
          </UU5.Bricks.Header>

          {testAssignments()}

        </UU5.Bricks.Well>

      </>
    );
    //@@viewOff:render
  },
});

Assignments = withRoute(Assignments, { authenticated: true });

//@@viewOn:exports
export { Assignments };
export default Assignments;
//@@viewOff:exports
