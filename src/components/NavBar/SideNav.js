import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import SideNavHeader from "./SideNavHeader";
import NewItemButton from "./NewItemButton";
import ItemList from "./ItemList";
import { setRouteService, sideDisplayService } from "../../services.js"
import axios from "axios";
import "../../styles/SideNav.css";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFiles: true
    };
  }

  componentDidUpdate(){
    console.log(this.props.sideDisplay);
  }


///////////////////////////////////////
// helper functions

  _toggleHeader = () => {
    this.setState(prevState => {
      return { displayFiles: !prevState.displayFiles };
    });
  };

  _triggerRoute = (case_id, id, type) => {
    this.props.setRoute(case_id, id, type)
  }

///////////////////////////////////////
// This function is for handling what is displaying on the sidebar.
// This is changed by calling a dispatch with the appropriate string as an argument
// when the corresponding component mounts. See FileView lifecycle method.

  _handleDisplayContent = (display) => {
    switch (display) {
      case "case":
        return (this.props.cases.map((item)=>{
          return <li key={item.case_id}  >{item.case_name}</li>
        }))

      case "files":
      console.log("Files triggered in switch");
        return (this.props.caseFiles.map((item)=>{
          return <li key={item.file_id} onClick={() => this._triggerRoute( this.props.activeCase, item.file_id, "file" ) } >{item.file_name}</li>
      }))
      
      case "tags":
        return (this.props.caseTags.map((item)=>{
          return <li key={item.tag_id} onClick={() => this._triggerRoute( this.props.activeCase, item.tag_id, "tag" ) } >{item.tag}</li>
      }))

      case "graph":
        return this.props.route

      default:
      console.log("Default triggered in switch");
        return (this.props.cases.map((item)=>{
          return <li key={item.case_id}  >{item.case_name}</li>
        }))
    }
  }

///////////////////////////////////////
// RENDER ME TIMBERS

  render() {
    return (
      <div className="sideNav">
        <SideNavHeader
          displayFiles={this.state.displayFiles}
          _toggleHeader={this._toggleHeader}
        />
        <NewItemButton _toggleUpload={this.props._toggleUpload} />
        <ItemList
          _triggerRoute={this._triggerRoute}
          data={this._handleDisplayContent(this.props.sideDisplay)}
          page={this.props.sideDisplay}
          activeCase={this.props.activeCase}
        />
        <Link to="/graph" > GRAPH </ Link>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    caseFiles: state.caseFiles,
    caseTags: state.caseTags,
    activeCase: state.activeCase,
    sideDisplay: state.sideDisplay,
    cases: state.cases
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setRoute: (case_id, id, type) => dispatch(setRouteService(case_id, id, type)),
    sideDisplay: (display) => dispatch(sideDisplayService(display))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
