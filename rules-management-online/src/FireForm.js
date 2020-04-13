import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import PropTypes from "prop-types";
import { fireRules } from "./requests";

const person = yup.object({
    dataNumber: yup.string(),
    customerName: yup.string(),
    age: yup.string().required("Age is required"),
    income: yup.string().required("Income is required"),
})

function FireForm({
  edit,
  onSave,
  person,
  onCancelAdd,
  onCancelEdit,
}) {
  const handleSubmit = async evt => {

    console.log(evt)
    const response = await fireRules(evt);
    alert("rule result : "  + response.pass);
    // const response = await fireRules();
    // onSave();
  };
  return (
    <div className="form">
      <Formik
        validationRule={person}
        onSubmit={handleSubmit}
        initialValues={person || {}}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="dataNumber">
                <Form.Label>Data Number</Form.Label>
                <Form.Control
                  type="text"
                  name="dataNumber"
                  placeholder="Data Number"
                  value={values.dataNumber || ""}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ruleKey}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="customerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  value={values.customerName || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={values.age || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="income">
                <Form.Label>Income</Form.Label>
                <Form.Control
                  type="text"
                  name="income"
                  placeholder="Income"
                  value={values.income || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginRight: "10px" }}>
              Fire
            </Button>
            <Button type="button" onClick={edit ? onCancelEdit : onCancelAdd}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
FireForm.propTypes = {
  edit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancelAdd: PropTypes.func,
  onCancelEdit: PropTypes.func,
  rule: PropTypes.object,
  ruelsStore: PropTypes.object
};
export default FireForm;