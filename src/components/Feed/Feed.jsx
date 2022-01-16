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
            padding: "10px 13px",
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
                  textAlign: "center",
                }}
              >
                <img
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  src={
                    "https://content.presspage.com/uploads/2658/c800_logo-stackoverflow-square.jpg?98978"
                  }
                  alt='Polytter'
                  width='200'
                  height='200'
                />
              </p>
              <Title level={3}>Stack overflow 3.0</Title>
              Post your questions !! 
            </Paragraph>
            <Paragraph>
              Reputation system works on the basis of upvotes and downvotes.
            </Paragraph>
            <Paragraph>
              {" "}
              Currently works on Polygon Mumbai testnet. 
            </Paragraph>
            

            <Title level={5}>
              Choose the categories !
            </Title>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>
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