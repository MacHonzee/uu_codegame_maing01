//@@viewOn:imports
import { createComponent, useEffect, useState } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import { withRoute } from "uu_plus4u5g02-app";
import Home from "./home";
import LSI from "../config/lsi";
import AssignmentView from "../bricks/assignment-view";
import Calls from "../calls";
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
    const [assignments, setAssignments] = useState(<UU5.Bricks.Loading/>);
    //@@viewOff:private

    //@@viewOn:interface
    useEffect(() => {
      getAssignments();
    }, []);

    //@@viewOff:interface

    //@@viewOn:render
    const getAssignments = async () => {
      try {
        let recievedAssignments = await Calls.getAssignments();
        const recievedDifficulties = await Calls.getUserDifficultyRatings();

        recievedAssignments = recievedAssignments.map(assign => {
          assign.userDifficulty = recievedDifficulties.find((diff) => diff.assignmentId === assign.id).difficulty;
          return assign;
        });

        let assignViews = [];
        for (const [i, assign] of recievedAssignments.entries()) {
          assignViews.push(<AssignmentView key={i} {...assign}/>);
        }

        setAssignments(assignViews);

      } catch (e) {
        setAssignments([]);
      }

    }

    return (
      <>
        <RouteBar/>
        <UU5.Bricks.Well className={Css.Well()}>

          <UU5.Bricks.Header>
            <UU5.Bricks.Lsi lsi={LSI.assignments.mainHeader}/>
          </UU5.Bricks.Header>

          {assignments}

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
