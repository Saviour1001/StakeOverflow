import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { useEffect, useState } from "react";
import { Input, message } from "antd";
import Avax from "../img/AvaxToken.png";

function Donate(props) {
  const { Moralis } = useMoralis();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [postDonates, setpostDonates] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  const { data } = useMoralisQuery(
    "Donates",
    (query) => query.equalTo("postId", props.postId),
    [],
    {
      live: true,
    }
  );
  const options = {
    contractAddress: contractAddress,
    functionName: "getPost",
    abi: contractABIJson,
    params: {
      _postId: props.postId,
    },
  };

  useEffect(() => {
    amount ? setTx({ amount }) : setTx();
  }, [amount]);

  useEffect(() => {
    async function getPostDonates() {
      await Moralis.enableWeb3;
      const result = await Moralis.executeFunction(options);
      setpostDonates(result[5]);
    }
    getPostDonates();
  }, [data]);

  async function DoDonate(donate) {
    if (walletAddress.toLowerCase() === props.postOwner.toLowerCase())
      return message.error("You cannot donate on your posts");

    const { amount } = tx;
    const options1 = {
      contractAddress: contractAddress,
      functionName: donate,
      abi: contractABIJson,
      params: {
        _postId: props.postId,
        _reputationAdded: amount,
      },
    };
    const options2 = {
      type: "native",
      amount: Moralis.Units.ETH(amount),
      receiver: props.postOwner,
    };

    setIsPending(true);

    await Moralis.transfer(options2);
    await contractProcessor.fetch({
      params: options1,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }
  var height = 5;
  var width = 5;

  return (
    <div>
      <Input
        type="number"
        size="large"
        placeholder="Amount"
        style={{
          height: "4%",
          width: "20%",
          margin: "0.5rem",
          borderColor: "#b8daff",
        }}
        onChange={(e) => {
          setAmount(`${e.target.value}`);
        }}
      />
      <button
        type="primary"
        size="large"
        style={{
          height: "4%",
          width: "20",
          background: "#b8daff",
          //color: "black",
          padding: "3.5px",
          borderRadius: "5px",
          borderWidth: "2px",
          position: "relative",
          top: "0.3rem"
        }}
        loading={isPending}
        onClick={() => DoDonate("donate")}
        disabled={!tx}
      >
        <span>
          <img
            alt="Avax"
            src={Avax}
            style={{
              width: "1.5rem",
              height: "1.5rem",
              marginLeft: "0.5rem",
            }}
          />
        </span>
      </button>
      <>{postDonates}</>
    </div>
  );
}

export default Donate;
