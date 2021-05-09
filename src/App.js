/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React, { Component } from 'react';
import './App.css';
import Toc from "./components/Toc";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import UpdateContent from "./components/UpdateContent";



class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3; //마지막 컨텐트의 아이디와 일치해야 함
    this.state = {
      state: 'welcome',
      selected_content_id: 2,
      welcome: { title: "welcome", desc: 'Hello React!' },
      subject: { title: "WEB", sub: "World wide web!" },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScropt', desc: 'JavaScript is for interactive' }
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        _contents = Array.from(this.state.contents);
        _contents.push({ id: this.max_content_id, title: _title, desc: _desc });
        this.setState({
          contents: _contents,
          mode: "read",
          selected_content_id: this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc };
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: "read"
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)} //이벤트 생성
        >
        </Subject>
        <Subject title="React" sub="For UI"></Subject>
        <Toc
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></Toc>
        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents)
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode: 'welcome',
                contents = _contents
              });
              alert('deleted!');
            }
          }
          else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}
/*
App이라는 컴포넌트 안에 Subject라는 하위 컴포넌트가 있는 상태
=>상위 컴포넌트의 state값을 props로 하위 컴포넌트로 전달
*/
export default App;