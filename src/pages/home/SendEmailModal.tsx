import { Button, Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import styles from "./SendEmailModal.module.css";
import { sendInvitation } from "../../services/email-service";
import { validateEmail, validateName } from "../../utils/string.utils";

const SendEmailModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>();
  const [form] = useForm();

  const checkName = () => {
    const name = form.getFieldValue("name");
    const result = validateName(name);
    if (!result.valid) {
      return Promise.reject(result.msg);
    }
    return Promise.resolve("");
  };

  const checkEmail = (rules, value) => {
    const email = form.getFieldValue("email");
    if (!email) {
      return Promise.reject("Please input email");
    }
    if (!validateEmail(email)) {
      return Promise.reject("Please input correct email address");
    }
    return Promise.resolve("");
  };

  const checkConfirmEmail = (rules, value, callback) => {
    if (!form.getFieldValue("confirmEmail")) {
      return Promise.reject("Please confirm email");
    }
    if (form.getFieldValue("confirmEmail") !== form.getFieldValue("email")) {
      return Promise.reject("Confirmed email should match the email");
    }
    return Promise.resolve("");
  };

  const onSubmit = (values) => {
    setLoading(true);
    // clear error message when re-attemp to send an invitation
    setErrMsg("");
    sendInvitation(values.name, values.email).then((result) => {
      if (result.success) {
        setOpen(false);
        form.resetFields();
        notification.info({
          message: "Send inviteation successfully",
        });
      } else {
        setErrMsg(result.msg);
      }
      setLoading(false);
    });
  };
  return (
    <>
      <Button className={styles["button"]} onClick={() => setOpen(true)}>
        Request an invitation
      </Button>
      <Modal open={open} footer={<></>} onClose={() => setOpen(false)}>
        <h2 className={styles.title}>Request an invitation</h2>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name="name" rules={[{ validator: checkName }]}>
            <Input placeholder="Please input your name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ validator: checkEmail }]}>
            <Input placeholder="Please input your email"/>
          </Form.Item>
          <Form.Item
            name="confirmEmail"
            rules={[{ validator: checkConfirmEmail }]}
          >
            <Input
              placeholder="Please input your email again"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles["send-btn"]}
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Send
            </Button>
          </Form.Item>
          {errMsg && (
            <Form.Item>
              <div className={styles.error}>{errMsg}</div>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default SendEmailModal;
