import { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetMyStackCall } from "../../API/getStories";
import { GetAllStackCall } from "../../API/getAllStories";
import { DeleteStory } from "../../API/deleteStory";
import "./index.css";

function GetMyStack(props) {
  useEffect(() => {
    if (props.home === true) {
      GetAllStackCall(props.authkey).then((data) => {
        let tempArr = [];

        data.forEach((element) => {
          tempArr.push(element);
        });

        props.passStories(tempArr);
        props.passLength(tempArr.length);
      });
    } else {
      GetMyStackCall(props.authkey).then((data) => {
        let tempArr = [];

        data.forEach((element) => {
          tempArr.push(element);
        });

        props.passStories(tempArr);
        props.passLength(tempArr.length);
      });
    }
  }, []);

  return <div> </div>;
}

export class MyStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      authkey: this.props.authkey,
      del: 0,
      refresh: false,
      edit: this.props.edit,
      grabview: true,
      currentPage: 1,
      pageCount: 0,
    };

    this.passLength = this.passLength.bind(this);
    this.deleteStack = this.deleteStack.bind(this);
    this.selectStack = this.selectStack.bind(this);
    this.changeGrabView = this.changeGrabView.bind(this);

    //Pagination zone
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  selectStack = (story) => {
    this.props.getCurrentStory(story);
  };

  deleteStack = (e, props) => {
    let id = e.target.id;
    DeleteStory(id, this.state.authkey);
    this.setState({ del: this.state.del + 1 });
  };

  passLength = (length) => {
    this.setState({ pageCount: Math.ceil(length / 5) });
  };

  changeGrabView = (value) => {
    this.setState({ grabview: value });
  };

  nextPage = () => {
    if (this.state.currentPage + 1 <= this.state.pageCount) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  prevPage = () => {
    if (this.state.currentPage - 1 > 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  changePage = (e) => {
    this.setState({ currentPage: parseInt(e.target.id) });
  };

  render() {
    const pageNums = [];
    for (let x = 1; x <= this.state.pageCount; x++) {
      pageNums.push(x);
    }
    return (
      <div>
        {/* {this.state.grabview && <GetMyStack authkey={this.props.authkey} passStories={this.passStack} stack={this.state.stack} refresh={this.state.refresh} edit={this.state.edit} auth={this.props.auth} passLength={this.passLength}/>} */}
        {this.state.show && (
          <ShowStack
            authkey={this.props.authkey}
            stack={this.state.stack}
            deleteStack={this.deleteStack}
            selectStack={this.selectStack}
            passLength={this.passLength}
            currentPage={this.state.currentPage}
            home={this.props.home}
            del={this.state.del}
          />
        )}

        {
          <span
            className="pagination"
            style={{ display: pageNums.length === 0 ? "none" : "" }}
          >
            <button className="pageControl" onClick={this.prevPage.bind(this)}>
              {" "}
              &lt;
            </button>
            {pageNums.map((element) => (
              <button
                key={element}
                className={
                  element === this.state.currentPage ? "nums active" : "nums"
                }
                id={element}
                onClick={this.changePage.bind(this)}
              >
                {element}
              </button>
            ))}
            <button className="pageControl" onClick={this.nextPage.bind(this)}>
              {" "}
              &gt;{" "}
            </button>{" "}
          </span>
        }
      </div>
    );
  }
}

function ShowStack(props) {
  const [getStack, setStack] = useState([]);
  const del = props.del;
  const stack = getStack;

  const passStories = (story) => {
    setStack(story);
  };

  const passLength = (length) => {
    props.passLength(length);
  };

  const selectStory = (e) => {
    const id = parseInt(e.target.id);
    const story = stack.filter((stacks) => {
      if (stacks[0] === id) {
        return stacks;
      }
      return 0;
    });
    props.selectStack(story);
  };

  window.scrollTo(0, 0);

  return (
    <div key={props.del} className="stackContainer">
      {console.log("Refreshed")}
      <GetMyStack
        authkey={props.authkey}
        passStories={passStories}
        passLength={passLength}
        del={del}
        home={props.home}
      />
      {stack
        .slice((props.currentPage - 1) * 5, props.currentPage * 5)
        .map((element, index) => (
          <div className="stacks">
            <div
              className="postinfo"
              style={{ display: !props.home ? "none" : "flex" }}
            >
              <p classname={"userdate"}>{element[1]}</p>
              <p classname={"userdate"}>{element[5]}</p>
            </div>

            <img src={element[2]} className="pictures" alt="userdesc"></img>

            {element.map((item, i) => (
              <p className={"Item" + i}> {item} </p>
            ))}

            <button
              id={element[0]}
              className="del"
              onClick={props.deleteStack.bind(this)}
              style={{ display: props.home ? "none" : "inline-block" }}
            >
              Delete
            </button>
            <Link to="/edit">
              <button
                id={element[0]}
                className="edit"
                onClick={selectStory.bind(this)}
                style={{ display: props.home ? "none" : "inline-block" }}
              >
                Edit
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default MyStack;
export { GetMyStack };
export { ShowStack };
