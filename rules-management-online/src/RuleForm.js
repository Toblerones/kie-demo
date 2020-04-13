import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import PropTypes from "prop-types";
import { addRule, fireRules, getRules } from "./requests";

const rule = yup.object({
    ruleKey: yup.string().required("Rule Key is required"),
    rule: yup.string().required("Rule DRL is required"),
})

function RuleForm({
  edit,
  onSave,
  rule,
  onCancelAdd,
  onCancelEdit,
  rulesStore,
}) {
  const handleSubmit = async evt => {

    await addRule(evt);
    
    const response = await getRules();
    rulesStore.setRules(response);
    onSave();
  };
  return (
    <div className="form">
      <Formik
        validationRule={rule}
        onSubmit={handleSubmit}
        initialValues={rule || {}}
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
              <Form.Group as={Col} md="12" controlId="ruleKey">
                <Form.Label>Rule key</Form.Label>
                <Form.Control
                  type="text"
                  name="ruleKey"
                  placeholder="Rule Key"
                  value={values.ruleKey || ""}
                  onChange={handleChange}
                />  
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="rule">
                <Form.Label>Rule DRL Content</Form.Label>
                <Form.Control
                  type="text"
                  name="rule"
                  placeholder="Rule DRL"
                  value={values.rule || ""}
                  onChange={handleChange}
                  as="textarea" rows="15"
                />
              </Form.Group>
            </Form.Row>
            
            <Button type="submit" style={{ marginRight: "10px" }}>
              Save
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
RuleForm.propTypes = {
  edit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancelAdd: PropTypes.func,
  onCancelEdit: PropTypes.func,
  rule: PropTypes.object,
  ruelsStore: PropTypes.object
};
export default RuleForm;