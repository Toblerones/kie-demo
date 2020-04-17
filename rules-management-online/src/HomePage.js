import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RuleForm from "./RuleForm";
import FireForm from "./FireForm";
import "./HomePage.css";
import { getRules, fireRules } from "./requests";
import { observer } from "mobx-react";
function HomePage({ rulesStore }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFireRulesBankStatementModal, setOpenFireRulesBankStatementModal] = useState(false);
  const [openFireRulesPersonModal, setOpenFireRulesPersonModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [selectedRule, setSelectedRule] = useState({});
  const openModal = () => {
    setOpenAddModal(true);
  };
  const closeModal = () => {
    setOpenAddModal(false);
    getRulesData();
  };
  const cancelAddModal = () => {
    setOpenAddModal(false);
  };

  const openModalPerson = () => {
    setOpenFireRulesPersonModal(true);
  };
  const closeModal2= () => {
    setOpenFireRulesPersonModal(false);
  };
  const cancelFireRulesPersonModal = () => {
    setOpenFireRulesPersonModal(false);
  };

  const openModalBankStatement = () => {
    setOpenFireRulesBankStatementModal(true);
  };
  const closeModal3= () => {
    setOpenFireRulesBankStatementModal(false);
  };
  const cancelFireRulesBankStatementModal = () => {
    setOpenFireRulesBankStatementModal(false);
  };
  const getRulesData = async () => {
    const response = await getRules();
    console.log(response);
    rulesStore.setRules(response);
    setInitialized(true);

    rulesStore.rules.map(c => (
        console.log(c.id),
        console.log(c.ruleKey),
        console.log(c.rule)
      ));
  };
  const postFireRules = async () => {
    const response = await fireRules();
    console.log(response);
  };
  useEffect(() => {
    if (!initialized) {
        getRulesData();
    }
  });
  return (
    <div className="home-page">
      <h1>Rules</h1>

      <Modal show={openAddModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RuleForm
            edit={false}
            onSave={closeModal.bind(this)}
            onCancelAdd={cancelAddModal}
            rulesStore={rulesStore}
          />
        </Modal.Body>
      </Modal>
      <Modal show={openFireRulesPersonModal} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Fire Rules - Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FireForm
            edit={false}
            onSave={closeModal2.bind(this)}
            onCancelAdd={cancelFireRulesPersonModal}
            ruleDataModel = "person"
          />
        </Modal.Body>
      </Modal>
      <Modal show={openFireRulesBankStatementModal} onHide={closeModal3}>
        <Modal.Header closeButton>
          <Modal.Title>Fire Rules - Bank Statement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FireForm
            edit={false}
            onSave={closeModal3.bind(this)}
            onCancelAdd={cancelFireRulesBankStatementModal}
            ruleDataModel = "bankstatement"
          />
        </Modal.Body>
      </Modal>
      <tr>
      <th>
      <ButtonToolbar onClick={openModal}>
        <Button variant="outline-primary">Add Rule</Button>
      </ButtonToolbar>
      </th>
      </tr>
      <tr>
      <th>
      <ButtonToolbar onClick={openModalPerson}>
        <Button variant="outline-primary">Fire Rule - Person</Button>
      </ButtonToolbar>
      </th>
      <th>
      <ButtonToolbar onClick={openModalBankStatement}>
        <Button variant="outline-primary">Fire Rule - Bank Statement</Button>
      </ButtonToolbar>
      </th>
      </tr>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rule Key</th>
            <th>Rule DRL Content</th>
          </tr>
        </thead>
        <tbody>
          {rulesStore.rules.map(c => (
            <tr key={c.id}>
              <td>{c.ruleKey}</td>
              <td>{c.rule}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default observer(HomePage);