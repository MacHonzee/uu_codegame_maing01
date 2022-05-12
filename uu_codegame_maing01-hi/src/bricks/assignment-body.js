//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import Lsi from "../config/lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers
const Css = {
  Description: () =>
    Config.Css.css({
      width: "70vw",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "2%"
    }),
  Inputs: () =>
    Config.Css.css({
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto"
    })
};

const AssignmentBody = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AssignmentBody",
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
    return (
        <UU5.Bricks.Div className={Css.Description()}>
          <UU5.Bricks.Card style={{ padding: "2%" }}>
            <UU5.Bricks.Header level={3}>
              <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.description}/>
            </UU5.Bricks.Header>
            <UU5.Bricks.Paragraph>{props.description}</UU5.Bricks.Paragraph>

            <UU5.Bricks.Header level={3}>
              <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.input}/>
            </UU5.Bricks.Header>
            <UU5.Bricks.Button colorSchema={"blue"}>Get input :D!</UU5.Bricks.Button>

            <UU5.Bricks.Header level={3}>
              <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.answer}/>
            </UU5.Bricks.Header>

            <UU5.Forms.Form onSave={(opt) => console.log(opt.values)}>
              <UU5.Forms.Text name={"answer"} className={Css.Inputs()}/>
              <UU5.Forms.Controls/>
            </UU5.Forms.Form>

          </UU5.Bricks.Card>
        </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AssignmentBody };
export default AssignmentBody;
//@@viewOff:exports
