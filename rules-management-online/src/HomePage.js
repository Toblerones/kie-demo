import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RuleForm from "./RuleForm";
import "./HomePage.css";
import { getRules, fireRules } from "./requests";
import { observer } from "mobx-react";
function HomePage({ rulesStore }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [selectedRule, setSelectedRule] = useState({});
  const openModal = () => {
    setOpenAddModal(true);
  };
  const closeModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    getData();
  };
  const cancelAddModal = () => {
    setOpenAddModal(false);
  };
  const editRule = rule => {
    setSelectedRule(rule);
    setOpenEditModal(true);
  };
  const cancelEditModal = () => {
    setOpenEditModal(false);
  };
  const getData = async () => {
    const response = await getRules();
    rulesStore.setRules(response.data);
    setInitialized(true);
  };
  useEffect(() => {
    if (!initialized) {
      getData();
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
<Modal show={openEditModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RuleForm
            edit={true}
            onSave={closeModal.bind(this)}
            rule={selectedRule}
            onCancelEdit={cancelEditModal}
            rulesStore={rulesStore}
          />
        </Modal.Body>
      </Modal>
      <ButtonToolbar onClick={openModal}>
        <Button variant="outline-primary">Add Rule</Button>
      </ButtonToolbar>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rule Key</th>
            <th>Rule DRE Content</th>
          </tr>
        </thead>
        <tbody>
          {rulesStore.rules.map(c => (
            <tr key={c.id}>
              <td>{c.ruleKey}</td>
              <td>{c.rule}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={editRule.bind(this, c)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default observer(HomePage);