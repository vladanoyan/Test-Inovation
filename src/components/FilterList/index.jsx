import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Delete from 'react-icons/lib/go/trashcan';
import Person from 'react-icons/lib/fa/user';
import Email from 'react-icons/lib/fa/envelope-o';
import Comment from 'react-icons/lib/fa/commenting-o';
import { actionDel } from '../../actions/actionDel';
import { data } from '../../actions/data';
import cs from './component.pcss';


class filterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      body: '',
      email: '',
      show: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 1000);
    this.props.dispatchData('https://jsonplaceholder.typicode.com/comments');
  }
  editing(item, e) {
    const newValue = e.target.value;
    const items = this.props.contacts;
    const index = items.indexOf(item);
    items[index].name = newValue;
    this.props.dispatchUpdate(this.state.value);
  }
  editingBody(item, e) {
    const newBody = e.target.value;
    const items = this.props.contacts;
    const index = items.indexOf(item);
    items[index].body = newBody;
    this.props.dispatchUpdate(this.state.body);
  }
  send(e) {
    if (this.state.value !== '' || this.state.body !== '' || this.state.email !== '') {
      this.props.dispatchText(this.state.value, this.state.body, this.state.email, Date.now());
    }
    e.preventDefault();
    this.setState({ value: '', body: '', email: '' });
  }
  rem(e) {
    this.props.sendDelete(e);
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 2000);
  }
  render() {
    const itemFilter = this.state.value.length > 3 ? this.props.contacts.filter(
      (item) => item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1,
    ) : this.props.contacts;
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12" sm="4" md="4">
              <form>
                <div className={cs.form}>
                  <input
                    type="text"
                    className={cs.inputSearch}
                    placeholder="write Post name or filter them"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                  />
                  <input
                    type="email"
                    className={cs.inputSearch}
                    placeholder="write your email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <textarea
                    name="text"
                    rows="4"
                    cols="10"
                    wrap="soft"
                    className={cs.inputCom2}
                    placeholder="your message"
                    value={this.state.body}
                    onChange={(e) => this.setState({ body: e.target.value })}
                  />
                  <div>
                    <button className={cs.btn} onClick={this.send.bind(this)}>Add Comment</button>
                  </div>
                </div>
              </form >
            </Col>
            <Col xs="12" sm="8" md="8">
              <div className={cs.comment}>
                <Comment className={cs.com} />
                {this.props.contacts.length}
              </div>
              <div>
                <form>
                  <ul className={cs.ul}>
                    {itemFilter.map((item) => (
                      <li
                        className={cs.listLi}
                        key={item.id}
                      >
                        <p>Post id: {item.postId}</p>
                        <Person className={cs.com} />
                        <Link to={`/${item.id}/details`} >
                          <input
                            className={cs.title}
                            onChange={this.editing.bind(this, item)}
                            value={item.name}
                          />
                        </Link>
                        <p><Email className={cs.com} />{item.email}</p>
                        <Link to={`/${item.id}/details`} >
                          <textarea
                            name="text"
                            rows="4"
                            cols="10"
                            wrap="soft"
                            className={cs.inputCom}
                            onChange={this.editingBody.bind(this, item)}
                            value={item.body}
                          />
                        </Link>
                        <Delete
                          className={cs.delete}
                          onClick={this.rem.bind(this, item.id)}
                        />
                      </li>))}
                  </ul>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={cs.showbox} style={{ display: this.state.show ? 'block' : 'none' }}>
          <div className={cs.loader}>
            <svg className={cs.circular} viewBox="25 25 50 50">
              <circle className={cs.path} cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

filterList.propTypes = {
  dispatchData: PropTypes.func.isRequired,
  dispatchText: PropTypes.func.isRequired,
  dispatchUpdate: PropTypes.func.isRequired,
  sendDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchData: (dataUrl) => {
      dispatch(data(dataUrl));
    },
    dispatchText: (name, body, email, ky) => {
      dispatch({ type: 'ADD_USER', name, body, email, ky });
    },
    dispatchUpdate: (name, body, email, ky) => {
      dispatch({ type: 'UPDATE', name, body, email, ky });
    },
    sendDelete: (num) => {
      dispatch(actionDel(num));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(filterList);
