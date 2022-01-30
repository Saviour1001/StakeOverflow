import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import Posts from "./components/Posts";
import Reputation from "components/Reputation";
import { Button, Typography } from "antd";
import glStyles from "components/gstyles";
import AddPost from "./components/AddPost";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  const { Title, Paragraph } = Typography;
  let result = null;

  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  if (selectedCategory["category"] === "default") {
    result = (
      <div className="col-lg-9">
        <div
          style={{
            ...glStyles.card,
            padding: "10px 50px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            <Paragraph>
              <p
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  width: "100%",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                <img
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                  src={
                    "https://content.presspage.com/uploads/2658/c800_logo-stackoverflow-square.jpg?98978"
                  }
                  alt="Polytter"
                  width="200"
                  height="200"
                />
              </p>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "Libre Baskerville",
                }}
              >
                <Title level={6}>Stack Overflow 3.0</Title>
              </div>
            </Paragraph>
            <Paragraph style={{textAlign: "center"}}>
              <p
                style={{
                  paddingBottom: "3rem",
                }}
              />
              <p style={{fontSize: "1.1rem"}}>Post your questions !!</p>
            </Paragraph>
            <Paragraph style={{textAlign: "center"}}>
            <p style={{fontSize: "1.1rem"}}>Reputation system works on the basis of upvotes and downvotes.</p>
            </Paragraph>
            <Paragraph style={{textAlign: "center"}}> 
            <p style={{fontSize: "1.1rem"}}>Currently works on Avalanche Testnet.</p>
            </Paragraph>

            <div style={{textAlign: "center"}}>
            <Title level={5}>
                <p/>
                <p
                style={{fontSize: "1.5rem", paddingTop: "3rem"}}
                >Choose the categories and start exploring!</p>
              </Title>
            </div>
            <div style={{display: "flex"}}>
            <img
                  style={{
                    //display: "inline-block",
                    verticalAlign: "middle",
                    //zIndex: 1,
                    position: "relative",
                    top: "3.5rem",
                    left: "4.5rem"
                  }}
                  src={
                    "https://cdn.sstatic.net/Img/product/teams/screens/illo-for-you.png?v=ab49238abe04"
                  }
                  alt="stack"
                  width="550"
                  height="300"
                />
            </div>

            <div style={{backgroundColor: "black", height: "100px", width: "700px"}}>
            </div>
          </Typography>
        </div>
      </div>
    );
  } else {
    result = (
      <div className="col-lg-9">
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4 style={{ fontFamily: "Libre Baskerville" }}>
            {" "}
            Your Reputation in {selectedCategory["category"]} is <Reputation />{" "}
          </h4>
          <Button shape="round" onClick={toogleShowAddPost}>
            Post
          </Button>
        </div>
        {showAddPost ? <AddPost /> : ""}
        <Posts />
      </div>
    );
  }

  return result;
};

export default Feed;
