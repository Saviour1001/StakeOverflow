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
      <div className='col-lg-9'>
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
                  style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "10rem" }}
                  src={
                    "https://content.presspage.com/uploads/2658/c800_logo-stackoverflow-square.jpg?98978"
                  }
                  alt='Polytter'
                  width='200'
                  height='200'
                />
              </p>
              <div style={{textAlign: "center", marginLeft: "11rem", fontFamily: "Libre Baskerville"}}>
              <Title level={3}>
              Stack Overflow 3.0
              </Title>
              </div>
            </Paragraph>
            <Paragraph>
            <p style={
                {
                  paddingBottom: "3rem",
                }
              } />
            Post your questions !! 
            </Paragraph>
            <Paragraph>
              Reputation system works on the basis of upvotes and downvotes.
            </Paragraph>
            <Paragraph>
              {" "}
              Currently works on Polygon Mumbai Testnet. 
            </Paragraph>

            <div style={{textAlign: "center", marginLeft: "11rem"}}>
            <Title level={5}>
            <p style={
                {
                  paddingBottom: "3rem",
                }
              } />
              Choose the categories and start exploring!
            </Title>
            </div>
          </Typography>
        </div>
      </div>
    );
  } else {
    result = (
      <div className='col-lg-9'>
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
          <h4 style={{fontFamily: "Libre Baskerville"}}>
            {" "}
            Your Reputation in {selectedCategory["category"]} is <Reputation />{" "}
          </h4>
          <Button shape='round' onClick={toogleShowAddPost}>
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