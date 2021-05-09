import React, { Component } from 'react';

class Toc extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log('===>TOC render shildComponentUpdate'
            , newProps.data
            , this.props.data
        );
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        var lists = {};
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        data-id={data[i].id}
                        onClick={function (e) {
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}
                    >{data[i].desc}
                    </a>
                </li>);
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.html">CSS</a></li>
                    <li><a href="3.html">JavsScript</a></li>
                </ul>
            </nav>
        );
    }
}

export default Toc;