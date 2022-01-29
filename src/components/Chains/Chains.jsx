import { useEffect, useState } from "react";
import { Menu, Dropdown, Button, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo } from "./Logos";
import { useChain } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const menuItems = [
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  },
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const [selected, setSelected] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("chain", chain);
  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    if (!newSelected) setIsModalVisible(true);

    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ position: "relative" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          key={selected?.key}
          icon={selected?.icon}
          style={{ ...styles.button, ...styles.item }}
        >
          <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "35px",
          fontSize: "17px",
          fontWeight: "500",
          textAlign: "center",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Current Chain is not supported please switch to Avalanche
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            switchNetwork("0xa869");
            setIsModalVisible(false);
          }}
        >
          Switch to Avalanche
        </Button>
      </Modal>
    </div>
  );
}

export default Chains;
