import React from 'react';

class FormPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      imgUrl: null
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const formData = new FormData();
    // console.log(formData);
  }

  render() {
    return (
      <div><h1>TEST</h1></div>
    );
  }
}

export default FormPage;
