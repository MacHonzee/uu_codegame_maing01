//@@viewOn:imports
import { createComponent, useEffect, useRoute, useState } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";
import RouteBar from "../core/route-bar";
import AssignmentBody from "../bricks/assignment-body";
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
    const [URLparams,] = useRoute();

    const [bodies, setBodies] = useState([]);
    const [name, setName] = useState("");
    //@@viewOff:private

    //@@viewOn:interface
    useEffect(() => {
      getBodies();
    }, []);

    const getBodies = async () => {
      try {
        const myUUId = UU5.Environment.getSession().getIdentity().uuIdentity;
        await Calls.addUser({ userId: myUUId, completedParts: [] });

        let assignment = (await Calls.getFullAssignment({ id: URLparams.params.id, userId: myUUId })).assignment;
        setName(assignment.name);

        setBodies(assignment.parts.map((part, i) =>
          <AssignmentBody key={i} description={part.description} input={part.input}/>
        ))

      } catch (e) {
        console.log(e);
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

//@@viewOn:exports
export { AssignDetail };
export default AssignDetail;
//@@viewOff:exports
