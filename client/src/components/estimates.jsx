import React, { Component } from "react";
import axios from "axios";
import "../customers.css";

const apiEndpoint = "";

class Estimates extends Component {
  state = { posts: [] };

  //   async componentDidMount() {
  //     //pending > resolved (success) OR rejected (failure)
  //     const { data: posts } = await axios.get(apiEndpoint);
  //     this.setState({ posts });
  //   }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await axios.put(apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    await axios.delete(apiEndpoint + "/" + post.id);

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <div className="shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Estimate Type</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer">
          <button className="btn btn-primary me-4" onClick={this.handleAdd}>
            Create Estimate
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Estimates;
