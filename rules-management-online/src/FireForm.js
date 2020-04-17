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
const bankstatement = yup.object().shape({
  account: yup.object({
    balance: yup.string().required("balance is required"),
  })
})
function FireForm({
  edit,
  onSave,
  person,
  onCancelAdd,
  onCancelEdit,
  ruleDataModel,
}) {
  console.log(ruleDataModel)
  const handleSubmit = async evt => {
    console.log("handle")
    console.log(evt)
    if (ruleDataModel=='bankstatement'){
      evt.account.balance = evt.balance
    }
    evt.model = ruleDataModel
    const response = await fireRules(evt);
    alert("rule result : "  + response.pass);
    // const response = await fireRules();
    // onSave();
  };
  if (ruleDataModel=='person'){
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
  } else {
    return (
      <div className="form">
        <Formik
          validationRule={bankstatement}
          onSubmit={handleSubmit}
          initialValues={{account:{balance:0}}}
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
                <Form.Group as={Col} md="12" controlId="balance">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="text"
                    name="balance"
                    placeholder="balance"
                    value={values.account.balance || ""}
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
}
FireForm.propTypes = {
  edit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancelAdd: PropTypes.func,
  onCancelEdit: PropTypes.func,
  rule: PropTypes.object,
  ruelsStore: PropTypes.object,
  ruleDataModel: PropTypes.string
};
export default FireForm;