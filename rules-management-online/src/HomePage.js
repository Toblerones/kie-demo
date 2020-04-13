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
  const [openFireRulesModal, setOpenFireRulesModal] = useState(false);
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

  const openModal2 = () => {
    setOpenFireRulesModal(true);
  };
  const closeModal2= () => {
    setOpenFireRulesModal(false);
  };
  const cancelFireRuleModal = () => {
    setOpenFireRulesModal(false);
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
      <Modal show={openFireRulesModal} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Fire Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FireForm
            edit={false}
            onSave={closeModal2.bind(this)}
            onCancelAdd={cancelFireRuleModal}
          />
        </Modal.Body>
      </Modal>
      <tr>
      <th>
      <ButtonToolbar onClick={openModal}>
        <Button variant="outline-primary">Add Rule</Button>
      </ButtonToolbar>
      </th>
      <th>
      <ButtonToolbar onClick={openModal2}>
        <Button variant="outline-primary">Fire Rule</Button>
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