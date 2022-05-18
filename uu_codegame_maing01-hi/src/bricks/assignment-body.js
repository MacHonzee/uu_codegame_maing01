//@@viewOn:imports
import { createComponent, useRoute, useState } from "uu5g05";
import Config from "./config/config.js";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import Lsi from "../config/lsi";
import Calls from "../calls";
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
    const [rating, setRating] = useState(props.prevSession.difficulty);
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface

    const loadInput = async () => {

      try {
        let input = await Calls.getInput({
          solver: props.session.solver,
          assignmentId: props.session.assignmentId,
          inputScriptPath: props.session.scriptPath
        });

        AssignmentBody.modal.open({
          size: "m",
          header: <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.input}/>,
          content: input.generatedInput
        });

      } catch (e) {
        console.log(e.message);
      }
    };

    const postAnswer = async (answer) => {

      if (!answer) return;

      try {
        let currentInput = (await Calls.getSolvingSession({
          solver: props.session.solver,
          assignmentId: props.session.assignmentId,
        })).session.input;

        if (currentInput.includes('"')) {
          currentInput = currentInput.substring(1, currentInput.lastIndexOf('"'));
        }

        let valid = await Calls.validateAnswer({
          solver: props.session.solver,
          assignmentId: props.session.assignmentId,
          inputScriptPath: props.session.scriptPath,
          usersAnswer: answer,
          originalInput: currentInput
        });

        console.log(valid);

        if (valid.inputValid) {
          props.refresh();
        }

      } catch (e) {
        console.log(e.message);
      }

    };

    const renderSecondPart = () => {
      return (!props.completed) ? (
        <>
          <UU5.Bricks.Header level={3}>
            <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.input}/>
          </UU5.Bricks.Header>
          <UU5.Bricks.Button onClick={loadInput} colorSchema={"blue"}>Get input :D!</UU5.Bricks.Button>

          <UU5.Bricks.Header level={3}>
            <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.answer}/>
          </UU5.Bricks.Header>

          <UU5.Forms.Form onSave={(opt) => postAnswer(opt.values.answer)}
                          onCancel={() => setRoute("assignments")}>
            <UU5.Forms.Text name={"answer"} className={Css.Inputs()}/>
            <UU5.Forms.Controls/>
          </UU5.Forms.Form>
        </>
      ) : (
        <>
          <UU5.Bricks.Header level={3}>
            <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.completed}/>
          </UU5.Bricks.Header>
        </>
      );

    };

    const updateRating = async (value) => {
      setRating(value);

      await Calls.updateDifficultyRating({
        solver: props.session.solver,
        assignmentId: props.prevSession.assignmentId,
        difficulty: value
      });
    }

    //@@viewOff:interface
    //@@viewOn:render
    return (
      <UU5.Bricks.Div className={Css.Description()}>
        <UU5.Bricks.Card style={{ padding: "2%" }} colorSchema={props.completed ? "green" : "default"}>
          <UU5.Bricks.Header level={3}>
            <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.description}/>
          </UU5.Bricks.Header>
          <UU5.Bricks.Paragraph>{props.description}</UU5.Bricks.Paragraph>

          {renderSecondPart()}

          <UU5.Bricks.Header level={5}>
            <UU5.Bricks.Lsi lsi={Lsi.assignmentBody.rating}/>
          </UU5.Bricks.Header>
          <UU5.Bricks.Rating value={rating} icon={UU5.Icons.point} onClick={updateRating}/>

        </UU5.Bricks.Card>
        <UU5.Bricks.Modal ref_={modal => AssignmentBody.modal = modal}/>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AssignmentBody };
export default AssignmentBody;
//@@viewOff:exports
