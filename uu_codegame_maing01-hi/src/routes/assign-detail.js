//@@viewOn:imports
import { createComponent, useEffect, useRoute, useState } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";
import RouteBar from "../core/route-bar";
import AssignmentBody from "../bricks/assignment-body";
import Calls from "../calls";
import { withRoute } from "uu_plus4u5g02-app";
import Assignments from "./assignments";
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

let AssignDetail = createComponent({
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
    const [URLparams,] = useRoute();

    const [bodies, setBodies] = useState(<UU5.Bricks.Loader/>);
    const [name, setName] = useState("");
    //@@viewOff:private

    //@@viewOn:interface
    useEffect(() => {
      getBodies();
    }, []);

    const getBodies = async () => {
      try {
        const myUUId = UU5.Environment.getSession().getIdentity();
        await Calls.addUser({ userId: myUUId.uuIdentity, completedParts: [] });

        let assignment = (await Calls.getFullAssignment({ id: URLparams.params.id, userId: myUUId.uuIdentity })).assignment;
        setName(assignment.name);

        const currentSession = (await Calls.createSolvingSession({
          solver: myUUId.uuIdentity,
          solverName: myUUId.name,
          assignmentId: assignment.parts[assignment.parts.length - 1].id,
          input: "",
          solution: "",
          solutionTimestamp: "",
          result: "notFilled",
          difficulty: 0,
        })).session;

        let otherSessions = await Promise.all(assignment.parts.map(async (part) => {

          const session = await Calls.getSolvingSession({
            solver: myUUId.uuIdentity,
            assignmentId: part.id
          });
          return session.session;
        }));

        otherSessions = otherSessions.filter(ses => ses !== null);

        const usersCompletedParts = (await Calls.getUser({ userId: myUUId.uuIdentity })).user.completedParts;

        currentSession.scriptPath = assignment.parts[assignment.parts.length - 1].input;

        setBodies(assignment.parts.map((part, i) => {

            const completed = (usersCompletedParts.includes(part.id));

            const ses = otherSessions.find(otherSes => part.id === otherSes.assignmentId);

            let prevSession = {};

            if (ses !== undefined) {
              prevSession = {
                difficulty: ses.difficulty,
                assignmentId: ses.assignmentId
              };
            }

            return (
              <AssignmentBody
                refresh={getBodies}
                completed={completed}
                prevSession={prevSession}
                session={currentSession}
                key={i}
                description={part.description}
                input={part.input}/>
            );
          }
        ))

      } catch (e) {
        console.log(e.message);
      }
    };

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <RouteBar/>
        <UU5.Bricks.Well className={Css.Well()}>

          <UU5.Bricks.Header>{name}</UU5.Bricks.Header>

          {bodies}

        </UU5.Bricks.Well>
      </>
    );

    //@@viewOff:render
  },
});

AssignDetail = withRoute(AssignDetail, { authenticated: true });

//@@viewOn:exports
export { AssignDetail };
export default AssignDetail;
//@@viewOff:exports
