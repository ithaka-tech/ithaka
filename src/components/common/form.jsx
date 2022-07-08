import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Radio from "./radio";
import SigninInput from "./signinInput";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    console.log(error);
    console.log(this.state.data);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleRadioValue = () => {};

  renderButton(label, format) {
    return (
      <button disabled={this.validate()} className={format}>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, format, placeholder) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        format={format}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, format, placeholder, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        format={format}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSignin(name, id, label, placeholder, type) {
    const { data, errors } = this.state;
    console.log("error", errors);
    return (
      <SigninInput
        type={type}
        name={name}
        id={id}
        value={data[name]}
        label={label}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderRadio(name, options, format, type = "radio") {
    const { data, errors } = this.state;
    return (
      <Radio
        type={type}
        name={name}
        value={data[name]}
        options={options}
        format={format}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
