import { Component } from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import { EditStory } from "../../API/editStory";
import { AddStory } from "../../API/addStory";

export class StackController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentStory ? this.props.currentStory[0][3] : "",
      story: this.props.currentStory ? this.props.currentStory[0][4] : "",
      img: this.props.currentStory ? this.props.currentStory[0][2] : "",
      id: this.props.currentStory ? this.props.currentStory[0][0] : "",
      toggle: this.props.edit ? "Save" : "Post",
      redirect: false,

      currentstack: [],
      authkey: this.props.authkey,
    };
    this.validate = this.validate.bind(this);
    this.sendStory = this.sendStory.bind(this);
  }

  sendStory = () => {
    const { title, story, img, id } = this.state;
    const authkey = this.props.authkey;

    if (title !== "" && story !== "") {
      this.props.edit
        ? EditStory(title, story, img, id, authkey).then(
            this.setState({ redirect: true })
          )
        : AddStory(title, story, this.props.authkey).then(
            this.setState({ redirect: true })
          );
    }
  };

  validate = (param) => (event) => {
    this.setState({ [param]: event.target.value });
  };

  render() {
    const toggleTitle = this.props.edit ? "Edit" : "Add a Post";
    if (this.state.redirect) {
      return <Redirect push to="mystack" />;
    }

    return (
      <div className="NewEdit">
        <p className="title">{toggleTitle}</p>

        <span className="inputInfoT">
          <p className="tag">Title</p>
          <p className="req">REQUIRED</p>
        </span>
        <input
          type="text"
          value={this.state.title}
          onChange={this.validate("title")}
        />
        <br />
        <span className="inputInfoD">
          {" "}
          <p className="tag">Description</p>
          <p className="req">REQUIRED</p>{" "}
        </span>
        <textarea
          type="text"
          className="desc"
          value={this.state.story}
          onChange={this.validate("story")}
        />

        <span className="uploadInfo">
          <label className="upload" htmlFor="filePicker">
            UPLOAD
          </label>
          <input id="filePicker" style={{ display: "none" }} type={"file"} />

          <img
            className="image"
            alt="paperclip"
            src="/assets/attachment.png"
            width="6.42"
            height="12.83"
          />
          {this.state.img}
        </span>
        <button className="submit" onClick={this.sendStory.bind(this)}>
          Submit
          {this.props.toggle}
        </button>
      </div>
    );
  }
}

export default StackController;
