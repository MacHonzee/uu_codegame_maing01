//@@viewOn:imports
import { createComponent, useEffect, useRoute } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Css = {
  Card: () =>
    Config.Css.css({
      textAlign: "center",
      padding: "1%",
    }),
  Button: () =>
    Config.Css.css({
      marginTop: "5%"
    })
};

const AssignmentView = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AssignmentView",
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
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const openAssignment = () => {
      setRoute("detail", { id: props.id })
    };

    return (
      <UU5.Bricks.Card width={300} className={Css.Card()}>
        <UU5.Bricks.Header level={4}>{props.name}</UU5.Bricks.Header>
        <UU5.Bricks.Line/>

        <UU5.Bricks.Paragraph>
          {props.parts[0].description}
        </UU5.Bricks.Paragraph>

        <UU5.Bricks.Header level={6}>Difficulty</UU5.Bricks.Header>
        <UU5.Bricks.Rating value={props.difficulty} icon={UU5.Icons.point} count={5}/>


        <UU5.Bricks.Header level={6}>User difficulty</UU5.Bricks.Header>
        <UU5.Bricks.Rating value={props.userDifficulty} icon={UU5.Icons.point} count={5}/>

        <br/>
        <UU5.Bricks.Button onClick={openAssignment} colorSchema={"blue"} className={Css.Button()}>Let's go :D!</UU5.Bricks.Button>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AssignmentView };
export default AssignmentView;
//@@viewOff:exports
